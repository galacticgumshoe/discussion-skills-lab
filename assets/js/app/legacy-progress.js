// MIT. Fixed-table v1 codecs; no content loading, DOM lookup, or storage access.
export const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
export const copy = value => JSON.parse(JSON.stringify(value));
export function equal(a, b) {
  if (a === b) return true;
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object' || Array.isArray(a) !== Array.isArray(b)) return false;
  const keys = Object.keys(a);
  return keys.length === Object.keys(b).length && keys.every(key => Object.hasOwn(b, key) && equal(a[key], b[key]));
}
function read(root, path) {
  let value = root;
  for (let i = 0; i < path.length; i++) {
    if (!isRecord(value) && !Array.isArray(value)) return { invalid: path.slice(0, i).join('.') };
    if (!Object.hasOwn(value, path[i])) return {};
    value = value[path[i]];
  }
  return { exists: true, value };
}
function put(root, path, value, arrays = []) {
  let target = root;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!Object.hasOwn(target, key) || (!isRecord(target[key]) && !Array.isArray(target[key]))) {
      const array = arrays.find(item => equal(item.path, path.slice(0, i + 1)));
      target[key] = array ? Array(array.length).fill(null) : typeof path[i + 1] === 'number' ? [] : {};
    }
    target = target[key];
  }
  target[path.at(-1)] = copy(value);
}
const unique = values => [...new Set(values)];
export const indexed = ids => ids.map((id, value) => [value, id]);
export const keyed = values => Object.entries(values);
export const activityPath = (id, property) => ['activities', id, property];
export function collection(path, activity, property, entries, monotonic = true) {
  return { path, target: activityPath(activity, property), kind: 'collection', entries, monotonic };
}
export function selection(path, activity, question, options) {
  return { path, target: ['activities', activity, 'selections', question], kind: 'choice', entries: indexed(options) };
}
export function member(path, activity, property, id, monotonic = false) {
  return { path, target: activityPath(activity, property), kind: 'member', id, monotonic };
}
export const text = (path, id) => ({ path, target: ['fields', id], kind: 'text' });
export const flag = (path, id, monotonic = false) => ({ path, target: ['flags', id], kind: 'boolean', monotonic });
export const cursor = (path, activity, questions) => ({ path, target: activityPath(activity, 'currentQuestionId'), kind: 'cursor', entries: indexed(questions) });

function decodeValue(binding, value) {
  if (binding.kind === 'collection') return Array.isArray(value) ? unique(value.flatMap(item => binding.entries.filter(([legacy]) => legacy === item).map(([, id]) => id))) : [];
  if (binding.kind === 'choice' || binding.kind === 'cursor') return binding.entries.find(([legacy]) => legacy === value)?.[1];
  if (binding.kind === 'member' || binding.kind === 'boolean') return value === true;
  return typeof value === 'string' ? value : '';
}
function valid(binding, value) {
  if (value === null && binding.kind === 'choice') return true;
  if (binding.kind === 'collection') return Array.isArray(value) && value.every(item => binding.entries.some(([legacy]) => legacy === item));
  if (binding.kind === 'choice' || binding.kind === 'cursor') return binding.entries.some(([legacy]) => legacy === value);
  return typeof value === (binding.kind === 'text' ? 'string' : 'boolean');
}
function uiVersion(raw) {
  return read(raw, ['data', 'dslUi']).value;
}

