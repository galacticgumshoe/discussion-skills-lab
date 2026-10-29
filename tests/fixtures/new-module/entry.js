// MIT. The same app, identity adapter and registry; no copied controllers.
import { mountLesson } from '../../assets/js/app/lesson-app.js';
import { createIdProgressAdapter } from '../../assets/js/app/id-progress-adapter.js';
import { standardActivityRegistry } from '../../assets/js/app/section-renderer.js';
import { defaults, policies } from './data.js';
const referenceOnly = document.body.dataset.fixtureMode === 'reference';
const id = referenceOnly ? 'sample-reference' : 'sample-module';
const sections = referenceOnly ? ['test-reference'] : ['test-explanation', 'test-worksheet', 'test-reference'];
const adapter = createIdProgressAdapter({id, sections, defaults: referenceOnly ? {} : defaults, persistent: !referenceOnly});
// Count actual onChange -> registry.write boundaries, not just deduplicated saves.
window.fixtureChanges = 0;
const registry = Object.fromEntries(Object.entries(standardActivityRegistry).map(([type, entry]) => [type,
  {...entry, write(...args) { window.fixtureChanges++; return entry.write(...args); }}
]));
const options = {configUrl: `lessons/${id}/config.json`, adapter, registry, completionPolicy: referenceOnly ? {} : policies};
window.fixtureApp = mountLesson(document.body, options);
// Test-only lifecycle control. Public lesson entries expose no app/options global.
window.fixtureRuntime = {root: document.body, options, mountLesson,
  async remount(overrides = {}) {
    window.fixtureApp.destroy();
    window.fixtureApp = mountLesson(document.body, {...options, ...overrides});
    await window.fixtureApp.ready;
  }
};
