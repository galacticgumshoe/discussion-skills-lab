// MIT. Exact bounded shell transformation; pinned instructional source stays immutable.
import { openingExtraction } from './opening-extraction.mjs';
export function openingCutover(source) {
  const extracted = openingExtraction(source).html;
  const start = extracted.indexOf('<section aria-labelledby="section-1-heading"'), end = extracted.indexOf('<div class="bottom-controls', start);
  if (start < 0 || end < 0) throw new Error('Missing Opening shell boundaries');
  return (extracted.slice(0, start) + '<p id="lesson-status" role="status">Lesson is loading.</p><button id="lesson-retry" type="button" hidden>Retry lesson</button><p id="storage-warning" role="status" hidden></p><div id="views"></div>\n' + extracted.slice(end))
    .replace('<body class="w-full"', '<body class="w-full dsl-opening"')
    .replace('<div class="shell w-full">', '<div class="shell w-full app-shell">')
    .replace('<link href="assets/css/opening.css" rel="stylesheet"/><link href="assets/css/shared.css" rel="stylesheet"/>', '<link href="assets/css/shared.css" rel="stylesheet"/><link href="assets/css/components.css" rel="stylesheet"/><link href="assets/css/opening.css" rel="stylesheet"/>')
    .replace('<script src="assets/js/lesson-core.js"></script><script src="assets/js/opening.js"></script>', '<script type="module" src="assets/js/opening.js"></script>').trimEnd() + '\n';
}
