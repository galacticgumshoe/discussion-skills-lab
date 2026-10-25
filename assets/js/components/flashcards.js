// MIT. Validated plain-text faces; no fetching, storage or section completion.
import { componentRoot, snapshot, unionIds } from './component-dom.js';

export function mountFlashcards(root, { data, state, onChange }) {
  const dom = componentRoot(root, 'dsl-flashcards'), cards = new Map();
  let current = snapshot(state);
  for (const [index, item] of data.items.entries()) {
    const button = dom.node('button', 'dsl-card'); button.type = 'button'; button.dataset.cardId = item.id;
    const inner = dom.node('span', 'dsl-card-inner');
    const front = dom.node('span', 'dsl-card-face dsl-card-front');
    const frontText = dom.node('span', 'dsl-card-copy', item.front);
    const hint = dom.node('span', 'dsl-card-hint', '↻ Flip card'); hint.setAttribute('aria-hidden', 'true');
    if (item.frontTitle) front.append(dom.node('strong', 'dsl-card-title', item.frontTitle));
    front.append(frontText, hint);
    const back = dom.node('span', 'dsl-card-face dsl-card-back');
    const backText = dom.node('span', 'dsl-card-copy', item.back);
    if (item.backTitle) back.append(dom.node('strong', 'dsl-card-title', item.backTitle));
    back.append(backText);
    front.id = `${dom.prefix}-${index}-front`; back.id = `${dom.prefix}-${index}-back`;
    const explored = dom.node('span', 'dsl-card-explored', '✓ Explored');
    inner.append(front, back); button.append(inner, explored); dom.append(button);
    cards.set(item.id, { button, front, back, explored });
    // Native button Enter/Space already dispatch click: no second key handler.
    dom.listen(button, 'click', () => {
      const backIds = current.backIds.includes(item.id) ? current.backIds.filter(id => id !== item.id) : [...current.backIds, item.id];
      current = { ...current, backIds, exploredIds: unionIds(current.exploredIds, [item.id]) };
      render(); onChange(snapshot(current));
    });
  }
  function render() {
    for (const item of data.items) {
      const { button, front, back, explored } = cards.get(item.id);
      const showingBack = current.backIds.includes(item.id);
      button.classList.toggle('dsl-is-back', showingBack);
      button.setAttribute('aria-pressed', String(showingBack));
      button.setAttribute('aria-label', `${item.frontTitle ? `${item.frontTitle}: ` : ''}${item.front} — ${showingBack ? 'Return to front' : 'Flip card'}`);
      button.setAttribute('aria-describedby', showingBack ? back.id : front.id);
      front.setAttribute('aria-hidden', String(showingBack)); back.setAttribute('aria-hidden', String(!showingBack));
      explored.hidden = !current.exploredIds.includes(item.id);
    }
  }
  render();
  return Object.freeze({
    update(next) { if (!dom.destroyed) { current = snapshot(next); render(); } },
    destroy() { dom.destroy(); }
  });
}
