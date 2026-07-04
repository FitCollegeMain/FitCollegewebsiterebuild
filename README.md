# FIT College Website Rebuild

Rebuild of the FIT College website using [Next.js 15](https://nextjs.org) (App Router) and [Tailwind CSS 4](https://tailwindcss.com).

## Getting started

```bash
npm install
npm run dev       # dev server at http://localhost:3000
npm run build     # production build
npm start         # serve the production build
```

Static export (plain HTML/CSS in `./out`, hostable anywhere):

```bash
STATIC_EXPORT=1 npm run build
```

## Project structure

| Path | What it is |
| --- | --- |
| `app/page.tsx` | Home page |
| `app/courses/page.tsx` | Courses overview |
| `app/locations/page.tsx` | Campus locations index (grouped by state) |
| `app/locations/[slug]/page.tsx` | Individual campus detail pages (one per campus, statically generated) |
| `app/contact/page.tsx` | Contact page (form is not wired to a backend yet) |
| `app/layout.tsx` | Root layout — header, footer, metadata |
| `components/` | Shared UI (`SiteHeader`, `SiteFooter`) |
| `data/locations.ts` | **All campus data lives here** — edit this file to add/change campuses; pages update automatically |
| `data/courses.ts` | Course catalogue data |

## Editing content

- **Add or edit a campus:** edit `data/locations.ts`. Each entry's `slug` becomes its page URL (`/locations/<slug>`).
- **Edit courses:** edit `data/courses.ts`.
- **Brand colours:** defined as Tailwind theme tokens in `app/globals.css` (`--color-brand`, `--color-accent`, …).

## Known gaps / TODO

- Contact form has no backend — submissions go nowhere yet.
- Campus "Why study here" copy is a shared template, not campus-specific.
- No images/photography yet.
