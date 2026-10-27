import test from 'node:test';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import { readFileSync } from 'node:fs';
import { original } from '../helpers/baseline-source.mjs';
import { formatWriting } from '../../assets/js/utilities/writing-formatters.js';
import { writingTemplates } from '../fixtures/harness/writing-data.mjs';

const specs = [
  { lesson: 'opening', profile: 'opening-consensus', names: ['problem', 'accomplishment'], ids: ['problem-input', 'accomplishment-input'], output: 'draft-input',
    source: 'opening.html', start: 'const problem = document.getElementById("problem-input")', end: '    });' },
  { lesson: 'middle', profile: 'middle-evidence', names: ['source', 'finding', 'why'], ids: ['source', 'finding', 'why'], output: 'assembled',
    source: 'assets/js/middle.js', start: "const source=$('source').value.trim()", end: 'assembled=true;' },
  { lesson: 'final', profile: 'final-synthesis', names: ['contributors', 'relationship', 'recommendation'], ids: ['build-1', 'build-2', 'build-3'], output: 'assembled',
    source: 'assets/js/final.js', start: 'const fields=["build-1","build-2","build-3"]', end: 'state.assembled=true;' }
];
function baseline(spec, values) {
  const source = original(spec.source).toString(), start = source.indexOf(spec.start);
  assert.ok(start > 0);
  const body = source.slice(start, source.indexOf(spec.end, start));
  const elements = Object.fromEntries(spec.ids.map((id, index) => [id, { value: values[index] }]));
  elements[spec.output] = { value: null, dispatchEvent() {}, focus() {} };
  const get = id => elements[id] ||= { value: '', textContent: '' };
  runInNewContext(`(() => { ${body} })()`, { document: { getElementById: get }, $: get, setText() {}, Event: class {} });
  return elements[spec.output].value;
}
for (const spec of specs) {
  test(`${spec.lesson}: content template and exact formatter match the actual pinned legacy handler`, () => {
    const cases = [
      ['  Access barriers?!  ', '  Created a PLAN.?!  ', '  We Recommend a Pilot?!  '],
      ['First...   ', 'Second?!   ', 'THIRD.   '],
      ['Māya\n學生', 'ÉVIDENCE\nNext line.', 'İNSIGHT\nKeep CAPS!'],
      ['0', '0', '0'], ['<img src=x onerror=alert(1)>', '{source} ${x}', 'A & B'],
      ['!!!', '???', '...'], ['', 'Finding', 'Why'], ['Source', '   ', 'Why'], ['Source', 'Finding', '   ']
    ];
    for (const values of cases) {
      const fields = Object.fromEntries(spec.names.map((name, index) => [name, values[index]]));
      assert.equal(formatWriting(spec.profile, fields, writingTemplates[spec.profile]), baseline(spec, values), JSON.stringify(values));
    }
  });
}
test('legacy algorithms deliberately differ: no grammar repair, punctuation normalization or extra lowercasing', () => {
  assert.equal(formatWriting('opening-consensus', { problem: '  A.!  ', accomplishment: '  DONE?!  ' }, writingTemplates['opening-consensus']),
    'By the end of this discussion, will the group agree that we have DONE to address A?');
  assert.equal(formatWriting('middle-evidence', { source: 'Report.', finding: 'FACT!?', why: 'Reason!.' }, writingTemplates['middle-evidence']),
    'According to Report., FACT!?. This matters to our task because Reason!.');
  assert.equal(formatWriting('final-synthesis', { contributors: 'Maya!', relationship: 'IDEAS?!', recommendation: 'WE Should?!' }, writingTemplates['final-synthesis']),
    'Building on Maya, iDEAS. Therefore, wE Should?!');
});
test('templates allow only named plain-text fields, never expressions, HTML evaluation or recursive interpolation', () => {
  assert.throws(() => formatWriting('unknown', {}, ''), /Unsupported/);
  for (const template of ['{other}', '{constructor}', '{problem.toLowerCase()}', '${problem + 1}', '{{problem}}']) {
    assert.throws(() => formatWriting('opening-consensus', { problem: 'x', accomplishment: 'y' }, template), /template/i);
  }
  assert.equal(formatWriting('opening-consensus', { problem: '{accomplishment}', accomplishment: '<script>plain</script>' }, '{problem} — {accomplishment}'),
    '{accomplishment} — <script>plain</script>');
});
test('writing/checklist/clipboard/reference modules stay isolated from live engines and progress discovery', () => {
  for (const file of ['components/writing-activity', 'components/checklist', 'utilities/clipboard']) {
    const source = readFileSync(new URL(`../../assets/js/${file}.js`, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /localStorage|document\.querySelector|fetch\(|\.complete\(|innerHTML|new Function|eval\(/);
  }
  for (const lesson of ['opening', 'final']) {
    const html = readFileSync(new URL(`../../${lesson}.html`, import.meta.url), 'utf8');
    assert.doesNotMatch(html, /writing-activity|checklist\.js|reference-loader|components\.css/);
  }
  const loader = readFileSync(new URL('../../assets/js/app/reference-loader.js', import.meta.url), 'utf8');
  assert.match(loader, /import \{ renderReferenceItems \} from '\.\.\/components\/quick-reference\.js'/);
  assert.doesNotMatch(loader, /localStorage|\.complete\(|innerHTML/);
});
