// Exact allowed Final HTML change; activity markup and legacy dependencies stay pinned.
export function finalReferencePilot(source) {
  return source.replace(/(<div class="final-reference-content" id="ref-content">)[\s\S]*?(<\/div><\/div><\/section><div class="bottom-controls)/,
    '<p id="reference-status" role="status" aria-live="polite">Quick Reference is loading. Please wait before printing.</p><button class="btn secondary print-hide" id="reference-retry" type="button" hidden>Retry Quick Reference</button>$1</div></div></section><div class="bottom-controls')
    .replace('id="ref-print" type="button"', 'id="ref-print" type="button" disabled')
    .replace('</body>', '<script type="module" src="assets/js/final-reference.js"></script></body>') + '\n';
}

// Browser-executed semantic inventory: punctuation/order/paragraphs and emphasis,
// independently of screenshots. Only inter-tag/nonsemantic whitespace is ignored.
export function referenceInventory(root) {
  const normalize = text => text.replace(/\s+/g, ' ').trim();
  return [...root.querySelectorAll('.final-reference-item')].map(article => ({
    classes: article.className,
    heading: [...article.querySelectorAll('h3 span')].map(span => normalize(span.textContent)),
    paragraphs: [...article.querySelectorAll('p')].map(p => ({
      text: normalize(p.textContent),
      // Token sequence catches emphasis moved onto the wrong repeated phrase.
      tokens: [...p.childNodes].map(node => ({ tag: node.nodeType === 3 ? 'text' : node.nodeName.toLowerCase(), text: normalize(node.textContent) })),
      breaks: p.querySelectorAll('br').length
    }))
  }));
}
