// MIT. Actual production configuration/runtime with an isolated single writer.
import { mountLesson } from '../../../assets/js/app/lesson-app.js';
import { middleAdapter } from '../../../lessons/middle/progress-adapter.js';
import { middleCompletionPolicy, middleReveals } from '../../../lessons/middle/completion.js';
import { middleRegistry } from '../../../lessons/middle/runtime.js';

window.middleLesson = mountLesson(document.querySelector('.app-shell'), {
  configUrl: 'lessons/middle/config.json', adapter: middleAdapter,
  completionPolicy: middleCompletionPolicy, revealPolicy: middleReveals, registry: middleRegistry
});
await window.middleLesson.ready;
document.documentElement.dataset.ready = 'true';
