// MIT. Validated plain-text faces; no fetching, storage or section completion.
import { componentRoot, snapshot, unionIds } from './component-dom.js';

export function mountFlashcards(root, { data, state, onChange, bodies = new Map() }) {
  const dom = componentRoot(root, 'dsl-flashcards'), cards = new Map();
  let current = snapshot(state);
  for (const [index, item] of data.items.entries()) {
    const button = dom.node('button', 'dsl-card'); button.type = 'button'; button.dataset.cardId = item.id;
    const inner = dom.node('span', 'dsl-card-inner');
    const front = dom.node('span', 'dsl-card-face dsl-card-front');
    const frontText = dom.node('span', 'dsl-card-copy', item.front);
    if (item.frontSource) { frontText.classList.add('dsl-card-rich-copy'); frontText.append(bodies.get(item.frontSource).cloneNode(true)); }
    const hint = dom.node('span', 'dsl-card-hint', '↻ Flip card'); hint.setAttribute('aria-hidden', 'true');
    const frontContent = dom.node('span', 'dsl-card-content');
    if (item.frontTitle) frontContent.append(dom.node('strong', 'dsl-card-title', item.frontTitle));
    frontContent.append(frontText); front.append(frontContent, hint);
    const back = dom.node('span', 'dsl-card-face dsl-card-back');
    const backText = dom.node('span', 'dsl-card-copy', item.back);
    if (item.backSource) { backText.classList.add('dsl-card-rich-copy'); backText.append(bodies.get(item.backSource).cloneNode(true)); }
    const backContent = dom.node('span', 'dsl-card-content');
    if (item.backTitle) backContent.append(dom.node('strong', 'dsl-card-title', item.backTitle));
    backContent.append(backText); back.append(backContent);
    frontContent.id = `${dom.prefix}-${index}-front`; backContent.id = `${dom.prefix}-${index}-back`;
    const explored = dom.node('span', 'dsl-card-explored', '✓ Explored');
    // Reserve the back's status space on both faces, so moving the one cue to
    // the current face cannot change intrinsic card height or duplicate its name.
    const backStatus = dom.node('span', 'dsl-card-explored-slot'); back.append(backStatus);
    inner.append(front, back); button.append(inner); dom.append(button);
    cards.set(item.id, { button, front, frontText, frontContent, back, backContent, backStatus, explored });
    // Native button Enter/Space already dispatch click: no second key handler.
    dom.listen(button, 'click', () => {
      const backIds = current.backIds.includes(item.id) ? current.backIds.filter(id => id !== item.id) : [...current.backIds, item.id];
      current = { ...current, backIds, exploredIds: unionIds(current.exploredIds, [item.id]) };
      render(); onChange(snapshot(current));
    });
  }
  function render() {
    for (const item of data.items) {
      const { button, front, frontText, frontContent, back, backContent, backStatus, explored } = cards.get(item.id);
      const showingBack = current.backIds.includes(item.id);
      button.classList.toggle('dsl-is-back', showingBack);
      button.setAttribute('aria-pressed', String(showingBack));
      button.setAttribute('aria-label', `${item.frontTitle ? `${item.frontTitle}: ` : ''}${frontText.textContent.trim()} — ${showingBack ? 'Return to front' : 'Flip card'}`);
      button.setAttribute('aria-describedby', showingBack ? backContent.id : frontContent.id);
      front.setAttribute('aria-hidden', String(showingBack)); back.setAttribute('aria-hidden', String(!showingBack));
      const statusParent = showingBack ? backStatus : front;
      if (explored.parentNode !== statusParent) statusParent.append(explored);
      explored.hidden = !current.exploredIds.includes(item.id);
    }
  }
  render();
  return Object.freeze({
    update(next) { if (!dom.destroyed) { current = snapshot(next); render(); } },
    destroy() { dom.destroy(); }
  });
}
