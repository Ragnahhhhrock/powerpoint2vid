#!/usr/bin/env node
/* PowerPoint2Vid job runner: a small HTTP service that turns a deck into a video.
 * Runs in a container (see Dockerfile). Storage-agnostic: the caller sends the deck and fetches the outputs.
 *
 *   PUT  /jobs/<id>             body = .pptx bytes; headers: x-direction (optional), x-voice (optional ElevenLabs voice id),
 *                               x-tts-key (optional ElevenLabs key, used when the runner has no ELEVENLABS_API_KEY of its own),
 *                               x-callback-url + x-callback-token (optional: POSTed {id,status,step,pct} on change)
 *   GET  /jobs/<id>             -> {status:'queued'|'running'|'done'|'failed', step, pct, msg, degraded, slides}
 *   GET  /jobs/<id>/<file>      file in {video.mp4, video.webm, captions.vtt, poster.jpg}
 *   DELETE /jobs/<id>
 *   GET  /health
 * Every request except /health needs header  x-p2v-secret: $RUNNER_SECRET.
 * Env: RUNNER_SECRET (required), PORT=8080, DATA_DIR=/data, ANTHROPIC_API_KEY (optional: without it jobs use the
 * slides-only fallback), ELEVENLABS_API_KEY / ELEVENLABS_MODEL (optional: narration voice; without a key, Piper),
 * P2V_VOICE=/voices/en_US-lessac-medium.onnx (Piper fallback voice), P2V_CONCURRENCY=1, MAX_DECK_MB=50, JOB_TTL_HOURS=6.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SECRET = process.env.RUNNER_SECRET; if (!SECRET) { console.error('RUNNER_SECRET is required'); process.exit(1); }
const PORT = +(process.env.PORT || 8080), DATA = process.env.DATA_DIR || '/data', CONC = +(process.env.P2V_CONCURRENCY || 1);
const MAX = (+(process.env.MAX_DECK_MB || 50)) * 1048576, TTL = (+(process.env.JOB_TTL_HOURS || 6)) * 3600e3;
const VOICE = process.env.P2V_VOICE || '/voices/en_US-lessac-medium.onnx';
const FILES = new Set(['video.mp4', 'video.webm', 'captions.vtt', 'poster.jpg']);
const TYPES = { '.mp4': 'video/mp4', '.webm': 'video/webm', '.vtt': 'text/vtt', '.jpg': 'image/jpeg' };
fs.mkdirSync(path.join(DATA, 'jobs'), { recursive: true });

const jobs = new Map();      // id -> {status, step, pct, msg, degraded, slides, cb, token}
const queue = []; let active = 0;
const dir = (id) => path.join(DATA, 'jobs', id);
const validId = (id) => /^[A-Za-z0-9_-]{6,64}$/.test(id || '');

function set(id, patch) {
  const j = Object.assign(jobs.get(id) || {}, patch); jobs.set(id, j);
  if (j.cb) fetch(j.cb, { method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer ' + j.token }, body: JSON.stringify({ id, status: j.status, step: j.step, pct: j.pct, msg: j.msg, degraded: !!j.degraded, slides: j.slides }) }).catch(() => {});
}
const exec = (cmd, args, onLine, env) => new Promise((res, rej) => {
  const p = spawn(cmd, args, { env: { ...process.env, ...(env || {}) } }); let tail = '';
  const feed = (d) => { const s = d.toString(); tail = (tail + s).slice(-1500); s.split('\n').forEach((l) => onLine && l && onLine(l)); };
  p.stdout.on('data', feed); p.stderr.on('data', feed);
  p.on('close', (c) => (c ? rej(new Error(`${cmd} exited ${c}: ${tail.slice(-400)}`)) : res()));
});

async function work(id) {
  const d = dir(id), j = jobs.get(id);
  try {
    set(id, { status: 'running', step: 'ingest', pct: 2, msg: 'reading your deck' });
    await exec('python3', [path.join(HERE, 'ingest.py'), path.join(d, 'deck.pptx'), d]);
    const plan = JSON.parse(fs.readFileSync(path.join(d, 'plan.json'), 'utf8'));
    if (j.direction) { plan.direction = j.direction.slice(0, 1000); fs.writeFileSync(path.join(d, 'plan.json'), JSON.stringify(plan)); }
    set(id, { slides: plan.scenes.length });
    const tts = {};
    if (j.voice) tts.P2V_TTS_VOICE = j.voice;
    if (!process.env.ELEVENLABS_API_KEY && j.ttsKey) tts.ELEVENLABS_API_KEY = j.ttsKey;
    await exec('node', [path.join(HERE, 'director.mjs'), d, '--voice', VOICE], (l) => {
      const m = l.match(/^\[(\d+)%\] (\w+) ?(.*)$/); if (m) set(id, { step: m[2], pct: +m[1], msg: m[3] });
    }, tts);
    delete j.ttsKey;
    const after = JSON.parse(fs.readFileSync(path.join(d, 'plan.json'), 'utf8'));
    if (!fs.existsSync(path.join(d, 'out', 'video.mp4'))) throw new Error('no video produced');
    set(id, { status: 'done', step: 'done', pct: 100, msg: '', degraded: !!after.degraded });
  } catch (e) {
    console.error(id, e.message);
    delete j.ttsKey;
    set(id, { status: 'failed', msg: e.message.includes('slides') ? e.message.slice(0, 200) : 'We could not finish this video.' });
  }
}
function pump() {
  while (active < CONC && queue.length) { const id = queue.shift(); active++; work(id).finally(() => { active--; pump(); }); }
}

setInterval(() => {            // sweep old jobs
  for (const f of fs.readdirSync(path.join(DATA, 'jobs'))) {
    const p = path.join(DATA, 'jobs', f);
    try { if (Date.now() - fs.statSync(p).mtimeMs > TTL && !queue.includes(f) && jobs.get(f)?.status !== 'running') { fs.rmSync(p, { recursive: true, force: true }); jobs.delete(f); } } catch {}
  }
}, 600e3).unref();

const send = (res, code, obj) => { res.writeHead(code, { 'content-type': 'application/json' }); res.end(JSON.stringify(obj)); };
http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x'); const [, root, id, file] = u.pathname.split('/');
  if (u.pathname === '/health') return send(res, 200, { ok: true, queued: queue.length, active });
  if (req.headers['x-p2v-secret'] !== SECRET) return send(res, 401, { error: 'unauthorised' });
  if (root !== 'jobs' || !validId(id)) return send(res, 404, { error: 'not found' });

  if (req.method === 'PUT' && !file) {
    if (jobs.has(id)) return send(res, 409, { error: 'exists' });
    if (+req.headers['content-length'] > MAX) { res.writeHead(413).end(); return req.destroy(); }
    fs.mkdirSync(dir(id), { recursive: true });
    const out = fs.createWriteStream(path.join(dir(id), 'deck.pptx')); let n = 0, over = false;
    req.on('data', (c) => { n += c.length; if (n > MAX && !over) { over = true; out.destroy(); req.destroy(); fs.rmSync(dir(id), { recursive: true, force: true }); } });
    req.pipe(out);
    out.on('finish', () => {
      if (over) return;
      jobs.set(id, { status: 'queued', step: 'queued', pct: 0, msg: '', direction: req.headers['x-direction'], voice: /^[A-Za-z0-9]{10,40}$/.test(req.headers['x-voice'] || '') ? req.headers['x-voice'] : undefined, ttsKey: req.headers['x-tts-key'] || undefined, cb: req.headers['x-callback-url'], token: req.headers['x-callback-token'] });
      queue.push(id); pump(); send(res, 202, { id, status: 'queued', position: queue.length });
    });
    return;
  }
  if (req.method === 'GET' && !file) {
    const j = jobs.get(id); if (!j) return send(res, 404, { error: 'not found' });
    const { cb, token, direction, voice, ttsKey, ...pub } = j; return send(res, 200, pub);
  }
  if (req.method === 'GET' && FILES.has(file)) {
    const p = path.join(dir(id), 'out', file); if (!fs.existsSync(p)) return send(res, 404, { error: 'not ready' });
    const st = fs.statSync(p), type = TYPES[path.extname(file)], m = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
    if (m && (m[1] || m[2])) {   // range requests, so browsers can seek
      let a = m[1] ? +m[1] : st.size - +m[2], b = m[1] && m[2] ? Math.min(+m[2], st.size - 1) : st.size - 1;
      if (a > b || a >= st.size) { res.writeHead(416, { 'content-range': `bytes */${st.size}` }); return res.end(); }
      res.writeHead(206, { 'content-type': type, 'accept-ranges': 'bytes', 'content-range': `bytes ${a}-${b}/${st.size}`, 'content-length': b - a + 1 });
      return fs.createReadStream(p, { start: a, end: b }).pipe(res);
    }
    res.writeHead(200, { 'content-type': type, 'accept-ranges': 'bytes', 'content-length': st.size });
    return fs.createReadStream(p).pipe(res);
  }
  if (req.method === 'DELETE' && !file) { jobs.delete(id); fs.rmSync(dir(id), { recursive: true, force: true }); return send(res, 200, { ok: true }); }
  send(res, 404, { error: 'not found' });
}).listen(PORT, () => console.log(`runner on :${PORT}`));
