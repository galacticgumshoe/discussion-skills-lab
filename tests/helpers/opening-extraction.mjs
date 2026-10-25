// Milestone 2's only permitted production transformation. Keep the pinned source
// and sealed fixtures immutable; compare exact payloads, not normalized prose.
export function openingExtraction(source) {
  const style = source.match(/<style>([\s\S]*?)<\/style>/);
  const script = source.match(/<script>([\s\S]*?)<\/script>/);
  if (!style || !script) throw Error('Missing baseline Opening payload');
  return {
    html: source.replace(style[0], '<link href="assets/css/opening.css" rel="stylesheet"/>')
      .replace(script[0], '<script src="assets/js/opening.js"></script>'),
    // CSS ends with indentation before its closing tag. Preserve it, then add
    // exactly one LF. JS already ends in LF and needs no newline adjustment.
    css: `${style[1]}\n`,
    js: script[1]
  };
}
