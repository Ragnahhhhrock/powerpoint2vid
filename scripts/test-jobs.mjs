/* Run: node scripts/test-jobs.mjs  -- job API against in-memory KV and a fake runner. */
import assert from 'node:assert/strict';
import * as signup from '../functions/api/signup.js';
import * as list from '../functions/api/jobs/index.js';
import * as one from '../functions/api/jobs/[id].js';
import * as file from '../functions/api/jobs/[id]/[file].js';

const store = new Map();
const ACCOUNTS = { async get(k, t) { const v = store.get(k); return v === undefined ? null : t === 'json' ? JSON.parse(v) : v; }, async put(k, v) { store.set(k, v); } };
const env = { ACCOUNTS, SESSION_SECRET: 'test-secret-test-secret', RUNNER_URL: 'https://runner.test', RUNNER_SECRET: 'rs', MONTHLY_VIDEOS: '2' };
const O = 'https://powerpoint2vid.com'; let n = 0; const ok = (m) => console.log('ok', ++n, m);

// fake runner
const runnerJobs = new Map(); let runnerDown = false;
globalThis.fetch = async (url, init = {}) => {
  if (runnerDown) throw new Error('down');
  const u = new URL(url); assert.equal(u.origin, 'https://runner.test'); assert.equal(init.headers['x-p2v-secret'], 'rs');
  const [, , id, f] = u.pathname.split('/');
  if (init.method === 'PUT') { runnerJobs.set(id, { status: 'queued', step: 'queued', pct: 0 }); return new Response('{}', { status: 202 }); }
  if (!runnerJobs.has(id)) return new Response('{}', { status: 404 });
  if (f) return new Response('VIDEO', { status: 200, headers: { 'content-length': '5' } });
  return new Response(JSON.stringify(runnerJobs.get(id)), { status: 200 });
};

const pptx = () => { const b = new Uint8Array(100); b[0] = 0x50; b[1] = 0x4b; return b; };
const req = (path, o = {}, cookie) => new Request(O + path, { ...o, headers: { ...(o.headers || {}), ...(cookie ? { Cookie: cookie } : {}) } });
const up = (cookie, body = pptx(), h = {}) => req('/api/jobs', { method: 'POST', body, headers: { 'content-length': String(body.length ?? body.byteLength), 'x-filename': 'My%20deck.pptx', ...h } }, cookie);

