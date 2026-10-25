import vm from 'node:vm';

// Extraction is deliberately specific to the pinned engine, not an application API.
// Evaluate only the audited, data-only declaration spans; never rewrite shipped scripts.
export function extractBanks(sources) {
  const run = (source, names) => JSON.parse(vm.runInNewContext(`${source}\nJSON.stringify({${names.join(',')}})`, {}, { timeout: 1000 }));
  const middle = sources['assets/js/middle.js'];
  const final = sources['assets/js/final.js'];
  const opening = sources['opening.html'];
  const declaration = (name, end) => {
    const start = opening.indexOf(`const ${name} =`);
    if (start < 0) throw Error(`Missing declaration ${name}`);
    const finish = opening.indexOf(end, start);
    if (finish < 0) throw Error(`Missing declaration boundary ${name}`);
    return opening.slice(start, finish + end.length);
  };
  return {
    opening: run([
      declaration('classification', '\n    ];'),
      declaration('analysisAnswers', '\n    };'),
      declaration('practice', '\n    };'),
      declaration('quiz', '\n    ];')
    ].join('\n'), ['classification', 'analysisAnswers', 'practice', 'quiz']),
    middle: run(middle.slice(0, middle.indexOf('    let current=')),
      ['ids', 'names', 'classification', 'research', 'group', 'communication', 'strategies', 'speaking', 'applications', 'questions']),
    final: run(final.slice(final.indexOf('const questions'), final.indexOf('        const size')),
      ['questions', 'notes', 'checkLabels'])
  };
}

// Inert parser inventory includes hidden prose, emphasis, hard breaks, placeholders,
// labels and models. Child-node indexes identify exact text, not mutable prompt hashes.
export function inventoryHTML(source) {
  const doc = new DOMParser().parseFromString(source, 'text/html');
  const entries = [];
  function walk(node, path) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      entries.push({ identity: path, type: 'text', value: node.textContent,
        markup: node.parentElement.innerHTML,
        status: node.parentElement.closest('[hidden],.hidden,.flip-back') ? 'hidden-or-alternative' : 'initial-markup',
        section: node.parentElement.closest('.lesson-view')?.id || 'shell' });
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (['SCRIPT', 'STYLE'].includes(node.tagName)) return;
      for (const attribute of ['placeholder', 'aria-label', 'title', 'alt', 'value']) {
        if (node.hasAttribute(attribute)) entries.push({ identity: `${path}@${attribute}`, type: attribute, value: node.getAttribute(attribute), status: 'attribute', section: node.closest('.lesson-view')?.id || 'shell' });
      }
    }
    [...node.childNodes].forEach((child, index) => walk(child, `${path}/${index}`));
  }
  walk(doc.documentElement, 'html');
  return entries;
}

export function initializedDOM() {
  const describe = el => ({ id: el.id || null, tag: el.tagName.toLowerCase(), type: el.type || null,
    page: el.closest('.lesson-view')?.id || null, group: el.dataset.flipGroup || null,
    flip: el.dataset.flip || null, label: el.getAttribute('aria-label') || el.textContent.trim() });
  return {
    fields: [...document.querySelectorAll('.lesson-view input,.lesson-view textarea')].map(describe),
    cards: [...document.querySelectorAll('.flip-card,.flip')].map(describe),
    panels: [...document.querySelectorAll('details')].map(describe),
    navigation: [...document.querySelectorAll('[data-go]')].map(el => ({ index: Number(el.dataset.go), label: el.querySelector('span').textContent }))
  };
}

export function generatedCopy(id) {
  const selectors = id === 'opening' ? ['#quiz-list h3', '#quiz-list button', '#what-how-options button', '#clarification-options button', '#research-options button']
    : id === 'middle' ? ['#research-checks label', '#application-checks label']
    : ['#checklist-2 label', '#checklist-7 label', '#goals label', '#note-list label', '#note-list select:first-of-type option'];
  return Object.fromEntries(selectors.map(selector => [selector, [...document.querySelectorAll(selector)].map((node, index) => ({
    index, text: node.textContent, markup: node.innerHTML, value: node.getAttribute('value')
  }))]));
}
