# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: presentation-contracts.spec.mjs >> /final narrow controls/card faces, enlarged title/card contracts, reduced motion and restored cues
- Location: tests/browser/presentation-contracts.spec.mjs:27:3

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: page.evaluate: Test timeout of 120000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - link "Skip to main content" [ref=e4] [cursor=pointer]:
    - /url: "#lesson-main"
  - banner [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - generic [ref=e8]: DISCUSSION SKILLS LAB · MSHSL SPEECH
        - generic [ref=e9]: Closing with Purpose · The Final Stage
      - generic [ref=e10]: SELF-PACED · ABOUT 25–30 MINUTES
  - main [ref=e12]:
    - generic [ref=e13]:
      - generic [ref=e14]: Go to a section
      - combobox "Go to a section" [ref=e15]:
        - option "Welcome — Why the Final Stage Matters"
        - option "01 — Summary or Synthesis?"
        - option "02 — Connect the Viewpoints" [selected]
        - option "03 — Organize the Findings"
        - option "04 — Build Genuine Consensus"
        - option "05 — Check the Task"
        - option "06 — Finish Professionally"
        - option "07 — Practice Your Closing"
        - option "08 — Knowledge Check"
        - option "Quick Reference"
    - status [ref=e16]: Section complete. You can continue.
    - region "From Multiple Ideas to One New Insight" [ref=e18]:
      - paragraph [ref=e19]: 02 · Explore and apply · 4 minutes
      - heading "From Multiple Ideas to One New Insight" [active] [level=2] [ref=e20]
      - paragraph [ref=e23]: Synthesis requires listening, remembering, connecting, and thinking beyond what has already been said.
      - generic [ref=e26]:
        - group [ref=e27]:
          - generic "1 · Listen✓ Explored" [ref=e28] [cursor=pointer]
        - group [ref=e29]:
          - generic "2 · Connect✓ Explored" [ref=e30] [cursor=pointer]
        - group [ref=e31]:
          - generic "3 · Credit✓ Explored" [ref=e32] [cursor=pointer]
        - group [ref=e33]:
          - generic "4 · Advance✓ Explored" [ref=e34] [cursor=pointer]
      - generic [ref=e35]:
        - generic [ref=e36]:
          - heading "The Synthesis Builder" [level=3] [ref=e39]
          - paragraph [ref=e42]: A community advisory committee must propose how to increase teen participation in after-school programs.
          - generic [ref=e43]:
            - paragraph [ref=e46]:
              - strong [ref=e47]: "Maya:"
              - text: “Transportation is a major concern. We could partner with local transit providers.”
            - paragraph [ref=e50]:
              - strong [ref=e51]: "Jordan:"
              - text: “That could be expensive. We need a way to control costs.”
            - paragraph [ref=e54]:
              - strong [ref=e55]: "Avery:"
              - text: “Students may not know which programs are available. Communication needs attention too.”
            - paragraph [ref=e58]:
              - strong [ref=e59]: "Sam:"
              - text: “We should test our recommendations before expanding them across the city.”
        - generic [ref=e63]:
          - heading "Practice activity" [level=3] [ref=e64]
          - paragraph [ref=e65]: Question 1 of 1
          - article [ref=e67]:
            - paragraph [ref=e68]: Which combination creates the clearest new direction?
            - group "Which combination creates the clearest new direction?" [ref=e69]:
              - button "A. Repeat Maya's transportation idea without addressing the others." [ref=e70] [cursor=pointer]
              - button "B. Combine transportation access, cost controls, communication, and a pilot into a coordinated recommendation." [ref=e71] [cursor=pointer]
              - button "C. Select whichever idea was mentioned most often." [ref=e72] [cursor=pointer]
            - status
            - paragraph
          - generic "Question navigation"
          - status
    - generic [ref=e73]:
      - button "← Back" [ref=e74] [cursor=pointer]
      - button "Next section →" [ref=e75] [cursor=pointer]
```

# Test source

```ts
  1  | // MIT. Disposable DOM for exported API checks, not a lesson or storage engine.
  2  | import {expect} from '@playwright/test';
  3  | export async function apiPage(page, mount) {
  4  |   await page.goto(`${mount}__fixtures/new-module/reference.html`);
  5  |   await page.evaluate(() => window.fixtureApp.ready);
  6  |   await page.evaluate(() => { window.fixtureApp.destroy(); document.body.replaceChildren(); });
  7  | }
  8  | export async function publicVisit(page, id) {
  9  |   if (await page.locator('#section-select').isVisible()) await page.locator('#section-select').selectOption(id);
  10 |   else await page.locator(`[data-go="${id}"]`).click();
  11 |   await expect(page.locator(`[data-section-id="${id}"]`)).toBeVisible();
  12 | }
> 13 | export const settle = page => page.evaluate(async () => {
     |                                    ^ Error: page.evaluate: Test timeout of 120000ms exceeded.
  14 |   await document.fonts.ready;
  15 |   await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {})));
  16 | });
  17 | 
```