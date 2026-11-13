# Architecture Portfolio

Open `index.html` in a browser. No dependency installation or build step is required.

All website resources live strictly in `assets`:

```text
index.html             Website entry page
project.html           Project detail page (same tab, selected by ?id=1...13)
assets/css/style.css   Responsive styles
assets/js/script.js    Interactions and placeholder project names
assets/js/projects.js  Image manifest for the 13 project galleries
assets/js/project.js   Project detail rendering and navigation
assets/img/01_Name...13_Name/    Your existing images, used directly
assets/downloads/      Downloadable placeholder portfolio PDF
```

The layout supports laptops, tablets, and phones. Project cards open a separate detail page in the same tab, with a back link and previous/next project navigation. Includes category filters, mobile navigation, and reduced-motion preferences. Project titles use the image folder names, with numeric prefixes removed and underscores displayed as spaces. Branding, biography, categories, and email are placeholders. Replace the PDF in `assets/downloads` with your final portfolio when ready.

Replacing existing images updates the site directly. Adding or renaming images or project folders requires updating `assets/js/projects.js`, which stores titles, cover paths, and gallery paths.

## GitHub Pages

Select **Settings > Pages > Source > GitHub Actions** in the repository, then push to the default branch (`master` or `main`). The workflow checks JavaScript syntax and required assets, stages `index.html` and `assets` together, and deploys. No custom secret is needed. Manual deployment is available in the Actions tab.

Local file and gallery checks have passed. Browser rendering and live deployment have not yet been verified.
