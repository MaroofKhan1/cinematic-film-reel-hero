# GitHub Pages deployment

This is a complete static website. Publish this folder's contents as the root of a dedicated repository; do not publish the parent workspace.

1. Create a GitHub repository named `cinematic-film-reel-hero` (or use an existing dedicated repository). A public repository works with GitHub Free.
2. Push the contents of this directory to its `main` branch, preserving the `assets/` directory. Upload the files themselves, not a ZIP file.
3. In the repository, open **Settings > Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select **main**, **/(root)**, and **Save**.
6. When GitHub reports a successful Pages deployment, open the URL shown in Settings > Pages. It normally has the form `https://OWNER.github.io/cinematic-film-reel-hero/`.

All website URLs are relative, so a project subdirectory works without replacing asset paths. `.nojekyll` tells GitHub to serve the static files directly. No npm installation, framework, backend, API key, or custom build workflow is required.

## Local preview

With Python 3 installed, open a terminal in this folder:

- macOS/Linux: `python3 -m http.server 8000`
- Windows PowerShell/Command Prompt: `py -m http.server 8000`

Then visit `http://localhost:8000`. Press Ctrl+C to stop. If the Windows Python launcher is unavailable but Python is installed, use `python -m http.server 8000`.

## Files to keep for the homepage

- `index.html`, `.nojekyll`
- `hero.css`, `hero-editorial.css`, `navigation.css`, `socially.css`, `story.css`, `booking.css`, `process.css`
- `homepage.js`, `ribbon.js`, `theme.js`, `site.js`, `story.js`, `booking.js`, `inquiry.js`, `process.js`
- The complete `assets/` directory, including the self-hosted fonts and `assets/socially-curated/` images and launch film.

Keep file and directory names exactly as supplied. GitHub Pages is case-sensitive. All runtime assets use relative paths and work at a repository subpath.

`partials/` and `tools/sync-sections.py` support future content edits. `tests/`, `qa/`, the Markdown documentation and historical export files are optional handoff material; the homepage does not need them to run. The hero is rendered live in WebGL, not played from an exported video. The launch film in the portfolio loads only when opened.

## Inquiry behavior

GitHub Pages hosts static files and does not receive inquiries. The current form validates details in the browser, shows a review, and opens an email draft addressed to `ask.sociallycurated@gmail.com`. The visitor sends that draft in their mail app. Copy and text-file download are available as alternatives. No submission or booking is claimed until the user sends their email; there is no connected form backend.

## Browser behavior

The target is current Chrome, Edge, Firefox, and Safari on desktop and mobile. The animation runs live in WebGL; Windows visitors use the same URL and need no application installed. Browsers without usable WebGL retain a static poster and all navigation/content. Reduced-motion preferences pause the animation. The animation plays automatically without a visible playback control.

Physical Windows and iOS/Android devices have not been tested in this environment. See `qa/compact-hero-verification.md` and the linked QA records in `README.md` for the actual checks performed.

Official guidance: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
