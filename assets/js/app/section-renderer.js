// MIT. Bounded composition only. Components retain their verified own-state APIs.
import { loadJson, loadMarkdown, resolveContentUrl } from './content-loader.js';
import { validateActivity, validateLessonManifest, activityTypes, activityBodySources } from './lesson-validation.js';
import { renderMarkdown } from './markdown.js';
import { mountReference } from './reference-loader.js';
import { mountFlashcards } from '../components/flashcards.js';
import { mountExpandables } from '../components/expandables.js';
import { mountMultipleChoice } from '../components/multiple-choice.js';
import { mountQuestionSequence } from '../components/question-sequence.js';
import { mountWritingActivity } from '../components/writing-activity.js';
import { mountChecklist } from '../components/checklist.js';
import { mountNoteClassification } from '../activities/note-classification.js';
import { mountTaskAnalysis } from '../activities/task-analysis.js';

const copy = value => JSON.parse(JSON.stringify(value));
const activityEntry = mount => Object.freeze({ mount,
  read: (activity, state) => {
    const own = state.activities[activity.id];
    if (!own) throw new Error('Activity has no statically imported progress binding');
    const arrays = { flashcards: ['exploredIds', 'backIds'], expandables: ['exploredIds', 'openIds'], checklist: ['checkedIds'], 'note-classification': ['earnedNoteIds'], 'task-analysis': ['exploredIds'], 'multiple-choice': ['earnedQuestionIds'], 'question-sequence': ['earnedQuestionIds'] }[activity.type];
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
  writing: writingEntry, checklist: activityEntry(mountChecklist), 'note-classification': activityEntry(mountNoteClassification), 'task-analysis': activityEntry(mountTaskAnalysis)
});
export function validateRegistry(registry) {
  if (!registry || Object.keys(registry).some(type => !activityTypes.includes(type)) || Object.values(registry).some(entry =>
    !entry || ['mount', 'read', 'write'].some(key => typeof entry[key] !== 'function'))) throw new TypeError('Registry must contain statically imported standard activity entries only');
}

// Manifest is already validated. The caller owns shell hooks, state, gates and saves.
export function renderSections(root, { manifest, manifestUrl, allowedRootUrl, registry, getState, onChange, onNavigate = () => {}, revealPolicy = () => ({}) }) {
  validateRegistry(registry);
  validateLessonManifest(manifest, { declaringUrl: manifestUrl, allowedRootUrl });
  const document = root.ownerDocument, container = root.querySelector('#views');
  if (!container) throw new TypeError('Missing section container');
  const node = (tag, text) => { const element = document.createElement(tag); if (text !== undefined) element.textContent = text; return element; };
  const abort = new AbortController(), references = [], jobs = [], preparations = [], controllers = new Map(), reveals = [], summaries = [];
  let releaseHydration;
  const hydrated = new Promise(resolve => { releaseHydration = resolve; });
  const sources = new Map(manifest.activities.map(activity => [activity.id, activity.source]));
  let destroyed = false;
  const sections = manifest.sections.map((section, index) => {
    const view = node('section'), heading = node(`h${section.headingLevel}`, section.heading);
    view.className = 'view lesson-view'; view.id = `view-${index}`; view.dataset.sectionId = section.id;
    heading.id = section.headingId || `section-${section.id}-heading`; view.setAttribute('aria-labelledby', heading.id);
    heading.className = index === 0 ? 'display' : '';
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
        if (block.revealId) { group.dataset.revealId = block.revealId; group.hidden = true; reveals.push({ group, id: block.revealId }); }
      } else if (block.type === 'reference') {
        const reference = node('div'), content = node('div'), status = node('p'), retry = node('button', 'Retry Quick Reference'), print = node('button', block.printLabel || 'Print Quick Reference');
        content.dataset.referenceContent = ''; status.dataset.referenceStatus = ''; status.setAttribute('role', 'status');
        retry.dataset.referenceRetry = ''; print.dataset.referencePrint = ''; retry.type = print.type = 'button'; retry.hidden = true; print.disabled = true;
        if (manifest.id === 'final') {
          reference.className = 'final-reference-sheet'; reference.id = 'quick-reference';
          const header = node('div'), printWrap = node('div'); header.className = 'final-reference-header'; printWrap.className = 'print-hide';
          print.id = 'ref-print'; print.className = 'btn secondary final-print-button'; printWrap.append(print);
          header.append(printWrap, section.heading); reference.append(header, status, retry, content);
          content.id = 'ref-content'; content.className = 'final-reference-content'; status.id = 'reference-status'; retry.id = 'reference-retry';
        } else if (manifest.id === 'opening') {
          reference.id = 'quick-reference'; reference.className = 'card opening-reference-sheet';
          print.className = 'secondary'; content.id = 'reference-content';
          reference.append(print, section.heading, status, retry, content);
        } else reference.append(print, status, retry, content);
        parent.append(reference);
        references.push(mountReference(reference, { source: block.source, declaringUrl: manifestUrl, allowedRootUrl }));
      } else if (block.type === 'progress') {
        const summary = node('div'), score = node('p'), progress = node('p');
        summary.className = 'dsl-progress-summary'; score.className = 'dsl-summary-score';
        summary.append(score, progress); parent.append(summary); summaries.push({ block, score, progress });
      } else if (block.type === 'navigation') {
        const actions = node('div'); actions.className = 'dsl-summary-actions';
        block.actions.forEach(action => {
          const button = node('button', action.label); button.type = 'button'; button.dataset.sectionTarget = action.sectionId;
          button.addEventListener('click', () => onNavigate(action.sectionId), { signal: abort.signal }); actions.append(button);
        });
        parent.append(actions);
      } else if (block.type === 'markdown') {
        loadable(parent, section, async content => {
          if (block.textStyle) content.classList.add(`dsl-prose-${block.textStyle}`);
          if (block.textStyle === 'symbol') content.setAttribute('aria-hidden', 'true');
          const url = resolveContentUrl(block.source, manifestUrl, allowedRootUrl), source = await loadMarkdown(url, { signal: abort.signal });
          if (!destroyed) {
            const fragment = renderMarkdown(source, { baseUrl: url });
            if (block.headingId) {
              const headings = fragment.querySelectorAll('h3');
              if (headings.length !== 1) throw new Error('A preserved heading ID requires exactly one subordinate heading');
              headings[0].id = block.headingId;
            }
            content.replaceChildren(fragment);
          }
        });
      } else {
        loadable(parent, section, async (content, prepared) => {
          const { activity, bodies } = prepared;
          if (destroyed) return;
          const entry = registry[activity.type];
          if (!entry) throw new Error('Activity type is unavailable in the static registry');
          const host = node('div'); host.dataset.activityId = activity.id;
          const state = entry.read(activity, getState()); content.replaceChildren(host);
          let controller;
          try { controller = entry.mount(host, { data: activity.data, profile: activity.profile, bodies, state, onChange: own => { if (!destroyed) onChange(activity, entry, copy(own)); } }); }
          catch (error) { host.remove(); throw error; }
          controllers.set(activity.id, { controller, activity, entry });
        }, async () => {
          const url = resolveContentUrl(sources.get(block.activityId), manifestUrl, allowedRootUrl);
          const activity = await loadJson(url, { signal: abort.signal, validate: data => validateActivity(data, { activityId: block.activityId, declaringUrl: url, allowedRootUrl }) });
          const bodies = new Map();
          const bodySources = activityBodySources(activity);
          await Promise.all(bodySources.map(async source => {
            const bodyUrl = resolveContentUrl(source, url, allowedRootUrl);
            const fragment = renderMarkdown(await loadMarkdown(bodyUrl, { signal: abort.signal }), { baseUrl: bodyUrl });
            // Native card buttons contain phrasing content only. Preserve prose/list
            // semantics and emphasis without invalid nested block elements.
            if (activity.type === 'flashcards') for (const element of [...fragment.querySelectorAll('p,ul,ol,li,h1,h2,h3,h4,blockquote')].reverse()) {
              const span = node('span'); span.className = `dsl-prose-${element.localName}`;
              if (['ul', 'ol'].includes(element.localName)) span.setAttribute('role', 'list');
              if (element.localName === 'li') span.setAttribute('role', 'listitem');
              span.append(...element.childNodes); element.replaceWith(span);
            }
            bodies.set(source, fragment);
          }));
          return { activity, bodies };
        });
      }
    }
  }
  sections.forEach(section => blocks(section.view, section.blocks, section));
  return Object.freeze({ sections,
    prepared: Promise.allSettled(preparations),
    hydrate() { updateReveals(getState()); releaseHydration(); },
    ready: Promise.all([...jobs.map(job => job.ready), ...references.map(reference => reference.ready)]),
    isSectionReady: id => jobs.filter(job => job.sectionId === id).every(job => job.loaded),
    update(state) { if (!destroyed) { updateReveals(state); controllers.forEach(({ controller, activity, entry }) => controller.update(entry.read(activity, state))); } },
    destroy() {
      if (destroyed) return;
      destroyed = true; abort.abort(); releaseHydration(); jobs.forEach(job => job.destroy()); references.forEach(reference => reference.destroy());
      controllers.forEach(({ controller }) => controller.destroy()); sections.forEach(section => section.view.remove());
    }
  });
  function updateReveals(state) {
    const visible = revealPolicy(state);
    reveals.forEach(({ group, id }) => { group.hidden = visible[id] !== true; });
    summaries.forEach(({ block, score, progress }) => {
      const earned = state.activities[block.activityId]?.earnedQuestionIds || [];
      score.textContent = block.scorePrefix + block.questionIds.filter(id => earned.includes(id)).length + block.scoreSeparator + block.questionIds.length;
      progress.textContent = sections.filter(section => !section.reference && state.completedSections.includes(section.id)).length + block.progressSuffix;
    });
  }
}
