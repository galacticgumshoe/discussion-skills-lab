// MIT. Closed task segment/tab boundary, shared by runtime and development validation.
const mapping = { who: 'role', what: 'problem', how: 'deliverable', where: 'setting', terms: 'search-terms' };
export function validateTaskAnalysisData(data) {
  const errors = [], text = value => typeof value === 'string' && /\S/.test(value);
  const object = (value, required, optional = []) => {
    if (!value || typeof value !== 'object' || Array.isArray(value) || required.some(key => !Object.hasOwn(value, key)) || Object.keys(value).some(key => ![...required, ...optional].includes(key))) { errors.push('invalid task-analysis object'); return false; }
    return true;
  };
  if (object(data, ['segments', 'categories', 'initialMessage', 'termsNote', 'tablistLabel'])) {
    for (const key of ['initialMessage', 'termsNote', 'tablistLabel']) if (!text(data[key])) errors.push(`invalid ${key}`);
    if (!Array.isArray(data.segments) || !data.segments.length) errors.push('missing task segments');
    else data.segments.forEach(segment => {
      if (object(segment, ['text'], ['categoryId']) && (typeof segment.text !== 'string' || !segment.text.length || segment.categoryId !== undefined && !['who', 'what', 'how', 'where'].includes(segment.categoryId))) errors.push('invalid task segment');
    });
    if (!Array.isArray(data.categories) || JSON.stringify(data.categories.map(c => c?.id)) !== JSON.stringify(Object.keys(mapping))) errors.push('five ordered categories required');
    else data.categories.forEach(category => {
      if (!object(category, ['id', 'explorationId', 'label', 'answerLabel', 'explanation', 'highlights'])) return;
      if (category.explorationId !== mapping[category.id] || ['label', 'answerLabel', 'explanation'].some(key => !text(category[key])) || JSON.stringify(category.highlights) !== JSON.stringify(category.id === 'terms' ? ['who', 'what'] : [category.id])) errors.push('invalid category/highlights/progress binding');
    });
  }
  if (errors.length) throw new Error(errors.join('; '));
  return true;
}
