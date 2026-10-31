import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import Ajv from 'ajv';
import { openingAdapter } from '../../lessons/opening/progress-adapter.js';
import { middleAdapter } from '../../lessons/middle/progress-adapter.js';
import { finalAdapter } from '../../lessons/final/progress-adapter.js';
import { openProgress, progressRecordErrors } from '../../assets/js/app/progress-store.js';
const adapters = { opening: openingAdapter, middle: middleAdapter, final: finalAdapter };
const json = path => JSON.parse(readFileSync(new URL(`../fixtures/${path}`, import.meta.url)));
const clone = value => JSON.parse(JSON.stringify(value));
const schema = JSON.parse(readFileSync(new URL('../../schemas/progress.schema.json', import.meta.url)));
const ajv = new Ajv({ strict: true });
const boundary = ajv.compile(schema);
const normalized = ajv.compile({ ...schema.$defs.normalized });
function memory(raw = null) {
  return { raw, reads: 0, writes: 0, getItem() { this.reads++; return this.raw; }, setItem(key, value) { this.writes++; this.raw = value; } };
}
const draftFields = { opening: 'consensus-draft', middle: 'integrated-draft', final: 'closing-draft' };
const legacyDraft = (id, raw) => id === 'opening' ? raw.data['draft-input'] : id === 'middle' ? raw.data.middleState.fields[8] : raw.data.finalState.fields['closing-text'];
for (const [id, adapter] of Object.entries(adapters)) {
  const map = json(`legacy-maps/${id}.json`);
  test(`${id}: fixed identities, every frozen fixture, safe semantic round trips and no bootstrap writes`, () => {
    assert.equal(adapter.key, map.storageKey);
    assert.deepEqual(adapter.sections, map.sections);
    for (const file of readdirSync(new URL(`../fixtures/progress/${id}/`, import.meta.url))) {
      const fixture = json(`progress/${id}/${file}`), storage = memory(fixture.raw);
      const store = openProgress({ storage, key: adapter.key, adapter });
      assert.equal(storage.reads, 1, file);
      assert.equal(storage.writes, 0, file);
      assert.equal(storage.raw, fixture.raw, file);
      assert.ok(normalized(store.state), `${file}: ${ajv.errorsText(normalized.errors)}`);
      let record;
      try { record = JSON.parse(fixture.raw); } catch { record = null; }
      if (record && Array.isArray(record.completed)) assert.deepEqual(store.state.completedSections, [...new Set(record.completed.filter(n => Number.isInteger(n) && n >= 0 && n < map.countedPages).map(n => map.sections[n]))], file);
      if (fixture.safety !== 'unsafe') {
        assert.equal(store.canPersist, true, `${file}: ${JSON.stringify(store.diagnostics)}`);
        const original = record || { completed: [], data: {} };
        const encoded = adapter.encode(store.state, original);
        assert.deepEqual(encoded, original, file);
        assert.deepEqual(adapter.decode(encoded), store.state, file);
        assert.equal(store.save(store.state).written, false, file);
      } else {
        assert.equal(store.canPersist, false, file);
        assert.ok(store.diagnostics.some(item => item.blocking), file);
        const next = store.state; next.fields[draftFields[id]] = 'Safe session-only draft —\n✓';
        assert.equal(store.save(next).persisted, false, file);
        assert.equal(store.state.fields[draftFields[id]], next.fields[draftFields[id]], file);
        assert.equal(storage.raw, fixture.raw, file);
      }
      assert.equal(storage.writes, 0, file);
    }
  });
  test(`${id}: unknown outer/data/nested values survive real edits; drafts, credit, snapshots, identical writes`, () => {
    const fixture = json(`progress/${id}/unknown-properties.json`), storage = memory(fixture.raw);
    const store = openProgress({ storage, key: adapter.key, adapter });
    const original = JSON.parse(fixture.raw), next = store.state;
    next.fields[draftFields[id]] = 'Synthetic — “quotes”, café & <not markup>.\nSecond line: ✓';
    next.completedSections = [map.sections[3], map.sections[0]];
    assert.equal(store.save(next).written, true);
    const result = JSON.parse(storage.raw);
    assert.deepEqual(result.futureOuter, original.futureOuter);
    assert.deepEqual(result.data.futureData, original.data.futureData);
    if (id !== 'opening') {
      assert.deepEqual(result.data[`${id}State`].futureNested, original.data[`${id}State`].futureNested);
      assert.deepEqual(result.data[`${id}State`].fields.futureField, original.data[`${id}State`].fields.futureField);
      assert.equal(result.data[`${id}State`].selections.futureSelection, 0);
    }
    assert.equal(legacyDraft(id, result), next.fields[draftFields[id]]);
    const snapshot = store.state; snapshot.fields[draftFields[id]] = 'must not mutate store';
    assert.notEqual(store.state.fields[draftFields[id]], snapshot.fields[draftFields[id]]);
    const revoked = store.state; revoked.completedSections = []; revoked.fields[draftFields[id]] = '';
    store.save(revoked);
    assert.deepEqual(store.state.completedSections, [map.sections[3], map.sections[0]]);
    assert.equal(store.state.fields[draftFields[id]], '');
    assert.equal(store.save(store.state).written, false);
    assert.equal(storage.writes, 2);
    assert.equal(storage.reads, 1);
    assert.deepEqual(adapter.decode(JSON.parse(storage.raw)), store.state);
    assert.deepEqual(JSON.parse(fixture.raw), original);
  });
  test(`${id}: absent detail does not invent answers; nested malformation salvages independent drafts and credit`, () => {
    const record = { completed: [0, 3], data: {} };
    const fromCredit = adapter.decode(record);
    assert.deepEqual(fromCredit.completedSections, [map.sections[0], map.sections[3]]);
    for (const activity of Object.values(fromCredit.activities)) {
      if (activity.earnedQuestionIds) assert.deepEqual(activity.earnedQuestionIds, []);
      if (activity.selections) assert.deepEqual(activity.selections, {});
    }
    const saved = JSON.parse(json(`progress/${id}/malformed-nested.json`).raw);
    if (id === 'opening') saved.data['draft-input'] = 'Independent draft\n☃';
    else {
      saved.data[`${id}State`].fields = id === 'middle' ? { 8: 'Independent draft\n☃' } : { 'closing-text': 'Independent draft\n☃' };
    }
    const storage = memory(JSON.stringify(saved)), store = openProgress({ storage, key: adapter.key, adapter });
    assert.equal(store.state.fields[draftFields[id]], 'Independent draft\n☃');
    assert.deepEqual(store.state.completedSections, [map.sections[0]]);
    assert.equal(store.canPersist, false);
    assert.equal(storage.writes, 0);
  });
  test(`${id}: corrupt/null/primitive outer boundaries, throwing reads and quota failures are nondestructive`, () => {
    for (const raw of ['{', 'null', '[]', 'true', '{"completed":[],"data":null}', '{"completed":[0,"1"],"data":{}}']) {
      const storage = memory(raw), store = openProgress({ storage, key: adapter.key, adapter });
      assert.equal(store.canPersist, false);
      const next = store.state; next.fields[draftFields[id]] = 'in memory';
      store.save(next); assert.equal(storage.raw, raw); assert.equal(storage.writes, 0);
      assert.equal(store.state.fields[draftFields[id]], 'in memory');
    }
    const denied = openProgress({ storage: { getItem() { throw Error('denied'); } }, key: adapter.key, adapter });
    assert.equal(denied.canPersist, false); assert.equal(denied.diagnostics[0].code, 'storage-unavailable');
    let quota = true;
    const storage = memory(); storage.setItem = function(key, value) { this.writes++; if (quota) throw Error('quota'); this.raw = value; };
    const store = openProgress({ storage, key: adapter.key, adapter }), next = store.state;
    next.completedSections.push(map.sections[0]); next.fields[draftFields[id]] = 'quota draft';
    const result = store.save(next);
    assert.equal(result.persisted, false); assert.equal(store.canPersist, true);
    assert.equal(result.diagnostics[0].code, 'save-failed');
    assert.deepEqual(store.state.completedSections, [map.sections[0]]);
    assert.equal(store.state.fields[draftFields[id]], 'quota draft');
    assert.equal(storage.raw, null);
    quota = false;
    assert.equal(store.save(store.state).written, true);
    assert.equal(store.diagnostics.length, 0);
    assert.equal(store.save(store.state).written, false);
    assert.equal(storage.writes, 2);
  });
}

