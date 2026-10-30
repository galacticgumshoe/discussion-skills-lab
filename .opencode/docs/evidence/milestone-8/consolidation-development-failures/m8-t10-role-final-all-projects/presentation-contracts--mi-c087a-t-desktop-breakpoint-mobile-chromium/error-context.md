# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: presentation-contracts.spec.mjs >> /middle all authored presentation roles/states survive consolidation at desktop/breakpoint/mobile
- Location: tests/browser/presentation-contracts.spec.mjs:12:3

# Error details

```
Error: structure-substance/question-0/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-1/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-2/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-3/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: structure-substance/question-4/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 255, 255)",
-     "borderLeftColor": "rgb(203, 217, 224)",
-     "borderLeftWidth": "1px",
+     "backgroundColor": "rgb(232, 247, 238)",
+     "borderLeftColor": "rgb(23, 128, 78)",
+     "borderLeftWidth": "2px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(203, 217, 224)",
-     "borderTopWidth": "1px",
-     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
-     "color": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(23, 128, 78)",
+     "borderTopWidth": "2px",
+     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
+     "color": "rgb(19, 94, 60)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: structure-substance/question-4/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: evidence/question-0/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: evidence/question-0/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 255, 255)",
-     "borderLeftColor": "rgb(203, 217, 224)",
-     "borderLeftWidth": "1px",
+     "backgroundColor": "rgb(232, 247, 238)",
+     "borderLeftColor": "rgb(23, 128, 78)",
+     "borderLeftWidth": "2px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(203, 217, 224)",
-     "borderTopWidth": "1px",
-     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
-     "color": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(23, 128, 78)",
+     "borderTopWidth": "2px",
+     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
+     "color": "rgb(19, 94, 60)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: evidence/question-0/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: support-group/question-1/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: support-group/question-2/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: support-group/question-2/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: support-group/question-2/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: communication/question-0/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: communication/question-1/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: communication/question-2/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: communication/question-3/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: communication/question-3/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: communication/question-3/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: speaking-conflicts/question-1/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: speaking-conflicts/question-1/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: integrated-practice/application-0/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: integrated-practice/application-0/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-0/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-0/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-0/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-0/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-1/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-1/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: knowledge-check/question-1/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-1/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-2/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-2/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: knowledge-check/question-2/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-2/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-3/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-3/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: knowledge-check/question-3/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-3/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-3/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-4/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-4/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: knowledge-check/question-4/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-4/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: structure-substance/question-1/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: structure-substance/question-1/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 255, 255)",
-     "borderLeftColor": "rgb(203, 217, 224)",
-     "borderLeftWidth": "1px",
+     "backgroundColor": "rgb(232, 247, 238)",
+     "borderLeftColor": "rgb(23, 128, 78)",
+     "borderLeftWidth": "2px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(203, 217, 224)",
-     "borderTopWidth": "1px",
-     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
-     "color": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(23, 128, 78)",
+     "borderTopWidth": "2px",
+     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
+     "color": "rgb(19, 94, 60)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: structure-substance/question-1/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-2/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-2/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 255, 255)",
-     "borderLeftColor": "rgb(203, 217, 224)",
-     "borderLeftWidth": "1px",
+     "backgroundColor": "rgb(232, 247, 238)",
+     "borderLeftColor": "rgb(23, 128, 78)",
+     "borderLeftWidth": "2px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(203, 217, 224)",
-     "borderTopWidth": "1px",
-     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
-     "color": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(23, 128, 78)",
+     "borderTopWidth": "2px",
+     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
+     "color": "rgb(19, 94, 60)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: structure-substance/question-2/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-3/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-3/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 255, 255)",
-     "borderLeftColor": "rgb(203, 217, 224)",
-     "borderLeftWidth": "1px",
+     "backgroundColor": "rgb(232, 247, 238)",
+     "borderLeftColor": "rgb(23, 128, 78)",
+     "borderLeftWidth": "2px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(203, 217, 224)",
-     "borderTopWidth": "1px",
-     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
-     "color": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(23, 128, 78)",
+     "borderTopWidth": "2px",
+     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
+     "color": "rgb(19, 94, 60)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: structure-substance/question-4/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: evidence/question-0/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: evidence/question-0/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(229, 231, 235)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: support-group/question-0/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: support-group/question-1/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: support-group/question-2/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 255, 255)",
-     "borderLeftColor": "rgb(203, 217, 224)",
-     "borderLeftWidth": "1px",
+     "backgroundColor": "rgb(255, 240, 237)",
+     "borderLeftColor": "rgb(177, 63, 57)",
+     "borderLeftWidth": "2px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(203, 217, 224)",
-     "borderTopWidth": "1px",
-     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
-     "color": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(177, 63, 57)",
+     "borderTopWidth": "2px",
+     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
+     "color": "rgb(132, 49, 45)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: support-group/question-2/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: support-group/question-2/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: communication/question-0/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: communication/question-0/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(229, 231, 235)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: communication/question-0/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -1,9 +1,9 @@
  Array [
    Object {
      "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "borderLeftColor": "rgb(229, 231, 235)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: communication/question-2/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: communication/question-3/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: communication/question-3/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: speaking-conflicts/question-0/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: speaking-conflicts/question-0/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: speaking-conflicts/question-1/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: speaking-conflicts/question-1/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: speaking-conflicts/question-2/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: speaking-conflicts/question-2/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: speaking-conflicts/question-2/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: integrated-practice/application-0/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: integrated-practice/application-0/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: integrated-practice/application-1/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: integrated-practice/application-1/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-0/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-0/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: knowledge-check/question-0/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-0/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(229, 231, 235)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-0/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-0/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -1,9 +1,9 @@
  Array [
    Object {
      "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "borderLeftColor": "rgb(229, 231, 235)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-1/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-1/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: knowledge-check/question-1/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-1/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -1,9 +1,9 @@
  Array [
    Object {
      "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "borderLeftColor": "rgb(229, 231, 235)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-1/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-1/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -1,9 +1,9 @@
  Array [
    Object {
      "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "borderLeftColor": "rgb(229, 231, 235)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-2/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-2/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: knowledge-check/question-2/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-2/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -1,9 +1,9 @@
  Array [
    Object {
      "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "borderLeftColor": "rgb(229, 231, 235)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-2/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-3/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-3/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: knowledge-check/question-3/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-3/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(229, 231, 235)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-3/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-3/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -1,9 +1,9 @@
  Array [
    Object {
      "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "borderLeftColor": "rgb(229, 231, 235)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-4/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-4/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: knowledge-check/question-4/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-4/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(229, 231, 235)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-4/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-4/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -1,9 +1,9 @@
  Array [
    Object {
      "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "borderLeftColor": "rgb(229, 231, 235)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-0/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: structure-substance/question-0/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: structure-substance/question-0/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-0/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: structure-substance/question-0/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-1/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: structure-substance/question-1/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-2/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: structure-substance/question-3/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: structure-substance/question-3/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-3/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-4/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: support-group/question-0/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: support-group/question-0/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: support-group/question-1/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: support-group/question-1/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: support-group/question-1/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: support-group/question-2/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: support-group/question-2/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: support-group/question-2/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: support-group/question-2/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: communication/question-0/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: communication/question-0/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: communication/question-1/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: communication/question-1/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: communication/question-1/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: communication/question-1/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: communication/question-1/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: communication/question-1/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: communication/question-2/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: communication/question-2/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: communication/question-2/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: communication/question-2/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: communication/question-2/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: communication/question-3/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: communication/question-3/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: communication/question-3/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: communication/question-3/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: communication/question-3/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: communication/question-3/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: speaking-conflicts/question-0/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: speaking-conflicts/question-0/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: speaking-conflicts/question-1/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: speaking-conflicts/question-2/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: speaking-conflicts/question-2/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: integrated-practice/application-0/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: integrated-practice/application-1/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: knowledge-check/question-0/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-0/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-1/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-1/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-1/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-1/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-2/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-2/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-2/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-2/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-2/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-3/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-3/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-3/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-3/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-4/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-4/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-4/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-0/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: structure-substance/question-0/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: structure-substance/question-0/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-0/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: structure-substance/question-0/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-1/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: structure-substance/question-1/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: structure-substance/question-1/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-1/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: structure-substance/question-1/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-2/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: structure-substance/question-2/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-2/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-3/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: structure-substance/question-3/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-3/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: structure-substance/question-3/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-4/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: structure-substance/question-4/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: structure-substance/question-4/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: structure-substance/question-4/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: structure-substance/question-4/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: structure-substance/question-4/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: evidence/question-0/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: evidence/question-0/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: evidence/question-0/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: evidence/question-0/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: evidence/question-0/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: evidence/question-0/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: support-group/question-0/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: support-group/question-0/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: support-group/question-0/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -1,9 +1,9 @@
  Array [
    Object {
      "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "borderLeftColor": "rgb(229, 231, 235)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: support-group/question-0/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(229, 231, 235)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: support-group/question-1/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: support-group/question-1/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(229, 231, 235)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: support-group/question-1/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(229, 231, 235)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: support-group/question-2/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: support-group/question-2/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: support-group/question-2/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 255, 255)",
-     "borderLeftColor": "rgb(203, 217, 224)",
-     "borderLeftWidth": "1px",
+     "backgroundColor": "rgb(232, 247, 238)",
+     "borderLeftColor": "rgb(23, 128, 78)",
+     "borderLeftWidth": "2px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(203, 217, 224)",
-     "borderTopWidth": "1px",
-     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
-     "color": "rgb(20, 43, 73)",
+     "borderTopColor": "rgb(23, 128, 78)",
+     "borderTopWidth": "2px",
+     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
+     "color": "rgb(19, 94, 60)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "400",
+     "fontWeight": "700",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: communication/question-0/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: communication/question-1/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: communication/question-2/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: communication/question-2/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: communication/question-3/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: speaking-conflicts/question-1/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: speaking-conflicts/question-1/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: speaking-conflicts/question-2/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: integrated-practice/application-0/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: integrated-practice/application-1/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: integrated-practice/application-1/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: integrated-practice/application-1/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-0/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-0/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-0/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-1/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-1/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-2/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-2/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-2/feedback-1

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
+     "backgroundColor": "rgb(252, 232, 230)",
+     "borderLeftColor": "rgb(172, 78, 69)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-2/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-2/feedback-2

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,9 +1,9 @@
  Array [
    Object {
-     "backgroundColor": "rgb(252, 232, 230)",
-     "borderLeftColor": "rgb(172, 78, 69)",
+     "backgroundColor": "rgb(231, 244, 241)",
+     "borderLeftColor": "rgb(8, 127, 131)",
      "borderLeftWidth": "4px",
      "borderRadius": "10px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
      "color": "rgb(20, 43, 73)",
```

