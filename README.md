# Riya Tiwari — Portfolio

React + Vite + Tailwind CSS v4 + GSAP (ScrollTrigger, `@gsap/react`) + Lenis smooth scrolling.
Design direction: "Cinema" (near-black, condensed Anton headlines, one lime accent, horizontal project strip).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build locally
```

## Edit your content (everything lives in `src/data/`)

| File | What it controls |
| --- | --- |
| `personalInfo.js` | Name, status, intro, About text, stats, email, LinkedIn, GitHub, résumé path |
| `projects.js` | Project cards. Empty `github` / `demo` / `caseStudy` hide that button. `image` takes a screenshot import |
| `skills.js` | Skill groups |
| `experience.js` | Experience, education, certifications (newest first) |
| `approach.js` | "How I work" steps |
| `navigation.js` | Nav links |

- **Résumé button:** copy your PDF into `public/` and set `resume: "/YourFile.pdf"` in `personalInfo.js`.
- **Project links:** add the real repo / live URLs in `projects.js`. Nothing is shown until you do.
- **Screenshots:** put images in `src/assets/images/`, `import shot from "../assets/images/docchat.png"`, then set `image: shot`.
- **Share image:** add an `og:image` tag in `index.html` (a comment marks the spot).
- **Colors / fonts:** `src/styles/index.css` (`@theme` block).

## Structure

```
src/
  animations/   gsapConfig.js (plugin registration), smoothScroll.js (Lenis bridge), animationHelpers.js
  components/   layout/ (Navbar, Footer, PageLoader, SmoothScroll), common/, projects/, ui/
  sections/     Hero, About, Projects, Skills, Experience, Approach, Contact
  data/         all editable content
  hooks/        useReducedMotion.js
  styles/       index.css (tokens + base + component classes)
```

## Motion and accessibility notes

- All GSAP code runs through `useGSAP` with a scope, so triggers and tweens are cleaned up on unmount.
- `prefers-reduced-motion`: no loader, no Lenis (native scrolling), no GSAP animation. All content is visible.
- No pinning or scroll hijacking. The project strip is a native horizontal scroller with snap, mouse drag and arrow buttons.
- The custom cursor only mounts on fine-pointer devices; the native cursor is never hidden.
- Lenis is used for smooth scrolling because it is actively maintained and works cleanly with ScrollTrigger.

## Deploy

`npm run build`, then upload `dist/` to Vercel, Netlify or GitHub Pages (set `base` in `vite.config.js` for a GitHub Pages subpath).
