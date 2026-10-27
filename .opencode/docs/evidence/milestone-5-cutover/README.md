# Whole-Middle cutover captures

`verification.json` records the first entire-suite report's actual stats/project
outcomes/hash and the source paths/SHA-256/size of 28 exclusively copied artifacts.
They came from the actual public `middle.html` tests, not a parallel renderer.
No original fixture or earlier capture was replaced.

- Root desktop/mobile: nine section images, longest-card 320px/enlarged-text image,
  and fresh ordinary/reference-view Letter PDFs.
- Repository-prefix desktop/mobile: both fresh ordinary/reference-view PDFs.
- All test contexts use synthetic progress and drafts. Captures wait for fonts and
  actual animation-finished promises. They are headless/file-based evidence, not
  interactive print preview, a physical device, AT or actual browser 200% zoom.

The first entire-suite result is **720/720 passed**, 180 per project, no skips,
flakes, unexpected failures or runner errors, duration 753.538991 seconds; report
SHA-256 `45cdeabbd8af0ef28ef01596e8d59149d86234aca447893de16bb9c2f1f5ce57`.

## Review and subsequent correction

File review covered all eight section types plus reference, desktop/mobile
examples and both reference PDF entry modes. Content was readable with the
recognizable navy/white/teal identity, native controls, caution panels, source
emphasis, speaker grouping and unclipped long card. Layout differences include
intrinsic card heights, separate explored cues, front-face refresh, responsive
control spacing and larger semantic section headings. No pixel-equality claim.

Review caught a **duplicated Communication header**: the extraction fallback had
mistaken an original heading-only wrapper for additional body prose. That extra
fragment/reference was removed; its original heading remains in the manifest.
The first Communication images here are retained discovery evidence, **not final
approved views**. A no-duplicate-section-heading assertion now protects every page.
The original instructional source and canonical images were not changed.

Subsequent reviewed captures/results will be stored separately, not over these
files. See `../milestone-5-cutover-verification.md` for current acceptance status.

## Completed verification

`reviewed/` contains corrected-source captures, including Communication's single
heading, the unclipped long card, and two actual PDF rasterizations read for color/
text/isolation. They were generated from the unchanged runtime that subsequently
passed the entire four-project single-worker suite.

`final-full-results.json` records the **final 720/720 pass**, 180 per project, zero
skipped/flaky/unexpected tests or runner errors, 1233.707938 seconds; original
report SHA-256 `bc3d76524d8630068a028328117da4e4bfe6e7046a98ef23905d48517a76fb64`.
Earlier full failures, their partial trace/report evidence and the first passing
run remain preserved as history. No assertion was weakened or project removed.
Manual preview/device/AT/actual browser-zoom checks remain unclaimed.
