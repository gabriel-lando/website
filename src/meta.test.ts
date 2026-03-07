import { readFileSync } from 'fs';
import { resolve } from 'path';
import { profile } from './config';
import { buildSeoFallback, buildStructuredData, buildSitemap, site, siteImageUrl, siteKeywords, siteUrl } from './seo';

const rawHtml = readFileSync(resolve(__dirname, '../index.html'), 'utf-8');
const builtHtml = rawHtml
  .replaceAll('%DESCRIPTION%', site.description)
  .replaceAll('%TITLE%', site.title)
  .replaceAll('%PHOTO%', profile.photo)
  .replaceAll('%KEYWORDS%', siteKeywords)
  .replaceAll('%THEME_COLOR%', site.themeColor)
  .replaceAll('%CANONICAL_URL%', siteUrl)
  .replaceAll('%OG_LOCALE%', site.locale)
  .replaceAll('%OG_TYPE%', site.type)
  .replaceAll('%OG_IMAGE%', siteImageUrl)
  .replaceAll('%JSON_LD%', buildStructuredData())
  .replaceAll('%SEO_FALLBACK%', buildSeoFallback());

describe('meta description', () => {
  it('index.html contains the %DESCRIPTION% placeholder', () => {
    expect(rawHtml).toContain('%DESCRIPTION%');
  });

  it('built HTML meta description matches profile.description', () => {
    const match = builtHtml.match(/<meta\s+name="description"\s+content="([^"]+)"/);
    expect(match).not.toBeNull();
    expect(match![1]).toBe(site.description);
  });
});

describe('title', () => {
  it('index.html contains the %TITLE% placeholder', () => {
    expect(rawHtml).toContain('%TITLE%');
  });

  it('built HTML title matches profile.name', () => {
    const match = builtHtml.match(/<title>([^<]+)<\/title>/);
    expect(match).not.toBeNull();
    expect(match![1]).toBe(site.title);
  });
});

describe('social and canonical metadata', () => {
  it('includes canonical URL and markdown alternate link', () => {
    expect(builtHtml).toContain(`<link rel="canonical" href="${siteUrl}" />`);
    expect(builtHtml).toContain(`<link rel="alternate" type="text/markdown" href="${siteUrl}" />`);
  });

  it('includes Open Graph and Twitter image metadata', () => {
    expect(builtHtml).toContain(`<meta property="og:image" content="${siteImageUrl}" />`);
    expect(builtHtml).toContain(`<meta name="twitter:image" content="${siteImageUrl}" />`);
  });
});

describe('structured data and fallback content', () => {
  it('includes valid Person JSON-LD', () => {
    const match = builtHtml.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
    expect(match).not.toBeNull();

    const structuredData = JSON.parse(match![1]);
    expect(structuredData['@type']).toBe('Person');
    expect(structuredData.name).toBe(profile.name);
    expect(structuredData.url).toBe(siteUrl);
  });

  it('includes the static SEO fallback summary', () => {
    expect(builtHtml).toContain('Digital business card');
    expect(builtHtml).toContain(profile.summary);
    expect(builtHtml).toContain('Primary links');
  });
});

describe('sitemap generation', () => {
  it('generates a sitemap containing the site URL', () => {
    const sitemap = buildSitemap();
    expect(sitemap).toContain(`<loc>${siteUrl}</loc>`);
  });
});