```
Error: knowledge-check/question-3/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-3/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-3/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-4/choice-0

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-4/feedback-0

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 6

  Array [
    Object {
-     "backgroundColor": "rgb(231, 244, 241)",
-     "borderLeftColor": "rgb(8, 127, 131)",
-     "borderLeftWidth": "4px",
-     "borderRadius": "10px",
+     "backgroundColor": "rgba(0, 0, 0, 0)",
+     "borderLeftWidth": "0px",
+     "borderRadius": "0px",
      "borderTopWidth": "0px",
      "boxShadow": "none",
-     "color": "rgb(20, 43, 73)",
+     "color": "rgb(20, 92, 55)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
      "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "padding": "14px 16px",
+     "lineHeight": "25.6px",
+     "padding": "0px",
      "textTransform": "none",
    },
  ]
```

```
Error: knowledge-check/question-4/choice-1

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 240, 237)",
-     "borderLeftColor": "rgb(177, 63, 57)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(177, 63, 57)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(132, 49, 45) 4px 0px 0px 0px inset",
-     "color": "rgb(132, 49, 45)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
```

```
Error: knowledge-check/question-4/choice-2

expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

@@ -1,18 +1,18 @@
  Array [
    Object {
-     "backgroundColor": "rgb(232, 247, 238)",
-     "borderLeftColor": "rgb(23, 128, 78)",
-     "borderLeftWidth": "2px",
+     "backgroundColor": "rgb(255, 255, 255)",
+     "borderLeftColor": "rgb(203, 217, 224)",
+     "borderLeftWidth": "1px",
      "borderRadius": "11px",
-     "borderTopColor": "rgb(23, 128, 78)",
-     "borderTopWidth": "2px",
-     "boxShadow": "rgb(19, 94, 60) 4px 0px 0px 0px inset",
-     "color": "rgb(19, 94, 60)",
+     "borderTopColor": "rgb(203, 217, 224)",
+     "borderTopWidth": "1px",
+     "boxShadow": "rgba(0, 0, 0, 0) 0px 0px 0px 0px inset",
+     "color": "rgb(20, 43, 73)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
-     "fontWeight": "700",
+     "fontWeight": "400",
      "letterSpacing": "normal",
      "lineHeight": "24px",
      "padding": "13px 16px",
      "textTransform": "none",
    },
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
        - generic [ref=e9]: Making an Impact · The Middle Stage
      - generic [ref=e10]: SELF-PACED · 20–25 MINUTES
  - main [ref=e12]:
    - generic [ref=e13]:
      - generic [ref=e14]: Go to a section
      - combobox "Go to a section" [ref=e15]:
        - option "Welcome"
        - option "01 · Structure to substance"
        - option "02 · Make contributions count"
        - option "03 · Support the group"
        - option "04 · Communicate professionally"
        - option "05 · Navigate the conversation"
        - option "06 · Put it together"
        - option "07 · Knowledge check"
        - option "↗ · Quick reference" [selected]
    - status [ref=e16]: Quick reference is always available.
    - region "Middle Stage Quick Reference" [ref=e18]:
      - generic [ref=e19]:
        - generic [ref=e20]:
          - button "Print quick reference" [ref=e22] [cursor=pointer]
          - heading "Middle Stage Quick Reference" [active] [level=2] [ref=e23]
        - generic [ref=e24]:
          - generic [ref=e25]:
            - heading "01 Contribute substance" [level=3] [ref=e26]:
              - generic [ref=e27]: "01"
              - generic [ref=e28]: Contribute substance
            - list [ref=e29]:
              - listitem [ref=e30]: Share relevant research and insights frequently.
              - listitem [ref=e31]: Verbally cite publication and date; explain why evidence matters.
              - listitem [ref=e32]: Use anecdotes to illustrate, not replace, evidence.
              - listitem [ref=e33]: Avoid repetition and unrelated detours.
          - generic [ref=e34]:
            - heading "02 Support the group" [level=3] [ref=e35]:
              - generic [ref=e36]: "02"
              - generic [ref=e37]: Support the group
            - list [ref=e38]:
              - listitem [ref=e39]: Take notes on ideas, evidence, and their contributors; look up regularly.
              - listitem [ref=e40]: Help track the round and agreed agenda periods.
              - listitem [ref=e41]: Invite perspectives without repeatedly singling people out.
              - listitem [ref=e42]: Redirect respectfully toward the WHAT and HOW of the task.
          - generic [ref=e43]:
            - heading "03 Communicate professionally" [level=3] [ref=e44]:
              - generic [ref=e45]: "03"
              - generic [ref=e46]: Communicate professionally
            - list [ref=e47]:
              - listitem [ref=e48]: Listen actively; avoid visible frustration and distracting habits.
              - listitem [ref=e49]: Address fellow discussants, not the judge.
              - listitem [ref=e50]: Use concise language suited to your assigned role.
              - listitem [ref=e51]: Speak clearly and maintain volume through sentence endings.
          - generic [ref=e52]:
            - heading "04 Manage speaking conflicts" [level=3] [ref=e53]:
              - generic [ref=e54]: "04"
              - generic [ref=e55]: Manage speaking conflicts
            - list [ref=e56]:
              - listitem [ref=e57]: Continue assertively only with care; it risks dominance.
              - listitem [ref=e58]: Request first turn and honor your promise to yield.
              - listitem [ref=e59]: Yield and request the next turn when appropriate.
              - listitem [ref=e60]: Explain a timely, direct connection when requesting a turn.
              - listitem [ref=e61]: If interrupted, politely finish and give the promised speaker a turn.
          - generic [ref=e62]:
            - heading "05 Your goal" [level=3] [ref=e63]:
              - generic [ref=e64]: "05"
              - generic [ref=e65]: Your goal
            - list [ref=e66]:
              - listitem [ref=e67]:
                - strong [ref=e68]: Contribute evidence. Build on others. Keep the group moving toward a solution.
```

