// One-time provenance capture. Exclusive writes refuse to replace historical evidence.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { original, revision, productionPaths, auditProduction, root } from './baseline-source.mjs';
import { extractBanks } from './content-baseline.mjs';
export async function freeze(path, value) {
  const file = `${root}tests/fixtures/${path}`;
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, typeof value === 'string' || Buffer.isBuffer(value) ? value : JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const files = auditProduction();
  if (files.some(file => !file.matches)) throw Error('Checkout differs from pinned production; baseline decision required');
  const sources = Object.fromEntries(productionPaths.map(path => [path, original(path).toString()]));
  await freeze('production.json', { revision, algorithm: 'sha256', files: files.map(({ path, sha256 }) => ({ path, sha256 })) });
  for (const path of productionPaths) await freeze(`content/source/${path}`, original(path));
  await freeze('content/banks.json', extractBanks(sources));
  // Every source line remains indexed, including unused JS strings and sentence/copy
  // templates not represented in the data banks. This is an archive, not published content.
  const index = Object.entries(sources).filter(([path]) => /\.(html|js)$/.test(path))
    .flatMap(([file, source]) => source.split('\n').flatMap((value, i) => value.trim() ? [{
      file, line: i + 1, type: file.endsWith('.js') ? 'script-source' : 'markup-source', value,
      status: 'source-archive-including-unused',
      destination: file === 'index.html' ? 'homepage; archive any unused variants'
        : `content/${file.includes('middle') ? 'middle' : file.includes('final') ? 'final' : file.includes('opening') ? 'opening' : 'shared'}/; retain runtime strings with owning activity`
    }] : []));
  await freeze('content/source-index.json', index);
}
