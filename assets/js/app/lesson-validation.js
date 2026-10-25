// MIT. Lightweight closed content boundaries; progress deliberately uses a different,
// open validator. Keep in parity with schemas/{lesson,activities}.schema.json.
import { resolveContentUrl } from './content-loader.js';
import { formatWriting } from '../utilities/writing-formatters.js';

export const activityTypes = ['flashcards', 'expandables', 'multiple-choice', 'question-sequence', 'writing', 'checklist'];
export const sequenceProfiles = ['opening-classification', 'opening-knowledge-check', 'middle-scenarios', 'middle-quiz', 'final-questions'];
export const maxGroupDepth = 3;
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const text = value => typeof value === 'string' && /\S/.test(value);
const identity = value => typeof value === 'string' && /^[a-z][a-z0-9-]*$/.test(value) && !['constructor', 'prototype', '__proto__'].includes(value);
const local = value => typeof value === 'string' && /^[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]+)*$/.test(value);

function boundary() {
  const errors = [];
  const check = (valid, path, message = 'invalid value') => { if (!valid) errors.push(`${path}: ${message}`); };
  const object = (value, required, optional = [], path = '') => {
    if (!record(value)) { check(false, path, 'expected object'); return false; }
    required.forEach(key => check(Object.hasOwn(value, key), `${path}/${key}`, 'required'));
    Object.keys(value).forEach(key => check([...required, ...optional].includes(key), `${path}/${key}`, 'unknown property'));
    return true;
  };
  const list = (value, path, visit, minimum = 1) => {
    if (!Array.isArray(value) || value.length < minimum) { check(false, path, 'expected array'); return; }
    value.forEach((item, index) => visit(item, `${path}/${index}`));
  };
  const ids = (items, path) => {
    const values = items?.map(item => typeof item === 'string' ? item : item?.id) || [];
    check(new Set(values).size === values.length, path, 'duplicate ID');
  };
  const source = (value, path, extension, context) => {
    check(local(value) && value.endsWith(extension), path, `local ${extension} source required`);
    if (context?.declaringUrl && context?.allowedRootUrl) {
      try { resolveContentUrl(value, context.declaringUrl, context.allowedRootUrl); }
      catch { check(false, path, 'unsafe content path'); }
    }
  };
  const finish = () => { if (errors.length) throw new Error(errors.join('; ')); return true; };
  return { check, object, list, ids, source, finish };
}

export function validateLessonConfig(data, context = {}) {
  const b = boundary();
  if (b.object(data, ['schemaVersion', 'id', 'storageKey', 'content', 'sectionOrder', 'referenceId', 'presentation'])) {
    b.check(data.schemaVersion === 1, '/schemaVersion');
    b.check(['opening', 'middle', 'final'].includes(data.id), '/id');
    b.check(data.storageKey === { opening: 'dsl:opening-stage:v1', middle: 'dsl:middle:v1', final: 'dsl:final:v1' }[data.id], '/storageKey');
    b.source(data.content, '/content', '.json', context);
    b.list(data.sectionOrder, '/sectionOrder', (id, path) => b.check(identity(id), path));
    if (Array.isArray(data.sectionOrder)) { b.ids(data.sectionOrder, '/sectionOrder'); b.check(data.sectionOrder.length >= 2 && data.sectionOrder.at(-1) === data.referenceId, '/referenceId'); }
    b.check(identity(data.referenceId), '/referenceId');
    b.check(data.presentation === 'legacy-shell', '/presentation');
  }
  return b.finish();
}

