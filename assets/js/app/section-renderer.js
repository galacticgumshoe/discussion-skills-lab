// MIT. Bounded composition only. Components retain their verified own-state APIs.
import { loadJson, loadMarkdown, resolveContentUrl } from './content-loader.js';
import { validateActivity, validateLessonManifest, activityTypes } from './lesson-validation.js';
import { renderMarkdown } from './markdown.js';
import { mountReference } from './reference-loader.js';
import { mountFlashcards } from '../components/flashcards.js';
import { mountExpandables } from '../components/expandables.js';
import { mountMultipleChoice } from '../components/multiple-choice.js';
import { mountQuestionSequence } from '../components/question-sequence.js';
import { mountWritingActivity } from '../components/writing-activity.js';
import { mountChecklist } from '../components/checklist.js';

const copy = value => JSON.parse(JSON.stringify(value));
const activityEntry = mount => Object.freeze({ mount,
  read: (activity, state) => {
    const own = state.activities[activity.id];
    if (!own) throw new Error('Activity has no statically imported progress binding');
    const arrays = { flashcards: ['exploredIds', 'backIds'], expandables: ['exploredIds', 'openIds'], checklist: ['checkedIds'], 'multiple-choice': ['earnedQuestionIds'], 'question-sequence': ['earnedQuestionIds'] }[activity.type];
    if (arrays.some(key => !Array.isArray(own[key])) || (activity.type.includes('choice') || activity.type === 'question-sequence') && (!own.selections || typeof own.selections !== 'object')) throw new Error('Activity progress binding has the wrong state type');
    return copy(own);
  },
  write: (activity, state, own) => { state.activities[activity.id] = copy(own); }
});
const writingEntry = Object.freeze({ mount: mountWritingActivity,
  read(activity, state) {
    const binding = activity.binding || {}, fields = [...activity.data.fields, ...(activity.data.output ? [activity.data.output] : [])];
    if (fields.some(field => !Object.hasOwn(state.fields, field.id)) || [binding.assembledFlag, binding.modelFlag].some(id => id && !Object.hasOwn(state.flags, id))) throw new Error('Writing has no statically imported progress binding');
    return { fields: Object.fromEntries(fields.map(field => [field.id, state.fields[field.id]])), assembled: !!state.flags[binding.assembledFlag],
      modelVisible: binding.modelFlag ? !!state.flags[binding.modelFlag] : !!state.ui[binding.modelUi] };
  },
  write(activity, state, own) {
    const binding = activity.binding || {};
    for (const field of [...activity.data.fields, ...(activity.data.output ? [activity.data.output] : [])]) state.fields[field.id] = own.fields[field.id];
    if (binding.assembledFlag) state.flags[binding.assembledFlag] = own.assembled;
    if (binding.modelFlag) state.flags[binding.modelFlag] = own.modelVisible;
    if (binding.modelUi) state.ui[binding.modelUi] = own.modelVisible;
  }
});
export const standardActivityRegistry = Object.freeze({
  flashcards: activityEntry(mountFlashcards), expandables: activityEntry(mountExpandables),
  'multiple-choice': activityEntry(mountMultipleChoice), 'question-sequence': activityEntry(mountQuestionSequence),
  writing: writingEntry, checklist: activityEntry(mountChecklist)
});
export function validateRegistry(registry) {
  if (!registry || Object.keys(registry).some(type => !activityTypes.includes(type)) || Object.values(registry).some(entry =>
    !entry || ['mount', 'read', 'write'].some(key => typeof entry[key] !== 'function'))) throw new TypeError('Registry must contain statically imported standard activity entries only');
}

