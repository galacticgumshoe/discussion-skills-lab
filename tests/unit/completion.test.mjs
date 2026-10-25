import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { original } from '../helpers/baseline-source.mjs';
import { applyCompletion, canVisitSection, hasAllIds, hasCurrentCorrectAnswers, unionCompletedSections } from '../../assets/js/app/completion.js';
import { openProgress } from '../../assets/js/app/progress-store.js';
import { openingAdapter } from '../../lessons/opening/progress-adapter.js';
import { middleAdapter } from '../../lessons/middle/progress-adapter.js';
import { finalAdapter } from '../../lessons/final/progress-adapter.js';

const sections = ['first', 'second', 'third', 'fourth', 'reference'].map(id => ({ id, reference: id === 'reference' }));
const empty = () => ({ completedSections: [], activities: {}, fields: {}, flags: {}, ui: {} });
const freeze = value => { if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); } return value; };

for (const adapter of [openingAdapter, middleAdapter, finalAdapter]) {
  test(`${adapter.id}: exact access parity with pinned original core for EVERY completion subset`, () => {
    const ordered = adapter.sections.map(id => ({ id, reference: id === 'quick-reference' }));
    const total = ordered.length - 1;
    let raw;
    const context = { window: {}, localStorage: { getItem: () => raw }, document: { getElementById() {}, querySelectorAll() {} } };
    vm.runInNewContext(original('assets/js/lesson-core.js').toString(), context);
    for (let mask = 0; mask < 2 ** total; mask++) {
      const indexes = Array.from({ length: total }, (_, index) => index).filter(index => mask & (1 << index));
      raw = JSON.stringify({ completed: indexes, data: {} });
      const legacy = context.window.DSL.createLesson({ total, reference: total, id: 'test' });
      const completed = indexes.map(index => ordered[index].id);
      for (const [index, section] of ordered.entries()) assert.equal(canVisitSection(ordered, completed, section.id), legacy.canVisit(index), `${mask}: ${section.id}`);
      for (const invalid of ['unknown', '', null, 0, total + 1]) assert.equal(canVisitSection(ordered, completed, invalid), false);
    }
  });
}

test('non-contiguous access uses only the immediate predecessor; unknown IDs and DOM/numeric identities never unlock', () => {
  const completed = freeze(['first', 'fourth', 'unknown']);
  assert.deepEqual(sections.map(section => canVisitSection(sections, completed, section.id)), [true, true, false, true, true]);
  assert.equal(canVisitSection(sections, ['third'], 'fourth'), true);
  assert.equal(canVisitSection(sections, ['fourth'], 'third'), false);
  assert.equal(canVisitSection(sections, [], 'reference'), true);
  assert.equal(canVisitSection(sections, ['view-0', 0], 'second'), false);
});

test('completion union is pure, stable, deduplicated, associative and permanent', () => {
  const previous = freeze(['fourth', 'first']), earned = freeze(['first', 'second', 'second']);
  const result = unionCompletedSections(previous, earned);
  assert.deepEqual(result, ['fourth', 'first', 'second']);
  assert.deepEqual(unionCompletedSections(result, []), result);
  assert.deepEqual(unionCompletedSections(result, earned), result);
  assert.deepEqual(unionCompletedSections(unionCompletedSections(previous, earned), ['third']), unionCompletedSections(previous, unionCompletedSections(earned, ['third'])));
  assert.notEqual(result, previous);
  assert.deepEqual(previous, ['fourth', 'first']);
});

test('all-ID gates fail for each one-missing requirement, not merely counts or duplicates', () => {
  for (const required of [['card-a', 'card-b', 'card-c'], ['panel-a', 'panel-b'], ['question-a', 'question-b'], ['check-a', 'check-b']]) {
    assert.equal(hasAllIds(required, [...required, 'unrelated']), true);
    required.forEach(missing => assert.equal(hasAllIds(required, required.filter(id => id !== missing).concat('unrelated')), false, missing));
    assert.equal(hasAllIds(required, required.slice(1).flatMap(id => [id, id])), false);
    assert.equal(hasAllIds(required), false);
  }
  assert.equal(hasAllIds([], []), true);
});

