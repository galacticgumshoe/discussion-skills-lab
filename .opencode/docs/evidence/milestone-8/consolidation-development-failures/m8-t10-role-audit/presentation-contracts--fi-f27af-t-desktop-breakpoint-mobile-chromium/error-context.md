# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: presentation-contracts.spec.mjs >> /final all authored presentation roles/states survive consolidation at desktop/breakpoint/mobile
- Location: tests/browser/presentation-contracts.spec.mjs:12:3

# Error details

```
Error: welcome/surfaces

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -10,9 +10,9 @@
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: welcome/card-0-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: welcome/card-0-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: welcome/card-1-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: welcome/card-1-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: welcome/card-2-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: welcome/card-2-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: summary-synthesis/surfaces

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -10,9 +10,9 @@
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: summary-synthesis/card-0-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: summary-synthesis/card-0-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: summary-synthesis/card-1-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: summary-synthesis/card-1-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: summary-synthesis/question-title

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    Object {
      "color": "rgb(20, 43, 73)",
      "fontFamily": "Fraunces, serif",
-     "fontSize": "20.8px",
+     "fontSize": "16px",
    },
  ]
```

```
Error: summary-synthesis/prompt-0

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: summary-synthesis/prompt-1

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: summary-synthesis/prompt-2

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: summary-synthesis/prompt-3

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: summary-synthesis/prompt-4

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: connect-viewpoints/surfaces

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -10,11 +10,11 @@
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
      "borderLeftColor": "rgb(220, 231, 238)",
@@ -26,9 +26,9 @@
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: connect-viewpoints/writing-0

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -5,14 +5,14 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(0, 0, 0)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: connect-viewpoints/writing-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -5,14 +5,14 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(0, 0, 0)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: connect-viewpoints/writing-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -5,14 +5,14 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(0, 0, 0)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: connect-viewpoints/model

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -9,9 +9,9 @@
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: connect-viewpoints/question-title

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    Object {
      "color": "rgb(20, 43, 73)",
      "fontFamily": "Fraunces, serif",
-     "fontSize": "20.8px",
+     "fontSize": "16px",
    },
  ]
```

```
Error: connect-viewpoints/prompt-0

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: organize-findings/note-0

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -5,11 +5,11 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(0, 0, 0)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "normal",
```

```
Error: organize-findings/note-0-row

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -10,9 +10,9 @@
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: organize-findings/note-0-label

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "600",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: organize-findings/note-0-wrong

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -5,11 +5,11 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(0, 0, 0)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "normal",
```

```
Error: organize-findings/note-0-right

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -5,11 +5,11 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(128, 128, 128)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "normal",
```

```
Error: organize-findings/note-1

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -5,11 +5,11 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(0, 0, 0)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "normal",
```

```
Error: organize-findings/note-1-row

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -10,9 +10,9 @@
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: organize-findings/note-1-label

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "600",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: organize-findings/note-1-wrong

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -5,11 +5,11 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(0, 0, 0)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "normal",
```

```
Error: organize-findings/note-1-right

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -5,11 +5,11 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(128, 128, 128)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "normal",
```

```
Error: organize-findings/note-2

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -5,11 +5,11 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(0, 0, 0)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "normal",
```

```
Error: organize-findings/note-2-row

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -10,9 +10,9 @@
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: organize-findings/note-2-label

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "600",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: organize-findings/note-2-wrong

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -5,11 +5,11 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(0, 0, 0)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "normal",
```

```
Error: organize-findings/note-2-right

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -5,11 +5,11 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(128, 128, 128)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "normal",
```

```
Error: organize-findings/note-3

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -5,11 +5,11 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(0, 0, 0)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "normal",
```

```
Error: organize-findings/note-3-row

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -10,9 +10,9 @@
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: organize-findings/note-3-label

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "600",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: organize-findings/note-3-wrong

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -5,11 +5,11 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(0, 0, 0)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "normal",
```

```
Error: organize-findings/note-3-right

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -5,11 +5,11 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(128, 128, 128)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "normal",
```

```
Error: organize-findings/note-4

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -5,11 +5,11 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(0, 0, 0)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "normal",
```

```
Error: organize-findings/note-4-row

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -10,9 +10,9 @@
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: organize-findings/note-4-label

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "600",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: organize-findings/note-4-wrong

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -5,11 +5,11 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(0, 0, 0)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "normal",
```

