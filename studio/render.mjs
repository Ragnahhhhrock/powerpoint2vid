#!/usr/bin/env node
/* PowerPoint2Vid studio renderer.
 *
 * Renders a job's scenes frame by frame in headless Chromium (deterministic: every frame is
 * __seek(t) on a paused timeline), encodes each scene, joins them with transitions, mixes the
 * narration, writes captions, a poster and review contact sheets.
 *
 * Usage: node studio/render.mjs <job_dir> [--only 0,2] [--fps 30] [--parallel 3] [--draft]
 *   --only      re-render just these scenes (others reuse existing segments)
 *   --draft     960x540 at 15fps, for quick looks
 * Output: <job>/out/video.mp4, video.webm, captions.vtt, poster.jpg, review/scene-<i>.jpg
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const jobDir = path.resolve(args.find((a) => !a.startsWith('--')) || '.');
const opt = (k, d) => { const i = args.indexOf('--' + k); return i < 0 ? d : args[i + 1]; };
const DRAFT = args.includes('--draft');
const FPS = +opt('fps', DRAFT ? 15 : 30);
const PAR = +opt('parallel', 3);
const ONLY = opt('only', null)?.split(',').map(Number);
const SCALE = DRAFT ? 0.5 : 1;
const plan = JSON.parse(fs.readFileSync(path.join(jobDir, 'plan.json'), 'utf8'));
const out = path.join(jobDir, 'out'); const segDir = path.join(out, 'segments'); const revDir = path.join(out, 'review');
[out, segDir, revDir].forEach((d) => fs.mkdirSync(d, { recursive: true }));

/* ---------- static server: /runtime -> studio/runtime, /job -> job dir. Nothing else is reachable. ---------- */
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.wav': 'audio/wav' };
const server = http.createServer((req, res) => {
  const u = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const [, top, ...rest] = u.split('/');
  const base = top === 'runtime' ? path.join(HERE, 'runtime') : top === 'job' ? jobDir : null;
  const file = base && path.resolve(base, rest.join('/'));
  if (!file || !file.startsWith(base) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const ORIGIN = 'http://127.0.0.1:' + server.address().port;

const run = (cmd, a, input) => new Promise((res, rej) => {
  const p = spawn(cmd, a, { stdio: [input ? 'pipe' : 'ignore', 'ignore', 'pipe'] });
  let err = ''; p.stderr.on('data', (d) => (err += d));
  p.on('close', (c) => (c ? rej(new Error(cmd + ' failed: ' + err.slice(-800))) : res()));
  if (input) input(p.stdin);
});

/* ---------- render one scene to an mp4 segment ---------- */
async function renderScene(browser, i) {
  const sc = plan.scenes[i];
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: SCALE });
  // Sandbox: generated code may only reach our local server.
  await ctx.route('**/*', (r) => (r.request().url().startsWith(ORIGIN) ? r.continue() : r.abort()));
  const page = await ctx.newPage();
  const logs = []; page.on('console', (m) => m.type() === 'error' && logs.push(m.text()));
  await page.goto(`${ORIGIN}/runtime/scene.html?job=/job&i=${i}`);
  await page.waitForFunction(() => window.__ready || window.__error, null, { timeout: 30000 });
  const err = await page.evaluate(() => window.__error);
  if (err) throw new Error(`scene ${i} (${sc.file}): ${err}`);

  const frames = Math.round(sc.duration * FPS);
  const seg = path.join(segDir, `scene-${i}.mp4`);
  const t0 = Date.now();
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', DRAFT ? 'veryfast' : 'medium', '-crf', DRAFT ? '26' : '17', '-pix_fmt', 'yuv420p', '-r', String(FPS), seg],
  async (stdin) => {
    for (let f = 0; f < frames; f++) {
      await page.evaluate((t) => window.__seek(t), f / FPS);
      const buf = await page.screenshot({ type: 'jpeg', quality: DRAFT ? 80 : 95 });
      if (!stdin.write(buf)) await new Promise((r) => stdin.once('drain', r));
    }
    stdin.end();
  });

  // review keyframes: start, just after each beat, end
  const times = [0.15, ...sc.beats.map((b) => Math.min(sc.duration - 0.1, b.t + 1.2)), sc.duration - 0.25];
  const kdir = path.join(revDir, `scene-${i}`); fs.mkdirSync(kdir, { recursive: true });
  for (const [k, t] of times.entries()) {
    await page.evaluate((x) => window.__seek(x), t);
    await page.screenshot({ path: path.join(kdir, `k${String(k).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 80 });
  }
  if (logs.length) console.warn(`scene ${i} console errors:`, logs.slice(0, 5));
  console.log(`scene ${i}: ${frames} frames in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  await ctx.close();
}

const preinstalled = fs.existsSync('/opt/pw-browsers') && fs.readdirSync('/opt/pw-browsers').filter((d) => /^chromium-\d+$/.test(d)).map((d) => `/opt/pw-browsers/${d}/chrome-linux/chrome`).find((f) => fs.existsSync(f));
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || preinstalled || undefined, args: ['--font-render-hinting=none', '--disable-lcd-text'] });
const todo = ONLY || plan.scenes.map((_, i) => i);
const queue = [...todo];
await Promise.all(Array.from({ length: Math.min(PAR, queue.length) }, async () => {
  while (queue.length) await renderScene(browser, queue.shift());
}));
await browser.close(); server.close();
const missing = plan.scenes.map((_, i) => i).filter((i) => !fs.existsSync(path.join(segDir, `scene-${i}.mp4`)));
if (missing.length) { console.log(`rendered ${todo.join(',')}; skipping assembly (no segments yet for ${missing.join(',')})`); process.exit(0); }

/* ---------- join scenes with transitions + mix narration ---------- */
const S = plan.scenes;
const X = S.map((s, i) => (i && s.transition?.type !== 'cut' ? Math.min(s.transition?.duration ?? 0.6, 1.2) : 0)); // overlap into scene i
const starts = []; S.forEach((s, i) => starts.push(i ? starts[i - 1] + S[i - 1].duration - X[i] : 0));
const total = starts.at(-1) + S.at(-1).duration;

const inputs = []; S.forEach((_, i) => inputs.push('-i', path.join(segDir, `scene-${i}.mp4`)));
S.forEach((s) => inputs.push('-i', path.join(jobDir, s.audio)));
let vf = '', last = '[0:v]';
for (let i = 1; i < S.length; i++) {
  const type = S[i].transition?.type || 'fade';
  const label = i === S.length - 1 ? '[vout]' : `[v${i}]`;
  if (type === 'cut') vf += `${last}[${i}:v]concat=n=2:v=1:a=0${label};`;
  else vf += `${last}[${i}:v]xfade=transition=${type}:duration=${X[i]}:offset=${(starts[i]).toFixed(3)}${label};`;
  last = label;
}
if (S.length === 1) vf += '[0:v]null[vout];';
const n = S.length;
let af = S.map((s, i) => `[${n + i}:a]adelay=${Math.round(starts[i] * 1000)}:all=1[a${i}];`).join('');
af += S.map((_, i) => `[a${i}]`).join('') + `amix=inputs=${n}:normalize=0:duration=longest,apad,atrim=0:${total.toFixed(3)},loudnorm=I=-16:TP=-1.5:LRA=11[aout]`;

const mp4 = path.join(out, 'video.mp4');
await run('ffmpeg', ['-y', '-loglevel', 'error', ...inputs, '-filter_complex', vf + af, '-map', '[vout]', '-map', '[aout]',
  '-c:v', 'libx264', '-preset', DRAFT ? 'veryfast' : 'slow', '-crf', DRAFT ? '26' : '19', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
  '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', mp4]);
if (!DRAFT) {
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', mp4, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '34', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '4', '-c:a', 'libopus', '-b:a', '96k', path.join(out, 'video.webm')]);
}
const posterT = plan.poster != null ? plan.poster : Math.min(total - 0.1, starts[0] + S[0].duration * 0.75);
await run('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(posterT), '-i', mp4, '-frames:v', '1', '-q:v', '3', path.join(out, 'poster.jpg')]);

/* ---------- captions ---------- */
const ts = (t) => { const h = Math.floor(t / 3600), m = Math.floor(t / 60) % 60, s = (t % 60).toFixed(3).padStart(6, '0'); return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${s}`; };
let vtt = 'WEBVTT\n\n', k = 1;
S.forEach((s, i) => s.beats.forEach((b, j) => {
  const a = starts[i] + b.t, e = starts[i] + (s.beats[j + 1] ? s.beats[j + 1].t - 0.05 : (s.speechEnd || s.duration) + 0.3);
  vtt += `${k++}\n${ts(a)} --> ${ts(e)}\n${b.text}\n\n`;
}));
fs.writeFileSync(path.join(out, 'captions.vtt'), vtt);
console.log(`done: ${mp4} (${total.toFixed(1)}s)`);
