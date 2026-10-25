// MIT. All callers use this wrapper, never vendor APIs or student text.
import markdownit from '../../vendor/markdown-it/markdown-it.esm.min.mjs';
import DOMPurify from '../../vendor/dompurify/purify.es.mjs';

const parser = markdownit({ html: false, linkify: false, typographer: false, breaks: false });
// Soft newlines remain spaces; blank lines delimit original paragraphs. Explicit
// Markdown hard breaks become br. No images, class/style/data/events or embeds.
const tags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'strong', 'em', 'blockquote', 'code', 'pre', 'br', 'a'];

export function renderMarkdown(source, { baseUrl }) {
  const fragment = DOMPurify.sanitize(parser.render(source), {
    ALLOWED_TAGS: tags, ALLOWED_ATTR: ['href', 'title'],
    ALLOW_DATA_ATTR: false, ALLOW_ARIA_ATTR: false,
    RETURN_DOM_FRAGMENT: true
  });
  for (const anchor of fragment.querySelectorAll('a[href]')) {
    const href = anchor.getAttribute('href');
    try {
      // Reject encoding/control-character tricks before resolving. Includes use
      // stricter root containment; prose can link to ordinary HTTPS destinations.
      const decoded = decodeURIComponent(href);
      if (/[\u0000-\u0020\u007f\\]/.test(decoded) || /%[0-9a-f]{2}/i.test(decoded) || /^(?:javascript|vbscript|data):/i.test(decoded) || decoded.startsWith('//')) throw new Error();
      const url = new URL(href, baseUrl);
      if (!['https:', 'http:', 'mailto:'].includes(url.protocol) || url.username || url.password) throw new Error();
      anchor.setAttribute('href', url.href);
    } catch { anchor.removeAttribute('href'); }
  }
  return fragment;
}
