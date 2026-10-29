// MIT. Node >=22, development only. Never rewrite inputs.
import Ajv from 'ajv';
import { readFile, readdir, realpath, stat } from 'node:fs/promises';
import { resolve, sep, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { referenceSemanticErrors } from '../assets/js/app/content-validation.js';
import { resolveContentUrl } from '../assets/js/app/content-loader.js';
import { validateLessonConfig, validateLessonManifest, validateActivity, validateLessonLinks, activityBodySources } from '../assets/js/app/lesson-validation.js';
import { validateCatalog } from '../assets/js/app/catalog-validation.js';
import { createIdProgressAdapter } from '../assets/js/app/id-progress-adapter.js';

const project = fileURLToPath(new URL('../', import.meta.url));
const schema = JSON.parse(await readFile(new URL('../schemas/reference.schema.json', import.meta.url)));
const validateSchema = new Ajv({ allErrors: true, strict: true }).compile(schema);
const lessonSchema = JSON.parse(await readFile(new URL('../schemas/lesson.schema.json', import.meta.url)));
const activitySchema = JSON.parse(await readFile(new URL('../schemas/activities.schema.json', import.meta.url)));
const ajv = new Ajv({ allErrors: true, strict: true });
ajv.addSchema(lessonSchema);
ajv.addSchema(JSON.parse(await readFile(new URL('../schemas/task-analysis.schema.json', import.meta.url))));
// The file has no implicit root kind: explicitly select the two definitions.
const configSchema = ajv.compile({ $ref: `${lessonSchema.$id}#/$defs/config` });
const manifestSchema = ajv.compile({ $ref: `${lessonSchema.$id}#/$defs/manifest` });
const validateActivitySchema = ajv.compile(activitySchema);
const archiveSchema = JSON.parse(await readFile(new URL('../schemas/legacy-variants.schema.json', import.meta.url)));
const validateArchiveSchema = ajv.compile(archiveSchema);
const validateCatalogSchema = ajv.compile(JSON.parse(await readFile(new URL('../schemas/catalog.schema.json', import.meta.url))));

const combined = (schemaCheck, runtimeCheck) => (data, context) => {
  const valid = schemaCheck(data), errors = valid ? [] : schemaCheck.errors.map(error => `${error.instancePath || '/'}: ${error.message}`);
  try { runtimeCheck(data, context); } catch (error) { errors.push(error.message); }
  return errors;
};
export const validateConfig = combined(configSchema, validateLessonConfig);
export const validateManifest = combined(manifestSchema, validateLessonManifest);
export const validateActivityDocument = combined(validateActivitySchema, validateActivity);
export const validateCatalogDocument = combined(validateCatalogSchema, validateCatalog);

export async function validateCatalogTree(directory = project) {
  const errors = [], site = await realpath(directory);
  try {
    const home = await realpath(resolve(site, 'content/home.md'));
    if (!home.startsWith(resolve(site, 'content') + sep) || !(await stat(home)).isFile()) throw new Error('missing/unsafe homepage Markdown');
    const data = JSON.parse(await readFile(resolve(site, 'content/catalog.json'), 'utf8'));
    errors.push(...validateCatalogDocument(data));
    if (errors.length) return errors;
    for (const lesson of data.lessons) {
      try {
        for (const path of [lesson.url, `lessons/${lesson.id}/config.json`, `content/${lesson.id}/lesson.json`]) {
          const file = await realpath(resolve(site, path));
          if (!file.startsWith(site + sep) || !(await stat(file)).isFile()) throw new Error('unsafe destination');
          if (path.endsWith('.json') && JSON.parse(await readFile(file, 'utf8')).id !== lesson.id) throw new Error('identity mismatch');
        }
      } catch (error) { errors.push(`catalog/${lesson.id}: missing/invalid destination (${error.message})`); }
    }
  } catch (error) { errors.push(`catalog: ${error.message}`); }
  return errors;
}

// Archival records are development-validated only. No runtime loader/renderer
// accepts this kind, so archived wording cannot accidentally become a lesson.
export function validateLegacyVariants(data) {
  if (!validateArchiveSchema(data)) return validateArchiveSchema.errors.map(error => `${error.instancePath || '/'}: ${error.message}`);
  const errors = [], ids = new Set(), sources = new Set();
  for (const record of data.records) {
    const identity = `${record.source.symbol}:${record.source.index ?? ''}`;
    if (ids.has(record.id) || sources.has(identity)) errors.push(`/records: duplicate record or source identity ${record.id}`);
    ids.add(record.id); sources.add(identity);
    if (record.source.path !== `assets/js/${data.id}.js`) errors.push(`/records/${record.id}/source: wrong lesson source`);
    if (['referenceText', 'referenceText-prefix'].includes(record.source.symbol) !== (typeof record.value === 'string')) errors.push(`/records/${record.id}/value: wrong source value type`);
  }
  return errors;
}

export function validateReference(data, context) {
  const valid = validateSchema(data);
  return [
    ...(valid ? [] : validateSchema.errors.map(error => `${error.instancePath || '/'}: ${error.message}`)),
    ...referenceSemanticErrors(data, context)
  ];
}

export async function validateContent(directory = resolve(project, 'content')) {
  const errors = [];
  const root = await realpath(directory);
  const allowedRootUrl = new URL('https://content.invalid/content/');
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = resolve(dir, entry.name);
      if (entry.isDirectory()) { await walk(path); continue; }
      if (!entry.name.endsWith('.json')) continue;
      const label = relative(root, path).split(sep).join('/');
      const declaringUrl = new URL(label, allowedRootUrl);
      let data;
      try {
        const file = await realpath(path);
        if (!file.startsWith(root + sep)) { errors.push(`${label}: unsafe JSON file path`); continue; }
        data = JSON.parse(await readFile(file, 'utf8'));
      }
      catch { errors.push(`${label}: invalid JSON or unreadable file`); continue; }
      const context = { declaringUrl, allowedRootUrl };
      if (entry.name === 'catalog.json') { errors.push(...validateCatalogDocument(data).map(error => `${label}${error}`)); continue; }
      const archive = entry.name === 'legacy-variants.json' || data?.kind === 'legacy-variants';
      const problems = archive ? validateLegacyVariants(data) : data?.sections ? validateManifest(data, context) : data?.type ? validateActivityDocument(data, context) : validateReference(data, context);
      errors.push(...problems.map(error => `${label}${error}`));
      if (problems.length) continue;
      const sources = archive ? [] : data?.sections ? [...data.activities, ...manifestSources(data)].map(item => ({ source: item.source })) : data?.type ? activityBodySources(data).map(source => ({ source })) : data.items;
      for (const [index, item] of sources.entries()) {
        try {
          const url = resolveContentUrl(item.source, declaringUrl, allowedRootUrl);
          const file = await realpath(resolve(root, url.pathname.slice(allowedRootUrl.pathname.length)));
          if (!file.startsWith(root + sep) || !(await stat(file)).isFile()) throw new Error();
        } catch { errors.push(`${label}/items/${index}/source: missing file or unsafe resolved path`); }
      }
    }
  }
  await walk(root);
  return errors;
}

