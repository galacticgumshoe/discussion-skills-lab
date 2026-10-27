// MIT extraction tool, deliberately exclusive: never overwrite reviewed content.
// Original instructional content © Rhys Jones / CC BY 4.0, pinned 0b5d229.
import { chromium } from '@playwright/test';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { original } from './baseline-source.mjs';
import { writingActivities } from '../fixtures/harness/writing-data.mjs';

export async function extractMiddle() {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const map = JSON.parse(await readFile(new URL('../fixtures/legacy-maps/middle.json', import.meta.url)));
    const banks = JSON.parse(await readFile(new URL('../fixtures/content/banks.json', import.meta.url)));
    const source = original('middle.html').toString(), js = original('assets/js/middle.js').toString();
    const writing = await page.evaluate(({ source, js, map, banks, fn }) => {
      const document = new DOMParser().parseFromString(source, 'text/html');
      return (0, eval)(`(${fn})`)(document, banks, map, 'middle', js);
    }, { source, js, map, banks, fn: writingActivities.toString().replace('template: writingTemplates[profile]', "template: 'According to {source}, {finding}. This matters to our task because {why}.'") });
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
          case 'h3': return `\n### ${inner.trim()}\n\n`;
          case 'blockquote': return `\n${inner.trim().split('\n').map(line => `> ${line}`).join('\n')}\n\n`;
          case 'p': case 'div': return `\n${inner.trim()}\n\n`;
          default: return inner;
        }
      };
      let fragment = 0;
      const body = (node, name, activity = false) => {
        const path = `${activity ? 'activities/bodies' : 'sections'}/${name}.md`;
        files[`content/middle/${path}`] = md(node).trim() + '\n';
        coverage.push({ source: node.id || node.localName, destination: path, text: text(node) });
        return activity ? `bodies/${name}.md` : path;
      };
      const put = activity => { files[`content/middle/activities/${activity.id}.json`] = JSON.stringify(activity, null, 2) + '\n'; return { type: 'activity', activityId: activity.id }; };
      const activity = id => ({ type: 'activity', activityId: id });
      const markdown = node => ({ type: 'markdown', source: body(node, `fragment-${++fragment}`),
        ...(node.matches('.lead,.smallnote,.font-semibold,.font-bold') ? { textStyle: node.matches('.lead') ? 'lead' : node.matches('.smallnote') ? 'note' : node.matches('.font-semibold') ? 'instruction' : 'label' } : {}) });
      const group = (blocks, layout = 'stack', tone = 'plain', revealId) => ({ type: 'group', layout, tone, ...(revealId ? { revealId } : {}), blocks });
      const cardGroups = { welcome: ['welcome-cards', Object.values(map.sets.flipped.welcome)], s1: ['structure-cards', Object.values(map.sets.flipped.s1)], models: ['research-model-cards', Object.values(map.sets.flipped.models)], speaking: ['speaking-cards', Object.values(map.sets.flipped.speaking)] };
      const cards = key => {
        const [id, ids] = cardGroups[key];
        const items = [...document.querySelectorAll(`[data-flip-group="${key}"]`)].map((card, i) => {
          const front = card.querySelector('.flip-front').cloneNode(true), back = card.querySelector('.flip-back').cloneNode(true);
          front.querySelector('.dsl-flip-hint').remove(); back.querySelector('.dsl-flip-explored').remove();
          const title = front.querySelector('.pill, :scope > strong'), frontTitle = title?.textContent.trim(); title?.remove();
          const backHeading = back.querySelector(':scope > strong'), backTitle = backHeading?.textContent.trim(); backHeading?.remove();
          return { id: ids[i], ...(frontTitle ? { frontTitle } : {}), ...(backTitle ? { backTitle } : {}), frontSource: body(front, `${ids[i]}-front`, true), backSource: body(back, `${ids[i]}-back`, true) };
        });
        return put({ schemaVersion: 1, id, type: 'flashcards', data: { items } });
      };
      const panelGroups = { 'evidence-details': ['evidence-panels', map.sets.evidenceOpened], 'collaboration-details': ['collaboration-panels', map.sets.openedDetails], 'communication-details': ['communication-panels', map.sets.communicationOpened], 'strategy-details': ['strategy-panels', map.sets.strategyOpened] };
      const panels = key => {
        const [id, ids] = panelGroups[key];
        const items = [...document.getElementById(key).children].map((detail, i) => {
          const node = detail.cloneNode(true), title = text(node.querySelector('summary')); node.querySelector('summary').remove();
          const calloutTones = [];
          for (const example of node.querySelectorAll('.example,.caution')) {
            calloutTones.push(example.classList.contains('caution') ? 'caution' : 'example');
            const quote = document.createElement('blockquote'); quote.append(...example.childNodes); example.replaceWith(quote);
          }
          return { id: ids[i], title, ...(calloutTones.includes('caution') ? { calloutTones } : {}), bodySource: body(node, `${ids[i]}-panel`, true) };
        });
        return put({ schemaVersion: 1, id, type: 'expandables', profile: 'standard', data: { items } });
      };
      for (const item of writing) {
        const model = item.data.model;
        const node = document.getElementById(item.id === 'evidence-writing' ? 'research-model' : 'application-model');
        model.blocks = [{ kind: 'paragraph', source: body(node, `${item.id}-model`, true) }];
        put({ schemaVersion: 1, id: item.id, type: 'writing', profile: item.profile, binding: { ...(item.assembledFlag ? { assembledFlag: item.assembledFlag } : {}), modelFlag: item.modelFlag }, data: item.data });
      }
      const research = map.selections['research-options'];
      put({ schemaVersion: 1, id: 'research', type: 'multiple-choice', profile: 'standard', data: {
        id: research.question, prompt: text(document.querySelector('#research-activity > p.font-bold')), correctOptionId: research.options[1],
        options: banks.middle.research.map((item, i) => ({ id: research.options[i], text: item.text, feedback: `${i === 1 ? 'Good choice.' : 'Not quite.'} ${item.feedback}` }))
      } });
      put({ schemaVersion: 1, id: 'application', type: 'question-sequence', profile: 'middle-application', data: { questions: banks.middle.applications.map((item, i) => {
        const binding = map.selections[`application-${i ? 'b' : 'a'}-options`];
        return { id: binding.question, prompt: text(document.querySelector(`#application-${i ? 'b' : 'a'}-options`).previousElementSibling), correctOptionId: binding.options[item.answer], explanation: item.feedback, options: item.options.map((text, n) => ({ id: binding.options[n], text })) };
      }) } });
      const reveals = { 's1-activity': 'classification', 'evidence-after': 'evidence-after', 'research-activity': 'research-activity', 'group-activity': 'group-activity', 'communication-activity': 'communication-activity', 'speaking-flashcards': 'speaking-flashcards', 'speaking-activity': 'speaking-activity' };
      const questionIds = { 'classify-options': 'classification', 'group-options': 'group-decisions', 'communication-options': 'communication-diagnosis', 'speaking-options': 'speaking-simulator' };
      function convert(node) {
        if (node.nodeType !== 1) return [];
        if (node.matches('h1,h2,.section-head > .eyebrow')) return [];
        if (panelGroups[node.id]) return [panels(node.id)];
        if (questionIds[node.id]) return [activity(questionIds[node.id])];
        if (node.id === 'research-activity') {
          const writingHeader = node.querySelector('.mt-6 > h3');
          return [group([markdown(node.querySelector('h3')), group([markdown(node.querySelector('.caution'))], 'stack', 'caution'), activity('research'), group([markdown(writingHeader), activity('evidence-writing'), markdown(node.querySelector('p.font-bold.mt-4')), activity('research-checklist')])], 'stack', 'activity', reveals[node.id])];
        }
        if (node.querySelector(':scope > #application-a-options')) return [activity('application')];
        if (node.querySelector(':scope > #application-b-options')) return [];
        if (node.querySelector(':scope > #application-draft')) return [group([markdown(node.querySelector('h3')), activity('integrated-writing'), markdown(node.querySelector('p.font-bold')), activity('application-checklist')], 'stack', 'activity')];
        if (node.id === 'quiz-score' || node.querySelector(':scope > #quiz-score')) return [];
        if (node.querySelector(':scope > #quiz-number')) return [activity('knowledge-check')];
        if (node.matches('button,input,textarea,label,.actions,[role=status],.options') || /^(classify|group|communication|speaking|quiz)-(question|number|count|status|feedback)$/.test(node.id)) return [];
        const card = node.querySelector(':scope > .flip-card');
        if (card) { const block = cards(card.dataset.flipGroup); return reveals[node.id] ? [group([block], 'stack', 'plain', reveals[node.id])] : [block]; }
        if (node.matches('p,h3') || node.classList.contains('flow') || node.classList.contains('roundtable')) return [group([markdown(node)], node.classList.contains('flow') ? 'flow' : node.classList.contains('roundtable') ? 'roundtable' : 'stack')];
        const blocks = [...node.children].flatMap(convert);
        if (node.matches('.section-head')) return blocks;
        if (!blocks.length) return text(node) ? [markdown(node)] : [];
        if (reveals[node.id]) return [group(blocks, 'stack', node.matches('.activity') ? 'activity' : 'plain', reveals[node.id])];
        if (node.matches('.panel,.example,.caution')) return [group(blocks, 'stack', node.classList.contains('panel') ? 'callout' : node.classList.contains('caution') ? 'caution' : 'example')];
        return blocks;
      }
      const names = (0, eval)(js.match(/const names=(\[[^;]+\]);/)[1]);
      const sections = map.sections.map((id, i) => {
        const node = document.getElementById(`view-${i}`), heading = node.querySelector('h1,h2');
        const eyebrow = node.querySelector('.eyebrow');
        const blocks = i === 8 ? [{ type: 'reference', source: 'reference/reference.json' }] : [...node.children].flatMap(convert);
        const gateActivityIds = [];
        const collect = blocks => blocks.forEach(block => { if (block.type === 'activity') gateActivityIds.push(block.activityId); if (block.type === 'group') collect(block.blocks); }); collect(blocks);
        return { id, label: names[i], heading: text(heading), headingId: heading.id, headingLevel: i ? 2 : 1, ...(eyebrow && i !== 8 ? { eyebrow: text(eyebrow) } : {}), requirement: 'Complete the activities on this page to unlock Next.', reference: i === 8, gateActivityIds, blocks };
      });
      const ids = new Set(); sections.forEach(section => section.gateActivityIds.forEach(id => ids.add(id)));
      files['content/middle/lesson.json'] = JSON.stringify({ schemaVersion: 1, id: 'middle', title: 'Making an Impact · The Middle Stage', activities: [...ids].map(id => ({ id, source: `activities/${id}.json` })), sections }, null, 2) + '\n';
      files['lessons/middle/config.json'] = JSON.stringify({ schemaVersion: 1, id: 'middle', storageKey: 'dsl:middle:v1', content: '../../content/middle/lesson.json', sectionOrder: map.sections, referenceId: 'quick-reference', presentation: 'legacy-shell' }, null, 2) + '\n';
      return { files, coverage };
    }, { source, js, map, banks, writing });
  } finally { await browser.close(); }
}

if (process.argv.includes('--write-exclusive')) {
  const { files, coverage } = await extractMiddle();
  for (const [path, value] of Object.entries(files)) {
    await mkdir(new URL(`../../${path.substring(0, path.lastIndexOf('/'))}/`, import.meta.url), { recursive: true });
    await writeFile(new URL(`../../${path}`, import.meta.url), value, { flag: 'wx' });
  }
  console.log(`Extracted ${Object.keys(files).length} files; ${coverage.length} Markdown source mappings.`);
}
