# Digital Business Card

Personal website / digital business card for [gabriellando.com](https://www.gabriellando.com).

## About

A single-page interactive business card with a flip animation, displaying contact and professional information for Gabriel Lando, Expert Software Applications Engineer at HP Inc.

## Tech Stack

- [React](https://react.dev/): UI library
- [TypeScript](https://www.typescriptlang.org/): type-safe JavaScript
- [Vite](https://vite.dev/): build tool and dev server
- [Vitest](https://vitest.dev/): unit testing
- [Docker](https://www.docker.com/): multi-stage containerized build
- [nginx](https://nginx.org/): static file serving in production

## Customization

All personal data is kept in a single file: [`src/config.ts`](src/config.ts).  
Fork the repository and edit that file to make the card your own — no other files need to change.

| Export       | What it controls                                                                                                                                                                         |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `profile`    | Name, title, company, photo path, and all contact links (email, LinkedIn, GitHub, resume URL)                                                                                            |
| `skills`     | Array of `{ name, category }` skill tags shown on the back of the card. Each unique category is automatically assigned a color from a built-in palette, adapting to light and dark mode. |
| `experience` | Array of `{ role, meta }` entries in the Experience section                                                                                                                              |
| `education`  | Array of `{ degree, meta }` entries in the Education section                                                                                                                             |
| `stats`      | Array of `{ number, label, url? }` highlight stats at the bottom of the back. If `url` is provided, the stat becomes a clickable link                                                    |

Replace `/public/profile_picture.webp` with your own photo (keep the same filename, or update `profile.photo` in `src/config.ts`).

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
