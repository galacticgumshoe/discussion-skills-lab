// MIT. Explicit, exclusive evidence archive; does not update baseline fixtures.
import { readFile, writeFile, mkdir, copyFile, constants } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
const name = process.argv[2];
if (!name || !/^[a-z0-9-]+$/.test(name)) throw new Error('Supply a new evidence directory name');
const directory = resolve('.opencode/docs/evidence/milestone-6-presentation', name);
const bytes = await readFile('test-results/results.json'), report = JSON.parse(bytes), index = [];
await mkdir(directory, { recursive: true });
await writeFile(resolve(directory, 'results.json'), bytes, { flag: 'wx' });
const walk = async suite => {
  for (const spec of suite.specs || []) for (const test of spec.tests) for (const result of test.results) {
    const match = spec.title.match(/^(\/|\/discussion-skills-lab\/) Final section (\d) .* at (\d+)px$/);
    const chosen = spec.title.includes('Final approved') || match && (test.projectName === 'chromium' && match[1] === '/' || test.projectName === 'webkit' && match[1] !== '/' && match[3] === '780' || test.projectName === 'firefox' && match[1] === '/' && match[3] === '1440' || test.projectName === 'mobile-chromium' && match[1] === '/' && match[3] === '390');
    for (const attachment of result.attachments || []) {
      if (process.argv.includes('--report-only') || !attachment.path || !chosen && attachment.contentType !== 'application/pdf') continue;
      const extension = attachment.contentType === 'image/png' ? 'png' : 'pdf';
      const path = match ? `${test.projectName}-${match[1] === '/' ? 'root' : 'repository'}-section-${match[2]}-${match[3]}-${attachment.name}.png` : `${test.projectName}-${index.length}-${attachment.name}.${extension}`;
      await copyFile(attachment.path, resolve(directory, path), constants.COPYFILE_EXCL);
      index.push({ test: spec.title, project: test.projectName, status: result.status, path, sha256: createHash('sha256').update(await readFile(attachment.path)).digest('hex') });
    }
  }
  for (const child of suite.suites || []) await walk(child);
};
await walk(report);
await writeFile(resolve(directory, 'captures.json'), JSON.stringify({ reportSha256: createHash('sha256').update(bytes).digest('hex'), stats: report.stats, captures: index }, null, 2) + '\n', { flag: 'wx' });
console.log(`Archived report and ${index.length} captures in ${directory}`);
