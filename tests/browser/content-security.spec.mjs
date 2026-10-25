import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { candidateFor } from '../fixtures/security/reference-candidate.mjs';
const malicious = readFileSync(new URL('../fixtures/security/malicious.md', import.meta.url), 'utf8');

test('Markdown sanitization keeps prose/emphasis/code but no executable DOM or unsafe links', async ({ page }) => {
  await page.goto('/final.html');
  await expect(page.locator('#ref-print')).toBeEnabled();
  const result = await page.evaluate(async source => {
    window.securityExecuted = false;
    const { renderMarkdown } = await import('./assets/js/app/markdown.js');
    const { renderReferenceItems } = await import('./assets/js/components/quick-reference.js');
    const { validateReferenceDocument } = await import('./assets/js/app/content-validation.js');
    const prose = document.createElement('div');
    prose.id = 'security-prose';
    prose.append(renderMarkdown(source, { baseUrl: new URL('./content/final/reference/security.md', document.baseURI) }));
    document.body.append(prose);
    const labels = document.createElement('div'); labels.id = 'security-labels';
    const script = '<img src=x onerror="window.securityExecuted=true"><script>window.securityExecuted=true</script>';
    const data = { schemaVersion: 1, id: 'security-reference', title: script, layout: 'stacked-reference', items: [{ id: 'safe', number: script, title: script, accent: 'teal', source: 'safe.md' }] };
    validateReferenceDocument(data);
    renderReferenceItems(labels, data, new Map([['safe', { source: '**Safe body**', url: document.baseURI }]]));
    document.body.append(labels);
    return { html: prose.innerHTML, text: prose.textContent, links: [...prose.querySelectorAll('a[href]')].map(a => a.href), labels: labels.textContent };
  }, malicious);
  expect(await page.locator('#security-prose script,#security-prose img,#security-prose svg,#security-prose math,#security-prose iframe,#security-prose form,#security-prose input,#security-prose button,#security-prose style').count()).toBe(0);
  expect(await page.locator('#security-prose [class],#security-prose [style],#security-prose [data-unsafe],#security-prose [onclick],#security-prose [onerror]').count()).toBe(0);
  expect(await page.locator('#security-labels img,#security-labels script').count()).toBe(0);
  expect(result.text).toContain('Instructional prose must remain. “Punctuation…” and [name]\'s idea.');
  expect(result.text).toContain('<script>window.securityExecuted = true</script>');
  expect(result.labels).toContain('<script>window.securityExecuted=true</script>');
  expect(await page.locator('#security-prose strong').textContent()).toBe('must remain');
  expect(await page.locator('#security-prose blockquote em').textContent()).toBe('emphasis');
  expect(await page.locator('#security-prose li').count()).toBe(2);
  expect(await page.locator('#security-prose br').count()).toBe(1);
  expect(result.links).toContain(new URL('/content/final/guide.html#details', page.url()).href);
  expect(result.links).toContain('https://example.org/guide');
  for (const link of result.links) expect(new URL(link).protocol).toMatch(/^https?:$/);
  expect(result.links.some(link => /javascript|vbscript|data:|%25|evil\.invalid/.test(link))).toBe(false);
  expect(await page.evaluate(() => window.securityExecuted)).toBe(false);
});

test('browser runtime rejects the same unsafe JSON fixtures as development validation', async ({ page }) => {
  await page.goto('/final.html');
  const results = await page.evaluate(async operation => {
    const candidate = (0, eval)(`(${operation})`);
    const { validateReferenceDocument } = await import('./assets/js/app/content-validation.js');
    const base = await (await fetch('./content/final/reference/reference.json')).json();
    const cases = await (await fetch('/__fixtures/security/reference-cases.json')).json();
    const context = { declaringUrl: new URL('./content/final/reference/reference.json', document.baseURI), allowedRootUrl: new URL('./content/', document.baseURI) };
    return cases.map(fixture => { try { validateReferenceDocument(candidate(base, fixture), context); return fixture.name; } catch { return null; } });
  }, candidateFor.toString());
  expect(results.filter(Boolean)).toEqual([]);
});
