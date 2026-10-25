import { auditProduction, revision } from './baseline-source.mjs';
const files = auditProduction();
console.log(JSON.stringify({ revision, files }, null, 2));
if (files.some(file => !file.matches)) process.exitCode = 1;
