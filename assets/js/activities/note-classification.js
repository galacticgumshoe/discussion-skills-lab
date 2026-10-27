// MIT. Correct-ever categorization; unearned choices are deliberately session-only.
// Components never read storage or infer categories from their display order.
import { componentRoot, snapshot, setText, unionIds } from '../components/component-dom.js';

export function mountNoteClassification(root, { data, state, onChange }) {
  const dom = componentRoot(root, 'dsl-note-classification'), rows = new Map();
  let current = snapshot(state);
  data.notes.forEach((note, index) => {
    const row = dom.node('div', 'dsl-note-row'), label = dom.node('label', 'dsl-note-label', `${index + 1}. ${note.text}`);
    const select = dom.node('select', 'dsl-note-select'), status = dom.node('p', 'dsl-note-status');
    select.id = `${dom.prefix}-${note.id}`; select.dataset.noteId = note.id; label.htmlFor = select.id;
    status.id = `${select.id}-status`; status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite'); status.setAttribute('aria-atomic', 'true');
    select.setAttribute('aria-describedby', status.id);
    const placeholder = dom.node('option', '', data.chooseLabel); placeholder.value = ''; select.append(placeholder);
    data.categories.forEach(category => { const option = dom.node('option', '', category.label); option.value = category.id; select.append(option); });
    row.append(label, select, status); dom.append(row); rows.set(note.id, { select, status });
    dom.listen(select, 'change', () => {
      if (!select.value || current.earnedNoteIds.includes(note.id)) return;
      const good = select.value === note.correctCategoryId;
      setText(status, `${good ? data.correctPrefix : data.wrongPrefix}${note.feedback}`);
      if (!good) return; // No representable legacy fact; no callback/storage write.
      current = { ...current, earnedNoteIds: unionIds(current.earnedNoteIds, [note.id]) };
      render(); onChange(snapshot(current));
    });
  });
  function render() {
    data.notes.forEach(note => {
      const { select, status } = rows.get(note.id), earned = current.earnedNoteIds.includes(note.id);
      select.disabled = earned;
      if (earned) { select.value = note.correctCategoryId; setText(status, data.correctPrefix + note.feedback); }
      // Do not reset session-local retries during unrelated parent updates.
    });
  }
  function update(next) { if (!dom.destroyed) { current = snapshot(next); render(); } }
  update(state);
  return { update, destroy: () => dom.destroy() };
}