test('progress schema and runtime select the outer boundary; unknown progress and extension versions remain valid', () => {
  for (const candidate of [null, [], {}, { completed: [], data: {} }, { completed: [-1], data: {} }, { completed: ['0'], data: {} }, { completed: [], data: [] }, { completed: [], data: { dslUi: { schemaVersion: 90, future: ['anything'] } }, unknown: true }]) {
    assert.equal(boundary(candidate), progressRecordErrors(candidate).length === 0);
  }
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw Error('getter denied'); } });
  try { assert.equal(openProgress({ key: openingAdapter.key, adapter: openingAdapter }).diagnostics[0].code, 'storage-unavailable'); }
  finally { if (previous) Object.defineProperty(globalThis, 'localStorage', previous); else delete globalThis.localStorage; }
  assert.throws(() => openProgress({ storage: memory(), key: 'wrong-key', adapter: openingAdapter }), /match/);
});

test('Opening all frozen mappings, option zero, exact earned fallback and additive checkpoint last choice', () => {
  const map = json('legacy-maps/opening.json'), original = { completed: [], data: {} };
  const state = openingAdapter.decode(original);
  for (const [key, id] of Object.entries(map.fields)) state.fields[id] = `\n${key} — ✓\n`;
  state.activities.classification.attemptedQuestionIds = map.activities.classification.questions;
  state.activities.classification.selections = Object.fromEntries(map.activities.classification.questions.map(id => [id, 'procedural']));
  state.activities.timeline.exploredIds = Object.values(map.activities.timeline.panels);
  state.activities['task-analysis'].exploredIds = Object.values(map.activities['task-analysis'].panels);
  state.activities['question-selfcheck'].checkedIds = ['connects-what-how'];
  state.activities['sequence-checkpoint'].selections['next-step'] = 'propose-solutions';
  state.activities['sequence-checkpoint'].earnedQuestionIds = ['next-step'];
  for (const id of ['what-how', 'clarification', 'research']) {
    const activity = map.activities[id];
    state.activities[id].selections[activity.question] = activity.options[0];
  }
  state.activities['knowledge-check'].selections = Object.fromEntries(map.activities['knowledge-check'].questions.map((question, index) => [question, map.activities['knowledge-check'].options[index][0]]));
  state.activities['knowledge-check'].earnedQuestionIds = map.activities['knowledge-check'].questions;
  const raw = openingAdapter.encode(state, original);
  assert.deepEqual(raw.data.classificationSeen, [0, 1, 2, 3, 4]);
  assert.deepEqual(raw.data.classificationAnswers, Array(5).fill('procedural'));
  assert.deepEqual(raw.data.timelineSeen, Object.keys(map.activities.timeline.panels));
  assert.deepEqual(raw.data.analysisSeen, Object.keys(map.activities['task-analysis'].panels));
  assert.deepEqual(raw.data.quizAnswers, Array(5).fill(0));
  assert.deepEqual(raw.data.quizEarned, [0, 1, 2, 3, 4]);
  assert.equal(raw.data['what-how-options'], 0);
  assert.equal(raw.data.sequenceCorrect, true);
  assert.equal(raw.data.questionSelfcheck, true);
  assert.deepEqual(raw.data.dslUi, { schemaVersion: 1, selections: { 'sequence-checkpoint': { 'next-step': 'propose-solutions' } } });
  for (const [key, id] of Object.entries(map.fields)) assert.equal(raw.data[key], state.fields[id]);
  assert.deepEqual(openingAdapter.decode(raw), state);
  const fallback = JSON.parse(json('progress/opening/quiz-earned-fallback.json').raw);
  const restored = openingAdapter.decode(fallback);
  assert.equal(restored.activities['knowledge-check'].earnedQuestionIds.length, 5);
  restored.activities['knowledge-check'].selections.substantive = 'clarify';
  const retained = openingAdapter.encode(restored, fallback);
  assert.equal(retained.data.quizAnswers[0], 0);
  assert.deepEqual(retained.data.quizEarned, [0, 1, 2, 3, 4]);
  assert.equal(openingAdapter.decode(retained).activities['knowledge-check'].earnedQuestionIds.length, 5);
  for (const quizEarned of [[], [99], [false], ['0']]) {
    const decoded = openingAdapter.decode({ completed: [6], data: { quizAnswers: [1, 0, 1, 2, 0], quizEarned } });
    assert.deepEqual(decoded.activities['knowledge-check'].earnedQuestionIds, []);
    assert.deepEqual(decoded.completedSections, ['knowledge-check']);
  }
});

