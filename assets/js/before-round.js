// MIT. Static imports select trusted code; content never selects executable paths.
import { mountLesson } from './app/lesson-app.js';
import { beforeRoundAdapter } from '../../lessons/before-round/progress-adapter.js';
import { beforeRoundCompletionPolicy, beforeRoundReveals } from '../../lessons/before-round/completion.js';

mountLesson(document.querySelector('.app-shell'), {
  configUrl: 'lessons/before-round/config.json',
  adapter: beforeRoundAdapter,
  completionPolicy: beforeRoundCompletionPolicy,
  revealPolicy: beforeRoundReveals
});
