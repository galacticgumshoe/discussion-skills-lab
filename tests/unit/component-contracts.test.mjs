// MIT. Consolidated independent content/codec/formatter/module-boundary contracts.
// Original instructional content © Rhys Jones, CC BY 4.0; original pin unchanged.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {original} from '../helpers/baseline-source.mjs';
import {questionActivities, writingTemplates} from '../helpers/baseline-activities.mjs';
import {unionIds} from '../../assets/js/components/component-dom.js';
import {hasCurrentCorrectAnswers} from '../../assets/js/app/completion.js';
import {formatWriting} from '../../assets/js/utilities/writing-formatters.js';
import {openingAdapter} from '../../lessons/opening/progress-adapter.js';
import {middleAdapter} from '../../lessons/middle/progress-adapter.js';
import {finalAdapter} from '../../lessons/final/progress-adapter.js';
const read = path => JSON.parse(readFileSync(new URL(`../fixtures/${path}`, import.meta.url)));
const banks = read('content/banks.json'), maps = Object.fromEntries(['opening', 'middle', 'final'].map(id => [id, read(`legacy-maps/${id}.json`)]));

for (const adapter of [openingAdapter, middleAdapter, finalAdapter]) test(`${adapter.id}: every independent question/option/feedback identity round-trips through the fixed legacy codec`, () => {
  for (const {id, data} of questionActivities(banks, maps, adapter.id)) {
    assert.equal(new Set(data.questions.map(q => q.id)).size, data.questions.length);
    const state = adapter.decode({completed: [], data: {}});
    const source = adapter.id === 'opening' ? banks.opening[id === 'classification' ? 'classification' : 'quiz'] : adapter.id === 'middle' ? banks.middle[id === 'group-decisions' ? 'group' : id === 'speaking-simulator' ? 'speaking' : 'questions'] : banks.final.questions[id === 'knowledge-check' ? 8 : maps.final.sections.indexOf(id.replace(/-questions$/, ''))];
    assert.equal(data.questions.length, source.length);
    data.questions.forEach((q, index) => {
      const original = source[index]; assert.ok(q.prompt); assert.ok(q.prompt.endsWith(original.text || original.prompt || original.q));
      assert.equal(new Set(q.options.map(o => o.id)).size, q.options.length);
      assert.deepEqual(q.options.map(o => o.text), original.options || original.a || ['Procedural', 'Substantive']);
      const correct = original.answer ?? original.correct; assert.equal(q.correctOptionId, typeof correct === 'string' ? correct : q.options[correct].id);
      for (const option of q.options) {
        state.activities[id].selections[q.id] = option.id;
        assert.equal(adapter.decode(adapter.encode(state, {completed: [], data: {}})).activities[id].selections[q.id], option.id);
      }
      if (Array.isArray(original.why || original.feedback)) q.options.forEach((option, n) => assert.equal(option.feedback, `${option.id === q.correctOptionId ? adapter.id === 'middle' ? 'Good choice.' : 'Correct.' : 'Not quite.'} ${(original.why || original.feedback)[n]}`));
      else if (adapter.id === 'opening' && id === 'classification') q.options.forEach(option => assert.equal(option.feedback, `${option.id === original.answer ? 'Correct.' : `Not quite. This is ${original.answer}.`} ${original.why}`));
      else assert.equal(q.explanation, original.explanation || original.feedback);
    });
  }
});

test('all five source-backed profiles remain supported; correct-ever history cannot replace Opening current answers', () => {
  assert.deepEqual(new Set(['opening', 'middle', 'final'].flatMap(id => questionActivities(banks, maps, id).map(item => item.profile))), new Set(['opening-classification', 'opening-knowledge-check', 'middle-scenarios', 'middle-quiz', 'final-questions']));
  assert.deepEqual(unionIds(['one'], ['one', 'two']), ['one', 'two']);
  const questions = questionActivities(banks, maps, 'opening')[0].data.questions, selections = Object.fromEntries(questions.map(q => [q.id, q.correctOptionId]));
  assert.equal(hasCurrentCorrectAnswers(questions, selections), true); selections[questions[0].id] = 'substantive'; assert.equal(hasCurrentCorrectAnswers(questions, selections), false);
});

