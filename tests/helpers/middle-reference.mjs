// MIT. Browser-side semantic inventory, independent of screenshot geometry.
export function middleReferenceInventory(root) {
  const text = node => node.textContent.replace(/\s+/g, ' ').trim();
  return [...root.querySelectorAll('.middle-reference-item')].map(item => ({
    tag: item.tagName, classes: item.className,
    heading: [...item.querySelectorAll('h3 span')].map(text),
    lists: [...item.querySelectorAll('ul')].map(list => [...list.children].map(li => ({
      text: text(li),
      tokens: [...li.childNodes].filter(node => node.nodeType !== 3 || node.textContent.trim()).map(node => ({
        tag: node.nodeType === 3 ? 'text' : node.nodeName.toLowerCase(), text: text(node)
      })), breaks: li.querySelectorAll('br').length
    })))
  }));
}
