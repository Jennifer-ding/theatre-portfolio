# Eight Acts — collage redesign

Branch: `feature/eight-acts-collage-redesign`, based on the preserved `feature/eight-acts-prototype` branch.

The redesigned prototype is **prototype.html**, not the original website at index.html. Its eight-act sequence, content file, hash routing, production IDs, notebook fields, media placeholders and 3/5-minute short edits remain intact. The original prototype branch and main are not modified.

## Visual changes

- Rich plum, violet, lavender and cream paper surfaces; restrained print grain, tape and archival labels.
- All six repertoire cards are perforated theatre tickets with date/year, credits, category and a photography area. A WAN and Friendship are featured lavender tickets, with a real accessible link covering the entire card.
- Narratives combines editorial text, taped paper and asymmetric photo frames. Notes uses paper pages, margin numbering and notebook tabs.
- Journey, art, athletics, personal notes and future questions share the same visual language without changing their content.
- `src/prototype/collage.css` is the visual override layer; the original base stylesheet is retained.

## Preview locally

Run `npm ci`, `npm run build`, then `npm run preview`. Open the address printed by Vite and add **/prototype.html**. In the cloud, npm may need `npm ci --cache /workspace/.npm-cache`.

## Preview on Vercel without changing production

If your repository is already connected to a Vercel project:

1. Sign in at https://vercel.com/dashboard and open the project connected to **Jennifer-ding/theatre-portfolio**.
2. Click **Deployments**. Look for a deployment for **feature/eight-acts-collage-redesign**, with environment **Preview**.
3. If there is none, use **Create Deployment** (it may be in the page's menu). Enter/select the Git branch **feature/eight-acts-collage-redesign**. Choose **Preview** if an environment option is shown, then create the deployment. Do not choose Production or Promote to Production.
4. The project should use framework **Vite**, build command **npm run build**, output directory **dist**, and the repository root directory. No environment variables are needed. Existing production settings should not be changed just to preview this branch.
5. Wait for **Ready**, open that deployment, and click **Visit**.
6. Append **/prototype.html** to the deployment URL. The base URL intentionally still shows the original website. For example: `https://<your-preview-domain>/prototype.html`.
7. Click the second letter **E** for Act II and choose either featured ticket to test the full journey. The Preview URL may require Vercel login if deployment protection is enabled.

If no Vercel project is connected, you must first connect/import the GitHub repository through Vercel. To keep an existing live project safe, use a separate Vercel project for the redesign and select this exact branch where Vercel offers a branch/ref selection. Do not deploy main expecting it to contain the redesign. If the import screen does not allow branch selection, finish connecting the repository, then create a **Preview** deployment from this branch using the steps above. Initial project creation can create a Production deployment for the new project; it is not required to replace or attach your existing website domain. Do not change your existing project's production branch or custom domain.

No Vercel deployment is created by this code change. Git-integrated Vercel may automatically create a Preview on push; check the branch and environment before opening it. Never promote the preview or merge the branch unless you want a separate production change.

## Validation

The production build includes both original website and redesigned prototype. Browser validation covers eight acts, both production/notebook journeys, history, refresh, return links, mobile layout, all six ticket cards, notebook index and reduced motion. Visual placeholders remain intentional; no personal material has been supplied or invented.
