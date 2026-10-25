// MIT. No storage or progress-field discovery. A fallback never has a field ID/name.
export function createClipboard(root, { getText, field, status, messages = {} }) {
  const document = root.ownerDocument, view = document.defaultView;
  const text = {
    empty: 'Write a response before copying.', copied: 'Copied to clipboard.',
    selected: "Clipboard unavailable. The text is selected; use your device's Copy command.",
    fallback: 'Clipboard unavailable. Select and copy the text below:', ...messages
  };
  let fallback, returnButton, previousFocus, destroyed = false, pending = false;
  function dismiss() {
    const focused = document.activeElement === fallback || document.activeElement === returnButton;
    fallback?.removeEventListener('keydown', keydown);
    returnButton?.removeEventListener('keydown', keydown); returnButton?.removeEventListener('click', dismiss);
    fallback?.remove(); returnButton?.remove(); fallback = returnButton = undefined;
    if (focused && previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
  }
  function keydown(event) { if (event.key === 'Escape') { event.preventDefault(); dismiss(); } }
  return {
    async copy() {
      if (destroyed || pending) return;
      const value = getText();
      if (!value.trim()) { status.textContent = text.empty; return; }
      pending = true;
      if (!fallback) previousFocus = document.activeElement;
      try {
        if (!view.isSecureContext || !view.navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await view.navigator.clipboard.writeText(value);
        if (destroyed) return;
        dismiss(); status.textContent = text.copied;
      } catch {
        if (destroyed) return;
        if (field?.isConnected) {
          status.textContent = text.selected;
          field.focus({ preventScroll: true }); field.select();
        } else {
          if (!fallback) {
            fallback = document.createElement('textarea');
            fallback.dataset.clipboardFallback = ''; fallback.readOnly = true; fallback.rows = 7;
            fallback.setAttribute('aria-label', 'Select and copy this text');
            returnButton = document.createElement('button'); returnButton.type = 'button';
            returnButton.textContent = 'Return to copy control';
            returnButton.addEventListener('click', dismiss);
            fallback.addEventListener('keydown', keydown); returnButton.addEventListener('keydown', keydown);
            root.append(fallback, returnButton);
          }
          status.textContent = text.fallback;
          fallback.value = value; fallback.focus({ preventScroll: true }); fallback.select();
        }
      } finally { pending = false; }
    },
    destroy() { destroyed = true; dismiss(); }
  };
}
