// MIT. Non-instructional fixture labels; no interaction implementation.
export const defaults = {
  completedSections: [],
  activities: {
    'test-question': {selections: {}, earnedQuestionIds: []},
    'test-checks': {checkedIds: []}
  },
  fields: {'test-draft': ''}, flags: {}, ui: {}
};
export const policies = {
  'test-explanation': state => state.activities['test-question'].earnedQuestionIds.includes('test-choice'),
  'test-worksheet': state => state.fields['test-draft'].trim().length >= 5 && ['check-a', 'check-b'].every(id => state.activities['test-checks'].checkedIds.includes(id))
};
