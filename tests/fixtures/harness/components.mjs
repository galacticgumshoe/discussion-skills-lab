// MIT. Direct test mounts only, not lesson-app, a registry, or a general renderer.
import { mountFlashcards } from '../../../assets/js/components/flashcards.js';
import { mountExpandables } from '../../../assets/js/components/expandables.js';
import { mountMultipleChoice } from '../../../assets/js/components/multiple-choice.js';
import { mountQuestionSequence } from '../../../assets/js/components/question-sequence.js';
import { mountNavigation } from '../../../assets/js/app/lesson-core.js';
import { applyCompletion, hasAllIds, hasCurrentCorrectAnswers } from '../../../assets/js/app/completion.js';
import { openProgress } from '../../../assets/js/app/progress-store.js';
import { openingAdapter } from '../../../lessons/opening/progress-adapter.js';
import { middleAdapter } from '../../../lessons/middle/progress-adapter.js';
import { finalAdapter } from '../../../lessons/final/progress-adapter.js';
import { questionActivities, explorationActivities } from './component-data.mjs';

const params = new URL(location.href).searchParams, lesson = params.get('lesson') || 'final';
const adapter = { opening: openingAdapter, middle: middleAdapter, final: finalAdapter }[lesson];
const json = path => fetch(new URL(path, import.meta.url)).then(response => response.json());
const banks = await json('../content/banks.json');
const maps = Object.fromEntries(await Promise.all(['opening', 'middle', 'final'].map(async id => [id, await json(`../legacy-maps/${id}.json`)])));
const documents = Object.fromEntries(await Promise.all(['opening', 'middle', 'final'].map(async id => [id,
  new DOMParser().parseFromString(await fetch(new URL(`../content/source/${id}.html`, import.meta.url)).then(response => response.text()), 'text/html')])));
const activities = [...explorationActivities(documents, maps, lesson), ...questionActivities(banks, maps, lesson).map(item => ({ ...item, type: 'questions' }))];
if (lesson === 'opening') {
  const source = documents.opening.querySelector('#sequence-check');
  activities.push({ id: 'sequence-checkpoint', type: 'question', data: { id: 'next-step', prompt: source.querySelector('p').textContent,
    correctOptionId: 'clarify-task', options: [...source.querySelectorAll('button')].map((button, index) => ({
      id: maps.opening.activities['sequence-checkpoint'].options[index], text: button.textContent,
      feedback: index === 1 ? 'Correct. Clarify the task before setting direction.' : 'Not quite. The group needs shared understanding before setting direction.'
    })) } });
}
const root = document.querySelector('#components-harness'), hosts = new Map(), controllers = new Map();
const store = openProgress({ key: adapter.key, adapter });
const sections = adapter.sections.map((id, index) => {
  const view = document.createElement('section'); view.id = `view-${index}`; view.className = 'lesson-view';
  const heading = document.createElement('h1'); heading.textContent = `Test section: ${id}`; view.append(heading); root.querySelector('#views').append(view);
  return { id, view, heading, label: id, requirement: 'Complete the mounted test gate.', reference: id === 'quick-reference' };
});
for (const activity of activities) {
  const wrapper = document.createElement('div'); wrapper.className = 'fixture-activity'; wrapper.dataset.activityId = activity.id;
  const title = document.createElement('h2'); title.textContent = `Baseline excerpt: ${activity.id}`;
  const host = document.createElement('div'); wrapper.append(title, host); sections[0].view.append(wrapper); hosts.set(activity.id, host);
}
if (params.has('reorder')) {
  const first = sections[0].view;
  [...first.querySelectorAll('.fixture-activity')].reverse().forEach(node => first.append(node));
  sections.slice().reverse().forEach(({ view }) => root.querySelector('#views').append(view));
}
// Explicit small policies, not complete lesson policies. Opening's real exception
// is deliberately exercised with all five current answers and attempted identities.
const firstGate = lesson === 'opening' ? state => {
  const questions = activities.find(item => item.id === 'classification').data.questions;
  return hasCurrentCorrectAnswers(questions, state.activities.classification.selections)
    && hasAllIds(questions.map(question => question.id), state.activities.classification.attemptedQuestionIds);
} : state => {
  const cards = activities.find(item => item.type === 'cards');
  return hasAllIds(cards.data.items.map(item => item.id), state.activities[cards.id].exploredIds);
};
const completionPolicy = { [sections[0].id]: firstGate };
if (lesson === 'opening') completionPolicy['opening-sequence'] = state => hasAllIds(activities[0].data.items.map(item => item.id), state.activities.timeline.exploredIds)
  && hasAllIds(['next-step'], state.activities['sequence-checkpoint'].earnedQuestionIds);
const navigation = mountNavigation(root, { sections, state: store.state });
let events = 0;
function changed(id, activityState) {
  events++;
  const previous = store.state, next = store.state; next.activities[id] = activityState;
  store.save(applyCompletion(previous, next, { sections, completionPolicy }));
  controllers.forEach((controller, id) => controller.update(store.state.activities[id]));
  navigation.update(store.state);
  root.querySelector('#storage-warning').textContent = store.diagnostics.map(item => item.message).join(' ');
}
function mount(activity) {
  const options = { data: activity.data, state: store.state.activities[activity.id], profile: activity.profile,
    onChange: next => changed(activity.id, next) };
  const fn = activity.type === 'cards' ? mountFlashcards : activity.type === 'panels' ? mountExpandables
    : activity.type === 'question' ? mountMultipleChoice : mountQuestionSequence;
  controllers.set(activity.id, fn(hosts.get(activity.id), options));
}
activities.forEach(mount);
root.querySelector('#storage-warning').textContent = store.diagnostics.map(item => item.message).join(' ');
window.componentsHarness = { store, adapter, activities, sections, navigation, hosts, controllers,
  get events() { return events; },
  hydrate() { controllers.forEach((controller, id) => controller.update(store.state.activities[id])); },
  remount() { controllers.forEach(controller => controller.destroy()); controllers.clear(); activities.forEach(mount); },
  mountFlashcards, mountExpandables, mountMultipleChoice, mountQuestionSequence
};
document.documentElement.dataset.ready = 'true';
