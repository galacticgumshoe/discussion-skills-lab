// MIT. Schema/runtime contract cases against canonical data, not a copied lesson.
// Names preserve all 43 obligations of the retired partial-Final fixture.
export function invalidLessonCases(config, manifest, activities) {
  function blockPath(predicate, blocks = manifest.sections[0].blocks, path = ['sections', 0, 'blocks']) {
    for (const [index, block] of blocks.entries()) {
      if (predicate(block)) return [...path, index];
      if (block.type === 'group') {
        const found = blockPath(predicate, block.blocks, [...path, index, 'blocks']);
        if (found) return found;
      }
    }
  }
  const group = blockPath(block => block.type === 'group');
  const mounted = blockPath(block => block.type === 'activity');
  const question = ['data', 'questions', 0];
  const item = (name, kind, path, value, extra = {}) => ({name, kind, path, value, ...extra});
  const activity = (name, id, path, value, extra) => item(name, 'activity', path, value, {activityId: id, ...extra});
  return [
    item('null config', 'config', [], null),
    item('config version', 'config', ['schemaVersion'], 2),
    item('config unknown property', 'config', ['module'], 'execute.js'),
    item('config key mismatch', 'config', ['storageKey'], 'dsl:middle:v1'),
    item('config duplicate section', 'config', ['sectionOrder', 1], config.sectionOrder[0]),
    item('config foreign path', 'config', ['content'], 'https://example.org/lesson.json'),
    item('config encoded traversal', 'config', ['content'], '../../content/%2e%2e/lesson.json'),
    item('config escapes content', 'config', ['content'], '../../assets/lesson.json'),
    item('config arbitrary profile', 'config', ['presentation'], 'freeform'),
    item('null manifest', 'manifest', [], null),
    item('manifest missing source', 'manifest', ['activities', 0, 'source'], undefined, {remove: true}),
    item('manifest duplicate activity', 'manifest', ['activities', 1, 'id'], manifest.activities[0].id),
    item('manifest duplicate section', 'manifest', ['sections', 1, 'id'], manifest.sections[0].id),
    item('manifest unknown block', 'manifest', ['sections', 0, 'blocks', 0, 'type'], 'html'),
    item('manifest arbitrary layout', 'manifest', [...group, 'layout'], 'custom-css'),
    item('manifest unknown tone', 'manifest', [...group, 'tone'], 'custom-css'),
    item('manifest unbounded groups', 'manifest', [], undefined, {deep: true}),
    item('manifest invalid gate', 'manifest', ['sections', 0, 'gateActivityIds', 0], 'not-declared'),
    item('manifest wrong-section gate', 'manifest', ['sections', 0, 'gateActivityIds', 0], 'synthesis-writing'),
    item('manifest undeclared activity', 'manifest', [...mounted, 'activityId'], 'not-declared'),
    item('manifest duplicate mount', 'manifest', ['sections', 1, 'blocks'], [{type: 'activity', activityId: 'welcome-cards'}]),
    item('manifest unsafe include', 'manifest', ['activities', 0, 'source'], '../../../../outside.json'),
    item('manifest root absolute include', 'manifest', ['activities', 0, 'source'], '/content/final/a.json'),
    item('manifest reference gate', 'manifest', ['sections', manifest.sections.length - 1, 'gateActivityIds'], ['welcome-cards']),
    activity('null activity', 'welcome-cards', [], null),
    activity('activity unknown type', 'welcome-cards', ['type'], 'task-analysis'),
    activity('activity wrong ID', 'welcome-cards', ['id'], 'different-cards'),
    activity('activity duplicate item', 'welcome-cards', ['data', 'items', 1, 'id'], activities['welcome-cards'].data.items[0].id),
    activity('activity raw HTML property', 'welcome-cards', ['data', 'html'], '<button>not content</button>'),
    activity('activity incorrect option reference', 'connect-viewpoints-questions', [...question, 'correctOptionId'], 'not-an-option'),
    activity('activity duplicate option', 'connect-viewpoints-questions', [...question, 'options', 1, 'id'], activities['connect-viewpoints-questions'].data.questions[0].options[0].id),
    activity('activity missing feedback', 'connect-viewpoints-questions', [...question, 'options', 0, 'feedback'], undefined, {remove: true}),
    activity('activity missing profile', 'summary-synthesis-questions', ['profile'], undefined, {remove: true}),
    activity('activity unknown profile', 'summary-synthesis-questions', ['profile'], 'custom'),
    activity('activity duplicate question', 'summary-synthesis-questions', ['data', 'questions', 1, 'id'], activities['summary-synthesis-questions'].data.questions[0].id),
    activity('activity invalid field length', 'synthesis-writing', ['data', 'fields', 0, 'maxLength'], 0),
    activity('activity duplicate field', 'synthesis-writing', ['data', 'fields', 1, 'id'], activities['synthesis-writing'].data.fields[0].id),
    activity('activity malformed optional copy field', 'synthesis-writing', ['data', 'copyFieldId'], 0),
    activity('activity template expression', 'synthesis-writing', ['data', 'assembly', 'template'], '{contributors.toUpperCase()}'),
    activity('activity missing formatter input', 'synthesis-writing', ['data', 'fields', 0, 'formatKey'], 'not-allowed'),
    activity('activity invalid model', 'synthesis-writing', ['data', 'model', 'mode'], 'graded'),
    activity('activity ambiguous model owner', 'synthesis-writing', ['binding', 'modelUi'], 'synthesis-model'),
    activity('activity prototype identity', 'synthesis-checklist', ['data', 'items', 0, 'id'], 'constructor')
  ];
}

export function invalidLessonCandidate(base, fixture) {
  const data = structuredClone(base);
  if (fixture.deep) {
    let block = {type: 'markdown', source: 'sections/fragment-1.md'};
    for (let n = 0; n < 4; n++) block = {type: 'group', layout: 'stack', tone: 'plain', blocks: [block]};
    data.sections[0].blocks = [block]; return data;
  }
  if (!fixture.path.length) return fixture.value;
  const path = [...fixture.path], key = path.pop(), parent = path.reduce((value, part) => value[part], data);
  if (fixture.remove) delete parent[key]; else parent[key] = fixture.value;
  return data;
}