```
Error: organize-findings/note-4-right

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -5,11 +5,11 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(128, 128, 128)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "normal",
```

```
Error: organize-findings/note-5

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -5,11 +5,11 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(0, 0, 0)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "normal",
```

```
Error: organize-findings/note-5-row

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -10,9 +10,9 @@
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: organize-findings/note-5-label

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "600",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: organize-findings/note-5-wrong

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -5,11 +5,11 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(0, 0, 0)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "normal",
```

```
Error: organize-findings/note-5-right

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -5,11 +5,11 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(128, 128, 128)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "normal",
```

```
Error: organize-findings/question-title

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    Object {
      "color": "rgb(20, 43, 73)",
      "fontFamily": "Fraunces, serif",
-     "fontSize": "20.8px",
+     "fontSize": "16px",
    },
  ]
```

```
Error: organize-findings/prompt-0

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: consensus/cautions

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 1

- Array [
-   Object {
-     "backgroundColor": "rgb(255, 246, 223)",
-     "borderLeftColor": "rgb(181, 119, 23)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "8px",
-   },
- ]
+ Array []
```

```
Error: consensus/card-0-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: consensus/card-0-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: consensus/card-1-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: consensus/card-1-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: consensus/card-2-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: consensus/card-2-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: consensus/question-title

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    Object {
      "color": "rgb(20, 43, 73)",
      "fontFamily": "Fraunces, serif",
-     "fontSize": "20.8px",
+     "fontSize": "16px",
    },
  ]
```

```
Error: consensus/prompt-0

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: consensus/prompt-1

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: consensus/prompt-2

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: task-audit/surfaces

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -10,9 +10,9 @@
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: task-audit/question-title

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    Object {
      "color": "rgb(20, 43, 73)",
      "fontFamily": "Fraunces, serif",
-     "fontSize": "20.8px",
+     "fontSize": "16px",
    },
  ]
```

```
Error: task-audit/prompt-0

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: task-audit/prompt-1

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: task-audit/prompt-2

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: professionalism/question-title

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    Object {
      "color": "rgb(20, 43, 73)",
      "fontFamily": "Fraunces, serif",
-     "fontSize": "20.8px",
+     "fontSize": "16px",
    },
  ]
```

```
Error: professionalism/prompt-0

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: professionalism/prompt-1

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: professionalism/prompt-2

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: closing-practice/surfaces

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -10,11 +10,11 @@
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
      "borderLeftColor": "rgb(220, 231, 238)",
@@ -26,9 +26,9 @@
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: closing-practice/writing-0

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -5,14 +5,14 @@
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(170, 190, 203)",
      "borderTopWidth": "1px",
      "boxShadow": "none",
-     "color": "rgb(0, 0, 0)",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: closing-practice/model

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -9,9 +9,9 @@
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: closing-practice/question-title

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    Object {
      "color": "rgb(20, 43, 73)",
      "fontFamily": "Fraunces, serif",
-     "fontSize": "20.8px",
+     "fontSize": "16px",
    },
  ]
```

```
Error: closing-practice/prompt-0

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: closing-practice/prompt-1

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: closing-practice/prompt-2

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: closing-practice/prompt-3

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: knowledge-check/proseLESSON COMPLETE

expect(received).toEqual(expected) // deep equality

Expected: undefined
Received: ["\"DM Sans\", sans-serif", "13px", "700", "21.45px", "rgb(20, 43, 73)"]
```

```
Error: knowledge-check/surfaces

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -10,9 +10,9 @@
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "normal",
+     "lineHeight": "24px",
      "textTransform": "none",
    },
  ]
```

```
Error: knowledge-check/question-title

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    Object {
      "color": "rgb(20, 43, 73)",
      "fontFamily": "Fraunces, serif",
-     "fontSize": "20.8px",
+     "fontSize": "16px",
    },
  ]
```

```
Error: knowledge-check/prompt-0

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: knowledge-check/prompt-1

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: knowledge-check/prompt-2

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: knowledge-check/prompt-3

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: knowledge-check/prompt-4

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -6,11 +6,11 @@
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "26.4px",
      "textTransform": "none",
    },
  ]
```

