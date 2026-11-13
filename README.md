# Architecture Portfolio

Open `index.html` in a browser. No dependency installation or build step is required.

All website resources live strictly in `assets`:

```text
index.html             Website entry page
assets/css/style.css   Responsive styles
assets/js/script.js    Interactions and placeholder project names
assets/js/projects.js  Image manifest for the 13 project galleries
assets/img/01...13/    Your existing images, used directly
assets/downloads/      Downloadable placeholder portfolio PDF
```

The layout supports laptops, tablets, and phones. Includes category filters, accessible modal galleries, mobile navigation, and reduced-motion preferences. Branding, biography, project titles, categories, and email are placeholders. Replace the PDF in `assets/downloads` with your final portfolio when ready.

Replacing existing images updates the site directly. Adding or renaming images requires updating `assets/js/projects.js`.

## GitHub Pages

Select **Settings > Pages > Source > GitHub Actions** in the repository, then push to the default branch (`master` or `main`). The workflow checks JavaScript syntax and required assets, stages `index.html` and `assets` together, and deploys. No custom secret is needed. Manual deployment is available in the Actions tab.

Local file and gallery checks have passed. Browser rendering and live deployment have not yet been verified.
