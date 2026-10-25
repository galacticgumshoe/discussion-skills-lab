// MIT. Test-only boundary controls, not a second instructional content source.
import { openProgress } from '../../../assets/js/app/progress-store.js';
import { openingAdapter } from '../../../lessons/opening/progress-adapter.js';
import { middleAdapter } from '../../../lessons/middle/progress-adapter.js';
import { finalAdapter } from '../../../lessons/final/progress-adapter.js';
const adapters = { opening: openingAdapter, middle: middleAdapter, final: finalAdapter };
const id = new URL(location.href).searchParams.get('lesson') || 'opening';
const adapter = adapters[id];
const field = { opening: 'consensus-draft', middle: 'integrated-draft', final: 'closing-draft' }[id];
const store = openProgress({ key: adapter.key, adapter });
const root = document.querySelector('main');
const draft = root.querySelector('#draft');
function show() {
  root.querySelector('#state').textContent = JSON.stringify(store.state);
  root.querySelector('#storage-warning').textContent = store.diagnostics.map(item => item.message).join(' ');
}
draft.value = store.state.fields[field];
draft.addEventListener('input', () => { const state = store.state; state.fields[field] = draft.value; store.save(state); show(); });
root.querySelector('#credit').addEventListener('click', () => { const state = store.state; state.completedSections.push(adapter.sections[0]); store.save(state); show(); });
root.querySelector('#save-unchanged').addEventListener('click', () => { store.save(store.state); show(); });
show();
// Explicit test boundary; never shipped or loaded from a production lesson.
window.progressHarness = { store, adapter, field };
document.documentElement.dataset.ready = 'true';
