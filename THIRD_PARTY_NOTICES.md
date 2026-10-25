# Third-party notices

These libraries are excluded from Rhys Jones's MIT/CC BY grants. Vendor files
are unmodified upstream browser distributions and original license texts, not
runtime CDN downloads. Reviewed/selected 2026-10-25. Native ESM works without a
build, bare imports, npm in production, or vendor globals.

## markdown-it 15.0.3 — MIT

- Project: <https://github.com/markdown-it/markdown-it>
- Tagged release/source: <https://github.com/markdown-it/markdown-it/tree/15.0.3>
  (upstream publishes tags, not GitHub Releases; `/releases/latest` returned 404).
- Official published archive:
  <https://registry.npmjs.org/markdown-it/-/markdown-it-15.0.3.tgz>.
  Registry `latest` was 15.0.3; tag commit
  `a8c00d474ec9b304fad9b71c16d6fa8b4909279e` agrees with registry `gitHead`.
  Archive verified against registry SHA-512 integrity:
  `sha512-+Az7Ojz3iRGu8KYMvJ6xVhvrxP3eE+vEtJX75Ow88XBpcQNV/0lGX5ZynIIBftREo4DC2jsveAMDaeltmm8QvQ==`.
- Copied `dist/browser/markdown-it.esm.min.mjs`, its map, and `LICENSE`.
  Copyright © 2014 Vitaly Puzrin, Alex Kocharin.
  Original license: `assets/vendor/markdown-it/LICENSE`.
- The official self-contained browser bundle includes mdurl 2.1.0, uc.micro 3.0.0,
  entities 8.1.0, linkify-it 6.1.0, and punycode.js 2.3.1 (all MIT). Versions
  recorded from the tagged upstream `package-lock.json`; embedded modules are
  identifiable in the source map. Original licenses copied from their official,
  integrity-verified npm archives into `assets/vendor/markdown-it/licenses/`.
  Argparse is CLI-only and not in this browser bundle.

## DOMPurify 3.4.17 — selected Apache-2.0 option

- Project: <https://github.com/cure53/DOMPurify>
- Stable release: <https://github.com/cure53/DOMPurify/releases/tag/3.4.17>,
  published 2026-10-12; GitHub latest-release metadata checked during selection.
- Exact distribution URLs:
  <https://raw.githubusercontent.com/cure53/DOMPurify/3.4.17/dist/purify.es.mjs>
  and the adjacent `purify.es.mjs.map`.
- Original license:
  <https://raw.githubusercontent.com/cure53/DOMPurify/3.4.17/LICENSE>, retained
  as `assets/vendor/dompurify/LICENSE` (Apache-2.0).
- Copyright Cure53 and other contributors. Upstream offers Apache-2.0 or MPL-2.0;
  this repository selects **Apache-2.0**, without altering the upstream header.
  The distribution also carries a Facebook MIT regenerator-runtime/Babel helper
  notice; its linked original license is retained in `BABEL-LICENSE`, retrieved
  from <https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE>.

## SHA-256 of all retained vendor files

Paths are relative to the repository root. Maps retain embedded upstream source
for inspection and are not additional runtime imports.

```text
792c48c5a849a15fdf9e37e8bcf9e6d1dd13b32b46c642a748a0a46a9919d473  assets/vendor/markdown-it/LICENSE
d5432491790141da046b1197353705db03264f40b5727f3b4b591f5aba193e30  assets/vendor/markdown-it/markdown-it.esm.min.mjs
b7a2e378f803958d214a8e5ed9f9c108e26c582c80c1b4dde4bcffac960f6efe  assets/vendor/markdown-it/markdown-it.esm.min.mjs.map
cb992345949ccd6e8394b2cd6c465f7b897c864f845937dbf64e8997f389e164  assets/vendor/markdown-it/licenses/entities.txt
95e3f7f0e81e9b4940cdfaa1956aaff5e4dfd2fb1565041e7c78eb9a606f23e3  assets/vendor/markdown-it/licenses/linkify-it.txt
6b6a356c4337e2446841f30f3cdf7e7023af8c5260b5e347c0f987b9f6aa2644  assets/vendor/markdown-it/licenses/mdurl.txt
483acb265f182907d1caf6cff9c16c96f31325ed23792832cc5d8b12d5f88c8a  assets/vendor/markdown-it/licenses/punycode.js.txt
483acb265f182907d1caf6cff9c16c96f31325ed23792832cc5d8b12d5f88c8a  assets/vendor/markdown-it/licenses/uc.micro.txt
cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30  assets/vendor/dompurify/LICENSE
4be9d87b56a306293223b490c0d0b245e9e94f39884147bf051a6c7b825aeb30  assets/vendor/dompurify/BABEL-LICENSE
60c5d5ccbb466de3de3ba863461a92bf134f8c156cef7992da43e0f659bc5cbd  assets/vendor/dompurify/purify.es.mjs
2d8320d303936a66e9d2b881395a680bcf4de2974014ddf8b2893e248a0af973  assets/vendor/dompurify/purify.es.mjs.map
```

## Wrapper policy / update procedure

Only `assets/js/app/markdown.js` imports the two vendor APIs. markdown-it has
`html: false`, `linkify: false`, `typographer: false`, `breaks: false`, no plugins.
Blank lines preserve paragraphs; explicit hard breaks produce `br`. DOMPurify
returns a sanitized fragment with only `p`, `h1`–`h6`, `ul`, `ol`, `li`, `strong`,
`em`, `blockquote`, `code`, `pre`, `br`, `a`; only `href`/`title` attributes.
No class/style/data/ARIA/event attributes, images, forms, scripts, SVG/MathML or
embeds. Links are resolved against the prose source and restricted to HTTP(S)
and mailto; encoded unsafe schemes, controls, backslashes, double encoding and
protocol-relative links are rejected. No target/new-tab behavior is added.
Raw HTML/script-like text remains harmless visible text, including in JSON labels
assigned with `textContent`. This wrapper is not for student input.

To update (a deliberate reviewed development change, never automatically):

1. Check the upstream maintained stable tags/releases, advisories and changelogs.
   Download only official tagged browser distributions or official npm archives;
   verify archive integrity, release tag/version and browser compatibility.
2. Inspect distribution headers/source/maps and transitive bundled notices; keep
   original licenses. Copy unmodified browser files. Record exact versions,
   source/release URLs and new SHA-256 values here; do not regenerate a bundle.
3. Run `npm run validate:content`, `npm run test:unit` (also verifies this checksum
   list), and the full browser suite with the documented Firefox home prefix on
   this host. Retain security fixtures, exact text/emphasis, progress, root/prefix,
   failure/retry and print tests. Do not update sealed milestone-1 evidence.
4. Review responsive reference screenshots, print PDFs and actual Chrome,
   Firefox and Safari previews. Document the executed checks and remaining gaps
   under `.opencode/docs/`; do not equate headless PDF output with manual preview.

Existing Tailwind CDN and Google Fonts dependencies are unchanged; their original
terms/notices still apply. Ajv 8.20.0 is pinned development-only (MIT, Evgeny
Poberezkin; <https://github.com/ajv-validator/ajv/releases/tag/v8.20.0>);
its installed license is provided by npm. It is never served/imported in production.
