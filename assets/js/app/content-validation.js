// MIT. Keep shape checks aligned with schemas/reference.schema.json.
import { resolveContentUrl } from './content-loader.js';

export const markdownSourcePattern = '^[A-Za-z0-9_.-]+(/[A-Za-z0-9_.-]+)*\\.md$';
const nonempty = value => typeof value === 'string' && /\S/.test(value);
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const accents = ['teal', 'green', 'orange', 'purple', 'blue'];

// Also used alongside JSON Schema by development validation: unique IDs and
// root containment are cross-property/contextual constraints, not schema repair.
export function referenceSemanticErrors(data, { declaringUrl, allowedRootUrl } = {}) {
  const errors = [];
  const ids = new Set([data?.id]);
  if (!Array.isArray(data?.items)) return errors;
  data.items.forEach((item, index) => {
    if (!object(item)) return;
    if (ids.has(item.id)) errors.push(`/items/${index}/id: duplicate ID`);
    ids.add(item.id);
    if (declaringUrl && allowedRootUrl) {
      try { resolveContentUrl(item.source, declaringUrl, allowedRootUrl); }
      catch { errors.push(`/items/${index}/source: unsafe content path`); }
    }
  });
  return errors;
}

export function validateReferenceDocument(data, context = {}) {
  const errors = [];
  const fields = (value, keys, path) => {
    if (!object(value)) { errors.push(`${path}: expected object`); return false; }
    for (const key of keys) if (!Object.hasOwn(value, key)) errors.push(`${path}/${key}: required`);
    for (const key of Object.keys(value)) if (!keys.includes(key)) errors.push(`${path}: unknown property`);
    return true;
  };
  if (fields(data, ['schemaVersion', 'id', 'title', 'layout', 'items'], '')) {
    if (data.schemaVersion !== 1) errors.push('/schemaVersion: expected 1');
    if (!['stacked-reference', 'middle-reference'].includes(data.layout)) errors.push('/layout: unsupported layout');
    for (const key of ['id', 'title']) if (!nonempty(data[key])) errors.push(`/${key}: nonempty text required`);
    if (!Array.isArray(data.items) || data.items.length < 1) errors.push('/items: nonempty array required');
    else data.items.forEach((item, i) => {
      const path = `/items/${i}`;
      if (!fields(item, ['id', 'number', 'title', 'accent', 'source'], path)) return;
      for (const key of ['id', 'number', 'title']) if (!nonempty(item[key])) errors.push(`${path}/${key}: nonempty text required`);
      if (!accents.includes(item.accent)) errors.push(`${path}/accent: unsupported accent`);
      if (typeof item.source !== 'string' || !new RegExp(markdownSourcePattern).test(item.source)) errors.push(`${path}/source: local Markdown path required`);
    });
    errors.push(...referenceSemanticErrors(data, context));
  }
  if (errors.length) throw new Error(errors.join('; '));
  return true;
}