test('Middle exhaustive GLOBAL cards, panels, a/b applications, fields/checks, every sequence option/cursor and transient preservation', () => {
  const map = json('legacy-maps/middle.json'), original = { completed: [], data: { middleState: { selections: { 'classify-options': 0, 'quiz-options': 0, future: 23 }, sets: { future: ['keep'] } } } };
  const state = middleAdapter.decode(original);
  const cardActivities = { welcome: 'welcome-cards', s1: 'structure-cards', models: 'research-model-cards', speaking: 'speaking-cards' };
  for (const [key, ids] of Object.entries(map.sets.flipped)) state.activities[cardActivities[key]].exploredIds = Object.values(ids);
  const panelActivities = { evidenceOpened: 'evidence-panels', communicationOpened: 'communication-panels', strategyOpened: 'strategy-panels', openedDetails: 'collaboration-panels' };
  for (const [key, activity] of Object.entries(panelActivities)) state.activities[activity].exploredIds = map.sets[key];
  for (const [key, activity] of Object.entries(map.positions)) {
    state.activities[activity].earnedQuestionIds = map.sets.solved[key];
    state.activities[activity].currentQuestionId = map.sets.solved[key].at(-1);
    const choices = map.selections[`${key}-options-N`].options;
    for (let index = 0; index < map.sets.solved[key].length; index++) {
      const question = map.sets.solved[key][index], options = key === 'classify' ? choices : choices[index];
      for (let choice = 0; choice < options.length; choice++) {
        const next = clone(state); next.activities[activity].selections[question] = options[choice];
        assert.equal(middleAdapter.encode(next, original).data.middleState.selections[`${key}-options-${index}`], choice);
      }
    }
  }
  state.activities.application.earnedQuestionIds = Object.values(map.sets.solved.application);
  state.activities['knowledge-check'].earnedQuestionIds = map.sets.correctQuiz;
  state.activities['knowledge-check'].currentQuestionId = map.sets.correctQuiz.at(-1);
  for (const [key, id] of Object.entries(map.fieldIds)) state.fields[id] = `${key} —\n✓`;
  for (const [key, ids] of Object.entries(map.checks)) state.activities[`${key}-checklist`].checkedIds = ids;
  state.flags['research-correct-ever'] = true; state.flags['evidence-assembled'] = true;
  const encoded = middleAdapter.encode(state, original).data.middleState;
  for (const [group, ids] of Object.entries(map.sets.flipped)) assert.deepEqual(encoded.sets.flipped[group], Object.keys(ids).map(Number));
  for (const key of Object.keys(panelActivities)) assert.deepEqual(encoded.sets[key], map.sets[key].map((_, i) => i));
  assert.deepEqual(encoded.sets.solved.application, ['a', 'b']);
  assert.deepEqual(encoded.sets.correctQuiz, [0, 1, 2, 3, 4]);
  assert.equal(encoded.quizIndex, 4);
  for (const [key, ids] of Object.entries(map.sets.solved).filter(([key]) => key !== 'application')) assert.deepEqual(encoded.sets.solved[key], ids.map((_, i) => i));
  for (const [key, id] of Object.entries(map.fieldIds)) assert.equal(encoded.fields[map.fields.indexOf(key)], state.fields[id]);
  for (const index of [4, 5, 6, 7, 9, 10, 11, 12, 13]) assert.equal(encoded.fields[index], true);
  assert.deepEqual(encoded.sets.future, ['keep']);
  assert.equal(encoded.selections['classify-options'], 0); assert.equal(encoded.selections['quiz-options'], 0);
  assert.equal(encoded.selections.future, 23);
  const before = { completed: [], data: { middleState: encoded } };
  assert.deepEqual(middleAdapter.decode(before), state);
  const unchecked = clone(state); unchecked.activities['research-checklist'].checkedIds = [];
  assert.equal(middleAdapter.encode(unchecked, before).data.middleState.fields[4], false);
});

