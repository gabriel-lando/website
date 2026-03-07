import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { chromium } from '@playwright/test';

const distDir = resolve(process.cwd(), 'dist');
const outputPath = join(distDir, 'social-preview.png');
const host = '127.0.0.1';
const viewport = { width: 1440, height: 1024 };
const screenshotPadding = 36;

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
};

const resolveAssetPath = async (requestUrl) => {
  const requestedPath = new URL(requestUrl, `http://${host}`).pathname;
  const normalizedPath = normalize(requestedPath).replace(/^([\\/])+/, '');
  const candidatePath = join(distDir, normalizedPath || 'index.html');

  try {
    const candidateStat = await stat(candidatePath);
    if (candidateStat.isFile()) {
      return candidatePath;
    }
  } catch {
    // Fall through to SPA fallback.
  }

  return join(distDir, 'index.html');
};

const server = createServer(async (request, response) => {
  try {
    const filePath = await resolveAssetPath(request.url || '/');
    const data = await readFile(filePath);
    const contentType = contentTypes[extname(filePath)] || 'application/octet-stream';

    response.writeHead(200, { 'Content-Type': contentType });
    response.end(data);
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(error instanceof Error ? error.message : 'Failed to serve build output.');
  }
});

const launchBrowser = async () => {
  try {
    return await chromium.launch();
  } catch (error) {
    throw new Error(`Chromium is required to generate social-preview.png. Run \"npm run playwright:install -- chromium\" first.\n${error instanceof Error ? error.message : String(error)}`);
  }
};

const listen = () =>
  new Promise((resolveListen) => {
    server.listen(0, host, () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        throw new Error('Failed to determine preview server address.');
      }

      resolveListen(address.port);
    });
  });

let browser;

try {
  const port = await listen();
  browser = await launchBrowser();

  const context = await browser.newContext({
    colorScheme: 'light',
    deviceScaleFactor: 2,
    viewport,
  });

  const page = await context.newPage();
  await page.goto(`http://${host}:${port}/`, { waitUntil: 'networkidle' });
  await page.locator('.card-front.is-active').waitFor({ state: 'visible' });
  await page.locator('.front-photo img').evaluate((image) => {
    if (image instanceof HTMLImageElement && image.complete) {
      return;
    }

    return new Promise((resolveImage) => {
      image.addEventListener('load', () => resolveImage(undefined), { once: true });
      image.addEventListener('error', () => resolveImage(undefined), { once: true });
    });
  });

  await page.locator('.flip-hint').evaluate((hint) => {
    if (hint instanceof HTMLElement) {
      hint.style.visibility = 'hidden';
    }
  });

  const card = page.locator('.card-inner');
  const box = await card.boundingBox();

  if (!box) {
    throw new Error('Unable to locate the front card for social preview generation.');
  }

  await page.screenshot({
    path: outputPath,
    clip: {
      x: Math.max(box.x - screenshotPadding, 0),
      y: Math.max(box.y - screenshotPadding, 0),
      width: Math.min(box.width + screenshotPadding * 2, viewport.width),
      height: Math.min(box.height + screenshotPadding * 2, viewport.height),
    },
  });

  await context.close();
} finally {
  await browser?.close();
  await new Promise((resolveClose, rejectClose) => {
    server.close((error) => {
      if (error) {
        rejectClose(error);
        return;
      }

      resolveClose(undefined);
    });
  });
}
