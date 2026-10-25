# Checkpoint 4.3 component review captures — 2026-10-25

Instructional text © Rhys Jones, CC BY 4.0; site/test implementation MIT. These
are separately named new-harness evidence, **not replacements for sealed baseline
captures**. Viewport 320×844, harness text size 200%; this is not actual browser zoom.

- `webkit-front-visibility-fixed.png`: same front after explicitly hiding the
  inactive face (normal motion switches at the flip midpoint, reduced motion
  immediately). White front, navy title and teal flip/explored cues readable.
- `webkit-longest-back-320.png`, `chromium-longest-back-320.png`: longest original
  card face from the sealed baseline, including the complete summary example,
  readable/unclipped with navy background/white text and persistent explored cue.
- `firefox-middle-empty-feedback.png`: second full-run failure screenshot; Task-B
  feedback stayed empty during the existing Firefox pointer/scroll observation.
- `production-scroll-observation.json`: small inspected trace excerpt showing
  viewport movement before/during/after that input, plus the report hash. No full
  trace or student data is archived.

The four PNGs were archived from the second cumulative run, before further test
output cleanup, using exclusive one-time byte copies. The earlier
`components-4-3-reviewed` WebKit image revealed mirrored back text after returning
to the front; that failed appearance was reviewed but its ignored PNG was removed
by the next default Playwright output cleanup before archival. It is described in
the verification record, not represented by a fabricated before-image here.
New component
CSS changes intrinsic sizing instead of reproducing fixed-height clipping; the
short front intentionally shares the taller back's intrinsic height. No exact-pixel
assertion or canonical visual/content/map fixture was changed. See the adjacent
`../milestone-4-3-verification.md` for commands, review limits and checkpoint gate.

SHA-256:

```text
3ad12073012be49869fab6e8d9f30eb150556a76af273b7b56cb0eebd5641dc0  webkit-front-visibility-fixed.png
9595883e4f9317d68cc5095c77a9259db59c15e0e393e7df1897d1e57a46d85d  webkit-longest-back-320.png
dc1280eaf6033fa30d78eb6df2394040f0c3256b2165692008d5c2d7f82e57ce  chromium-longest-back-320.png
87570f927900bcd4f18320404a21197ebabd19b2dfa4765f749ea7048c79cb1a  firefox-middle-empty-feedback.png
```
