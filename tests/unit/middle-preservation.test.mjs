// MIT test implementation; compared instructional content © Rhys Jones, CC BY 4.0.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync, readdirSync } from 'node:fs';
import { original } from '../helpers/baseline-source.mjs';
import { middleAdapter } from '../../lessons/middle/progress-adapter.js';
import { middleCompletionPolicy, middleReveals } from '../../lessons/middle/completion.js';
import { applyCompletion } from '../../assets/js/app/completion.js';
import { validateActivityDocument, validateLegacyVariants } from '../../scripts/validate-content.mjs';
import { validateActivity } from '../../assets/js/app/lesson-validation.js';

const fixture = path => JSON.parse(readFileSync(new URL(`../fixtures/${path}`, import.meta.url)));
const activity = id => JSON.parse(readFileSync(new URL(`../../content/middle/activities/${id}.json`, import.meta.url)));
const map = fixture('legacy-maps/middle.json');
const banks = fixture('content/banks.json').middle;
const source = original('assets/js/middle.js').toString();
const sections = map.sections.map(id => ({ id, reference: id === 'quick-reference' }));
const freeze = value => { if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); } return value; };
const gates = state => Object.entries(middleCompletionPolicy).filter(([, gate]) => gate(state)).map(([id]) => id);

// Execute the actual pinned updateCompletion, not a translated expected gate.
// Only the DOM check inputs and legacy core calls are replaced with inert stubs.
function originalGates(state) {
  const raw = middleAdapter.encode(state, { completed: [], data: {} }).data.middleState || {};
  const context = { raw, DSL: { createLesson: () => ({ complete() {}, update() {} }) }, persist() {},
    document: { getElementById(id) {
      if (id === 'application-draft') return { value: raw.fields?.[8] || '' };
      const indexes = id === 'research-checks' ? [4, 5, 6, 7] : [9, 10, 11, 12, 13];
      return { querySelectorAll: () => indexes.map(index => ({ checked: raw.fields?.[index] === true })) };
    } } };
  return JSON.parse(vm.runInNewContext(`${source.slice(0, source.indexOf('    function go('))}
    for (const [name, values] of Object.entries(raw.sets?.flipped || {})) values.forEach(value => flipped[name].add(value));
    for (const [name, values] of Object.entries(raw.sets?.solved || {})) values.forEach(value => solved[name].add(value));
    for (const [name, target] of Object.entries({evidenceOpened, communicationOpened, strategyOpened, openedDetails, correctQuiz}))
      (raw.sets?.[name] || []).forEach(value => target.add(value));
    researchCorrect = !!raw.researchCorrect; assembled = !!raw.assembled;
    updateCompletion(); JSON.stringify([...completed].map(index => ${JSON.stringify(map.sections)}[index]));`, context, { timeout: 1000 }));
}

function originalReveals(state) {
  const raw = middleAdapter.encode(state, { completed: [], data: {} }).data.middleState || {};
  const shown = {};
  const names = { 's1-activity': 'classification', 'evidence-after': 'evidence-after', 'research-activity': 'research-activity',
    'group-activity': 'group-activity', 'communication-activity': 'communication-activity',
    'speaking-flashcards': 'speaking-flashcards', 'speaking-activity': 'speaking-activity' };
  Object.values(names).forEach(id => { shown[id] = false; });
  // Execute the actual baseline restore reveal calls over restored Set evidence.
  const revealCalls = source.slice(source.indexOf('      const show='), source.indexOf('      for(const key of Object.keys(positions))'));
  assert.ok(revealCalls.includes("show('s1-activity'"));
  const context = { raw, DSL: { createLesson: () => ({}) }, document: { getElementById(id) {
    return { classList: { remove() { assert.ok(names[id]); shown[names[id]] = true; } } };
  } } };
  vm.runInNewContext(`${source.slice(0, source.indexOf('    function go('))}
    for (const [name, values] of Object.entries(raw.sets?.flipped || {})) values.forEach(value => flipped[name].add(value));
    for (const [name, target] of Object.entries({evidenceOpened, communicationOpened, strategyOpened, openedDetails}))
      (raw.sets?.[name] || []).forEach(value => target.add(value));
    ${revealCalls}`, context, { timeout: 1000 });
  return shown;
}

