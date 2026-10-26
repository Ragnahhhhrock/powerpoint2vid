/* POST /api/redeem { code } -> unlocks Pro on the signed-in account with a one-off gift code.
 * Only SHA-256 hashes of codes live in the repo. Each code works once (KV redeemed:<hash> -> uid). */
import { json, sessionUid, configError, getSub } from '../_lib/auth.js';

const GIFT_CODES = {
  // Sister (high school teacher) — Pro, no expiry
  '1e5a792c1632c85ac46c07728ec9ebb258b1c7e32b49a20f6f2e4af51e97684e': { plan: 'gift', note: 'sister' },
};

const sha256 = async (s) => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)))]
  .map((b) => b.toString(16).padStart(2, '0')).join('');

export async function onRequestPost({ request, env }) {
  const bad = configError(env); if (bad) return bad;
  const uid = await sessionUid(request, env);
  if (!uid) return json({ error: 'Log in first, then enter your code.' }, 401);
  let b; try { b = await request.json(); } catch (e) { return json({ error: 'Bad request.' }, 400); }
  const code = String(b.code || '').trim().toUpperCase().slice(0, 64);
  const hash = await sha256(code);
  const gift = GIFT_CODES[hash];
  if (!gift) return json({ error: 'That code is not valid.' }, 400);
  const usedBy = await env.ACCOUNTS.get('redeemed:' + hash);
  if (usedBy && usedBy !== uid) return json({ error: 'That code has already been used.' }, 409);
  if ((await getSub(env, uid)).active && !usedBy) return json({ error: 'Pro is already active on this account.' }, 409);
  await env.ACCOUNTS.put('redeemed:' + hash, uid);
  await env.ACCOUNTS.put('sub:' + uid, JSON.stringify({ active: true, status: 'gift', plan: gift.plan, redeemedAt: Date.now() }));
  return json({ ok: true, pro: true });
}
