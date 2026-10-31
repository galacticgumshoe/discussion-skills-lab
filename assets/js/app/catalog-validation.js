// MIT. A catalog supplies text/links, never executable module paths.
export function validateCatalog(data) {
  const object = value => value && typeof value === 'object' && !Array.isArray(value);
  const exact = (value, keys) => object(value) && Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value, key));
  if (!exact(data, ['schemaVersion', 'lessons']) || data.schemaVersion !== 1 || !Array.isArray(data.lessons) || !data.lessons.length) throw new Error('Invalid catalog version or shape');
  const ids = new Set();
  for (const item of data.lessons) {
    if (!exact(item, ['id', 'url', 'title', 'description']) || !/^[a-z][a-z0-9-]*$/.test(item.id) || ['constructor', 'prototype', '__proto__'].includes(item.id)
      || ids.has(item.id) || item.url !== `${item.id}.html` || !['title', 'description'].every(key => typeof item[key] === 'string' && /\S/.test(item[key]))) throw new Error('Invalid catalog lesson, URL or duplicate ID');
    ids.add(item.id);
  }
  return true;
}
