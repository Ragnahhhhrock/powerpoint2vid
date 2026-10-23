/* Usage counters for the homepage.
 * GET  /api/stats  -> { videos, decks, slides, seconds }
 * POST /api/stats  -> body { type: 'deck', slides } or { type: 'video', slides, seconds }
 * Stores only aggregate numbers in the KV namespace bound as STATS. No file names, content or user data.
 * Cloudflare Pages: Settings > Functions > KV namespace bindings > variable name STATS. */
import { EMPTY, clamp, readTotals as read, writeTotals } from '../_lib/stats.js';
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export async function onRequestGet({ env }) {
  if (!env.STATS) return json(EMPTY);
  return json(await read(env));
}

export async function onRequestPost({ request, env }) {
  if (!env.STATS) return json({ error: 'STATS binding missing' }, 503);
  let b;
  try { b = await request.json(); } catch (e) { return json({ error: 'bad json' }, 400); }
  const t = await read(env);
  if (b.type === 'deck') { t.decks += 1; t.slides += clamp(b.slides, 300); }
  else if (b.type === 'video') { t.videos += 1; t.seconds += clamp(b.seconds, 3600); }
  else return json({ error: 'bad type' }, 400);
  await writeTotals(env, t);
  return json(t);
}
