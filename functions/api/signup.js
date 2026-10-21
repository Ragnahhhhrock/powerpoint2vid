/* POST /api/signup  { email, password } -> creates an account and signs in. */
import { json, configError, normEmail, validEmail, newSalt, newId, hashPassword, makeSession, sessionCookie } from '../_lib/auth.js';

export async function onRequestPost({ request, env }) {
  const bad = configError(env); if (bad) return bad;
  let b; try { b = await request.json(); } catch (e) { return json({ error: 'Bad request.' }, 400); }
  const email = normEmail(b.email), password = String(b.password || '');
  if (!validEmail(email)) return json({ error: 'Enter a valid email address.' }, 400);
  if (password.length < 8 || password.length > 200) return json({ error: 'Password must be 8 to 200 characters.' }, 400);
  if (await env.ACCOUNTS.get('user:' + email)) return json({ error: 'An account with that email already exists. Log in instead.' }, 409);
  const id = newId(), salt = newSalt();
  const user = { id, email, salt, hash: await hashPassword(password, salt), created: Date.now() };
  await env.ACCOUNTS.put('user:' + email, JSON.stringify(user));
  await env.ACCOUNTS.put('uid:' + id, email);
  return json({ ok: true, email }, 200, { 'Set-Cookie': sessionCookie(await makeSession(env, id)) });
}
