// MIT. A single, explicit writer. Last writer wins; no cross-tab merge is promised.
import { isRecord, copy, equal } from './legacy-progress.js';

export function progressRecordErrors(value) {
  if (!isRecord(value)) return ['record'];
  const errors = [];
  if (!Array.isArray(value.completed) || value.completed.some(item => !Number.isInteger(item) || item < 0)) errors.push('completed');
  if (!isRecord(value.data)) errors.push('data');
  return errors;
}
const warning = (code, path, message, blocking = false) => ({ code, path, message, blocking });
export function openProgress({ storage, key, adapter }) {
  if (key !== adapter.key) throw new TypeError('Progress key must match the statically imported adapter.');
  let raw = null, original = adapter.emptyRecord?.() ?? { completed: [], data: {} }, canPersist = adapter.persistent !== false;
  const diagnostics = [];
  try {
    if (adapter.persistent === false) storage = { getItem: () => null };
    // Access the global getter inside the guarded boundary (it can itself throw).
    storage = storage === undefined ? globalThis.localStorage : storage;
    raw = storage.getItem(key);
    if (raw !== null) {
      try { original = JSON.parse(raw); }
      catch {
        canPersist = false;
        diagnostics.push(warning('invalid-json', 'record', 'Saved progress cannot be read. It will not be overwritten; changes remain available in this session.', true));
      }
      if (canPersist) {
        for (const path of (adapter.recordErrors || progressRecordErrors)(original)) diagnostics.push(warning('invalid-record', path, `Saved progress at ${path} is invalid. It will not be overwritten; changes remain available in this session.`, true));
        diagnostics.push(...adapter.diagnose(original));
        if (diagnostics.some(item => item.blocking)) canPersist = false;
      }
    }
  } catch {
    canPersist = false;
    diagnostics.push(warning('storage-unavailable', 'storage', 'Progress storage is unavailable. Changes remain available in this session only.', true));
  }
  let state = adapter.decode(original);
  // Original bytes are never written during hydration, even for usable partial state.
  const notify = () => ({ state: copy(state), diagnostics: copy(diagnostics), canPersist });
  function save(next) {
    const retained = adapter.retainCredit(next, state);
    const changed = !equal(state, retained);
    state = retained;
    if (!canPersist) return { ...notify(), persisted: false, changed, written: false };
    const partial = adapter.diagnoseChanges(state, original);
    for (let i = diagnostics.length - 1; i >= 0; i--) if (diagnostics[i].code === 'unsupported-ui-change') diagnostics.splice(i, 1);
    diagnostics.push(...partial);
    let encoded, serialized;
    try {
      encoded = adapter.encode(state, original);
      // Semantic comparison also avoids reformatting someone else's existing JSON.
      if (equal(encoded, original)) return { ...notify(), persisted: partial.length === 0, changed, written: false };
      serialized = JSON.stringify(encoded);
    } catch (error) {
      const code = error.code === 'unsupported-ui-version' ? error.code : 'encode-failed';
      if (!diagnostics.some(item => item.code === code)) diagnostics.push(warning(code, 'record', 'Some progress could not be encoded safely. Your saved record is unchanged; changes remain available in this session.'));
      return { ...notify(), persisted: false, changed, written: false };
    }
    try {
      storage.setItem(key, serialized);
      raw = serialized;
      original = encoded;
      // A quota/permission failure is retryable on a later meaningful save.
      for (let i = diagnostics.length - 1; i >= 0; i--) if (diagnostics[i].code === 'save-failed') diagnostics.splice(i, 1);
      return { ...notify(), persisted: partial.length === 0, changed, written: true };
    } catch {
      if (!diagnostics.some(item => item.code === 'save-failed')) diagnostics.push(warning('save-failed', 'storage', 'Progress could not be saved. Changes remain available in this session; try again when storage is available.'));
      return { ...notify(), persisted: false, changed, written: false };
    }
  }
  return Object.freeze({ get state() { return copy(state); }, get diagnostics() { return copy(diagnostics); },
    get canPersist() { return canPersist; }, get originalRaw() { return raw; }, save });
}
