// MIT. Canonical graphs + isolated security mutations; no migration-site dependency.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile, mkdtemp, cp, unlink, symlink, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {validateLessonConfig, validateLessonManifest, validateActivity, validateLessonLinks} from '../../assets/js/app/lesson-validation.js';
import {validateConfig, validateManifest, validateActivityDocument, validateLessonTree} from '../../scripts/validate-content.mjs';
import {finalAdapter} from '../../lessons/final/progress-adapter.js';
import {invalidLessonCases, invalidLessonCandidate} from '../fixtures/security/lesson-cases.mjs';
import {questionActivities} from '../helpers/baseline-activities.mjs';

const site = new URL('../../', import.meta.url);
const json = async path => JSON.parse(await readFile(new URL(path, site)));
const config = await json('lessons/final/config.json'), manifest = await json('content/final/lesson.json');
const activities = Object.fromEntries(await Promise.all(manifest.activities.map(async item => [item.id, await json(`content/final/${item.source}`)])));
const contexts = Object.fromEntries(['config', 'manifest'].map(kind => [kind, {
  declaringUrl: `https://content.invalid/${kind === 'config' ? 'lessons/final/config.json' : 'content/final/lesson.json'}`,
  allowedRootUrl: new URL('https://content.invalid/content/')
}]));
const runtime = {config: validateLessonConfig, manifest: validateLessonManifest, activity: validateActivity};
const development = {config: validateConfig, manifest: validateManifest, activity: validateActivityDocument};

test('canonical config/manifest/all activities and the extensibility graph pass without rewriting', async () => {
  for (const kind of ['config', 'manifest']) {
    assert.equal(runtime[kind]({config, manifest}[kind], contexts[kind]), true);
    assert.deepEqual(development[kind]({config, manifest}[kind], contexts[kind]), []);
  }
  for (const activity of Object.values(activities)) {
    assert.equal(validateActivity(activity, {activityId: activity.id}), true);
    assert.deepEqual(validateActivityDocument(activity, {activityId: activity.id}), []);
  }
  assert.equal(validateLessonLinks(config, manifest, finalAdapter), true);
  assert.deepEqual(await validateLessonTree(site), []);
  assert.deepEqual(await validateLessonTree(new URL('../fixtures/new-module/', import.meta.url)), []);
});

for (const fixture of invalidLessonCases(config, manifest, activities)) test(`canonical runtime/schema parity: ${fixture.name}`, () => {
  const base = fixture.kind === 'activity' ? activities[fixture.activityId] : {config, manifest}[fixture.kind];
  const data = invalidLessonCandidate(base, fixture), context = fixture.kind === 'activity' ? {activityId: fixture.activityId} : contexts[fixture.kind];
  assert.throws(() => runtime[fixture.kind](data, context), fixture.name);
  assert.ok(development[fixture.kind](data, context).length, fixture.name);
});

test('canonical graph rejects identity/order drift and the sample graph rejects missing/malformed/symlinked activities', async () => {
  const changed = structuredClone(manifest); changed.sections[0].id = 'different';
  assert.throws(() => validateLessonLinks(config, changed, finalAdapter));
  const reordered = structuredClone(manifest); [reordered.sections[0], reordered.sections[1]] = [reordered.sections[1], reordered.sections[0]];
  assert.throws(() => validateLessonLinks(config, reordered, finalAdapter));
  const directory = await mkdtemp(join(tmpdir(), 'dsl-graph-contract-'));
  await cp(new URL('../fixtures/new-module/', import.meta.url), directory, {recursive: true});
  const path = join(directory, 'content/sample-module/question.json');
  const question = JSON.parse(await readFile(path));
  await writeFile(path, JSON.stringify({...question, id: 'different'}));
  assert.ok((await validateLessonTree(directory)).some(error => error.includes('ID mismatch')));
  await unlink(path);
  assert.ok((await validateLessonTree(directory)).some(error => error.includes('ENOENT')));
  const outside = join(await mkdtemp(join(tmpdir(), 'dsl-outside-')), 'question.json');
  await writeFile(outside, JSON.stringify(question)); await symlink(outside, path);
  assert.ok((await validateLessonTree(directory)).some(error => error.includes('unsafe resolved path')));
});

test('exact group depth accepts three groups and rejects the fourth in both validators', () => {
  const data = structuredClone(manifest);
  let block = {type: 'markdown', source: 'sections/fragment-1.md'};
  for (let n = 0; n < 3; n++) block = {type: 'group', layout: 'stack', tone: 'plain', blocks: [block]};
  // Retain the welcome gate's declared mount, outside the nested body.
  data.sections[0].blocks = [block, {type: 'activity', activityId: 'welcome-cards'}];
  assert.equal(validateLessonManifest(data, contexts.manifest), true); assert.deepEqual(validateManifest(data, contexts.manifest), []);
  data.sections[0].blocks[0] = {type: 'group', layout: 'stack', tone: 'plain', blocks: [block]};
  assert.throws(() => validateLessonManifest(data, contexts.manifest), /depth exceeds 3/);
  assert.ok(validateManifest(data, contexts.manifest).length);
});

test('all five baseline-backed question profiles validate without a partial lesson site', async () => {
  const banks = await json('tests/fixtures/content/banks.json');
  for (const lesson of ['opening', 'middle', 'final']) {
    const map = await json(`tests/fixtures/legacy-maps/${lesson}.json`);
    for (const sequence of questionActivities(banks, {[lesson]: map}, lesson)) {
      const data = {schemaVersion: 1, id: sequence.id, type: 'question-sequence', profile: sequence.profile, data: sequence.data};
      assert.deepEqual(validateActivityDocument(data), [], sequence.id); assert.equal(validateActivity(data), true);
    }
  }
});
