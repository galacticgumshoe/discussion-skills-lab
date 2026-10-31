// MIT. Explicit-element navigation only. No storage, gate evaluation, or credit writer.
import { canVisitSection, unionCompletedSections } from './completion.js';

const mounts = new WeakSet();

export function mountNavigation(root, { sections, state }) {
  if (mounts.has(root)) throw new TypeError('Navigation is already mounted on this root. Destroy it before remounting.');
  if (!Array.isArray(sections) || sections.length < 1 || new Set(sections.map(section => section.id)).size !== sections.length
    || sections.filter(section => section.reference === true).length !== 1 || sections.at(-1).reference !== true) {
    throw new TypeError('Navigation needs unique ordered section IDs and one final reference.');
  }
  // Copy the supplied list, never enumerate .lesson-view or infer identities/order
  // from the DOM. An explicit heading overrides the first h1/h2/h3 in the view.
  const ordered = sections.map(section => {
    if (typeof section.id !== 'string' || !section.id || typeof section.label !== 'string'
      || typeof section.requirement !== 'string' || typeof section.reference !== 'boolean' || !root.contains(section.view)) {
      throw new TypeError('Each section needs an ID, label, requirement, reference role, and an existing view in this root.');
    }
    const heading = section.heading || section.view.querySelector('h1,h2,h3');
    if (!heading || !section.view.contains(heading) || !heading.matches('h1,h2,h3')) throw new TypeError('Each section needs an intended h1, h2, or h3 heading.');
    return { ...section, heading };
  });
  if (new Set(ordered.map(section => section.view)).size !== ordered.length) throw new TypeError('Section views must be distinct.');
  const hook = id => {
    const element = root.querySelector(`#${id}`);
    if (!element) throw new TypeError(`Missing navigation hook: ${id}.`);
    return element;
  };
  const layout = hook('layout'), rail = hook('rail-links'), select = hook('section-select'), toggle = hook('rail-toggle');
  const previous = hook('previous-section'), next = hook('next-section'), status = hook('nav-status');
  const progress = hook('progress-text'), track = hook('progress-track'), fill = hook('progress-fill');
  const shortcut = root.querySelector('#quick-reference-link');
  const counted = ordered.filter(section => !section.reference), reference = ordered.at(-1);
  const listeners = [], buttons = new Map(), options = new Map();
  const headingTabIndexes = new Map(ordered.map(section => [section.heading, section.heading.getAttribute('tabindex')]));
  let completed = [...state.completedSections], current = ordered[0].id, collapsed = false, destroyed = false;
  const listen = (element, event, handler) => {
    element.addEventListener(event, handler);
    listeners.push(() => element.removeEventListener(event, handler));
  };
  const canVisit = id => !destroyed && canVisitSection(ordered, completed, id);

  function render() {
    const count = counted.filter(section => completed.includes(section.id)).length;
    progress.textContent = `${count} of ${counted.length} pages completed`;
    track.setAttribute('aria-valuemin', '0');
    track.setAttribute('aria-valuemax', String(counted.length));
    track.setAttribute('aria-valuenow', String(count));
    fill.style.width = `${counted.length ? count / counted.length * 100 : 0}%`;
    for (const section of ordered) {
      const { button, mark } = buttons.get(section.id), active = current === section.id, allowed = canVisit(section.id);
      button.disabled = !allowed;
      button.classList.toggle('active', active);
      if (active) button.setAttribute('aria-current', 'step'); else button.removeAttribute('aria-current');
      mark.textContent = !section.reference && completed.includes(section.id) ? '✓' : !allowed ? '🔒' : '';
      options.get(section.id).disabled = !allowed;
      section.view.hidden = !active;
      section.view.classList.toggle('active', active);
    }
    select.value = current;
    const index = ordered.findIndex(section => section.id === current), isReference = current === reference.id;
    previous.hidden = next.hidden = isReference;
    previous.disabled = index === 0 || isReference;
    // Reference is always reachable by its shortcut/rail/select, but the last
    // counted page's bottom Next still requires that page's completion.
    const last = current === counted.at(-1)?.id;
    next.disabled = isReference || (last ? !completed.includes(current) : !canVisit(ordered[index + 1].id));
    next.textContent = last ? 'Open quick reference →' : 'Next section →';
    status.textContent = isReference ? 'Quick reference is always available.' : completed.includes(current)
      ? (last ? 'Knowledge check complete.' : 'Section complete. You can continue.') : ordered[index].requirement;
  }
  function go(id) {
    if (!canVisit(id)) { if (!destroyed) render(); return false; }
    current = id;
    render();
    const { heading } = ordered.find(section => section.id === id);
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
    root.ownerDocument.defaultView.scrollTo({ top: 0, behavior: 'auto' });
    return true;
  }
  function update(nextState) {
    if (destroyed) return;
    completed = unionCompletedSections(completed, nextState.completedSections);
    // Progress/selection feedback must not steal focus or reset scroll.
    render();
  }
  function showCollapse() {
    layout.classList.toggle('sidebar-collapsed', collapsed);
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.setAttribute('aria-label', collapsed ? 'Expand navigation' : 'Collapse navigation');
    toggle.textContent = collapsed ? '☰' : '⇤';
  }
  for (const section of ordered) {
    const button = root.ownerDocument.createElement('button');
    button.type = 'button'; button.className = 'rail-link'; button.dataset.go = section.id;
    const label = root.ownerDocument.createElement('span'); label.textContent = section.label;
    const mark = root.ownerDocument.createElement('span'); mark.className = 'mark'; mark.setAttribute('aria-hidden', 'true');
    button.append(label, mark); rail.append(button); buttons.set(section.id, { button, mark });
    const option = root.ownerDocument.createElement('option'); option.value = section.id; option.textContent = section.label;
    select.append(option); options.set(section.id, option);
    listen(button, 'click', () => go(section.id));
  }
  listen(select, 'change', () => go(select.value));
  if (shortcut) listen(shortcut, 'click', () => go(reference.id));
  listen(previous, 'click', () => go(ordered[ordered.findIndex(section => section.id === current) - 1]?.id));
  listen(next, 'click', () => go(ordered[ordered.findIndex(section => section.id === current) + 1]?.id));
  listen(toggle, 'click', () => { collapsed = !collapsed; showCollapse(); });
  mounts.add(root);
  showCollapse();
  go(ordered[0].id);
  return Object.freeze({
    go, update, canVisit, get currentSectionId() { return current; },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      listeners.forEach(remove => remove());
      buttons.forEach(({ button }) => button.remove());
      options.forEach(option => option.remove());
      headingTabIndexes.forEach((value, heading) => { if (value === null) heading.removeAttribute('tabindex'); else heading.setAttribute('tabindex', value); });
      mounts.delete(root);
    }
  });
}
