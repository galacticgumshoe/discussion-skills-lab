// MIT. Shared development/runtime negative fixtures; no production content source.
export function invalidNoteCases(valid) {
  return [
    ['unknown category', d => { d.data.notes[0].correctCategoryId = 'missing'; }],
    ['duplicate category', d => { d.data.categories.push(d.data.categories[0]); }],
    ['duplicate note', d => { d.data.notes.push(d.data.notes[0]); }],
    ['raw HTML field', d => { d.data.notes[0].html = '<select>'; }],
    ['numeric category', d => { d.data.notes[0].correctCategoryId = 0; }],
    ['missing feedback', d => { delete d.data.notes[0].feedback; }],
    ['empty placeholder', d => { d.data.chooseLabel = ''; }],
    ['unknown profile', d => { d.profile = 'multiple-choice'; }],
    ['prototype identity', d => { d.data.categories[0].id = 'constructor'; }]
  ].map(([label, mutate]) => { const data = structuredClone(valid); mutate(data); return { label, data }; });
}
