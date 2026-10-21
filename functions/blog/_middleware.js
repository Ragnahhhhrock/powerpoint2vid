/* Date-gates the blog. Posts are built ahead of time (scripts/build-blog.py); this hides any post,
 * and its card on /blog/, until its publish date in Perth time. */
import { findPost, perthToday, cacheSeconds } from '../_lib/blog-gate.js';

const NOT_FOUND = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Post not found | PowerPoint2Vid Blog</title><meta name="robots" content="noindex">
<link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/blog.css"></head>
<body class="blog"><main class="wrap missing"><h1>That post isn't here</h1>
<p>It may not be published yet. There's a new post every day.</p>
<p><a class="btn" href="/blog/">Browse the blog</a> <a class="btn btn--ghost" href="/">PowerPoint to video converter</a></p></main></body></html>`;

export async function onRequest(ctx) {
  const url = new URL(ctx.request.url);
  const path = url.pathname.replace(/\/+$/, '').replace(/\.html$/, '');
  const today = perthToday();
  const headers = { 'Cache-Control': `public, max-age=${cacheSeconds()}` };

  if (path === '/blog' || path === '/blog/index') {
    const res = await ctx.next();
    if (!(res.headers.get('content-type') || '').includes('text/html')) return res;
    const out = new HTMLRewriter()
      .on('[data-publish]', {
        element(el) {
          if ((el.getAttribute('data-publish') || '') > today) el.remove();
        },
      })
      .transform(res);
    const r = new Response(out.body, out);
    r.headers.set('Cache-Control', headers['Cache-Control']);
    return r;
  }

  const slug = path.startsWith('/blog/') ? path.slice(6) : '';
  const post = slug && findPost(slug);
  if (post && post.date > today) {
    return new Response(NOT_FOUND, {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex', ...headers },
    });
  }
  return ctx.next();
}