```
Error: welcome/card-0-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: welcome/card-0-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: welcome/card-1-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: welcome/card-1-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: welcome/card-2-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: welcome/card-2-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: summary-synthesis/card-0-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: summary-synthesis/card-0-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: summary-synthesis/card-1-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: summary-synthesis/card-1-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: consensus/cautions

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 1

- Array [
-   Object {
-     "backgroundColor": "rgb(255, 246, 223)",
-     "borderLeftColor": "rgb(181, 119, 23)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "8px",
-   },
- ]
+ Array []
```

```
Error: consensus/card-0-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: consensus/card-0-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: consensus/card-1-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: consensus/card-1-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: consensus/card-2-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: consensus/card-2-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: knowledge-check/proseLESSON COMPLETE

expect(received).toEqual(expected) // deep equality

Expected: undefined
Received: ["\"DM Sans\", sans-serif", "13px", "700", "21.45px", "rgb(20, 43, 73)"]
```

```
Error: welcome/card-0-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: welcome/card-0-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: welcome/card-1-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: welcome/card-1-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: welcome/card-2-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: welcome/card-2-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: summary-synthesis/card-0-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: summary-synthesis/card-0-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: summary-synthesis/card-1-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: summary-synthesis/card-1-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: consensus/cautions

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 1

- Array [
-   Object {
-     "backgroundColor": "rgb(255, 246, 223)",
-     "borderLeftColor": "rgb(181, 119, 23)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "8px",
-   },
- ]
+ Array []
```

```
Error: consensus/card-0-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: consensus/card-0-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: consensus/card-1-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: consensus/card-1-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: consensus/card-2-front

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(220, 231, 236)",
+     "borderTopColor": "rgb(220, 231, 236)",
      "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "lineHeight": "24.8px",
    },
```

```
Error: consensus/card-2-back

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 2

@@ -1,8 +1,10 @@
  Array [
    Object {
      "backgroundColor": "rgb(20, 43, 73)",
+     "borderLeftColor": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(20, 43, 73)",
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24.8px",
```

```
Error: knowledge-check/proseLESSON COMPLETE

expect(received).toEqual(expected) // deep equality

Expected: undefined
Received: ["\"DM Sans\", sans-serif", "13px", "700", "21.45px", "rgb(20, 43, 73)"]
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
        - option "02 — Connect the Viewpoints"
        - option "03 — Organize the Findings"
        - option "04 — Build Genuine Consensus"
        - option "05 — Check the Task"
        - option "06 — Finish Professionally"
        - option "07 — Practice Your Closing"
        - option "08 — Knowledge Check"
        - option "Quick Reference" [selected]
    - status [ref=e16]: Quick reference is always available.
    - region "Final Stage Quick Reference" [ref=e18]:
      - generic [ref=e19]:
        - generic [ref=e20]:
          - button "Print quick reference" [ref=e22] [cursor=pointer]
          - heading "Final Stage Quick Reference" [active] [level=2] [ref=e23]
        - generic [ref=e24]:
          - article [ref=e25]:
            - heading "01 Summary vs. synthesis" [level=3] [ref=e26]:
              - generic [ref=e27]: "01"
              - generic [ref=e28]: Summary vs. synthesis
            - paragraph [ref=e29]:
              - strong [ref=e30]: "Summary:"
              - text: Organize and accurately restate findings, proposals, agreements, and unresolved questions.
            - paragraph [ref=e31]:
              - strong [ref=e32]: "Synthesis:"
              - text: Connect viewpoints to develop a new insight or recommendation.
            - paragraph [ref=e33]:
              - strong [ref=e34]: "Remember:"
              - text: Summary captures what the group developed. Synthesis advances its thinking.
          - article [ref=e35]:
            - heading "02 The synthesis framework" [level=3] [ref=e36]:
              - generic [ref=e37]: "02"
              - generic [ref=e38]: The synthesis framework
            - paragraph [ref=e39]:
              - strong [ref=e40]: LISTEN
              - text: for ideas and concerns.
              - strong [ref=e41]: CONNECT
              - text: viewpoints.
              - strong [ref=e42]: CREDIT
              - text: contributors.
              - strong [ref=e43]: ADVANCE
              - text: an insight, compromise, or recommendation.
            - paragraph [ref=e44]: "Try: “Building on [name]'s idea and [name]'s concern…” · “If we combine those perspectives…” · “One way to address both concerns might be…”"
          - article [ref=e45]:
            - heading "03 Effective summaries" [level=3] [ref=e46]:
              - generic [ref=e47]: "03"
              - generic [ref=e48]: Effective summaries
            - paragraph [ref=e49]: Organize by theme, not speaking order. Include barriers, important evidence and proposals, agreed recommendations, unresolved concerns, and credit for substantive contributions.
            - paragraph [ref=e50]: "Try: “Our group identified three major considerations…” · “We agreed to recommend…” · “One concern that remains unresolved is…”"
          - article [ref=e51]:
            - heading "04 Consensus and task completion" [level=3] [ref=e52]:
              - generic [ref=e53]: "04"
              - generic [ref=e54]: Consensus and task completion
            - paragraph [ref=e55]: Do not confuse majority support with unanimity. Identify remaining concerns, explore revisions, and confirm whether the revised outcome is supportable.
            - paragraph [ref=e56]:
              - text: Check the
              - strong [ref=e57]: WHAT
              - text: (the problem) and
              - strong [ref=e58]: HOW
              - text: (required deliverable components). Does the final product meet the task? Can participants support it?
            - paragraph [ref=e59]: "Try: “Does this revised proposal address the concerns raised?” · “Are we missing any required part of the task?” · “Can everyone support this recommendation?”"
          - article [ref=e60]:
            - heading "05 After the round" [level=3] [ref=e61]:
              - generic [ref=e62]: "05"
              - generic [ref=e63]: After the round
            - paragraph [ref=e64]: Gather belongings and leave promptly. Thank the judge briefly if appropriate. Do not request rankings or prolonged feedback. Consult your coach about unexpected procedural issues. Speak respectfully with fellow competitors afterward.
```

