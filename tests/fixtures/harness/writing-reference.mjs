// MIT. Direct mounts, explicit test policies and milestone-3 reference reuse only.
import { mountWritingActivity } from '../../../assets/js/components/writing-activity.js';
import { mountChecklist } from '../../../assets/js/components/checklist.js';
import { createClipboard } from '../../../assets/js/utilities/clipboard.js';
import { mountReference } from '../../../assets/js/app/reference-loader.js';
import { mountNavigation } from '../../../assets/js/app/lesson-core.js';
import { applyCompletion, hasAllIds } from '../../../assets/js/app/completion.js';
import { openProgress } from '../../../assets/js/app/progress-store.js';
import { openingAdapter } from '../../../lessons/opening/progress-adapter.js';
import { middleAdapter } from '../../../lessons/middle/progress-adapter.js';
import { finalAdapter } from '../../../lessons/final/progress-adapter.js';
import { writingActivities } from './writing-data.mjs';

const params = new URL(location.href).searchParams, lesson = params.get('lesson') || 'final';
const adapter = { opening: openingAdapter, middle: middleAdapter, final: finalAdapter }[lesson];
const root = document.querySelector('#writing-reference-harness');
const store = openProgress({ key: adapter.key, adapter });
const node = (tag, text) => { const element = document.createElement(tag); if (text) element.textContent = text; return element; };
const sections = adapter.sections.map((id, index) => {
  const view = node('section'), heading = node('h1', id === 'quick-reference' ? 'Final Stage Quick Reference' : `Test section: ${id}`);
  view.className = 'lesson-view'; view.id = `view-${index}`; view.append(heading); root.querySelector('#views').append(view);
  return { id, view, heading, label: id, requirement: 'Complete the mounted writing test gate.', reference: id === 'quick-reference' };
});
const referenceView = sections.at(-1).view; referenceView.dataset.referenceView = '';
const content = node('div'), status = node('p'), retry = node('button', 'Retry Quick Reference'), print = node('button', 'Print Quick Reference');
content.dataset.referenceContent = ''; status.dataset.referenceStatus = ''; status.setAttribute('role', 'status');
retry.dataset.referenceRetry = ''; retry.hidden = true; print.dataset.referencePrint = ''; print.disabled = true;
retry.type = print.type = 'button'; referenceView.append(print, status, retry, content);
const base = new URL(params.has('prefix') ? '/discussion-skills-lab/' : '/', location.href);
const referenceOptions = { source: 'content/final/reference/reference.json', declaringUrl: base, allowedRootUrl: new URL('content/', base) };
let reference = mountReference(referenceView, referenceOptions);
// Exercise the generic clipboard's no-existing-field fallback with real reference text.
const copyReference = node('button', 'Copy reference'), copyStatus = node('p'); copyStatus.setAttribute('role', 'status');
copyStatus.className = 'fixture-ui';
referenceView.append(copyReference, copyStatus);
const referenceClipboard = createClipboard(referenceView, { getText: () => `FINAL STAGE QUICK REFERENCE\n\n${content.textContent}`, status: copyStatus });
copyReference.addEventListener('click', () => referenceClipboard.copy());
const navigation = mountNavigation(root, { sections, state: store.state });
const activityStatus = node('p'), activityRetry = node('button', 'Retry writing activity'), activityArea = node('div');
activityStatus.setAttribute('role', 'status'); activityStatus.dataset.activityStatus = ''; activityRetry.dataset.activityRetry = ''; activityRetry.hidden = true;
sections[0].view.append(activityStatus, activityRetry, activityArea);
let activities = [], controllers = new Map(), hosts = new Map(), events = 0, loading = false;
const completionPolicy = {};
function ownState(activity) {
  const state = store.state;
  return { fields: Object.fromEntries([...activity.data.fields, ...(activity.data.output ? [activity.data.output] : [])].map(field => [field.id, state.fields[field.id]])),
    assembled: activity.assembledFlag ? state.flags[activity.assembledFlag] : false,
    modelVisible: activity.modelFlag ? state.flags[activity.modelFlag] : !!state.ui[activity.modelUi] };
}
function update() {
  activities.forEach(activity => {
    controllers.get(activity.id)?.update(ownState(activity));
    controllers.get(activity.checklist.id)?.update(store.state.activities[activity.checklist.id]);
  });
  navigation.update(store.state);
  root.querySelector('#storage-warning').textContent = store.diagnostics.map(item => item.message).join(' ');
}
function changed(mutate) {
  events++; const previous = store.state, next = store.state; mutate(next);
  store.save(applyCompletion(previous, next, { sections, completionPolicy })); update();
}
function mount(activity) {
  const { writing, checklist } = hosts.get(activity.id);
  controllers.set(activity.id, mountWritingActivity(writing, { data: activity.data, profile: activity.profile, state: ownState(activity), onChange: own => changed(next => {
    Object.assign(next.fields, own.fields);
    if (activity.assembledFlag) next.flags[activity.assembledFlag] = own.assembled;
    if (activity.modelFlag) next.flags[activity.modelFlag] = own.modelVisible;
    else next.ui[activity.modelUi] = own.modelVisible; // Opening model is session-only, never a new extension fact.
  }) }));
  controllers.set(activity.checklist.id, mountChecklist(checklist, { data: activity.checklist.data, state: store.state.activities[activity.checklist.id],
    onChange: own => changed(next => { next.activities[activity.checklist.id] = own; }) }));
}
async function loadActivities() {
  if (loading) return;
  loading = true; activityRetry.hidden = true; activityStatus.textContent = 'Writing activity is loading.';
  try {
    const fetchText = async path => { const response = await fetch(new URL(path, import.meta.url)); if (!response.ok) throw new Error('Missing excerpt'); return response.text(); };
    const [html, banks, maps, middleSource] = await Promise.all([fetchText(`../content/source/${lesson}.html`), fetchText('../content/banks.json').then(JSON.parse),
      fetchText(`../legacy-maps/${lesson}.json`).then(JSON.parse), lesson === 'middle' ? fetchText('../content/source/assets/js/middle.js') : '']);
    const document = new DOMParser().parseFromString(html, 'text/html');
    activities = writingActivities(document, banks, maps, lesson, middleSource);
    for (const activity of activities) {
      const wrapper = node('div'), writing = node('div'), checklist = node('div'); wrapper.className = 'fixture-activity'; wrapper.dataset.activityId = activity.id;
      checklist.dataset.checklistId = activity.checklist.id; wrapper.append(writing, checklist); activityArea.append(wrapper); hosts.set(activity.id, { writing, checklist });
      completionPolicy[activity.section] = state => {
        const checked = hasAllIds(activity.checklist.data.items.map(item => item.id), state.activities[activity.checklist.id].checkedIds);
        if (lesson === 'opening') return state.fields['consensus-draft'].trim().length >= 35 && checked;
        return checked && activity.data.fields.every(field => !!state.fields[field.id].trim())
          && (!activity.assembledFlag || state.flags[activity.assembledFlag])
          && (lesson !== 'final' || state.flags[activity.modelFlag]);
      };
      mount(activity);
    }
    if (params.has('reorder')) [...activityArea.children].reverse().forEach(child => activityArea.append(child));
    activityStatus.textContent = ''; root.dataset.activitiesReady = 'true'; update();
  } catch {
    activityStatus.textContent = 'Writing activity could not load. Retry; saved work is preserved and Quick Reference remains available.';
    activityRetry.hidden = false;
  } finally { loading = false; }
}
activityRetry.addEventListener('click', loadActivities);
window.writingHarness = { store, adapter, sections, navigation, controllers, hosts, get activities() { return activities; },
  get events() { return events; }, hydrate: update, mountWritingActivity, mountChecklist,
  remount() { controllers.forEach(controller => controller.destroy()); controllers.clear(); activities.forEach(mount); },
  remountReference() { reference.destroy(); reference = mountReference(referenceView, referenceOptions); return reference.ready; },
  referenceClipboard, copyReference, copyStatus, get reference() { return reference; }
};
loadActivities(); update(); document.documentElement.dataset.ready = 'true';
