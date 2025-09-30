# Sylvestri Team Website

Static marketing site for Ryan Sylvestri (RE/MAX Town & Country). The project uses the provided single-page HTML theme with bespoke CSS and JavaScript built from scratch.

## Project structure

```
.
├── index.html             # Main single-page layout
├── assets
│   ├── css
│   │   └── styles.css     # Core styles and responsive rules
│   └── js
│       └── script.js      # Navigation, counters, utility behaviours
└── scripts
    └── autopush.sh        # Helper script for commit + push workflow
```

## Local preview

Serve the site with any static HTTP server. For example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Auto-push workflow

Use the helper script whenever you are ready to publish changes:

```bash
./scripts/autopush.sh "commit message here"
```

The script stages all updates, commits with the provided message (falls back to a timestamped message if omitted), pushes to `origin`, and reports the status. It exits early when there is nothing new to commit.

## Editing guidance

- Keep assets organised inside the `assets` directory.
- Maintain the existing visual language (typography, colour palette, glassmorphism accents) when extending the page.
- Stick to semantic HTML sections so navigation anchors continue to work with the active-link highlighting in `script.js`.