const questions = [{ id: 'q-a', correctOptionId: 'option-zero' }, { id: 'q-b', correctOptionId: 'right' }];
test('current-correct inputs are independent of correct-ever history, including a first/zero option', () => {
  const selections = freeze({ 'q-a': 'option-zero', 'q-b': 'right' });
  assert.equal(hasCurrentCorrectAnswers(questions, selections), true);
  for (const question of questions) {
    const missing = { ...selections }; delete missing[question.id];
    assert.equal(hasCurrentCorrectAnswers(questions, missing), false);
    assert.equal(hasCurrentCorrectAnswers(questions, { ...selections, [question.id]: 'wrong' }), false);
  }
  assert.equal(hasCurrentCorrectAnswers(questions), false);
  assert.equal(hasCurrentCorrectAnswers([{ id: 'toString', correctOptionId: Object.prototype.toString }], {}), false);
  const activity = { selections: { ...selections, 'q-a': 'wrong' }, earnedQuestionIds: ['q-a', 'q-b'] };
  assert.equal(hasCurrentCorrectAnswers(questions, activity.selections), false);
  assert.equal(hasAllIds(questions.map(question => question.id), activity.earnedQuestionIds), true);
});

test('externally supplied current-answer and correct-ever policies grant different credit, then retain it permanently', () => {
  const completionPolicy = {
    first: state => hasCurrentCorrectAnswers(questions, state.activities.questions.selections),
    second: state => hasAllIds(questions.map(question => question.id), state.activities.questions.earnedQuestionIds)
  };
  const previous = empty();
  const next = { ...empty(), activities: { questions: { selections: { 'q-a': 'wrong', 'q-b': 'right' }, earnedQuestionIds: ['q-a', 'q-b'] } } };
  const earned = applyCompletion(freeze(previous), freeze(next), { sections, completionPolicy });
  assert.deepEqual(earned.completedSections, ['second']);
  const corrected = structuredClone(earned); corrected.activities.questions.selections['q-a'] = 'option-zero';
  const completed = applyCompletion(earned, corrected, { sections, completionPolicy });
  assert.deepEqual(completed.completedSections, ['second', 'first']);
  const cleared = { ...empty(), activities: { questions: { selections: {}, earnedQuestionIds: [] } } };
  assert.deepEqual(applyCompletion(completed, cleared, { sections, completionPolicy }).completedSections, ['second', 'first']);
  assert.deepEqual(previous, empty());
  assert.deepEqual(next.completedSections, []);
});

test('combined test gate requires each independent exploration/answer/draft/check input', () => {
  const completionPolicy = { first: state => hasAllIds(['a', 'b'], state.activities.panels.exploredIds)
    && hasAllIds(['q-a', 'q-b'], state.activities.questions.earnedQuestionIds)
    && state.fields.draft.trim().length > 0 && hasAllIds(['x', 'y'], state.activities.checks.checkedIds) };
  const ready = { ...empty(), fields: { draft: ' Synthetic ✓\n' }, activities: {
    panels: { exploredIds: ['a', 'b'] }, questions: { earnedQuestionIds: ['q-a', 'q-b'], selections: {} }, checks: { checkedIds: ['x', 'y'] }
  } };
  const omissions = [
    state => state.activities.panels.exploredIds.pop(), state => state.activities.panels.exploredIds.shift(),
    state => state.activities.questions.earnedQuestionIds.pop(), state => state.activities.questions.earnedQuestionIds.shift(),
    state => { state.fields.draft = ' \n'; },
    state => state.activities.checks.checkedIds.pop(), state => state.activities.checks.checkedIds.shift()
  ];
  for (const omit of omissions) {
    const next = structuredClone(ready); omit(next);
    assert.deepEqual(applyCompletion(empty(), next, { sections, completionPolicy }).completedSections, []);
  }
  const completed = applyCompletion(empty(), freeze(ready), { sections, completionPolicy });
  assert.deepEqual(completed.completedSections, ['first']);
  for (const omit of omissions) {
    const revised = structuredClone(ready); omit(revised);
    assert.deepEqual(applyCompletion(completed, revised, { sections, completionPolicy }).completedSections, ['first']);
  }
});

