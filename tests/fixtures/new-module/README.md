# Test-only modules (MIT)

Non-instructional test labels; not a published Discussion lesson or catalog entry.
`sample-module` demonstrates gated questions, a worksheet and independent reference.
`sample-reference` has one reference, no quiz, no persistence and no legacy key.
`entry.js` imports the real runtime/controllers; `data.js` owns only defaults/policies.
Serve through the test server at `/__fixtures/new-module/` or the prefixed equivalent.

`fixtureApp` / `fixtureRuntime` expose lifecycle control only within this fixture.
The registry wrapper counts real change callbacks but delegates every operation to
the standard registry. `app-lifecycle.spec.mjs` covers duplicate mounts/writers,
remount/old-node inertness, pending-fetch cancellation, missing registry entries,
independent reference preparation and readiness-guarded credit after Markdown retry.
These are shared-runtime contracts with synthetic labels, not a copied partial
Opening/Middle/Final application. Do not export these globals from public entries.
