// MIT. Opening-only presentation bindings; all interactions delegate shared controllers.
// No storage access, duplicate listeners, instructional copy or gate calculations.
import { standardActivityRegistry } from '../../assets/js/app/section-renderer.js';

function decorate(root, activity) {
  const setId = (selector, id) => { const n = root.querySelector(selector); if (n) n.id = id; return n; };
  if (activity === 'classification') {
    root.closest('.dsl-tone-activity').setAttribute('aria-labelledby', 'classify-title');
    setId('.dsl-question-counter', 'classify-counter'); setId('.dsl-question-prompt', 'classify-statement');
    setId('.dsl-feedback', 'classify-feedback'); setId('.dsl-question-next', 'classify-next');
    root.querySelectorAll('.dsl-choice').forEach(n => { n.classList.add('classify-answer'); n.dataset.answer = n.dataset.optionId; });
    root.querySelector('.dsl-choices').setAttribute('aria-labelledby', 'classify-statement');
  } else if (activity === 'timeline') {
    root.querySelectorAll('.dsl-expandable').forEach((row, i) => {
      row.classList.add('timeline-item'); const control = row.querySelector('button'), body = row.querySelector('.dsl-expandable-body');
      control.classList.add('timeline-toggle'); body.classList.add('timeline-detail'); body.id = `stage-${i + 1}`; control.setAttribute('aria-controls', body.id);
      // Decorative CSS plus/minus must not become part of the accessible name.
      control.setAttribute('aria-label', control.firstChild.textContent);
    });
  } else if (['what-how', 'clarification', 'research', 'sequence-checkpoint'].includes(activity)) {
    const prefix = activity === 'sequence-checkpoint' ? 'sequence' : activity;
    setId('.dsl-choices', `${prefix}-options`); setId('.dsl-feedback', `${prefix}-feedback`);
    if (activity === 'sequence-checkpoint') { root.querySelector('.dsl-choices').classList.add('sequence-choices'); root.closest('.dsl-tone-activity').id = 'sequence-check'; }
  } else if (activity === 'consensus-writing') {
    setId('form', 'question-builder');
    for (const [id, legacy] of Object.entries({ 'consensus-problem': 'problem-input', 'consensus-accomplishment': 'accomplishment-input', 'consensus-draft': 'draft-input' })) {
      const input = root.querySelector(`[data-field-id="${id}"]`), label = root.querySelector(`label[for="${input.id}"]`);
      input.id = legacy; label.htmlFor = legacy; input.required = legacy !== 'draft-input';
    }
    setId('.dsl-copy', 'copy-question'); setId('.dsl-writing-status', 'copy-question-status'); setId('.dsl-writing-model', 'model-answer');
    const toggle = setId('.dsl-model-toggle', 'show-model'); toggle.setAttribute('aria-controls', 'model-answer');
  } else if (activity === 'question-selfcheck') { setId('input', 'question-selfcheck'); root.querySelector('label').htmlFor = 'question-selfcheck'; }
  else if (activity === 'knowledge-check') { setId('.dsl-question-host', 'quiz-list'); setId('.dsl-quiz-summary', 'quiz-summary'); setId('.dsl-question-score', 'quiz-score'); setId('.dsl-retry-hint', 'retry-hint'); setId('.dsl-question-retry', 'retry-missed'); }
}
function wrapped(type) {
  const entry = standardActivityRegistry[type];
  return { ...entry, mount(root, options) {
    const activity = root.dataset.activityId, controller = entry.mount(root, options);
    if (activity === 'sequence-checkpoint') root.querySelectorAll('.dsl-choice').forEach(n => { n.dataset.correct = String(n.dataset.optionId === options.data.correctOptionId); });
    decorate(root, activity);
    return { update(next) { controller.update(next); decorate(root, activity); }, destroy() { controller.destroy(); } };
  } };
}
export const openingRegistry = Object.freeze({ ...standardActivityRegistry,
  'question-sequence': wrapped('question-sequence'), 'multiple-choice': wrapped('multiple-choice'),
  expandables: wrapped('expandables'), writing: wrapped('writing'), checklist: wrapped('checklist')
});
