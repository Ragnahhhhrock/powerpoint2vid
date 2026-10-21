/* RSS feed of published blog posts (newest 30). */
import { livePosts, cacheSeconds, xmlEscape, SITE } from '../_lib/blog-gate.js';

export async function onRequestGet() {
  const items = livePosts().slice(0, 30).map((p) => `  <item>
    <title>${xmlEscape(p.title)}</title>
    <link>${SITE}/blog/${p.slug}</link>
    <guid isPermaLink="true">${SITE}/blog/${p.slug}</guid>
    <pubDate>${new Date(p.date + 'T00:00:00+08:00').toUTCString()}</pubDate>
    <description>${xmlEscape(p.description)}</description>
  </item>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>PowerPoint2Vid Blog</title>
  <link>${SITE}/blog/</link>
  <atom:link href="${SITE}/blog/feed.xml" rel="self" type="application/rss+xml"/>
  <description>Presentation tips, explainer videos and the PowerPoint to video converter.</description>
  <language>en-au</language>
${items}
</channel>
</rss>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': `public, max-age=${cacheSeconds()}` },
  });
}
