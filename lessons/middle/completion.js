// MIT. Fixed identities from the milestone-1 map, never inferred from DOM or copy.
import { hasAllIds } from '../../assets/js/app/completion.js';

const all = (activity, property, ids) => state => hasAllIds(ids, state.activities[activity]?.[property]);
const explored = (activity, ids) => all(activity, 'exploredIds', ids);
const solved = (activity, ids) => all(activity, 'earnedQuestionIds', ids);
const checked = (activity, ids) => all(activity, 'checkedIds', ids);
const every = (...requirements) => state => requirements.every(requirement => requirement(state));

const welcome = explored('welcome-cards', ['bring-evidence', 'build-collaboration', 'manage-floor']);
const structure = explored('structure-cards', ['procedural', 'substantive']);
const evidence = explored('evidence-panels', ['relevance', 'evidence', 'explanation', 'connection']);
const models = explored('research-model-cards', ['weak-example', 'stronger-example']);
const collaboration = explored('collaboration-panels', ['take-notes', 'manage-time', 'include-others', 'focus-group']);
const communication = explored('communication-panels', ['body-language', 'professional-language', 'voice-volume']);
const strategies = explored('strategy-panels', ['continue', 'request-first', 'yield-next', 'direct-connection']);
const speaking = explored('speaking-cards', ['prevent-interruption', 'respond-constructively']);

export const middleCompletionPolicy = Object.freeze({
  welcome,
  'structure-substance': every(structure, solved('classification', ['time', 'transportation-report', 'invite-perspective', 'combine-proposals', 'redirect'])),
  evidence: every(evidence, models, state => state.flags['research-correct-ever'] === true,
    state => state.flags['evidence-assembled'] === true,
    checked('research-checklist', ['source-date', 'accurate-finding', 'task-connection', 'avoid-overstatement'])),
  'support-group': every(collaboration, solved('group-decisions', ['quiet-tablemate', 'detour', 'clock'])),
  communication: every(communication, solved('communication-diagnosis', ['disagreement', 'noisy-gym', 'committee-role', 'note-taking'])),
  'speaking-conflicts': every(strategies, speaking, solved('speaking-simulator', ['simultaneous-start', 'direct-response', 'cut-off'])),
  'integrated-practice': every(solved('application', ['substantive-contribution', 'collaborative-move']),
    state => typeof state.fields['integrated-draft'] === 'string' && state.fields['integrated-draft'].trim().length > 0,
    checked('application-checklist', ['connect-two-ideas', 'add-insight', 'task-focus', 'professional-tone', 'supported-evidence'])),
  'knowledge-check': solved('knowledge-check', ['substantive', 'useful-research', 'invite-perspective', 'sentence-endings', 'frequent-speaker'])
});

// Separate reveal policy: completion flags, latest answers, face/open state and
// optional models cannot substitute for the original prerequisite evidence.
export function middleReveals(state) {
  return {
    classification: structure(state),
    'evidence-after': evidence(state),
    'research-activity': models(state),
    'group-activity': collaboration(state),
    'communication-activity': communication(state),
    'speaking-flashcards': strategies(state),
    'speaking-activity': speaking(state)
  };
}
