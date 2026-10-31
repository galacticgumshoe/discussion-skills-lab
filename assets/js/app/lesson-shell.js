// MIT. Structural UI only; validated instructional metadata supplies title/duration.
const mounts = new WeakSet();
export function mountLessonShell(root) {
  if (mounts.has(root) || root.querySelector('#layout,#lesson-status')) throw new TypeError('Lesson shell is already mounted');
  const document = root.ownerDocument, host = document.createElement('div');
  host.className = root.classList.contains('app-shell') ? 'lesson-shell' : 'app-shell';
  // This template is constant software markup, never content or student input.
  host.innerHTML = `<a class="dsl-skip" href="#lesson-main">Skip to main content</a>
    <header class="topbar" hidden><div class="dsl-header-inner"><div><div class="brand">DISCUSSION SKILLS LAB · MSHSL SPEECH</div><div class="dsl-header-title"></div></div><div class="dsl-duration"></div></div></header>
    <div class="dsl-layout" id="layout"><nav class="rail" id="rail" aria-label="Lesson sections" hidden>
      <button class="rail-toggle" id="rail-toggle" type="button" aria-expanded="true" aria-label="Collapse navigation">⇤</button>
      <div class="rail-progress"><div class="eyebrow">YOUR PROGRESS</div><div id="progress-text" aria-live="polite"></div>
      <div class="top-progress" id="progress-track" role="progressbar" aria-label="Completed lesson pages" aria-valuemin="0" aria-valuemax="0" aria-valuenow="0"><div id="progress-fill"></div></div><p class="dsl-rail-help"></p></div><div id="rail-links"></div></nav>
      <main class="dsl-content" id="lesson-main" tabindex="-1"><div class="mobile-nav" hidden><label for="section-select">Go to a section</label><select id="section-select"></select></div>
      <p id="nav-status" role="status" aria-live="polite"></p><p id="lesson-status" role="status">Lesson is loading.</p><button id="lesson-retry" type="button" hidden>Retry lesson</button><p id="storage-warning" role="status" hidden></p><div id="views"></div>
      <div class="bottom-controls" hidden><button class="secondary" id="previous-section" type="button">← Previous</button><button class="action" id="next-section" type="button">Next section →</button></div></main></div>`;
  root.append(host); mounts.add(root);
  const skipLink = host.querySelector('.dsl-skip');
  const skip = event => {
    // Focus without adding a fragment/routing state to the lesson's public URL.
    event.preventDefault();
    const main = host.querySelector('#lesson-main');
    main.focus({preventScroll: true}); main.scrollIntoView({block: 'start', behavior: 'auto'});
  };
  skipLink.addEventListener('click', skip);
  let configured = false;
  return Object.freeze({
    configure(manifest) {
      if (configured) return;
      if (typeof manifest.title !== 'string' || typeof manifest.duration !== 'string' || !Array.isArray(manifest.sections)) throw new TypeError('Validated shell metadata is required');
      const count = manifest.sections.filter(section => !section.reference).length;
      host.querySelector('.dsl-header-title').textContent = manifest.title;
      host.querySelector('.dsl-duration').textContent = manifest.duration;
      const previous = host.querySelector('#previous-section'), next = host.querySelector('#next-section');
      if (['middle', 'final'].includes(manifest.id)) {
        previous.textContent = '← Back'; previous.className = manifest.id === 'final' ? 'btn outline' : 'btn'; next.className = 'btn primary';
      }
      host.querySelector('#progress-text').textContent = `0 of ${count} pages completed`;
      host.querySelector('#progress-track').setAttribute('aria-valuemax', String(count));
      host.querySelector('.dsl-rail-help').textContent = manifest.id === 'final'
        ? 'Finish each activity to unlock the next page. Quick Reference is always available.'
        : 'Finish each activity to unlock the next page. Quick reference is always available.';
      for (const selector of ['header', 'nav', '.mobile-nav', '.bottom-controls']) host.querySelector(selector).hidden = false;
      configured = true;
    },
    destroy() { skipLink.removeEventListener('click', skip); host.remove(); mounts.delete(root); }
  });
}
