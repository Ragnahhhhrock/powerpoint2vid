/* Shared helpers for accounts, sessions and subscription state (Cloudflare Pages Functions).
 * Bindings / secrets (Cloudflare Pages > Settings):
 *   ACCOUNTS               KV namespace (users, subscriptions)
 *   SESSION_SECRET         long random string used to sign session cookies
 *   STRIPE_WEBHOOK_SECRET  signing secret (whsec_...) of the Stripe webhook endpoint
 *   ADMIN_EMAILS (optional) comma-separated emails that get all paid features without a subscription
 *   PORTAL_URL (optional)  Stripe customer portal login link, shown on the account page
 * KV keys: user:<email> -> user, uid:<id> -> email, sub:<id> -> subscription, cust:<stripeCustomerId> -> id */
const enc = new TextEncoder();
const ITERATIONS = 100000; // Workers cap PBKDF2 at 100k
const SESSION_DAYS = 30;
export const COOKIE = 'p2v_session';

export const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: Object.assign({ 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, headers) });

const toHex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
const fromHex = (h) => new Uint8Array(h.match(/../g).map((x) => parseInt(x, 16)));
const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

export function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

export async function hmac(secret, message) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return crypto.subtle.sign('HMAC', key, enc.encode(message));
}

export async function hashPassword(password, saltHex) {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: fromHex(saltHex), iterations: ITERATIONS }, key, 256);
  return toHex(bits);
}

export const newSalt = () => toHex(crypto.getRandomValues(new Uint8Array(16)));
export const newId = () => toHex(crypto.getRandomValues(new Uint8Array(12)));

export const normEmail = (e) => String(e || '').trim().toLowerCase();
export const validEmail = (e) => e.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export async function makeSession(env, uid) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DAYS * 86400;
  const payload = uid + '.' + exp;
  return payload + '.' + b64u(await hmac(env.SESSION_SECRET, payload));
}

export const sessionCookie = (token) =>
  `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_DAYS * 86400}`;
export const clearCookie = () => `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;

/* Returns the signed-in user id, or null. */
export async function sessionUid(request, env) {
  if (!env.SESSION_SECRET) return null;
  const m = (request.headers.get('Cookie') || '').match(new RegExp('(?:^|;\\s*)' + COOKIE + '=([^;]+)'));
  if (!m) return null;
  const parts = m[1].split('.');
  if (parts.length !== 3) return null;
  const [uid, exp, sig] = parts;
  if (!/^[0-9a-f]{24}$/.test(uid) || !(+exp > Date.now() / 1000)) return null;
  if (!safeEqual(sig, b64u(await hmac(env.SESSION_SECRET, uid + '.' + exp)))) return null;
  return uid;
}

/* Admin accounts: emails listed in the ADMIN_EMAILS variable (comma separated) get every paid feature, no subscription. */
export async function isAdmin(env, uid) {
  if (!env.ADMIN_EMAILS) return false;
  const email = await env.ACCOUNTS.get('uid:' + uid);
  return !!email && env.ADMIN_EMAILS.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean).includes(email.toLowerCase());
}

export async function getSub(env, uid) {
  if (await isAdmin(env, uid)) return { active: true, plan: 'admin' };
  const s = await env.ACCOUNTS.get('sub:' + uid, 'json');
  return s || { active: false, plan: null };
}

/* Only allow redirects to paths on this site. */
export const safeNext = (n) => (typeof n === 'string' && /^\/[^/\\]/.test(n) ? n : '/');

export function configError(env) {
  if (!env.ACCOUNTS) return json({ error: 'Accounts are not set up yet (ACCOUNTS binding missing).' }, 503);
  if (!env.SESSION_SECRET) return json({ error: 'Accounts are not set up yet (SESSION_SECRET missing).' }, 503);
  return null;
}
