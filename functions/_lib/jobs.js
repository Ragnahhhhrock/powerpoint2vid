/* Video jobs (Pages Functions side). The heavy work runs on the studio runner (studio/server.mjs).
 * Bindings / secrets (Cloudflare Pages > Settings):
 *   ACCOUNTS (KV), SESSION_SECRET      as for accounts
 *   RUNNER_URL      base URL of the runner, e.g. https://runner.powerpoint2vid.com
 *   RUNNER_SECRET   shared secret the runner expects in x-p2v-secret
 *   MONTHLY_VIDEOS  (optional) videos per Pro subscriber per month, default 10
 *   ELEVENLABS_API_KEY (optional secret) narration voices; sent to the runner with each job. Without it, the local voice.
 * KV keys: job:<id> -> {id, uid, name, createdAt, status, step, pct, slides, degraded, charged}
 *          jobs:<uid> -> [id, ...] newest first (max 50)   usage:<uid>:<YYYY-MM> -> number */
import { json, sessionUid, getSub, isAdmin, configError } from './auth.js';

export const MAX_BYTES = 50 * 1048576;

/* Narrator voices offered in /studio (ElevenLabs premade voices). First one is the default. */
export const VOICES = [
  { id: 'JBFqnCBsd6RMkjVDRZzb', name: 'George', desc: 'British, warm and measured' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', desc: 'Australian, relaxed and friendly' },
  { id: 'XrExE9yKIg1WjnnlVkGX', name: 'Matilda', desc: 'American, warm and clear' },
  { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice', desc: 'British, confident and crisp' },
  { id: 'nPczCjzI2devNBz1zQrb', name: 'Brian', desc: 'American, deep and calm' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', desc: 'American, bright and upbeat' },
];
export const voiceId = (v) => (VOICES.find((x) => x.id === v) || VOICES[0]).id;
export const ID_RE = /^[0-9a-f]{24}$/;
export const monthKey = (uid, d = new Date()) => `usage:${uid}:${d.toISOString().slice(0, 7)}`;
export const allowance = (env) => Math.max(0, parseInt(env.MONTHLY_VIDEOS || '10', 10) || 10);

export function runnerError(env) {
  return env.RUNNER_URL && env.RUNNER_SECRET ? null : json({ error: 'Video creation is not switched on yet.' }, 503);
}
export const runner = (env, path, init = {}) =>
  fetch(env.RUNNER_URL.replace(/\/$/, '') + path, { ...init, headers: { ...(init.headers || {}), 'x-p2v-secret': env.RUNNER_SECRET } });

/* Pay-per-video credits: KV credits:<uid> -> number of purchased videos left (never expire);
 * KV paid:<uid> -> "1" once the account has bought a single video, so it keeps access to its finished videos. */
export const creditsKey = (uid) => `credits:${uid}`;
export async function credits(env, uid) {
  return Math.max(0, parseInt((await env.ACCOUNTS.get(creditsKey(uid))) || '0', 10) || 0);
}
export async function addCredits(env, uid, delta) {
  await env.ACCOUNTS.put(creditsKey(uid), String(Math.max(0, (await credits(env, uid)) + delta)));
}

/* Returns {uid} for a signed-in Pro subscriber or per-video buyer, or {res} with the error response to send. */
export async function requirePro(request, env) {
  const bad = configError(env); if (bad) return { res: bad };
  const uid = await sessionUid(request, env);
  if (!uid) return { res: json({ error: 'Log in to make a video.' }, 401) };
  const sub = await getSub(env, uid);
  if (!sub.active && !(await env.ACCOUNTS.get('paid:' + uid))) return { res: json({ error: 'Buy a video or get Pro to make videos.' }, 402) };
  return { uid };
}

export async function usage(env, uid) {
  if (await isAdmin(env, uid)) return { used: 0, limit: 9999, credits: 0, remaining: 9999 };
  const sub = await getSub(env, uid);
  const used = parseInt((await env.ACCOUNTS.get(monthKey(uid))) || '0', 10) || 0;
  const limit = sub.active ? allowance(env) : 0;
  const bought = await credits(env, uid);
  return { used, limit, credits: bought, remaining: Math.max(0, limit - used) + bought };
}
export async function addUsage(env, uid, delta, when) {
  const k = monthKey(uid, when ? new Date(when) : new Date());
  const v = Math.max(0, (parseInt((await env.ACCOUNTS.get(k)) || '0', 10) || 0) + delta);
  await env.ACCOUNTS.put(k, String(v), { expirationTtl: 100 * 86400 });
}
export const pubJob = (j) => ({ id: j.id, name: j.name, createdAt: j.createdAt, status: j.status, step: j.step, pct: j.pct, slides: j.slides, degraded: !!j.degraded, message: j.message || '' });
