// MIT. Presentation/navigation only; lesson-specific completion stays external.
import { componentRoot, snapshot, setText } from './component-dom.js';
import { mountMultipleChoice } from './multiple-choice.js';

const profiles = {
  'opening-classification': { any: true, wrap: true },
  'opening-knowledge-check': { all: true },
  'middle-scenarios': { wrap: true },
  'middle-quiz': { wrap: true, jump: true },
  'final-questions': { previous: true }
};

export function mountQuestionSequence(root, { data, state, onChange, profile }) {
  const settings = profiles[profile];
  if (!settings) throw new TypeError('Unknown sequence profile.');
  const dom = componentRoot(root, 'dsl-question-sequence'), questions = new Map(), jumps = new Map();
  let current = snapshot(state), displayed;
  const counter = dom.node('p', 'dsl-question-counter');
  const host = dom.node('div', 'dsl-question-host');
  const controls = dom.node('div', 'dsl-question-controls');
  const previous = dom.node('button', 'dsl-question-previous', '← Previous question'); previous.type = 'button';
  const next = dom.node('button', 'dsl-question-next'); next.type = 'button';
  const score = dom.node('p', 'dsl-question-score');
  const hint = dom.node('p', 'dsl-retry-hint');
  const retry = dom.node('button', 'dsl-question-retry', data.retryLabel || 'Retry missed questions'); retry.type = 'button';
  const jumpHost = dom.node('div', 'dsl-question-jumps'); jumpHost.setAttribute('aria-label', 'Question navigation');
  controls.append(previous, next, retry); dom.append(counter, host, controls, score, hint, jumpHost);
  function emit(nextState) { current = snapshot(nextState); render(); onChange(snapshot(current)); }
  function mountQuestion(question) {
    const article = dom.node('article', 'dsl-question'); article.dataset.questionId = question.id; host.append(article);
    const presented = settings.all ? { ...question, prompt: `${data.questions.indexOf(question) + 1}. ${question.prompt}` } : question;
    const controller = mountMultipleChoice(article, { data: presented, state: current, profile, onChange: emit });
    questions.set(question.id, { article, controller });
  }
  function navigate(id) {
    if (current.currentQuestionId === id) return;
    emit({ ...current, currentQuestionId: id });
    // Question navigation is intentional; selection feedback never moves focus.
    questions.get(id).controller.focus();
  }
  function render() {
    const index = Math.max(0, data.questions.findIndex(question => question.id === current.currentQuestionId));
    const question = data.questions[index], earned = current.earnedQuestionIds.filter(id => data.questions.some(question => question.id === id)).length;
    if (settings.all) {
      if (!questions.size) data.questions.forEach(mountQuestion);
    } else if (displayed !== question.id) {
      questions.forEach(({ controller, article }) => { controller.destroy(); article.remove(); }); questions.clear();
      mountQuestion(question); displayed = question.id;
    }
    questions.forEach(({ controller }) => controller.update(current));
    setText(counter, settings.all ? '' : profile === 'opening-classification' ? `STATEMENT ${index + 1} OF ${data.questions.length}` : `Question ${index + 1} of ${data.questions.length}`);
    previous.hidden = !settings.previous || index === 0;
    next.hidden = Boolean(settings.all || (!settings.wrap && index === data.questions.length - 1));
    next.disabled = settings.any ? !Object.hasOwn(current.selections, question.id) : !current.earnedQuestionIds.includes(question.id);
    setText(next, profile === 'opening-classification'
      ? (index === data.questions.length - 1 ? 'Review from the start ↻' : 'Next statement →')
      : index === data.questions.length - 1 && settings.wrap ? 'Review first →' : profile === 'middle-scenarios' ? 'Next →' : 'Next question →');
    const done = data.questions.every(question => Object.hasOwn(current.selections, question.id));
    const complete = earned === data.questions.length;
    score.hidden = settings.all && !done;
    setText(score, settings.all ? `Knowledge check: ${earned} of ${data.questions.length} correct.` : settings.jump
      ? `Score: ${earned}/${data.questions.length} · ${earned / data.questions.length * 100}%` : `${earned}/${data.questions.length} correct`);
    retry.hidden = !settings.all || !done || complete;
    hint.hidden = !settings.all || !done;
    setText(hint, complete ? 'Excellent work. You can still explore other answers without losing completion credit.'
      : `Review the feedback and select the correct option for ${data.questions.length - earned} remaining ${data.questions.length - earned === 1 ? 'question' : 'questions'}.`);
    if (settings.jump) for (const [id, button] of jumps) {
      setText(button, `${current.earnedQuestionIds.includes(id) ? '✓ Correct' : '○ Not yet correct'} · Q${data.questions.findIndex(question => question.id === id) + 1}`);
      if (id === question.id) button.setAttribute('aria-current', 'step'); else button.removeAttribute('aria-current');
    }
  }
  if (settings.jump) for (const question of data.questions) {
    const button = dom.node('button', 'dsl-question-jump'); button.type = 'button'; button.dataset.questionJump = question.id;
    jumps.set(question.id, button); jumpHost.append(button); dom.listen(button, 'click', () => navigate(question.id));
  }
  dom.listen(previous, 'click', () => { const index = data.questions.findIndex(question => question.id === current.currentQuestionId); if (index > 0) navigate(data.questions[index - 1].id); });
  dom.listen(next, 'click', () => {
    if (next.disabled) return;
    const index = data.questions.findIndex(question => question.id === current.currentQuestionId);
    if (index < data.questions.length - 1 || settings.wrap) navigate(data.questions[(index + 1) % data.questions.length].id);
  });
  dom.listen(retry, 'click', () => {
    const first = data.questions.find(question => !current.earnedQuestionIds.includes(question.id));
    if (!first) return;
    const selections = { ...current.selections }; delete selections[first.id];
    emit({ ...current, selections });
    const { article, controller } = questions.get(first.id);
    article.scrollIntoView({ block: 'center', behavior: root.ownerDocument.defaultView.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    controller.focus();
  });
  render();
  return Object.freeze({
    update(nextState) { if (!dom.destroyed) { current = snapshot(nextState); render(); } },
    destroy() { if (!dom.destroyed) { questions.forEach(({ controller }) => controller.destroy()); dom.destroy(); } }
  });
}
