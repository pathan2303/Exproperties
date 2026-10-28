# Exotic Properties — website

Static site (HTML + CSS + JS). GSAP, ScrollTrigger and Lenis load from a CDN, so no build step or `npm install` is needed.

## Run locally
    python3 -m http.server 8000      # then open http://localhost:8000
(Open via a server, not by double-clicking, so images and scripts load correctly.)

## Publish on GitHub Pages
1. Upload everything in this folder to a new repo (keep the folder structure; `index.html` must be at the repo root).
2. Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / root → Save.
3. Your site appears at `https://<username>.github.io/<repo>/`.

## Things to replace (all marked as placeholders)
| What | Where |
|---|---|
| Logo | Put `exotic.png` in `assets/` (it replaces the text mark automatically) |
| Photography | Replace files in `assets/images/` (`hero-1..3`, `property-1..6`). Use `.jpg` too: just edit the `IMAGES` list at the top of `js/main.js`. Recommended: 2400×1500 landscape, under 400 KB each |
| Business email | `BUSINESS_EMAIL` in `js/main.js` (the form opens a mailto — there is no backend) |
| Properties (name, location, category) | `PROPS` in `js/main.js`; prices/size/bedrooms text is in `index.html` modal |
| Hero copy | `SLIDES` in `js/main.js` |
| Services | `SERV` in `js/main.js` |
| About copy | `#about` block in `index.html` |

The included images are generated illustrations (stand-ins), not real property photos. Properties are demonstration content only.

## Colours
Defined at the top of `css/styles.css`: obsidian #080808, charcoal #141414, crimson #C8102E, bright crimson #F0193D, ivory #F4F0E8, silver #A5A5A5.
