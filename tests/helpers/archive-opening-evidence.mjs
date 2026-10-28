// MIT. Explicit exclusive archive of scoped results; never changes tests/baselines.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
const name = process.argv[2];
if (!name || !/^[a-z0-9-]+$/.test(name)) throw new Error('Supply a new evidence directory name');
const directory = resolve('.opencode/docs/evidence/milestone-7-presentation', name);
const bytes = await readFile('test-results/results.json'), report = JSON.parse(bytes), captures = [];
await mkdir(directory, { recursive: true });
// Reporter bodies can exceed hundreds of MB. Archive result/attachment hashes
// and selected original/current captures, not duplicate every base64 PNG payload.
async function walk(suite) {
  for (const spec of suite.specs || []) for (const test of spec.tests) for (const result of test.results) {
    if (/middle|final (?!knowledge)/i.test(spec.title) && !/Opening|opening/.test(spec.title)) throw new Error('Unexpected non-Opening test');
    const pair = spec.title.match(/^(\/|\/discussion-skills-lab\/) Opening every section\/state .* at (\d+)px$/);
    const essentials = spec.title.includes('Opening essentials');
    const chosen = essentials || pair && (test.projectName === 'chromium' && pair[1] === '/' || test.projectName === 'webkit' && pair[1] !== '/' && pair[2] === '780');
    for (const attachment of result.attachments || []) {
      const data = attachment.body ? Buffer.from(attachment.body, 'base64') : attachment.path ? await readFile(attachment.path) : null;
      if (!data) continue;
      attachment.sha256 = createHash('sha256').update(data).digest('hex');
      delete attachment.body;
      if (process.argv.includes('--report-only') || !chosen && attachment.contentType !== 'application/pdf' || !['image/png', 'application/pdf'].includes(attachment.contentType)) continue;
      const extension = attachment.contentType === 'image/png' ? 'png' : 'pdf';
      const path = `${test.projectName}-${spec.title.startsWith('/ Opening') ? 'root' : 'repository'}-${captures.length}-${attachment.name.replace(/[^a-zA-Z0-9-]/g, '-')}.${extension}`;
      await writeFile(resolve(directory, path), data, { flag: 'wx' });
      captures.push({ test: spec.title, project: test.projectName, status: result.status, path, sha256: attachment.sha256 });
    }
  }
  for (const child of suite.suites || []) await walk(child);
}
await walk(report);
await writeFile(resolve(directory, 'results.json'), JSON.stringify(report, null, 2) + '\n', { flag: 'wx' });
await writeFile(resolve(directory, 'captures.json'), JSON.stringify({ originalReportSha256: createHash('sha256').update(bytes).digest('hex'), stats: report.stats, captures }, null, 2) + '\n', { flag: 'wx' });
console.log(`Archived scoped report and ${captures.length} captures in ${directory}`);
