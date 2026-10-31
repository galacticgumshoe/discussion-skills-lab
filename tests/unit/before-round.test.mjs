// MIT. New public module contracts; no original-engine fixtures are changed.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { beforeRoundAdapter as adapter, beforeRoundDefaults as defaults, beforeRoundSections as order } from '../../lessons/before-round/progress-adapter.js';
import { beforeRoundCompletionPolicy as policy, beforeRoundReveals as reveals } from '../../lessons/before-round/completion.js';
import { validateLessonLinks } from '../../assets/js/app/lesson-validation.js';
import { applyCompletion, canVisitSection } from '../../assets/js/app/completion.js';
import { openProgress } from '../../assets/js/app/progress-store.js';

const text = path => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8');
const read = path => JSON.parse(text(path));
const manifest = read('content/before-round/lesson.json');
const activities = manifest.activities.map(item => read(`content/before-round/${item.source}`));
const source = text('.opencode/specs/before-round-module-spec-revised.md');
// Owner-reviewed follow-up supersedes only these strings from the initial spec.
const revisedCopy = {
  'equipment/explanation': 'A hotspot can help when Wi-Fi is unreliable, but it is optional.',
  'dominant-peer/adapt': 'Anticipate competition for procedural roles and prepare to contribute substantive ideas if those roles are crowded',
  'dominant-peer/explanation': 'Aggressive pre-round behavior can suggest that a student will try to lead procedural elements such as agendas and timekeeping. If several students want those roles, be ready to focus more on substantive contributions. Use the early impression to plan, then adjust as the round develops.',
  'observe/adapt': "Use that early impression to plan a role that fits the group's procedural and substantive needs",
  'observe/explanation': 'Pre-round behavior can help you anticipate group dynamics. If procedural roles are crowded, focus more on substantive contributions; if the group is more passive, be ready to set agendas, keep time, and encourage participation. Adjust as the round develops.'
};
const full = () => {
  const state = structuredClone(defaults);
  for (const activity of activities) {
    const own = state.activities[activity.id];
    if (activity.type === 'checklist') own.checkedIds = activity.data.items.map(item => item.id);
    if (activity.type === 'expandables') own.exploredIds = activity.data.items.map(item => item.id);
    if (activity.type === 'question-sequence') own.earnedQuestionIds = activity.data.questions.map(q => q.id);
  }
  return state;
};
test('public identity, thin entry, order, defaults and approved answers match the design', () => {
  assert.equal(validateLessonLinks(read('lessons/before-round/config.json'), manifest, adapter), true);
  assert.deepEqual(order, ['pack','task-access','arrive','connect','adapt','knowledge-check','quick-reference']);
  assert.deepEqual(manifest.sections.map(section => section.headingLevel), [1,2,2,2,2,2,2]);
  assert.deepEqual(Object.keys(policy), order.slice(0,-1));
  assert.equal(adapter.key, 'dsl:before-round:v1');
  assert.equal(manifest.duration, '15–20 minutes');
  assert.equal((text('before-round.html').match(/class="app-shell"/g) || []).length, 1);
  assert.match(text('assets/js/before-round.js'), /mountLesson\(/);
  assert.doesNotMatch(text('assets/js/before-round.js'), /localStorage|fixture|runtime/);
  const keys = {
    'task-scenarios': ['prepare','ready'], 'arrival-decisions': ['instructions','backup'],
    'icebreaker-choice': ['light'], 'adapt-scenarios': ['adapt','support'],
    'readiness-quiz': ['hotspot','analyze','rules','rapport','adapt']
  };
  for (const activity of activities) {
    const own = defaults.activities[activity.id]; assert.ok(own);
    if (activity.type === 'question-sequence') {
      assert.equal(activity.profile, activity.id === 'readiness-quiz' ? 'opening-knowledge-check' : 'middle-scenarios');
      assert.equal(own.currentQuestionId, activity.data.questions[0].id);
      assert.deepEqual(activity.data.questions.map(q => q.correctOptionId), keys[activity.id]);
      assert.deepEqual(own.selections, {}); assert.deepEqual(own.earnedQuestionIds, []);
      for (const q of activity.data.questions) {
        // The supplied approved specification is independent of the live activity files.
        assert.ok(source.includes(q.prompt), q.id);
        const explanation = revisedCopy[`${q.id}/explanation`];
        if (explanation) assert.equal(q.explanation, explanation); else assert.ok(source.includes(q.explanation), q.id);
        for (const option of q.options) {
          const revision = revisedCopy[`${q.id}/${option.id}`];
          if (revision) assert.equal(option.text, revision); else assert.ok(source.includes(option.text), `${q.id}/${option.id}`);
        }
      }
    } else if (activity.type === 'checklist') for (const item of activity.data.items) assert.ok(source.includes(item.text));
    else {
      assert.equal(activity.type, 'expandables'); assert.equal(activity.profile, 'standard');
      assert.deepEqual(activity.data.items.map(item => [item.id, item.title]), [
        ['two-truths','Two Truths and a Lie'],['have-you-ever','Have You Ever?'],['would-you-rather','Would You Rather?'],
        ['things-in-common','Find 10 Things in Common'],['small-talk','Ordinary small talk']
      ]);
      assert.deepEqual(own, {exploredIds:[],openIds:[]});
    }
  }
});
test('every missing check, expanded example or earned answer prevents new credit; selection alone is insufficient', () => {
  for (const section of manifest.sections.filter(s => !s.reference)) {
    assert.equal(policy[section.id](defaults), false);
    assert.equal(policy[section.id](full()), true);
    for (const id of section.gateActivityIds) {
      const activity = activities.find(a => a.id === id);
      const field = activity.type === 'checklist' ? 'checkedIds' : activity.type === 'expandables' ? 'exploredIds' : 'earnedQuestionIds';
      for (const missing of full().activities[id][field]) {
        const state = full(); state.activities[id][field] = state.activities[id][field].filter(value => value !== missing);
        assert.equal(policy[section.id](state), false, `${section.id}/${id}/${missing}`);
      }
    }
  }
  const state = structuredClone(defaults);
  for (const a of activities.filter(a => a.type === 'question-sequence')) {
    state.activities[a.id].selections = Object.fromEntries(a.data.questions.map(q => [q.id,q.correctOptionId]));
  }
  for (const predicate of Object.values(policy)) assert.equal(predicate(state), false);
});
test('credit remains permanent after unchecking, closing examples, wrong answers and reload; bootstrap is silent', () => {
  const storage = {raw:null,writes:0,getItem(){return this.raw;},setItem(key,value){this.raw=value;this.writes++;}};
  const store = openProgress({storage,key:adapter.key,adapter}); assert.equal(storage.writes,0);
  const earned = applyCompletion(store.state, full(), {sections:manifest.sections,completionPolicy:policy});
  assert.deepEqual(earned.completedSections,order.slice(0,-1)); store.save(earned);
  const cleared = applyCompletion(earned,structuredClone(defaults),{sections:manifest.sections,completionPolicy:policy});
  store.save(cleared); assert.deepEqual(store.state.completedSections,order.slice(0,-1));
  const before = storage.writes, restored = openProgress({storage,key:adapter.key,adapter});
  assert.equal(storage.writes,before); assert.deepEqual(restored.state.completedSections,order.slice(0,-1));
  for (const section of order) assert.equal(canVisitSection(manifest.sections, restored.state.completedSections,section),true);
  assert.equal(canVisitSection(manifest.sections,[], 'quick-reference'),true);
  assert.equal(canVisitSection(manifest.sections,[], 'task-access'),false);
  assert.equal(canVisitSection(manifest.sections,['connect'], 'adapt'),true);
});
test('all five explored examples reveal the question permanently, or existing connect credit preserves access', () => {
  assert.equal(reveals(defaults)['icebreaker-question'], false);
  const state=full();state.activities['icebreaker-choice'].earnedQuestionIds=[];
  assert.equal(reveals(state)['icebreaker-question'], true);
  assert.equal(policy.connect(state), false);
  assert.deepEqual(state.activities['icebreaker-examples'].openIds, []);
  for (const id of state.activities['icebreaker-examples'].exploredIds) {
    const missing=structuredClone(state);missing.activities['icebreaker-examples'].exploredIds=missing.activities['icebreaker-examples'].exploredIds.filter(value=>value!==id);
    assert.equal(reveals(missing)['icebreaker-question'], false,id);
  }
  const completed=structuredClone(defaults);completed.completedSections=['connect'];
  assert.equal(reveals(completed)['icebreaker-question'], true);
  assert.deepEqual(completed.activities['icebreaker-examples'].exploredIds, []);
});
test('prior card records preserve earned credit, answers and retired state without fabricating new exploration', () => {
  for (const completedSections of [[],['connect']]) {
    const original={...adapter.emptyRecord(),completedSections,activities:{
      'icebreaker-cards':{exploredIds:['easy-choice','common-ground','casual-start'],backIds:['easy-choice']},
      'icebreaker-choice':{selections:{'inclusive-start':'light'},earnedQuestionIds:['inclusive-start'],currentQuestionId:'inclusive-start'}
    },future:{keep:7}};
    const storage={raw:JSON.stringify(original),writes:0,getItem(){return this.raw;},setItem(key,value){this.raw=value;this.writes++;}};
    const store=openProgress({storage,key:adapter.key,adapter});
    assert.equal(storage.writes,0);assert.deepEqual(store.state.completedSections,completedSections);
    assert.deepEqual(store.state.activities['icebreaker-examples'],{exploredIds:[],openIds:[]});
    assert.equal(reveals(store.state)['icebreaker-question'],completedSections.includes('connect'));
    assert.deepEqual(store.state.activities['icebreaker-choice'].earnedQuestionIds,['inclusive-start']);
    const changed=store.state;changed.activities['pack-checklist'].checkedIds=['device'];store.save(changed);
    assert.deepEqual(JSON.parse(storage.raw).activities['icebreaker-cards'],original.activities['icebreaker-cards']);
    assert.deepEqual(JSON.parse(storage.raw).future,original.future);
  }
});
test('student prose uses direct coaching and updated tournament procedures without source commentary or visible footnotes', () => {
  assert.match(text('content/home.md'),/These interactive lessons guide you through/);
  const names=['pack','task-access','arrive','connect','connect-precautions','adapt'];
  for (const name of names) assert.doesNotMatch(text(`content/before-round/sections/${name}.md`),/the source|Based on Before A Discussion Round/i);
  assert.match(text('content/before-round/sections/pack.md'),/Fold a sheet of printer paper into a triangle/);
  assert.match(text('content/before-round/sections/task-access.md'),/At State, the Room Manager reads the task aloud/);
  assert.match(text('content/before-round/sections/arrive.md'),/left-most seat.*right-most seat/);
  assert.match(text('content/before-round/sections/adapt.md'),/Preliminary rounds commonly.*less aggressive/);
  assert.match(text('content/before-round/sections/adapt.md'),/be prepared to give up those roles/);
  assert.match(text('content/before-round/sections/adapt.md'),/group with more passive students/);
  assert.doesNotMatch(text('content/before-round/reference/connect.md'),/labeling|Based on Before A Discussion Round/);
});
test('partial records supply all defaults, retain unknown data, and unsafe records are not overwritten', () => {
  for (const raw of ['{bad',JSON.stringify({...adapter.emptyRecord(),schemaVersion:99}),JSON.stringify({...adapter.emptyRecord(),activities:{'pack-checklist':{checkedIds:'unsafe'}}})]) {
    const storage = {getItem:()=>raw,setItem(){assert.fail('unsafe record overwritten');}};
    const store = openProgress({storage,key:adapter.key,adapter}); assert.equal(store.canPersist,false); store.save(full());
  }
  const record = {...adapter.emptyRecord(),activities:{},completedSections:['connect'],future:{keep:1}};
  const storage = {raw:JSON.stringify(record),getItem(){return this.raw;},setItem(key,value){this.raw=value;}};
  const store = openProgress({storage,key:adapter.key,adapter});
  assert.deepEqual(store.state.activities,defaults.activities);
  const state=store.state; state.activities['pack-checklist'].checkedIds=['device']; store.save(state);
  assert.deepEqual(JSON.parse(storage.raw).future,{keep:1}); assert.deepEqual(store.state.completedSections,['connect']);
});
test('packing introduction uses lead styling and all reference groups retain their content as bullets', () => {
  const intro=manifest.sections[0].blocks.find(block=>block.source==='sections/pack-intro.md');
  assert.equal(intro.textStyle,'lead');
  assert.equal(text('content/before-round/sections/pack-intro.md').trim(),'A successful round starts before you enter the room. Pack the items you need at the table, then think about what will help you through a long tournament day.');
  const expected={
    pack:['Charged research device.','Charger.','Readable name tent.','Note-taking tools.','Water.','Optional hotspot/phone charger.'],
    day:['Snacks/lunch and warm layers for between rounds.','Check the tournament schedule.'],
    task:['Confirm electronic versus paper distribution.','If early electronic access is available, read the task and prepare research.','Otherwise be ready to analyze it promptly when issued.'],
    arrive:['Find the room/table early.','Follow seating directions.','Place materials.','Test Wi-Fi and backup.'],
    connect:['Start friendly, optional small talk.','Include others.','Avoid divisive/personal topics.','Use early impressions to plan your role: focus on substantive contributions when procedural roles are crowded.','Be ready to set agendas, keep time, and encourage participation in a more passive group.','Adjust as the round develops.']
  };
  for(const [name,items]of Object.entries(expected)) {
    const lines=text(`content/before-round/reference/${name}.md`).trim().split('\n');
    assert.deepEqual(lines,items.map(item=>`- ${item}`));
  }
});
