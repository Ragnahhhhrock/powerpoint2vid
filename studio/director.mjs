#!/usr/bin/env node
/* PowerPoint2Vid director: runs the a.i. passes for a job.
 *
 *   story  : whole deck in -> brief + per-scene narration, storyboard, transition   (1 call)
 *   voice  : narration -> audio + beat timings                                       (studio/voice.py)
 *   scenes : storyboard + beats -> one animated scene file per slide                 (1 call per scene, parallel)
 *   render : draft render with review keyframes                                      (studio/render.mjs)
 *   review : keyframes + code -> pass, or a corrected scene; max 2 loops per scene   (1 call per scene per loop)
 *   final  : full-quality render
 *
 * Job folder before running: plan.json with { title, scenes: [{ slide: {title, text, notes, image} }] }
 * and assets/ (slide-<n>.png renders + extracted images). See studio/examples/explainer-v2/make-deck.py.
 *
 * Usage: ANTHROPIC_API_KEY=... node studio/director.mjs <job_dir> --voice <piper.onnx>
 *          [--from story|voice|scenes|review|final] [--only 0,3] [--dry-run]
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { mockStory, templateScene } from './fallback.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const job = path.resolve(args.find((a) => !a.startsWith('--')) || '.');
const opt = (k, d) => { const i = args.indexOf('--' + k); return i < 0 ? d : args[i + 1]; };
const DRY = args.includes('--dry-run');
const MOCK = args.includes('--mock') || (!process.env.ANTHROPIC_API_KEY && !DRY);   // no key: slides-only story + template scenes, so a job still finishes
const progress = (step, pct, msg = '') => { try { fs.writeFileSync(path.join(job, 'status.json'), JSON.stringify({ step, pct, msg, at: Date.now() })); } catch {} console.log(`[${pct}%] ${step} ${msg}`); };
const MODEL = process.env.P2V_MODEL || 'claude-opus-5-5';
const STEPS = ['story', 'voice', 'scenes', 'review', 'final'];
const FROM = STEPS.indexOf(opt('from', 'story'));
const ONLY = opt('only', null)?.split(',').map(Number);
const VOICE = opt('voice', process.env.P2V_VOICE);
const planPath = path.join(job, 'plan.json');
const readPlan = () => JSON.parse(fs.readFileSync(planPath, 'utf8'));
const savePlan = (p) => fs.writeFileSync(planPath, JSON.stringify(p, null, 2));
const prompt = (n) => {
  let t = fs.readFileSync(path.join(HERE, 'prompts', n + '.md'), 'utf8');
  if (n === 'scene') {   // one finished scene as a worked example of the contract and the quality bar
    const ex = path.join(HERE, 'examples', 'explainer-v2', 'scenes', 'scene-3.js');
    if (fs.existsSync(ex)) t += '\n\n## Worked example (a finished scene from another video)\n```js\n' + fs.readFileSync(ex, 'utf8') + '```\n';
  }
  return t;
};
const img = (file) => ({ type: 'image', source: { type: 'base64', media_type: file.endsWith('.png') ? 'image/png' : 'image/jpeg', data: fs.readFileSync(file).toString('base64') } });
const usage = { input: 0, output: 0, cache_read: 0, cache_write: 0 };

/* ---------- Anthropic Messages API ---------- */
async function claude({ system, content, schema, maxTokens = 16000, tag }) {
  const body = {
    model: MODEL, max_tokens: maxTokens,
    system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],   // shared prompt is cached across calls
    messages: [{ role: 'user', content }],
  };
  if (schema) body.output_config = { format: { type: 'json_schema', schema } };
  if (DRY) { console.log(`[dry-run] ${tag}: ${JSON.stringify(body).length} bytes`); return schema ? null : ''; }
  if (!process.env.ANTHROPIC_API_KEY) throw new Error('Set ANTHROPIC_API_KEY');
  for (let attempt = 1; ; attempt++) {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify(body),
    });
    if ((r.status === 429 || r.status >= 500) && attempt < 5) { await new Promise((s) => setTimeout(s, 2000 * attempt * attempt)); continue; }
    const j = await r.json();
    if (!r.ok) throw new Error(`${tag}: ${r.status} ${JSON.stringify(j.error || j)}`);
    const u = j.usage || {};
    usage.input += u.input_tokens || 0; usage.output += u.output_tokens || 0;
    usage.cache_read += u.cache_read_input_tokens || 0; usage.cache_write += u.cache_creation_input_tokens || 0;
    const text = j.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
    if (j.stop_reason === 'max_tokens') throw new Error(`${tag}: hit max_tokens`);
    return schema ? JSON.parse(text) : text;
  }
}
const pool = async (items, n, fn) => { const q = [...items]; await Promise.all(Array.from({ length: Math.min(n, q.length) }, async () => { while (q.length) await fn(q.shift()); })); };
const extractJs = (text) => { const m = text.match(/```(?:js|javascript)?\s*\n([\s\S]*?)```/); return (m ? m[1] : text).trim() + '\n'; };
const run = (cmd, a) => { const r = spawnSync(cmd, a, { stdio: 'inherit' }); if (r.status) throw new Error(`${cmd} ${a.join(' ')} failed`); };

