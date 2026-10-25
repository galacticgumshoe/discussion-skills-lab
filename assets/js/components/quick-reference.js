// MIT. Validated labels are still text, never HTML.
import { renderMarkdown } from '../app/markdown.js';

function stackedReference(documentData, loadedBodies) {
  const fragment = document.createDocumentFragment();
  for (const item of documentData.items) {
    const article = document.createElement('article');
    article.className = `final-reference-item accent-${item.accent}`;
    const heading = document.createElement('h3');
    const number = document.createElement('span');
    number.className = 'final-reference-number';
    number.textContent = item.number;
    const title = document.createElement('span');
    title.textContent = item.title;
    heading.append(number, title);
    const body = loadedBodies.get(item.id);
    if (!body) throw new Error('Missing reference body');
    article.append(heading, renderMarkdown(body.source, { baseUrl: body.url }));
    fragment.append(article);
  }
  return fragment;
}

const layouts = new Map([['stacked-reference', stackedReference]]);
export function renderReferenceItems(container, documentData, loadedBodies) {
  const renderer = layouts.get(documentData.layout);
  if (!renderer) throw new Error('Unsupported reference layout');
  // Build completely before replacing, so a failed render never leaves half a sheet.
  container.replaceChildren(renderer(documentData, loadedBodies));
}