# Test source

```ts
  112 |       result[key + 'model'] = await paint(original ? view.locator(oldModel) : host.locator('.dsl-writing-model'));
  113 |       if (id === 'middle') {
  114 |         const oldButtons = index === 2 ? ['#assemble-button', '#assembly-copy-button', '#research-model-button'] : ['#application-model-button'];
  115 |         const newButtons = index === 2 ? ['.dsl-assemble', '.dsl-copy', '.dsl-model-toggle'] : ['.dsl-model-toggle'];
  116 |         for (let n = 0; n < oldButtons.length; n++) result[key + `writing-button-${n}`] = await paint(original ? view.locator(oldButtons[n]) : host.locator(newButtons[n]));
  117 |         result[key + 'writing-check'] = await paint(original ? view.locator(index === 2 ? '#research-checks input' : '#application-checks input') : own(page, index === 2 ? 'research-checklist' : 'application-checklist').locator('input'), ['width', 'height', 'accentColor']);
  118 |       }
  119 |     }
  120 | 
  121 |     if (id === 'middle') await middleQuestions(page, index, original, key, result);
  122 |     if (id === 'final' && index > 0 && index < 9) await finalQuestions(page, index, original, key, result);
  123 |     if (id === 'opening') await openingStates(page, index, original, key, result);
  124 |     if (!original) expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${id}/${section.id}/${width}`).toBe(true);
  125 |   }
  126 |   return result;
  127 | }
  128 | 
  129 | async function finalQuestions(page, index, original, key, result) {
  130 |   const id = index === 8 ? 'knowledge-check' : `${manifest('final').sections[index].id}-questions`, data = activity('final', id).data;
  131 |   const host = original ? page.locator(`#quiz-${index}`) : own(page, id), panel = original ? host : host.locator('xpath=../../..');
  132 |   result[key + 'question-panel'] = await paint(panel, ['backgroundColor', 'borderLeftWidth', 'borderRadius']);
  133 |   result[key + 'question-title'] = await paint(host.locator(original ? 'h3' : '.dsl-sequence-heading'), ['fontFamily', 'fontSize', 'color']);
  134 |   for (const [n, q] of data.questions.entries()) {
  135 |     result[key + `prompt-${n}`] = await paint(host.locator(original ? 'p.font-bold' : '.dsl-question-prompt'));
  136 |     if (q.context) result[key + `context-${n}`] = await paint(host.locator(original ? '.notice' : '.dsl-question-context'), ['backgroundColor', 'borderLeftWidth', 'borderRadius']);
  137 |     const correct = q.options.findIndex(o => o.id === q.correctOptionId), wrong = correct ? 0 : 1;
  138 |     for (const [step, option] of [wrong, correct, wrong, correct].entries()) {
  139 |       const button = host.locator(original ? '.choice' : '.dsl-choice').nth(option); await activate(button);
  140 |       result[key + `choice-${n}-${step}`] = await paint(button, ['backgroundColor', 'borderLeftWidth', 'color', 'fontWeight']);
  141 |       result[key + `feedback-${n}-${step}`] = await paint(host.locator(original ? '.feedback' : '.dsl-feedback'), ['backgroundColor', 'borderLeftWidth', 'color']);
  142 |     }
  143 |     if (n < data.questions.length - 1) await activate(host.getByRole('button', {name: 'Next question →', exact: true}));
  144 |   }
  145 | }
  146 | 
  147 | async function middleQuestions(page, index, original, key, result) {
  148 |   const specs = {1: ['classification', 'classify', '#s1-activity', '[data-reveal-id="classification"]'], 2: ['research', 'research', '#research-activity', '[data-reveal-id="research-activity"]'],
  149 |     3: ['group-decisions', 'group', '#group-activity', '[data-reveal-id="group-activity"]'], 4: ['communication-diagnosis', 'communication', '#communication-activity', '[data-reveal-id="communication-activity"]'],
  150 |     5: ['speaking-simulator', 'speaking', '#speaking-activity', '[data-reveal-id="speaking-activity"]'], 7: ['knowledge-check', 'quiz', '.activity:has(#quiz-options)', '.dsl-question-panel']};
  151 |   if (index === 6) {
  152 |     const data = activity('middle', 'application').data.questions;
  153 |     for (const [n, q] of data.entries()) await middleChoice(page, original ? page.locator(`.activity:has(#application-${n ? 'b' : 'a'}-options)`) : own(page, 'application').locator(`[data-question-id="${q.id}"]`), original, key + `application-${n}/`, result, q, original ? '.option' : '.dsl-choice');
  154 |     return;
  155 |   }
  156 |   if (!specs[index]) return;
  157 |   const [name, prefix, oldPanel, newPanel] = specs[index], data = activity('middle', name).data, host = original ? page.locator(oldPanel) : own(page, name);
  158 |   result[key + 'activity-panel'] = await paint(original ? host : page.locator(newPanel));
  159 |   result[key + 'activity-title'] = await paint(original ? host.locator(':scope>h3').first() : index === 7 ? host.locator('.dsl-question-counter') : page.locator(newPanel).locator('h3').first());
  160 |   if (index === 2) result[key + 'research-caution'] = await paint(original ? host.locator(':scope>.caution') : page.locator(newPanel + '>.dsl-tone-caution'));
  161 |   for (const [n, q] of (data.questions || [data]).entries()) {
  162 |     await middleChoice(page, host, original, key + `question-${n}/`, result, q, original ? '.option' : '.dsl-choice', prefix);
  163 |     if (data.questions && n < data.questions.length - 1) await activate(original ? page.locator(`#${prefix}-next`) : host.locator('.dsl-question-next'));
  164 |   }
  165 |   if (index === 7) {
  166 |     result[key + 'overview'] = await paint(original ? page.locator('#view-7>.panel') : page.locator('.dsl-question-overview'));
  167 |     result[key + 'quiz-score'] = await paint(original ? page.locator('#quiz-score') : page.locator('.dsl-question-overview>.dsl-question-score'));
  168 |     result[key + 'quiz-jumps'] = await paint(original ? page.locator('#quiz-status button') : page.locator('.dsl-question-jump'));
  169 |   }
  170 | }
  171 | async function middleChoice(page, host, original, key, result, question, choiceSelector, prefix) {
  172 |   const choices = host.locator(choiceSelector), good = question.options.findIndex(o => o.id === question.correctOptionId), wrong = good ? 0 : 1;
  173 |   result[key + 'prompt'] = await paint(original ? host.locator(prefix ? `#${prefix}-question,p.font-bold` : ':scope>h3').first() : host.locator('.dsl-question-prompt'));
  174 |   for (const [step, n] of [good, wrong, good].entries()) {
  175 |     await activate(choices.nth(n));
  176 |     result[key + `choice-${step}`] = await paint(choices.nth(n)); result[key + `feedback-${step}`] = await paint(host.locator(original ? '.feedback' : '.dsl-feedback'));
  177 |   }
  178 |   if (prefix && prefix !== 'research') {
  179 |     result[key + 'next'] = await paint(original ? page.locator(`#${prefix}-next`) : host.locator('.dsl-question-next'));
  180 |     if (prefix !== 'quiz') result[key + 'score'] = await paint(original ? page.locator(`#${prefix}-count`) : host.locator('.dsl-question-score'));
  181 |   }
  182 | }
  183 | async function openingStates(page, index, original, key, result) {
  184 |   const view = page.locator(`#view-${index}`);
  185 |   if (index === 0) {
  186 |     const choices = view.locator(original ? '.classify-answer' : '.dsl-choice'); await activate(choices.nth(1));
  187 |     if (!original) await expect(choices.nth(1)).toHaveClass(/dsl-selected-incorrect/);
  188 |     await activate(choices.first()); if (!original) await expect(choices.first()).toHaveClass(/dsl-selected-correct/);
  189 |     await view.locator('#classify-next').click(); await expect(view.locator('#classify-counter')).toHaveText('STATEMENT 2 OF 5');
  190 |   }
  191 |   if (index === 1) {
  192 |     result[key + 'timeline-closed'] = await paint(view.locator('.timeline-toggle'));
  193 |     for (let n = 1; n <= 6; n++) {const control = view.locator(`[aria-controls="stage-${n}"]`); await activate(control); await expect(control).toHaveAttribute('aria-expanded', 'true'); await expect(view.locator(`#stage-${n}`)).toBeVisible();}
  194 |     result[key + 'timeline-open'] = await paint(view.locator('.timeline-toggle'));
  195 |     for (const n of [0, 1, 2]) await view.locator('.sequence-choices button').nth(n).click();
  196 |     if (!original) {await expect(view.locator('.sequence-choices .dsl-selected-incorrect')).toHaveCount(1); await expect(view.locator('.dsl-panel-explored')).toHaveCount(6);}
  197 |   }
  198 |   if (index === 2) {
  199 |     result[key + 'tabs'] = await paint(view.locator('.analysis-tab'));
  200 |     for (const kind of ['who', 'what', 'how', 'where', 'terms']) {const tab = view.locator(`.analysis-tab[data-kind="${kind}"]`); await activate(tab); await expect(tab).toHaveAttribute('aria-selected', 'true'); expect(await view.locator('.task-mark.on').evaluateAll(nodes => nodes.map(n => n.dataset.kind))).toEqual({who: ['who'], what: ['what'], how: ['how', 'how'], where: ['where', 'where'], terms: ['who', 'what']}[kind]);}
  201 |   }
  202 |   if ([2, 3, 5].includes(index)) {
  203 |     const choices = view.locator(`#${{2: 'what-how', 3: 'clarification', 5: 'research'}[index]}-options button`);
  204 |     for (const n of [0, index === 2 ? 0 : index === 3 ? 1 : 2, index === 2 ? 1 : 0]) await activate(choices.nth(n));
  205 |   }
  206 |   if (index === 4) {await view.locator('#show-model').click(); await expect(view.locator('#model-answer')).toBeVisible(); result[key + 'model'] = await paint(view.locator('#model-answer')); await view.locator('#show-model').click(); await expect(view.locator('#model-answer')).toBeHidden();}
  207 |   if (index === 6) {await view.locator('#quiz-list article').first().locator('button').first().click(); await expect(view.locator('#quiz-score')).toHaveText('Knowledge check: 5 of 5 correct.');}
  208 | }
  209 | 
  210 | export function compare(actual, expected) {
  211 |   for (const [key, value] of Object.entries(actual)) {
> 212 |     if (key.endsWith('/prose')) {for (const [text, style] of Object.entries(value)) expect.soft(style, `${key}${text}`).toEqual(expected[key][text]);}
      |                                                                                                                         ^ Error: knowledge-check/proseLESSON COMPLETE
  213 |     else expect.soft(value, key).toEqual(expected[key]);
  214 |   }
  215 |   // Current side must not silently omit a source role or an entire activity.
  216 |   expect.soft(Object.keys(actual).sort()).toEqual(Object.keys(expected).sort());
  217 | }
  218 | 
```