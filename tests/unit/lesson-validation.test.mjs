import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, cp, unlink, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateLessonConfig, validateLessonManifest, validateActivity, validateLessonLinks } from '../../assets/js/app/lesson-validation.js';
import { validateConfig, validateManifest, validateActivityDocument, validateLessonTree } from '../../scripts/validate-content.mjs';
import { finalAdapter } from '../../lessons/final/progress-adapter.js';
import { questionActivities } from '../fixtures/harness/component-data.mjs';
import { invalidLessonCases, invalidLessonCandidate } from '../fixtures/harness/lesson-invalid.mjs';

const fixtureRoot = new URL('../fixtures/harness/', import.meta.url);
const json = async path => JSON.parse(await readFile(new URL(path, fixtureRoot)));
const config = await json('lessons/final/config.json'), manifest = await json('content/final/lesson.json');
const activities = Object.fromEntries(await Promise.all(manifest.activities.map(async item => [item.id, await json(`content/final/${item.source}`)])));
const root = new URL('https://content.invalid/content/');
const contexts = { config: { declaringUrl: 'https://content.invalid/lessons/final/config.json', allowedRootUrl: root }, manifest: { declaringUrl: 'https://content.invalid/content/final/lesson.json', allowedRootUrl: root } };
const runtime = { config: validateLessonConfig, manifest: validateLessonManifest, activity: validateActivity };
const development = { config: validateConfig, manifest: validateManifest, activity: validateActivityDocument };

test('complete config/manifest/all six standard activity schemas and cross-file graph pass without rewriting', async () => {
  for (const kind of ['config', 'manifest']) { assert.equal(runtime[kind]({config,manifest}[kind], contexts[kind]), true); assert.deepEqual(development[kind]({config,manifest}[kind], contexts[kind]), []); }
  for (const activity of Object.values(activities)) {
    assert.equal(validateActivity(activity, { activityId: activity.id }), true);
    assert.deepEqual(validateActivityDocument(activity, { activityId: activity.id }), []);
  }
  assert.equal(validateLessonLinks(config, manifest, finalAdapter), true);
  assert.deepEqual(await validateLessonTree(new URL('../fixtures/harness/', import.meta.url)), []);
});

for (const fixture of invalidLessonCases) test(`lesson runtime/schema parity: ${fixture.name}`, () => {
  const base = fixture.kind === 'activity' ? activities[fixture.activityId] : { config, manifest }[fixture.kind];
  const data = invalidLessonCandidate(base, fixture), context = fixture.kind === 'activity' ? { activityId: fixture.activityId } : contexts[fixture.kind];
  assert.throws(() => runtime[fixture.kind](data, context));
  assert.ok(development[fixture.kind](data, context).length);
});

test('all earlier question profiles are supported by full schemas, preserving baseline banks', async () => {
  const banks = await json('../content/banks.json');
  for (const lesson of ['opening', 'middle', 'final']) {
    const map = await json(`../legacy-maps/${lesson}.json`);
    for (const sequence of questionActivities(banks, { [lesson]: map }, lesson)) {
      const data = { schemaVersion: 1, id: sequence.id, type: 'question-sequence', profile: sequence.profile, data: sequence.data };
      assert.deepEqual(validateActivityDocument(data), [], sequence.id);
    }
  }
  const finalQuestions = questionActivities(banks, { final: await json('../legacy-maps/final.json') }, 'final');
  assert.deepEqual(activities['summary-synthesis-questions'].data, finalQuestions[0].data);
  assert.deepEqual(activities['connect-viewpoints-questions'].data, finalQuestions[1].data.questions[0]);
  for (const file of ['reference.json', 'summary-synthesis.md', 'synthesis-framework.md', 'effective-summaries.md', 'consensus-task.md', 'after-round.md']) {
    assert.deepEqual(await readFile(new URL(`content/final/reference/${file}`, fixtureRoot)), await readFile(new URL(`../../content/final/reference/${file}`, import.meta.url)));
  }
});

test('cross-file identity/order, missing files, malformed activities and symlink escapes fail development validation', async () => {
  const changed = structuredClone(manifest); changed.sections[0].id = 'different';
  assert.throws(() => validateLessonLinks(config, changed, finalAdapter));
  const directory = await mkdtemp(join(tmpdir(), 'dsl-lesson-'));
  await cp(fixtureRoot, directory, { recursive: true });
  const path = join(directory, 'content/final/activities/welcome-cards.json');
  await writeFile(path, JSON.stringify({ ...activities['welcome-cards'], id: 'different' }));
  assert.ok((await validateLessonTree(directory)).some(error => error.includes('ID mismatch')));
  await unlink(path);
  assert.ok((await validateLessonTree(directory)).some(error => error.includes('ENOENT')));
  const outside = join(await mkdtemp(join(tmpdir(), 'dsl-outside-')), 'cards.json');
  await writeFile(outside, JSON.stringify(activities['welcome-cards'])); await symlink(outside, path);
  assert.ok((await validateLessonTree(directory)).some(error => error.includes('unsafe resolved path')));
});

test('exact group-depth boundary accepts three nested groups and rejects the fourth', () => {
  const data = structuredClone(manifest);
  for (let n = 0; n < 2; n++) data.sections[0].blocks = [{ type: 'group', layout: 'stack', tone: 'plain', blocks: data.sections[0].blocks }];
  assert.equal(validateLessonManifest(data, contexts.manifest), true);
  assert.deepEqual(validateManifest(data, contexts.manifest), []);
  data.sections[0].blocks = [{ type: 'group', layout: 'stack', tone: 'plain', blocks: data.sections[0].blocks }];
  assert.throws(() => validateLessonManifest(data, contexts.manifest), /depth exceeds 3/);
  assert.ok(validateManifest(data, contexts.manifest).length);
});
