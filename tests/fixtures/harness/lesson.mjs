// MIT. Trusted static imports, no content-selected executable paths. Test-only gates.
import { mountLesson } from '../../../assets/js/app/lesson-app.js';
import { standardActivityRegistry } from '../../../assets/js/app/section-renderer.js';
import { finalAdapter } from '../../../lessons/final/progress-adapter.js';
import { hasAllIds } from '../../../assets/js/app/completion.js';

const root = document.querySelector('#lesson-harness');
const completionPolicy = {
  welcome: state => hasAllIds(['connect-ideas', 'capture-findings', 'confirm-outcome'], state.activities['welcome-cards'].exploredIds),
  'summary-synthesis': state => hasAllIds(['three-solutions', 'combined-test', 'remaining-time', 'agreed-pilot', 'phased-cost-review'], state.activities['summary-synthesis-questions'].earnedQuestionIds),
  'connect-viewpoints': state => hasAllIds(['listen', 'connect', 'credit', 'advance'], state.activities['connect-viewpoints-panels'].exploredIds)
    && state.activities['connect-viewpoints-questions'].earnedQuestionIds.includes('clearest-direction')
    && state.flags['synthesis-assembled'] && state.flags['synthesis-model-viewed']
    && hasAllIds(['connect-two', 'credit-contributors', 'new-insight', 'task-focus', 'professional'], state.activities['synthesis-checklist'].checkedIds)
};
const options = { configUrl: 'lessons/final/config.json', adapter: finalAdapter, completionPolicy, registry: standardActivityRegistry };
let app;
function mount() { app = mountLesson(root, options); return app.ready; }
window.lessonHarness = { get app() { return app; }, options, root, mountLesson,
  async remount() { app.destroy(); return mount(); }, destroy() { app.destroy(); } };
await mount(); document.documentElement.dataset.ready = 'true';
