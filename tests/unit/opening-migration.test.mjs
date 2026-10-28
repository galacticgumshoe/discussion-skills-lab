// MIT. Opening-only exact policy/content/compatibility assertions, no visual oracle.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { openingAdapter } from '../../lessons/opening/progress-adapter.js';
import { openingCompletionPolicy as gates } from '../../lessons/opening/completion.js';
import { applyCompletion } from '../../assets/js/app/completion.js';
import { validateActivity, validateLessonConfig, validateLessonManifest } from '../../assets/js/app/lesson-validation.js';
import { validateActivityDocument, validateConfig, validateManifest, validateContent } from '../../scripts/validate-content.mjs';
import { validateReferenceDocument } from '../../assets/js/app/content-validation.js';
import { formatWriting } from '../../assets/js/utilities/writing-formatters.js';
import { original } from '../helpers/baseline-source.mjs';
import { openingCutover } from '../helpers/opening-cutover.mjs';

const read = p => readFileSync(new URL(`../../${p}`, import.meta.url), 'utf8');
const json = p => JSON.parse(read(p));
const activity = id => json(`content/opening/activities/${id}.json`);
const banks = json('tests/fixtures/content/banks.json').opening, map = json('tests/fixtures/legacy-maps/opening.json');
const manifest = json('content/opening/lesson.json'), sections = manifest.sections;
const empty = () => openingAdapter.decode(null);
function ready() {
  return openingAdapter.decode({ completed: [], data: {
    classificationSeen: [0, 1, 2, 3, 4], classificationAnswers: banks.classification.map(q => q.answer),
    timelineSeen: Object.keys(map.activities.timeline.panels), sequenceCorrect: true,
    analysisSeen: Object.keys(map.activities['task-analysis'].panels), 'what-how-options': 0,
    'clarification-options': 1, 'research-options': 2, 'draft-input': 'x'.repeat(35), questionSelfcheck: true,
    quizAnswers: banks.quiz.map(q => q.correct), quizEarned: [0, 1, 2, 3, 4]
  } });
}
test('Opening seven exact initial gates require every independently missing prerequisite', () => {
  const good = ready(); assert.deepEqual(Object.keys(gates), map.sections.slice(0, 7));
  for (const [id, gate] of Object.entries(gates)) { assert.equal(gate(good), true, id); assert.equal(gate(empty()), false, id); }
  const missing = [];
  for (const id of ['classification', 'timeline', 'task-analysis', 'sequence-checkpoint', 'question-selfcheck', 'knowledge-check']) {
    const key = { classification: 'attemptedQuestionIds', timeline: 'exploredIds', 'task-analysis': 'exploredIds', 'sequence-checkpoint': 'earnedQuestionIds', 'question-selfcheck': 'checkedIds', 'knowledge-check': 'earnedQuestionIds' }[id];
    const section = { classification: 'contributions', timeline: 'opening-sequence', 'sequence-checkpoint': 'opening-sequence', 'question-selfcheck': 'give-direction' }[id] || id;
    for (const member of good.activities[id][key]) missing.push([section, s => { s.activities[id][key] = s.activities[id][key].filter(n => n !== member); }]);
  }
  for (const [id, q, section] of [['what-how', 'identify-what', 'task-analysis'], ['clarification', 'before-accepting-agenda', 'clarifications'], ['research', 'after-research-period', 'research-transition']]) missing.push([section, s => { s.activities[id].selections[q] = 'wrong'; }]);
  for (const q of map.activities.classification.questions) missing.push(['contributions', s => { s.activities.classification.selections[q] = 'wrong'; }]);
  for (const [section, mutate] of missing) { const state = ready(); mutate(state); const before = structuredClone(state); assert.equal(gates[section](state), false, section); assert.deepEqual(state, before); }
  for (const checked of [false, true]) for (const length of [0, 34, 35]) {
    const state = ready(); state.fields['consensus-draft'] = ` \n${'x'.repeat(length)}\t `; state.activities['question-selfcheck'].checkedIds = checked ? ['connects-what-how'] : [];
    assert.equal(gates['give-direction'](state), checked && length >= 35);
  }
  const repeated = ready(); repeated.activities.timeline.exploredIds = Array(6).fill('receive'); assert.equal(gates['opening-sequence'](repeated), false);
});
test('Opening classification/task analysis action order uses CURRENT answers before initial completion; completion is permanent', () => {
  let previous = empty(), next = ready(); next.activities['task-analysis'].exploredIds.pop(); next.activities['what-how'].earnedQuestionIds = ['identify-what'];
  let state = applyCompletion(previous, next, { sections, completionPolicy: gates }); assert.ok(!state.completedSections.includes('task-analysis'));
  previous = structuredClone(state); next = structuredClone(state); next.activities['what-how'].selections['identify-what'] = 'counselor-plan';
  state = applyCompletion(previous, next, { sections, completionPolicy: gates });
  previous = structuredClone(state); next = structuredClone(state); next.activities['task-analysis'].exploredIds.push('search-terms');
  state = applyCompletion(previous, next, { sections, completionPolicy: gates }); assert.ok(!state.completedSections.includes('task-analysis'));
  previous = structuredClone(state); next = structuredClone(state); next.activities['what-how'].selections['identify-what'] = 'stigma-effects';
  state = applyCompletion(previous, next, { sections, completionPolicy: gates }); assert.ok(state.completedSections.includes('task-analysis'));
  const current = ready(); current.activities.classification.selections['clarify-accomplishment'] = 'substantive'; current.activities.classification.earnedQuestionIds = map.activities.classification.questions;
  assert.equal(gates.contributions(current), false);
  const completed = ready(); completed.completedSections = map.sections.slice(0, 7);
  assert.deepEqual(applyCompletion(completed, empty(), { sections, completionPolicy: gates }).completedSections, completed.completedSections);
  assert.deepEqual(applyCompletion(ready(), ready(), { sections, completionPolicy: gates }).completedSections, [], 'hydration alone earns nothing');
});
test('Opening all classification/quiz/practice/sequence options, answers and feedback match immutable source', () => {
  activity('classification').data.questions.forEach((q, i) => {
    const old = banks.classification[i]; assert.equal(q.id, map.activities.classification.questions[i]); assert.equal(q.prompt, old.text); assert.equal(q.correctOptionId, old.answer);
    assert.deepEqual(q.options.map(o => o.text), ['Procedural', 'Substantive']);
    q.options.forEach(o => assert.equal(o.feedback, `${o.id === old.answer ? 'Correct.' : `Not quite. This is ${old.answer}.`} ${old.why}`));
  });
  for (const [key, id] of [['whatHow', 'what-how'], ['clarification', 'clarification'], ['research', 'research']]) {
    const q = activity(id).data, old = banks.practice[key]; assert.deepEqual(q.options.map(o => o.text), old.options); assert.equal(q.correctOptionId, map.activities[id].options[old.correct]);
    q.options.forEach((o, n) => assert.equal(o.feedback, `${n === old.correct ? 'Correct.' : 'Not quite.'} ${old.explanation}`));
  }
  activity('knowledge-check').data.questions.forEach((q, i) => {
    const old = banks.quiz[i]; assert.equal(q.prompt, old.prompt); assert.equal(q.correctOptionId, map.activities['knowledge-check'].options[i][old.correct]); assert.deepEqual(q.options.map(o => o.text), old.options);
    q.options.forEach((o, n) => assert.equal(o.feedback, `${n === old.correct ? 'Correct.' : 'Not quite.'} ${old.explanation}`));
  });
  const checkpoint = activity('sequence-checkpoint').data, source = original('opening.html').toString();
  const checkpointButtons = source.match(/<div class="sequence-choices">([\s\S]+?)<\/div>/)[1];
  assert.deepEqual(checkpoint.options.map(o => o.text), [...checkpointButtons.matchAll(/>([^<>]+)<\/button>/g)].map(m => m[1]));
  checkpoint.options.forEach(o => { assert.ok(source.includes(o.text)); assert.ok(source.includes(o.feedback)); });
  assert.equal(checkpoint.correctOptionId, 'clarify-task');
  assert.deepEqual(activity('timeline').data.items.map(i => i.id), Object.values(map.activities.timeline.panels));
  assert.deepEqual(activity('timeline').data.items.map(i => i.title), [...source.matchAll(/class="timeline-toggle"[^>]*>([^<]+) <span/g)].map(m => m[1]));
  for (const item of activity('timeline').data.items) { assert.ok(source.includes(item.title)); assert.ok(source.includes(item.body)); }
  for (const [id, field] of [['what-how', 'what-how-options'], ['clarification', 'clarification-options'], ['research', 'research-options']]) {
    const expected = source.match(new RegExp(`<p[^>]*>([^<]+)</p>\\s*<div id="${field}"`))[1];
    assert.equal(activity(id).data.prompt, expected);
  }
  const summary = activity('knowledge-check').data.summary;
  assert.ok(source.includes(summary.completeMessage)); assert.ok(source.includes(summary.scorePrefix));
  for (const value of Object.values(activity('consensus-writing').data.copyMessages)) assert.ok(source.includes(value));
});
test('Opening annotated segments, five categories and TERMS highlighting match the exact frozen task', () => {
  const data = activity('task-analysis').data, source = original('opening.html').toString();
  const raw = source.match(/<blockquote[^>]*>\s*(Mental health issues[\s\S]+?)<\/blockquote>/)[1];
  const expected = raw.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  assert.equal(data.segments.map(s => s.text).join(''), expected);
  const spans = [...raw.matchAll(/<span class="task-mark" data-kind="([^"]+)">([^<]+)<\/span>/g)].map(([, categoryId, text]) => ({ categoryId, text }));
  assert.deepEqual(data.segments.filter(s => s.categoryId), spans); assert.equal(spans.length, 6);
  assert.deepEqual(data.categories.map(c => c.id), ['who', 'what', 'how', 'where', 'terms']);
  assert.deepEqual(data.categories.map(c => c.label), [...source.matchAll(/class="pill analysis-tab"[^>]*>([^<]+)<\/button>/g)].map(m => m[1]));
  data.categories.forEach(c => assert.equal(c.explanation, banks.analysisAnswers[c.id]));
  assert.deepEqual(data.categories.at(-1).highlights, ['who', 'what']);
});
test('Opening content/schema boundaries reject malformed tasks and arbitrary metadata; only Opening graph validated', async () => {
  assert.deepEqual(await validateContent('content/opening'), []);
  assert.deepEqual(validateConfig(json('lessons/opening/config.json')), []); validateLessonConfig(json('lessons/opening/config.json'));
  assert.deepEqual(validateManifest(manifest), []); validateLessonManifest(manifest);
  const originalHeading = manifest.sections[0].blocks.at(-1).blocks[0];
  assert.equal(originalHeading.headingId, 'classify-title');
  const invalidHeading = structuredClone(manifest); invalidHeading.sections[0].blocks.at(-1).blocks[0].headingId = '#arbitrary selector';
  assert.ok(validateManifest(invalidHeading).length);
  for (const { id } of manifest.activities) { const d = activity(id); assert.deepEqual(validateActivityDocument(d), [], id); assert.equal(validateActivity(d), true); }
  const ref = json('content/opening/reference/reference.json'); assert.equal(validateReferenceDocument(ref), true); assert.equal(ref.items.length, 4);
  for (const mutate of [d => { d.data.segments[0].html = '<script>'; }, d => { d.data.segments[1].categoryId = 'terms'; }, d => { d.data.categories.reverse(); }, d => { d.data.categories[4].highlights = ['what', 'how']; }, d => { d.data.categories[0].explorationId = 'problem'; }, d => { d.profile = 'arbitrary'; }]) {
    const invalid = activity('task-analysis'); mutate(invalid); assert.throws(() => validateActivity(invalid)); assert.ok(validateActivityDocument(invalid).length);
  }
});
test('Opening exact formatter, required legacy fields, optional model and editable draft do not invent grading', () => {
  const d = activity('consensus-writing').data;
  assert.equal(d.assembly.template, 'By the end of this discussion, will the group agree that we have {accomplishment} to address {problem}?');
  assert.equal(formatWriting('opening-consensus', { problem: ' stigma?! ', accomplishment: ' crafted a plan. ' }, d.assembly.template), 'By the end of this discussion, will the group agree that we have crafted a plan to address stigma?');
  for (const problem of ['', '?!', ' \n ']) assert.equal(formatWriting('opening-consensus', { problem, accomplishment: 'plan' }, d.assembly.template), null);
  assert.equal(d.output.readonly, false); assert.equal(d.model.mode, 'toggle');
  assert.deepEqual(d.fields.map(f => f.id), ['consensus-problem', 'consensus-accomplishment']);
});
test('Opening v1 last checkpoint choice is separate from durable credit; absent history stays unknown; unknown extensions survive', () => {
  let raw = { completed: [], data: { unknown: 'keep', dslUi: { schemaVersion: 1, future: [1] } }, outer: true };
  for (const id of ['propose-solutions', 'clarify-task', 'vote-leader']) {
    const s = openingAdapter.decode(raw); s.activities['sequence-checkpoint'].selections['next-step'] = id;
    if (id === 'clarify-task') s.activities['sequence-checkpoint'].earnedQuestionIds.push('next-step');
    raw = openingAdapter.encode(s, raw);
    assert.equal(raw.data.dslUi.selections['sequence-checkpoint']['next-step'], id);
    assert.equal(raw.data.sequenceCorrect === true, id !== 'propose-solutions');
    assert.deepEqual(raw.data.dslUi.future, [1]); assert.equal(raw.data.unknown, 'keep'); assert.equal(raw.outer, true);
  }
  assert.deepEqual(openingAdapter.decode({ completed: [1], data: { sequenceCorrect: true } }).activities['sequence-checkpoint'].selections, {});
  const opaque = { completed: [], data: { dslUi: { schemaVersion: 99, selections: { future: 1 } } } }, s = openingAdapter.decode(opaque);
  s.activities['sequence-checkpoint'].selections['next-step'] = 'clarify-task'; assert.deepEqual(openingAdapter.encode(s, opaque).data.dslUi, opaque.data.dslUi);
  const fallback = openingAdapter.decode({ completed: [], data: { quizAnswers: [1, 0, 1, 2, 0] } }); assert.equal(fallback.activities['knowledge-check'].earnedQuestionIds.length, 5);
  const explicit = openingAdapter.decode({ completed: [], data: { quizAnswers: [1, 0, 1, 2, 0], quizEarned: [] } }); assert.deepEqual(explicit.activities['knowledge-check'].earnedQuestionIds, []);
  const retry = ready(); delete retry.activities['knowledge-check'].selections.substantive;
  assert.equal(openingAdapter.encode(retry, { completed: [], data: { quizAnswers: [1, 0, 1, 2, 0], quizEarned: [] } }).data.quizAnswers[0], null);
});
test('Opening real shell cutover is bounded; no classic initializer, alternate preview or flashcards', () => {
  assert.equal(read('opening.html'), openingCutover(original('opening.html').toString()));
  assert.doesNotMatch(read('assets/js/opening.js'), /localStorage|DSL|__fixtures/);
  assert.ok(manifest.activities.every(({ id }) => activity(id).type !== 'flashcards'));
  assert.match(read('assets/css/opening.css'), /clamp\(1\.85rem,3\.4vw,2\.6rem\)/);
});
