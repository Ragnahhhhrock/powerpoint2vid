/* Aggregate usage counters shared by /api/stats and the Pro job endpoint. Numbers only, never content.
 * KV namespace bound as STATS; if it is missing, counting is skipped silently. */
const KEY = 'totals';
export const EMPTY = { videos: 0, decks: 0, slides: 0, seconds: 0 };
export const clamp = (n, max) => Math.max(0, Math.min(max, Math.round(+n || 0)));

export async function readTotals(env) {
  const t = await env.STATS.get(KEY, 'json');
  return Object.assign({}, EMPTY, t || {});
}
export async function writeTotals(env, t) {
  await env.STATS.put(KEY, JSON.stringify(t));
}
/* A finished Pro video: one deck, its slides, one video. Never throws. */
export async function countProVideo(env, { slides, seconds } = {}) {
  try {
    if (!env.STATS) return;
    const t = await readTotals(env);
    t.videos += 1; t.decks += 1; t.slides += clamp(slides, 300); t.seconds += clamp(seconds, 3600);
    await writeTotals(env, t);
  } catch { /* counting must never break a job */ }
}