let r = await signup.onRequestPost({ request: new Request(O + '/api/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'a@b.co', password: 'correct horse' }) }), env });
const cookie = (r.headers.get('Set-Cookie') || '').split(';')[0]; const uid = cookie.split('=')[1].split('.')[0];

r = await list.onRequestPost({ request: up(null), env }); assert.equal(r.status, 401); ok('signed out rejected');
r = await list.onRequestPost({ request: up(cookie), env }); assert.equal(r.status, 402); ok('non-Pro rejected');
store.set('sub:' + uid, JSON.stringify({ active: true, plan: 'monthly' }));
r = await list.onRequestPost({ request: up(cookie, new Uint8Array(100)), env }); assert.equal(r.status, 400); ok('non-pptx rejected');
r = await list.onRequestPost({ request: up(cookie, pptx(), { 'content-length': String(60 * 1048576) }), env }); assert.equal(r.status, 413); ok('oversize rejected');

r = await list.onRequestPost({ request: up(cookie), env }); assert.equal(r.status, 202);
let j = await r.json(); assert.equal(j.job.name, 'My deck'); assert.equal(j.usage.used, 1); const id = j.job.id; ok('upload accepted, charged');
r = await one.onRequestGet({ request: req('/api/jobs/' + id, {}, cookie), env, params: { id } }); assert.equal((await r.json()).job.status, 'queued'); ok('status queued');
r = await file.onRequestGet({ request: req(`/api/jobs/${id}/video.mp4`, {}, cookie), env, params: { id, file: 'video.mp4' } }); assert.equal(r.status, 404); ok('file hidden until done');

runnerJobs.set(id, { status: 'done', step: 'done', pct: 100, slides: 5, degraded: false });
r = await one.onRequestGet({ request: req('/api/jobs/' + id, {}, cookie), env, params: { id } }); j = await r.json(); assert.equal(j.job.status, 'done'); assert.equal(j.job.slides, 5); ok('status done');
r = await file.onRequestGet({ request: req(`/api/jobs/${id}/video.mp4?download=1`, {}, cookie), env, params: { id, file: 'video.mp4' } });
assert.equal(r.status, 200); assert.equal(await r.text(), 'VIDEO'); assert.match(r.headers.get('content-disposition'), /My deck\.mp4/); ok('download');
r = await file.onRequestGet({ request: req(`/api/jobs/${id}/../x`, {}, cookie), env, params: { id, file: 'deck.pptx' } }); assert.equal(r.status, 404); ok('only whitelisted files');

// second user cannot see it
r = await signup.onRequestPost({ request: new Request(O + '/api/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'c@d.co', password: 'correct horse' }) }), env });
const c2 = (r.headers.get('Set-Cookie') || '').split(';')[0]; store.set('sub:' + c2.split('=')[1].split('.')[0], JSON.stringify({ active: true }));
r = await one.onRequestGet({ request: req('/api/jobs/' + id, {}, c2), env, params: { id } }); assert.equal(r.status, 404); ok("other user can't read my job");

// failure refunds
r = await list.onRequestPost({ request: up(cookie), env }); const id2 = (await r.json()).job.id;
r = await list.onRequestGet({ request: req('/api/jobs', {}, cookie), env }); assert.equal((await r.json()).usage.used, 2); ok('usage counts 2');
r = await list.onRequestPost({ request: up(cookie), env }); assert.equal(r.status, 429); ok('allowance enforced');
runnerJobs.set(id2, { status: 'failed', msg: 'We could not finish this video.' });
r = await one.onRequestGet({ request: req('/api/jobs/' + id2, {}, cookie), env, params: { id: id2 } }); assert.equal((await r.json()).job.status, 'failed');
r = await list.onRequestGet({ request: req('/api/jobs', {}, cookie), env }); j = await r.json(); assert.equal(j.usage.used, 1); assert.equal(j.jobs.length, 2); ok('failed job refunded, listed');
r = await one.onRequestGet({ request: req('/api/jobs/' + id2, {}, cookie), env, params: { id: id2 } }); r = await list.onRequestGet({ request: req('/api/jobs', {}, cookie), env }); assert.equal((await r.json()).usage.used, 1); ok('refund only once');

runnerDown = true; r = await list.onRequestPost({ request: up(cookie), env }); assert.equal(r.status, 502);
r = await list.onRequestGet({ request: req('/api/jobs', {}, cookie), env }); assert.equal((await r.json()).usage.used, 1); ok('runner down: not charged');
r = await list.onRequestPost({ request: up(cookie), env: { ...env, RUNNER_URL: '' } }); assert.equal(r.status, 503); ok('not configured -> 503');

// admin: no subscription needed, no allowance
r = await signup.onRequestPost({ request: new Request(O + '/api/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'Boss@Site.com', password: 'correct horse' }) }), env });
const c3 = (r.headers.get('Set-Cookie') || '').split(';')[0];
r = await list.onRequestPost({ request: up(c3), env: { ...env, ADMIN_EMAILS: 'someone@else.com' } }); assert.equal(r.status, 402); ok('not on admin list -> still needs Pro');
const aenv = { ...env, ADMIN_EMAILS: 'x@y.com, boss@site.com', MONTHLY_VIDEOS: '1' };
for (let k = 0; k < 3; k++) { r = await list.onRequestPost({ request: up(c3), env: aenv }); assert.equal(r.status, 202); }
ok('admin: unlimited videos without a subscription');
console.log('all passed');
