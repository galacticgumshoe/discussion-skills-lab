// MIT. Instructional content © Rhys Jones / CC BY 4.0 lives in content/middle/.
import { mountLesson } from './app/lesson-app.js';
import { middleAdapter } from '../../lessons/middle/progress-adapter.js';
import { middleCompletionPolicy, middleReveals } from '../../lessons/middle/completion.js';
import { middleRegistry } from '../../lessons/middle/runtime.js';

mountLesson(document.querySelector('.app-shell'), {
  configUrl: 'lessons/middle/config.json', adapter: middleAdapter,
  completionPolicy: middleCompletionPolicy, revealPolicy: middleReveals,
  registry: middleRegistry
});
