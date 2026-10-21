/* GET /api/me -> { loggedIn, email?, pro, plan? }. "pro" is true while a Stripe subscription is active. */
import { json, sessionUid, getSub } from '../_lib/auth.js';

export async function onRequestGet({ request, env }) {
  if (!env.ACCOUNTS || !env.SESSION_SECRET) return json({ loggedIn: false, pro: false, configured: false });
  const uid = await sessionUid(request, env);
  const email = uid ? await env.ACCOUNTS.get('uid:' + uid) : null;
  if (!uid || !email) return json({ loggedIn: false, pro: false, configured: true });
  const sub = await getSub(env, uid);
  return json({ loggedIn: true, email, pro: !!sub.active, plan: sub.plan || null, portalUrl: env.PORTAL_URL || null, configured: true });
}
