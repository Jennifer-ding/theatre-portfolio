# Jennifer — homepage cover update

Branch: `feature/eight-acts-homepage-cover`, based on `feature/eight-acts-collage-redesign`.

Only the landing cover has changed. The playbill below it, shared navigation, eight act pages, repertoire tickets, Narratives/Notes flow, original site, and previous branches are preserved. The reference image was not available in the request; this version follows the supplied written visual direction.

## Edit the cover

Open `src/prototype/coverContent.js`:

- `name` and `roles` use the information Jennifer supplied.
- `introduction` and `note` stay empty until approved writing is ready. Empty values display clearly labeled placeholders.
- `photos` contains three slots. Place your own files in `public/images/` and fill `src` with `/images/your-photo.jpg`, `alt` with a meaningful visual description, and `caption` with your approved caption.

Layout lives in `HomepageCover.jsx` and `homepage-cover.css`. The CSS is scoped to homepage-specific class names. Each letter of the hero JENNIFER title links to its corresponding act. The Enter My World CTA opens Act I.

## Preview on Vercel

1. Sign in at https://vercel.com/dashboard and open the project linked to `Jennifer-ding/theatre-portfolio`.
2. Select **Deployments**. Find the **Preview** deployment for `feature/eight-acts-homepage-cover` (commit shown on GitHub).
3. If Git integration has not created it, choose **Create Deployment** (sometimes under the page menu), enter `feature/eight-acts-homepage-cover` as the Git reference, and select **Preview** if prompted.
4. Build settings are Vite, `npm run build`, output `dist`, repository root. No environment variables are needed. Do not change the production branch, domains or production settings.
5. Once **Ready**, click the deployment, then **Visit**. Add `/prototype.html` to the deployment URL to see this cover. The bare `/` intentionally still shows the original site.
6. To try the entrances, click individual letters in JENNIFER or click **Enter My World**. Browser Back returns to the cover.

Do not merge the branch or click **Promote to Production**. No Vercel deployment was created from this workspace; a linked Vercel project may create Preview deployments automatically after push. If you have no Vercel project yet, see `COLLAGE-REDESIGN.md` for connection guidance.

## Local preview

Run `npm ci`, `npm run build`, then `npm run preview`. Append `/prototype.html` to the address Vite prints. Cloud npm installs may need `--cache /workspace/.npm-cache`.

## Validation

Production build and Chromium checks cover the desktop/mobile homepage at 1440, 1024, 768, 700, 390 and 320 pixels; all eight hero entrances; the CTA; browser Back and refresh; and regressions for the eight acts and both production/notebook journeys. Placeholders are intentional: no original photography or personal introduction has been invented.
