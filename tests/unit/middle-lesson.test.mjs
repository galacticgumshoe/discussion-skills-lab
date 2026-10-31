import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateActivityDocument, validateManifest, validateLessonTree } from '../../scripts/validate-content.mjs';
import { middleAdapter } from '../../lessons/middle/progress-adapter.js';
const json = path => JSON.parse(readFileSync(new URL(`../../${path}`, import.meta.url)));
const manifest = json('content/middle/lesson.json');

test('Middle full graph uses exact frozen sections, shared activity types and fixed writing bindings', async () => {
  assert.deepEqual(manifest.sections.map(section => section.id), middleAdapter.sections);
  assert.equal(manifest.activities.length, 19);
  assert.deepEqual(await validateLessonTree(new URL('../../', import.meta.url).pathname), []);
  const research = json('content/middle/activities/evidence-writing.json');
  assert.deepEqual(research.binding, { assembledFlag: 'evidence-assembled', modelFlag: 'research-model-visible' });
  assert.equal(research.data.output.readonly, true);
  assert.equal(research.data.assembly.template, 'According to {source}, {finding}. This matters to our task because {why}.');
  assert.equal(json('content/middle/activities/application.json').profile, 'middle-application');
  const application = json('content/middle/activities/application.json');
  assert.deepEqual(validateActivityDocument({ schemaVersion: 1, id: 'application', type: 'multiple-choice', profile: 'middle-application', data: application.data.questions[0] }), []);
});

test('Middle Markdown activity bodies have closed schema/runtime boundaries, not raw HTML or arbitrary includes', () => {
  const original = json('content/middle/activities/structure-cards.json');
  assert.deepEqual(validateActivityDocument(original), []);
  for (const mutate of [
    data => { data.data.items[0].frontSource = 'https://evil.invalid/body.md'; },
    data => { data.data.items[0].frontSource = '/content/body.md'; },
    data => { data.data.items[0].frontSource = '%2e%2e/body.md'; },
    data => { data.data.items[0].frontSource = '../../../escape.md'; },
    data => { data.data.items[0].front = 'ambiguous alternate content'; },
    data => { data.data.items[0].html = '<button>unsafe</button>'; },
    data => { delete data.data.items[0].frontSource; }
  ]) {
    const data = structuredClone(original); mutate(data);
    assert.ok(validateActivityDocument(data, { declaringUrl: new URL('https://local.invalid/content/middle/activities/cards.json'), allowedRootUrl: new URL('https://local.invalid/content/') }).length);
  }
  const invalid = structuredClone(manifest); invalid.sections[0].blocks[0].revealId = '../unsafe';
  assert.ok(validateManifest(invalid).length);
});

test('Middle prose roles are closed presentation metadata with matching schema/runtime validation', () => {
  for (const textStyle of ['lead', 'note', 'instruction', 'label']) {
    const data = structuredClone(manifest); data.sections[0].blocks[0].blocks[0].textStyle = textStyle;
    assert.deepEqual(validateManifest(data), []);
  }
  for (const textStyle of ['font-bold', 'unsafe style', { html: '<style>' }]) {
    const data = structuredClone(manifest); data.sections[0].blocks[0].blocks[0].textStyle = textStyle;
    assert.ok(validateManifest(data).length);
  }
});

test('Structure front labels use existing titles and classification has a bounded activity composition', () => {
  const cards = json('content/middle/activities/structure-cards.json');
  for (const item of cards.data.items) {
    assert.equal(item.frontTitle, item.id.toUpperCase());
    const body = readFileSync(new URL(`../../content/middle/activities/${item.frontSource}`, import.meta.url), 'utf8');
    assert.ok(!body.includes(item.frontTitle), 'label must not also remain in the prose');
  }
  assert.deepEqual(validateActivityDocument(cards), []);
  const group = manifest.sections[1].blocks.find(block => block.revealId === 'classification');
  assert.equal(group.tone, 'activity');
  assert.deepEqual(validateManifest(manifest), []);
  const invalid = structuredClone(manifest);
  invalid.sections[1].blocks.find(block => block.revealId === 'classification').tone = 'arbitrary-css-class';
  assert.ok(validateManifest(invalid).length);
});

