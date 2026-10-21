/* Blog sources (content/blog/*.md, calendar.json) are build inputs, not pages. Keep them unpublished. */
export function onRequest() {
  return new Response('Not found', { status: 404, headers: { 'X-Robots-Tag': 'noindex' } });
}
