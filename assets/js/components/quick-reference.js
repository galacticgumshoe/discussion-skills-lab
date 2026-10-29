// MIT. Validated labels are still text, never HTML.
import { renderMarkdown } from '../app/markdown.js';

function stackedReference(documentData, loadedBodies) {
  const fragment = document.createDocumentFragment();
  const middle = documentData.layout === 'middle-reference';
  for (const [index, item] of documentData.items.entries()) {
    const article = document.createElement(middle ? 'section' : 'article');
    article.className = middle ? `reference-box middle-reference-item middle-reference-item-${index + 1}` : `final-reference-item accent-${item.accent}`;
    article.dataset.referenceAccent = item.accent;
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

// The same safe Markdown pipeline, with four bounded groups and list-cell grids.
// This branch is used only by Opening; existing reference consumers are unchanged.
function openingReference(data, bodies) {
  const fragment = document.createDocumentFragment();
  if (data.badge) {
    const badge = document.createElement('p'); badge.className = 'opening-reference-badge'; badge.textContent = data.badge; fragment.append(badge);
  }
  for (const [index, item] of data.items.entries()) {
    const section = document.createElement('section'), heading = document.createElement('h4'), number = document.createElement('span'), title = document.createElement('span');
    section.className = `card opening-reference-group opening-reference-${index + 1}`;
    heading.id = `reference-${['sequence', 'analysis', 'contributions', 'direction'][index]}-title`; section.setAttribute('aria-labelledby', heading.id);
    number.className = `opening-reference-number accent-${item.accent}`; number.textContent = item.number; title.textContent = item.title;
    heading.append(number, title); section.append(heading);
    const body = bodies.get(item.id); if (!body) throw new Error('Missing reference body');
    section.append(renderMarkdown(body.source, { baseUrl: body.url })); fragment.append(section);
  }
  return fragment;
}

// One renderer with explicit bounded profiles; no HTML supplied by JSON.
const layouts = new Map([['stacked-reference', stackedReference], ['middle-reference', stackedReference], ['opening-reference', openingReference]]);
export function renderReferenceItems(container, documentData, loadedBodies) {
  const renderer = layouts.get(documentData.layout);
  if (!renderer) throw new Error('Unsupported reference layout');
  // Build completely before replacing, so a failed render never leaves half a sheet.
  container.replaceChildren(renderer(documentData, loadedBodies));
}
