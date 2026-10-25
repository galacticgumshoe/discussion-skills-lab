// MIT. Only the three legacy operations; sentence templates are supplied as content.
const profiles = new Map([
  ['opening-consensus', ['problem', 'accomplishment']],
  ['middle-evidence', ['source', 'finding', 'why']],
  ['final-synthesis', ['contributors', 'relationship', 'recommendation']]
]);

export function formatWriting(profile, fields, template) {
  const names = profiles.get(profile);
  if (!names) throw new TypeError('Unsupported writing formatter');
  if (typeof template !== 'string' || /[{}]/.test(template.replace(/\{([a-z]+)\}/g, (_, name) => {
    if (!names.includes(name)) throw new TypeError('Unknown template field');
    return '';
  }))) throw new TypeError('Invalid writing template');
  const values = Object.fromEntries(names.map(name => [name, fields[name].trim()]));
  if (profile === 'opening-consensus') {
    names.forEach(name => { values[name] = values[name].replace(/[.?!]+$/, ''); });
  }
  if (names.some(name => !values[name])) return null;
  if (profile === 'middle-evidence') {
    ['finding', 'why'].forEach(name => { values[name] = values[name].replace(/[. ]+$/, ''); });
  }
  if (profile === 'final-synthesis') {
    values.contributors = values.contributors.replace(/[.!?]+$/, '');
    values.relationship = values.relationship.charAt(0).toLowerCase() + values.relationship.slice(1).replace(/[.!?]+$/, '');
    values.recommendation = values.recommendation.charAt(0).toLowerCase() + values.recommendation.slice(1);
  }
  return template.replace(/\{([a-z]+)\}/g, (_, name) => values[name]);
}
