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