test('hydration, identical updates, UI-only changes, and visits cannot earn credit; reference is never evaluated', () => {
  let calls = 0;
  const completionPolicy = { first: () => { calls++; return true; }, reference: () => { throw new Error('Reference must not have a gate'); }, third: () => 'truthy is not credit' };
  const state = freeze({ ...empty(), fields: { draft: 'already ready on hydration' } });
  for (const next of [state, structuredClone(state), { ...state, ui: { presentation: 'changed' } }, { ...state, completedSections: ['second'] }]) {
    const result = applyCompletion(state, next, { sections, completionPolicy });
    assert.equal(result.completedSections.includes('first'), false);
  }
  assert.equal(calls, 0);
  const changed = { ...state, fields: { draft: 'meaningful edit' } };
  const result = applyCompletion(state, changed, { sections, completionPolicy });
  assert.equal(calls, 1);
  assert.deepEqual(result.completedSections, ['first']);
  // Missing detail never revokes stored credit or invokes its gate again.
  assert.deepEqual(applyCompletion(result, empty(), { sections, completionPolicy }).completedSections, ['first']);
  assert.equal(calls, 1);
});

test('completion/store connection retains non-contiguous credit and serializes stable IDs through all three verified adapters', () => {
  for (const adapter of [openingAdapter, middleAdapter, finalAdapter]) {
    let raw = JSON.stringify({ completed: [3], data: {}, future: { keep: '✓' } }), writes = 0;
    const store = openProgress({ key: adapter.key, adapter, storage: { getItem: () => raw, setItem: (_, value) => { raw = value; writes++; } } });
    const ordered = adapter.sections.map(id => ({ id, reference: id === 'quick-reference' }));
    const first = adapter.sections[0], field = Object.keys(store.state.fields)[0];
    const completionPolicy = { [first]: state => state.fields[field] === 'Synthetic edit\n✓' };
    const next = store.state; next.fields[field] = 'Synthetic edit\n✓'; next.completedSections = [];
    const result = store.save(applyCompletion(store.state, next, { sections: ordered, completionPolicy }));
    assert.equal(writes, 1);
    assert.deepEqual(result.state.completedSections, [adapter.sections[3], first]);
    assert.deepEqual(JSON.parse(raw).completed, [3, 0]);
    assert.deepEqual(JSON.parse(raw).future, { keep: '✓' });
    const revised = store.state; revised.fields[field] = ''; revised.completedSections = [];
    store.save(applyCompletion(store.state, revised, { sections: ordered, completionPolicy }));
    assert.deepEqual(JSON.parse(raw).completed, [3, 0]);
  }
});

test('navigation harness excerpts and ordered labels match pinned Opening content independently of screenshots', () => {
  const html = readFileSync(new URL('../fixtures/harness/navigation.html', import.meta.url), 'utf8');
  const source = original('opening.html').toString();
  const excerpts = [...html.matchAll(/<(h[123]|p)[^>]*data-baseline="([^"]+)"[^>]*>([^<]+)<\/\1>/g)];
  assert.equal(excerpts.length, 15);
  for (const [, , id, text] of excerpts) {
    const canonical = source.match(new RegExp(`data-template-id="${id}"[^>]*>([^<]+)<`));
    assert.ok(canonical, id); assert.equal(text, canonical[1], id);
  }
  const script = readFileSync(new URL('../fixtures/harness/navigation.mjs', import.meta.url), 'utf8');
  const labels = [...script.matchAll(/label: '([^']+)'/g)].map(match => match[1]);
  const opening = readFileSync(new URL('../../assets/js/opening.js', import.meta.url), 'utf8');
  assert.deepEqual(labels, Array.from(vm.runInNewContext(opening.match(/labels:(\[[^\n]+\])/)[1])));
});
