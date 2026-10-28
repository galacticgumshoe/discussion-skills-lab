// MIT. Fixed initial predicates from 0b5d229. Earned section union is app-owned.
const all = (values, ids) => ids.every(id => values?.includes(id));
const selected = (s, activity, question, option) => s.activities[activity]?.selections[question] === option;
export const openingCompletionPolicy = Object.freeze({
  contributions: s => all(s.activities.classification.attemptedQuestionIds, ['clarify-accomplishment', 'counseling-attendance', 'remaining-time', 'combine-proposals', 'redirect-task']) &&
    ['procedural', 'substantive', 'procedural', 'substantive', 'procedural'].every((option, i) => selected(s, 'classification', ['clarify-accomplishment', 'counseling-attendance', 'remaining-time', 'combine-proposals', 'redirect-task'][i], option)),
  'opening-sequence': s => all(s.activities.timeline.exploredIds, ['receive', 'read-analyze', 'clarify', 'establish-direction', 'research', 'transition']) && s.activities['sequence-checkpoint'].earnedQuestionIds.includes('next-step'),
  'task-analysis': s => all(s.activities['task-analysis'].exploredIds, ['role', 'problem', 'deliverable', 'setting', 'search-terms']) && selected(s, 'what-how', 'identify-what', 'stigma-effects'),
  clarifications: s => selected(s, 'clarification', 'before-accepting-agenda', 'clarify-deliverable'),
  'give-direction': s => s.activities['question-selfcheck'].checkedIds.includes('connects-what-how') && s.fields['consensus-draft'].trim().length >= 35,
  'research-transition': s => selected(s, 'research', 'after-research-period', 'specific-misunderstanding'),
  'knowledge-check': s => all(s.activities['knowledge-check'].earnedQuestionIds, ['substantive', 'opening-order', 'what-versus-how', 'clarification-purpose', 'roadmap-destination'])
});