test('Evidence preserves example callouts, independent card titles and the original fact-checking notice', () => {
  const cards = json('content/middle/activities/research-model-cards.json');
  assert.deepEqual(cards.data.items.map(item => [item.frontTitle, item.backTitle]), [
    ['WEAK · FICTIONAL EXAMPLE', 'WHY IT IS WEAK'], ['STRONGER', 'WHY IT IS STRONGER']
  ]);
  for (const item of cards.data.items) for (const side of ['front', 'back']) {
    const body = readFileSync(new URL(`../../content/middle/activities/${item[`${side}Source`]}`, import.meta.url), 'utf8');
    assert.ok(!body.includes(item[`${side}Title`]), 'title must not also remain inline in description');
  }
  for (const item of json('content/middle/activities/evidence-panels.json').data.items) {
    const body = readFileSync(new URL(`../../content/middle/activities/${item.bodySource}`, import.meta.url), 'utf8');
    assert.match(body, /\n\n> \S/);
  }
  const group = manifest.sections[2].blocks.find(block => block.revealId === 'evidence-after').blocks.find(block => block.revealId === 'research-activity');
  assert.equal(group.tone, 'activity');
  assert.deepEqual(group.blocks.at(-1).blocks.filter(block => block.type === 'activity').map(block => block.activityId), ['evidence-writing', 'research-checklist']);
  assert.equal(json('content/middle/activities/evidence-writing.json').data.assembly.successMessage, 'Assembled from your words; this response has not been fact-checked.');
  assert.deepEqual(validateManifest(manifest), []);
});

test('Every original Middle activity surface has a bounded presentation without changing activity bindings', () => {
  const panels = [];
  const collect = blocks => blocks.forEach(block => {
    if (block.type === 'group') { if (block.tone === 'activity') panels.push(block); collect(block.blocks); }
  });
  manifest.sections.forEach(section => collect(section.blocks));
  assert.equal(panels.length, 6, 'classification, research, three scenarios and Task C; A/B and quiz are shared profile panels');
  assert.deepEqual(panels.map(panel => panel.revealId).filter(Boolean), ['classification', 'research-activity', 'group-activity', 'communication-activity', 'speaking-activity']);
  assert.equal(json('content/middle/activities/application.json').profile, 'middle-application');
  assert.equal(json('content/middle/activities/knowledge-check.json').profile, 'middle-quiz');
  assert.equal(manifest.activities.length, 19);
  assert.deepEqual(validateManifest(manifest), []);
});

test('Paired callouts have closed caution/example annotations and require Markdown bodies', () => {
  const panels = json('content/middle/activities/communication-panels.json');
  assert.deepEqual(panels.data.items[1].calloutTones, ['caution', 'example']);
  assert.deepEqual(validateActivityDocument(panels), []);
  for (const calloutTones of [[], ['arbitrary-class'], ['example', 'caution', 'example'], 'caution', null]) {
    const invalid = structuredClone(panels); invalid.data.items[1].calloutTones = calloutTones;
    assert.ok(validateActivityDocument(invalid).length);
  }
  const invalid = structuredClone(panels);
  delete invalid.data.items[1].bodySource; invalid.data.items[1].body = 'Plain text is not an annotated Markdown blockquote.';
  assert.ok(validateActivityDocument(invalid).length);
  const notes = readFileSync(new URL('../../content/middle/activities/bodies/take-notes-panel.md', import.meta.url), 'utf8');
  assert.equal((notes.match(/  \n/g) || []).length, 3, 'preserve all original note-example hard breaks');
});

test('Owner-approved Activity 5 removal disables only the optional comparison affordance', () => {
  const speaking = json('content/middle/activities/speaking-simulator.json');
  assert.equal(Object.hasOwn(speaking.data, 'compareLabel'), false);
  assert.equal(Object.hasOwn(speaking.data, 'compareMessage'), false);
  assert.equal(speaking.data.questions.length, 3);
  assert.deepEqual(validateActivityDocument(speaking), []);
});
