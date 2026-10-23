/* GET /api/jobs/<id> -> {job}. Refreshes progress from the runner; refunds the video if the job failed. */
import { json } from '../../_lib/auth.js';
import { countProVideo } from '../../_lib/stats.js';
import { ID_RE, requirePro, runnerError, runner, addUsage, addCredits, pubJob } from '../../_lib/jobs.js';

/* Give back the monthly video, or the purchased video, that this job was charged to. */
async function refund(env, uid, job) {
  if (!job.charged) return;
  const how = job.charged;
  job.charged = false;
  if (how === 'credit') await addCredits(env, uid, 1); else await addUsage(env, uid, -1, job.createdAt);
}

export async function onRequestGet({ request, env, params }) {
  const a = await requirePro(request, env); if (a.res) return a.res;
  const id = params.id;
  const job = ID_RE.test(id) ? await env.ACCOUNTS.get('job:' + id, 'json') : null;
  if (!job || job.uid !== a.uid) return json({ error: 'Not found.' }, 404);
  if (job.status === 'done' || job.status === 'failed' || job.status === 'expired') return json({ job: pubJob(job) });
  if (runnerError(env)) return json({ job: pubJob(job) });

  let r = null; try { r = await runner(env, '/jobs/' + id); } catch {}
  if (r && r.ok) {
    const s = await r.json();
    Object.assign(job, { status: s.status, step: s.step, pct: s.pct, slides: s.slides, degraded: !!s.degraded });
    if (s.status === 'done') await countProVideo(env, { slides: s.slides, seconds: s.seconds });   // once: done jobs return early above
    if (s.status === 'failed') { job.message = s.msg || 'We could not finish this video.'; await refund(env, a.uid, job); }
  } else if (r && r.status === 404) {          // the runner forgot it (restart or clean-up)
    job.status = 'failed'; job.message = 'This video was lost when the server restarted. It has not been counted.';
    await refund(env, a.uid, job);
  }
  await env.ACCOUNTS.put('job:' + id, JSON.stringify(job), { expirationTtl: 30 * 86400 });
  return json({ job: pubJob(job) });
}
