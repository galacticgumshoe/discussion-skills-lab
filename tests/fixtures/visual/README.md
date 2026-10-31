# Historical visual evidence

Chromium captures of unchanged source `0b5d2297e7cbc19bd59cde750492dd28e3983ca0`.
See `environment.json` and supplementary `font-readiness.json` for environment and
readiness. Desktop is 1440×1000; mobile is 390×844; PDFs are Letter portrait.

Initial page captures use fresh contexts. References are captured after real UI
completion; print images/PDFs are produced from ordinary page 0 with print media.
Supplementary explored/builder mobile images restore UI-observed completed records.
The first supplementary explored images caught in-progress transitions; they are
retained but not approved settled views. Use `*-explored-settled-mobile.png` and
`*-builder-settled-mobile.png`, which wait for real animations to finish. Originals
are not replaced or used as pixel-equality expectations.
No instructional content is masked. No font/CDN/layout mock is used.

Review purpose: identity, hierarchy, grouping, readability, clipping, responsive and
reference-only print behavior, **not pixel equality**. Retain originals; later
reviewed layout expectations need separately versioned evidence and rationale.
Original instructional material © 2026 Rhys Jones, CC BY 4.0; implementation MIT;
third-party materials retain their terms. Manual browser print preview, actual
devices and screen-reader approval are not implied by these automated captures.
