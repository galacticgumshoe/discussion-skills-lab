// MIT. New module identity only; existing lessons keep their legacy codecs.
import { createIdProgressAdapter } from '../../assets/js/app/id-progress-adapter.js';

export const beforeRoundSections = ['pack', 'task-access', 'arrive', 'connect', 'adapt', 'knowledge-check', 'quick-reference'];
export const beforeRoundDefaults = {
  completedSections: [],
  activities: {
    'pack-checklist': { checkedIds: [] },
    'task-scenarios': { selections: {}, earnedQuestionIds: [], attemptedQuestionIds: [], currentQuestionId: 'early-release' },
    'arrival-decisions': { selections: {}, earnedQuestionIds: [], attemptedQuestionIds: [], currentQuestionId: 'seat-order' },
    'icebreaker-examples': { exploredIds: [], openIds: [] },
    'icebreaker-choice': { selections: {}, earnedQuestionIds: [], attemptedQuestionIds: [], currentQuestionId: 'inclusive-start' },
    'adapt-scenarios': { selections: {}, earnedQuestionIds: [], attemptedQuestionIds: [], currentQuestionId: 'dominant-peer' },
    'readiness-quiz': { selections: {}, earnedQuestionIds: [], attemptedQuestionIds: [], currentQuestionId: 'equipment' }
  },
  fields: {},
  flags: {},
  ui: {}
};
export const beforeRoundAdapter = createIdProgressAdapter({
  id: 'before-round', sections: beforeRoundSections, defaults: beforeRoundDefaults
});
