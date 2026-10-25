# Original-engine issues (not repaired in milestone 1)

Refactor documentation lives in `.opencode/docs/`; repository paths below are root-relative.

Source: `0b5d2297e7cbc19bd59cde750492dd28e3983ca0`. These distinguish inherited
behavior from refactor regressions. They do not authorize fixes outside the
contracts' named standards repairs. No unexplained failing or skipped journeys
are intended; known-gap tests assert the observed original behavior.

| ID | Original behavior / location | Evidence / later handling |
| --- | --- | --- |
| KI-01 | Opening checkpoint stores only `sequenceCorrect`, not latest choice; no selected-answer highlight. Classification pills have selected-only styling, not green/red. `opening.html:420–445,537–543` | Source capture; scoped Opening standards repair only on migration |
| KI-02 | Opening classification requires all **current** answers correct; **not a defect** and not correct-ever. No Opening cards. Its cursor advances through explicit Next, which becomes available after any answer. | Real UI journey; preserve actual policy. Spec's “advances after any selection” must not be interpreted as automatic cursor advance. |
| KI-03 | Middle sequence Next and quiz Next update cursors without immediate save. Unfinished research input and revealed models have save/restore gaps. `assets/js/middle.js:231–248` | Save-gap browser test; scoped migration repair. Models remain optional. |
| KI-04 | Final assembled synthesis edits have no input listener; a later action may persist them. Goals restore checks but not caption. `assets/js/final.js:259,269–279` | Save-gap browser test; scoped Final repair |
| KI-05 | Middle quiz and Final questions rebuild selected controls/live feedback, potentially losing keyboard focus/announcements. Inactive card faces do not have explicit assistive-technology hiding; Middle rich `article[role=button]` needs review. | DOM/source evidence; actual screen-reader review pending. Scoped focus/card accessibility repair when migrated, not in milestone 1. |
| KI-06 | Shared print CSS forces Opening `#view-7`; Middle/Final compensate with overrides. | `print.spec.mjs`, historical PDFs and CSS source capture; semantic isolation repair later |
| KI-07 | Malformed nested collections can crash all original lessons; primitive `data` and out-of-range cursors crash Middle/Final. JSON parse failures are swallowed; initialization can overwrite invalid records. | Explicit unsafe-fixture original-replay browser test; milestone 4 must add safe decoding/write-blocking new-engine tests without removing original characterization |
| KI-08 | Legacy core save drops unknown **outer** fields. Middle/Final persist replaces owned state, dropping some unknown nested properties; unknown `data` properties survive. | `unknown-properties.json` and explicit browser characterization; future adapters must preserve unknowns |
| KI-09 | Explored card credit survives flip-back, but reload shows explored cards on their backs regardless of last face. Middle lacks an always-visible explored cue on front. | Partial-first restore tests; separate exploration/presentation in scoped component migration |
| KI-10 | Fixed-height/absolute card faces, especially Middle's `overflow:hidden`, may clip long content at narrow widths/zoom. | Initial mobile captures reviewed; exhaustive backs at 200% and assistive-technology checks pending. Do not recreate clipping for screenshot equality. |

## Evidence limitations

- Automated Playwright WebKit is not a claim of real Safari/iOS testing.
- Chromium-generated PDFs and print media are not interactive browser print preview
  or a physical printer check.
- `visual/environment.json` records a 400-weight Fraunces readiness probe. That
  weight is not the heading weight; a false result alone does not prove heading
  font failure. `font-readiness.json` records loaded font faces and computed heading
  weights: Final uses 400 (resolved to the available 600 face), other headings use
  700. Unused Unicode subsets/weights remain `unloaded`, not network failures. Do not mock fonts/CDN
  to claim a real visual baseline.
- The first supplementary `*-explored-mobile.png` captures caught restored CSS
  flip/reveal transitions in progress. They are retained as historical evidence,
  **not approved settled card views**. Compare the separately named
  `*-explored-settled-mobile.png` captures instead; capture waits on actual
  animations without disabling/mocking them. No original capture is overwritten.
- No personal browser profile or real student record was used. Browser fixtures
  contain synthetic educational practice text only.