function manifestSources(manifest) {
  const sources = [];
  const blocks = items => items.forEach(block => { if (block.source) sources.push(block); if (block.type === 'group') blocks(block.blocks); });
  manifest.sections.forEach(section => blocks(section.blocks));
  return sources;
}

// Validate an entire static site's config -> manifest -> activity/reference/body graph.
// realpath checks apply to JSON as well as Markdown, including symlink containment.
export async function validateLessonTree(directory) {
  const errors = [], site = await realpath(directory), root = new URL('https://content.invalid/'), contentRoot = new URL('content/', root);
  async function file(url, subtree) {
    const target = await realpath(resolve(site, url.pathname.slice(1)));
    if (!target.startsWith(resolve(site, subtree) + sep) || !(await stat(target)).isFile()) throw new Error('missing file or unsafe resolved path');
    return target;
  }
  async function json(url, validate, context, subtree = 'content') {
    const data = JSON.parse(await readFile(await file(url, subtree), 'utf8'));
    const problems = validate(data, context);
    if (problems.length) throw new Error(problems.join('; '));
    return data;
  }
  let lessons;
  try { lessons = await readdir(resolve(site, 'lessons'), { withFileTypes: true }); }
  catch (error) { if (error.code === 'ENOENT') return errors; throw error; }
  for (const lesson of lessons.filter(entry => entry.isDirectory())) {
    // Adapter-only production directories are intentionally not configured yet.
    if (!(await readdir(resolve(site, 'lessons', lesson.name))).includes('config.json')) continue;
    const configUrl = new URL(`lessons/${lesson.name}/config.json`, root);
    try {
      const config = await json(configUrl, validateConfig, { declaringUrl: configUrl, allowedRootUrl: contentRoot }, 'lessons');
      if (config.id !== lesson.name) throw new Error('Config directory/ID mismatch');
      const manifestUrl = resolveContentUrl(config.content, configUrl, contentRoot);
      const manifest = await json(manifestUrl, validateManifest, { declaringUrl: manifestUrl, allowedRootUrl: contentRoot });
      // Static adapter identity is a mechanical contract, not a content-executable import.
      const adapters = await Promise.all([
        import('../lessons/opening/progress-adapter.js'), import('../lessons/middle/progress-adapter.js'), import('../lessons/final/progress-adapter.js')
      ]);
      const adapter = { opening: adapters[0].openingAdapter, middle: adapters[1].middleAdapter, final: adapters[2].finalAdapter }[config.id]
        || createIdProgressAdapter({id: config.id, sections: config.sectionOrder, persistent: config.storageKey !== null});
      validateLessonLinks(config, manifest, adapter);
      for (const activity of manifest.activities) {
        try {
          const activityUrl = resolveContentUrl(activity.source, manifestUrl, contentRoot);
          const data = await json(activityUrl, validateActivityDocument, { activityId: activity.id, declaringUrl: activityUrl, allowedRootUrl: contentRoot });
          for (const source of activityBodySources(data)) await file(resolveContentUrl(source, activityUrl, contentRoot), 'content');
        }
        catch (error) { errors.push(`${activity.source}: ${error.message}`); }
      }
      for (const block of manifestSources(manifest)) {
        try {
          const url = resolveContentUrl(block.source, manifestUrl, contentRoot);
          if (block.type === 'markdown') await file(url, 'content');
          else {
            const reference = await json(url, validateReference, { declaringUrl: url, allowedRootUrl: contentRoot });
            for (const item of reference.items) await file(resolveContentUrl(item.source, url, contentRoot), 'content');
          }
        } catch (error) { errors.push(`${block.source}: ${error.message}`); }
      }
    } catch (error) { errors.push(`${configUrl.pathname}: ${error.message}`); }
  }
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const errors = [...await validateContent(), ...await validateCatalogTree(), ...await validateLessonTree(project), ...await validateLessonTree(resolve(project, 'tests/fixtures/harness')), ...await validateLessonTree(resolve(project, 'tests/fixtures/new-module'))];
    if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
    else console.log('Content validation passed: reference/config/manifest/activity schemas, cross-file IDs, gates, paths and Markdown files (including the isolated harness).');
  } catch (error) { console.error(`Content validation failed: ${error.message}`); process.exitCode = 1; }
}
