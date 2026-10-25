// MIT. Validated plain-text data; no storage, fetching, grading or completion policy.
import { componentRoot, snapshot, setText } from './component-dom.js';
import { formatWriting } from '../utilities/writing-formatters.js';
import { createClipboard } from '../utilities/clipboard.js';

export function mountWritingActivity(root, { data, state, onChange, profile = 'draft' }) {
  const dom = componentRoot(root, 'dsl-writing'), inputs = new Map();
  let current = snapshot(state);
  const form = dom.node('form', 'dsl-writing-form');
  const status = dom.node('p', 'dsl-writing-status');
  status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite'); status.setAttribute('aria-atomic', 'true');
  function publish() { onChange(snapshot(current)); }
  function addField(descriptor, parent) {
    const label = dom.node('label', 'dsl-field-label', descriptor.label);
    const input = dom.node(descriptor.multiline ? 'textarea' : 'input', 'dsl-writing-field');
    input.id = `${dom.prefix}-${inputs.size}`; input.dataset.fieldId = descriptor.id; label.htmlFor = input.id;
    if (descriptor.multiline) input.rows = descriptor.rows || 3; else input.type = 'text';
    if (descriptor.maxLength !== undefined) input.maxLength = descriptor.maxLength;
    if (descriptor.placeholder) input.placeholder = descriptor.placeholder;
    input.readOnly = descriptor.readonly === true;
    parent.append(label, input); inputs.set(descriptor.id, input);
    dom.listen(input, 'input', () => {
      if (input.readOnly || input.value === current.fields[descriptor.id]) return;
      current.fields[descriptor.id] = input.value; publish();
    });
    return input;
  }
  data.fields.forEach(descriptor => addField(descriptor, form));
  if (data.assembly) {
    const assemble = dom.node('button', 'dsl-assemble', data.assembly.label); assemble.type = 'submit'; form.append(assemble);
  }
  dom.append(form);
  const output = data.output ? addField(data.output, form) : inputs.get(data.copyFieldId);
  dom.append(status);
  dom.listen(form, 'submit', event => {
    event.preventDefault();
    if (!data.assembly) return;
    const fields = Object.fromEntries(data.fields.map(descriptor => [descriptor.formatKey, current.fields[descriptor.id]]));
    const assembled = formatWriting(profile, fields, data.assembly.template);
    if (assembled === null) { setText(status, data.assembly.missingMessage || ''); return; }
    current.fields[data.output.id] = assembled; current.assembled = true;
    output.value = assembled; setText(status, data.assembly.successMessage || ''); publish();
    if (data.assembly.focusOutput) output.focus({ preventScroll: true });
  });
  const actions = dom.node('div', 'dsl-writing-actions'), copy = dom.node('button', 'dsl-copy', data.copyLabel);
  copy.type = 'button'; actions.append(copy); dom.append(actions);
  const clipboard = createClipboard(root, { field: output, getText: () => output.value, status, messages: data.copyMessages });
  dom.listen(copy, 'click', () => clipboard.copy());
  let modelButton, model;
  if (data.model) {
    modelButton = dom.node('button', 'dsl-model-toggle', data.model.showLabel); modelButton.type = 'button';
    model = dom.node('div', 'dsl-writing-model'); model.id = `${dom.prefix}-model`;
    modelButton.setAttribute('aria-controls', model.id);
    data.model.blocks.forEach(block => model.append(dom.node(block.kind === 'title' ? 'strong' : 'p', '', block.text)));
    actions.append(modelButton); dom.append(model);
    dom.listen(modelButton, 'click', () => {
      const visible = data.model.mode === 'toggle' ? !current.modelVisible : true;
      if (visible === current.modelVisible) return;
      current.modelVisible = visible; render(); publish();
    });
  }
  function render() {
    inputs.forEach((input, id) => {
      // Preserve caret/selection on unchanged parent updates and student-edited output.
      if (input.value !== current.fields[id]) input.value = current.fields[id];
    });
    if (model) {
      model.hidden = !current.modelVisible;
      modelButton.setAttribute('aria-expanded', String(current.modelVisible));
      setText(modelButton, current.modelVisible && data.model.mode === 'toggle' ? data.model.hideLabel : data.model.showLabel);
    }
  }
  function update(next) { if (!dom.destroyed) { current = snapshot(next); render(); } }
  update(state);
  return { update, destroy() { clipboard.destroy(); dom.destroy(); } };
}
