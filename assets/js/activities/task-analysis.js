// MIT. Ordered text nodes, accessible tabs, and explicit exploration; no storage/gates.
import { componentRoot, snapshot, unionIds } from '../components/component-dom.js';

export function mountTaskAnalysis(root, { data, state, onChange }) {
  const dom = componentRoot(root, 'dsl-task-analysis'), tabs = new Map(), marks = [];
  let current = snapshot(state);
  const task = dom.node('blockquote', 'dsl-annotated-task');
  data.segments.forEach(segment => {
    if (!segment.categoryId) task.append(root.ownerDocument.createTextNode(segment.text));
    else {
      const mark = dom.node('span', 'task-mark', segment.text); mark.dataset.kind = segment.categoryId;
      marks.push(mark); task.append(mark);
    }
  });
  const tablist = dom.node('div', 'dsl-analysis-tabs'); tablist.setAttribute('role', 'tablist'); tablist.setAttribute('aria-label', data.tablistLabel);
  const panel = dom.node('p', 'dsl-analysis-result'); panel.id = 'analysis-result'; panel.setAttribute('role', 'tabpanel'); panel.setAttribute('aria-live', 'polite');
  const note = dom.node('p', 'dsl-analysis-note', data.termsNote); note.id = 'terms-note';
  function select(category, focus = false) {
    current = { ...current, selectedCategoryId: category.id, exploredIds: unionIds(current.exploredIds, [category.explorationId]) };
    render(); if (focus) tabs.get(category.id).focus(); onChange(snapshot(current));
  }
  data.categories.forEach((category, index) => {
    const tab = dom.node('button', 'pill analysis-tab', category.label); tab.type = 'button'; tab.id = `analysis-tab-${category.id}`; tab.dataset.kind = category.id;
    tab.setAttribute('role', 'tab'); tab.setAttribute('aria-controls', panel.id);
    tabs.set(category.id, tab); tablist.append(tab);
    dom.listen(tab, 'click', () => select(category));
    dom.listen(tab, 'keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? data.categories.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + data.categories.length) % data.categories.length;
      select(data.categories[next], true);
    });
  });
  dom.append(task, tablist, panel, note);
  function render() {
    const selected = data.categories.find(category => category.id === current.selectedCategoryId);
    for (const [index, category] of data.categories.entries()) {
      const tab = tabs.get(category.id), active = category.id === selected?.id;
      tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active || !selected && index === 0 ? 0 : -1;
      // Exploration and selection remain distinct; rendering never emits a selection.
      tab.dataset.explored = String(current.exploredIds.includes(category.explorationId));
    }
    marks.forEach(mark => mark.classList.toggle('on', selected?.highlights.includes(mark.dataset.kind) === true));
    panel.textContent = selected ? `${selected.answerLabel}: ${selected.explanation}` : data.initialMessage;
    panel.setAttribute('aria-labelledby', tabs.get(selected?.id || data.categories[0].id).id);
    note.hidden = selected?.id !== 'terms';
  }
  render();
  return { update(next) { if (!dom.destroyed) { current = snapshot(next); render(); } }, destroy() { dom.destroy(); } };
}
