// MIT. Mapping frozen from initialized baseline 0b5d229; never infer indexes from DOM.
import { createLegacyAdapter, collection, selection, member, text, indexed, keyed } from '../../assets/js/app/legacy-progress.js';
const data = key => ['data', key];
const questions = ['clarify-accomplishment', 'counseling-attendance', 'remaining-time', 'combine-proposals', 'redirect-task'];
const quiz = ['substantive', 'opening-order', 'what-versus-how', 'clarification-purpose', 'roadmap-destination'];
const quizOptions = [['clarify', 'research', 'time-limit'], ['clarify-before-direction', 'agenda-before-clarify', 'research-first'], ['source-citation', 'problem-deliverable', 'setting-role'], ['debate-before-reading', 'permanent-leader', 'shared-understanding'], ['roadmap-destination', 'problem-speaking-order', 'identical']];
const timeline = { 'stage-1': 'receive', 'stage-2': 'read-analyze', 'stage-3': 'clarify', 'stage-4': 'establish-direction', 'stage-5': 'research', 'stage-6': 'transition' };
const analysis = { who: 'role', what: 'problem', how: 'deliverable', where: 'setting', terms: 'search-terms' };
const emptyQuestion = ids => ({ selections: {}, earnedQuestionIds: [], attemptedQuestionIds: [], currentQuestionId: ids[0] });
const bindings = [
  collection(data('classificationSeen'), 'classification', 'attemptedQuestionIds', indexed(questions)),
  ...questions.map((question, index) => ({ ...selection([...data('classificationAnswers'), index], 'classification', question, ['procedural', 'substantive']), entries: [['procedural', 'procedural'], ['substantive', 'substantive']] })),
  collection(data('timelineSeen'), 'timeline', 'exploredIds', keyed(timeline)),
  collection(data('analysisSeen'), 'task-analysis', 'exploredIds', keyed(analysis)),
  member(data('sequenceCorrect'), 'sequence-checkpoint', 'earnedQuestionIds', 'next-step', true),
  { ...selection(['data', 'dslUi', 'selections', 'sequence-checkpoint', 'next-step'], 'sequence-checkpoint', 'next-step', ['propose-solutions', 'clarify-task', 'vote-leader']),
    entries: ['propose-solutions', 'clarify-task', 'vote-leader'].map(id => [id, id]), extension: true },
  selection(data('what-how-options'), 'what-how', 'identify-what', ['stigma-effects', 'counselor-plan']),
  selection(data('clarification-options'), 'clarification', 'before-accepting-agenda', ['brainstorm', 'clarify-deliverable', 'vote-leader']),
  selection(data('research-options'), 'research', 'after-research-period', ['restart', 'ignore', 'specific-misunderstanding']),
  ...quiz.map((question, index) => selection([...data('quizAnswers'), index], 'knowledge-check', question, quizOptions[index])),
  collection(data('quizEarned'), 'knowledge-check', 'earnedQuestionIds', indexed(quiz)),
  ...Object.entries({ 'problem-input': 'consensus-problem', 'accomplishment-input': 'consensus-accomplishment', 'draft-input': 'consensus-draft' }).map(([legacy, id]) => text(data(legacy), id)),
  member(data('questionSelfcheck'), 'question-selfcheck', 'checkedIds', 'connects-what-how')
];
export const openingAdapter = createLegacyAdapter({
  id: 'opening', key: 'dsl:opening-stage:v1',
  sections: ['contributions', 'opening-sequence', 'task-analysis', 'clarifications', 'give-direction', 'research-transition', 'knowledge-check', 'quick-reference'],
  bindings, arrays: ['classificationAnswers', 'quizAnswers'].map(key => ({ path: data(key), length: 5 })),
  defaults: {
    activities: {
      classification: emptyQuestion(questions), timeline: { exploredIds: [], openIds: [] }, 'task-analysis': { exploredIds: [] },
      'sequence-checkpoint': emptyQuestion(['next-step']), 'what-how': emptyQuestion(['identify-what']),
      clarification: emptyQuestion(['before-accepting-agenda']), research: emptyQuestion(['after-research-period']),
      'knowledge-check': emptyQuestion(quiz), 'question-selfcheck': { checkedIds: [] }
    }, fields: { 'consensus-problem': '', 'consensus-accomplishment': '', 'consensus-draft': '' }
  },
  afterDecode(state, raw) {
    // Exact original fallback: absent/non-array quizEarned uses only current correct answers.
    if (!Array.isArray(raw?.data?.quizEarned)) {
      const answers = raw?.data?.quizAnswers;
      if (Array.isArray(answers) && answers.length === 5) state.activities['knowledge-check'].earnedQuestionIds = quiz.filter((_, index) => answers[index] === [1, 0, 1, 2, 0][index]);
    }
  },
  afterEncode(output, state, original) {
    // Changing a fallback-supported answer must not erase previously supported credit.
    if (!Array.isArray(original?.data?.quizEarned) && JSON.stringify(output?.data?.quizAnswers) !== JSON.stringify(original?.data?.quizAnswers)) {
      output.data.quizEarned = state.activities['knowledge-check'].earnedQuestionIds.map(id => quiz.indexOf(id)).filter(index => index >= 0);
    }
  }
});
