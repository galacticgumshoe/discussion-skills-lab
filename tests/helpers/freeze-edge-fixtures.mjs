import { freeze } from './freeze-source.mjs';
import { revision } from './baseline-source.mjs';
const unicode = 'Synthetic only — “quotes”, café & <not markup>.\nSecond line: ✓';
for (const id of ['opening', 'middle', 'final']) {
  const wrap = data => id === 'opening' ? data : { [`${id}State`]: data };
  const cases = {
    missing: { raw: null, safety: 'safe', purpose: 'Missing storage key before initialization' },
    'empty-zero': { record: { completed: [], data: wrap(id === 'opening'
      ? { classificationAnswers: [null, null, null, null, null], quizAnswers: [0, null, null, null, null], 'what-how-options': 0, 'draft-input': '' }
      : id === 'middle' ? { fields: { 0: '', 1: unicode, 8: '' }, selections: { 'classify-options-0': 0, 'quiz-0': 0 }, positions: { classify: 0 } }
      : { fields: { 'build-1': '', 'closing-text': unicode }, selections: { '1:0': 0, '8:0': 0 }, goals: [0] }) }, safety: 'safe', purpose: 'Empty/unanswered, Unicode drafts and numeric zero are distinct' },
    'non-contiguous': { record: { completed: [0, 3], data: {} }, safety: 'safe', purpose: 'Completed page 3 and immediate successor 4 remain accessible despite gaps' },
    'unknown-properties': { record: { completed: [], futureOuter: { keep: unicode }, data: { futureData: [0, 'keep'], ...wrap(id === 'opening'
      ? { futureNested: { value: unicode } }
      : { futureNested: { value: unicode }, fields: { futureField: unicode }, selections: { futureSelection: 0 } }) } }, safety: 'safe', purpose: 'Future adapter preservation requirement; original engine drops outer and owned nested unknowns (KI-08)' },
    'malformed-json': { raw: '{"completed":[0], broken', safety: 'unsafe', purpose: 'JSON parse failure; legacy may overwrite on initialization' },
    'invalid-outer': { record: { completed: 'not-an-array', data: null }, safety: 'unsafe', purpose: 'Invalid completion/data envelope' },
    'invalid-data': { record: { completed: [0], data: 'invalid' }, safety: 'unsafe', purpose: 'Valid completed array with invalid primitive data; not a safe restoration promise' },
    'malformed-nested': { record: { completed: [0], data: wrap(id === 'opening' ? { classificationSeen: 7 } : id === 'middle' ? { sets: { flipped: { welcome: 7 } } } : { flips: { 0: 7 } }) }, safety: 'unsafe', purpose: 'Known legacy crash boundary; do not expect successful restoration' },
    'out-of-range': { record: { completed: [-1, 0, 99], data: wrap(id === 'opening'
      ? { quizAnswers: [99, null, null, null, null], classificationSeen: [99], analysisSeen: ['unknown'] }
      : id === 'middle' ? { positions: { classify: 99 }, selections: { 'research-options': 99 } }
      : { quizIndex: { 1: 99 }, selections: { '1:0': 99 }, goals: [99] }) }, safety: 'unsafe', purpose: 'Invalid activity indexes; no new credit should be inferred by a future adapter' }
  };
  if (id === 'opening') {
    cases['quiz-earned-fallback'] = { record: { completed: [], data: { quizAnswers: [1, 0, 1, 2, 0] } }, safety: 'safe', purpose: 'Absent quizEarned falls back to current correct selections; initialization earns page 6' };
    cases['boundary-synthetic'] = { record: { completed: [], data: { 'draft-input': 'x'.repeat(35), questionSelfcheck: true } }, safety: 'safe', purpose: 'Exact 35-character completion boundary' };
  } else {
    cases['boundary-synthetic'] = { record: { completed: [], data: wrap({ fields: id === 'middle' ? { 8: ' ' } : { 'closing-text': ' ' } }) }, safety: 'safe', purpose: 'Whitespace-only draft is not nonempty; no character minimum beyond trimmed nonempty' };
  }
  for (const [name, { record, ...details }] of Object.entries(cases)) {
    await freeze(`progress/${id}/${name}.json`, { provenance: 'synthetic', revision, ...details,
      raw: Object.hasOwn(details, 'raw') ? details.raw : JSON.stringify(record) });
  }
}
