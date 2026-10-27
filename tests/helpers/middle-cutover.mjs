// MIT. Bounded shell transformation, shared by pre-cutover harness and assertion.
export function middleCutover(source, harness = false) {
  const start = source.indexOf('<section aria-labelledby="welcome-heading"');
  const end = source.indexOf('<div class="bottom-controls', start);
  if (start < 0 || end < 0) throw new Error('Original Middle shell hooks are missing');
  return (source.slice(0, start) + '<p id="lesson-status" role="status">Lesson is loading.</p><button id="lesson-retry" type="button" hidden>Retry lesson</button><p id="storage-warning" role="status" hidden></p><div id="views"></div>' + source.slice(end))
    .replace('<body>', '<body class="dsl-middle">')
    .replace('</head>', '<link href="assets/css/components.css" rel="stylesheet"/></head>')
    .replace('<script src="assets/js/lesson-core.js"></script><script src="assets/js/middle.js"></script>', `<script type="module" src="${harness ? '__fixtures/harness/middle-lesson.mjs' : 'assets/js/middle.js'}"></script>`).trimEnd() + '\n';
}
