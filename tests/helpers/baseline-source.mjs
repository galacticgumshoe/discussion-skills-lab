import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export const root = fileURLToPath(new URL('../../', import.meta.url));
export const revision = '0b5d2297e7cbc19bd59cde750492dd28e3983ca0';
// Fixed audited allowlist: never derived from a request or a moving branch.
export const productionPaths = [
  '.nojekyll', 'CONTENT_LICENSE.md', 'LICENSE', 'README.md',
  'assets/css/final.css', 'assets/css/middle.css', 'assets/css/shared.css',
  'assets/favicon.svg', 'assets/js/final.js', 'assets/js/lesson-core.js',
  'assets/js/middle.js', 'final.html', 'index.html', 'middle.html', 'opening.html'
];
export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export function original(path) {
  if (!productionPaths.includes(path)) throw Error('Not a baseline production path');
  return execFileSync('git', ['show', `${revision}:${path}`], { cwd: root });
}
export function auditProduction() {
  return productionPaths.map(path => {
    const baseline = sha256(original(path));
    const checkout = sha256(readFileSync(resolve(root, path)));
    return { path, sha256: baseline, checkout, matches: baseline === checkout };
  });
}