test('Final exhaustive page-local credit versus GLOBAL open indexes, options, fields, checks, notes and goals', () => {
  const map = json('legacy-maps/final.json'), original = { completed: [], data: {} }, state = finalAdapter.decode(original);
  for (const [page, ids] of Object.entries(map.flips)) state.activities[`${map.sections[page]}-cards`].exploredIds = ids;
  for (const [page, ids] of Object.entries(map.panels)) {
    const activity = `${map.sections[page]}-panels`;
    state.activities[activity].exploredIds = ids;
    state.activities[activity].openIds = ids.filter((_, i) => i === 0);
  }
  for (const [page, ids] of Object.entries(map.questions)) {
    const activity = page === '8' ? 'knowledge-check' : `${map.sections[page]}-questions`;
    state.activities[activity].earnedQuestionIds = ids;
    state.activities[activity].currentQuestionId = ids.at(-1);
    for (const [index, id] of ids.entries()) for (const [choice, option] of map.options[page][index].entries()) {
      const next = clone(state); next.activities[activity].selections[id] = option;
      assert.equal(finalAdapter.encode(next, original).data.finalState.selections[`${page}:${index}`], choice);
    }
  }
  for (const [page, ids] of Object.entries(map.checks)) state.activities[page === '2' ? 'synthesis-checklist' : 'closing-checklist'].checkedIds = ids;
  state.activities['note-classification'].earnedNoteIds = map.notes;
  state.activities['practice-goals'].checkedIds = map.goals;
  for (const [key, id] of Object.entries(map.fields)) state.fields[id] = `${key} —\n✓`;
  for (const id of Object.values(map.flags)) state.flags[id] = true;
  const raw = finalAdapter.encode(state, original), encoded = raw.data.finalState;
  for (const [page, ids] of Object.entries(map.flips)) assert.deepEqual(encoded.flips[page], ids.map((_, i) => i));
  for (const [page, ids] of Object.entries(map.panels)) assert.deepEqual(encoded.panels[page], ids.map((_, i) => i));
  assert.deepEqual(Object.keys(encoded.panelsOpen).map(Number), [0, 4, 6, 9]);
  for (const [page, ids] of Object.entries(map.questions)) {
    assert.deepEqual(encoded.answers[page], ids.map((_, i) => i));
    if (ids.length > 1) assert.equal(encoded.quizIndex[page], ids.length - 1);
  }
  assert.deepEqual(encoded.checks[2], [0, 1, 2, 3, 4]); assert.deepEqual(encoded.checks[7], [0, 1, 2, 3, 4, 5]);
  assert.deepEqual(encoded.notes, Object.fromEntries(map.notes.map((_, index) => [index, true])));
  assert.deepEqual(encoded.goals, [0, 1, 2]);
  for (const [key, id] of Object.entries(map.fields)) assert.equal(encoded.fields[key], state.fields[id]);
  assert.deepEqual(finalAdapter.decode(raw), state);
  const unchecked = clone(state); unchecked.activities['practice-goals'].checkedIds = []; unchecked.activities['closing-checklist'].checkedIds = []; unchecked.activities['task-audit-panels'].openIds = [];
  const after = finalAdapter.encode(unchecked, raw).data.finalState;
  assert.deepEqual(after.goals, []); assert.deepEqual(after.checks[7], []);
  assert.equal(after.panelsOpen[6], false); assert.deepEqual(after.panels[5], [0, 1, 2]);
});

