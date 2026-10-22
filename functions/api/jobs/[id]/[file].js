/* GET /api/jobs/<id>/<video.mp4|video.webm|captions.vtt|poster.jpg>[?download=1] -> the file, streamed from the runner. */
import { json } from '../../../_lib/auth.js';
import { ID_RE, requirePro, runnerError, runner } from '../../../_lib/jobs.js';

const FILES = { 'video.mp4': 'video/mp4', 'video.webm': 'video/webm', 'captions.vtt': 'text/vtt', 'poster.jpg': 'image/jpeg' };

export async function onRequestGet({ request, env, params }) {
  const a = await requirePro(request, env); if (a.res) return a.res;
  const off = runnerError(env); if (off) return off;
  const { id, file } = params;
  if (!ID_RE.test(id) || !FILES[file]) return json({ error: 'Not found.' }, 404);
  const job = await env.ACCOUNTS.get('job:' + id, 'json');
  if (!job || job.uid !== a.uid || job.status !== 'done') return json({ error: 'Not found.' }, 404);
  let r = null; try { r = await runner(env, `/jobs/${id}/${file}`, { headers: request.headers.get('range') ? { range: request.headers.get('range') } : {} }); } catch {}
  if (!r || !r.ok) {
    if (r && r.status === 404) { job.status = 'expired'; await env.ACCOUNTS.put('job:' + id, JSON.stringify(job)); return json({ error: 'This video has expired. Videos are kept for a few hours: download yours soon after it finishes.' }, 410); }
    return json({ error: 'Could not fetch the file. Try again.' }, 502);
  }
  const h = new Headers({ 'content-type': FILES[file], 'cache-control': 'private, no-store' });
  if (r.headers.get('content-length')) h.set('content-length', r.headers.get('content-length'));
  if (new URL(request.url).searchParams.has('download')) h.set('content-disposition', `attachment; filename="${job.name.replace(/[^\w .-]/g, '_')}.${file.split('.').pop()}"`);
  h.set('accept-ranges', 'bytes'); if (r.headers.get('content-range')) h.set('content-range', r.headers.get('content-range'));
  return new Response(r.body, { status: r.status === 206 ? 206 : 200, headers: h });
}
