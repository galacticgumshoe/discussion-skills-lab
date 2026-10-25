// MIT. One question controller. Full activity state in/out, keyed by stable IDs.
import { componentRoot, snapshot, unionIds, setText } from './component-dom.js';

export function mountMultipleChoice(root, { data, state, onChange, profile = 'standard' }) {
  if (!['standard', 'opening-classification', 'opening-knowledge-check', 'middle-scenarios', 'middle-quiz', 'final-questions'].includes(profile)) {
    throw new TypeError('Unknown question profile.');
  }
  const dom = componentRoot(root, 'dsl-multiple-choice'), buttons = new Map();
  let current = snapshot(state);
  const heading = dom.node('h3', 'dsl-question-prompt', data.prompt); heading.id = `${dom.prefix}-prompt`;
  const context = dom.node('p', 'dsl-question-context', data.context || ''); context.hidden = !data.context;
  const choices = dom.node('div', 'dsl-choices'); choices.setAttribute('role', 'group'); choices.setAttribute('aria-labelledby', heading.id);
  const feedback = dom.node('p', 'dsl-feedback'); feedback.setAttribute('role', 'status');
  feedback.setAttribute('aria-live', 'polite'); feedback.setAttribute('aria-atomic', 'true');
  const retained = dom.node('p', 'dsl-credit-note');
  for (const [index, option] of data.options.entries()) {
    const button = dom.node('button', 'dsl-choice', `${profile === 'final-questions' ? `${String.fromCharCode(65 + index)}. ` : ''}${option.text}`);
    button.type = 'button'; button.dataset.optionId = option.id; choices.append(button); buttons.set(option.id, button);
    dom.listen(button, 'click', () => {
      current = { ...current, selections: { ...current.selections, [data.id]: option.id },
        attemptedQuestionIds: unionIds(current.attemptedQuestionIds, [data.id]),
        earnedQuestionIds: option.id === data.correctOptionId ? unionIds(current.earnedQuestionIds, [data.id]) : current.earnedQuestionIds };
      render(); onChange(snapshot(current));
    });
  }
  dom.append(context, heading, choices, feedback, retained);
  function render() {
    const selected = current.selections[data.id], option = data.options.find(option => option.id === selected);
    const correct = selected === data.correctOptionId, earned = current.earnedQuestionIds.includes(data.id);
    for (const [id, button] of buttons) {
      button.setAttribute('aria-pressed', String(id === selected));
      button.classList.toggle('dsl-selected-correct', id === selected && correct);
      button.classList.toggle('dsl-selected-incorrect', id === selected && !correct);
    }
    let message = '';
    if (option) {
      // Exact content-supplied complete messages take precedence over profile prose.
      message = option.feedback ?? `${correct ? (profile.startsWith('middle-') ? 'Good choice.' : 'Correct.') : 'Not quite.'} ${data.explanation}`;
      if (!correct && profile === 'middle-quiz') message = earned
        ? `Previously completed correctly. ${data.explanation} You may explore other answers without losing credit.` : `${message} Try another option.`;
      if (!correct && profile === 'final-questions') message += ' Try another option.';
    }
    setText(feedback, message); feedback.classList.toggle('dsl-feedback-error', Boolean(option && !correct));
    setText(retained, profile === 'final-questions' && earned && !correct
      ? 'This question was already completed correctly. You may explore the other explanations without losing credit.' : '');
  }
  render();
  return Object.freeze({
    update(next) { if (!dom.destroyed) { current = snapshot(next); render(); } },
    focus() { if (!dom.destroyed) buttons.values().next().value.focus({ preventScroll: true }); },
    destroy() { dom.destroy(); }
  });
}
