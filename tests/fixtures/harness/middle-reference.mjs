// MIT. No activity engine/store/writer; exercise the existing reference pipeline.
import { mountReference } from '../../../assets/js/app/reference-loader.js';

const fixtureAlias = new URL(import.meta.url).pathname.includes('/__fixtures/');
const contentRoot = new URL(fixtureAlias ? '../../content/' : '../../../content/', import.meta.url);
const root = document.querySelector('#view-8');
const reference = mountReference(root, { source: 'middle/reference/reference.json', declaringUrl: new URL('index.json', contentRoot), allowedRootUrl: contentRoot });
document.querySelector('#show-reference').addEventListener('click', () => {
  document.querySelector('#view-0').hidden = true;
  root.hidden = false; root.classList.add('active');
});
window.middleReference = reference;
await reference.ready;
document.documentElement.dataset.ready = 'true';
