// MIT. Pure gates; the shared app permanently retains earned section credit.
const includesAll = (values, ids) => ids.every(id => values.includes(id));
const earned = (state, activity, ids) => includesAll(state.activities[activity].earnedQuestionIds, ids);
const icebreakersExplored = state => includesAll(state.activities['icebreaker-examples'].exploredIds,
  ['two-truths', 'have-you-ever', 'would-you-rather', 'things-in-common', 'small-talk']);

export const beforeRoundCompletionPolicy = {
  pack: state => includesAll(state.activities['pack-checklist'].checkedIds, ['device', 'name-tent', 'notes', 'water', 'hotspot-plan']),
  'task-access': state => earned(state, 'task-scenarios', ['early-release', 'paper-release']),
  arrive: state => earned(state, 'arrival-decisions', ['seat-order', 'wifi']),
  connect: state => icebreakersExplored(state) &&
    earned(state, 'icebreaker-choice', ['inclusive-start']),
  adapt: state => earned(state, 'adapt-scenarios', ['dominant-peer', 'inclusive-peer']),
  'knowledge-check': state => earned(state, 'readiness-quiz', ['equipment', 'advance-task', 'seating', 'icebreaker', 'observe'])
};

export function beforeRoundReveals(state) {
  return { 'icebreaker-question': state.completedSections.includes('connect') || icebreakersExplored(state) };
}