function readyState() {
  return middleAdapter.decode({ completed: [], data: { middleState: {
    sets: {
      flipped: Object.fromEntries(Object.entries(map.sets.flipped).map(([key, entries]) => [key, Object.keys(entries).map(Number)])),
      ...Object.fromEntries(['evidenceOpened', 'communicationOpened', 'strategyOpened', 'openedDetails', 'correctQuiz'].map(key => [key, map.sets[key].map((_, index) => index)])),
      solved: Object.fromEntries(Object.entries(map.sets.solved).map(([key, ids]) => [key, Array.isArray(ids) ? ids.map((_, index) => index) : Object.keys(ids)]))
    },
    fields: { 4: true, 5: true, 6: true, 7: true, 8: ' Synthetic draft — ✓\n', 9: true, 10: true, 11: true, 12: true, 13: true },
    researchCorrect: true, assembled: true
  } } });
}

test('Middle production policies match the pinned engine for every single missing prerequisite and are pure', () => {
  const ready = readyState();
  assert.deepEqual(Object.keys(middleCompletionPolicy), map.sections.slice(0, -1));
  assert.deepEqual(gates(freeze(structuredClone(ready))), map.sections.slice(0, -1));
  assert.deepEqual(gates(ready), originalGates(ready));
  const mutations = [];
  for (const [id, own] of Object.entries(ready.activities)) {
    for (const property of ['exploredIds', 'earnedQuestionIds', 'checkedIds']) {
      for (const member of own[property] || []) mutations.push({ label: `${id}/${property}/${member}`, change(state) {
        state.activities[id][property] = own[property].filter(value => value !== member);
      } });
    }
  }
  for (const flag of ['research-correct-ever', 'evidence-assembled']) mutations.push({ label: flag, change(state) { state.flags[flag] = false; } });
  mutations.push({ label: 'draft', change(state) { state.fields['integrated-draft'] = ' \n\t'; } });
  assert.ok(mutations.length > 40);
  for (const { label, change } of mutations) {
    const state = structuredClone(ready); change(state);
    const before = structuredClone(state), actual = gates(freeze(state));
    assert.deepEqual(actual, originalGates(state), label);
    assert.equal(actual.length, 7, `Exactly one section must fail: ${label}`);
    assert.deepEqual(state, before, `No policy mutation: ${label}`);
  }
});

test('Middle gates use IDs, not counts, latest answers, cursor, DOM, models or retained research input', () => {
  const ready = readyState(), state = structuredClone(ready);
  for (const own of Object.values(state.activities)) {
    if (own.selections) own.selections = { arbitrary: 'wrong' };
    if (own.backIds) own.backIds = [];
    if (own.openIds) own.openIds = [];
    if (own.currentQuestionId) own.currentQuestionId = 'unknown';
  }
  state.flags['research-model-visible'] = false; state.flags['application-model-visible'] = false;
  for (const id of ['evidence-source', 'evidence-finding', 'evidence-connection', 'evidence-output']) state.fields[id] = '';
  assert.deepEqual(gates(state), gates(ready));
  assert.deepEqual(gates(state), originalGates(state));
  for (const id of ['welcome-cards', 'classification', 'research-checklist']) {
    const property = id === 'welcome-cards' ? 'exploredIds' : id === 'classification' ? 'earnedQuestionIds' : 'checkedIds';
    const invalid = structuredClone(ready), values = invalid.activities[id][property];
    invalid.activities[id][property] = values.slice(1).concat(values[1], 'unrelated');
    assert.equal(gates(invalid).length, 7, `${id}: duplicates and foreign IDs are not credit`);
  }
  assert.deepEqual(gates(middleAdapter.decode({ completed: [], data: {} })), []);
});

