import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import Ajv from 'ajv';
import {validateCatalogDocument,validateCatalogTree,validateContent,validateLessonTree,validateConfig,validateManifest} from '../../scripts/validate-content.mjs';
import {createIdProgressAdapter,idProgressErrors} from '../../assets/js/app/id-progress-adapter.js';
import {openProgress} from '../../assets/js/app/progress-store.js';
import {defaults} from '../fixtures/new-module/data.js';
const read = path => JSON.parse(readFileSync(new URL(`../../${path}`,import.meta.url)));
const schema = new Ajv({strict:true}).compile(read('schemas/id-progress.schema.json'));
const adapter = () => createIdProgressAdapter({id:'sample-module',sections:['test-explanation','test-worksheet','test-reference'],defaults});
const memory = raw => ({raw,writes:0,getItem(){return this.raw;},setItem(key,value){this.raw=value;this.writes++;}});
test('catalog validates exact root destinations, original ordering, and both schema/runtime rejects unsafe data', async () => {
  const catalog = read('content/catalog.json'); assert.deepEqual(catalog.lessons.map(item=>item.url),['opening.html','middle.html','final.html','before-round.html']);
  assert.deepEqual(await validateCatalogTree(),[]); assert.deepEqual(validateCatalogDocument(catalog),[]);
  for(const change of [d=>d.schemaVersion=2,d=>d.lessons.push(d.lessons[0]),d=>d.lessons[0].url='https://evil.invalid/opening.html',d=>d.lessons[0].url='../opening.html',d=>d.lessons[0].url='middle.html',d=>d.lessons[0].module='evil.js',d=>d.lessons[0].title='']){
    const invalid=structuredClone(catalog);change(invalid);assert.ok(validateCatalogDocument(invalid).length);
  }
});
test('test-only new module and ungated reference graphs validate without production catalog entries', async () => {
  const path=new URL('../fixtures/new-module/',import.meta.url).pathname;
  assert.deepEqual(await validateContent(`${path}content`),[]);assert.deepEqual(await validateLessonTree(path),[]);
  for(const id of ['sample-module','sample-reference']){
    assert.deepEqual(validateConfig(read(`tests/fixtures/new-module/lessons/${id}/config.json`)),[]);
    assert.deepEqual(validateManifest(read(`tests/fixtures/new-module/content/${id}/lesson.json`)),[]);
  }
  assert.throws(()=>createIdProgressAdapter({id:'opening',sections:['test']}));
  const config=read('lessons/opening/config.json');config.storageKey='dsl:sample-module:v1';assert.ok(validateConfig(config).length);
  config.id='opening-stage';config.storageKey='dsl:opening-stage:v1';assert.ok(validateConfig(config).length);
});
test('new ID record uses existing store: silent defaults, immediate saves, retained credit and unknown properties', () => {
  const a=adapter(),storage=memory(null),store=openProgress({storage,key:a.key,adapter:a}); assert.equal(storage.writes,0);
  const next=store.state;next.fields['test-draft']='synthetic draft';next.completedSections=['test-explanation'];assert.equal(store.save(next).written,true);assert.equal(storage.writes,1);
  const raw=JSON.parse(storage.raw);assert.equal(schema(raw),true);assert.deepEqual(idProgressErrors(raw),[]);assert.equal(raw.schemaVersion,1);assert.ok(!Object.hasOwn(raw,'data'));
  const revised=store.state;revised.completedSections=[];store.save(revised);assert.deepEqual(store.state.completedSections,['test-explanation']);
  raw.future={keep:3};raw.activities['test-question'].future=true;raw.completedSections.push('future-section');const original=JSON.stringify(raw),other=memory(original),restored=openProgress({storage:other,key:a.key,adapter:a});assert.equal(other.writes,0);
  const edited=restored.state;edited.fields['test-draft']='edited';restored.save(edited);assert.deepEqual(JSON.parse(other.raw).future,{keep:3});assert.equal(JSON.parse(other.raw).activities['test-question'].future,true);
  assert.ok(JSON.parse(other.raw).completedSections.includes('future-section'));
});
test('new ID malformed and unknown-version records block writes; salvage drafts without resetting original bytes', () => {
  const a=adapter();
  for(const raw of ['{bad','null','[]',JSON.stringify({schemaVersion:99,...defaults}),JSON.stringify({schemaVersion:1,...defaults,fields:[]}),JSON.stringify({schemaVersion:1,...defaults,activities:{'test-question':{selections:[],earnedQuestionIds:[]}}})]){
    const storage=memory(raw),store=openProgress({storage,key:a.key,adapter:a});assert.equal(store.canPersist,false);const next=store.state;next.fields['test-draft']='session only';store.save(next);assert.equal(storage.raw,raw);assert.equal(storage.writes,0);
  }
  const unknown={schemaVersion:99,...structuredClone(defaults)};unknown.fields['test-draft']='salvaged';const store=openProgress({storage:memory(JSON.stringify(unknown)),key:a.key,adapter:a});assert.equal(store.state.fields['test-draft'],'salvaged');
  for(const raw of [a.emptyRecord(),{schemaVersion:2,...defaults},{schemaVersion:1,...defaults,completedSections:['test','test']},{schemaVersion:1,...defaults,flags:{x:1}}])assert.equal(schema(raw),idProgressErrors(raw).length===0);
});
test('read-only references disable storage entirely; no denied-storage warning or fake final-quiz state', () => {
  const a=createIdProgressAdapter({id:'sample-reference',sections:['test-reference'],persistent:false});const storage={getItem(){throw Error('must not read');},setItem(){throw Error('must not write');}};
  const store=openProgress({key:null,adapter:a,storage});assert.deepEqual(store.diagnostics,[]);assert.equal(store.canPersist,false);assert.equal(store.save(store.state).written,false);
});
