// MIT. Homepage copy © Rhys Jones, CC BY 4.0 (CONTENT_LICENSE.md).
import { loadJson, loadMarkdown, resolveContentUrl } from './app/content-loader.js';
import { renderMarkdown } from './app/markdown.js';
import { validateCatalog } from './app/catalog-validation.js';

const mounts = new WeakSet();
export function mountHome(root) {
  if (mounts.has(root)) throw new TypeError('Homepage is already mounted');
  const document = root.ownerDocument;
  const hook = name => { const node = root.querySelector(`[data-home-${name}]`); if (!node) throw new Error(`Missing homepage ${name}`); return node; };
  const intro = hook('intro'), cards = hook('catalog'), note = hook('note'), disclaimer = hook('disclaimer'), fallback = hook('fallback'), status = hook('status'), retry = hook('retry');
  const abort = new AbortController(), contentRoot = new URL('content/', document.baseURI);
  mounts.add(root);
  let loading = false, destroyed = false;
  const node = (tag, text, className) => { const element = document.createElement(tag); if (text !== undefined) element.textContent = text; if (className) element.className = className; return element; };
  async function load() {
    if (loading || destroyed) return;
    loading = true; status.hidden = false; status.textContent = 'Homepage is loading.'; retry.hidden = true;
    try {
      const url = resolveContentUrl('home.md', contentRoot, contentRoot);
      const [copy, catalog] = await Promise.all([
        loadMarkdown(url, {signal: abort.signal}),
        loadJson(resolveContentUrl('catalog.json', contentRoot, contentRoot), {signal: abort.signal, validate: validateCatalog})
      ]);
      const prose = renderMarkdown(copy, {baseUrl: url}), parts = [...prose.children];
      if (parts.map(part => part.localName).join(',') !== 'p,h1,p,p,p') throw new Error('Unsupported homepage prose structure');
      parts[0].className = 'eyebrow'; parts[2].className = 'intro';
      const fragment = document.createDocumentFragment();
      catalog.lessons.forEach((lesson, index) => {
        const article = node('article', undefined, 'lesson'), number = node('span', String(index + 1).padStart(2, '0'), 'number'); number.setAttribute('aria-hidden', 'true');
        const link = node('a', 'Open lesson '), arrow = node('span', '→'); arrow.setAttribute('aria-hidden', 'true'); link.href = lesson.url; link.append(arrow);
        article.append(number, node('h2', lesson.title), node('p', lesson.description), link); fragment.append(article);
      });
      if (destroyed) return;
      intro.replaceChildren(...parts.slice(0, 3)); cards.replaceChildren(fragment); note.replaceChildren(...parts[3].childNodes); disclaimer.replaceChildren(...parts[4].childNodes);
      fallback.hidden = true; cards.hidden = note.hidden = false; status.hidden = true;
    } catch (error) {
      if (!destroyed) { status.textContent = `Enhanced homepage content could not load (${error.message}). Use the lesson links below, or retry. Lessons require JavaScript.`; retry.hidden = false; fallback.hidden = false; }
    } finally { loading = false; }
  }
  retry.addEventListener('click', load);
  const ready = load();
  return Object.freeze({ ready, destroy() { destroyed = true; abort.abort(); retry.removeEventListener('click', load); mounts.delete(root); } });
}
if (typeof document !== 'undefined' && document.querySelector('[data-home-intro]')) mountHome(document.body);
