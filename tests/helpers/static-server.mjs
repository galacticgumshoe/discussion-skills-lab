import http from 'node:http';
import { readFile, realpath } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { root, original, productionPaths } from './baseline-source.mjs';

const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.md': 'text/plain; charset=utf-8', '.png': 'image/png', '.pdf': 'application/pdf' };

// New public entries belong only to the current site, never original-engine replay.
const currentRootEntries = ['before-round.html'];

export async function startServer(port = 0) {
  // Read once at startup. Missing Git objects are a hard error, not a checkout fallback.
  const replay = new Map(productionPaths.map(path => [path, original(path)]));
  const server = http.createServer(async (req, res) => {
    const finish = (status, body = '') => { res.writeHead(status); res.end(body); };
    if (!['GET', 'HEAD'].includes(req.method)) return finish(405);
    let path;
    try {
      path = decodeURIComponent(req.url.split('?')[0]);
      if (!path.startsWith('/') || /[\\\0%]/.test(path) || path.split('/').some(s => s === '..' || s === '.')) return finish(400);
    } catch { return finish(400); }
    const isReplay = path.startsWith('/__original/');
    if (isReplay) path = path.slice('/__original'.length);
    if (path.startsWith('/discussion-skills-lab/')) path = path.slice('/discussion-skills-lab'.length);
    const isFixture = !isReplay && path.startsWith('/__fixtures/');
    if (path === '/') path = '/index.html';
    const relative = isFixture ? `tests/fixtures/${path.slice('/__fixtures/'.length)}` : path.slice(1);
    try {
      let bytes;
      if (isReplay) {
        if (!replay.has(relative)) return finish(404);
        bytes = replay.get(relative);
      } else {
        // Current checkout may gain static assets/content in later milestones;
        // only replay is permanently limited to the original file allowlist.
        const staticSubtree = /^(assets|content|lessons)\//.test(relative) && !relative.split('/').some(s => s.startsWith('.'));
        if (!isFixture && !productionPaths.includes(relative) && !currentRootEntries.includes(relative) && !staticSubtree) return finish(404);
        const file = await realpath(resolve(root, relative));
        const allowedRoot = isFixture ? resolve(root, 'tests/fixtures') : staticSubtree ? resolve(root, relative.split('/')[0]) : resolve(root);
        if (!file.startsWith(allowedRoot + sep)) return finish(403);
        bytes = await readFile(file);
      }
      res.writeHead(200, { 'Content-Type': mime[extname(relative)] || 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(req.method === 'HEAD' ? undefined : bytes);
    } catch { finish(404); }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', resolve);
  });
  return { server, url: `http://127.0.0.1:${server.address().port}`,
    close: () => new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT || 0);
  const running = await startServer(port);
  console.log(running.url);
  for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, async () => { await running.close(); process.exit(0); });
}
