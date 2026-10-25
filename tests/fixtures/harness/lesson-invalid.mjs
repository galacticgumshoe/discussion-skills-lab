// MIT. Shared runtime/development invalid cases; no invented instructional text.
export const invalidLessonCases = [
  { name: 'null config', kind: 'config', path: [], value: null },
  { name: 'config version', kind: 'config', path: ['schemaVersion'], value: 2 },
  { name: 'config unknown property', kind: 'config', path: ['module'], value: 'execute.js' },
  { name: 'config key mismatch', kind: 'config', path: ['storageKey'], value: 'dsl:middle:v1' },
  { name: 'config duplicate section', kind: 'config', path: ['sectionOrder', 1], value: 'welcome' },
  { name: 'config foreign path', kind: 'config', path: ['content'], value: 'https://example.org/lesson.json' },
  { name: 'config encoded traversal', kind: 'config', path: ['content'], value: '../../content/%2e%2e/lesson.json' },
  { name: 'config escapes content', kind: 'config', path: ['content'], value: '../../assets/lesson.json' },
  { name: 'config arbitrary profile', kind: 'config', path: ['presentation'], value: 'freeform' },
  { name: 'null manifest', kind: 'manifest', path: [], value: null },
  { name: 'manifest missing source', kind: 'manifest', path: ['activities', 0, 'source'], remove: true },
  { name: 'manifest duplicate activity', kind: 'manifest', path: ['activities', 1, 'id'], value: 'welcome-cards' },
  { name: 'manifest duplicate section', kind: 'manifest', path: ['sections', 1, 'id'], value: 'welcome' },
  { name: 'manifest unknown block', kind: 'manifest', path: ['sections', 0, 'blocks', 0, 'type'], value: 'html' },
  { name: 'manifest arbitrary layout', kind: 'manifest', path: ['sections', 0, 'blocks', 0, 'layout'], value: 'custom-css' },
  { name: 'manifest unknown tone', kind: 'manifest', path: ['sections', 0, 'blocks', 0, 'tone'], value: 'custom-css' },
  { name: 'manifest unbounded groups', kind: 'manifest', deep: true },
  { name: 'manifest invalid gate', kind: 'manifest', path: ['sections', 0, 'gateActivityIds', 0], value: 'not-declared' },
  { name: 'manifest wrong-section gate', kind: 'manifest', path: ['sections', 0, 'gateActivityIds', 0], value: 'synthesis-writing' },
  { name: 'manifest undeclared activity', kind: 'manifest', path: ['sections', 0, 'blocks', 0, 'blocks', 1, 'activityId'], value: 'not-declared' },
  { name: 'manifest duplicate mount', kind: 'manifest', path: ['sections', 2, 'blocks', 1, 'activityId'], value: 'welcome-cards' },
  { name: 'manifest unsafe include', kind: 'manifest', path: ['activities', 0, 'source'], value: '../../../../outside.json' },
  { name: 'manifest root absolute include', kind: 'manifest', path: ['activities', 0, 'source'], value: '/content/final/a.json' },
  { name: 'manifest reference gate', kind: 'manifest', path: ['sections', 9, 'gateActivityIds'], value: ['welcome-cards'] },
  { name: 'null activity', kind: 'activity', activityId: 'welcome-cards', path: [], value: null },
  { name: 'activity unknown type', kind: 'activity', activityId: 'welcome-cards', path: ['type'], value: 'task-analysis' },
  { name: 'activity wrong ID', kind: 'activity', activityId: 'welcome-cards', path: ['id'], value: 'different-cards' },
  { name: 'activity duplicate item', kind: 'activity', activityId: 'welcome-cards', path: ['data', 'items', 1, 'id'], value: 'connect-ideas' },
  { name: 'activity raw HTML property', kind: 'activity', activityId: 'welcome-cards', path: ['data', 'html'], value: '<button>not content</button>' },
  { name: 'activity incorrect option reference', kind: 'activity', activityId: 'connect-viewpoints-questions', path: ['data', 'correctOptionId'], value: 'not-an-option' },
  { name: 'activity duplicate option', kind: 'activity', activityId: 'connect-viewpoints-questions', path: ['data', 'options', 1, 'id'], value: 'repeat' },
  { name: 'activity missing feedback', kind: 'activity', activityId: 'connect-viewpoints-questions', path: ['data', 'options', 0, 'feedback'], remove: true },
  { name: 'activity missing profile', kind: 'activity', activityId: 'summary-synthesis-questions', path: ['profile'], remove: true },
  { name: 'activity unknown profile', kind: 'activity', activityId: 'summary-synthesis-questions', path: ['profile'], value: 'custom' },
  { name: 'activity duplicate question', kind: 'activity', activityId: 'summary-synthesis-questions', path: ['data', 'questions', 1, 'id'], value: 'three-solutions' },
  { name: 'activity invalid field length', kind: 'activity', activityId: 'synthesis-writing', path: ['data', 'fields', 0, 'maxLength'], value: 0 },
  { name: 'activity duplicate field', kind: 'activity', activityId: 'synthesis-writing', path: ['data', 'fields', 1, 'id'], value: 'synthesis-contributors' },
  { name: 'activity malformed optional copy field', kind: 'activity', activityId: 'synthesis-writing', path: ['data', 'copyFieldId'], value: 0 },
  { name: 'activity template expression', kind: 'activity', activityId: 'synthesis-writing', path: ['data', 'assembly', 'template'], value: '{contributors.toUpperCase()}' },
  { name: 'activity missing formatter input', kind: 'activity', activityId: 'synthesis-writing', path: ['data', 'fields', 0, 'formatKey'], value: 'not-allowed' },
  { name: 'activity invalid model', kind: 'activity', activityId: 'synthesis-writing', path: ['data', 'model', 'mode'], value: 'graded' },
  { name: 'activity ambiguous model owner', kind: 'activity', activityId: 'synthesis-writing', path: ['binding', 'modelUi'], value: 'synthesis-model' },
  { name: 'activity prototype identity', kind: 'activity', activityId: 'synthesis-checklist', path: ['data', 'items', 0, 'id'], value: 'constructor' }
];

export function invalidLessonCandidate(base, fixture) {
  if (fixture.deep) {
    const data = structuredClone(base); let block = data.sections[0].blocks[0];
    for (let n = 0; n < 4; n++) { const nested = structuredClone(block); block.blocks = [nested]; block = nested; }
    return data;
  }
  if (!fixture.path.length) return fixture.value;
  const data = structuredClone(base), path = [...fixture.path], key = path.pop();
  const parent = path.reduce((value, part) => value[part], data);
  if (fixture.remove) delete parent[key]; else parent[key] = fixture.value;
  return data;
}
