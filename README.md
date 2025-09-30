# Sylvestri Team Website

Static marketing site for Ryan Sylvestri (RE/MAX Town & Country). The source lives under `src/` and compiles into production-ready HTML/CSS/JS at the project root for simple static hosting.

## Project structure

```
.
├── index.html             # Generated from src/pages/index.html (do not edit manually)
├── assets/                # Generated static assets
├── src/
│   ├── assets/            # Authoring versions of CSS/JS
│   ├── pages/             # Page bodies with optional meta blocks
│   ├── partials/          # Shared includes (nav, footer, etc.)
│   └── layout.html        # Base HTML shell used by every page
└── scripts/
    ├── autopush.sh        # Helper script (build + commit + push)
    └── build.js           # Static build pipeline
```

## Commands

```bash
npm run build   # Compile src -> index.html + assets/
npm run dev     # Rebuild, then serve at http://localhost:8000
./scripts/autopush.sh "message"  # Build, commit, and push
```

> `autopush.sh` automatically runs `npm run build` before checking for changes, so output files are always in sync with the source.

## Authoring new pages quickly

1. Create a new file in `src/pages/`, e.g. `buyers.html`.
2. (Optional) Add a meta comment at the top to override defaults:
   ```html
   <!--meta
   {
     "title": "Buyer Services | Sylvestri Team",
     "description": "Personalised buyer representation across the Hudson Valley",
     "keywords": "hudson valley buyer agent"
   }
   -->
   ```
3. Add the page-specific sections below the comment. The global navigation, footer, base styles, and scripts are injected automatically.
4. Run `npm run build` (or let `./scripts/autopush.sh` do it) so the generated HTML appears at `buyers/index.html`.

The navigation menu lives in `src/partials/nav.html`. Update it whenever you introduce a new top-level page so links stay in sync. Shared styling belongs in `src/assets/css/styles.css`, and behaviour in `src/assets/js/script.js`.

## Local preview

After running `npm run build`, use any static file server (such as `python3 -m http.server 8000`) from the repository root and browse to `http://localhost:8000`.


## Jump back in

1. Open a terminal (or Cursor shell) and run `cd ~/sylvestriteam`.
2. Pull latest changes if needed: `git pull`.
3. Install deps once per machine: `npm install` (already done if `node_modules` exists).
4. Start iterating:
   - `npm run build` to regenerate the static output.
   - `npm run dev` for a quick rebuild + local server at `http://localhost:8000`.
5. When finished, publish via `./scripts/autopush.sh "your message"` (runs build -> commit -> push).

## Action items

- Add new top-level pages under `src/pages/` (buyers, sellers, resources) and wire them into `src/partials/nav.html`.
- Replace remote image URLs with local assets in `src/assets/` for faster loads and offline editing.
- Drop in `favicon.png` at the project root to remove the broken favicon reference.
- Set up analytics/lead tracking snippets via the `headExtra` or `bodyScripts` meta fields where needed.
- Write lightweight content guidelines so future prompts keep voice and compliance consistent.
- Configure deployment (e.g., Netlify, GitHub Pages, or custom hosting) pointing the `sylvestriteam.com` domain to the compiled site.

## Notes

- `favicon.png` is referenced but not tracked—drop the icon in the project root when ready.
- All generated files (`index.html`, `assets/`, additional page folders) are committed so the repo remains deploy-ready.
