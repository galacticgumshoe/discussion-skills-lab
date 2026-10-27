// MIT. Bounded Final shell transformation; pinned source remains the oracle.
export function finalCutover(source) {
  const start = source.indexOf('<section aria-labelledby="title-0"'), end = source.indexOf('<div class="bottom-controls', start);
  if (start < 0 || end < 0) throw new Error('Missing original Final hooks');
  return (source.slice(0, start) + '<p id="lesson-status" role="status">Lesson is loading.</p><button id="lesson-retry" type="button" hidden>Retry lesson</button><p id="storage-warning" role="status" hidden></p><div id="views"></div>' + source.slice(end))
    .replace('<body>', '<body class="dsl-final">')
    .replace('<link href="assets/css/final.css" rel="stylesheet"/>', '<link href="assets/css/components.css" rel="stylesheet"/><link href="assets/css/final.css" rel="stylesheet"/>')
    .replace('<script src="assets/js/lesson-core.js"></script><script src="assets/js/final.js"></script>', '<script type="module" src="assets/js/final.js"></script>').trimEnd() + '\n';
}
