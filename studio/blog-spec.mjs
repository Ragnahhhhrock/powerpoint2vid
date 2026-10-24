#!/usr/bin/env node
/* Turn a blog post into the plain input deck for its explainer video.
 *
 * Usage: ANTHROPIC_API_KEY=... node studio/blog-spec.mjs <slug>
 * Reads  content/blog/<slug>.md and content/blog/PRODUCT_CLAIMS.md
 * Writes studio/blog/<slug>/spec.json  (same format as studio/examples/*\/spec.json; build_deck.py makes the deck from it)
 *
 * The deck is deliberately ordinary: a plain slide per idea, speaker notes as the narration. The director
 * (studio/director.mjs) then does the story, scene design and review passes, exactly as it does for a customer's deck.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2];
if (!slug) { console.error('usage: node studio/blog-spec.mjs <slug>'); process.exit(1); }
if (!process.env.ANTHROPIC_API_KEY) { console.error('Set ANTHROPIC_API_KEY'); process.exit(1); }
const MODEL = process.env.P2V_MODEL || 'claude-opus-5-5';
const post = fs.readFileSync(path.join(ROOT, 'content/blog', slug + '.md'), 'utf8');
const claims = fs.readFileSync(path.join(ROOT, 'content/blog/PRODUCT_CLAIMS.md'), 'utf8');
const title = (post.match(/^title:\s*(.+)$/m) || [])[1]?.trim();

const SYSTEM = `You turn one PowerPoint2Vid blog post into the plain slide deck for a short video summary of that post (45 to 75 seconds when narrated).

Write the deck a competent presenter would make from the post: 5 or 6 slides, one idea per slide, in the post's own order. Use the post's own examples, numbers and wording (a before/after rewrite, a checklist, a sample headline). Never invent statistics, studies, quotes or product features.

Per slide:
- title: a short headline that states the point (max 8 words). The first slide is the video's title slide (cover: true).
- bullets: 0 to 4 short phrases taken from the post. Plain, like an ordinary deck.
- notes: the narration. Spoken English, 1 to 3 short sentences, 14 to 30 words, written for the ear (no "this slide shows", no bullet-reading). Australian spelling. The first slide hooks; the last slide ties the topic to turning slides into video and says the URL powerpoint2vid.com.
- minDuration: seconds the slide needs, 8 to 12.

The last slide's product line must follow these rules exactly (they come from the product claims file):

${claims}

Hard rules for every word you write: never the letters "free" (not "free", "freedom", "carefree", "hands-free"), never "costs nothing". No privacy, security, on-device or upload claims. Never name Claude, Opus or any model or vendor; say "a.i." where needed. Describe a.i. direction as a Pro feature only.`;

const SCHEMA = {
  type: 'object', additionalProperties: false, required: ['slides'],
  properties: { slides: { type: 'array', minItems: 5, maxItems: 6, items: { type: 'object', additionalProperties: false, required: ['title', 'bullets', 'notes', 'minDuration'],
    properties: { title: { type: 'string' }, bullets: { type: 'array', items: { type: 'string' }, maxItems: 4 }, notes: { type: 'string' }, minDuration: { type: 'number' } } } } },
};

let out;
for (let attempt = 1; ; attempt++) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: MODEL, max_tokens: 6000, system: SYSTEM, messages: [{ role: 'user', content: 'Blog post:\n\n' + post }], output_config: { format: { type: 'json_schema', schema: SCHEMA } } }),
  });
  if ((r.status === 429 || r.status >= 500) && attempt < 5) { await new Promise((s) => setTimeout(s, 2000 * attempt * attempt)); continue; }
  const j = await r.json();
  if (!r.ok) { console.error(JSON.stringify(j.error || j)); process.exit(1); }
  out = JSON.parse(j.content.filter((b) => b.type === 'text').map((b) => b.text).join(''));
  break;
}

const slides = out.slides.map((s, i) => ({ ...(i === 0 ? { cover: true } : {}), ...s, ...(i ? { transition: { type: ['smoothleft', 'circleopen', 'fadeblack', 'smoothright', 'fade'][(i - 1) % 5], duration: 0.6 } } : {}) }));
// guard rails: house rules apply to the script before anything is rendered
const BANNED = /free|costs? nothing|on-device|no upload|never leaves|\bprivate\b|\bsecure\b|claude|opus|anthropic|elevenlabs/i;
const text = slides.map((s) => [s.title, ...s.bullets, s.notes].join(' ')).join(' ');
const bad = text.match(BANNED);
if (bad) { console.error(`blog-spec: banned wording in generated script: "${bad[0]}"`); process.exit(2); }
const words = slides.reduce((n, s) => n + s.notes.split(/\s+/).length, 0);
if (words < 90 || words > 230) { console.error(`blog-spec: narration is ${words} words, expected 90 to 230`); process.exit(2); }

const spec = { title: `${title || slug} (blog explainer)`, brief: { font: 'Inter', palette: { ink: '#0e1330', night: '#0a0d24', violet: '#6d4aff', lilac: '#8f75ff', coral: '#ff6b4a', paper: '#f6f4ff', muted: '#aab0d4', mint: '#5eead4' }, motion: 'Confident editorial motion graphics.', story: 'A clear explainer of the post.' }, slides };
const dir = path.join(ROOT, 'studio/blog', slug); fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'spec.json'), JSON.stringify(spec, null, 2));
console.log(`spec: ${slides.length} slides, ${words} narration words -> studio/blog/${slug}/spec.json`);
