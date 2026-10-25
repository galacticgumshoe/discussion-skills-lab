// Test-only MIT transformation of sealed baseline data, never a writable content source.
// Instructional text © Rhys Jones, CC BY 4.0. Source revision 0b5d229.
export function questionActivities(banks, maps, lesson) {
  const sequence = (id, profile, questions) => ({ id, profile, data: { questions } });
  const standard = (items, ids, optionIds, prefix) => items.map((item, index) => ({
    id: ids[index], prompt: item.q || item.prompt,
    ...(item.context ? { context: item.context } : {}),
    options: (item.options || item.a).map((text, n) => ({ id: optionIds[index][n], text,
      ...(Array.isArray(item.feedback || item.why) ? { feedback: `${n === (item.answer ?? item.correct) ? prefix : 'Not quite.'} ${(item.feedback || item.why)[n]}` } : {}) })),
    correctOptionId: optionIds[index][item.answer ?? item.correct],
    ...(typeof (item.feedback || item.explanation) === 'string' ? { explanation: item.feedback || item.explanation } : {})
  }));
  if (lesson === 'opening') {
    const map = maps.opening.activities;
    return [
      sequence('classification', 'opening-classification', banks.opening.classification.map((item, index) => ({
        id: map.classification.questions[index], prompt: item.text, correctOptionId: item.answer,
        options: ['procedural', 'substantive'].map(id => ({ id, text: id === 'procedural' ? 'Procedural' : 'Substantive',
          feedback: `${id === item.answer ? 'Correct.' : `Not quite. This is ${item.answer}.`} ${item.why}` }))
      }))),
      sequence('knowledge-check', 'opening-knowledge-check', standard(banks.opening.quiz, map['knowledge-check'].questions, map['knowledge-check'].options, 'Correct.'))
    ];
  }
  if (lesson === 'middle') {
    return [
      ...[['group', 'group-decisions'], ['speaking', 'speaking-simulator']].map(([key, id]) => sequence(id, 'middle-scenarios',
        standard(banks.middle[key], maps.middle.sets.solved[key], maps.middle.selections[`${key}-options-N`].options, 'Good choice.').map((question, index) => ({
          ...question, prompt: `${index + 1} of ${banks.middle[key].length} · ${banks.middle[key][index].title} — ${question.prompt}`
        })))),
      sequence('knowledge-check', 'middle-quiz', standard(banks.middle.questions, maps.middle.sets.correctQuiz, maps.middle.selections['quiz-N'].options, 'Good choice.'))
    ];
  }
  return Object.entries(banks.final.questions).map(([page, items]) => sequence(page === '8' ? 'knowledge-check' : `${maps.final.sections[page]}-questions`,
    'final-questions', standard(items, maps.final.questions[page], maps.final.options[page], 'Correct.')));
}

// Inert sealed HTML only. Nothing from a legacy engine is executed in the harness.
// Fixture extraction may use baseline order; codecs never obtain maps from this DOM.
export function explorationActivities(documents, maps, lesson) {
  const text = node => node.textContent.replace(/\s+/g, ' ').trim();
  if (lesson === 'opening') return [{ id: 'timeline', type: 'panels', profile: 'timeline', data: { items:
    [...documents.opening.querySelectorAll('.timeline-toggle')].map(button => ({
      id: maps.opening.activities.timeline.panels[button.getAttribute('aria-controls')],
      title: text(button).replace(/ ＋$/, ''), body: text(documents.opening.getElementById(button.getAttribute('aria-controls')))
    })) } }];
  if (lesson === 'middle') return [{ id: 'research-model-cards', type: 'cards', data: { items:
    [...documents.middle.querySelectorAll('[data-flip-group="models"]')].map((card, index) => {
      const front = card.querySelector('.flip-front'), back = card.querySelector('.flip-back');
      return { id: maps.middle.sets.flipped.models[index + 5], frontTitle: text(front.querySelector('strong')), front: text(front.querySelector('p')),
        backTitle: text(back.querySelector('strong')), back: text(back.querySelector('p')) };
    }) } }];
  return [
    ...Object.entries(maps.final.flips).map(([page, ids]) => ({ id: `${maps.final.sections[page]}-cards`, type: 'cards', data: { items:
      [...documents.final.querySelectorAll(`.flip[data-page="${page}"]`)].map((card, index) => {
        const face = selector => { const clone = card.querySelector(selector).cloneNode(true); clone.querySelectorAll('.dsl-flip-hint,.visited').forEach(node => node.remove()); return text(clone); };
        return { id: ids[index], front: face('.flip-front'), back: face('.flip-back') };
      }) } })),
    { id: 'connect-viewpoints-panels', type: 'panels', data: { items:
      [...documents.final.querySelectorAll('.panel[data-page="2"]')].map((panel, index) => ({
        id: maps.final.panels[2][index], title: text(panel.querySelector('summary')), body: text(panel.querySelector('.inner'))
      })) } }
  ];
}
