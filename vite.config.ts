/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { profile } from "./src/config";
import {
  buildSeoFallback,
  buildSitemap,
  buildStructuredData,
  site,
  siteImageUrl,
  siteKeywords,
  siteUrl,
} from "./src/seo";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "site-seo",
      transformIndexHtml(html) {
        return html
          .replaceAll("%DESCRIPTION%", site.description)
          .replaceAll("%TITLE%", site.title)
          .replaceAll("%PHOTO%", profile.photo)
          .replaceAll("%KEYWORDS%", siteKeywords)
          .replaceAll("%THEME_COLOR%", site.themeColor)
          .replaceAll("%CANONICAL_URL%", siteUrl)
          .replaceAll("%OG_LOCALE%", site.locale)
          .replaceAll("%OG_TYPE%", site.type)
          .replaceAll("%OG_IMAGE%", siteImageUrl)
          .replaceAll("%JSON_LD%", buildStructuredData())
          .replaceAll("%SEO_FALLBACK%", buildSeoFallback());
      },
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: buildSitemap(),
        });
      },
    },
    {
      name: "inline-css",
      apply: "build",
      enforce: "post",
      transformIndexHtml: {
        order: "post",
        handler(html, { bundle }) {
          if (!bundle) return html;
          let result = html;
          for (const [fileName, chunk] of Object.entries(bundle)) {
            if (fileName.endsWith(".css") && chunk.type === "asset") {
              result = result.replace(
                new RegExp(
                  `<link rel="stylesheet"[^>]*href="[^"]*${fileName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^"]*"[^>]*>`,
                ),
                `<style>${chunk.source}</style>`,
              );
              delete bundle[fileName];
            }
          }
          return result;
        },
      },
    },
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    globals: true,
    exclude: ["tests/**", "node_modules/**", "dist/**"],
  },
});