test('Middle reveal prerequisites exactly match pinned restore conditions and ignore latest wrong selections', () => {
  const ready = readyState(), prerequisites = {
    classification: 'structure-cards', 'evidence-after': 'evidence-panels', 'research-activity': 'research-model-cards',
    'group-activity': 'collaboration-panels', 'communication-activity': 'communication-panels',
    'speaking-flashcards': 'strategy-panels', 'speaking-activity': 'speaking-cards'
  };
  assert.deepEqual(middleReveals(ready), Object.fromEntries(Object.keys(prerequisites).map(id => [id, true])));
  assert.deepEqual(middleReveals(ready), originalReveals(ready));
  for (const [reveal, id] of Object.entries(prerequisites)) {
    const state = structuredClone(ready); state.activities[id].exploredIds.pop();
    assert.deepEqual(middleReveals(state), { ...middleReveals(ready), [reveal]: false });
    assert.deepEqual(middleReveals(state), originalReveals(state));
  }
  const state = structuredClone(ready);
  for (const own of Object.values(state.activities)) if (own.selections) own.selections = { arbitrary: 'wrong' };
  state.completedSections = [];
  assert.deepEqual(middleReveals(state), middleReveals(ready));
  // Reveals do not require their upstream visible group again: this is the
  // exact independent restore policy for an old sparse but valid record.
  state.activities['evidence-panels'].exploredIds = [];
  assert.equal(middleReveals(state)['research-activity'], true);
  assert.deepEqual(middleReveals(state), originalReveals(state));
});

test('Middle completed credit is monotonic; no visits, hydration or optional model changes earn credit', () => {
  const ready = readyState();
  assert.deepEqual(applyCompletion(ready, ready, { sections, completionPolicy: middleCompletionPolicy }).completedSections, []);
  const ui = structuredClone(ready); ui.ui.synthetic = true;
  assert.deepEqual(applyCompletion(ready, ui, { sections, completionPolicy: middleCompletionPolicy }).completedSections, []);
  const completed = { ...ready, completedSections: map.sections.slice(0, -1) };
  const empty = middleAdapter.decode({ completed: [], data: {} });
  assert.deepEqual(applyCompletion(completed, empty, { sections, completionPolicy: middleCompletionPolicy }).completedSections, completed.completedSections);
  const optional = structuredClone(empty); optional.flags['research-model-visible'] = true; optional.flags['application-model-visible'] = true;
  assert.deepEqual(applyCompletion(empty, optional, { sections, completionPolicy: middleCompletionPolicy }).completedSections, []);
});

test('Middle valid frozen fixtures have the same original readiness and retain sparse completed pages', () => {
  let count = 0;
  for (const file of readdirSync(new URL('../fixtures/progress/middle/', import.meta.url))) {
    const record = fixture(`progress/middle/${file}`);
    if (record.safety === 'unsafe') continue;
    const raw = record.raw === null ? { completed: [], data: {} } : JSON.parse(record.raw);
    const state = middleAdapter.decode(raw);
    assert.deepEqual(gates(state), originalGates(state), file);
    assert.deepEqual(middleReveals(state), originalReveals(state), file);
    assert.deepEqual(state.completedSections, [...new Set(raw.completed.map(index => map.sections[index]))], file);
    count++;
  }
  assert.ok(count >= 8);
});

