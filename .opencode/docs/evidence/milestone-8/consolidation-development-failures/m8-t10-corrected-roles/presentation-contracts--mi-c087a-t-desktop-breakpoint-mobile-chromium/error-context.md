# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: presentation-contracts.spec.mjs >> /middle all authored presentation roles/states survive consolidation at desktop/breakpoint/mobile
- Location: tests/browser/presentation-contracts.spec.mjs:12:3

# Error details

```
Error: Tailwind utility stylesheet is ready

Tailwind utility stylesheet is ready

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
```

```
Error: apiRequestContext._wrapApiCall: file data stream has unexpected number of bytes
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - generic [ref=e6]: DISCUSSION SKILLS LAB · MSHSL SPEECH
        - generic [ref=e7]: Making an Impact · The Middle Stage
      - generic [ref=e8]: SELF-PACED · 20–25 MINUTES
  - generic [ref=e9]:
    - navigation "Lesson sections" [ref=e10]:
      - button "Collapse navigation" [expanded] [ref=e11] [cursor=pointer]: ⇤
      - generic [ref=e12]:
        - generic [ref=e13]: YOUR PROGRESS
        - generic [ref=e14]: 8 of 8 pages completed
        - progressbar "Completed lesson pages" [ref=e15]
        - paragraph [ref=e17]: Finish each activity to unlock the next page. Quick reference is always available.
      - generic [ref=e18]:
        - button "Welcome" [ref=e19] [cursor=pointer]:
          - text: Welcome
          - generic [ref=e20]: ✓
        - button "01 · Structure to substance" [ref=e21] [cursor=pointer]:
          - text: 01 · Structure to substance
          - generic [ref=e22]: ✓
        - button "02 · Make contributions count" [ref=e23] [cursor=pointer]:
          - text: 02 · Make contributions count
          - generic [ref=e24]: ✓
        - button "03 · Support the group" [ref=e25] [cursor=pointer]:
          - text: 03 · Support the group
          - generic [ref=e26]: ✓
        - button "04 · Communicate professionally" [ref=e27] [cursor=pointer]:
          - text: 04 · Communicate professionally
          - generic [ref=e28]: ✓
        - button "05 · Navigate the conversation" [ref=e29] [cursor=pointer]:
          - text: 05 · Navigate the conversation
          - generic [ref=e30]: ✓
        - button "06 · Put it together" [ref=e31] [cursor=pointer]:
          - text: 06 · Put it together
          - generic [ref=e32]: ✓
        - button "07 · Knowledge check" [ref=e33] [cursor=pointer]:
          - text: 07 · Knowledge check
          - generic [ref=e34]: ✓
        - button "↗ · Quick reference" [ref=e35] [cursor=pointer]
    - main [ref=e36]:
      - status [ref=e37]: Section complete. You can continue.
      - region "Making an Impact" [ref=e38]:
        - heading "Making an Impact" [level=1] [ref=e39]
        - paragraph [ref=e40]: The middle stage is where your research, listening, and collaboration turn into solutions.
        - generic [ref=e41]:
          - paragraph [ref=e42]:
            - text: In the opening stage, your group figures out
            - strong [ref=e43]: WHAT
            - text: it needs to solve and
            - strong [ref=e44]: HOW
            - text: it will approach the task. In the middle stage, you put that plan into action. Contribute ideas that help the group make progress.
          - generic "Discussion round progression" [ref=e45]:
            - generic [ref=e46]: OPENING
            - generic [ref=e47]: →
            - generic [ref=e48]: RESEARCH
            - generic [ref=e49]: →
            - generic [ref=e50]: MIDDLE
            - generic [ref=e51]: →
            - generic [ref=e52]: FINAL
        - paragraph [ref=e53]: Flip over each card to see what happens mid-round.
        - generic [ref=e54]:
          - button "Flip Bring evidence card" [pressed] [ref=e55] [cursor=pointer]:
            - generic [ref=e56]:
              - generic [ref=e57]:
                - heading "Bring evidence" [active] [level=3] [ref=e58]
                - generic [ref=e59]: ↻ Flip card
              - generic [ref=e60]:
                - list [ref=e61]:
                  - listitem [ref=e62]: Support ideas with research.
                  - listitem [ref=e63]: Orally cite your sources.
                - generic [ref=e64]: ✓ Explored
          - button "Flip Build collaboration card" [pressed] [ref=e65] [cursor=pointer]:
            - generic [ref=e66]:
              - generic [ref=e67]:
                - heading "Build collaboration" [level=3] [ref=e68]
                - generic [ref=e69]: ↻ Flip card
              - generic [ref=e70]:
                - list [ref=e71]:
                  - listitem [ref=e72]: Listen attentively.
                  - listitem [ref=e73]: Include others.
                  - listitem [ref=e74]: Keep the group focused.
                - generic [ref=e75]: ✓ Explored
          - button "Flip Manage the floor card" [pressed] [ref=e76] [cursor=pointer]:
            - generic [ref=e77]:
              - generic [ref=e78]:
                - heading "Manage the floor" [level=3] [ref=e79]
                - generic [ref=e80]: ↻ Flip card
              - generic [ref=e81]:
                - list [ref=e82]:
                  - listitem [ref=e83]: Speak professionally.
                  - listitem [ref=e84]: Avoid fillers and slang.
                  - listitem [ref=e85]: Stay in role.
                  - listitem [ref=e86]: Navigate interruptions.
                - generic [ref=e87]: ✓ Explored
      - generic [ref=e88]:
        - button "← Back" [disabled] [ref=e89]
        - button "Next section →" [ref=e90] [cursor=pointer]
```