# Middle reference Print button regression

2026-10-28, milestone 8; owner reports a clickable but tiny/unbuttoned Print control
in the wrong position on the actual Middle reference page. No new cleanup scope.

## Cause and narrow fix

The Middle branch of `section-renderer.js` used the generic reference fallback:
an unclassed button after the section heading, with neither the original
`middle-reference-header`/`middle-reference-print` wrappers nor `.btn`. Most earlier
checks asserted enabled/functional/hidden-in-print, not painted appearance/order.
Tailwind's reset can make that naked control look like normal text; without the
CDN reset the reproduction showed a browser-default gray button instead.

Restore the Middle header composition: styled Print first, existing title below,
then unchanged reference status/retry/content. `reference.css` shares the existing
column-header typography with Middle and explicitly gives its semantic Print hook
a light-blue background, navy text, border, 12px corners, 12px/18px padding, 1rem
bold type and minimum 48px target. No nested second sheet/frame, no numbered-ID
dependency in the new rule, no content/control-label/gate/storage changes.
Original reference title/font hierarchy and print-only hiding remain intact.

## Verification

New public-page test covers both mounts and desktop/mobile widths, visible button
paint/size/order/left alignment/viewport containment, native button role/name,
keyboard focus and two actual Print handler calls (stubbed browser dialog), no
storage write, and hidden control/visible title in print media. It supplements the
existing five-group/18-item/emphasis and ordinary/reference print tests; none removed.

- First test-only attempt failed because a role query excluded the initially hidden
  reference, before navigation. Corrected the locator to the stable semantic hook
  and checked role/name after navigation; also used the preserved title ID.
  Compact report: `middle-print-button-initial-oracle.json`.
- Reproduction with corrected test **failed before the production fix**: expected
  pale-blue background `rgb(234, 245, 251)`, actual UA gray `rgb(239, 239, 239)`;
  1 failed, 1 not run (fail-fast). Exact command:
  `npm run test:browser -- tests/browser/middle-reference.spec.mjs --grep 'prominent button' --project=chromium --workers=1 --max-failures=1 --output=test-results/m8-middle-print-button-reproduced`.
  Compact report and screenshot: `middle-print-button-reproduced/`.
- `node --test tests/unit/middle-migration.test.mjs`: **12/12 passed**; unchanged
  Middle content/answers/gates/archived variants/legacy fixture policy equivalence.
- `git diff --check`: passed.
- Final affected browser command **passed 32/32**, eight/project in Chromium,
  Firefox, WebKit and mobile Chromium, both mounts, 3.2 minutes:
  `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/middle-reference.spec.mjs --workers=1 --max-failures=1 --output=test-results/m8-middle-print-button-fixed`.
  Fresh command-scoped Firefox home; no failures/skips/runner errors. Compact
  report, eight ordinary/reference PDFs and four desktop/mobile button screenshots
  retained under `middle-print-button-fixed/` with artifact hashes.
- Agent file review of corrected Chromium screenshots
  `middle-print-button-fixed/9-Middle-reference-button-1440px.png` and
  `middle-print-button-fixed/10-Middle-reference-button-390px.png` confirms the
  prominent pale-blue rounded button, clear bold label and keyboard focus ring,
  above/left-aligned with the reference title, unclipped at both widths. This is
  screenshot review, not interactive browser or print-preview verification.
- `node --check assets/js/app/section-renderer.js` and
  `node --check tests/browser/middle-reference.spec.mjs`: passed.

No full suite, real browser print preview, AT/device/actual zoom or new owner
acceptance claimed. Existing milestone-8 remaining ports/cleanup/manual limitations
are unchanged. All prior uncommitted work/evidence preserved; no commit/publication.
