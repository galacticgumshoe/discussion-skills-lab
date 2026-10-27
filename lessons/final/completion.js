// MIT. Fixed baseline identities; Final requires current builder inputs, not
// merely historical assembly. Earned page credit is unioned by the shared app.
import { hasAllIds } from '../../assets/js/app/completion.js';

const all = (id, property, ids) => state => hasAllIds(ids, state.activities[id]?.[property]);
const explored = (id, ids) => all(id, 'exploredIds', ids);
const solved = (id, ids) => all(id, 'earnedQuestionIds', ids);
const checked = (id, ids) => all(id, 'checkedIds', ids);
const every = (...requirements) => state => requirements.every(requirement => requirement(state));
const nonempty = id => state => typeof state.fields[id] === 'string' && state.fields[id].trim().length > 0;

const welcome = explored('welcome-cards', ['connect-ideas', 'capture-findings', 'confirm-outcome']);
const comparison = explored('summary-synthesis-cards', ['summary', 'synthesis']);
const connect = explored('connect-viewpoints-panels', ['listen', 'connect', 'credit', 'advance']);
const synthesis = solved('connect-viewpoints-questions', ['clearest-direction']);
const organize = explored('organize-findings-panels', ['chronological', 'thematic']);
const notes = all('note-classification', 'earnedNoteIds', ['maya-access', 'jordan-cost', 'avery-communication', 'sam-pilot', 'group-agreement', 'funding-unresolved']);
const consensus = explored('consensus-cards', ['round-robin', 'majority', 'negotiate']);
const audit = explored('task-audit-panels', ['consensus-question', 'task', 'what-how']);
const professionalism = explored('professionalism-panels', ['exit', 'thank-judge', 'unexpected-interactions', 'relationships']);
const closing = solved('closing-practice-questions', ['connect-viewpoints', 'accurate-summary', 'spending-limit', 'evaluate-proposal']);
const knowledge = solved('knowledge-check', ['synthesis', 'effective-summary', 'unanimity', 'task-completion', 'judge-comments']);

export const finalCompletionPolicy = Object.freeze({
  welcome,
  'summary-synthesis': every(comparison, solved('summary-synthesis-questions', ['three-solutions', 'combined-test', 'remaining-time', 'agreed-pilot', 'phased-cost-review'])),
  'connect-viewpoints': every(connect, synthesis, ...['synthesis-contributors', 'synthesis-relationship', 'synthesis-recommendation'].map(nonempty),
    state => state.flags['synthesis-assembled'] === true, state => state.flags['synthesis-model-viewed'] === true,
    checked('synthesis-checklist', ['connect-two', 'credit-contributors', 'new-insight', 'task-focus', 'professional'])),
  'organize-findings': every(organize, notes, solved('organize-findings-questions', ['strongest-summary'])),
  consensus: every(consensus, solved('consensus-questions', ['unanimity-objection', 'limited-costs', 'confirm-compromise'])),
  'task-audit': every(audit, solved('task-audit-questions', ['missing-element', 'repair-gap', 'closing-audit'])),
  professionalism: every(professionalism, solved('professionalism-questions', ['leave-table', 'judge-feedback', 'positive-relationship'])),
  'closing-practice': every(closing, nonempty('closing-draft'), state => state.flags['closing-model-viewed'] === true,
    checked('closing-checklist', ['accurate-proposal', 'credit-two', 'connect-not-list', 'access-communication-affordability', 'confirmation-or-concern', 'concise-professional'])),
  'knowledge-check': knowledge
});

export function finalReveals(state) {
  return {
    'welcome-ready': welcome(state), 's1-reveal': comparison(state), 's2-reveal': connect(state), 'builder-area': synthesis(state),
    's3-reveal': organize(state), 's3-summary': notes(state), 's4-reveal': consensus(state), 's5-reveal': audit(state),
    's6-reveal': professionalism(state), 'closing-area': closing(state), completion: knowledge(state),
    'synthesis-checks': state.flags['synthesis-model-viewed'] === true, 'closing-checks': state.flags['closing-model-viewed'] === true
  };
}
