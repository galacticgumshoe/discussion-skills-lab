// MIT. Small test-only gates, not production completion policies or activity UIs.
import { mountNavigation } from '../../../assets/js/app/lesson-core.js';
import { applyCompletion, hasAllIds } from '../../../assets/js/app/completion.js';
import { openProgress } from '../../../assets/js/app/progress-store.js';
import { openingAdapter } from '../../../lessons/opening/progress-adapter.js';

const root = document.querySelector('#navigation-harness');
const view = id => root.querySelector(`#${id}`);
// Explicit identity/element associations: order does not come from .lesson-view.
const sections = [
  { id: 'contributions', view: view('view-0'), label: '01 · Contributions', requirement: 'Test gate: fill both synthetic fields.', reference: false },
  { id: 'opening-sequence', view: view('view-1'), label: '02 · Opening sequence', requirement: 'Test gate: record exploration and checkpoint credit.', reference: false },
  { id: 'task-analysis', view: view('view-2'), label: '03 · Analyze the task', requirement: 'No gate supplied in this navigation-only harness.', reference: false },
  { id: 'clarifications', view: view('view-3'), label: '04 · Clarifications', requirement: 'No gate supplied in this navigation-only harness.', reference: false },
  { id: 'give-direction', view: view('view-4'), label: '05 · Give direction', requirement: 'No gate supplied in this navigation-only harness.', reference: false },
  { id: 'research-transition', view: view('view-5'), label: '06 · Research & transition', requirement: 'No gate supplied in this navigation-only harness.', reference: false },
  { id: 'knowledge-check', view: view('view-6'), label: '✓ · Knowledge check', requirement: 'Test gate: record one earned question ID.', reference: false },
  { id: 'quick-reference', view: view('view-7'), label: '↗ · Quick reference', requirement: '', reference: true }
];
const completionPolicy = {
  contributions: state => Boolean(state.fields['consensus-problem'].trim() && state.fields['consensus-accomplishment'].trim()),
  'opening-sequence': state => hasAllIds(['receive', 'read-analyze'], state.activities.timeline.exploredIds)
    && hasAllIds(['next-step'], state.activities['sequence-checkpoint'].earnedQuestionIds),
  'knowledge-check': state => hasAllIds(['substantive'], state.activities['knowledge-check'].earnedQuestionIds)
};
const store = openProgress({ key: openingAdapter.key, adapter: openingAdapter });
// Exercise DOM-order independence before navigation mounts as well as afterwards.
if (new URL(location.href).searchParams.has('reorder')) {
  sections.slice().reverse().forEach(section => view('views').append(section.view));
}
let navigation = mountNavigation(root, { sections, state: store.state });
function show() {
  view('state').textContent = JSON.stringify(store.state);
  view('storage-warning').textContent = store.diagnostics.map(item => item.message).join(' ');
}
function change(edit) {
  const previous = store.state, next = store.state;
  edit(next);
  store.save(applyCompletion(previous, next, { sections, completionPolicy }));
  navigation.update(store.state);
  show();
}
for (const [control, field] of [['test-problem', 'consensus-problem'], ['test-accomplishment', 'consensus-accomplishment']]) {
  const input = view(control);
  input.value = store.state.fields[field];
  input.addEventListener('input', () => change(state => { state.fields[field] = input.value; }));
}
view('test-explore').addEventListener('click', () => change(state => { state.activities.timeline.exploredIds = ['receive', 'read-analyze']; }));
view('test-checkpoint').addEventListener('click', () => change(state => { state.activities['sequence-checkpoint'].earnedQuestionIds = ['next-step']; }));
view('test-quiz').addEventListener('click', () => change(state => { state.activities['knowledge-check'].earnedQuestionIds = ['substantive']; }));
show();
// Test boundary only. No production entry imports this harness.
window.navigationHarness = {
  store, sections, completionPolicy, get navigation() { return navigation; },
  mountNavigation,
  remount() { navigation.destroy(); navigation = mountNavigation(root, { sections, state: store.state }); }
};
document.documentElement.dataset.ready = 'true';
