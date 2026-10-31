// MIT. Instructional content © Rhys Jones / CC BY 4.0 lives in content/opening/.
import { mountLesson } from './app/lesson-app.js';
import { openingAdapter } from '../../lessons/opening/progress-adapter.js';
import { openingCompletionPolicy } from '../../lessons/opening/completion.js';
import { openingRegistry } from '../../lessons/opening/runtime.js';

mountLesson(document.querySelector('.app-shell'), {
  configUrl: 'lessons/opening/config.json', adapter: openingAdapter,
  completionPolicy: openingCompletionPolicy, registry: openingRegistry
});