test('dslUi v1 merges only documented new UI facts; opaque extensions stay untouched and unsavable UI stays in memory', () => {
  for (const [id, adapter] of Object.entries(adapters)) {
    for (const version of [1, 2, 'future']) {
      const raw = { completed: [], data: { dslUi: { schemaVersion: version, future: { keep: [0, '✓'] }, models: { future: true }, selections: { future: { q: 'option' } } } } };
      const storage = memory(JSON.stringify(raw)), store = openProgress({ storage, key: adapter.key, adapter });
      const next = store.state; next.fields[draftFields[id]] = 'ordinary supported legacy write';
      assert.equal(store.save(next).persisted, true);
      assert.deepEqual(JSON.parse(storage.raw).data.dslUi, raw.data.dslUi);
      if (id === 'final') continue;
      const changed = store.state;
      if (id === 'middle') changed.flags['research-model-visible'] = true;
      else changed.activities['sequence-checkpoint'].selections['next-step'] = 'clarify-task';
      const result = store.save(changed);
      assert.equal(result.persisted, version === 1);
      if (version !== 1) {
        assert.ok(store.diagnostics.some(item => item.code === 'unsupported-ui-version'));
        assert.deepEqual(JSON.parse(storage.raw).data.dslUi, raw.data.dslUi);
        assert.deepEqual(store.state, changed);
        const draftChange = store.state; draftChange.fields[draftFields[id]] = 'draft after unsupported UI change';
        assert.equal(store.save(draftChange).written, true);
        assert.equal(legacyDraft(id, JSON.parse(storage.raw)), 'draft after unsupported UI change');
        assert.deepEqual(JSON.parse(storage.raw).data.dslUi, raw.data.dslUi);
      } else {
        const ui = JSON.parse(storage.raw).data.dslUi;
        assert.deepEqual(ui.future, raw.data.dslUi.future);
        assert.equal(ui.models.future, true); assert.deepEqual(ui.selections.future, { q: 'option' });
        if (id === 'middle') assert.equal(ui.models['research-model'], true);
        else assert.equal(ui.selections['sequence-checkpoint']['next-step'], 'clarify-task');
      }
    }
  }
});

