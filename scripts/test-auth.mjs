/* Run: node scripts/test-auth.mjs
 * Exercises signup, login, session, checkout redirect and the Stripe webhook against an in-memory KV. */
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import * as signup from '../functions/api/signup.js';
import * as login from '../functions/api/login.js';
import * as me from '../functions/api/me.js';
import * as logout from '../functions/api/logout.js';
import * as hook from '../functions/api/stripe-webhook.js';
import * as checkout from '../functions/checkout.js';

const store = new Map();
const ACCOUNTS = {
  async get(k, type) { const v = store.get(k); return v === undefined ? null : type === 'json' ? JSON.parse(v) : v; },
  async put(k, v) { store.set(k, v); }
};
const env = { ACCOUNTS, SESSION_SECRET: 'test-secret-test-secret', STRIPE_WEBHOOK_SECRET: 'whsec_test', STRIPE_LINK_PRO_MONTHLY: 'https://buy.stripe.com/test_pro' };
const O = 'https://powerpoint2vid.com';
const post = (path, body, cookie, headers = {}) => new Request(O + path, { method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json' }, cookie ? { Cookie: cookie } : {}, headers), body: typeof body === 'string' ? body : JSON.stringify(body) });
const get = (path, cookie) => new Request(O + path, { headers: cookie ? { Cookie: cookie } : {} });
const cookieOf = (res) => (res.headers.get('Set-Cookie') || '').split(';')[0];
const stripeSig = (raw, secret = 'whsec_test', t = Math.floor(Date.now() / 1000)) => `t=${t},v1=${createHmac('sha256', secret).update(t + '.' + raw).digest('hex')}`;

let n = 0; const ok = (name) => console.log('ok', ++n, name);

// signed out
let r = await me.onRequestGet({ request: get('/api/me'), env });
assert.deepEqual(await r.json(), { loggedIn: false, pro: false, configured: true }); ok('me signed out');

// signup validation + success
r = await signup.onRequestPost({ request: post('/api/signup', { email: 'bad', password: 'longenough' }), env }); assert.equal(r.status, 400); ok('signup rejects bad email');
r = await signup.onRequestPost({ request: post('/api/signup', { email: 'a@b.co', password: 'short' }), env }); assert.equal(r.status, 400); ok('signup rejects short password');
r = await signup.onRequestPost({ request: post('/api/signup', { email: ' Mal@Example.com ', password: 'correct horse' }), env }); assert.equal(r.status, 200);
const c1 = cookieOf(r); assert.match(c1, /^p2v_session=[0-9a-f]{24}\.\d+\./); assert.match(r.headers.get('Set-Cookie'), /HttpOnly.*Secure.*SameSite=Lax/); ok('signup + cookie');
r = await signup.onRequestPost({ request: post('/api/signup', { email: 'mal@example.com', password: 'another one' }), env }); assert.equal(r.status, 409); ok('duplicate email rejected (case-insensitive)');
assert.ok(!JSON.stringify([...store.values()]).includes('correct horse')); ok('password not stored in plain text');

// session
r = await me.onRequestGet({ request: get('/api/me', c1), env });
let j = await r.json(); assert.equal(j.loggedIn, true); assert.equal(j.email, 'mal@example.com'); assert.equal(j.pro, false); ok('me signed in, not pro');
r = await me.onRequestGet({ request: get('/api/me', c1.slice(0, -2) + 'xx'), env }); assert.equal((await r.json()).loggedIn, false); ok('tampered cookie rejected');

// login
r = await login.onRequestPost({ request: post('/api/login', { email: 'mal@example.com', password: 'wrong password' }), env }); assert.equal(r.status, 401); ok('wrong password rejected');
r = await login.onRequestPost({ request: post('/api/login', { email: 'nobody@example.com', password: 'whatever12' }), env }); assert.equal(r.status, 401); ok('unknown user rejected');
r = await login.onRequestPost({ request: post('/api/login', { email: 'MAL@example.com', password: 'correct horse' }), env }); assert.equal(r.status, 200);
const c2 = cookieOf(r); ok('login');
const uid = c2.split('=')[1].split('.')[0];

// checkout redirect
r = await checkout.onRequestGet({ request: get('/checkout?plan=monthly'), env }); assert.equal(r.status, 302);
assert.match(r.headers.get('Location'), /\/account\?mode=signup&next=%2Fcheckout%3Fplan%3Dmonthly$/); ok('checkout sends signed-out users to sign up');
r = await checkout.onRequestGet({ request: get('/checkout?plan=monthly', c2), env }); assert.equal(r.status, 302);
let loc = new URL(r.headers.get('Location')); assert.equal(loc.host, 'buy.stripe.com'); assert.equal(loc.searchParams.get('client_reference_id'), uid); assert.equal(loc.searchParams.get('prefilled_email'), 'mal@example.com'); ok('checkout attaches account id');
r = await checkout.onRequestGet({ request: get('/checkout?plan=bogus', c2), env }); assert.equal(r.headers.get('Location'), O + '/pricing?unavailable=1'); ok('unknown plan goes to pricing');
r = await checkout.onRequestGet({ request: get('/checkout?plan=monthly', c2), env: Object.assign({}, env, { STRIPE_LINK_PRO_MONTHLY: '' }) }); assert.equal(r.headers.get('Location'), O + '/pricing?unavailable=1'); ok('checkout fails closed without the Pro link');

// webhook
const completed = JSON.stringify({ type: 'checkout.session.completed', data: { object: { client_reference_id: uid, customer: 'cus_123', subscription: 'sub_123', payment_status: 'paid' } } });
r = await hook.onRequestPost({ request: post('/api/stripe-webhook', completed, null, { 'Stripe-Signature': stripeSig(completed, 'whsec_wrong') }), env }); assert.equal(r.status, 400); ok('webhook rejects wrong signature');
r = await hook.onRequestPost({ request: post('/api/stripe-webhook', completed, null, { 'Stripe-Signature': stripeSig(completed, 'whsec_test', Math.floor(Date.now() / 1000) - 3600) }), env }); assert.equal(r.status, 400); ok('webhook rejects stale timestamp');
r = await hook.onRequestPost({ request: post('/api/stripe-webhook', completed, null), env }); assert.equal(r.status, 400); ok('webhook rejects missing signature');
r = await hook.onRequestPost({ request: post('/api/stripe-webhook', completed, null, { 'Stripe-Signature': stripeSig(completed) }), env }); assert.equal(r.status, 200);
j = await (await me.onRequestGet({ request: get('/api/me', c2), env })).json(); assert.equal(j.pro, true); ok('payment switches Pro on');

const updated = JSON.stringify({ type: 'customer.subscription.updated', data: { object: { id: 'sub_123', customer: 'cus_123', status: 'active', cancel_at_period_end: false, items: { data: [{ price: { recurring: { interval: 'year' } } }] } } } });
await hook.onRequestPost({ request: post('/api/stripe-webhook', updated, null, { 'Stripe-Signature': stripeSig(updated) }), env });
j = await (await me.onRequestGet({ request: get('/api/me', c2), env })).json(); assert.equal(j.plan, 'yearly'); assert.equal(j.pro, true); ok('subscription update records plan');

const deleted = JSON.stringify({ type: 'customer.subscription.deleted', data: { object: { id: 'sub_123', customer: 'cus_123', status: 'canceled', items: { data: [] } } } });
await hook.onRequestPost({ request: post('/api/stripe-webhook', deleted, null, { 'Stripe-Signature': stripeSig(deleted) }), env });
j = await (await me.onRequestGet({ request: get('/api/me', c2), env })).json(); assert.equal(j.pro, false); ok('cancellation switches Pro off');

const unknown = JSON.stringify({ type: 'checkout.session.completed', data: { object: { client_reference_id: 'ffffffffffffffffffffffff', customer: 'cus_x', payment_status: 'paid' } } });
r = await hook.onRequestPost({ request: post('/api/stripe-webhook', unknown, null, { 'Stripe-Signature': stripeSig(unknown) }), env }); assert.equal(r.status, 200);
assert.equal(await ACCOUNTS.get('sub:ffffffffffffffffffffffff'), null); ok('webhook ignores unknown account ids');

// logout + not-configured
r = await logout.onRequestPost(); assert.match(r.headers.get('Set-Cookie'), /Max-Age=0/); ok('logout clears cookie');
r = await signup.onRequestPost({ request: post('/api/signup', { email: 'a@b.co', password: 'longenough' }), env: {} }); assert.equal(r.status, 503); ok('unconfigured env returns 503');

console.log('\nall', n, 'checks passed');
