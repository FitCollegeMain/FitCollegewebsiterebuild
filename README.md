# FIT College — Website Rebuild

A rebuild of the [FIT College](https://www.fitcollege.edu.au) website in
[Next.js 15](https://nextjs.org) (App Router), [React 19](https://react.dev)
and [Tailwind CSS 4](https://tailwindcss.com), written in TypeScript.

FIT College is a nationally recognised RTO (RTO 31903) delivering fitness
qualifications on campus at 20 locations and online, Australia-wide.

---

## Run it from a fresh clone

**Requirements:** Node.js 20+ (built and tested on Node 22) and npm 10+.

```bash
git clone <this-repo-url>
cd FitCollegewebsiterebuild
git checkout claude/quirky-mendel-jc9321   # active development branch
npm install
npm run dev
```

Open **http://localhost:3000**. That's the working demo — every page,
the campus finder, the lead-capture modal and the advisor routing all run.

### Other commands

```bash
npm run build            # production build (server target)
npm start                # serve the production build at :3000
npm run lint             # eslint / next lint

STATIC_EXPORT=1 npm run build   # emit plain static HTML/CSS to ./out
```

`./out` is a fully static copy you can drop on any static host (S3, Netlify,
Nginx, GitHub Pages). Use it for a zero-backend preview. **Note:** the
lead-capture modal is a client React component — it works in `npm run dev`
and `npm start`, and also in the static export, but the static export has no
server to receive form posts (see [HANDOFF.md](./HANDOFF.md#lead-capture)).

---

## What's in the box

| Path | What it is |
| --- | --- |
| `app/page.tsx` | Home page |
| `app/courses/` | Courses index, per-course pages, Complete PT, International (CRICOS) |
| `app/fit-elite/page.tsx` | FIT Elite™ dual-career program |
| `app/study-online/page.tsx` | Online study page |
| `app/locations/` | Campus finder + one page per campus (20, statically generated) |
| `app/funding/page.tsx` | QLD Career Start funding page |
| `app/faqs/page.tsx` | FAQs (with FAQPage structured data) |
| `app/contact/page.tsx` | Contact page (form not yet wired to a backend) |
| `components/` | Shared UI — header, footer, maps, marquees, lead modal |
| `data/` | **All content lives here** — edit these, pages update automatically |

**Content is data-driven.** To add a campus, edit `data/locations.ts`; to
edit a course, edit `data/courses.ts`. Pages regenerate from those files —
you rarely touch JSX to change copy. See
[HANDOFF.md](./HANDOFF.md) for the full data-file guide.

---

## Documentation

- **[HANDOFF.md](./HANDOFF.md)** — developer hand-off: architecture, the
  data model, brand tokens, the CSS-only interactivity patterns, deploy
  options, and the prioritised list of what's left to wire up before launch.
- **[SITEMAP.md](./SITEMAP.md)** — full sitemap of the **previous** live
  site vs **this** rebuild, page-by-page, with the redirect map and content
  gaps.

## Brand

Core Black `#181818`, Energy Red `#CE2829`, Academy Blue `#21428d`. Type is
Poppins (body) + Archivo (a stand-in for the licensed Halyard Display).
Tokens are defined in `app/globals.css` under `@theme`.
