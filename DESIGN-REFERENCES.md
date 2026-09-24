# Socially Curated: reference merge

Updated 23 September 2026 following the user's explicit request to reuse these references' imagery, offerings, founders, social content, booking form and brand.

- [Editorial reference](https://rar13h.github.io/socially-curated/mockup-a-editorial.html)
- [Local 15 reference](https://rar13h.github.io/socially-curated/local-15.html)
- User-supplied screenshot: the oversized, low-contrast Welm wordmark at the bottom of a dark footer. Initially applied to Socially Curated's own logo and brown palette; later refined at the user's request to show the complete logo with brighter contrast.

## What came across

| Source | Content retained | Refinement |
| --- | --- | --- |
| Editorial | Cream/brown palette, Anum & Alyna, business packages, event packages, extras, published email | All packages readable in sequence, scroll-linked founder imagery and tangible deliverables; package choice carries into the project inquiry |
| Local 15 | Founder photographs, launch film and still, stock reference images, Instagram profile, four process stages, booking fields | A curated gallery with explicit source labels, playable film, full-size photo previews, scrolling process cards and a reviewable email inquiry |
| Existing site | Live film-ribbon geometry, entrance, playback controls, theme control and responsive shell | Photographs and small film labels updated to Socially Curated; visual language carried through the entire page |
| Footer screenshot | Oversized tonal wordmark with deliberate edge crop | Recreated Socially Curated wordmark, contained at large scale in apricot on espresso, with no edge crop |

## Page journey

1. Your story. Curated. — live reel, clear service description, visible Book us action.
2. A creative partnership — concise positioning.
3. Services — what we make and manage, three brand packages in sequence beside founder imagery, followed by a launch-film preview and three open event entries with coverage and delivery timing. Each has visible deliverables and a direct route to enquiry.
4. The content edit — launch/founder work and clearly labelled reference directions.
5. What to expect — four overlapping scroll cards for discovery, creative direction, shoot/edit, delivery/review. Large numbers, progressively warmer surfaces and four-part progress markers preserve orientation.
6. Meet the creators — bright founder photographs, personal copy and a single staggered entrance.
7. A little more social — a curated, swipeable Instagram preview with real profile links.
8. Book us — a clear invitation to plan content and socials, a founder photograph, next-step explanation and one visible project inquiry form. Exact package preselection, inline errors and a review with email draft/copy/download remain.
9. The oversized, fully visible apricot brand signature, followed by copyright and Back to top.

## Deliberate decisions

- The user explicitly requested the Socially Curated brand and its assets. This supersedes the earlier Frame-only placeholder assumption.
- Preserve exact source photos rather than generate replacements. Do not label stock reference imagery as completed client commissions.
- The gallery opens supplied local media. It does not pretend still photographs are playable Reels, and it does not fabricate individual post URLs or engagement data.
- Use the published Instagram profile; the sources do not provide a verified individual TikTok URL to link.
- The original booking form had no action endpoint. The replacement prepares an email to the actual published address and states how sending works.
- Native buttons, radios, inputs and dialog provide keyboard support. Services use normal document flow and standard links; no tabs conceal package information. Form validation and review manage focus; errors identify the field; Back/Edit retain answers. Escape, focus restoration and reduced-motion CSS support predictable interaction.
- The footer retains a dark brown field in both appearance choices. The latest user feedback replaces the initial dim edge crop with a complete wordmark, stronger apricot contrast, and copyright below the artwork.
- Default paper `#F7F2EB`, cream `#E4DDD3`, brown `#3D1700`, mauve `#95847C`, charcoal `#202123`. Dark appearance uses ink `#14100C` and peach `#E9B98F`.

## Process-card refinement

The user requested scroll animation for the four process steps. Each card holds briefly with native CSS sticky positioning while the next moves over it; reverse scrolling retraces the movement. Desktop keeps the introduction alongside the stack, while phones show it above. A small script equalizes card heights and enables sticking only when the entire card plus the stack edges fit the viewport. Reduced motion, short viewports and JavaScript-off layouts preserve normal document flow. There is no wheel interception or scroll-event animation loop.

## Services and inquiry refinement

The user requested more engaging services and a simpler mobile form. The service copy now explains content creation, social management and event coverage before the packages. Following feedback about unnecessary clicks, the selector was replaced with a continuous layout: all six packages and all 33 deliverables stay visible. On desktop a sticky founder portrait changes as the corresponding brand package reaches the reading area. The initial side-by-side event comparison was subsequently replaced with three open editorial entries beside the original launch film. Coverage hours, inclusions and delivery timing remain visible without tabs or disclosures. Brand add-ons now sit directly below the brand packages. Phones use a vertical layout with a static opening brand image. IntersectionObserver adds one-time entrances without hiding content or intercepting scrolling. Reduced motion keeps everything static, and content remains readable without JavaScript. The form was subsequently simplified to one visible form and a review after the user requested clearer copy, a stronger left column and a less fragmented experience. Service labels now name the actual work. The founder photograph is larger, with an explicit explanation of the conversation and scope discussion that follow. On phones the form precedes the founder details in both visual and document order. An exact-package path from services, 16px controls and inline validation remain. Only name, email and a short project description are required. The review remains an honest email-draft handoff, since no receiving endpoint is configured.

## Files and history

Current source: `outputs/cinematic-film-reel-hero/` in the workspace. The pre-brand version is preserved at `outputs/cinematic-film-reel-hero-before-socially-curated-2026-09-23/`. The earlier pre-editorial version is also retained. `qa/socially-*` describes this implementation; earlier QA files describe historical versions.
