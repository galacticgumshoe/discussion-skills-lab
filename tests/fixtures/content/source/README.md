# Discussion Skills Lab

A series of interactive, self-paced lessons for high school students preparing for the MSHSL Discussion category. The lessons teach skills for the opening, middle, and final stages of a Discussion round. They are educational coaching resources, not official MSHSL rules or judging standards.

## Start here

- **Homepage:** `index.html`
- **Opening Stage:** `opening.html`
- **Middle Stage:** `middle.html`
- **Final Stage:** `final.html`

Each lesson has gated activities, navigation and a Quick Reference. All three lessons share the Discussion Skills Lab visual identity. No build step or Canva account is required to host them.

## Publish with GitHub Pages

1. Create a GitHub repository named `discussion-skills-lab` (public if you want free public Pages hosting and to share the source).
2. Upload **the contents of this folder**, not the ZIP archive. `index.html` must be in the repository root.
3. In **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, `main`, and `/(root)`, then save.
4. Once published, visit `https://YOUR-USERNAME.github.io/discussion-skills-lab/`.
5. Test each lesson, the Quick Reference print view, quiz interactions, and progress restoration on your students' target browsers.

The `.nojekyll` file ensures GitHub Pages serves the static files without Jekyll processing.

## Run locally

From this directory:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/`. A local web server is preferable to opening HTML files directly from disk because browser storage behavior can vary with `file://` URLs.

## Add a lesson

1. Create a new standalone lesson HTML page in the repository root.
2. Reuse `assets/css/shared.css` and `assets/js/lesson-core.js` as appropriate, plus a lesson-specific stylesheet and script for unique interactions.
3. Give the lesson a distinct browser-storage key so it does not overwrite existing progress.
4. Add a lesson card to `index.html` and link it to the new page.
5. Check desktop/mobile navigation, gated completion, keyboard controls, answer feedback, Quick Reference printing, and persistence.

**Design standards:** navy/teal/light blue/white; DM Sans and Fraunces; expandable rows styled like Middle Stage section 02; flashcards with an edge-to-edge white front, a visible bottom-right flip cue, a 3D transition, a navy reverse, and an Explored indicator; quiz choices visibly highlighted and explorable after completion.

## Privacy and technical limitations

- Student progress and drafts are stored in **browser `localStorage`**, not on a server. They do not synchronize between devices, browsers, or site origins. Clearing browser data can erase progress. No student accounts or instructor dashboard are included.
- The current lesson pages load **Tailwind CSS from a CDN** and **Google Fonts** over the network. The site's own HTML, JavaScript, and CSS are hosted by GitHub Pages, but the current design is not fully offline or self-hosted.
- External libraries and font files are provided under their respective licenses, not relicensed by this repository's MIT license.
- If you embed lessons in Google Sites, test on mobile and in browsers with restrictive third-party storage settings. Direct links to GitHub Pages are the simplest supported student experience.

## License and attribution (dual license)

Discussion Skills Lab uses **two licenses**, depending on the material:

- **Software code and implementation:** [MIT License](LICENSE). This covers the HTML/CSS/JavaScript implementation, layout, navigation, interactive behavior, and other original software code.
- **Original instructional content:** [Creative Commons Attribution 4.0 International (CC BY 4.0)](CONTENT_LICENSE.md). This covers original lesson text, teaching explanations, examples, activities, questions, answer feedback, Quick References, and homepage educational copy, even when embedded as text inside HTML or JavaScript.

Files containing both code and lesson text have **mixed licensing**: each license applies to its respective material. Third-party fonts, libraries, marks, and materials remain subject to their own terms and are not covered by these grants. See [`CONTENT_LICENSE.md`](CONTENT_LICENSE.md) for attribution guidance and the official CC BY 4.0 license link.

Copyright © 2026 Rhys Jones. The original instructional content was developed by Rhys Jones. For reuse of instructional content, credit *Discussion Skills Lab*, created by Rhys Jones, link to CC BY 4.0, and indicate any changes.

## Maintenance

The site can be updated by committing changes to `main`; GitHub Pages will republish automatically. Keep a tagged release or ZIP backup before major changes, and test lesson progress and print styling after edits.
