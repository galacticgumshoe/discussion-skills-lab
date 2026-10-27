# Middle reference extraction captures

One-time capture, 2026-10-25; metadata in `captures.json`. Chromium 149.0.7827.55,
temporary isolated contexts and random local test server, actual pinned original
replay versus the non-live extracted-reference harness. No live-site/student data,
font/CDN mocks, screenshot masks or canonical baseline updates. Directory creation
was exclusive; files are not snapshot expectations and must not be overwritten.

Paired reference-sheet PNGs: 1440, 390 and 320px viewports, 1000px high, after
`document.fonts.ready`; screenshot only the whole sheet (not an instructional
mask). Both sheets have identical measured dimensions at each width and no
item/list horizontal overflow (see JSON). Agent reviewed paired 320px and extracted
desktop images: complete/readable five-group composition/palette, no clipping.
The original's focused title has its native outline, absent in the standalone
harness without production navigation. This test-only focus state is not a
claimed production behavior change or a reason for pixel matching.

Four PDFs generated at fresh zero progress, root and prefix includes, ordinary
and reference views, Letter/portrait with print backgrounds/preferred CSS size.
Initial parsed/reviewed root ordinary and prefix reference files each contain the
full five groups/18 list items and no leading blank/questions/controls. **The
reference-view PDF image caught the original CSS reveal animation and is pale;
these files are retained timing evidence, NOT accepted settled print-contrast
captures.** Separately named settled captures/review remain required. No manual
browser print preview/actual printer/AT/device/actual zoom result claimed.

Initial file SHA-256:

```text
433ac62f6c6fb1c8bf9c847e8e0630feaf3df46c7a8a8d2478dabb0ae35da9a0  captures.json
6d92043c8bc67fb831ed0c345db628dcf798f374f546ce5bc440c1024c3d9dc2  extracted-1440.png
7e6425adbff5bdcc33d1f3addeef9ff10428b44822b34a4c8ca1cd5f1e56230a  extracted-320.png
fd16b16fa43e2973d25a135fe7f2b6306d1b9d169c2ead57e4e42da43c4a567c  extracted-390.png
28264ff99008fb160297d4ed3a8d6601975c7fabc2b894f0b9d7d904a3102fce  original-1440.png
1cdff09c6d3d3d6e7ab27a8c44f103386ccb9007ac5a2f66481e2878ee0f4755  original-320.png
db7d4064debdaf00be57681de88d47ff76e460591eb918c93dcdce64404462af  original-390.png
f170f79cc86aa175e55ea2ac82ca76e4e2c7624e02474faa8ad4b130ec7dbf7b  prefix-ordinary.pdf
4e13c478dd3c33845c1f39de7155ea1a0760aeb5c539064054a5da7f6ab5f964  prefix-reference.pdf
c4cc244215700cb756d13fd4e049ffcb33b2b4b0a4373e0e0dfdae8431ccb211  root-ordinary.pdf
d435ddbba9ab9ad51720cd26f0be062ab453c641ec82cc4ffe721444fc49d088  root-reference.pdf
```

Original instructional content © Rhys Jones / CC BY 4.0. Capture/test implementation
MIT. This folder is review evidence under `.opencode/docs/`, not shipped content.

## Settled print follow-up

`settled/` was created exclusively after the full test command finished; none of
the early animation-affected files above were overwritten. Four new root/prefix,
ordinary/reference PDFs wait for real `animation.finished` promises **after print
media is applied**, then assert computed reference opacity `1`, display `block`
and five groups before capture. No fixed delay, CSS rewrite or snapshot mask.
Metadata/time/engine and each pre-capture style are in `settled/captures.json`.

Agent parsed/reviewed all four PDFs: each one complete Letter page, all 18 items,
five headings, goal emphasis, no controls/questions/leading blank. The two
reference-view PDFs were additionally rendered with macOS `sips -s format png`
and inspected: normal navy text, original five colored groups, unclipped content
and no pale animation frame. This completes **file-based** review only; it is not
interactive Chrome/Firefox/Safari preview or real-printer/AT/device verification.

```text
8bf93999398f38cbdb5ce4f2e923f29570d63677120113c0c57afd8be6dca39e  settled/captures.json
35cd4fb6f2e6197678385673fc5407323cd40e434ca4755d4665ee47f695cdf5  settled/prefix-ordinary.pdf
24c308a39ea696714f5ae5fef953fa29b32f7e6ec9ffcc0d70c292c3fec7ae15  settled/prefix-reference.pdf
c7523d58c60b67f74397cc6f088e36bad11b8d0953792b6450495ff24f91fca5  settled/prefix-reference.png
1bea0500685cfb68a8d1f8581a88b9740bcf5c8bdd1ba1a206554067c8f5030a  settled/root-ordinary.pdf
86f4bd282ca3814e80b0fbfabe355f93aa02ee685942244877d6c998ba0d4f81  settled/root-reference.pdf
197a90a15c54db86bbf729f159ed4f76031d2da19fc663495df30e26fde6bb5b  settled/root-reference.png
```
