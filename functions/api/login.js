/* POST /api/login  { email, password } -> signs in. */
import { json, configError, normEmail, hashPassword, safeEqual, makeSession, sessionCookie } from '../_lib/auth.js';

const DUMMY_SALT = '00000000000000000000000000000000';

export async function onRequestPost({ request, env }) {
  const bad = configError(env); if (bad) return bad;
  let b; try { b = await request.json(); } catch (e) { return json({ error: 'Bad request.' }, 400); }
  const email = normEmail(b.email), password = String(b.password || '').slice(0, 200);
  const user = await env.ACCOUNTS.get('user:' + email, 'json');
  // Always hash so a missing account takes as long as a wrong password.
  const hash = await hashPassword(password, user ? user.salt : DUMMY_SALT);
  if (!user || !safeEqual(hash, user.hash)) return json({ error: 'Incorrect email or password.' }, 401);
  return json({ ok: true, email }, 200, { 'Set-Cookie': sessionCookie(await makeSession(env, user.id)) });
}
