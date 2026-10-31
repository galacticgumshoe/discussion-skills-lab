// MIT. Reversible checks; completion belongs exclusively to the caller.
import { componentRoot, snapshot, setText } from './component-dom.js';

export function mountChecklist(root, { data, state, onChange }) {
  const dom = componentRoot(root, 'dsl-checklist'), inputs = new Map();
  let current = snapshot(state);
  data.items.forEach((item, index) => {
    const label = dom.node('label', 'dsl-check'), input = dom.node('input');
    input.type = 'checkbox'; input.id = `${dom.prefix}-${index}`; input.dataset.checkId = item.id;
    label.htmlFor = input.id; label.append(input, dom.node('span', '', item.text));
    inputs.set(item.id, input); dom.append(label);
    dom.listen(input, 'change', () => {
      const checked = new Set(current.checkedIds);
      input.checked ? checked.add(item.id) : checked.delete(item.id);
      current = { ...current, checkedIds: [...checked] };
      onChange(snapshot(current));
    });
  });
  const caption = data.caption ? dom.node('p', 'dsl-checklist-caption') : null;
  if (caption) { caption.setAttribute('aria-live', 'polite'); dom.append(caption); }
  function update(next) {
    if (dom.destroyed) return;
    current = snapshot(next);
    inputs.forEach((input, id) => { input.checked = current.checkedIds.includes(id); });
    if (caption) {
      const selected = data.items.filter(item => current.checkedIds.includes(item.id));
      setText(caption, selected.length ? data.caption.prefix + selected.map(item => item.text).join(' ') : data.caption.empty);
    }
  }
  update(state);
  return { update, destroy: () => dom.destroy() };
}
