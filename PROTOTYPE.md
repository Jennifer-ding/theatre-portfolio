# Eight Acts of Jennifer — visual prototype

This prototype is separate from the existing production website. `index.html` and the existing `src/main.jsx`, `src/styles.css`, and `src/content.js` are unchanged.

## Open it

From this folder, run `npm ci` then `npm run dev`. Open the address shown by Vite and append `/prototype.html` to its path. For a production check, run `npm run build` then `npm run preview` and use the same `/prototype.html` path. The original website remains at `/`.

Cloud npm cache workaround: `npm ci --cache /workspace/.npm-cache`.

## Edit approved material

All prototype content is in **src/prototype/content.js**. Empty values intentionally render elegant, explicitly labeled placeholders. No personal statements, production credits, dates, scenes, scripts, achievements or comparisons have been invented.

- `personal`: biography, timeline, art, athletics, personal observations and future questions.
- `productions`: six repertoire entries. Only A WAN and Friendship are original-play pages.
- Each original has `synopsis`, `motivation`, `scenes` (objects with `title` and `summary`), `photos`, `script`, `fullVideo`, `shortVideo`, and a `notebook`.
- Photos/artworks: objects with `src`, `alt`, and optional `caption`. Place images in `public/images/` and use `/images/filename.jpg`.
- Script: path to an actual PDF in `public/`, e.g. `/scripts/a-wan.pdf`. Only publish with the author's permission.
- Videos: playable video-file URLs or public-file paths, not third-party watch-page URLs. The short-edit placeholders are 3 minutes for A WAN and 5 minutes for Friendship; supplying the correct edited files is still required.
- Friendship alone has `comparisons`: objects with `title`, `text`, and `source`. Add only comparisons supported by actual supplied material. A WAN has no comparative section.
- Notebook fields support multiline text; use `\n` for line breaks. This prototype has no in-browser editor or persistence backend: edit the content file and save.

## Navigation and boundaries

JENNIFER letters have unique Act labels even where letters repeat. Routes use browser hashes, so refresh, direct links, and browser Back/Forward preserve the selected production without server rewrite rules:

- `/prototype.html#/act/II`
- `/prototype.html#/act/III/a-wan`
- `/prototype.html#/act/IV/a-wan`
- `/prototype.html#/act/III/friendship`
- `/prototype.html#/act/IV/friendship`

Google Fonts is optional; serif and sans-serif fallbacks work without it. Reduced-motion preferences are respected. The original photographs and media are pending, so the typographic poster designs are explicitly marked placeholders.

No public deployment is configured. Do not merge or deploy this feature branch to the production website without separate approval. The multi-entry Vite build emits both the original `dist/index.html` and `dist/prototype.html`.