/* ---------- 1. story ---------- */
const STORY_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['brief', 'scenes'],
  properties: {
    brief: { type: 'object', additionalProperties: false, required: ['palette', 'font', 'motion', 'story'], properties: {
      palette: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['name', 'hex'], properties: { name: { type: 'string' }, hex: { type: 'string' } } } }, font: { type: 'string' }, motion: { type: 'string' }, story: { type: 'string' } } },
    scenes: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['slide_index', 'narration', 'storyboard', 'min_duration'], properties: {
      slide_index: { type: 'integer' }, narration: { type: 'string' }, storyboard: { type: 'string' }, transition: { type: 'string' }, min_duration: { type: 'number' } } } },
  },
};
async function story() {
  const plan = readPlan(); const slides = plan.scenes.map((s) => s.slide);
  const content = [{ type: 'text', text: `Deck: ${plan.title || 'untitled'} (${slides.length} slides).` }];
  slides.forEach((s, i) => {
    content.push({ type: 'text', text: `\n## Slide ${i}\nTitle: ${s.title}\nText: ${s.text || '(none)'}\nSpeaker notes: ${s.notes || '(none)'}` });
    content.push(img(path.join(job, s.image)));
  });
  content.push({ type: 'text', text: plan.direction ? `\nCustomer direction: ${plan.direction}` : '\nPlan the video.' });
  let out;
  if (MOCK) out = mockStory(plan);
  else { try { out = await claude({ system: prompt('story'), content, schema: STORY_SCHEMA, tag: 'story' }); } catch (e) { console.warn('story failed, using slides-only story:', e.message); out = mockStory(plan); plan.degraded = true; } }
  if (!out) return;
  plan.brief = out.brief;
  // the schema returns the palette as [{name, hex}] (open-ended objects are not allowed in structured output); the rest of the pipeline wants {name: hex}
  if (Array.isArray(plan.brief.palette)) plan.brief.palette = Object.fromEntries(plan.brief.palette.map((c) => [c.name, c.hex]));
  plan.scenes = out.scenes.map((s, i) => ({
    file: `scenes/scene-${i}.js`, narration: s.narration, storyboard: s.storyboard, minDuration: s.min_duration,
    slide: slides[s.slide_index] || slides[i], ...(i && s.transition ? { transition: { type: s.transition, duration: s.transition === 'cut' ? 0 : 0.6 } } : {}),
  }));
  savePlan(plan);
  console.log(`story: ${plan.scenes.length} scenes`);
}

