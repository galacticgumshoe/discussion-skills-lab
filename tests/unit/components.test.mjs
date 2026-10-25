import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { questionActivities } from '../fixtures/harness/component-data.mjs';
import { unionIds } from '../../assets/js/components/component-dom.js';
import { openingAdapter } from '../../lessons/opening/progress-adapter.js';
import { middleAdapter } from '../../lessons/middle/progress-adapter.js';
import { finalAdapter } from '../../lessons/final/progress-adapter.js';
import { hasCurrentCorrectAnswers } from '../../assets/js/app/completion.js';

const read = path => JSON.parse(readFileSync(new URL(`../fixtures/${path}`, import.meta.url)));
const banks = read('content/banks.json'), maps = Object.fromEntries(['opening', 'middle', 'final'].map(id => [id, read(`legacy-maps/${id}.json`)]));
for (const adapter of [openingAdapter, middleAdapter, finalAdapter]) {
  test(`${adapter.id}: directly supplied question data is complete, uniquely keyed, codec-compatible and exactly preserves baseline answers/feedback`, () => {
    const activities = questionActivities(banks, maps, adapter.id);
    for (const { id, data, profile } of activities) {
      assert.equal(new Set(data.questions.map(question => question.id)).size, data.questions.length);
      const state = adapter.decode({ completed: [], data: {} });
      for (const question of data.questions) {
        assert.ok(question.prompt);
        assert.equal(new Set(question.options.map(option => option.id)).size, question.options.length);
        assert.ok(question.options.some(option => option.id === question.correctOptionId));
        for (const option of question.options) {
          state.activities[id].selections[question.id] = option.id;
          assert.equal(adapter.decode(adapter.encode(state, { completed: [], data: {} })).activities[id].selections[question.id], option.id);
        }
      }
      const source = adapter.id === 'opening' ? (id === 'classification' ? banks.opening.classification : banks.opening.quiz)
        : adapter.id === 'middle' ? banks.middle[id === 'group-decisions' ? 'group' : id === 'speaking-simulator' ? 'speaking' : 'questions']
          : banks.final.questions[id === 'knowledge-check' ? 8 : maps.final.sections.indexOf(id.replace(/-questions$/, ''))];
      assert.equal(data.questions.length, source.length);
      data.questions.forEach((question, index) => {
        const original = source[index];
        assert.ok(question.prompt.endsWith(original.text || original.prompt || original.q));
        const labels = original.options || original.a || ['Procedural', 'Substantive'];
        assert.deepEqual(question.options.map(option => option.text), labels);
        const correct = original.answer ?? original.correct;
        assert.equal(question.correctOptionId, typeof correct === 'string' ? correct : question.options[correct].id);
        if (Array.isArray(original.why || original.feedback)) question.options.forEach((option, n) => {
          assert.equal(option.feedback, `${option.id === question.correctOptionId ? (adapter.id === 'middle' ? 'Good choice.' : 'Correct.') : 'Not quite.'} ${(original.why || original.feedback)[n]}`);
        });
        else if (adapter.id === 'opening' && id === 'classification') question.options.forEach(option => {
          assert.equal(option.feedback, `${option.id === original.answer ? 'Correct.' : `Not quite. This is ${original.answer}.`} ${original.why}`);
        });
        else assert.equal(question.explanation, original.explanation || original.feedback);
      });
    }
  });
}

test('profiles cover every required presentation; history union cannot substitute for Opening current answers', () => {
  assert.deepEqual(new Set(['opening', 'middle', 'final'].flatMap(lesson => questionActivities(banks, maps, lesson).map(item => item.profile))),
    new Set(['opening-classification', 'opening-knowledge-check', 'middle-scenarios', 'middle-quiz', 'final-questions']));
  assert.deepEqual(unionIds(['one'], ['one', 'two']), ['one', 'two']);
  const questions = questionActivities(banks, maps, 'opening')[0].data.questions;
  const selections = Object.fromEntries(questions.map(question => [question.id, question.correctOptionId]));
  assert.equal(hasCurrentCorrectAnswers(questions, selections), true);
  selections[questions[0].id] = 'substantive';
  assert.equal(hasCurrentCorrectAnswers(questions, selections), false);
});

test('shared component styling is opt-in; live production entries keep their original engines/styles', () => {
  for (const lesson of ['opening', 'middle', 'final']) {
    const html = readFileSync(new URL(`../../${lesson}.html`, import.meta.url), 'utf8');
    assert.doesNotMatch(html, /components\.css|components\/(flashcards|expandables|multiple-choice|question-sequence)|app\/lesson-core/);
  }
  for (const file of ['flashcards', 'expandables', 'multiple-choice', 'question-sequence']) {
    const source = readFileSync(new URL(`../../assets/js/components/${file}.js`, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /localStorage|document\.querySelector|fetch\(|\.complete\(/);
  }
});
