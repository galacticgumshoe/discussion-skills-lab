// MIT. Validated labels are still text, never HTML.
import { renderMarkdown } from '../app/markdown.js';

function stackedReference(documentData, loadedBodies) {
  const fragment = document.createDocumentFragment();
  const middle = documentData.layout === 'middle-reference';
  for (const [index, item] of documentData.items.entries()) {
    const article = document.createElement(middle ? 'section' : 'article');
    article.className = middle ? `reference-box middle-reference-item middle-reference-item-${index + 1}` : `final-reference-item accent-${item.accent}`;
    const heading = document.createElement('h3');
    const number = document.createElement('span');
    number.className = middle ? 'middle-reference-number' : 'final-reference-number';
    number.textContent = item.number;
    const title = document.createElement('span');
    if (middle) title.className = 'middle-reference-label';
    title.textContent = item.title;
    heading.append(number, title);
    const body = loadedBodies.get(item.id);
    if (!body) throw new Error('Missing reference body');
    article.append(heading, renderMarkdown(body.source, { baseUrl: body.url }));
    fragment.append(article);
  }
  return fragment;
}

// One renderer with two explicit class/tag profiles; no HTML supplied by JSON.
const layouts = new Map([['stacked-reference', stackedReference], ['middle-reference', stackedReference]]);
export function renderReferenceItems(container, documentData, loadedBodies) {
  const renderer = layouts.get(documentData.layout);
  if (!renderer) throw new Error('Unsupported reference layout');
  // Build completely before replacing, so a failed render never leaves half a sheet.
  container.replaceChildren(renderer(documentData, loadedBodies));
}
