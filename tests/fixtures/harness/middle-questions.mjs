// MIT. Direct mounts of the verified registry, not another interaction engine.
import { standardActivityRegistry } from '../../../assets/js/app/section-renderer.js';
import { loadJson } from '../../../assets/js/app/content-loader.js';
import { validateActivity } from '../../../assets/js/app/lesson-validation.js';
import { openProgress } from '../../../assets/js/app/progress-store.js';
import { applyCompletion } from '../../../assets/js/app/completion.js';
import { middleAdapter } from '../../../lessons/middle/progress-adapter.js';
import { middleCompletionPolicy, middleReveals } from '../../../lessons/middle/completion.js';

const root = document.querySelector('#middle-questions');
// Fixture aliases replace tests/fixtures with __fixtures (one fewer segment).
// Keep repository-prefixed content requests inside that mount as well.
const fixtureAlias = new URL(import.meta.url).pathname.includes('/__fixtures/');
const contentRoot = new URL(fixtureAlias ? '../../content/' : '../../../content/', import.meta.url);
const ids = ['classification', 'group-decisions', 'communication-diagnosis', 'speaking-simulator', 'knowledge-check', 'research-checklist', 'application-checklist'];
const sections = middleAdapter.sections.map(id => ({ id, reference: id === 'quick-reference' }));
try {
  // Finish validating all required data before opening this isolated writer.
  const activities = await Promise.all(ids.map(id => loadJson(new URL(`middle/activities/${id}.json`, contentRoot), {
    validate: data => validateActivity(data, { activityId: id })
  })));
  const store = openProgress({ key: middleAdapter.key, adapter: middleAdapter }), controllers = new Map(), hosts = new Map();
  let events = 0;
  function hydrate() {
    for (const activity of activities) controllers.get(activity.id)?.update(standardActivityRegistry[activity.type].read(activity, store.state));
    root.querySelector('#storage-warning').textContent = store.diagnostics.map(item => item.message).join(' ');
  }
  const reorder = new URL(location.href).searchParams.has('reorder');
  for (const activity of reorder ? activities.slice().reverse() : activities) {
    const host = document.createElement('article'); host.dataset.activityId = activity.id;
    root.querySelector('#activities').append(host); hosts.set(activity.id, host);
  }
  function mount() {
    for (const activity of activities) {
      const entry = standardActivityRegistry[activity.type], data = structuredClone(activity.data);
      if (reorder && data.items) data.items.reverse();
      controllers.set(activity.id, entry.mount(hosts.get(activity.id), {
        data, state: entry.read(activity, store.state), profile: activity.profile,
        onChange(own) {
          events++;
          const previous = store.state, next = store.state;
          entry.write(activity, next, own);
          store.save(applyCompletion(previous, next, { sections, completionPolicy: middleCompletionPolicy }));
          hydrate();
        }
      }));
    }
    hydrate();
  }
  mount();
  window.middleQuestions = { store, activities, controllers, hosts, get events() { return events; },
    get reveals() { return middleReveals(store.state); }, hydrate,
    remount() { controllers.forEach(controller => controller.destroy()); controllers.clear(); mount(); } };
  root.querySelector('#loading-status').hidden = true;
} catch (error) {
  root.querySelector('#loading-status').textContent = `Extraction review failed: ${error.message}`;
}
document.documentElement.dataset.ready = 'true';