# Test source

```ts
  197 |     }
  198 |     return;
  199 |   }
  200 |   if (!specs[index]) return;
  201 |   const [name, prefix, oldPanel, newPanel] = specs[index], data = activity('middle', name).data, host = original ? page.locator(oldPanel) : own(page, name);
  202 |   result[key + 'activity-panel'] = await paint(original ? host : page.locator(newPanel));
  203 |   result[key + 'activity-title'] = await paint(original ? host.locator(':scope>h3').first() : index === 7 ? host.locator('.dsl-question-counter') : page.locator(newPanel).locator('h3').first());
  204 |   if (index === 2) result[key + 'research-caution'] = await paint(original ? host.locator(':scope>.caution') : page.locator(newPanel + '>.dsl-tone-caution'));
  205 |   for (const [n, q] of (data.questions || [data]).entries()) {
  206 |     await middleChoice(page, host, original, key + `question-${n}/`, result, q, original ? '.option' : '.dsl-choice', prefix);
  207 |     if (data.questions && n < data.questions.length - 1) await activate(original ? page.locator(`#${prefix}-next`) : host.locator('.dsl-question-next'));
  208 |   }
  209 |   if (index === 7) {
  210 |     result[key + 'overview'] = await paint(original ? page.locator('#view-7>.panel') : page.locator('.dsl-question-overview'));
  211 |     result[key + 'quiz-score'] = await paint(original ? page.locator('#quiz-score') : page.locator('.dsl-question-overview>.dsl-question-score'));
  212 |     // The old contract measured the first, noncurrent jump. The shared API also
  213 |     // supplies an active-question cue (covered by navigation/ARIA assertions),
  214 |     // which the source did not paint; it is not part of that neutral-role oracle.
  215 |     if (original) await activate(page.locator('#quiz-status button').last()); else await activate(page.locator('.dsl-question-jump').last());
  216 |     await page.mouse.move(0, 0);
  217 |     result[key + 'quiz-jumps'] = await paint(original ? page.locator('#quiz-status button').first() : page.locator('.dsl-question-jump').first());
  218 |   }
  219 | }
  220 | async function middleChoice(page, host, original, key, result, question, choiceSelector, prefix) {
  221 |   const choices = host.locator(choiceSelector), good = question.options.findIndex(o => o.id === question.correctOptionId), wrong = good ? 0 : 1;
  222 |   await page.mouse.move(0, 0);
  223 |   result[key + 'prompt'] = await paint(original ? host.locator(prefix ? `#${prefix}-question,p.font-bold` : ':scope>h3').first() : host.locator('.dsl-question-prompt'));
  224 |   result[key + 'neutral'] = await paint(choices.nth(wrong));
  225 |   for (const [step, n] of [good, wrong, good].entries()) {
  226 |     await activate(choices.nth(n));
  227 |     result[key + `choice-${step}`] = await paint(choices.nth(n)); result[key + `feedback-${step}`] = await paint(host.locator(original ? '.feedback' : '.dsl-feedback'));
  228 |   }
  229 |   if (prefix && prefix !== 'research') {
  230 |     result[key + 'next'] = await paint(original ? page.locator(`#${prefix}-next`) : host.locator('.dsl-question-next'));
  231 |     if (prefix !== 'quiz') result[key + 'score'] = await paint(original ? page.locator(`#${prefix}-count`) : host.locator('.dsl-question-score'));
  232 |   }
  233 | }
  234 | async function openingStates(page, index, original, key, result) {
  235 |   const view = page.locator(`#view-${index}`);
  236 |   if (index === 0) {
  237 |     const choices = view.locator(original ? '.classify-answer' : '.dsl-choice'); await activate(choices.nth(1));
  238 |     if (!original) await expect(choices.nth(1)).toHaveClass(/dsl-selected-incorrect/);
  239 |     await activate(choices.first()); if (!original) await expect(choices.first()).toHaveClass(/dsl-selected-correct/);
  240 |     await view.locator('#classify-next').click(); await expect(view.locator('#classify-counter')).toHaveText('STATEMENT 2 OF 5');
  241 |   }
  242 |   if (index === 1) {
  243 |     result[key + 'timeline-closed'] = await paint(view.locator('.timeline-toggle'), openingPaint);
  244 |     for (let n = 1; n <= 6; n++) {const control = view.locator(`[aria-controls="stage-${n}"]`); await activate(control); await expect(control).toHaveAttribute('aria-expanded', 'true'); await expect(view.locator(`#stage-${n}`)).toBeVisible();}
  245 |     result[key + 'timeline-open'] = await paint(view.locator('.timeline-toggle'), openingPaint);
  246 |     for (const n of [0, 1, 2]) await view.locator('.sequence-choices button').nth(n).click();
  247 |     if (!original) {await expect(view.locator('.sequence-choices .dsl-selected-incorrect')).toHaveCount(1); await expect(view.locator('.dsl-panel-explored')).toHaveCount(6);}
  248 |   }
  249 |   if (index === 2) {
  250 |     result[key + 'tabs'] = await paint(view.locator('.analysis-tab'), openingPaint);
  251 |     for (const kind of ['who', 'what', 'how', 'where', 'terms']) {const tab = view.locator(`.analysis-tab[data-kind="${kind}"]`); await activate(tab); await expect(tab).toHaveAttribute('aria-selected', 'true'); await expect(tab).toHaveCSS('background-color', 'rgb(20, 43, 73)'); expect(await view.locator('.task-mark.on').evaluateAll(nodes => nodes.map(n => n.dataset.kind))).toEqual({who: ['who'], what: ['what'], how: ['how', 'how'], where: ['where', 'where'], terms: ['who', 'what']}[kind]);}
  252 |   }
  253 |   if ([2, 3, 5].includes(index)) {
  254 |     const choices = view.locator(`#${{2: 'what-how', 3: 'clarification', 5: 'research'}[index]}-options button`);
  255 |     for (const n of [0, index === 2 ? 0 : index === 3 ? 1 : 2, index === 2 ? 1 : 0]) await activate(choices.nth(n));
  256 |   }
  257 |   if (index === 4) {await view.locator('#show-model').click(); await expect(view.locator('#model-answer')).toBeVisible(); result[key + 'model'] = await paint(view.locator('#model-answer')); await view.locator('#show-model').click(); await expect(view.locator('#model-answer')).toBeHidden();}
  258 |   if (index === 6) {await view.locator('#quiz-list article').first().locator('button').first().click(); await expect(view.locator('#quiz-score')).toHaveText('Knowledge check: 5 of 5 correct.');}
  259 | }
  260 | 
  261 | async function checkComposition(page, id, index, width) {
  262 |   const view = page.locator(`#view-${index}`);
  263 |   if (id !== 'middle') return;
  264 |   if (index === 0) {
  265 |     const tops = await view.locator('.dsl-card').evaluateAll(nodes => nodes.map(n => n.getBoundingClientRect().top));
  266 |     expect(new Set(tops).size).toBe(width > 850 ? 1 : 3);
  267 |     for (const card of await view.locator('.dsl-card').all()) {
  268 |       expect(await card.evaluate(card => {const face = card.querySelector('.dsl-card-front').getBoundingClientRect(), title = card.querySelector('.dsl-card-front .dsl-prose-h3').getBoundingClientRect(); return Math.abs(title.top + title.height / 2 - face.top - face.height / 2);})).toBeLessThan(2);
  269 |       const gaps = await card.locator('.dsl-card-back [role="listitem"]').evaluateAll(nodes => nodes.slice(1).map((n, i) => n.getBoundingClientRect().top - nodes[i].getBoundingClientRect().bottom));
  270 |       expect(gaps.every(gap => Math.abs(gap) < 1)).toBe(true);
  271 |     }
  272 |   }
  273 |   for (const card of await view.locator('.dsl-card').all()) for (const side of ['front', 'back']) {
  274 |     const face = card.locator(`.dsl-card-${side}`);
  275 |     if (await face.locator(':scope>.dsl-card-content>.dsl-card-title').count()) expect(await face.evaluate(n => n.querySelector('.dsl-card-title').getBoundingClientRect().bottom - n.querySelector('.dsl-card-copy').getBoundingClientRect().top)).toBeLessThan(1 / 64);
  276 |   }
  277 |   if (index === 1) {
  278 |     const group = own(page, 'classification'), tops = await group.locator('.dsl-choice').evaluateAll(nodes => nodes.map(n => n.getBoundingClientRect().top));
  279 |     expect(tops[0] === tops[1]).toBe(width > 600); await expect(group.locator('.dsl-question-counter')).toBeHidden();
  280 |   }
  281 |   if (index === 2) {
  282 |     const writer = own(page, 'evidence-writing');
  283 |     expect(await writer.evaluate(n => {const output = n.querySelector('[data-field-id="evidence-output"]'); return [...n.querySelectorAll('.dsl-writing-actions button')].every(button => !!(button.compareDocumentPosition(output) & Node.DOCUMENT_POSITION_FOLLOWING));})).toBe(true);
  284 |     await expect(writer.locator('[data-field-id="evidence-output"]')).toHaveAttribute('readonly', '');
  285 |   }
  286 |   if (index === 3) await expect(own(page, 'collaboration-panels').locator('blockquote').first().locator('br')).toHaveCount(3);
  287 |   if (index === 4) {
  288 |     const lefts = await own(page, 'communication-panels').locator('blockquote').evaluateAll(nodes => nodes.map(n => n.getBoundingClientRect().left));
  289 |     expect(lefts[0] === lefts[1]).toBe(width <= 600);
  290 |   }
  291 |   if (index === 7) await expect(page.locator('.dsl-tone-activity,.dsl-question-panel,.dsl-sequence-middle-application .dsl-question')).toHaveCount(9);
  292 | }
  293 | 
  294 | export function compare(actual, expected) {
  295 |   for (const [key, value] of Object.entries(actual)) {
  296 |     if (key.endsWith('/prose')) {for (const [text, style] of Object.entries(value)) expect.soft(style, `${key}${text}`).toEqual(expected[key][text]);}
> 297 |     else expect.soft(value, key).toEqual(expected[key]);
      |                                  ^ Error: knowledge-check/question-4/choice-2
  298 |   }
  299 |   // Current side must not silently omit a source role or an entire activity.
  300 |   expect.soft(Object.keys(actual).sort()).toEqual(Object.keys(expected).sort());
  301 | }
  302 | 
```