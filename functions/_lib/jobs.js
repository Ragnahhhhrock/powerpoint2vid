/* Video jobs (Pages Functions side). The heavy work runs on the studio runner (studio/server.mjs).
 * Bindings / secrets (Cloudflare Pages > Settings):
 *   ACCOUNTS (KV), SESSION_SECRET      as for accounts
 *   RUNNER_URL      base URL of the runner, e.g. https://runner.powerpoint2vid.com
 *   RUNNER_SECRET   shared secret the runner expects in x-p2v-secret
 *   MONTHLY_VIDEOS  (optional) videos per Pro subscriber per month, default 10
 * KV keys: job:<id> -> {id, uid, name, createdAt, status, step, pct, slides, degraded, charged}
 *          jobs:<uid> -> [id, ...] newest first (max 50)   usage:<uid>:<YYYY-MM> -> number */
import { json, sessionUid, getSub, isAdmin, configError } from './auth.js';

export const MAX_BYTES = 50 * 1048576;
export const ID_RE = /^[0-9a-f]{24}$/;
export const monthKey = (uid, d = new Date()) => `usage:${uid}:${d.toISOString().slice(0, 7)}`;
export const allowance = (env) => Math.max(0, parseInt(env.MONTHLY_VIDEOS || '10', 10) || 10);

export function runnerError(env) {
  return env.RUNNER_URL && env.RUNNER_SECRET ? null : json({ error: 'Video creation is not switched on yet.' }, 503);
}
export const runner = (env, path, init = {}) =>
  fetch(env.RUNNER_URL.replace(/\/$/, '') + path, { ...init, headers: { ...(init.headers || {}), 'x-p2v-secret': env.RUNNER_SECRET } });

/* Returns {uid} for a signed-in Pro user, or {res} with the error response to send. */
export async function requirePro(request, env) {
  const bad = configError(env); if (bad) return { res: bad };
  const uid = await sessionUid(request, env);
  if (!uid) return { res: json({ error: 'Log in to make a video.' }, 401) };
  const sub = await getSub(env, uid);
  if (!sub.active) return { res: json({ error: 'Pro is needed to make videos.' }, 402) };
  return { uid };
}

export async function usage(env, uid) {
  if (await isAdmin(env, uid)) return { used: 0, limit: 9999, remaining: 9999 };
  const used = parseInt((await env.ACCOUNTS.get(monthKey(uid))) || '0', 10) || 0;
  return { used, limit: allowance(env), remaining: Math.max(0, allowance(env) - used) };
}
export async function addUsage(env, uid, delta, when) {
  const k = monthKey(uid, when ? new Date(when) : new Date());
  const v = Math.max(0, (parseInt((await env.ACCOUNTS.get(k)) || '0', 10) || 0) + delta);
  await env.ACCOUNTS.put(k, String(v), { expirationTtl: 100 * 86400 });
}
export const pubJob = (j) => ({ id: j.id, name: j.name, createdAt: j.createdAt, status: j.status, step: j.step, pct: j.pct, slides: j.slides, degraded: !!j.degraded, message: j.message || '' });
