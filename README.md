# Socially Curated

A responsive editorial website with a live WebGL film reel, scrolling process cards, portfolio gallery and inquiry form.

Live website: https://maroofkhan1.github.io/cinematic-film-reel-hero/

## Run locally

Serve this folder with any static server. For example, run `python3 -m http.server 8000`, then open http://localhost:8000.

No build step or dependencies are required. GitHub Pages publishes the `main` branch root. All assets and fonts are served locally with relative URLs.

## Inquiry form

The form validates details locally, allows review, and prepares an email to ask.sociallycurated@gmail.com. Visitors send through their email application. It does not submit to a backend or claim a confirmed booking.

## Motion and layout

The hero uses a live WebGL renderer. It respects reduced-motion preferences and falls back to a photograph when WebGL is unavailable. Layouts were checked in Chrome at mobile and desktop widths; no physical-device testing is claimed.

See ASSETS.md and DESIGN-REFERENCES.md for asset provenance.
