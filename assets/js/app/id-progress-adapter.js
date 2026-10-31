// MIT. Only for new modules: never substitute this adapter for a legacy v1 codec.
import { isRecord, copy } from './legacy-progress.js';
const id = value => typeof value === 'string' && /^[a-z][a-z0-9-]*$/.test(value) && !['constructor', 'prototype', '__proto__'].includes(value);
export function idProgressErrors(raw) {
  if (!isRecord(raw)) return ['record'];
  const errors = [];
  if (raw.schemaVersion !== 1) errors.push('schemaVersion');
  if (!Array.isArray(raw.completedSections) || raw.completedSections.some(value => !id(value)) || new Set(raw.completedSections).size !== raw.completedSections.length) errors.push('completedSections');
  if (!isRecord(raw.activities) || Object.values(raw.activities).some(value => !isRecord(value))) errors.push('activities');
  for (const [key, type] of [['fields', 'string'], ['flags', 'boolean'], ['ui', undefined]]) {
    if (!isRecord(raw[key]) || type && Object.values(raw[key]).some(value => typeof value !== type)) errors.push(key);
  }
  return errors;
}
const merge = (base, next) => Object.fromEntries([...new Set([...Object.keys(base), ...Object.keys(next)])].map(key => [key,
  Object.hasOwn(next, key) ? isRecord(base[key]) && isRecord(next[key]) ? merge(base[key], next[key]) : copy(next[key]) : copy(base[key])
]));
const matches = (value, template) => Array.isArray(template) ? Array.isArray(value) && value.every(item => typeof item === 'string')
  : isRecord(template) ? isRecord(value) && Object.entries(template).every(([key, own]) => !Object.hasOwn(value, key) || matches(value[key], own))
    && (Object.keys(template).length > 0 || Object.values(value).every(item => typeof item === 'string'))
  : typeof value === typeof template;

export function createIdProgressAdapter({ id: moduleId, sections, defaults = {}, persistent = true }) {
  if (!id(moduleId) || ['opening', 'middle', 'final', 'opening-stage'].includes(moduleId) || !Array.isArray(sections) || !sections.length || sections.some(section => !id(section)) || new Set(sections).size !== sections.length) throw new TypeError('A fresh module identity and unique section IDs are required');
  const initial = {completedSections: [], activities: {}, fields: {}, flags: {}, ui: {}, ...copy(defaults)};
  if (idProgressErrors({schemaVersion: 1, ...initial}).length) throw new TypeError('Invalid normalized defaults');
  const decode = raw => {
    const state = copy(initial);
    if (!isRecord(raw)) return state;
    if (Array.isArray(raw.completedSections)) state.completedSections = [...new Set(raw.completedSections.filter(value => sections.slice(0, -1).includes(value)))];
    for (const key of ['fields', 'flags', 'ui', 'activities']) if (isRecord(raw[key])) {
      for (const [name, template] of Object.entries(initial[key])) if (Object.hasOwn(raw[key], name) && matches(raw[key][name], template)) state[key][name] = isRecord(template) ? merge(template, raw[key][name]) : copy(raw[key][name]);
    }
    return state;
  };
  return Object.freeze({id: moduleId, key: persistent ? `dsl:${moduleId}:v1` : null, sections: [...sections], persistent,
    emptyRecord: () => ({schemaVersion: 1, ...copy(initial)}), recordErrors: idProgressErrors, decode,
    diagnose(raw) {
      if (!isRecord(raw) || !isRecord(raw.activities)) return [];
      return Object.entries(initial.activities).filter(([name, template]) => Object.hasOwn(raw.activities, name) && !matches(raw.activities[name], template)).map(([name]) => ({code: 'invalid-activity-state', path: `activities.${name}`, blocking: true, message: 'Saved activity state is invalid. Your record will not be overwritten; changes remain session-only.'}));
    },
    diagnoseChanges: () => [],
    retainCredit(next, previous) { const retained = copy(next); retained.completedSections = [...new Set([...previous.completedSections, ...next.completedSections])]; return retained; },
    encode(state, original) {
      if (idProgressErrors({schemaVersion: 1, ...state}).length) throw new TypeError('Invalid normalized state');
      const encoded = merge(isRecord(original) ? original : {}, {schemaVersion: 1, ...copy(state)});
      encoded.completedSections = [...new Set([...(Array.isArray(original?.completedSections) ? original.completedSections.filter(id) : []), ...state.completedSections])];
      return encoded;
    }
  });
}
