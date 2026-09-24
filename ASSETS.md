# Socially Curated source assets

The user explicitly requested the photographs, social content and branding from the two supplied Socially Curated references. Eleven original file assets were copied through the browser asset bundler: ten images and one video. Exact source URLs and file sizes are recorded in `assets/socially-curated/sources.json`.

- Source pages: https://rar13h.github.io/socially-curated/mockup-a-editorial.html and https://rar13h.github.io/socially-curated/local-15.html
- `logo-wordmark-cream.png`: actual supplied wordmark, still used in the header. The source file is unchanged.
- `logo-wordmark-restored-mask.png`: locally saved ChatGPT recreation for the footer, 1994 × 789 pixels. CSS applies the apricot color. Source, final prompt and generation details are in `assets/socially-curated/logo-restoration.md`.
- `duo-1-sitting-back2back.png`, `duo-3-profile-phones.png`, `duo-4-front-smiling.png`: Anum & Alyna photographs from the references. Used in the reel, portfolio, founders and social preview.
- `launch-day.jpg` and `launch-day.mp4`: supplied launch artwork and film. The film is loaded when the visitor opens it, not as an autoplay hero video.
- `hero-portrait.jpg`, `creator-at-work.jpg`, `desk-flatlay.jpg`, `portrait-moody.jpg`, `beauty-flatlay.jpg`: original stock/reference imagery. Portfolio cards distinguish reference imagery from Socially Curated's founder/launch content. `portrait-moody.jpg` is retained in the bundle but is not displayed on the homepage.
- No claim is made that stock references are Socially Curated client commissions. The reference pages' contradictory actual-work/sample-content wording was not carried over.
- The initial reference merge preserved the supplied imagery. The later footer refinement generated a new logo recreation at the user’s request. Photography remains unchanged; runtime canvas cropping positions the supplied images inside the live ribbon.

The actual legal ownership and upstream stock licenses are not documented by the reference pages. This file records provenance and the user's reuse instruction, not an independent license grant.

## Fonts and historical Frame assets

The self-hosted font licenses below remain applicable. The generated assets described below are retained from the previous Frame prototype and are not the current branded page's photography.

### Historical generated assets

The portraits were made with the built-in image-generation tool for this local homepage concept. All depicted people are generated adult models. These are sample assets, not the target business's final campaign media.

- Source: `assets/portraits-source.png`
- Web asset: `assets/portraits.webp`
- Self-hosted Manrope font. Copyright 2018 The Manrope Project Authors; SIL Open Font License 1.1. Full license: `assets/Manrope-OFL.txt`. Upstream: https://github.com/googlefonts/manrope
- Self-hosted Cormorant display fonts: `assets/cormorant-regular.woff2` and `assets/cormorant-italic.woff2`. Reused from the workspace's existing Cairo design assets. Copyright 2015 the Cormorant Project Authors; SIL Open Font License 1.1. Full license: `assets/Cormorant-OFL.txt`. Upstream: https://github.com/CatharsisFonts/Cormorant ; license verified against https://raw.githubusercontent.com/google/fonts/main/ofl/cormorantgaramond/OFL.txt
- The ribbon geometry, perforations, numbering, background and motion are built in code.

## Final generation prompt

Use case: photorealistic-natural. Asset type: a single photographic contact-sheet atlas for a cinematic film-strip animation on a creative studio homepage. Create one landscape image with EXACTLY FOUR columns and TWO rows of equally sized photographic panels, precisely tiled edge-to-edge, no gaps, no margins, no borders, no text or labels, no watermark. Every panel is an independent tightly framed cinematic portrait of an adult, shoulders and head visible, with editorial fashion styling and authentic natural skin detail. Read left to right: 1 young adult woman short dark hair in a black jacket lit warm red and purple; 2 adult man dark curly hair wearing a tailored black jacket under cobalt side light; 3 adult East Asian woman in a dark green structured blazer under magenta light; 4 adult Black woman in headphones with dramatic purple and red studio lighting; second row: 5 adult man wearing sunglasses and black jacket under violet light; 6 smiling adult woman in a red top and blue jeans against a dark crimson studio background; 7 young adult woman with a light brown bob and black hoodie under purple rim lighting; 8 silver-haired mature woman in a pale suit jacket against red-magenta light. All are imaginary adult models, tasteful commercial fashion photographs, expressive but restrained, real camera quality, rich near-black shadow detail, shallow depth of field. Keep all faces comfortably inside their own panel and include sufficient space above their heads. Overall exact 4:2 grid, consistent studio quality, no film-strip graphics because those are built in code.

## Supporting studio photograph (23 September 2026)

Built-in image-generation tool; not a photograph of real Frame premises. The website labels it as a generated studio concept.

- Source: `assets/studio-source.png` (1536 × 1024)
- Website: `assets/studio.webp` (1440 × 960, quality 82, lazy-loaded)

Final prompt:

Use case: photorealistic-natural
Asset type: supporting landscape editorial photograph for a fictional creative studio website called Frame, not a UI mockup.
Primary request: an atmospheric, believable empty photography set between takes. A professional medium-format camera on a tripod sits in the right foreground, with a single simple stool and a draped charcoal seamless backdrop farther left, one visible practical studio softbox at the far edge. No people.
Composition: wide horizontal landscape 3:2, restrained documentary photography, not an equipment catalog. Diagonal morning window light falls through mild haze from upper left onto the concrete floor. Large quiet areas, architectural framing. Real material texture and modest grain.
Palette: charcoal, warm grey, silver, muted cream; subtle natural warm light, deep but legible shadows.
Constraints: no text, no logos, no watermark, no neon, no invented interfaces, no collaged layout. This is concept imagery, not evidence of a real company's premises.
