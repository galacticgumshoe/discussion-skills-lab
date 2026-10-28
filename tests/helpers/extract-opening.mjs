// MIT. Exclusive pinned extraction; instructional content © Rhys Jones / CC BY 4.0.
// Never overwrite reviewed content or sealed originals.
import { chromium } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { original } from './baseline-source.mjs';
import { writingActivities } from '../fixtures/harness/writing-data.mjs';

export async function extractOpening() {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const map = JSON.parse(await readFile(new URL('../fixtures/legacy-maps/opening.json', import.meta.url)));
    const banks = JSON.parse(await readFile(new URL('../fixtures/content/banks.json', import.meta.url)));
    const source = original('opening.html').toString();
    const writing = await page.evaluate(({ source, banks, map, fn }) => (0, eval)(`(${fn})`)(new DOMParser().parseFromString(source, 'text/html'), banks, map, 'opening'), {
      source, banks, map, fn: writingActivities.toString().replace('template: writingTemplates[profile]', "template: 'By the end of this discussion, will the group agree that we have {accomplishment} to address {problem}?'")
    });
    return await page.evaluate(({ source, banks: allBanks, map, writing }) => {
      const doc = new DOMParser().parseFromString(source, 'text/html'), files = {}, coverage = [], banks = allBanks.opening;
      const text = n => n.textContent.replace(/\s+/g, ' ').trim();
      const md = n => {
        if (n.nodeType === 3) return n.textContent.replace(/\s+/g, ' ');
        const inner = [...n.childNodes].map(md).join('');
        switch (n.localName) {
          case 'b': case 'strong': return `**${inner.trim()}**`;
          case 'em': case 'i': return `*${inner.trim()}*`;
          case 'br': return '  \n';
          case 'li': return `${n.parentElement.localName === 'ol' ? [...n.parentElement.children].indexOf(n) + 1 + '.' : '-'} ${inner.trim()}\n`;
          case 'ul': case 'ol': return `\n${inner.trim()}\n\n`;
          case 'h3': return `\n### ${inner.trim()}\n\n`;
          case 'blockquote': return `\n${inner.trim().split('\n').map(line => `> ${line}`).join('\n')}\n\n`;
          case 'p': case 'div': return `\n${n.matches('.font-bold') ? `**${inner.trim()}**` : inner.trim()}\n\n`;
          default: return inner;
        }
      };
      let serial = 0;
      const markdown = n => {
        const path = `sections/fragment-${++serial}.md`;
        files[`content/opening/${path}`] = md(n).trim() + '\n';
        coverage.push({ source: n.id || n.dataset.templateId || n.localName, destination: path, text: text(n) });
        return { type: 'markdown', source: path, ...(n.localName === 'h3' && n.id ? { headingId: n.id } : {}), ...(n.matches('.text-3xl[aria-hidden]') ? { textStyle: 'symbol' } : n.matches('.eyebrow') ? { textStyle: 'label' } : n.matches('p.text-\\[\\#526b7d\\]') ? { textStyle: 'lead' } : n.matches('.font-bold,.font-semibold') ? { textStyle: 'instruction' } : {}) };
      };
      const group = (blocks, layout = 'stack', tone = 'plain') => ({ type: 'group', layout, tone, blocks });
      const put = a => { files[`content/opening/activities/${a.id}.json`] = JSON.stringify({ schemaVersion: 1, ...a }, null, 2) + '\n'; return { type: 'activity', activityId: a.id }; };
      const activity = id => ({ type: 'activity', activityId: id });
      const classification = put({ id: 'classification', type: 'question-sequence', profile: 'opening-classification', data: { questions: banks.classification.map((q, i) => ({
        id: map.activities.classification.questions[i], prompt: q.text, correctOptionId: q.answer,
        options: ['procedural', 'substantive'].map(id => ({ id, text: id === 'procedural' ? 'Procedural' : 'Substantive', feedback: `${id === q.answer ? 'Correct.' : `Not quite. This is ${q.answer}.`} ${q.why}` }))
      })) } });
      put({ id: 'timeline', type: 'expandables', profile: 'timeline', data: { items: [...doc.querySelectorAll('.timeline-item')].map(n => ({
        id: map.activities.timeline.panels[n.querySelector('p').id], title: n.querySelector('button').firstChild.textContent.trim(), body: text(n.querySelector('p'))
      })) } });
      put({ id: 'sequence-checkpoint', type: 'multiple-choice', profile: 'standard', data: {
        id: 'next-step', prompt: text(doc.querySelector('#sequence-check > p')), correctOptionId: 'clarify-task',
        options: [...doc.querySelectorAll('.sequence-choices button')].map((n, i) => ({ id: map.activities['sequence-checkpoint'].options[i], text: text(n), feedback: n.dataset.correct === 'true' ? 'Correct. Clarify the task before setting direction.' : 'Not quite. The group needs shared understanding before setting direction.' }))
      } });
      const task = doc.querySelector('blockquote:has(.task-mark)');
      const segments = [...task.childNodes].map(n => ({ text: n.textContent.replace(/\s+/g, ' '), ...(n.nodeType === 1 ? { categoryId: n.dataset.kind } : {}) }));
      segments[0].text = segments[0].text.trimStart(); segments.at(-1).text = segments.at(-1).text.trimEnd();
      put({ id: 'task-analysis', type: 'task-analysis', data: {
        segments, categories: [...doc.querySelectorAll('.analysis-tab')].map(n => ({ id: n.dataset.kind, explorationId: map.activities['task-analysis'].panels[n.dataset.kind], label: text(n), answerLabel: n.dataset.kind === 'terms' ? 'SEARCH TERMS' : text(n), explanation: banks.analysisAnswers[n.dataset.kind], highlights: n.dataset.kind === 'terms' ? ['who', 'what'] : [n.dataset.kind] })),
        initialMessage: text(doc.querySelector('#analysis-result')), termsNote: text(doc.querySelector('#terms-note')), tablistLabel: doc.querySelector('[role=tablist]').getAttribute('aria-label')
      } });
      for (const [key, id, selector] of [['whatHow', 'what-how', '#view-2 > .card:last-child > p'], ['clarification', 'clarification', '#view-3 .card:last-child > p'], ['research', 'research', '#view-5 > .card > p.font-semibold']]) {
        const q = banks.practice[key], mapping = map.activities[id];
        put({ id, type: 'multiple-choice', profile: 'standard', data: { id: mapping.question, prompt: text(doc.querySelector(selector)), correctOptionId: mapping.options[q.correct], options: q.options.map((text, i) => ({ id: mapping.options[i], text, feedback: `${i === q.correct ? 'Correct.' : 'Not quite.'} ${q.explanation}` })) } });
      }
      const w = writing[0];
      w.data.copyMessages = { empty: 'There is nothing to copy yet.', copied: 'Copied to clipboard.', selected: 'Copy is unavailable here. Select the text and copy it manually.', fallback: 'Copy is unavailable here. Select the text and copy it manually.' };
      put({ id: w.id, type: 'writing', profile: w.profile, binding: { modelUi: w.modelUi }, data: w.data });
      put({ id: w.checklist.id, type: 'checklist', data: w.checklist.data });
      put({ id: 'knowledge-check', type: 'question-sequence', profile: 'opening-knowledge-check', data: {
        questions: banks.quiz.map((q, i) => ({ id: map.activities['knowledge-check'].questions[i], prompt: q.prompt, correctOptionId: map.activities['knowledge-check'].options[i][q.correct], options: q.options.map((text, n) => ({ id: map.activities['knowledge-check'].options[i][n], text, feedback: `${n === q.correct ? 'Correct.' : 'Not quite.'} ${q.explanation}` })) })),
        retryLabel: text(doc.querySelector('#retry-missed')), summary: {
          title: text(doc.querySelector('#quiz-summary h3')), scorePrefix: 'Knowledge check: ', scoreSeparator: ' of ', scoreSuffix: ' correct.',
          completeMessage: 'Excellent work. You can still explore other answers without losing completion credit.', remainingTemplate: 'Review the feedback and select the correct option for {count} remaining {questions}.', singular: 'question', plural: 'questions'
        }
      } });
      const skip = new Set(['sequence-check', 'question-builder', 'quiz-list', 'quiz-summary']);
      function convert(n) {
        if (n.nodeType !== 1 || n.matches('h2,.lesson-view > .eyebrow') || skip.has(n.id)) return [];
        if (n.getAttribute('aria-labelledby') === 'classify-title') return [group([markdown(n.querySelector('h3')), markdown(n.querySelector('p')), classification], 'stack', 'activity')];
        if (n.querySelector(':scope > .timeline-item')) return [group([markdown(n.querySelector('h3')), activity('timeline')], 'stack', 'activity')];
        if (n.querySelector(':scope > blockquote .task-mark')) return [group([markdown(n.querySelector('h3')), markdown(n.querySelector('p')), activity('task-analysis')], 'stack', 'activity')];
        const decision = n.querySelector(':scope > #what-how-options,:scope > #clarification-options,:scope > #research-options');
        if (decision) return [group([markdown(n.querySelector('h3')), ...[...n.children].filter(c => c.matches('blockquote,.soft')).map(markdown), activity({ 'what-how-options': 'what-how', 'clarification-options': 'clarification', 'research-options': 'research' }[decision.id])], 'stack', 'activity')];
        if (n.querySelector(':scope > #question-builder')) return [group([markdown(n.querySelector('h3')), markdown(n.querySelector('p')), activity('consensus-writing')], 'stack', 'activity')];
        if (n.querySelector('#question-selfcheck')) return [group([markdown(n.querySelector('h3')), markdown(n.querySelector('p')), activity('question-selfcheck')], 'stack', 'activity')];
        if (n.matches('.feedback')) return [group([markdown(n)], 'stack', 'example')];
        if (n.matches('p,h3,blockquote,strong,ul,ol,span')) return [markdown(n)];
        if (n.matches('.text-3xl')) return [markdown(n)];
        const children = [...n.children].flatMap(convert);
        const layout = n.matches('.grid') ? n.matches('.md\\:grid-cols-2,.sm\\:grid-cols-2:not(.lg\\:grid-cols-3)') ? 'two-column' : 'flow' : 'stack';
        const tone = n.matches('.soft') ? 'soft' : n.matches('.card') ? 'activity' : 'plain';
        return children.length ? [group(children, layout, tone)] : text(n) ? [markdown(n)] : [];
      }
      const js = doc.querySelectorAll('script')[doc.querySelectorAll('script').length - 1].textContent;
      const labels = (0, eval)(js.match(/labels:(\[[^\n]+\])/)[1]), requirements = (0, eval)(js.match(/requirements:(\[[\s\S]+?\])\s*\}/)[1]);
      const sections = map.sections.map((id, i) => {
        const view = doc.getElementById(`view-${i}`), heading = view.querySelector('h2');
        const blocks = i === 7 ? [{ type: 'reference', source: 'reference/reference.json', printLabel: text(view.querySelector('button')) }] : [...view.children].flatMap(convert);
        if (i === 1) blocks.push(group([markdown(doc.querySelector('#sequence-check h3')), activity('sequence-checkpoint')], 'stack', 'activity'));
        if (i === 6) blocks.push(activity('knowledge-check'));
        const gates = [], collect = blocks => blocks.forEach(b => { if (b.type === 'activity') gates.push(b.activityId); if (b.blocks) collect(b.blocks); }); collect(blocks);
        return { id, label: labels[i], heading: text(heading), headingId: heading.id, headingLevel: 2, eyebrow: text(view.querySelector(':scope > .eyebrow')), requirement: requirements[i] || 'Quick reference is always available.', reference: i === 7, gateActivityIds: gates, blocks };
      });
      const activities = Object.keys(files).filter(p => p.endsWith('.json')).map(p => ({ id: JSON.parse(files[p]).id, source: p.replace('content/opening/', '') }));
      files['content/opening/lesson.json'] = JSON.stringify({ schemaVersion: 1, id: 'opening', title: text(doc.querySelector('.topbar .font-semibold')), activities, sections }, null, 2) + '\n';
      const referenceItems = [...doc.querySelectorAll('#reference-content > section')].map((n, i) => {
        const heading = n.querySelector('h4'), clone = n.cloneNode(true); clone.firstElementChild.remove();
        // Explicit bounded cells become list items, never interpolated HTML.
        const cells = [...clone.querySelectorAll(':scope > .grid > div,:scope > .grid > span,:scope > .space-y-2 > div')];
        const list = doc.createElement('ul'); cells.forEach(cell => { const li = doc.createElement('li'); li.append(...cell.childNodes); list.append(li); cell.remove(); });
        if (cells.length) clone.prepend(list);
        const path = `reference/group-${i + 1}.md`;
        files[`content/opening/${path}`] = md(clone).trim() + '\n';
        coverage.push({ source: n.getAttribute('aria-labelledby'), destination: path, text: text(n) });
        return { id: ['opening-sequence', 'task-analysis', 'contributions', 'direction'][i], number: `0${i + 1}`, title: text(heading), accent: ['teal', 'blue', 'orange', 'purple'][i], source: `group-${i + 1}.md` };
      });
      files['content/opening/reference/reference.json'] = JSON.stringify({ schemaVersion: 1, id: 'opening-reference', title: text(doc.querySelector('#reference-heading')), badge: text(doc.querySelector('.canva-tag')), layout: 'opening-reference', items: referenceItems }, null, 2) + '\n';
      files['lessons/opening/config.json'] = JSON.stringify({ schemaVersion: 1, id: 'opening', storageKey: map.storageKey, content: '../../content/opening/lesson.json', sectionOrder: map.sections, referenceId: 'quick-reference', presentation: 'legacy-shell' }, null, 2) + '\n';
      return { files, coverage };
    }, { source, banks, map, writing });
  } finally { await browser.close(); }
}
if (process.argv.includes('--write-exclusive')) {
  const { files, coverage } = await extractOpening();
  for (const [path, value] of Object.entries(files)) {
    await mkdir(new URL(`../../${path.substring(0, path.lastIndexOf('/'))}/`, import.meta.url), { recursive: true });
    await writeFile(new URL(`../../${path}`, import.meta.url), value, { flag: 'wx' });
  }
  await writeFile(new URL('../../.opencode/docs/evidence/milestone-7-source-map.json', import.meta.url), JSON.stringify({ revision: '0b5d2297e7cbc19bd59cde750492dd28e3983ca0', files: Object.keys(files), coverage }, null, 2) + '\n', { flag: 'wx' });
  console.log(`Extracted ${Object.keys(files).length} files; ${coverage.length} source mappings.`);
}