const builders = [
  {lesson: 'opening', profile: 'opening-consensus', names: ['problem', 'accomplishment'], ids: ['problem-input', 'accomplishment-input'], output: 'draft-input', source: 'opening.html', start: 'const problem = document.getElementById("problem-input")', end: '    });'},
  {lesson: 'middle', profile: 'middle-evidence', names: ['source', 'finding', 'why'], ids: ['source', 'finding', 'why'], output: 'assembled', source: 'assets/js/middle.js', start: "const source=$('source').value.trim()", end: 'assembled=true;'},
  {lesson: 'final', profile: 'final-synthesis', names: ['contributors', 'relationship', 'recommendation'], ids: ['build-1', 'build-2', 'build-3'], output: 'assembled', source: 'assets/js/final.js', start: 'const fields=["build-1","build-2","build-3"]', end: 'state.assembled=true;'}
];
function baseline(spec, values) {
  const source = original(spec.source).toString(), start = source.indexOf(spec.start); assert.ok(start > 0);
  const body = source.slice(start, source.indexOf(spec.end, start)), elements = Object.fromEntries(spec.ids.map((id, i) => [id, {value: values[i]}]));
  elements[spec.output] = {value: null, dispatchEvent() {}, focus() {}};
  const get = id => elements[id] ||= {value: '', textContent: ''};
  runInNewContext(`(() => { ${body} })()`, {document: {getElementById: get}, $: get, setText() {}, Event: class {}}); return elements[spec.output].value;
}
for (const spec of builders) test(`${spec.lesson}: exact formatter/template matches the actual pinned legacy handler for punctuation/Unicode/empty/untrusted text`, () => {
  const cases = [['  Access barriers?!  ', '  Created a PLAN.?!  ', '  We Recommend a Pilot?!  '], ['First...   ', 'Second?!   ', 'THIRD.   '], ['Māya\n學生', 'ÉVIDENCE\nNext line.', 'İNSIGHT\nKeep CAPS!'], ['0', '0', '0'], ['<img src=x onerror=alert(1)>', '{source} ${x}', 'A & B'], ['!!!', '???', '...'], ['', 'Finding', 'Why'], ['Source', '   ', 'Why'], ['Source', 'Finding', '   ']];
  for (const values of cases) assert.equal(formatWriting(spec.profile, Object.fromEntries(spec.names.map((name, i) => [name, values[i]])), writingTemplates[spec.profile]), baseline(spec, values), JSON.stringify(values));
});
test('legacy formatting differences and plain named-field templates remain deliberate, never expressions or recursive interpolation', () => {
  assert.equal(formatWriting('opening-consensus', {problem: '  A.!  ', accomplishment: '  DONE?!  '}, writingTemplates['opening-consensus']), 'By the end of this discussion, will the group agree that we have DONE to address A?');
  assert.equal(formatWriting('middle-evidence', {source: 'Report.', finding: 'FACT!?', why: 'Reason!.'}, writingTemplates['middle-evidence']), 'According to Report., FACT!?. This matters to our task because Reason!.');
  assert.equal(formatWriting('final-synthesis', {contributors: 'Maya!', relationship: 'IDEAS?!', recommendation: 'WE Should?!'}, writingTemplates['final-synthesis']), 'Building on Maya, iDEAS. Therefore, wE Should?!');
  assert.throws(() => formatWriting('unknown', {}, ''), /Unsupported/);
  for (const template of ['{other}', '{constructor}', '{problem.toLowerCase()}', '${problem + 1}', '{{problem}}']) assert.throws(() => formatWriting('opening-consensus', {problem: 'x', accomplishment: 'y'}, template), /template/i);
  assert.equal(formatWriting('opening-consensus', {problem: '{accomplishment}', accomplishment: '<script>plain</script>'}, '{problem} — {accomplishment}'), '{accomplishment} — <script>plain</script>');
});
test('all public entries use shared styles/thin native modules; components and reference loader cannot discover progress or write credit', () => {
  for (const id of ['opening', 'middle', 'final']) {
    const html = readFileSync(new URL(`../../${id}.html`, import.meta.url), 'utf8');
    assert.match(html, /href="assets\/css\/components\.css"/); assert.match(html, new RegExp(`<script type="module" src="assets/js/${id}\\.js"`));
    assert.doesNotMatch(html, /<script[^>]+(?:src="assets\/js\/lesson-core\.js|components\/|reference-loader)|on(?:click|input|change)=/);
  }
  for (const file of ['flashcards', 'expandables', 'multiple-choice', 'question-sequence', 'writing-activity', 'checklist']) {
    const source = readFileSync(new URL(`../../assets/js/components/${file}.js`, import.meta.url), 'utf8'); assert.doesNotMatch(source, /localStorage|document\.querySelector|fetch\(|\.complete\(/);
    if (['writing-activity', 'checklist'].includes(file)) assert.doesNotMatch(source, /innerHTML|new Function|eval\(/);
  }
  const clipboard = readFileSync(new URL('../../assets/js/utilities/clipboard.js', import.meta.url), 'utf8'); assert.doesNotMatch(clipboard, /localStorage|document\.querySelector|fetch\(|\.complete\(|innerHTML|new Function|eval\(/);
  const loader = readFileSync(new URL('../../assets/js/app/reference-loader.js', import.meta.url), 'utf8'); assert.match(loader, /import \{ renderReferenceItems \} from '\.\.\/components\/quick-reference\.js'/); assert.doesNotMatch(loader, /localStorage|\.complete\(|innerHTML/);
});
test('published Opening navigation labels match pinned original independently of fixture markup', () => {
  const source = original('opening.html').toString(), expected = Array.from(runInNewContext(source.match(/labels:(\[[^\n]+\])/)[1]));
  const manifest = JSON.parse(readFileSync(new URL('../../content/opening/lesson.json', import.meta.url))); assert.deepEqual(manifest.sections.map(s => s.label), expected);
});
