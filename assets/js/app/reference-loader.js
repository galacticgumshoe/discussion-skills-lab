// MIT. Independent orchestration of milestone 3's checked loader/schema/renderer.
// Caller supplies dedicated status/content/retry/print hooks and reference-only print CSS.
import { resolveContentUrl, loadJson, loadMarkdown } from './content-loader.js';
import { validateReferenceDocument } from './content-validation.js';
import { renderReferenceItems } from '../components/quick-reference.js';

const mounts = new WeakSet();
export function mountReference(root, { source, declaringUrl, allowedRootUrl }) {
  if (mounts.has(root)) throw new TypeError('Reference is already mounted');
  const content = root.querySelector('[data-reference-content]'), status = root.querySelector('[data-reference-status]');
  const retry = root.querySelector('[data-reference-retry]'), print = root.querySelector('[data-reference-print]');
  if (!content || !status || !retry || !print) throw new TypeError('Missing reference hooks');
  mounts.add(root);
  const abort = new AbortController();
  let loading = false, destroyed = false;
  async function load() {
    if (loading || destroyed) return;
    loading = true; print.disabled = true; retry.hidden = true; status.hidden = false;
    status.textContent = 'Quick Reference is loading. Please wait before printing.';
    content.setAttribute('aria-busy', 'true');
    try {
      const url = resolveContentUrl(source, declaringUrl, allowedRootUrl);
      const data = await loadJson(url, { signal: abort.signal, validate: value => validateReferenceDocument(value, { declaringUrl: url, allowedRootUrl }) });
      const bodies = new Map(await Promise.all(data.items.map(async item => {
        const bodyUrl = resolveContentUrl(item.source, url, allowedRootUrl);
        return [item.id, { url: bodyUrl, source: await loadMarkdown(bodyUrl, { signal: abort.signal }) }];
      })));
      if (destroyed) return;
      renderReferenceItems(content, data, bodies); status.hidden = true; print.disabled = false;
    } catch (error) {
      if (destroyed) return;
      status.textContent = `Quick Reference could not load (${error.message}). Retry before printing. Other lesson activities remain available.`;
      retry.hidden = false;
    } finally {
      loading = false;
      if (!destroyed) content.setAttribute('aria-busy', 'false');
    }
  }
  const printReference = () => { if (!print.disabled) root.ownerDocument.defaultView.print(); };
  retry.addEventListener('click', load); print.addEventListener('click', printReference);
  const ready = load(); // Startup preparation is independent of navigation and activity success.
  return { ready, reload: load, destroy() {
    if (destroyed) return;
    destroyed = true; abort.abort();
    retry.removeEventListener('click', load); print.removeEventListener('click', printReference);
    mounts.delete(root);
  } };
}
