// MIT. Middle's legacy card and field indexes are GLOBAL initialized indexes.
import { createLegacyAdapter, collection, selection, member, text, flag, cursor, indexed } from '../../assets/js/app/legacy-progress.js';
const path = (...keys) => ['data', 'middleState', ...keys];
const sequences = {
  classify: { id: 'classification', questions: ['time', 'transportation-report', 'invite-perspective', 'combine-proposals', 'redirect'], options: Array(5).fill(['procedural', 'substantive']) },
  group: { id: 'group-decisions', questions: ['quiet-tablemate', 'detour', 'clock'], options: [['call-jordan', 'broad-invitation', 'heard-enough'], ['dismiss', 'continue-detour', 'return-transportation'], ['prioritize-review', 'take-over', 'ignore-time']] },
  communication: { id: 'communication-diagnosis', questions: ['disagreement', 'noisy-gym', 'committee-role', 'note-taking'], options: [['eye-roll', 'respectful-concern'], ['audible-ending', 'fade'], ['competitor-role', 'committee-role'], ['keep-typing', 'look-up']] },
  speaking: { id: 'speaking-simulator', questions: ['simultaneous-start', 'direct-response', 'cut-off'], options: [['talk-louder', 'yield-avery', 'more-important'], ['brief-relevant-finding', 'speak-at-length', 'never-speak'], ['withdraw', 'argue', 'finish-yield']] }
};
const quiz = ['substantive', 'useful-research', 'invite-perspective', 'sentence-endings', 'frequent-speaker'];
const quizOptions = [['next-item', 'time-left', 'combine-proposals', 'hear-others'], ['every-statistic', 'cite-explain-connect', 'stories', 'repeat'], ['call-by-name', 'ignore', 'broad-invitation', 'criticize'], ['no-interruption', 'complete-thought', 'leadership', 'avoid-listening'], ['talk-over', 'more-important', 'yield-next', 'withdraw']];
const cards = {
  welcome: ['welcome-cards', [[0, 'bring-evidence'], [1, 'build-collaboration'], [2, 'manage-floor']]],
  s1: ['structure-cards', [[3, 'procedural'], [4, 'substantive']]],
  models: ['research-model-cards', [[5, 'weak-example'], [6, 'stronger-example']]],
  speaking: ['speaking-cards', [[7, 'prevent-interruption'], [8, 'respond-constructively']]]
};
const panels = {
  evidenceOpened: ['evidence-panels', ['relevance', 'evidence', 'explanation', 'connection']],
  communicationOpened: ['communication-panels', ['body-language', 'professional-language', 'voice-volume']],
  strategyOpened: ['strategy-panels', ['continue', 'request-first', 'yield-next', 'direct-connection']],
  openedDetails: ['collaboration-panels', ['take-notes', 'manage-time', 'include-others', 'focus-group']]
};
const checks = { research: ['source-date', 'accurate-finding', 'task-connection', 'avoid-overstatement'], application: ['connect-two-ideas', 'add-insight', 'task-focus', 'professional-tone', 'supported-evidence'] };
const questionState = questions => ({ selections: {}, earnedQuestionIds: [], currentQuestionId: questions[0] });
const bindings = [
  ...Object.entries(cards).map(([group, [activity, entries]]) => collection(path('sets', 'flipped', group), activity, 'exploredIds', entries)),
  ...Object.entries(panels).map(([key, [activity, ids]]) => collection(path('sets', key), activity, 'exploredIds', indexed(ids))),
  ...Object.entries(sequences).flatMap(([key, { id, questions, options }]) => [
    collection(path('sets', 'solved', key), id, 'earnedQuestionIds', indexed(questions)),
    cursor(path('positions', key), id, questions),
    ...questions.map((question, index) => selection(path('selections', `${key}-options-${index}`), id, question, options[index]))
  ]),
  collection(path('sets', 'solved', 'application'), 'application', 'earnedQuestionIds', [['a', 'substantive-contribution'], ['b', 'collaborative-move']]),
  ...['a', 'b'].map((suffix, index) => selection(path('selections', `application-${suffix}-options`), 'application', ['substantive-contribution', 'collaborative-move'][index], [['change-topic', 'synthesize-pilot', 'time-left'], ['stop-others', 'evaluate-recommendations', 'take-over']][index])),
  selection(path('selections', 'research-options'), 'research', 'effective-research', ['personal-story', 'source-finding-connection', 'derail', 'only-barrier']),
  collection(path('sets', 'correctQuiz'), 'knowledge-check', 'earnedQuestionIds', indexed(quiz)),
  cursor(path('quizIndex'), 'knowledge-check', quiz),
  ...quiz.map((question, index) => selection(path('selections', `quiz-${index}`), 'knowledge-check', question, quizOptions[index])),
  ...[[0, 'evidence-source'], [1, 'evidence-finding'], [2, 'evidence-connection'], [3, 'evidence-output'], [8, 'integrated-draft']].map(([index, id]) => text(path('fields', String(index)), id)),
  ...Object.entries(checks).flatMap(([group, ids]) => ids.map((id, index) => member(path('fields', String(index + (group === 'research' ? 4 : 9))), `${group}-checklist`, 'checkedIds', id))),
  flag(path('researchCorrect'), 'research-correct-ever', true), flag(path('assembled'), 'evidence-assembled', true),
  ...['research', 'application'].map(id => ({ ...flag(['data', 'dslUi', 'models', `${id}-model`], `${id}-model-visible`), extension: true }))
];
export const middleAdapter = createLegacyAdapter({
  id: 'middle', key: 'dsl:middle:v1',
  sections: ['welcome', 'structure-substance', 'evidence', 'support-group', 'communication', 'speaking-conflicts', 'integrated-practice', 'knowledge-check', 'quick-reference'], bindings,
  defaults: {
    activities: {
      ...Object.fromEntries(Object.values(cards).map(([id]) => [id, { exploredIds: [], backIds: [] }])),
      ...Object.fromEntries(Object.values(panels).map(([id]) => [id, { exploredIds: [], openIds: [] }])),
      ...Object.fromEntries(Object.values(sequences).map(({ id, questions }) => [id, questionState(questions)])),
      application: questionState(['substantive-contribution', 'collaborative-move']), research: questionState(['effective-research']), 'knowledge-check': questionState(quiz),
      'research-checklist': { checkedIds: [] }, 'application-checklist': { checkedIds: [] }
    },
    fields: { 'evidence-source': '', 'evidence-finding': '', 'evidence-connection': '', 'evidence-output': '', 'integrated-draft': '' },
    flags: { 'research-correct-ever': false, 'evidence-assembled': false, 'research-model-visible': false, 'application-model-visible': false }
  }
});