/** Bindings are trusted, static JS, never instructional JSON. */
export function createLegacyAdapter({ id, key, sections, bindings, defaults, arrays = [], afterDecode, afterEncode }) {
  const completion = collection(['completed'], '', '', indexed(sections.slice(0, -1)));
  completion.target = ['completedSections'];
  const owned = [completion, ...bindings];
  function decode(raw) {
    const state = { completedSections: [], activities: {}, fields: {}, flags: {}, ui: {}, ...copy(defaults) };
    for (const binding of owned) {
      // An unknown extension version is opaque, including apparently familiar keys.
      if (binding.extension && uiVersion(raw)?.schemaVersion !== 1) continue;
      const found = read(raw, binding.path);
      if (!found.exists) continue;
      const value = decodeValue(binding, found.value);
      if (binding.kind === 'member') {
        const values = read(state, binding.target).value || [];
        put(state, binding.target, value ? unique([...values, binding.id]) : values.filter(id => id !== binding.id));
      } else if (value !== undefined) put(state, binding.target, value);
    }
    afterDecode?.(state, raw);
    return state;
  }
  function diagnose(raw) {
    const diagnostics = [];
    const report = (path, code = 'malformed-owned-progress', blocking = true) => {
      if (!diagnostics.some(item => item.path === path)) diagnostics.push({ code, path, blocking,
        message: blocking ? `Saved progress at ${path} is invalid. Your saved record will not be overwritten; changes remain available in this session.`
          : 'This saved UI format is newer than supported. Existing data is preserved; some new display choices may remain session-only.' });
    };
    const ui = uiVersion(raw);
    if (ui !== undefined && (!isRecord(ui) || ui.schemaVersion !== 1)) report('data.dslUi', 'unsupported-ui-version', false);
    for (const { path, length } of arrays) {
      const found = read(raw, path);
      if (found.exists && (!Array.isArray(found.value) || found.value.length !== length)) report(path.join('.'));
    }
    for (const binding of owned) {
      if (binding.extension && ui?.schemaVersion !== 1) continue;
      for (let i = 1; i < binding.path.length; i++) {
        const prefix = binding.path.slice(0, i), parent = read(raw, prefix);
        const expectsArray = arrays.some(item => equal(item.path, prefix));
        if (parent.exists && !(expectsArray ? Array.isArray(parent.value) : isRecord(parent.value))) report(prefix.join('.'));
      }
      const found = read(raw, binding.path);
      if (found.invalid) report(found.invalid);
      else if (found.exists && !valid(binding, found.value)) report(binding.path.join('.'));
    }
    return diagnostics;
  }
  function retainCredit(next, previous) {
    const result = copy(next);
    for (const binding of owned.filter(item => item.monotonic)) {
      if (binding.kind === 'boolean') {
        put(result, binding.target, read(previous, binding.target).value === true || read(result, binding.target).value === true);
        continue;
      }
      const before = read(previous, binding.target).value || [];
      const after = read(result, binding.target).value || [];
      put(result, binding.target, unique([...before, ...after]));
    }
    return result;
  }
  function encode(next, original = { completed: [], data: {} }) {
    const before = decode(original);
    const state = retainCredit(next, before);
    const output = copy(original);
    for (const binding of owned) {
      let value = read(state, binding.target).value;
      let prior = read(before, binding.target).value;
      if (binding.kind === 'member') {
        value = (value || []).includes(binding.id);
        prior = (prior || []).includes(binding.id);
      }
      if (equal(value, prior)) continue;
      if (binding.extension) {
        const ui = uiVersion(original);
        if (ui !== undefined && (!isRecord(ui) || ui.schemaVersion !== 1)) continue;
        put(output, ['data', 'dslUi', 'schemaVersion'], 1);
      }
      if (binding.kind === 'collection') {
        const originalValues = read(original, binding.path).value;
        // Keep untouched ordering and forward-compatible entries; never compact them.
        const values = Array.isArray(originalValues) ? originalValues.filter(item => {
          const entry = binding.entries.find(([legacy]) => legacy === item);
          return !entry || (value || []).includes(entry[1]);
        }) : [];
        for (const stable of value || []) {
          const entry = binding.entries.find(([, id]) => id === stable);
          if (entry && !values.includes(entry[0])) values.push(entry[0]);
        }
        value = values;
      } else if (binding.kind === 'choice' || binding.kind === 'cursor') {
        value = binding.entries.find(([, id]) => id === value)?.[0] ?? null;
      }
      if (value !== undefined) put(output, binding.path, value, arrays);
    }
    afterEncode?.(output, state, original);
    return output;
  }
  function diagnoseChanges(state, original) {
    const ui = uiVersion(original);
    if (ui === undefined || (isRecord(ui) && ui.schemaVersion === 1)) return [];
    const before = decode(original);
    return bindings.some(binding => binding.extension && !equal(read(state, binding.target).value, read(before, binding.target).value))
      ? [{ code: 'unsupported-ui-change', path: 'data.dslUi', blocking: false,
        message: 'This saved UI format is newer than supported. New display choices remain session-only; supported drafts and credit can still be saved.' }] : [];
  }
  return Object.freeze({ id, key, sections: Object.freeze([...sections]), decode, encode, diagnose, diagnoseChanges, retainCredit });
}
