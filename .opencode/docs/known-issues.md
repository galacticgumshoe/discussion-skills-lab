# Known issues

Only issues that are reproducible on the current site, or environment gaps that
still affect verification, belong here. Historical issue logs are in the Git
history, not in this file.

## Layout and zoom

- **Middle long section headings at 200% zoom.** A whole-root 200% check found a
  long heading extending into visible section padding: 303px of content in a 288px
  box, with no page-level overflow. Not fixed; broader zoom/layout work is a
  separate task from the current exact heading/card/control checks.
- **Final inline text overflow at 320px.** The same check found 328px of page
  content at a 320px viewport in Connect Viewpoints. Not fixed; triage with the
  item above.
- These were found by exploratory whole-root zoom checks that go beyond the
  scoped responsive tests. Passing the existing tests does not clear them.

## Deferred cleanup

- Some legacy screen aliases remain in `assets/css/{opening,middle,final}.css`.
  They are not certified unused, so they stay until a reviewed removal identifies
  their consumers. `print.css` is loaded last and governs printing.
- No whole stylesheet, archived variant or legacy decoy fixture is certified dead.
  Do not delete CSS or archives as incidental cleanup.

## Manual verification still outstanding

These are coverage gaps, not known defects. Do not claim them from automated runs:

- Actual Safari, iOS, iPad/hardware-keyboard and Android behaviour. Playwright
  WebKit is not a physical Safari result.
- Screen-reader and other assistive-technology announcements. DOM/ARIA assertions
  do not establish them.
- Interactive browser print preview and physical printing. Chromium-generated
  PDFs and print-media assertions are not preview or printer checks.
- Actual browser zoom and real device viewports beyond the configured projects.
- macOS Safari tab navigation depends on system **Keyboard navigation** and
  Safari's full-Tab preference being enabled. That is an owner setting, not a site
  fix; do not add a global Tab trap.

## Environment

- **Firefox on this macOS 27 host** will not launch without an isolated
  application-data home. Unisolated headless startup times out and headed startup
  shows a misleading "Profile Missing" dialog. Use the fresh
  `CFFIXED_USER_HOME` prefix documented in
  [checking changes](../../docs/checking-changes.md#development-setup). Do not use
  sudo, Full Disk Access, security changes or a personal profile.
- Intermittent test-only observations have not recurred and have no established
  cause: a Firefox Middle journey returning before feedback populated, a SIGBUS in
  the original-replay worker, and Juggler/teardown errors in Firefox. Unchanged
  single-worker reruns passed. Reassess if they recur; do not treat a diagnostic
  pass as a root-cause fix.

## Intentional behaviour that can look like a bug

- Opening classification requires every **current** answer to be correct; it is
  not a correct-ever gate.
- Opening has no flashcards; its static comparison/definition cards are not
  activities.
- Completed sections stay accessible permanently. A reduced requirement or a new
  gate does not relock them, and missing detail is never reconstructed from
  completion credit.
- Opening's sequence checkpoint stores the latest selection separately from
  permanent sequence credit; restoring one does not imply the other. Middle's
  `data.dslUi` records model visibility only.