# shoeb.netlify.app

Personal portfolio of **Shoeb Uddin Ahmed** — Software Engineer (Angular · NestJS · backend architecture).

**Live:** <https://shoeb.netlify.app>

## Stack

- **Angular 22** — standalone components, zoneless change detection, signals
- **Angular SSR** — every route prerendered at build time (`RenderMode.Prerender`); client hydration
  with event replay; below-the-fold sections wrapped in `@defer (hydrate on viewport)` so their
  JavaScript loads only when scrolled into view
- **TailwindCSS 3** with a custom palette; **ngx-lottie** for the vector animations
- **Netlify** — deploys automatically from `master` (`@netlify/angular-runtime`, App Engine server)

## Development

```bash
npm install
npm start          # dev server on http://localhost:4200
npm run build      # production build + prerender into dist/my-portfolio
```

Node 24 (see `engines` in package.json).

## Performance notes

The site is tuned to stay light while everything keeps animating:

- All animations (Lottie, the spinning card borders, bounces, colour cycles) are capped at
  **30 updates per second**; Lottie playback is driven by a shared frame clock and pauses off-screen
- Lottie JSON files are fetched lazily, the first time their box nears the viewport; the
  server-rendered HTML reserves each animation's exact box so the layout never shifts
- Fonts (Chakra Petch) are self-hosted and preloaded; hashed build assets ship with
  `immutable` cache headers (see `netlify.toml`)

## Structure

```text
src/app/
├── app.routes.ts / app.config.ts   standalone bootstrap (browser + server variants)
├── container/                      the single page: intro → about → career → skills → projects → contact
└── components/                     one component per section + the frame-capped Lottie wrapper
```
