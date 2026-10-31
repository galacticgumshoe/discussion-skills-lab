// MIT. Instructional content © Rhys Jones / CC BY 4.0 lives in content/final/.
import { mountLesson } from './app/lesson-app.js';
import { finalAdapter } from '../../lessons/final/progress-adapter.js';
import { finalCompletionPolicy, finalReveals } from '../../lessons/final/completion.js';

mountLesson(document.querySelector('.app-shell'), {
  configUrl: 'lessons/final/config.json', adapter: finalAdapter,
  completionPolicy: finalCompletionPolicy, revealPolicy: finalReveals
});
