# benjft.github.io — Personal Portfolio

Personal portfolio site built with **Astro 4** and **React 18**, deployed to GitHub Pages at [benjft.github.io](https://benjft.github.io).

## Development

All development is done inside the devcontainer. Open the project in VS Code or a JetBrains IDE with devcontainer support — the container uses Node 20 on Debian Bullseye and runs `npm install` automatically on creation.

```bash
npm run dev      # Start dev server at http://localhost:4321 (hot reload)
npm run build    # Build static output to dist/
npm run preview  # Preview the production build locally
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
    global.css      # CSS custom properties, reset, shared utilities
public/
  favicon.svg       # SVG favicon
```

## Technology

- **Astro 4** — static site generator; `.astro` components for layout and static sections
- **React 18** — used for interactive components (`Hero`, `Projects`); loaded with `client:load`
- **TypeScript** — strict mode via `astro/tsconfigs/strict`
- No CSS framework — uses CSS custom properties defined in `global.css`

## Content Customisation

| What to update | Where |
|---|---|
| Name, tagline, intro copy | `src/components/Hero.tsx` |
| Bio and skills list | `src/components/About.astro` |
| Projects (title, description, tags, links) | `projects` array in `src/components/Projects.tsx` |
| Contact links | `links` array in `src/components/Contact.astro` |
| Nav links | `links` array in `src/components/Nav.astro` |
| Colour palette | CSS custom properties in `src/styles/global.css` |

## Deployment

The site targets GitHub Pages. Build output goes to `dist/`. A GitHub Actions workflow for automated deployment can be added later.
