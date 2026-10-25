// Test-only MIT extraction of sealed baseline excerpts (0b5d229).
// Instructional content © Rhys Jones, CC BY 4.0. Not a production content source.
export const writingTemplates = {
  'opening-consensus': 'By the end of this discussion, will the group agree that we have {accomplishment} to address {problem}?',
  'middle-evidence': 'According to {source}, {finding}. This matters to our task because {why}.',
  'final-synthesis': 'Building on {contributors}, {relationship}. Therefore, {recommendation}'
};

export function writingActivities(document, banks, maps, lesson, middleSource = '') {
  const text = node => node.textContent.replace(/\s+/g, ' ').trim();
  function field(legacyId, id, formatKey) {
    const original = document.getElementById(legacyId);
    return { id, ...(formatKey ? { formatKey } : {}), label: text(document.querySelector(`label[for="${legacyId}"]`)),
      multiline: original.tagName === 'TEXTAREA', readonly: original.readOnly,
      ...(original.hasAttribute('rows') ? { rows: original.rows } : {}),
      ...(original.hasAttribute('maxlength') ? { maxLength: original.maxLength } : {}),
      ...(original.placeholder ? { placeholder: original.placeholder } : {}) };
  }
  function model(id, button, mode = 'show-only') {
    const node = document.getElementById(id), children = [...node.children];
    return { mode, showLabel: text(document.getElementById(button)),
      ...(mode === 'toggle' ? { hideLabel: 'Hide model example' } : {}),
      blocks: children.length ? children.map(child => ({ kind: child.tagName === 'STRONG' ? 'title' : 'paragraph', text: text(child) }))
        : [{ kind: 'paragraph', text: text(node) }] };
  }
  const checks = (id, ids, labels) => ({ id, data: { items: ids.map((id, index) => ({ id, text: labels[index] })) } });
  const assembly = (profile, button, missingMessage, successMessage, focusOutput = false) => ({
    label: text(document.getElementById(button) || document.querySelector(`[data-template-id="${button}"]`)), template: writingTemplates[profile], missingMessage, successMessage, focusOutput
  });
  if (lesson === 'opening') return [{ id: 'consensus-writing', profile: 'opening-consensus', section: 'give-direction',
    modelUi: 'consensus-model-visible',
    data: { fields: [field('problem-input', maps.fields['problem-input'], 'problem'), field('accomplishment-input', maps.fields['accomplishment-input'], 'accomplishment')],
      output: field('draft-input', maps.fields['draft-input']),
      assembly: assembly('opening-consensus', 'build-button', '', '', true),
      copyLabel: text(document.getElementById('copy-question')), copyMessages: { empty: 'There is nothing to copy yet.' },
      model: model('model-answer', 'show-model', 'toggle') },
    checklist: checks('question-selfcheck', ['connects-what-how'], [text(document.getElementById('question-selfcheck').closest('label'))]) }];
  if (lesson === 'middle') {
    const labels = group => {
      const literal = middleSource.match(new RegExp(`addChecks\\('${group}-checks',(\\[[^\\n]+?\\]),`))[1];
      return [...literal.matchAll(/'([^']*)'/g)].map(match => match[1]);
    };
    return [{ id: 'evidence-writing', profile: 'middle-evidence', section: 'evidence', assembledFlag: 'evidence-assembled', modelFlag: 'research-model-visible',
      data: { fields: [field('source', maps.fieldIds.source, 'source'), field('finding', maps.fieldIds.finding, 'finding'), field('why', maps.fieldIds.why, 'why')],
        output: field('assembled', maps.fieldIds.assembled),
        assembly: assembly('middle-evidence', 'assemble-button', 'Fill in all three fields first.', 'Assembled from your words; this response has not been fact-checked.'),
        copyLabel: text(document.getElementById('assembly-copy-button')), copyMessages: { empty: 'Nothing to copy yet. Write a response first.' }, model: model('research-model', 'research-model-button') },
      checklist: checks('research-checklist', maps.checks.research, labels('research')) },
    { id: 'integrated-writing', profile: 'draft', section: 'integrated-practice', modelFlag: 'application-model-visible',
      data: { fields: [field('application-draft', maps.fieldIds['application-draft'])], copyFieldId: maps.fieldIds['application-draft'],
        copyLabel: text(document.getElementById('application-copy-button')), copyMessages: { empty: 'Nothing to copy yet. Write a response first.' }, model: model('application-model', 'application-model-button') },
      checklist: checks('application-checklist', maps.checks.application, labels('application')) }];
  }
  return [{ id: 'synthesis-writing', profile: 'final-synthesis', section: 'connect-viewpoints', assembledFlag: 'synthesis-assembled', modelFlag: 'synthesis-model-viewed',
    data: { fields: [field('build-1', maps.fields['build-1'], 'contributors'), field('build-2', maps.fields['build-2'], 'relationship'), field('build-3', maps.fields['build-3'], 'recommendation')],
      output: field('assembled', maps.fields.assembled),
      assembly: assembly('final-synthesis', 'assemble', 'Complete all three fields before assembling.', 'Assembled. You can edit the paragraph below.'),
      copyLabel: text(document.getElementById('copy-builder')), model: model('builder-model', 'model-builder-button') },
    checklist: checks('synthesis-checklist', maps.checks[2], banks.final.checkLabels[2]) },
  { id: 'closing-writing', profile: 'draft', section: 'closing-practice', modelFlag: 'closing-model-viewed',
    data: { fields: [field('closing-text', maps.fields['closing-text'])], copyFieldId: maps.fields['closing-text'],
      copyLabel: text(document.getElementById('copy-closing')), model: model('closing-model', 'show-closing') },
    checklist: checks('closing-checklist', maps.checks[7], banks.final.checkLabels[7]) }];
}
