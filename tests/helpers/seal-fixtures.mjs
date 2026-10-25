// Explicit one-time seal; never invoked by test scripts or snapshot updating.
import { readdir, readFile } from 'node:fs/promises';
import { root, revision, sha256 } from './baseline-source.mjs';
import { freeze } from './freeze-source.mjs';
const directory = `${root}tests/fixtures/`;
const files = (await readdir(directory, { recursive: true, withFileTypes: true }))
  .filter(entry => entry.isFile())
  .map(entry => `${entry.parentPath}/${entry.name}`.slice(directory.length))
  .filter(path => path !== 'manifest.json').sort();
const hashes = await Promise.all(files.map(async path => ({ path, sha256: sha256(await readFile(directory + path)) })));
await freeze('manifest.json', { revision, algorithm: 'sha256', files: hashes });
