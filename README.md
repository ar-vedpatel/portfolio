# Architecture Portfolio

Open `index.html` in a browser. No dependency installation or build step is required.

All website resources live strictly in `assets`:

```text
index.html             Website entry page
project.html           Project detail page (same tab, selected by ?id=1...13)
about.html             Biography, education, experience, tools, and contact
assets/css/style.css   Responsive styles
assets/css/about.css   About page layout
assets/js/script.js    Homepage interactions
assets/js/projects.js  Image manifest for the 13 project galleries
assets/js/project.js   Project detail rendering and navigation
assets/js/navigation.js  About page mobile navigation
assets/js/motion.js    Shared reveal animations
assets/icons/tools/    Local SVG tool icons and source notes
assets/img/01_Name...13_Name/    Your existing images, used directly
assets/downloads/      Downloadable placeholder portfolio PDF
```

The layout supports laptops, tablets, and phones. Project cards open a separate detail page in the same tab, with image navigation and a circular related-project carousel. Includes category filters, mobile navigation, and reduced-motion preferences. Project titles use the image folder names. About Me contains Ved Patel's biography and contact information adapted from the existing portfolio. Project categories, descriptions, locations, and the download PDF still need final content.

Replacing existing images updates the site directly. Adding or renaming images or project folders requires updating `assets/js/projects.js`, which stores titles, cover paths, and gallery paths.

## GitHub Pages

Select **Settings > Pages > Source > GitHub Actions** in the repository, then push to the default branch (`master` or `main`). The workflow checks JavaScript syntax and required assets, stages all three HTML pages and `assets` together, and deploys. No custom secret is needed. Manual deployment is available in the Actions tab.

Local file and gallery checks have passed. Browser rendering and live deployment have not yet been verified.
