/* Serves the static sitemap.xml with the blog index and every published blog post added. */
import { livePosts, cacheSeconds, SITE } from './_lib/blog-gate.js';

export async function onRequestGet(ctx) {
  const res = await ctx.env.ASSETS.fetch(new URL('/sitemap.xml', ctx.request.url));
  let xml = await res.text();
  const posts = livePosts();
  const urls = [
    `  <url><loc>${SITE}/blog/</loc>${posts[0] ? `<lastmod>${posts[0].date}</lastmod>` : ''}<changefreq>daily</changefreq><priority>0.7</priority></url>`,
    ...posts.map((p) => `  <url><loc>${SITE}/blog/${p.slug}</loc><lastmod>${p.date}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`),
  ].join('\n');
  xml = xml.includes('</urlset>') ? xml.replace('</urlset>', `${urls}\n</urlset>`) : xml;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': `public, max-age=${cacheSeconds()}` },
  });
}
