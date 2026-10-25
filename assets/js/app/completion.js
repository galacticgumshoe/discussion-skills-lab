// MIT. Pure calculations over validated, stable-ID state; no lesson-specific policy.
import { copy, equal } from './legacy-progress.js';

export function unionCompletedSections(previous, earned) {
  return [...new Set([...previous, ...earned])];
}

export function canVisitSection(sections, completedSections, sectionId) {
  const index = sections.findIndex(section => section.id === sectionId);
  if (index === -1) return false;
  const completed = new Set(completedSections);
  return index === 0 || sections[index].reference === true || completed.has(sectionId) || completed.has(sections[index - 1].id);
}

export function hasAllIds(requiredIds, actualIds = []) {
  const actual = new Set(actualIds);
  return requiredIds.every(id => actual.has(id));
}

export function hasCurrentCorrectAnswers(questions, selections = {}) {
  return questions.every(question => Object.hasOwn(selections, question.id) && selections[question.id] === question.correctOptionId);
}

// Call only for activity changes, not hydration/navigation. Even an accidental
// unchanged update cannot earn credit. Gates are trusted, statically imported pure
// functions; they must return true (not a truthy value). UI is not gate evidence.
export function applyCompletion(previousState, nextState, { sections, completionPolicy }) {
  const result = copy(nextState);
  result.completedSections = unionCompletedSections(previousState.completedSections, nextState.completedSections);
  const changed = ['activities', 'fields', 'flags'].some(key => !equal(previousState[key], nextState[key]));
  if (changed) {
    const earned = sections.filter(section => !section.reference && !result.completedSections.includes(section.id)
      && Object.hasOwn(completionPolicy, section.id) && completionPolicy[section.id](result) === true).map(section => section.id);
    result.completedSections = unionCompletedSections(result.completedSections, earned);
  }
  return result;
}
