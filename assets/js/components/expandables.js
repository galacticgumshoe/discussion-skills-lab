// MIT. Current openness is reversible; exploration is independent and monotonic.
import { componentRoot, snapshot, unionIds } from './component-dom.js';

export function mountExpandables(root, { data, state, onChange, profile = 'standard', bodies = new Map() }) {
  if (!['standard', 'timeline'].includes(profile)) throw new TypeError('Unknown expandable profile.');
  const dom = componentRoot(root, `dsl-expandables-${profile}`), rows = new Map();
  let current = snapshot(state);
  for (const [index, item] of data.items.entries()) {
    const row = dom.node(profile === 'standard' ? 'details' : 'div', 'dsl-expandable'); row.dataset.panelId = item.id;
    const control = dom.node(profile === 'standard' ? 'summary' : 'button', 'dsl-expandable-control', item.title);
    if (profile === 'timeline') control.type = 'button';
    const mark = dom.node('span', 'dsl-panel-explored', '✓ Explored');
    const body = dom.node('div', 'dsl-expandable-body', item.body);
    if (item.bodySource) {
      body.classList.add('dsl-rich-prose');
      const prose = bodies.get(item.bodySource).cloneNode(true);
      if (item.calloutTones) {
        const callouts = [...prose.querySelectorAll('blockquote')];
        if (callouts.length !== item.calloutTones.length) throw new TypeError('Callout annotations must match the Markdown examples.');
        callouts.forEach((callout, i) => callout.classList.add(`dsl-panel-${item.calloutTones[i]}`));
        if (callouts.length === 2) body.classList.add('dsl-panel-paired-callouts');
      }
      body.append(prose);
    }
    body.id = `${dom.prefix}-${index}-body`;
    if (profile === 'timeline') control.setAttribute('aria-controls', body.id);
    control.append(mark);
    row.append(control, body); dom.append(row); rows.set(item.id, { row, control, mark, body });
    const change = open => {
      if (open === current.openIds.includes(item.id)) return; // queued hydration toggle, not a user event
      current = { ...current, openIds: open ? unionIds(current.openIds, [item.id]) : current.openIds.filter(id => id !== item.id),
        exploredIds: open ? unionIds(current.exploredIds, [item.id]) : current.exploredIds };
      render(); onChange(snapshot(current));
    };
    if (profile === 'standard') dom.listen(row, 'toggle', () => change(row.open));
    else dom.listen(control, 'click', () => change(!current.openIds.includes(item.id)));
  }
  function render() {
    for (const [id, { row, control, mark, body }] of rows) {
      const open = current.openIds.includes(id);
      mark.hidden = !current.exploredIds.includes(id);
      if (profile === 'standard') { if (row.open !== open) row.open = open; }
      else { control.setAttribute('aria-expanded', String(open)); body.hidden = !open; }
    }
  }
  render();
  return Object.freeze({
    update(next) { if (!dom.destroyed) { current = snapshot(next); render(); } },
    destroy() { dom.destroy(); }
  });
}