export function validateLessonManifest(data, context = {}) {
  const b = boundary(), used = new Set(), declared = new Set();
  if (b.object(data, ['schemaVersion', 'id', 'title', 'activities', 'sections'])) {
    b.check(data.schemaVersion === 1, '/schemaVersion'); b.check(['opening', 'middle', 'final'].includes(data.id), '/id'); b.check(text(data.title), '/title');
    b.list(data.activities, '/activities', (item, path) => {
      if (!b.object(item, ['id', 'source'], [], path)) return;
      b.check(identity(item.id), `${path}/id`); b.check(!declared.has(item.id), `${path}/id`, 'duplicate ID'); declared.add(item.id);
      b.source(item.source, `${path}/source`, '.json', context);
    }, 0);
    const blocks = (items, path, depth, sectionActivities) => b.list(items, path, (block, p) => {
      if (!record(block)) { b.check(false, p); return; }
      if (block.type === 'group') {
        if (!b.object(block, ['type', 'layout', 'tone', 'blocks'], [], p)) return;
        b.check(['stack', 'two-column'].includes(block.layout), `${p}/layout`);
        b.check(['plain', 'callout'].includes(block.tone), `${p}/tone`);
        b.check(depth < maxGroupDepth, p, 'group depth exceeds 3');
        if (depth < maxGroupDepth) blocks(block.blocks, `${p}/blocks`, depth + 1, sectionActivities);
      } else if (block.type === 'activity') {
        if (!b.object(block, ['type', 'activityId'], [], p)) return;
        b.check(declared.has(block.activityId), `${p}/activityId`, 'undeclared activity');
        b.check(!used.has(block.activityId), `${p}/activityId`, 'activity mounted more than once'); used.add(block.activityId); sectionActivities.add(block.activityId);
      } else if (['markdown', 'reference'].includes(block.type)) {
        if (b.object(block, ['type', 'source'], [], p)) b.source(block.source, `${p}/source`, block.type === 'markdown' ? '.md' : '.json', context);
      } else b.check(false, `${p}/type`, 'unknown block type');
    });
    b.list(data.sections, '/sections', (section, path) => {
      if (!b.object(section, ['id', 'label', 'heading', 'headingLevel', 'requirement', 'reference', 'gateActivityIds', 'blocks'], ['eyebrow'], path)) return;
      b.check(identity(section.id), `${path}/id`);
      ['label', 'heading', 'requirement'].forEach(key => b.check(text(section[key]), `${path}/${key}`));
      if (Object.hasOwn(section, 'eyebrow')) b.check(text(section.eyebrow), `${path}/eyebrow`);
      b.check([1, 2, 3].includes(section.headingLevel), `${path}/headingLevel`); b.check(typeof section.reference === 'boolean', `${path}/reference`);
      const mounted = new Set(); blocks(section.blocks, `${path}/blocks`, 0, mounted);
      b.list(section.gateActivityIds, `${path}/gateActivityIds`, (id, p) => b.check(identity(id) && declared.has(id) && mounted.has(id), p, 'invalid gate reference'), 0);
      if (Array.isArray(section.gateActivityIds)) { b.ids(section.gateActivityIds, `${path}/gateActivityIds`); b.check(!section.reference || section.gateActivityIds.length === 0, `${path}/gateActivityIds`); }
      const references = section.blocks?.filter(block => block?.type === 'reference') || [];
      b.check(section.reference ? references.length === 1 && section.blocks.length === 1 : references.length === 0, `${path}/blocks`, 'reference must be the sole block in its section');
      // References cannot be concealed in a group or ordinary section.
      const countReferences = (items, depth = 0) => depth > maxGroupDepth || !Array.isArray(items) ? 0 : items.reduce((count, block) => count + (block?.type === 'reference' ? 1 : block?.type === 'group' ? countReferences(block.blocks, depth + 1) : 0), 0);
      b.check(countReferences(section.blocks) === (section.reference ? 1 : 0), `${path}/blocks`);
    });
    if (Array.isArray(data.sections)) {
      b.ids(data.sections, '/sections');
      b.check(data.sections.length >= 2 && data.sections.filter(section => section?.reference === true).length === 1 && data.sections.at(-1)?.reference === true, '/sections');
    }
    declared.forEach(id => b.check(used.has(id), '/activities', 'unused activity source'));
  }
  return b.finish();
}

