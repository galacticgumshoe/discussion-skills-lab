// MIT — content includes are local files, never executable URLs.
export function resolveContentUrl(relativePath, declaringUrl, allowedRootUrl) {
  const fail = () => { throw new Error('Unsafe content path'); };
  // Deliberately exclude all percent encoding, whitespace, queries, fragments,
  // backslashes and absolute paths (including same-origin absolute URLs).
  if (typeof relativePath !== 'string' || !/^[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]+)*$/.test(relativePath)) fail();
  const root = new URL(allowedRootUrl);
  const declaring = new URL(declaringUrl);
  if (!['http:', 'https:'].includes(root.protocol) || root.username || root.password || root.search || root.hash || !root.pathname.endsWith('/')) fail();
  if (declaring.origin !== root.origin || declaring.username || declaring.password || declaring.search || declaring.hash) fail();
  const result = new URL(relativePath, declaring);
  if (result.origin !== root.origin || !result.pathname.startsWith(root.pathname) || /[%\\]/.test(result.pathname)) fail();
  return result;
}

async function fetchText(url, signal) {
  const checked = new URL(url);
  if (!['http:', 'https:'].includes(checked.protocol) || checked.username || checked.password || checked.search || checked.hash ||
      (typeof location !== 'undefined' && checked.origin !== location.origin)) throw new Error('Unsafe content URL');
  let response;
  try {
    response = await fetch(checked, { signal, mode: 'same-origin', credentials: 'same-origin', redirect: 'error', cache: 'no-store' });
  } catch { throw new Error(`${checked.pathname}: network failure or request aborted`); }
  if (!response.ok) throw new Error(`${checked.pathname}: HTTP ${response.status}`);
  try { return await response.text(); }
  catch { throw new Error(`${checked.pathname}: response read failure`); }
}

export async function loadJson(url, { validate, signal } = {}) {
  const text = await fetchText(url, signal);
  const path = new URL(url).pathname;
  let data;
  try { data = JSON.parse(text); }
  catch { throw new Error(`${path}: invalid JSON`); }
  if (typeof validate !== 'function') throw new Error(`${path}: validator required`);
  try { if (validate(data) === false) throw new Error(); }
  catch { throw new Error(`${path}: document validation failed`); }
  return data;
}

export async function loadMarkdown(url, { signal } = {}) {
  return fetchText(url, signal);
}
