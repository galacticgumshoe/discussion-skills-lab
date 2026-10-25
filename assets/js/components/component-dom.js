// MIT. Small root-owned DOM/lifecycle helpers, not a content renderer or registry.
const mounts = new WeakSet();
let serial = 0;

export function componentRoot(root, className) {
  if (mounts.has(root)) throw new TypeError('Component is already mounted on this root. Destroy it before remounting.');
  mounts.add(root);
  const document = root.ownerDocument, listeners = [], nodes = [];
  const prefix = `dsl-component-${++serial}`;
  let destroyed = false;
  root.classList.add('dsl-component', className);
  return {
    prefix,
    get destroyed() { return destroyed; },
    node(tag, className, text) {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (text !== undefined) element.textContent = text;
      return element;
    },
    append(...elements) { root.append(...elements); nodes.push(...elements); },
    listen(element, type, handler) {
      element.addEventListener(type, handler);
      listeners.push(() => element.removeEventListener(type, handler));
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      listeners.forEach(remove => remove());
      nodes.forEach(node => node.remove());
      root.classList.remove('dsl-component', className);
      mounts.delete(root);
    }
  };
}

export const snapshot = state => structuredClone(state);
export const unionIds = (previous = [], next = []) => [...new Set([...previous, ...next])];
export function setText(element, text) {
  // Do not replace a live-region text node on an unchanged app update.
  if (element.textContent !== text) element.textContent = text;
}
