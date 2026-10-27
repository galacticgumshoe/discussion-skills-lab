// MIT. Exclusive, pinned-source extraction; never overwrite reviewed content.
// Instructional content © Rhys Jones / CC BY 4.0.
import { chromium } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { original } from './baseline-source.mjs';
import { writingActivities } from '../fixtures/harness/writing-data.mjs';

export async function extractFinal() {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const map = JSON.parse(await readFile(new URL('../fixtures/legacy-maps/final.json', import.meta.url)));
    const banks = JSON.parse(await readFile(new URL('../fixtures/content/banks.json', import.meta.url)));
    const source = original('final.html').toString(), js = original('assets/js/final.js').toString();
    const writing = await page.evaluate(({ source, map, banks, fn }) => (0, eval)(`(${fn})`)(new DOMParser().parseFromString(source, 'text/html'), banks, map, 'final'), {
      source, map, banks, fn: writingActivities.toString().replace('template: writingTemplates[profile]', "template: 'Building on {contributors}, {relationship}. Therefore, {recommendation}'")
    });
    return await page.evaluate(({ source, js, map, banks, writing }) => {
      const document = new DOMParser().parseFromString(source, 'text/html'), files = {}, coverage = [];
      const text = node => node.textContent.replace(/\s+/g, ' ').trim();
      const md = node => {
        if (node.nodeType === 3) return node.textContent.replace(/\s+/g, ' ');
        const inner = [...node.childNodes].map(md).join('');
        switch (node.localName) {
          case 'strong': case 'b': return `**${inner.trim()}**`;
          case 'em': case 'i': return `*${inner.trim()}*`;
          case 'br': return '  \n';
          case 'li': return `- ${inner.trim()}\n`;
          case 'ul': case 'ol': return `\n${inner.trim()}\n\n`;
          case 'h2': return `\n## ${inner.trim()}\n\n`;
          case 'h3': return `\n### ${inner.trim()}\n\n`;
          case 'blockquote': return `\n${inner.trim().split('\n').map(line => `> ${line}`).join('\n')}\n\n`;
          case 'p': case 'div': return `\n${inner.trim()}\n\n`;
          default: return inner;
        }
      };
      let fragment = 0;
      const body = (node, name, activity = false) => {
        const path = `${activity ? 'activities/bodies' : 'sections'}/${name}.md`;
        files[`content/final/${path}`] = md(node).trim() + '\n';
        coverage.push({ source: node.id || node.dataset.templateId || node.localName, destination: path, text: text(node) });
        return activity ? `bodies/${name}.md` : path;
      };
      const put = activity => { files[`content/final/activities/${activity.id}.json`] = JSON.stringify(activity, null, 2) + '\n'; return { type: 'activity', activityId: activity.id }; };
      const activity = id => ({ type: 'activity', activityId: id });
      const markdown = node => ({ type: 'markdown', source: body(node, `fragment-${++fragment}`),
        ...(node.matches('.muted,.small,.font-bold,.font-semibold') ? { textStyle: node.matches('.small') ? 'note' : node.matches('.muted') ? 'lead' : node.matches('.font-bold') ? 'label' : 'instruction' } : {}) });
      const group = (blocks, layout = 'stack', tone = 'plain', revealId) => ({ type: 'group', layout, tone, ...(revealId ? { revealId } : {}), blocks });
      const cards = page => put({ schemaVersion: 1, id: `${map.sections[page]}-cards`, type: 'flashcards', data: {
        items: [...document.querySelectorAll(`.flip[data-page="${page}"]`)].map((card, i) => {
          const id = map.flips[page][i], front = card.querySelector('.flip-front').cloneNode(true), back = card.querySelector('.flip-back').cloneNode(true);
          front.querySelector('.dsl-flip-hint').remove(); back.querySelector('.visited').remove();
          return { id, frontSource: body(front, `${id}-front`, true), backSource: body(back, `${id}-back`, true) };
        })
      } });
      const panels = page => put({ schemaVersion: 1, id: `${map.sections[page]}-panels`, type: 'expandables', profile: 'standard', data: {
        items: [...document.querySelectorAll(`details[data-page="${page}"]`)].map((panel, i) => ({ id: map.panels[page][i], title: text(panel.querySelector('summary')), bodySource: body(panel.querySelector('.inner'), `${map.panels[page][i]}-panel`, true) }))
      } });
      const questionIds = {};
      for (const [page, questions] of Object.entries(banks.final.questions)) {
        const id = page === '8' ? 'knowledge-check' : `${map.sections[page]}-questions`; questionIds[`quiz-${page}`] = id;
        put({ schemaVersion: 1, id, type: 'question-sequence', profile: 'final-questions', data: {
          heading: page === '8' ? 'Knowledge check' : page === '7' ? 'Final-minutes decision' : page === '4' ? 'Consensus decision lab' : 'Practice activity',
          ...(page === '8' ? { counterScoreLabel: ' · Score ' } : {}),
          questions: questions.map((question, index) => ({ id: map.questions[page][index], prompt: question.q, ...(question.context ? { context: question.context } : {}), correctOptionId: map.options[page][index][question.correct],
            options: question.a.map((text, n) => ({ id: map.options[page][index][n], text, feedback: `${n === question.correct ? 'Correct.' : 'Not quite.'} ${question.why[n]}` })) }))
        } });
      }
      const categoryIds = ['problem-barriers', 'proposed-approach', 'group-agreement', 'unresolved-issue'];
      const categoryLiteral = js.match(/\[\["","Choose category"\].*?\]\]\.forEach/)[0].replace(/\.forEach$/, '');
      const categories = (0, eval)(categoryLiteral);
      put({ schemaVersion: 1, id: 'note-classification', type: 'note-classification', data: {
        chooseLabel: categories[0][1], correctPrefix: '✓ Correct. ', wrongPrefix: 'Try again. ',
        categories: categories.slice(1).map(([, label], i) => ({ id: categoryIds[i], label })),
        notes: banks.final.notes.map(([text, correct, feedback], i) => ({ id: map.notes[i], text, correctCategoryId: categoryIds[correct], feedback }))
      } });
      for (const item of writing) {
        item.data.copyMessages = { empty: 'Write a response before copying.' };
        const synthesis = item.id === 'synthesis-writing', edit = document.getElementById(synthesis ? 'edit-builder' : 'edit-closing');
        item.data.edit = { label: text(edit), ...(synthesis ? { message: 'Edit your fields, then assemble again when ready.' } : {}) };
        item.data.actionOrder = synthesis ? 'edit-copy-model' : 'model-copy-edit';
        if (synthesis) item.data.outputReveal = 'assembled';
        put({ schemaVersion: 1, id: item.id, type: 'writing', profile: item.profile, binding: { ...(item.assembledFlag ? { assembledFlag: item.assembledFlag } : {}), modelFlag: item.modelFlag }, data: item.data });
        put({ schemaVersion: 1, id: item.checklist.id, type: 'checklist', data: item.checklist.data });
      }
      const goals = (0, eval)(js.match(/const goalTexts=(\[[^;]+\]);/)[1]);
      put({ schemaVersion: 1, id: 'practice-goals', type: 'checklist', data: { items: map.goals.map((id, index) => ({ id, text: goals[index] })), caption: { prefix: 'My practice goals: ', empty: text(document.getElementById('selected-goals')) } } });
      const seenPanels = new Set();
      function convert(node) {
        if (node.nodeType !== 1) return [];
        if (/^title-\d$/.test(node.id) || node.matches('.eyebrow')) return [];
        if (node.matches('details.panel')) { const page = node.dataset.page; if (seenPanels.has(page)) return []; seenPanels.add(page); return [panels(page)]; }
        if (questionIds[node.id]) return [group([activity(questionIds[node.id])], 'stack', 'activity')];
        if (node.querySelector(':scope > .flip')) return [cards(node.querySelector('.flip').dataset.page)];
        if (node.id === 'builder-area' || node.id === 'closing-area') {
          const synthesis = node.id === 'builder-area', id = synthesis ? 'synthesis' : 'closing';
          const checkBlocks = [...node.querySelector(`#checklist-${synthesis ? 2 : 7}`).children].map(markdown);
          const title = document.createElement('h3'); title.textContent = 'Self-assessment'; checkBlocks.push(markdown(title), activity(`${id}-checklist`));
          return [group([markdown(node.querySelector('h3')), ...(!synthesis ? [markdown(node.querySelector('p'))] : []), activity(`${id}-writing`), group(checkBlocks, 'stack', 'plain', `${id}-checks`)], 'stack', 'callout', node.id)];
        }
        if (node.id === 'note-list') return [activity('note-classification')];
        if (node.id === 'goals') return [activity('practice-goals')];
        if (node.id === 'selected-goals' || node.id === 'complete-progress') return [];
        if (node.id === 'final-score') return [{ type: 'progress', activityId: 'knowledge-check', questionIds: map.questions[8], scorePrefix: 'Final score: ', scoreSeparator: ' / ', progressSuffix: ' of 9 lesson pages complete.' }];
        if (node.querySelector(':scope > #complete-reference')) return [{ type: 'navigation', actions: [...node.children].map(button => ({ sectionId: button.id === 'complete-reference' ? 'quick-reference' : 'welcome', label: text(button) })) }];
        if (node.matches('button,input,textarea,label,[role=status]') || !text(node) && !node.children.length) return [];
        if (node.id === 'welcome-ready') return [group([markdown(node)], 'stack', 'example', node.id)];
        if (node.matches('p,h2,h3,strong') || node.matches('.notice,.speaker')) {
          if (node.matches('.notice')) return [group([markdown(node)], 'stack', 'caution')];
          return [markdown(node)];
        }
        const blocks = [...node.children].flatMap(convert);
        if (!blocks.length) return text(node) ? [markdown(node)] : [];
        const revealId = node.id === 'completion' || /^s[1-6]-(reveal|summary)$/.test(node.id) ? node.id : undefined;
        const layout = node.classList.contains('gridcards') ? node.querySelector('.speaker') ? 'roundtable' : node.querySelectorAll(':scope > div').length === 3 ? 'flow' : 'two-column' : 'stack';
        const tone = node.classList.contains('activity') ? 'activity' : node.classList.contains('card') ? 'callout' : node.classList.contains('feedback') ? 'example' : 'plain';
        return [group(blocks, layout, tone, revealId)];
      }
      const labels = (0, eval)(js.match(/labels:(\[[^\n]+?\]),requirements/)[1]);
      const sections = map.sections.map((id, i) => {
        const view = document.getElementById(`view-${i}`), heading = view.querySelector('h1,h2'), eyebrow = view.querySelector(':scope > .eyebrow');
        const blocks = i === 9 ? [{ type: 'reference', source: 'reference/reference.json', printLabel: text(view.querySelector('#ref-print')) }] : [...view.children].flatMap(convert);
        const gateActivityIds = [];
        const collect = blocks => blocks.forEach(block => { if (block.type === 'activity' && block.activityId !== 'practice-goals') gateActivityIds.push(block.activityId); if (block.type === 'group') collect(block.blocks); }); collect(blocks);
        return { id, label: labels[i], heading: text(heading), headingId: heading.id, headingLevel: i ? 2 : 1, ...(eyebrow ? { eyebrow: text(eyebrow) } : {}), requirement: 'Complete the activities on this page to unlock Next.', reference: i === 9, gateActivityIds, blocks };
      });
      const activities = Object.keys(files).filter(path => path.endsWith('.json')).map(path => ({ id: JSON.parse(files[path]).id, source: path.replace('content/final/', '') }));
      files['content/final/lesson.json'] = JSON.stringify({ schemaVersion: 1, id: 'final', title: 'Closing with Purpose · The Final Stage', activities, sections }, null, 2) + '\n';
      files['lessons/final/config.json'] = JSON.stringify({ schemaVersion: 1, id: 'final', storageKey: map.storageKey, content: '../../content/final/lesson.json', sectionOrder: map.sections, referenceId: 'quick-reference', presentation: 'legacy-shell' }, null, 2) + '\n';
      return { files, coverage };
    }, { source, js, map, banks, writing });
  } finally { await browser.close(); }
}

if (process.argv.includes('--write-exclusive')) {
  const { files, coverage } = await extractFinal();
  for (const [path, value] of Object.entries(files)) {
    await mkdir(new URL(`../../${path.substring(0, path.lastIndexOf('/'))}/`, import.meta.url), { recursive: true });
    await writeFile(new URL(`../../${path}`, import.meta.url), value, { flag: 'wx' });
  }
  console.log(`Extracted ${Object.keys(files).length} files; ${coverage.length} Markdown mappings.`);
}
if (process.argv.includes('--inventory-exclusive')) {
  const { files, coverage } = await extractFinal();
  const destination = new URL('../../.opencode/docs/evidence/milestone-6-source-map.json', import.meta.url);
  await writeFile(destination, JSON.stringify({ revision: '0b5d2297e7cbc19bd59cde750492dd28e3983ca0', files: Object.keys(files), coverage }, null, 2) + '\n', { flag: 'wx' });
  console.log(`Recorded ${coverage.length} source mappings without rewriting content.`);
}