test('all remaining Opening/Middle question option mappings are frozen, including numeric zero and null reset', () => {
  const opening = json('legacy-maps/opening.json');
  for (const [activity, map] of Object.entries(opening.activities)) {
    if (['classification', 'timeline', 'task-analysis', 'sequence-checkpoint'].includes(activity)) continue;
    const ids = map.questions || [map.question];
    for (const [index, id] of ids.entries()) {
      const options = map.questions ? map.options[index] : map.options;
      for (const [number, option] of options.entries()) {
        const state = openingAdapter.decode({ completed: [], data: {} });
        state.activities[activity].selections[id] = option;
        const raw = openingAdapter.encode(state, { completed: [], data: {} });
        assert.equal(map.questions ? raw.data[map.selectionKey][index] : raw.data[map.selectionKey], number);
        assert.equal(openingAdapter.decode(raw).activities[activity].selections[id], option);
        delete state.activities[activity].selections[id];
        const reset = openingAdapter.encode(state, raw);
        assert.equal(map.questions ? reset.data[map.selectionKey][index] : reset.data[map.selectionKey], null);
        assert.equal(openingAdapter.decode(reset).activities[activity].selections[id], undefined);
      }
    }
  }
  const middle = json('legacy-maps/middle.json');
  const entries = [
    ...middle.sets.correctQuiz.map((id, index) => ['knowledge-check', id, `quiz-${index}`, middle.selections['quiz-N'].options[index]]),
    ...['a', 'b'].map(key => ['application', middle.selections[`application-${key}-options`].question, `application-${key}-options`, middle.selections[`application-${key}-options`].options]),
    ['research', middle.selections['research-options'].question, 'research-options', middle.selections['research-options'].options]
  ];
  for (const [activity, id, key, options] of entries) for (const [number, option] of options.entries()) {
    const state = middleAdapter.decode({ completed: [], data: {} });
    state.activities[activity].selections[id] = option;
    const encoded = middleAdapter.encode(state, { completed: [], data: {} });
    assert.equal(encoded.data.middleState.selections[key], number);
    assert.equal(middleAdapter.decode(encoded).activities[activity].selections[id], option);
  }
});

test('malformed containers/values cannot masquerade as credit; valid unknown data is not blanket-rejected', () => {
  for (const [id, adapter] of Object.entries(adapters)) {
    const records = id === 'opening' ? [
      { classificationAnswers: {}, sequenceCorrect: 'true', questionSelfcheck: 1 },
      { classificationAnswers: ['procedural'] }, { quizAnswers: [1, 0, 1, 2, 0, 99] },
      { quizAnswers: ['1', 0, null, null, null], quizEarned: [true, '1', -1, 5] }
    ] : [
      { [`${id}State`]: [] }, { [`${id}State`]: { fields: [] } },
      { [`${id}State`]: id === 'middle' ? { sets: { flipped: { welcome: [true, '0', 99] } } } : { flips: { 0: [true, '0', 99] }, notes: { 0: 'true' } } }
    ];
    for (const data of records) {
      const raw = { completed: [], data }, storage = memory(JSON.stringify(raw));
      const store = openProgress({ storage, key: adapter.key, adapter });
      assert.equal(store.canPersist, false, JSON.stringify(data));
      assert.deepEqual(store.state.completedSections, []);
      for (const activity of Object.values(store.state.activities)) {
        if (activity.exploredIds) assert.deepEqual(activity.exploredIds, []);
        if (activity.earnedQuestionIds && !('quizAnswers' in data)) assert.deepEqual(activity.earnedQuestionIds, []);
        if (activity.earnedNoteIds) assert.deepEqual(activity.earnedNoteIds, []);
      }
      assert.equal(storage.raw, JSON.stringify(raw));
    }
    const raw = JSON.parse('{"completed":[],"__proto__":{"polluted":true},"data":{"future":{"constructor":{"prototype":{"keep":true}}}}}');
    const next = adapter.decode(raw); next.fields[draftFields[id]] = 'safe';
    const encoded = adapter.encode(next, raw);
    assert.equal(Object.hasOwn(encoded, '__proto__'), true);
    assert.deepEqual(encoded.__proto__, raw.__proto__);
    assert.equal({}.polluted, undefined);
  }
});
