# Experience production layouts

Scope: only the four non-original-play detail pages in Act II. Existing cover cards and their content, A WAN, Friendship, the homepage and other Acts are unchanged.

Each placement is a real button containing its original photograph, not a flattened slide. Click to inspect the uncropped original; the lightbox has previous/next buttons, arrow-key navigation, Escape/Close/backdrop dismissal, and focus/scroll restoration. All filenames and extensions below are exact. Source photographs are unchanged.

## Visual mapping to the supplied slides

### I Just Want to Be Normal

Folder: `public/images/experience/normal/`

- `normal-03大.jpeg`: upper middle — two performers, one touching the other's shoulder.
- `normal-02大.jpeg`: upper right — performer elevated on a block.
- `normal-04大.jpeg`: lower left — seated performer between two picture frames.
- `normal-01大.jpeg`: lower right — wide view of three framed performers.

Date: February 19, 2025. Credits: Director / Lighting Designer / Actor.

### The Effect of Gamma Rays on Man-in-the-Moon Marigolds

Folder: `public/images/experience/gamma-rays/`

- `gamma-rays-01大.jpeg`: upper right — walking performer beside the table.
- `gamma-rays-02大.jpeg`: lower left — newspaper and hairbrush scene.
- `gamma-rays-03大.jpeg`: large lower/right image — three performers, one at the table.

Date: April 14, 2025 (the written instruction takes precedence over text in the screenshot). Credits: Director / Actor.

### Hamilton: Alexander Hamilton

Folder: `public/images/experience/hamilton/`

- `hamilton-03大.jpeg`: tall upper center — white dress and white coat.
- `hamilton-02大.jpeg`: upper right — seated/standing ensemble.
- `hamilton-01大.jpeg`: lower left — silhouettes against Hamilton backdrop.
- `hamilton-05大.jpeg`: lower center — standing ensemble raising glasses.
- `hamilton-04大.jpeg`: tall lower right — red coat and microphone.
- The unconfirmed small ensemble inset beneath the title is omitted, as requested. No replacement photograph or placeholder is displayed.

Date: December 19, 2025. Credits: Director / Actor.

### The Lion King (Adaptation)

Folder: `public/images/experience/lion-king/`

- `lion-king-01.jpeg`: upper left — ensemble joining hands.
- `lion-king-02.jpeg`: tall upper center — kneeling/raised-arms ensemble.
- `lion-king-03.jpeg`: upper right — two performers leaning together.
- `lion-king-05.jpeg`: middle left — expressive faces and reaching hands.
- `lion-king-04.jpeg`: lower right — wide stage view with gold curtains.

Date: November 23, 2025. Credits: Director / Actor.

## Layout boundaries

Desktop retains the individually measured photo positions on a 16:9 canvas for Normal, Hamilton and Lion King. Gamma Rays uses a taller 16:11 composition with three separate photo areas and clear gaps. Mobile uses per-production coordinates; Gamma Rays has a 2:3 canvas with no overlapping photos. These remain bespoke compositions rather than automatic grids. The surrounding presentation uses the site's existing deep-plum background, warm ivory serif titles and subtle lavender metadata above the collage. PPT color blocks, decorative lines and thick frames have been removed. Images use `object-fit: contain` with transparent surroundings to retain all original content and proportions; where the PPT uses a crop, full-image fitting necessarily differs from that crop.

Editable layout data: `src/prototype/production-layouts.js`. Positions are explicit [left, top, width, height] percentages. Dates/credits here are confined to the detail views, preserving the existing cover cards exactly as requested.

Preview route suffixes: `/prototype.html#/act/II/normal`, `/prototype.html#/act/II/marigolds`, `/prototype.html#/act/II/hamilton`, `/prototype.html#/act/II/lion-king`.
