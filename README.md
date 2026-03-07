# Digital Business Card

Personal website / digital business card for [gabriellando.com](https://www.gabriellando.com).

## About

A single-page interactive business card with a flip animation, displaying profile, links, skills, experience, education, and highlight stats for Gabriel Lando.

## Tech Stack

- [React](https://react.dev/): UI library
- [TypeScript](https://www.typescriptlang.org/): type-safe JavaScript
- [Vite](https://vite.dev/): build tool and dev server
- [Vitest](https://vitest.dev/): unit testing
- [Playwright](https://playwright.dev/): responsive browser testing
- [Docker](https://www.docker.com/): multi-stage containerized build
- [nginx](https://nginx.org/): static file serving in production

## Customization

All personal data is kept in a single file: [`src/config.ts`](src/config.ts).  
Fork the repository and edit that file to make the card your own — no other files need to change.

| Export       | What it controls                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `profile`    | Name, title, company, summary, SEO description, photo path, and contact links (email, LinkedIn, GitHub, resume URL)                         |
| `siteConfig` | Site origin and social preview image used by the SEO metadata                                                                               |
| `skills`     | Array of `{ name, category }` skill tags shown on the back of the card. Categories are used to group skill colors through the app palette.  |
| `experience` | Array of `{ role, meta }` entries in the Experience section                                                                                 |
| `education`  | Array of `{ degree, meta }` entries in the Education section                                                                                |
| `stats`      | Array of `{ number, label, url? }` highlight stats shown at the bottom of the back. If `url` is provided, the stat becomes a clickable link |

Replace `/public/profile_picture.webp` with your own photo (keep the same filename, or update `profile.photo` in `src/config.ts`).

The `profile.summary`, `profile.description`, and `siteConfig` fields also feed the generated SEO metadata and static fallback content.

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Run unit tests:

```bash
npm test
```

Run cross-browser responsive tests in Chromium and Firefox:

```bash
npm run playwright:install
npm run test:e2e
```

Run both unit and browser tests:

```bash
npm run test:all
```
