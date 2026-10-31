// MIT. Public-entry verification, separate from the generic new-module fixtures.
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { beforeRoundAdapter as adapter, beforeRoundSections as order } from '../../lessons/before-round/progress-adapter.js';
const read = path => JSON.parse(readFileSync(new URL(`../../${path}`, import.meta.url)));
const manifest = read('content/before-round/lesson.json');
const activities = Object.fromEntries(manifest.activities.map(a => [a.id,read(`content/before-round/${a.source}`)]));
const key = adapter.key;
const ready = async page => {
  // A hidden assertion alone also passes before the native entry has mounted.
  await page.waitForLoadState('load');
  await expect(page.locator('#lesson-status')).toHaveCount(1);
  await expect(page.locator('#lesson-status')).toBeHidden();
  await expect(page.locator('[data-content-status]:visible')).toHaveCount(0);
};
const go = async (page,id) => {
  if (await page.locator('#section-select').isVisible()) await page.selectOption('#section-select',id);
  else {
    const button=page.locator(`#rail-links [data-go="${id}"]`);
    await button.focus();await button.press('Enter');
  }
  await expect(page.locator(`[data-section-id="${id}"]`)).toBeVisible();
};
const saved = page => page.evaluate(key => JSON.parse(localStorage.getItem(key)),key);
const setExampleOpen = async (page,id,open) => {
  const row=page.locator(`[data-panel-id="${id}"]`);
  if(await row.evaluate(el=>el.open)!==open)await row.locator('summary').press('Enter');
  await expect(row).toHaveJSProperty('open',open);
  // Native <details> toggle events are queued; wait for the resulting state
  // before the next toggle rather than racing hydration/render updates.
  await expect.poll(async()=>((await saved(page)).activities['icebreaker-examples']?.openIds||[]).includes(id)).toBe(open);
};
const question = (page,id) => page.locator(`[data-question-id="${id}"]`);
const choose = async (page,q,id) => question(page,q).locator(`[data-option-id="${id}"]`).click();
const noOverflow = async page => expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
const errors = new WeakMap();
test.beforeEach(({page}) => {const list=[];errors.set(page,list);page.on('pageerror',error=>list.push(error.message));});
test.afterEach(({page}) => expect(errors.get(page)).toEqual([]));