export function validateActivity(data, context = {}) {
  const b = boundary();
  if (!b.object(data, ['schemaVersion', 'id', 'type', 'data'], ['profile', 'binding'])) return b.finish();
  b.check(data.schemaVersion === 1, '/schemaVersion'); b.check(identity(data.id), '/id'); b.check(activityTypes.includes(data.type), '/type');
  if (context.activityId) b.check(data.id === context.activityId, '/id', 'declared activity ID mismatch');
  const d = data.data, p = '/data';
  const question = (q, path) => {
    if (!b.object(q, ['id', 'prompt', 'correctOptionId', 'options'], ['context', 'explanation'], path)) return;
    b.check(identity(q.id), `${path}/id`); b.check(text(q.prompt), `${path}/prompt`); b.check(identity(q.correctOptionId), `${path}/correctOptionId`);
    ['context', 'explanation'].forEach(key => { if (Object.hasOwn(q, key)) b.check(text(q[key]), `${path}/${key}`); });
    b.list(q.options, `${path}/options`, (option, op) => {
      if (b.object(option, ['id', 'text'], ['feedback'], op)) {
        b.check(identity(option.id), `${op}/id`); b.check(text(option.text), `${op}/text`);
        if (Object.hasOwn(option, 'feedback')) b.check(text(option.feedback), `${op}/feedback`);
      }
    });
    if (Array.isArray(q.options)) {
      b.ids(q.options, `${path}/options`); b.check(q.options.length >= 2 && q.options.some(option => option?.id === q.correctOptionId), `${path}/correctOptionId`);
      b.check(text(q.explanation) || q.options.every(option => text(option?.feedback)), path, 'question-wide explanation or every option feedback required');
    }
  };
  if (['flashcards', 'expandables', 'checklist'].includes(data.type)) {
    if (b.object(d, ['items'], [], p)) {
      b.list(d.items, `${p}/items`, (item, path) => {
        const keys = data.type === 'flashcards' ? ['id', 'front', 'back'] : data.type === 'expandables' ? ['id', 'title', 'body'] : ['id', 'text'];
        const optional = data.type === 'flashcards' ? ['frontTitle', 'backTitle'] : [];
        if (b.object(item, keys, optional, path)) [...keys, ...optional.filter(key => Object.hasOwn(item, key))].forEach(key => b.check(key === 'id' ? identity(item[key]) : text(item[key]), `${path}/${key}`));
      });
      if (Array.isArray(d.items)) b.ids(d.items, `${p}/items`);
    }
  } else if (data.type === 'multiple-choice') question(d, p);
  else if (data.type === 'question-sequence') {
    if (b.object(d, ['questions'], ['retryLabel'], p)) {
      b.list(d.questions, `${p}/questions`, question); if (Array.isArray(d.questions)) b.ids(d.questions, `${p}/questions`);
      if (Object.hasOwn(d, 'retryLabel')) b.check(text(d.retryLabel), `${p}/retryLabel`);
    }
  } else if (data.type === 'writing') {
    if (b.object(d, ['fields', 'copyLabel'], ['output', 'assembly', 'copyFieldId', 'copyMessages', 'model'], p)) {
      const field = (value, path) => {
        if (!b.object(value, ['id', 'label', 'multiline', 'readonly'], ['formatKey', 'placeholder', 'rows', 'maxLength'], path)) return;
        b.check(identity(value.id), `${path}/id`); b.check(text(value.label), `${path}/label`);
        ['multiline', 'readonly'].forEach(key => b.check(typeof value[key] === 'boolean', `${path}/${key}`));
        ['rows', 'maxLength'].forEach(key => { if (Object.hasOwn(value, key)) b.check(Number.isInteger(value[key]) && value[key] > 0, `${path}/${key}`); });
        ['formatKey', 'placeholder'].forEach(key => { if (Object.hasOwn(value, key)) b.check(text(value[key]), `${path}/${key}`); });
      };
      b.list(d.fields, `${p}/fields`, field); if (d.output !== undefined) field(d.output, `${p}/output`);
      const fields = Array.isArray(d.fields) ? [...d.fields, ...(d.output ? [d.output] : [])] : [];
      b.ids(fields, `${p}/fields`); b.check(text(d.copyLabel), `${p}/copyLabel`);
      if (Object.hasOwn(d, 'copyFieldId')) b.check(identity(d.copyFieldId), `${p}/copyFieldId`);
      b.check(d.output !== undefined || fields.some(field => field?.id === d.copyFieldId), `${p}/copyFieldId`);
      if (d.copyMessages !== undefined && b.object(d.copyMessages, [], ['empty', 'copied', 'selected', 'fallback'], `${p}/copyMessages`)) Object.values(d.copyMessages).forEach(value => b.check(text(value), `${p}/copyMessages`));
      if (d.assembly !== undefined && b.object(d.assembly, ['label', 'template', 'missingMessage', 'successMessage', 'focusOutput'], [], `${p}/assembly`)) {
        b.check(text(d.assembly.label) && text(d.assembly.template), `${p}/assembly`);
        b.check(typeof d.assembly.missingMessage === 'string' && typeof d.assembly.successMessage === 'string' && typeof d.assembly.focusOutput === 'boolean', `${p}/assembly`);
        b.check(!!d.output && data.profile !== 'draft', `${p}/assembly`);
        const names = { 'opening-consensus': ['problem', 'accomplishment'], 'middle-evidence': ['source', 'finding', 'why'], 'final-synthesis': ['contributors', 'relationship', 'recommendation'] }[data.profile] || [];
        b.check(Array.isArray(d.fields) && d.fields.length === names.length && names.every(name => d.fields.filter(field => field?.formatKey === name).length === 1), `${p}/fields`, 'exact formatter fields required');
        b.check(d.output?.readonly === (data.profile === 'middle-evidence'), `${p}/output/readonly`, 'legacy output mode required');
        try { formatWriting(data.profile, Object.fromEntries(fields.map(field => [field?.formatKey, 'test'])), d.assembly.template); }
        catch { b.check(false, `${p}/assembly/template`, 'invalid formatter template'); }
      }
      b.check(data.profile === 'draft' ? !d.assembly : !!d.assembly, `${p}/assembly`);
      if (d.model !== undefined && b.object(d.model, ['mode', 'showLabel', 'blocks'], ['hideLabel'], `${p}/model`)) {
        b.check(['show-only', 'toggle'].includes(d.model.mode) && text(d.model.showLabel), `${p}/model`);
        if (d.model.mode === 'toggle' || d.model.hideLabel !== undefined) b.check(text(d.model.hideLabel), `${p}/model/hideLabel`);
        b.list(d.model.blocks, `${p}/model/blocks`, (block, path) => { if (b.object(block, ['kind', 'text'], [], path)) b.check(['title', 'paragraph'].includes(block.kind) && text(block.text), path); });
      }
    }
  }
  const profiles = data.type === 'question-sequence' ? sequenceProfiles : data.type === 'multiple-choice' ? ['standard', ...sequenceProfiles]
    : data.type === 'expandables' ? ['standard', 'timeline'] : data.type === 'writing' ? ['draft', 'opening-consensus', 'middle-evidence', 'final-synthesis'] : [];
  b.check(profiles.length ? profiles.includes(data.profile) : data.profile === undefined, '/profile');
  if (data.binding !== undefined) {
    b.check(data.type === 'writing', '/binding');
    if (b.object(data.binding, [], ['assembledFlag', 'modelFlag', 'modelUi'], '/binding')) {
      Object.values(data.binding).forEach(id => b.check(identity(id), '/binding'));
      b.check(!(data.binding.modelFlag && data.binding.modelUi), '/binding', 'one model owner only');
    }
  }
  return b.finish();
}

export function validateLessonLinks(config, manifest, adapter) {
  if (manifest.id !== config.id || JSON.stringify(manifest.sections.map(section => section.id)) !== JSON.stringify(config.sectionOrder)
    || manifest.sections.at(-1).id !== config.referenceId || adapter.id !== config.id || adapter.key !== config.storageKey
    || JSON.stringify(adapter.sections) !== JSON.stringify(config.sectionOrder)) throw new Error('Lesson/config/adapter identities or section order do not match');
  return true;
}
