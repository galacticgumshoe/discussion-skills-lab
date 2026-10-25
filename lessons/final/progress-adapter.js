// MIT. Explored panels use page-local indexes; panelsOpen uses a separate global table.
import { createLegacyAdapter, collection, selection, member, text, flag, cursor, indexed } from '../../assets/js/app/legacy-progress.js';
const path = (...keys) => ['data', 'finalState', ...keys];
const sections = ['welcome', 'summary-synthesis', 'connect-viewpoints', 'organize-findings', 'consensus', 'task-audit', 'professionalism', 'closing-practice', 'knowledge-check', 'quick-reference'];
const questions = {
  1: ['three-solutions', 'combined-test', 'remaining-time', 'agreed-pilot', 'phased-cost-review'], 2: ['clearest-direction'], 3: ['strongest-summary'],
  4: ['unanimity-objection', 'limited-costs', 'confirm-compromise'], 5: ['missing-element', 'repair-gap', 'closing-audit'],
  6: ['leave-table', 'judge-feedback', 'positive-relationship'], 7: ['connect-viewpoints', 'accurate-summary', 'spending-limit', 'evaluate-proposal'],
  8: ['synthesis', 'effective-summary', 'unanimity', 'task-completion', 'judge-comments']
};
const options = {
  1: Array(5).fill(['summary', 'synthesis', 'procedural']), 2: [['repeat', 'coordinate', 'most-frequent']], 3: [['vague-success', 'organized-findings', 'speaking-order']],
  4: [['majority', 'explore-concerns', 'ignore'], ['cap-evaluate', 'criticize', 'abandon'], ['unrelated-debate', 'check-support', 'assume-silence']],
  5: [['access', 'communication', 'affordability'], ['funding-cap-review', 'confidence', 'vague-success'], ['impression', 'requirements-support', 'finish-now']],
  6: [['linger', 'leave', 'ranking'], ['coach-follow-up', 'argue', 'critique'], ['sincere-recognition', 'criticize', 'judge-preference']],
  7: [['maya-only', 'credit-coordinate', 'generic-praise'], ['vague', 'pilot-outreach-review', 'overclaim'], ['spending-cap', 'ignore-jordan', 'end'], ['impression', 'requirements-support', 'speaking-time']],
  8: [['chronological', 'connect-new', 'time', 'popularity'], ['every-sentence', 'own-ideas', 'organized-credit', 'declare-success'], ['majority', 'negotiate', 'ignore', 'end'], ['enjoyment', 'elapsed-time', 'required-components', 'chronological'], ['challenge', 'ranking', 'polite-coach', 'critique']]
};
const cards = { 0: ['connect-ideas', 'capture-findings', 'confirm-outcome'], 1: ['summary', 'synthesis'], 4: ['round-robin', 'majority', 'negotiate'] };
const panels = { 2: ['listen', 'connect', 'credit', 'advance'], 3: ['chronological', 'thematic'], 5: ['consensus-question', 'task', 'what-how'], 6: ['exit', 'thank-judge', 'unexpected-interactions', 'relationships'] };
const panelsOpen = ['listen', 'connect', 'credit', 'advance', 'chronological', 'thematic', 'consensus-question', 'task', 'what-how', 'exit', 'thank-judge', 'unexpected-interactions', 'relationships'];
const checks = { 2: ['connect-two', 'credit-contributors', 'new-insight', 'task-focus', 'professional'], 7: ['accurate-proposal', 'credit-two', 'connect-not-list', 'access-communication-affordability', 'confirmation-or-concern', 'concise-professional'] };
const questionActivity = page => page === '8' ? 'knowledge-check' : `${sections[page]}-questions`;
export const finalAdapter = createLegacyAdapter({
  id: 'final', key: 'dsl:final:v1', sections,
  bindings: [
    ...Object.entries(cards).map(([page, ids]) => collection(path('flips', page), `${sections[page]}-cards`, 'exploredIds', indexed(ids))),
    ...Object.entries(panels).flatMap(([page, ids]) => [
      collection(path('panels', page), `${sections[page]}-panels`, 'exploredIds', indexed(ids)),
      ...ids.map(id => member(path('panelsOpen', String(panelsOpen.indexOf(id))), `${sections[page]}-panels`, 'openIds', id))
    ]),
    ...Object.entries(questions).flatMap(([page, ids]) => [
      collection(path('answers', page), questionActivity(page), 'earnedQuestionIds', indexed(ids)), cursor(path('quizIndex', page), questionActivity(page), ids),
      ...ids.map((id, index) => selection(path('selections', `${page}:${index}`), questionActivity(page), id, options[page][index]))
    ]),
    ...Object.entries(checks).map(([page, ids]) => collection(path('checks', page), page === '2' ? 'synthesis-checklist' : 'closing-checklist', 'checkedIds', indexed(ids), false)),
    ...['maya-access', 'jordan-cost', 'avery-communication', 'sam-pilot', 'group-agreement', 'funding-unresolved'].map((id, index) => member(path('notes', String(index)), 'note-classification', 'earnedNoteIds', id, true)),
    collection(path('goals'), 'practice-goals', 'checkedIds', indexed(['credit-connect', 'genuine-consensus', 'task-review']), false),
    ...Object.entries({ 'build-1': 'synthesis-contributors', 'build-2': 'synthesis-relationship', 'build-3': 'synthesis-recommendation', assembled: 'synthesis-output', 'closing-text': 'closing-draft' }).map(([key, id]) => text(path('fields', key), id)),
    ...Object.entries({ assembled: 'synthesis-assembled', builderModel: 'synthesis-model-viewed', closingModel: 'closing-model-viewed' }).map(([key, id]) => flag(path(key), id, true))
  ],
  defaults: {
    activities: {
      ...Object.fromEntries(Object.keys(cards).map(page => [`${sections[page]}-cards`, { exploredIds: [], backIds: [] }])),
      ...Object.fromEntries(Object.keys(panels).map(page => [`${sections[page]}-panels`, { exploredIds: [], openIds: [] }])),
      ...Object.fromEntries(Object.entries(questions).map(([page, ids]) => [questionActivity(page), { selections: {}, earnedQuestionIds: [], currentQuestionId: ids[0] }])),
      'synthesis-checklist': { checkedIds: [] }, 'closing-checklist': { checkedIds: [] }, 'practice-goals': { checkedIds: [] }, 'note-classification': { earnedNoteIds: [] }
    },
    fields: { 'synthesis-contributors': '', 'synthesis-relationship': '', 'synthesis-recommendation': '', 'synthesis-output': '', 'closing-draft': '' },
    flags: { 'synthesis-assembled': false, 'synthesis-model-viewed': false, 'closing-model-viewed': false }
  }
});