for (const [key, id] of [['classification', 'classification'], ['group', 'group-decisions'], ['communication', 'communication-diagnosis'], ['speaking', 'speaking-simulator'], ['questions', 'knowledge-check']]) {
  test(`Middle ${id}: every prompt, option, answer and alternative feedback matches sealed data independently`, () => {
    const data = activity(id), originalItems = banks[key];
    assert.deepEqual(validateActivityDocument(data, { activityId: id }), []);
    assert.equal(validateActivity(data, { activityId: id }), true);
    const legacyKey = { classification: 'classify', group: 'group', communication: 'communication', speaking: 'speaking' }[key];
    const ids = legacyKey ? map.sets.solved[legacyKey] : map.sets.correctQuiz;
    const options = legacyKey ? map.selections[`${legacyKey}-options-N`].options : map.selections['quiz-N'].options;
    assert.equal(data.data.questions.length, originalItems.length);
    for (const [index, question] of data.data.questions.entries()) {
      const expected = originalItems[index], optionIds = key === 'classification' ? options : options[index];
      assert.equal(question.id, ids[index]);
      const prompt = key === 'questions' ? expected.q : `${index + 1} of ${originalItems.length} · ${expected.title ? `${expected.title} — ` : ''}${expected.q}`;
      assert.equal(question.prompt, prompt);
      assert.deepEqual(question.options.map(option => option.text), expected.options || ['Procedural', 'Substantive']);
      assert.deepEqual(question.options.map(option => option.id), optionIds);
      // Answer oracle is frozen numeric/index data, not inferred from wording.
      assert.equal(question.correctOptionId, optionIds[expected.answer]);
      if (Array.isArray(expected.feedback)) {
        assert.equal(question.explanation, undefined);
        question.options.forEach((option, n) => assert.equal(option.feedback, `${n === expected.answer ? 'Good choice.' : 'Not quite.'} ${expected.feedback[n]}`));
      } else assert.equal(question.explanation, expected.feedback || expected.explanation);
    }
  });
}

test('Middle checklists preserve generated labels and fixed initialized IDs/order', () => {
  for (const id of ['research', 'application']) {
    const data = activity(`${id}-checklist`);
    assert.deepEqual(validateActivityDocument(data), []);
    assert.deepEqual(data.data.items.map(item => item.id), map.checks[id]);
    const match = source.match(new RegExp(`addChecks\\('${id}-checks',(\\[[^\\n]+?\\]),'${id}-check'`));
    assert.ok(match);
    const expected = JSON.parse(vm.runInNewContext(`JSON.stringify(${match[1]})`));
    assert.deepEqual(data.data.items.map(item => item.text), expected);
  }
});

test('Middle unused strategy/reference variants preserve original identities and exact values without publication', () => {
  const archive = JSON.parse(readFileSync(new URL('../../content/middle/legacy-variants.json', import.meta.url)));
  assert.deepEqual(validateLegacyVariants(archive), []);
  assert.equal(archive.records.length, 5);
  const reference = source.slice(source.indexOf('    const referenceText='), source.indexOf('    function init()'));
  const expectedReference = vm.runInNewContext(`${reference}\nreferenceText`);
  const expected = [...banks.strategies, expectedReference];
  archive.records.forEach((record, index) => {
    assert.equal(record.status, 'non-published');
    assert.equal(record.source.revision, map.revision);
    assert.equal(record.source.path, 'assets/js/middle.js');
    assert.equal(record.source.symbol, index < 4 ? 'strategies' : 'referenceText');
    assert.equal(record.source.index, index < 4 ? index : undefined);
    assert.deepEqual(record.value, expected[index]);
  });
  // This archive is not accepted as a published activity or a reference.
  assert.throws(() => validateActivity(archive));
  const invalid = [
    value => { value.records[0].status = 'published'; },
    value => { value.records[0].source.revision = 'unverified'; },
    value => { value.records[0].source.path = 'middle.html'; },
    value => { value.records[0].source.index = 4; },
    value => { value.records[0].value.html = '<div>Not an archive format</div>'; },
    value => { value.records[0].value = 'wrong kind'; },
    value => { value.records[4].value = value.records[0].value; },
    value => { value.records.push(value.records[0]); },
    value => { value.records[1].source.index = 0; },
    value => { delete value.records[0].value.risk; }
  ];
  for (const mutate of invalid) {
    const value = structuredClone(archive); mutate(value);
    assert.ok(validateLegacyVariants(value).length > 0);
  }
});