/* ---------- 3. scenes ---------- */
const sceneRequest = (plan, i, extra = []) => {
  const sc = plan.scenes[i];
  const assets = fs.readdirSync(path.join(job, 'assets'));
  return [
    { type: 'text', text: `Design brief:\n${JSON.stringify(plan.brief, null, 2)}\n\nWhole-video narration, for context:\n${plan.scenes.map((s, k) => `${k}. ${s.narration}`).join('\n')}` },
    { type: 'text', text: `\n# Scene ${i} of ${plan.scenes.length}\nDuration: ${sc.duration}s\nBeats: ${JSON.stringify(sc.beats)}\nStoryboard: ${sc.storyboard}\nTransition in: ${sc.transition?.type || 'none (first scene)'}; out: ${plan.scenes[i + 1]?.transition?.type || 'none (last scene)'}\nSource slide: ${JSON.stringify({ title: sc.slide.title, text: sc.slide.text })}\nAssets available: ${assets.join(', ')}\nThe source slide (${path.basename(sc.slide.image)}):` },
    img(path.join(job, sc.slide.image)),
    ...extra,
  ];
};
async function scenes() {
  const plan = readPlan(); fs.mkdirSync(path.join(job, 'scenes'), { recursive: true });
  const idx = ONLY || plan.scenes.map((_, i) => i);
  await pool(idx, 4, async (i) => {
    let code = null;
    if (!MOCK) { try { const text = await claude({ system: prompt('scene'), content: sceneRequest(plan, i), tag: `scene ${i}` }); if (text) code = extractJs(text); } catch (e) { console.warn(`scene ${i} failed, using template:`, e.message); plan.degraded = true; } }
    if (!DRY && !code) code = templateScene(plan.scenes[i].slide, i);
    if (code) fs.writeFileSync(path.join(job, plan.scenes[i].file), code);
    console.log(`scene ${i}: written${MOCK ? ' (template)' : ''}`);
  });
  if (plan.degraded) savePlan(plan);
}

/* ---------- 5. review loop ---------- */
const REVIEW_SCHEMA = { type: 'object', additionalProperties: false, required: ['pass', 'issues'], properties: { pass: { type: 'boolean' }, issues: { type: 'array', items: { type: 'string' } }, code: { type: 'string' } } };
async function review() {
  const plan = readPlan();
  let todo = ONLY || plan.scenes.map((_, i) => i);
  for (let loop = 1; loop <= 2 && todo.length; loop++) {
    run('node', [path.join(HERE, 'render.mjs'), job, '--draft', '--only', todo.join(',')]);
    const failed = [];
    await pool(todo, 4, async (i) => {
      const kdir = path.join(job, 'out', 'review', `scene-${i}`);
      const keys = fs.readdirSync(kdir).sort().map((f) => img(path.join(kdir, f)));
      const code = fs.readFileSync(path.join(job, plan.scenes[i].file), 'utf8');
      const content = sceneRequest(plan, i, [{ type: 'text', text: `\nKeyframes (start, after each beat, end):` }, ...keys, { type: 'text', text: `\nScene code:\n\`\`\`js\n${code}\`\`\`` }]);
      const r = await claude({ system: prompt('review') + '\n\n' + prompt('scene'), content, schema: REVIEW_SCHEMA, tag: `review ${i}.${loop}` });
      if (!r) return;
      console.log(`review scene ${i} (loop ${loop}): ${r.pass ? 'pass' : 'fix'}${r.issues.length ? ' - ' + r.issues.join('; ') : ''}`);
      if (!r.pass && r.code) {
        fs.copyFileSync(path.join(job, plan.scenes[i].file), path.join(job, plan.scenes[i].file + `.v${loop}.bak`));
        fs.writeFileSync(path.join(job, plan.scenes[i].file), extractJs(r.code.includes('```') ? r.code : '```js\n' + r.code + '\n```'));
        failed.push(i);
      }
    });
    todo = failed;
  }
}


/* ---------- pipeline ---------- */
const t0 = Date.now();
progress('story', 5, MOCK ? 'slides-only story' : 'a.i. is reading the deck');
if (FROM <= 0) await story();
progress('voice', 20, 'recording narration');
if (FROM <= 1 && !DRY) { if (!VOICE) throw new Error('--voice <piper .onnx> needed'); run('python3', [path.join(HERE, 'voice.py'), job, '--voice', VOICE]); }
progress('scenes', 35, 'designing scenes');
if (FROM <= 2) await scenes();
progress('review', 55, 'checking the draft');
if (FROM <= 3 && !DRY && !MOCK) await review();
progress('render', 75, 'rendering final video');
if (FROM <= 4 && !DRY) run('node', [path.join(HERE, 'render.mjs'), job]);
progress('done', 100, '');
// a.i. list prices per million tokens: input $4, output $20, cache read $0.20, 5-min cache write $5.
const cost = (usage.input * 4 + usage.output * 20 + usage.cache_read * 0.2 + usage.cache_write * 5) / 1e6;
console.log(`done in ${((Date.now() - t0) / 1000).toFixed(0)}s; tokens ${JSON.stringify(usage)}; est. Claude cost $${cost.toFixed(2)}`);
