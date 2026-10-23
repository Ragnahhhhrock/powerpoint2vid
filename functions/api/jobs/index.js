/* POST /api/jobs   body = the .pptx file (Content-Type: application/octet-stream), header x-filename, optional x-direction, x-voice
 *                  -> 202 {job, usage}      GET /api/jobs -> {jobs, usage}
 * Pro only; counts one video against the monthly allowance (refunded if the job fails). */
import { json, newId } from '../../_lib/auth.js';
import { MAX_BYTES, requirePro, runnerError, runner, usage, addUsage, addCredits, pubJob, voiceId, VOICES } from '../../_lib/jobs.js';

export async function onRequestGet({ request, env }) {
  const a = await requirePro(request, env); if (a.res) return a.res;
  const ids = (await env.ACCOUNTS.get('jobs:' + a.uid, 'json')) || [];
  const jobs = (await Promise.all(ids.slice(0, 20).map((id) => env.ACCOUNTS.get('job:' + id, 'json')))).filter(Boolean).map(pubJob);
  return json({ jobs, usage: await usage(env, a.uid), voices: env.ELEVENLABS_API_KEY ? VOICES : [] });
}

export async function onRequestPost({ request, env }) {
  const a = await requirePro(request, env); if (a.res) return a.res;
  const off = runnerError(env); if (off) return off;
  const len = +request.headers.get('content-length') || 0;
  if (!len) return json({ error: 'Choose a .pptx file.' }, 400);
  if (len > MAX_BYTES) return json({ error: 'That file is over 50 MB. Compress its images and try again.' }, 413);
  const u = await usage(env, a.uid);
  if (!u.remaining) return json({ error: u.limit ? `You have used all ${u.limit} videos for this month. Buy another video on the pricing page.` : 'You have no videos left. Buy another on the pricing page.', usage: u }, 429);
  const useMonthly = u.limit - u.used > 0;   // monthly allowance first, then purchased videos

  const body = await request.arrayBuffer();
  if (body.byteLength > MAX_BYTES) return json({ error: 'That file is over 50 MB.' }, 413);
  const b = new Uint8Array(body, 0, 4);
  if (!(b[0] === 0x50 && b[1] === 0x4b)) return json({ error: 'That does not look like a .pptx file. In Google Slides, use File > Download > Microsoft PowerPoint.' }, 400);

  const id = newId();
  const name = decodeURIComponent(request.headers.get('x-filename') || 'Presentation').replace(/\.pptx$/i, '').slice(0, 80) || 'Presentation';
  const headers = { 'content-type': 'application/octet-stream' };
  const dir = (request.headers.get('x-direction') || '').trim().slice(0, 500);
  if (dir) headers['x-direction'] = dir.replace(/[\r\n]+/g, ' ');
  if (env.ELEVENLABS_API_KEY) {
    headers['x-voice'] = voiceId(request.headers.get('x-voice'));
    headers['x-tts-key'] = env.ELEVENLABS_API_KEY.trim();
  }
  let r;
  try { r = await runner(env, '/jobs/' + id, { method: 'PUT', body, headers }); } catch { r = null; }
  if (!r || r.status !== 202) return json({ error: 'We could not start your video. Please try again in a minute.' }, 502);

  const job = { id, uid: a.uid, name, createdAt: Date.now(), status: 'queued', step: 'queued', pct: 0, charged: useMonthly ? true : 'credit' };
  await env.ACCOUNTS.put('job:' + id, JSON.stringify(job), { expirationTtl: 30 * 86400 });
  const ids = ((await env.ACCOUNTS.get('jobs:' + a.uid, 'json')) || []);
  await env.ACCOUNTS.put('jobs:' + a.uid, JSON.stringify([id, ...ids].slice(0, 50)));
  if (useMonthly) await addUsage(env, a.uid, 1); else await addCredits(env, a.uid, -1);
  return json({ job: pubJob(job), usage: await usage(env, a.uid) }, 202);
}
