// MIT. Node >=22, development only. Never rewrite inputs.
import Ajv from 'ajv';
import { readFile, readdir, realpath, stat } from 'node:fs/promises';
import { resolve, sep, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { referenceSemanticErrors } from '../assets/js/app/content-validation.js';
import { resolveContentUrl } from '../assets/js/app/content-loader.js';

const project = fileURLToPath(new URL('../', import.meta.url));
const schema = JSON.parse(await readFile(new URL('../schemas/reference.schema.json', import.meta.url)));
const validateSchema = new Ajv({ allErrors: true, strict: true }).compile(schema);

export function validateReference(data, context) {
  const valid = validateSchema(data);
  return [
    ...(valid ? [] : validateSchema.errors.map(error => `${error.instancePath || '/'}: ${error.message}`)),
    ...referenceSemanticErrors(data, context)
  ];
}

export async function validateContent(directory = resolve(project, 'content')) {
  const errors = [];
  const root = await realpath(directory);
  const allowedRootUrl = new URL('https://content.invalid/content/');
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = resolve(dir, entry.name);
      if (entry.isDirectory()) { await walk(path); continue; }
      if (!entry.name.endsWith('.json')) continue;
      const label = relative(root, path).split(sep).join('/');
      const declaringUrl = new URL(label, allowedRootUrl);
      let data;
      try {
        const file = await realpath(path);
        if (!file.startsWith(root + sep)) { errors.push(`${label}: unsafe JSON file path`); continue; }
        data = JSON.parse(await readFile(file, 'utf8'));
      }
      catch { errors.push(`${label}: invalid JSON or unreadable file`); continue; }
      const problems = validateReference(data, { declaringUrl, allowedRootUrl });
      errors.push(...problems.map(error => `${label}${error}`));
      if (problems.length) continue;
      for (const [index, item] of data.items.entries()) {
        try {
          const url = resolveContentUrl(item.source, declaringUrl, allowedRootUrl);
          const file = await realpath(resolve(root, url.pathname.slice(allowedRootUrl.pathname.length)));
          if (!file.startsWith(root + sep) || !(await stat(file)).isFile()) throw new Error();
        } catch { errors.push(`${label}/items/${index}/source: missing file or unsafe resolved path`); }
      }
    }
  }
  await walk(root);
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const errors = await validateContent();
    if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
    else console.log('Content validation passed: reference schema, IDs, paths and Markdown files.');
  } catch { console.error('Content validation failed: content directory unavailable'); process.exitCode = 1; }
}
