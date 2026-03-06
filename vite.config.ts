/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { profile } from './src/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'html-description',
      transformIndexHtml(html) {
        return html.replace('%DESCRIPTION%', profile.description).replace('%TITLE%', profile.name).replace('%PHOTO%', profile.photo);
      },
    },
    {
      name: 'inline-css',
      apply: 'build',
      enforce: 'post',
      transformIndexHtml: {
        order: 'post',
        handler(html, { bundle }) {
          if (!bundle) return html;
          let result = html;
          for (const [fileName, chunk] of Object.entries(bundle)) {
            if (fileName.endsWith('.css') && chunk.type === 'asset') {
              result = result.replace(new RegExp(`<link rel="stylesheet"[^>]*href="[^"]*${fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"]*"[^>]*>`), `<style>${chunk.source}</style>`);
              delete bundle[fileName];
            }
          }
          return result;
        },
      },
    },
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    globals: true,
  },
});
