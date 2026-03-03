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
        return html.replace('%DESCRIPTION%', profile.description);
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