// Manifest is already validated. The caller owns shell hooks, state, gates and saves.
export function renderSections(root, { manifest, manifestUrl, allowedRootUrl, registry, getState, onChange }) {
  validateRegistry(registry);
  validateLessonManifest(manifest, { declaringUrl: manifestUrl, allowedRootUrl });
  const document = root.ownerDocument, container = root.querySelector('#views');
  if (!container) throw new TypeError('Missing section container');
  const node = (tag, text) => { const element = document.createElement(tag); if (text !== undefined) element.textContent = text; return element; };
  const abort = new AbortController(), references = [], jobs = [], preparations = [], controllers = new Map();
  let releaseHydration;
  const hydrated = new Promise(resolve => { releaseHydration = resolve; });
  const sources = new Map(manifest.activities.map(activity => [activity.id, activity.source]));
  let destroyed = false;
  const sections = manifest.sections.map((section, index) => {
    const view = node('section'), heading = node(`h${section.headingLevel}`, section.heading);
    view.className = 'lesson-view'; view.id = `view-${index}`; view.dataset.sectionId = section.id;
    heading.id = `section-${section.id}-heading`; view.setAttribute('aria-labelledby', heading.id);
    view.hidden = true;
    if (section.eyebrow) view.append(node('p', section.eyebrow));
    view.append(heading); container.append(view);
    if (section.reference) view.dataset.referenceView = '';
    return { ...section, view, heading };
  });
  function loadable(parent, section, task, prepare) {
    const wrapper = node('div'), status = node('p'), retry = node('button', 'Retry content'), content = node('div');
    wrapper.className = 'dsl-content-block'; status.setAttribute('role', 'status'); status.dataset.contentStatus = '';
    retry.type = 'button'; retry.dataset.contentRetry = ''; retry.hidden = true; wrapper.append(status, retry, content); parent.append(wrapper);
    const job = { sectionId: section.id, loaded: false, loading: false };
    let first = true;
    const initialPreparation = prepare?.();
    if (prepare) preparations.push(initialPreparation);
    const load = async () => {
      if (destroyed || job.loading || job.loaded) return;
      job.loading = true; retry.hidden = true; status.hidden = false; status.textContent = 'Content is loading.'; content.setAttribute('aria-busy', 'true');
      try {
        const preparation = first ? initialPreparation : prepare?.(); first = false;
        const data = await preparation;
        if (prepare) await hydrated;
        if (destroyed) return;
        await task(content, data);
        if (!destroyed) { job.loaded = true; status.hidden = true; }
      } catch (error) {
        if (!destroyed) { status.textContent = `Content could not load (${error.message}). Retry; saved work is preserved. Quick Reference remains available.`; retry.hidden = false; }
      } finally { job.loading = false; if (!destroyed) content.setAttribute('aria-busy', 'false'); }
    };
    job.destroy = () => retry.removeEventListener('click', load);
    retry.addEventListener('click', load); jobs.push(job); job.ready = load();
  }
  function blocks(parent, items, section) {
    for (const block of items) {
      if (block.type === 'group') {
        const group = node('div'); group.className = `dsl-block-group dsl-layout-${block.layout} dsl-tone-${block.tone}`; parent.append(group); blocks(group, block.blocks, section);
      } else if (block.type === 'reference') {
        const reference = node('div'), content = node('div'), status = node('p'), retry = node('button', 'Retry Quick Reference'), print = node('button', 'Print Quick Reference');
        content.dataset.referenceContent = ''; status.dataset.referenceStatus = ''; status.setAttribute('role', 'status');
        retry.dataset.referenceRetry = ''; print.dataset.referencePrint = ''; retry.type = print.type = 'button'; retry.hidden = true; print.disabled = true;
        reference.append(print, status, retry, content); parent.append(reference);
        references.push(mountReference(reference, { source: block.source, declaringUrl: manifestUrl, allowedRootUrl }));
      } else if (block.type === 'markdown') {
        loadable(parent, section, async content => {
          const url = resolveContentUrl(block.source, manifestUrl, allowedRootUrl), source = await loadMarkdown(url, { signal: abort.signal });
          if (!destroyed) content.replaceChildren(renderMarkdown(source, { baseUrl: url }));
        });
      } else {
        loadable(parent, section, async (content, activity) => {
          if (destroyed) return;
          const entry = registry[activity.type];
          if (!entry) throw new Error('Activity type is unavailable in the static registry');
          const host = node('div'); host.dataset.activityId = activity.id;
          const state = entry.read(activity, getState()); content.replaceChildren(host);
          let controller;
          try { controller = entry.mount(host, { data: activity.data, profile: activity.profile, state, onChange: own => { if (!destroyed) onChange(activity, entry, copy(own)); } }); }
          catch (error) { host.remove(); throw error; }
          controllers.set(activity.id, { controller, activity, entry });
        }, () => {
          const url = resolveContentUrl(sources.get(block.activityId), manifestUrl, allowedRootUrl);
          return loadJson(url, { signal: abort.signal, validate: data => validateActivity(data, { activityId: block.activityId }) });
        });
      }
    }
  }
  sections.forEach(section => blocks(section.view, section.blocks, section));
  return Object.freeze({ sections,
    prepared: Promise.allSettled(preparations),
    hydrate() { releaseHydration(); },
    ready: Promise.all([...jobs.map(job => job.ready), ...references.map(reference => reference.ready)]),
    isSectionReady: id => jobs.filter(job => job.sectionId === id).every(job => job.loaded),
    update(state) { if (!destroyed) controllers.forEach(({ controller, activity, entry }) => controller.update(entry.read(activity, state))); },
    destroy() {
      if (destroyed) return;
      destroyed = true; abort.abort(); releaseHydration(); jobs.forEach(job => job.destroy()); references.forEach(reference => reference.destroy());
      controllers.forEach(({ controller }) => controller.destroy()); sections.forEach(section => section.view.remove());
    }
  });
}