for (const mount of ['/', '/discussion-skills-lab/']) {
  const url = `${mount}before-round.html`;
  test(`${mount} Lesson 4 catalog entry, fresh locks and independent reference print`, async ({page,browserName},info) => {
    await page.goto(mount); await expect(page.locator('[data-home-status]')).toBeHidden();
    const card = page.locator('.lesson').nth(3); await expect(card.locator('h2')).toHaveText('Before the Round');
    await expect(card.locator('.number')).toHaveText('04'); await card.getByRole('link').click();
    await expect(page).toHaveURL(new RegExp(`${mount}before-round\\.html$`)); await ready(page);
    await expect(page.locator('#progress-text')).toHaveText('0 of 6 pages completed');
    for (const id of order.slice(1,-1)) await expect(page.locator(`#rail-links [data-go="${id}"]`)).toBeDisabled();
    expect(await saved(page)).toBeNull(); await expect(page.locator('#next-section')).toBeDisabled();
    await expect(page.locator('[data-reference-print]')).toBeEnabled();
    const reference = page.locator('[data-view-role="reference"]');
    const prose = await reference.locator('h1,h2,h3,p,li').allTextContents();
    for (const origin of ['pack','quick-reference']) {
      await go(page,origin);
      if (origin === 'quick-reference') {
        await page.evaluate(() => {window.printCalls=0;window.print=()=>window.printCalls++;});
        await page.locator('[data-reference-print]').press('Enter');
        expect(await page.evaluate(()=>window.printCalls)).toBe(1);
      }
      await page.emulateMedia({media:'print'});
      await expect(reference).toBeVisible(); await expect(page.locator('[data-reference-content] article')).toHaveCount(5);
      await expect(page.locator('[data-view-role="lesson"]:visible,button:visible,input:visible,select:visible')).toHaveCount(0);
      expect(await reference.locator('h1,h2,h3,p,li').allTextContents()).toEqual(prose);
      if (browserName === 'chromium') for (const background of [true,false]) {
        const path=info.outputPath(`before-round-${origin}-${background}.pdf`);
        await page.pdf({path,format:'Letter',printBackground:background});
        await info.attach('reference PDF',{path,contentType:'application/pdf'});
      }
      await page.emulateMedia({media:'screen'});
    }
    expect(await saved(page)).toBeNull();
    expect((await page.request.get(`/__original${mount}before-round.html`)).status()).toBe(404);
  });

  test(`${mount} typography and bulleted reference stay readable on screen and in print`, async ({page},info) => {
    await page.goto(url);await ready(page);await expect(page.locator('[data-reference-print]')).toBeEnabled();
    const leads=page.locator('[data-section-id="pack"] .dsl-prose-lead > p');
    await expect(leads).toHaveCount(2);await expect(leads.nth(1)).toContainText('A successful round starts');
    const sizes=await leads.evaluateAll(nodes=>nodes.map(node=>getComputedStyle(node).fontSize));
    expect(sizes[1]).toBe(sizes[0]);expect(parseFloat(sizes[1])).toBeGreaterThan(16);
    const groups=page.locator('[data-reference-content] article');
    for(const [i,count]of [6,2,3,4,6].entries()) {
      await expect(groups.nth(i).locator('ul')).toHaveCount(1);
      await expect(groups.nth(i).locator('li')).toHaveCount(count);
      expect(await groups.nth(i).locator('ul').evaluate(node=>getComputedStyle(node).listStyleType)).toBe('disc');
    }
    for(const width of [320,390,1440]) {
      await page.setViewportSize({width,height:1000});await go(page,'pack');await noOverflow(page);
      await page.screenshot({path:info.outputPath(`pack-${width}.png`),fullPage:true});
      await go(page,'quick-reference');await noOverflow(page);
      await page.screenshot({path:info.outputPath(`reference-${width}.png`),fullPage:true});
    }
    await page.emulateMedia({media:'print'});
    await expect(page.locator('[data-reference-content] li:visible')).toHaveCount(21);
    await expect(page.locator('[data-view-role="lesson"]:visible,button:visible,input:visible')).toHaveCount(0);
    for(const list of await groups.locator('ul').all())expect(await list.evaluate(node=>getComputedStyle(node).listStyleType)).toBe('disc');
    expect(await saved(page)).toBeNull();
  });

  test(`${mount} full journey, every option, keyboard, mobile reflow, permanent credit and refresh`, async ({page},info) => {
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.goto(url); await ready(page);
    const checks=page.locator('[data-activity-id="pack-checklist"] input');
    for (let i=0;i<5;i++) {
      await checks.nth(i).focus(); await checks.nth(i).press('Space');
      if (i<4) await expect(page.locator('#next-section')).toBeDisabled();
    }
    await expect(page.locator('#next-section')).toBeEnabled();
    await checks.first().uncheck(); await expect(page.locator('#next-section')).toBeEnabled();
    await page.reload(); await ready(page); await expect(checks.first()).not.toBeChecked();
    await expect(page.locator('#progress-text')).toHaveText('1 of 6 pages completed');
    for (const [section,activityId] of [['task-access','task-scenarios'],['arrive','arrival-decisions'],['connect','icebreaker-choice'],['adapt','adapt-scenarios']]) {
      await go(page,section);
      await expect(page.locator(`#section-${section}-heading`)).toBeFocused();
      await expect(page.locator('#next-section')).toBeDisabled();
      if (section === 'connect') {
        const reveal=page.locator('[data-reveal-id="icebreaker-question"]');
        await expect(reveal).toBeHidden();await expect(page.locator('.dsl-card')).toHaveCount(0);
        for (const [i,item] of activities['icebreaker-examples'].data.items.entries()) {
          const row=page.locator(`[data-panel-id="${item.id}"]`),summary=row.locator('summary');
          await summary.focus();await summary.press(i % 2 ? 'Enter' : 'Space');
          await expect(row).toHaveJSProperty('open',true);
          await expect(row.locator('.dsl-expandable-body')).toHaveText(item.body);
          await expect(row.locator('.dsl-panel-explored')).toBeVisible();
          await setExampleOpen(page,item.id,false);
          await expect(row.locator('.dsl-panel-explored')).toBeVisible();
          if(i<4)await expect(reveal).toBeHidden();else await expect(reveal).toBeVisible();
          await expect(page.locator('#next-section')).toBeDisabled();
        }
        await page.reload(); await ready(page); await go(page,section);
        expect((await saved(page)).activities['icebreaker-examples'].exploredIds).toHaveLength(5);
        expect((await saved(page)).activities['icebreaker-examples'].openIds).toEqual([]);
        await expect(reveal).toBeVisible();
      }
      const questions=activities[activityId].data.questions;
      for (const [i,q] of questions.entries()) {
        const host=question(page,q.id), correct=host.locator(`[data-option-id="${q.correctOptionId}"]`);
        for (const option of q.options.filter(o=>o.id!==q.correctOptionId)) {
          await choose(page,q.id,option.id); await expect(host.locator('.dsl-feedback')).toContainText(q.explanation);
          await expect(page.locator('#next-section')).toBeDisabled();
        }
        const feedback = await host.locator('.dsl-feedback').elementHandle();
        await correct.focus(); await correct.press('Enter'); await expect(correct).toBeFocused();
        await expect(host.locator('.dsl-feedback')).toContainText(q.explanation);
        expect(await feedback.evaluate(node=>node.isConnected)).toBe(true);
        await choose(page,q.id,q.options.find(o=>o.id!==q.correctOptionId).id);
        if (i < questions.length-1) {
          await expect(page.locator('#next-section')).toBeDisabled();
          await page.locator(`[data-activity-id="${activityId}"] .dsl-question-next`).press('Enter');
          await expect(question(page,questions[i+1].id).locator('.dsl-choice').first()).toBeFocused();
          await page.reload(); await ready(page); await go(page,section);
          expect((await saved(page)).activities[activityId].currentQuestionId).toBe(questions[i+1].id);
        }
      }
      await expect(page.locator('#next-section')).toBeEnabled();
      for (const width of [320,390,1440]) { await page.setViewportSize({width,height:1000}); await noOverflow(page); }
      await page.screenshot({path:info.outputPath(`${section}.png`),fullPage:true});
    }
    await go(page,'knowledge-check'); await expect(page.locator('#next-section')).toBeDisabled();
    for (const q of activities['readiness-quiz'].data.questions) await choose(page,q.id,q.options.find(o=>o.id!==q.correctOptionId).id);
    await expect(page.locator('.dsl-question-retry:visible')).toHaveCount(1);
    await page.locator('.dsl-question-retry:visible').press('Enter');
    await expect(question(page,'equipment').locator('.dsl-choice').first()).toBeFocused();
    for (const [i,q] of activities['readiness-quiz'].data.questions.entries()) {
      for (const option of q.options.filter(o=>o.id!==q.correctOptionId)) {
        await choose(page,q.id,option.id); await expect(question(page,q.id).locator('.dsl-feedback')).toContainText(q.explanation);
      }
      await choose(page,q.id,q.correctOptionId);
      await choose(page,q.id,q.options.find(o=>o.id!==q.correctOptionId).id);
      if (i<4) await expect(page.locator('#progress-text')).toHaveText('5 of 6 pages completed');
    }
    await expect(page.locator('#progress-text')).toHaveText('6 of 6 pages completed');
    await expect(page.locator('[data-activity-id="readiness-quiz"] .dsl-retry-hint')).toContainText('Excellent work');
    for (const width of [320,390,1440]) { await page.setViewportSize({width,height:1000}); await noOverflow(page); }
    await page.reload(); await ready(page); await expect(page.locator('#progress-text')).toHaveText('6 of 6 pages completed');
    await go(page,'knowledge-check'); await expect(page.locator('[data-activity-id="readiness-quiz"] .dsl-selected-incorrect')).toHaveCount(5);
    expect((await saved(page)).completedSections).toEqual(order.slice(0,-1));
    expect(await page.evaluate(()=>Object.keys(localStorage))).toEqual([key]);
  });

  test(`${mount} content failure blocks credit, reference stays independent, retry never fabricates credit`, async ({page}) => {
    let fail=true;
    await page.route('**/content/before-round/sections/pack.md',route=>fail?route.fulfill({status:404,body:'missing'}):route.continue());
    await page.goto(url); await expect(page.locator('#lesson-status')).toBeHidden();
    await expect(page.locator('[data-content-status]:visible')).toContainText('could not load');
    for (const input of await page.locator('[data-activity-id="pack-checklist"] input').all()) await input.check();
    await expect(page.locator('#next-section')).toBeDisabled();
    await go(page,'quick-reference'); await expect(page.locator('[data-reference-print]')).toBeEnabled();
    await go(page,'pack'); fail=false; await page.locator('[data-content-retry]:visible').click(); await ready(page);
    await expect(page.locator('#next-section')).toBeDisabled();
    const input=page.locator('[data-activity-id="pack-checklist"] input').first();await input.uncheck();await input.check();
    await expect(page.locator('#next-section')).toBeEnabled();
  });

  test(`${mount} all screens and expandable examples reflow at 320/390/desktop with native keyboard focus`, async ({page,browserName},info) => {
    // The new module must not rely on the external CDN's CSS reset for containment.
    await page.route('**/cdn.tailwindcss.com/**',route=>route.abort());
    const record=adapter.emptyRecord(); record.completedSections=order.slice(0,-1);
    await page.goto(mount);await page.evaluate(({key,record})=>localStorage.setItem(key,JSON.stringify(record)),{key,record});
    await page.goto(url);await ready(page);
    const skip=page.locator('.dsl-skip');await skip.focus();await skip.press('Enter');await expect(page.locator('#lesson-main')).toBeFocused();
    for(const width of [320,390,1440]) {
      await page.setViewportSize({width,height:1000});
      for(const section of order) {
        await go(page,section);await noOverflow(page);
        if(section==='pack') {
          // macOS WebKit's default Tab preference skips checkboxes; Option+Tab
          // is its native full-control navigation, not an application focus trap.
          const tab=browserName==='webkit'?'Alt+Tab':'Tab',back=browserName==='webkit'?'Alt+Shift+Tab':'Shift+Tab';
          await page.keyboard.press(tab);await expect(page.locator('[data-activity-id="pack-checklist"] input').first()).toBeFocused();
          await page.keyboard.press(tab);await expect(page.locator('[data-activity-id="pack-checklist"] input').nth(1)).toBeFocused();
          await page.keyboard.press(back);await expect(page.locator('[data-activity-id="pack-checklist"] input').first()).toBeFocused();
          expect(await page.locator(':focus').evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe('none');
        }
        if(section==='connect') {
          for(const item of activities['icebreaker-examples'].data.items)await setExampleOpen(page,item.id,false);
          await page.screenshot({path:info.outputPath(`connect-collapsed-${width}.png`),fullPage:true,animations:'disabled'});
          for(const item of activities['icebreaker-examples'].data.items)await setExampleOpen(page,item.id,true);
          await noOverflow(page);
          for(const body of await page.locator('[data-activity-id="icebreaker-examples"] .dsl-expandable-body').all()) {
            expect(await body.evaluate(el=>el.scrollHeight<=el.clientHeight+1)).toBe(true);
          }
        }
        if(['pack','connect','knowledge-check','quick-reference'].includes(section))await page.screenshot({path:info.outputPath(`${section}-${width}.png`),fullPage:true,animations:'disabled'});
      }
    }
  });

  test(`${mount} reference loading/error print notices and retry do not save defaults`, async ({page}) => {
    let release; const held=new Promise(resolve=>{release=resolve;}); let fail=true;
    await page.route('**/content/before-round/reference/reference.json',async route=>{await held;await route.continue();});
    await page.route('**/content/before-round/reference/day.md',route=>fail?route.fulfill({status:404,body:'missing'}):route.continue());
    await page.goto(url,{waitUntil:'domcontentloaded'}); await expect(page.locator('#section-select')).toBeAttached();
    await go(page,'quick-reference'); await expect(page.locator('[data-reference-status]')).toContainText('loading');
    await expect(page.locator('[data-reference-print]')).toBeDisabled();
    await page.emulateMedia({media:'print'});await expect(page.locator('[data-reference-status]')).toBeVisible();await page.emulateMedia({media:'screen'});
    release(); await expect(page.locator('[data-reference-status]')).toContainText('could not load');
    await page.emulateMedia({media:'print'});await expect(page.locator('[data-reference-status]')).toBeVisible();await expect(page.locator('[data-view-role="lesson"]:visible')).toHaveCount(0);await page.emulateMedia({media:'screen'});
    fail=false;await page.locator('[data-reference-retry]').click();await expect(page.locator('[data-reference-print]')).toBeEnabled();
    expect(await saved(page)).toBeNull();
  });

  test(`${mount} restored sparse credit stays authoritative and preserves unknown data without bootstrap writes`, async ({page}) => {
    const record={...adapter.emptyRecord(),completedSections:['connect'],activities:{},future:{keep:'synthetic'}};
    await page.goto(mount); await page.evaluate(({key,record})=>localStorage.setItem(key,JSON.stringify(record)),{key,record});
    await page.goto(url);await ready(page);expect(await saved(page)).toEqual(record);
    await expect(page.locator('#progress-text')).toHaveText('1 of 6 pages completed');await go(page,'adapt');
    await choose(page,'dominant-peer','label'); expect((await saved(page)).future).toEqual(record.future);
    expect((await saved(page)).completedSections).toEqual(['connect']);
    await page.reload();await ready(page);await go(page,'adapt');await expect(question(page,'dominant-peer').locator('[data-option-id="label"]')).toHaveAttribute('aria-pressed','true');
  });

  test(`${mount} prior flashcard progress retains answers and earned sections without inventing five-example credit`, async ({page}) => {
    for(const alreadyComplete of [false,true]) {
      const record={...adapter.emptyRecord(),completedSections:['pack','task-access','arrive',...(alreadyComplete?['connect']:[])],activities:{
        'icebreaker-cards':{exploredIds:['easy-choice','common-ground','casual-start'],backIds:['common-ground']},
        'icebreaker-choice':{selections:{'inclusive-start':'light'},earnedQuestionIds:['inclusive-start'],currentQuestionId:'inclusive-start'}
      },future:{keep:'prior record'}};
      await page.goto(mount);await page.evaluate(({key,record})=>localStorage.setItem(key,JSON.stringify(record)),{key,record});
      await page.goto(url);await ready(page);expect(await saved(page)).toEqual(record);
      await go(page,'connect');
      const reveal=page.locator('[data-reveal-id="icebreaker-question"]');
      await expect(page.locator('[data-activity-id="icebreaker-examples"] details[open]')).toHaveCount(0);
      if(alreadyComplete) {
        await expect(reveal).toBeVisible();await expect(page.locator('#next-section')).toBeEnabled();
        await expect(question(page,'inclusive-start').locator('[data-option-id="light"]')).toHaveAttribute('aria-pressed','true');
        await choose(page,'inclusive-start','politics');await expect(page.locator('#next-section')).toBeEnabled();
      } else {
        await expect(reveal).toBeHidden();await expect(page.locator('#next-section')).toBeDisabled();
        for(const [i,item]of activities['icebreaker-examples'].data.items.entries()) {
          const row=page.locator(`[data-panel-id="${item.id}"]`);await row.locator('summary').press('Enter');await expect(row.locator('.dsl-panel-explored')).toBeVisible();
          if(i<4){await expect(reveal).toBeHidden();await expect(page.locator('#next-section')).toBeDisabled();}
        }
        await expect(reveal).toBeVisible();await expect(page.locator('#next-section')).toBeEnabled();
      }
      const current=await saved(page);expect(current.completedSections).toContain('connect');
      expect(current.activities['icebreaker-cards']).toEqual(record.activities['icebreaker-cards']);expect(current.future).toEqual(record.future);
      expect(current.activities['icebreaker-choice'].earnedQuestionIds).toEqual(['inclusive-start']);
      await page.reload();await ready(page);await go(page,'connect');await expect(page.locator('#next-section')).toBeEnabled();
    }
  });

  test(`${mount} corrupt/unknown-version records remain untouched during usable in-memory work`, async ({page}) => {
    for (const raw of ['{bad',JSON.stringify({...adapter.emptyRecord(),schemaVersion:99})]) {
      await page.goto(mount);await page.evaluate(({key,raw})=>localStorage.setItem(key,raw),{key,raw});
      await page.goto(url);await ready(page);await expect(page.locator('#storage-warning')).toBeVisible();
      for (const input of await page.locator('[data-activity-id="pack-checklist"] input').all()) await input.check();
      await expect(page.locator('#next-section')).toBeEnabled();expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe(raw);
    }
  });

  test(`${mount} existing three lessons still load and preserve saved credit and drafts exactly`, async ({page}) => {
    const fixtures=['opening','middle','final'].map(id=>({id,...read(`tests/fixtures/progress/${id}/completed.json`)}));
    await page.goto(mount);await page.evaluate(fixtures=>{for(const f of fixtures)localStorage.setItem(f.storageKey,f.raw);},fixtures.map(f=>({...f,storageKey:{opening:'dsl:opening-stage:v1',middle:'dsl:middle:v1',final:'dsl:final:v1'}[f.id]})));
    const before=await page.evaluate(()=>({...localStorage}));
    await page.goto(url);await ready(page);await page.locator('[data-activity-id="pack-checklist"] input').first().check();
    for(const f of fixtures){
      await page.goto(`${mount}${f.id}.html`);await ready(page);
      const count={opening:7,middle:8,final:9}[f.id];await expect(page.locator('#progress-text')).toHaveText(`${count} of ${count} pages completed`);
      const fixture=JSON.parse(f.raw);
      if(f.id==='opening')await expect(page.locator('#draft-input')).toHaveValue(fixture.data['draft-input']);
      else if(f.id==='middle')await expect(page.locator('[data-field-id="integrated-draft"]')).toHaveValue(fixture.data.middleState.fields[8]);
      else await expect(page.locator('[data-field-id="closing-draft"]')).toHaveValue(fixture.data.finalState.fields['closing-text']);
    }
    const after=await page.evaluate(()=>({...localStorage}));for(const [k,v]of Object.entries(before))expect(after[k]).toBe(v);
  });
}
