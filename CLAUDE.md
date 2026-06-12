# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# benjft.github.io — Personal Portfolio

Personal portfolio site built with **Astro 4** and **React 18**, deployed to GitHub Pages at [benjft.github.io](https://benjft.github.io).

## Development

All development is done inside the devcontainer. Open the project in VS Code or a JetBrains IDE with devcontainer support — the container uses the `javascript-node:24` image (Node 24), enables Corepack, and runs `pnpm install` automatically on creation. The pnpm version is pinned via the `packageManager` field in `package.json`. Prettier runs format-on-save in the editor, but there is no Prettier CLI script.

```bash
pnpm dev      # Start dev server at http://localhost:4321 (hot reload)
pnpm build    # Build static output to dist/
pnpm preview  # Preview the production build locally
```

The dev server binds to `0.0.0.0` (`--host`) so it's accessible from the host machine via port 4321, which is forwarded by the devcontainer.

## Project Structure

```
src/
  components/
    Hero.tsx        # React — hero section with CTA buttons
    Projects.tsx    # React — project card grid (edit projects array here)
    About.astro     # Astro — about section with skills list
    Contact.astro   # Astro — contact links
    Nav.astro       # Astro — fixed navigation bar
  layouts/
    Layout.astro    # Base HTML shell, loads Google Fonts
  pages/
    index.astro     # Single-page entry point, composes all sections
  styles/
    global.scss     # All site styles — tokens, reset, and per-section rules
public/
  favicon.svg       # SVG favicon
```

## Technology

- **Astro 4** — static site generator; `.astro` components for layout and static sections
- **React 18** — used for interactive components (`Hero`, `Projects`); loaded with `client:load`
- **TypeScript** — strict mode via `astro/tsconfigs/strict`
- **Sass (SCSS)** — all styles live in a single global stylesheet (`src/styles/global.scss`), imported once by `Layout.astro`. Component-specific rules are nested under their section/element selector (e.g. `#hero`, `nav`, `#projects`) to stay scoped without per-component `<style>` blocks. No CSS framework — design tokens are CSS custom properties on `:root`.
- No test runner or linter is configured; `pnpm build` (which type-checks `.astro` files) is the only automated check.

## Architecture

The whole site is a single page (`src/pages/index.astro`) that imports each section component and composes them in order: `Nav → Hero → About → Projects → Contact → footer`.

This is an **Astro islands** architecture — everything renders to static HTML at build time. React components ship zero client JS *unless* hydrated with a `client:*` directive. Only `Hero` and `Projects` use `client:load` in `index.astro`; `.astro` components (`Nav`, `About`, `Contact`, `Layout`) are static-only. When adding interactivity, prefer an `.astro` component and reach for a hydrated React island only where client-side behaviour is genuinely needed.

## Content Customisation

| What to update | Where |
|---|---|
| Name, tagline, intro copy | `src/components/Hero.tsx` |
| Bio and skills list | `src/components/About.astro` |
| Projects (title, description, tags, links) | `projects` array in `src/components/Projects.tsx` |
| Contact links | `links` array in `src/components/Contact.astro` |
| Nav links | `links` array in `src/components/Nav.astro` |
| Colour palette / all styles | `src/styles/global.scss` |

## Deployment

The site targets GitHub Pages. Build output goes to `dist/`. A GitHub Actions workflow for automated deployment can be added later.
