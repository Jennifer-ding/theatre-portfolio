# Your theatre portfolio

A responsive React + Vite website with six sections: Home, About Me, Theatre Productions, Creative Process, Artistic Philosophy, and Contact. All writing and images are clearly labeled samples, not claims about your experience.

## Preview on your computer

1. Install the current **Node.js LTS** from https://nodejs.org (Vite requires Node 20.19+ or 22.12+).
2. Open this project folder in a terminal (VS Code: **Terminal → New Terminal**).
3. Run `npm ci` to install the exact dependencies in the lockfile.
4. Run `npm run dev`.
5. Open the local address shown in the terminal. Changes appear automatically when you save files. Press **Ctrl+C** to stop.

In a cloud editor, use its forwarded-port preview for port **5173**, if available. A localhost address on your own computer does not reach a remote cloud server. The server listens on all interfaces for cloud previews; use only a trusted development environment.

If this cloud environment reports an npm cache permission error, use `npm ci --cache /workspace/.npm-cache` instead.

## Make it yours

- Open **src/content.js**. Replace the clearly labeled sample name, biography, production details, reflections, artistic philosophy, and location. Keep the quote marks and commas around text. For an apostrophe inside single quotes, write `\'` or use double quotes around the whole text.
- Add your email to the empty `email` field to enable the email link. Contact opens the visitor’s email app; there is no form or email delivery service.
- Put your photos in **public/images/**. Change the relevant image paths in `src/content.js` to `/images/your-photo.jpg`. Add meaningful descriptions in each `alt` field. Use photos you have permission to share.
- Remove placeholder labels: search **src/main.jsx** for `PLACEHOLDER` after replacing the artwork.
- Update the page title and description in **index.html**.
- Change colors, spacing, and typography in **src/styles.css**. Google Fonts enhances the typography when internet is available; local serif and sans-serif fonts provide fallbacks.

Never put passwords or private information in the content file. All website content is visible to visitors when published.

## Production check

Run `npm run build` to create the finished site in **dist/**. Then run `npm run preview` to inspect that build on port **4173**. This is a local preview, not a public deployment. Nothing in this project automatically deploys the website.

## Files

- `src/content.js` — your editable portfolio information
- `src/main.jsx` — React sections and navigation
- `src/styles.css` — responsive design and reduced-motion support
- `public/images/` — replaceable local SVG placeholder artwork

The site includes keyboard focus styles, a skip link, semantic headings, native expandable production reflections, and a mobile menu. No backend, credentials, or database are required.
