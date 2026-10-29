# Migration support — file-by-file review v2

Generated 2026-10-28 from the current checkout; each file has a stable MS ID and SHA-256 in `migration-support-v2.json`. This is an assessment index, not authorization to delete entire files. Partial-block scopes and port prerequisites are authoritative in `legacy-removal-inventory.md`.

## All helper, browser, unit and unsealed harness sources

| Review ID | Exact path | Review group / result |
| --- | --- | --- |
| `MS-e1de24e494c4` | `tests/browser/baseline.spec.mjs` | retain-active-contract-or-production |
| `MS-9260fbcdc09d` | `tests/browser/components.spec.mjs` | T09 |
| `MS-30adebbb5446` | `tests/browser/content-security.spec.mjs` | retain-active-contract-or-production |
| `MS-79fef9633599` | `tests/browser/evidence-presentation.spec.mjs` | T10 |
| `MS-8c53be76581a` | `tests/browser/final-heading-cues.spec.mjs` | T10 |
| `MS-a321219b7962` | `tests/browser/final-lesson.spec.mjs` | retain-active-contract-or-production |
| `MS-2c2cc04b1a67` | `tests/browser/final-presentation.spec.mjs` | T10 |
| `MS-043f357ecb9d` | `tests/browser/flashcard-presentation.spec.mjs` | T10 |
| `MS-b3808531b05f` | `tests/browser/home.spec.mjs` | T11 |
| `MS-1be6e5a52fa5` | `tests/browser/lesson-harness.spec.mjs` | T08 |
| `MS-1a4484668f3b` | `tests/browser/middle-activities-presentation.spec.mjs` | T10 |
| `MS-2e09c686acba` | `tests/browser/middle-lesson.spec.mjs` | retain-active-contract-or-production |
| `MS-83a9fc4b5099` | `tests/browser/middle-migration.spec.mjs` | T02 |
| `MS-94649d6dde0f` | `tests/browser/middle-presentation.spec.mjs` | T10 |
| `MS-90f94cb654f3` | `tests/browser/middle-reference.spec.mjs` | T02 |
| `MS-2a0129617337` | `tests/browser/navigation.spec.mjs` | T09 |
| `MS-75dbbc682466` | `tests/browser/new-module.spec.mjs` | retain-active-contract-or-production |
| `MS-8c6ec18687d6` | `tests/browser/opening-essentials-spacing.spec.mjs` | T10 |
| `MS-91fd6ed07f16` | `tests/browser/opening-extraction.spec.mjs` | retain-active-contract-or-production |
| `MS-7633a729d6d5` | `tests/browser/opening-lesson.spec.mjs` | retain-active-contract-or-production |
| `MS-7c62d597fe46` | `tests/browser/opening-presentation.spec.mjs` | T10 |
| `MS-2abe21cd871a` | `tests/browser/persistence.spec.mjs` | retain-active-contract-or-production |
| `MS-a1f9f5b1dd38` | `tests/browser/policy.spec.mjs` | retain-active-contract-or-production |
| `MS-c66834595c45` | `tests/browser/print-isolation.spec.mjs` | T11 |
| `MS-b465040c9415` | `tests/browser/print.spec.mjs` | retain-active-contract-or-production |
| `MS-d00918629dbd` | `tests/browser/reference-loading.spec.mjs` | retain-active-contract-or-production |
| `MS-b4c2170840a1` | `tests/browser/shell.spec.mjs` | T11 |
| `MS-325e9fed96a6` | `tests/browser/storage-boundaries.spec.mjs` | T09 |
| `MS-e6faec6a7629` | `tests/browser/structure-presentation.spec.mjs` | T10 |
| `MS-ab232493da80` | `tests/browser/writing-reference.spec.mjs` | T09 |
| `MS-ab7a8b2dcca0` | `tests/fixtures/harness/README.md` | T09 |
| `MS-35d18939eb77` | `tests/fixtures/harness/component-data.mjs` | T09 |
| `MS-91865d75309d` | `tests/fixtures/harness/components.html` | T09 |
| `MS-95c1b49f5e75` | `tests/fixtures/harness/components.mjs` | T09 |
| `MS-727da964006d` | `tests/fixtures/harness/content/final/activities/connect-viewpoints-panels.json` | T08 |
| `MS-df19ff8e7f58` | `tests/fixtures/harness/content/final/activities/connect-viewpoints-questions.json` | T08 |
| `MS-9c1549fb26bf` | `tests/fixtures/harness/content/final/activities/summary-synthesis-questions.json` | T08 |
| `MS-ad7e9588a9e9` | `tests/fixtures/harness/content/final/activities/synthesis-checklist.json` | T08 |
| `MS-e551100c7bb3` | `tests/fixtures/harness/content/final/activities/synthesis-writing.json` | T08 |
| `MS-6d83ceaf22bb` | `tests/fixtures/harness/content/final/activities/welcome-cards.json` | T08 |
| `MS-e3c223153f12` | `tests/fixtures/harness/content/final/lesson.json` | T08 |
| `MS-61d9be036e99` | `tests/fixtures/harness/content/final/reference/after-round.md` | T08 |
| `MS-d33fda61c10c` | `tests/fixtures/harness/content/final/reference/consensus-task.md` | T08 |
| `MS-ccf9495b9c84` | `tests/fixtures/harness/content/final/reference/effective-summaries.md` | T08 |
| `MS-a46f9556f575` | `tests/fixtures/harness/content/final/reference/reference.json` | T08 |
| `MS-baac93c414e0` | `tests/fixtures/harness/content/final/reference/summary-synthesis.md` | T08 |
| `MS-b81e732d9607` | `tests/fixtures/harness/content/final/reference/synthesis-framework.md` | T08 |
| `MS-77ea1cbeb974` | `tests/fixtures/harness/lesson-invalid.mjs` | T08 |
| `MS-04dcf7368ab0` | `tests/fixtures/harness/lesson.css` | T08 |
| `MS-72c164e061a1` | `tests/fixtures/harness/lesson.html` | T08 |
| `MS-ec9ba0f6393a` | `tests/fixtures/harness/lesson.mjs` | T08 |
| `MS-43d77c4140e4` | `tests/fixtures/harness/lessons/final/config.json` | T08 |
| `MS-d849f0414da0` | `tests/fixtures/harness/middle-lesson.mjs` | T01 |
| `MS-2b48d950565a` | `tests/fixtures/harness/middle-questions.html` | T02 |
| `MS-1bb7cde4da6b` | `tests/fixtures/harness/middle-questions.mjs` | T02 |
| `MS-8eb886e91bf3` | `tests/fixtures/harness/middle-reference.html` | T02 |
| `MS-a3adc8614e2e` | `tests/fixtures/harness/middle-reference.mjs` | T02 |
| `MS-c90b32b9f3df` | `tests/fixtures/harness/navigation.html` | T09 |
| `MS-3131a38e2f02` | `tests/fixtures/harness/navigation.mjs` | T09 |
| `MS-e38bb6d22591` | `tests/fixtures/harness/storage.html` | T09 |
| `MS-cc85d3604748` | `tests/fixtures/harness/storage.mjs` | T09 |
| `MS-694aba7e97a6` | `tests/fixtures/harness/writing-data.mjs` | T09 |
| `MS-288459a97921` | `tests/fixtures/harness/writing-reference.css` | T09 |
| `MS-d9f28de88ad4` | `tests/fixtures/harness/writing-reference.html` | T09 |
| `MS-6ec0d0639b8f` | `tests/fixtures/harness/writing-reference.mjs` | T09 |
| `MS-11a453ed1151` | `tests/helpers/archive-final-evidence.mjs` | T05 |
| `MS-e5b03047c0e6` | `tests/helpers/archive-milestone-8.mjs` | T11 |
| `MS-f837668b5948` | `tests/helpers/archive-opening-evidence.mjs` | T05 |
| `MS-61a2ef8d9888` | `tests/helpers/audit-production.mjs` | T07 |
| `MS-17cc704e3bb0` | `tests/helpers/baseline-source.mjs` | T07 |
| `MS-13232b10405f` | `tests/helpers/capture-browser.mjs` | T06 |
| `MS-e832be6bccc1` | `tests/helpers/capture-generated.mjs` | T06 |
| `MS-22bb1f211856` | `tests/helpers/capture-supplement.mjs` | T06 |
| `MS-c155b7a6549d` | `tests/helpers/content-baseline.mjs` | retain-active-contract-or-production |
| `MS-b68781e956d2` | `tests/helpers/extract-final.mjs` | T04 |
| `MS-2c7dbe6b88b2` | `tests/helpers/extract-middle.mjs` | T04 |
| `MS-9b9abec99c8d` | `tests/helpers/extract-opening.mjs` | T04 |
| `MS-0a7d57e10b6d` | `tests/helpers/final-cutover.mjs` | T03 |
| `MS-ed5c866e944b` | `tests/helpers/final-journey.mjs` | retain-active-contract-or-production |
| `MS-ad4e5a29f185` | `tests/helpers/final-reference.mjs` | T04 |
| `MS-1bfdcfd5bb8b` | `tests/helpers/freeze-edge-fixtures.mjs` | T06 |
| `MS-9e269a36abc0` | `tests/helpers/freeze-source.mjs` | T06 |
| `MS-60987312df4d` | `tests/helpers/legacy-journeys.mjs` | retain-active-contract-or-production |
| `MS-5fb359933631` | `tests/helpers/middle-cutover.mjs` | T03 |
| `MS-78e2a9384516` | `tests/helpers/middle-journey.mjs` | retain-active-contract-or-production |
| `MS-606f402ba03a` | `tests/helpers/middle-reference.mjs` | retain-active-contract-or-production |
| `MS-4f2b8387a60c` | `tests/helpers/milestone-8-candidates.mjs` | T11 |
| `MS-d493eb5e4807` | `tests/helpers/opening-cutover.mjs` | T03 |
| `MS-dde955a9c55b` | `tests/helpers/opening-extraction.mjs` | T03 |
| `MS-10cb3d31d152` | `tests/helpers/review-milestone-8.mjs` | T11 |
| `MS-10b3e29e10b9` | `tests/helpers/seal-fixtures.mjs` | T06 |
| `MS-d1553209ee65` | `tests/helpers/static-server.mjs` | T01 |
| `MS-0bb1769a4db9` | `tests/unit/baseline.test.mjs` | T03 |
| `MS-83a5959293a2` | `tests/unit/completion.test.mjs` | T09 |
| `MS-11b4cd70d93f` | `tests/unit/components.test.mjs` | T09 |
| `MS-3609fe6a83a1` | `tests/unit/content-urls.test.mjs` | retain-active-contract-or-production |
| `MS-83c3ebb87079` | `tests/unit/content-validation.test.mjs` | retain-active-contract-or-production |
| `MS-5f01e472b8c1` | `tests/unit/final-migration.test.mjs` | retain-active-contract-or-production |
| `MS-d3766f706097` | `tests/unit/formatters.test.mjs` | T09 |
| `MS-fe294aed7ba3` | `tests/unit/lesson-validation.test.mjs` | T08, T09 |
| `MS-54e7ba55c531` | `tests/unit/middle-lesson.test.mjs` | retain-active-contract-or-production |
| `MS-af8ad7b07dbb` | `tests/unit/middle-migration.test.mjs` | retain-active-contract-or-production |
| `MS-ed7640c36943` | `tests/unit/middle-reference.test.mjs` | retain-active-contract-or-production |
| `MS-447a3257fea8` | `tests/unit/milestone-8.test.mjs` | retain-active-contract-or-production |
| `MS-91b183742876` | `tests/unit/opening-migration.test.mjs` | T03 |
| `MS-5413a4b0b633` | `tests/unit/progress-adapters.test.mjs` | retain-active-contract-or-production |

Other source/content/security/new-module/sealed-fixture records and every retained historical evidence path are explicitly enumerated in the JSON. A file being imported by temporary tests is not a permanent-retention argument. Conversely, removing an assertion merely because it originated during migration is not permitted.

Coverage: {'helpers': 27, 'browserSpecs': 30, 'unitFiles': 14, 'harnessFiles': 35, 'sourceRecords': 586, 'historicalEvidenceFiles': 877}.
