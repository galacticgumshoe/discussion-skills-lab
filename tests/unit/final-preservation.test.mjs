// MIT; preservation oracle is pinned source/frozen maps, not migrated content.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync, readdirSync } from 'node:fs';
import { original } from '../helpers/baseline-source.mjs';
import { finalAdapter } from '../../lessons/final/progress-adapter.js';
import { finalCompletionPolicy, finalReveals } from '../../lessons/final/completion.js';
import { middleCompletionPolicy } from '../../lessons/middle/completion.js';
import { middleAdapter } from '../../lessons/middle/progress-adapter.js';
import { applyCompletion } from '../../assets/js/app/completion.js';
import { validateActivityDocument, validateManifest, validateLessonTree, validateLegacyVariants } from '../../scripts/validate-content.mjs';
import { validateActivity } from '../../assets/js/app/lesson-validation.js';
import { invalidNoteCases } from '../fixtures/security/note-cases.mjs';
const json = path => JSON.parse(readFileSync(new URL(`../../${path}`, import.meta.url)));
const map = json('tests/fixtures/legacy-maps/final.json'), banks = json('tests/fixtures/content/banks.json').final;
const activity = id => json(`content/final/activities/${id}.json`);
const source = original('assets/js/final.js').toString();
const sections = map.sections.map(id => ({ id, reference: id === 'quick-reference' }));
const gates = state => Object.entries(finalCompletionPolicy).filter(([, gate]) => gate(state)).map(([id]) => id);
const ready = () => finalAdapter.decode({ completed: [], data: { finalState: {
  ...Object.fromEntries(['flips', 'panels', 'answers', 'checks'].map(key => [key, Object.fromEntries(Object.entries(map[key === 'answers' ? 'questions' : key]).map(([page, ids]) => [page, ids.map((_, i) => i)]))])),
  notes: Object.fromEntries(map.notes.map((_, i) => [i, true])), assembled: true, builderModel: true, closingModel: true,
  fields: { 'build-1': ' Synthetic contributors ', 'build-2': ' Relationship. ', 'build-3': ' Recommendation! ', 'closing-text': ' One ungraded sentence. ' }
} } });
function originalPolicy(state, reveals = false) {
  const raw = finalAdapter.encode(state, { completed: [], data: {} }).data.finalState || {}, shown = {};
  const context = { raw, shown, DSL: { createLesson: () => ({ complete() {}, update() {}, completed: new Set() }) }, document: { getElementById: id => ({
    value: raw.fields?.[id] || '', classList: { toggle(name, hidden) { shown[id] = !hidden; } }, set textContent(_) {}
  }) } };
  const refresh = source.slice(source.indexOf('        function refresh(){'), source.indexOf('        function restore(){'));
  return JSON.parse(vm.runInNewContext(`${source.slice(0, source.indexOf('        let restoring=false;'))}
    for (const key of ['flips','panels','answers','checks']) for (const [page, ids] of Object.entries(raw[key] || {})) state[key][page] = new Set(ids);
    state.notes=raw.notes||{}; state.assembled=raw.assembled; state.builderModel=raw.builderModel; state.closingModel=raw.closingModel;
    let restoring=false; function persist(){}; ${refresh}
    ${reveals ? 'refresh(); return JSON.stringify(shown);' : `return JSON.stringify(Array.from({length:9},(_,i)=>i).filter(complete).map(i=>${JSON.stringify(map.sections)}[i]));`}
  })();`, context, { timeout: 1000 }));
}
test('Final gates exactly match pinned engine for every individually missing requirement; pure and ID-keyed', () => {
  const state = ready(); assert.deepEqual(gates(state), map.sections.slice(0, -1)); assert.deepEqual(gates(state), originalPolicy(state));
  const mutations = [];
  for (const [id, own] of Object.entries(state.activities)) for (const key of ['exploredIds', 'earnedQuestionIds', 'checkedIds', 'earnedNoteIds']) for (const member of own[key] || []) mutations.push(s => { s.activities[id][key] = own[key].filter(value => value !== member); });
  for (const id of ['synthesis-contributors', 'synthesis-relationship', 'synthesis-recommendation', 'closing-draft']) mutations.push(s => { s.fields[id] = ' \n\t '; });
  for (const id of Object.values(map.flags)) mutations.push(s => { s.flags[id] = false; });
  assert.equal(mutations.length, 70);
  for (const mutate of mutations) {
    const next = structuredClone(state); mutate(next); const before = structuredClone(next);
    assert.equal(gates(next).length, 8); assert.deepEqual(gates(next), originalPolicy(next)); assert.deepEqual(next, before);
  }
  const wrong = ready(); wrong.activities['welcome-cards'].exploredIds = ['connect-ideas', 'connect-ideas', 'foreign'];
  assert.equal(finalCompletionPolicy.welcome(wrong), false);
});
test('Final current inputs differ from Middle assembly-only gate; models required exactly in Final writing sections; completion is permanent', () => {
  const state = ready(); state.fields['synthesis-contributors'] = ''; assert.equal(finalCompletionPolicy['connect-viewpoints'](state), false);
  const middle = middleAdapter.decode(null);
  middle.activities['evidence-panels'].exploredIds = ['relevance', 'evidence', 'explanation', 'connection']; middle.activities['research-model-cards'].exploredIds = ['weak-example', 'stronger-example'];
  middle.activities['research-checklist'].checkedIds = ['source-date', 'accurate-finding', 'task-connection', 'avoid-overstatement']; middle.flags['research-correct-ever'] = middle.flags['evidence-assembled'] = true;
  assert.equal(middleCompletionPolicy.evidence(middle), true);
  for (const flag of ['synthesis-model-viewed', 'closing-model-viewed']) { const next = ready(); next.flags[flag] = false; assert.equal(gates(next).length, 8); }
  const completed = { ...ready(), completedSections: map.sections.slice(0, -1) }, empty = finalAdapter.decode(null);
  assert.deepEqual(applyCompletion(completed, empty, { sections, completionPolicy: finalCompletionPolicy }).completedSections, completed.completedSections);
  const hydrated = ready(); assert.deepEqual(applyCompletion(hydrated, hydrated, { sections, completionPolicy: finalCompletionPolicy }).completedSections, []);
});
test('Final independent reveals and every valid legacy fixture match actual pinned refresh conditions', () => {
  const states = [ready(), finalAdapter.decode(null)];
  for (const file of readdirSync(new URL('../fixtures/progress/final/', import.meta.url))) {
    const fixture = json(`tests/fixtures/progress/final/${file}`); if (fixture.safety !== 'unsafe') states.push(finalAdapter.decode(fixture.raw === null ? null : JSON.parse(fixture.raw)));
  }
  for (const state of states) {
    assert.deepEqual(gates(state), originalPolicy(state));
    const reveals = finalReveals(state); delete reveals['synthesis-checks']; delete reveals['closing-checks'];
    assert.deepEqual(reveals, originalPolicy(state, true));
  }
  const state = ready(); state.activities['connect-viewpoints-panels'].exploredIds = [];
  assert.equal(finalReveals(state)['builder-area'], true, 'independent reveal evidence, not upstream visibility');
});
test('All 25 Final questions exactly preserve prompt/context/order/options/answers/every alternative feedback', () => {
  let count = 0;
  for (const [page, questions] of Object.entries(banks.questions)) {
    const id = page === '8' ? 'knowledge-check' : `${map.sections[page]}-questions`, data = activity(id);
    assert.deepEqual(validateActivityDocument(data), []); assert.equal(validateActivity(data), true);
    assert.equal(data.profile, 'final-questions'); assert.equal(data.data.questions.length, questions.length);
    questions.forEach((original, index) => {
      const q = data.data.questions[index]; count++;
      assert.equal(q.id, map.questions[page][index]); assert.equal(q.prompt, original.q); assert.equal(q.context, original.context);
      assert.deepEqual(q.options.map(option => option.text), original.a); assert.deepEqual(q.options.map(option => option.id), map.options[page][index]);
      assert.equal(q.correctOptionId, map.options[page][index][original.correct]);
      q.options.forEach((option, n) => assert.equal(option.feedback, `${n === original.correct ? 'Correct.' : 'Not quite.'} ${original.why[n]}`));
    });
  }
  assert.equal(count, 25);
});
test('Final note categories use validated stable references; exact six texts/feedback and category order remain frozen', () => {
  const data = activity('note-classification'); assert.deepEqual(validateActivityDocument(data), []);
  assert.deepEqual(data.data.categories.map(category => category.label), ['A · Problem / barriers', 'B · Proposed approach', 'C · Group agreement', 'D · Unresolved issue']);
  data.data.notes.forEach((note, index) => { const [text, category, feedback] = banks.notes[index]; assert.equal(note.id, map.notes[index]); assert.equal(note.text, text); assert.equal(note.feedback, feedback); assert.equal(note.correctCategoryId, data.data.categories[category].id); });
  const reordered = structuredClone(data); reordered.data.categories.reverse(); assert.deepEqual(validateActivityDocument(reordered), []); assert.deepEqual(reordered.data.notes, data.data.notes);
  for (const { label, data: invalid } of invalidNoteCases(data)) {
    assert.ok(validateActivityDocument(invalid).length, label); assert.throws(() => validateActivity(invalid), label);
  }
});
test('Shared Final presentation additions remain closed, validated APIs rather than arbitrary markup/actions', () => {
  for (const [id, mutate] of [
    ['synthesis-writing', d => { d.data.outputReveal = 'arbitrary-expression'; }],
    ['synthesis-writing', d => { d.data.actionOrder = ['edit', 'copy']; }],
    ['synthesis-writing', d => { delete d.data.edit; }],
    ['closing-writing', d => { d.data.edit.html = '<button>'; }],
    ['practice-goals', d => { d.data.caption.empty = ''; }],
    ['knowledge-check', d => { d.data.counterScoreLabel = null; }]
  ]) {
    const invalid = activity(id); mutate(invalid); assert.ok(validateActivityDocument(invalid).length); assert.throws(() => validateActivity(invalid));
  }
  const manifest = json('content/final/lesson.json');
  const walk = blocks => blocks.flatMap(block => block.type === 'group' ? [block, ...walk(block.blocks)] : [block]);
  const navigation = walk(manifest.sections[8].blocks).find(block => block.type === 'navigation'); navigation.actions[0].sectionId = 'javascript:alert(1)';
  assert.ok(validateManifest(manifest).length);
});
test('Final graph, exact checks/goals/template and shared bounded presentation metadata validate', async () => {
  const manifest = json('content/final/lesson.json'); assert.deepEqual(manifest.sections.map(s => s.id), map.sections); assert.equal(manifest.activities.length, 21);
  assert.deepEqual(validateManifest(manifest), []); assert.deepEqual(await validateLessonTree(new URL('../../', import.meta.url).pathname), []);
  for (const [page, id] of [[2, 'synthesis-checklist'], [7, 'closing-checklist']]) { const d = activity(id); assert.deepEqual(d.data.items.map(i => i.id), map.checks[page]); assert.deepEqual(d.data.items.map(i => i.text), banks.checkLabels[page]); }
  const goals = JSON.parse(vm.runInNewContext(`JSON.stringify(${source.match(/const goalTexts=(\[[^;]+\]);/)[1]})`));
  assert.deepEqual(activity('practice-goals').data.items.map(i => i.text), goals);
  assert.deepEqual(activity('practice-goals').data.items.map(i => i.id), map.goals);
  const writing = activity('synthesis-writing'); assert.equal(writing.data.output.readonly, false); assert.equal(writing.data.outputReveal, 'assembled');
  assert.equal(writing.data.assembly.template, 'Building on {contributors}, {relationship}. Therefore, {recommendation}');
  assert.equal(activity('closing-writing').data.fields[0].maxLength, undefined);
  assert.deepEqual(activity('closing-writing').binding, { modelFlag: 'closing-model-viewed' });
  const archive = json('content/final/legacy-variants.json'); assert.deepEqual(validateLegacyVariants(archive), []);
  assert.equal(archive.records[0].value, JSON.parse(vm.runInNewContext(`JSON.stringify(${source.match(/return ("FINAL STAGE QUICK REFERENCE.*?")\+Array/)[1]})`)));
});
