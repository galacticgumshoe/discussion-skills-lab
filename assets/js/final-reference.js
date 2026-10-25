// MIT. Temporary Final-only pilot: no lesson initialization or progress access.
import { resolveContentUrl, loadJson, loadMarkdown } from './app/content-loader.js';
import { validateReferenceDocument } from './app/content-validation.js';
import { renderReferenceItems } from './components/quick-reference.js';

const container = document.getElementById('ref-content');
const status = document.getElementById('reference-status');
const retry = document.getElementById('reference-retry');
const print = document.getElementById('ref-print');
let loading = false;

async function loadReference() {
  if (loading) return;
  loading = true;
  print.disabled = true;
  retry.hidden = true;
  status.hidden = false;
  status.textContent = 'Quick Reference is loading. Please wait before printing.';
  container.setAttribute('aria-busy', 'true');
  try {
    const root = new URL('content/', document.baseURI);
    const url = resolveContentUrl('content/final/reference/reference.json', document.baseURI, root);
    const data = await loadJson(url, { validate: value => validateReferenceDocument(value, { declaringUrl: url, allowedRootUrl: root }) });
    const bodies = new Map(await Promise.all(data.items.map(async item => {
      const bodyUrl = resolveContentUrl(item.source, url, root);
      return [item.id, { url: bodyUrl, source: await loadMarkdown(bodyUrl) }];
    })));
    renderReferenceItems(container, data, bodies);
    status.hidden = true;
    print.disabled = false;
  } catch (error) {
    status.textContent = `Quick Reference could not load (${error.message}). Retry before printing. Other lesson activities remain available.`;
    retry.hidden = false;
  } finally {
    loading = false;
    container.setAttribute('aria-busy', 'false');
  }
}

retry.addEventListener('click', loadReference);
// The synchronous status remains printable until ready, including native Cmd/P.
// Keep Final's original ref-print onclick untouched; no second print listener.
loadReference();
