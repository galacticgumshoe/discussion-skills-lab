// MIT. The only new lesson writer. No live entry adopts this until a whole-lesson cutover.
import { loadJson, resolveContentUrl } from './content-loader.js';
import { validateLessonConfig, validateLessonManifest, validateLessonLinks } from './lesson-validation.js';
import { openProgress } from './progress-store.js';
import { mountNavigation } from './lesson-core.js';
import { applyCompletion } from './completion.js';
import { renderSections, standardActivityRegistry, validateRegistry } from './section-renderer.js';

const mounts = new WeakSet();
const writers = new Map();
export function mountLesson(root, { configUrl, adapter, completionPolicy, registry = standardActivityRegistry }) {
  if (mounts.has(root)) throw new TypeError('Lesson is already mounted. Destroy it before remounting.');
  validateRegistry(registry);
  if (!adapter || !completionPolicy || Object.values(completionPolicy).some(policy => typeof policy !== 'function')) throw new TypeError('A statically imported adapter and completion policy are required');
  if (writers.has(adapter.key)) throw new TypeError('This lesson already has a mounted writer. Destroy it before remounting.');
  const status = root.querySelector('#lesson-status'), retry = root.querySelector('#lesson-retry'), warning = root.querySelector('#storage-warning');
  if (!status || !retry || !warning) throw new TypeError('Missing lesson loading/persistence hooks');
  mounts.add(root);
  writers.set(adapter.key, root);
  const abort = new AbortController(), siteRoot = new URL('./', root.ownerDocument.baseURI), allowedRootUrl = new URL('content/', siteRoot);
  let destroyed = false, loading = false, renderer, navigation, store;
  const showPersistence = () => { warning.textContent = store.diagnostics.map(item => item.message).join(' '); warning.hidden = !warning.textContent; };
  async function bootstrap() {
    if (destroyed || loading || renderer) return;
    loading = true; retry.hidden = true; status.hidden = false; status.textContent = 'Lesson is loading.';
    try {
      const url = resolveContentUrl(configUrl, root.ownerDocument.baseURI, siteRoot);
      const config = await loadJson(url, { signal: abort.signal, validate: value => validateLessonConfig(value, { declaringUrl: url, allowedRootUrl }) });
      if (url.href !== new URL(`lessons/${config.id}/config.json`, siteRoot).href) throw new Error('Unexpected config location');
      const manifestUrl = resolveContentUrl(config.content, url, allowedRootUrl);
      const manifest = await loadJson(manifestUrl, { signal: abort.signal, validate: value => validateLessonManifest(value, { declaringUrl: manifestUrl, allowedRootUrl }) });
      validateLessonLinks(config, manifest, adapter);
      if (Object.keys(completionPolicy).some(id => !config.sectionOrder.includes(id) || id === config.referenceId)) throw new Error('Completion policy has an unknown/reference section');
      if (destroyed) return;
      renderer = renderSections(root, { manifest, manifestUrl, allowedRootUrl, registry, getState: () => store.state,
        onChange(activity, entry, own) {
          const previous = store.state, next = store.state; entry.write(activity, next, own);
          const guarded = Object.fromEntries(Object.entries(completionPolicy).map(([id, gate]) => [id, state => renderer.isSectionReady(id) && gate(state) === true]));
          store.save(applyCompletion(previous, next, { sections: renderer.sections, completionPolicy: guarded }));
          renderer.update(store.state); navigation.update(store.state); showPersistence();
        }
      });
      // Reference access/loading is independent of activity preparation. Navigation
      // initially presents no earned credit; no activity behavior is attached yet.
      navigation = mountNavigation(root, { sections: renderer.sections, state: { completedSections: [] } });
      await renderer.prepared;
      if (destroyed) return;
      // openProgress owns guarded read/decode. All activity data has now validated
      // or failed independently; neither hydration nor a retry calls save.
      store = openProgress({ key: config.storageKey, adapter }); showPersistence();
      navigation.update(store.state); renderer.hydrate();
      await renderer.ready;
      if (!destroyed) status.hidden = true;
    } catch (error) {
      if (!destroyed) {
        navigation?.destroy(); renderer?.destroy(); navigation = renderer = undefined;
        status.hidden = false; status.textContent = `Lesson could not load (${error.message}). Retry; saved progress has not been changed.`; retry.hidden = false;
      }
    } finally { loading = false; }
  }
  retry.addEventListener('click', bootstrap);
  const ready = bootstrap();
  return Object.freeze({ ready,
    get state() { return store?.state; }, get diagnostics() { return store?.diagnostics || []; }, get navigation() { return navigation; },
    destroy() {
      if (destroyed) return;
      destroyed = true; abort.abort(); retry.removeEventListener('click', bootstrap); navigation?.destroy(); renderer?.destroy(); mounts.delete(root); writers.delete(adapter.key);
    }
  });
}
