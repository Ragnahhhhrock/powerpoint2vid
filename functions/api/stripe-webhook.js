/* POST /api/stripe-webhook  (Stripe -> us)
 * Events to send: checkout.session.completed, customer.subscription.created, customer.subscription.updated,
 * customer.subscription.deleted. A checkout.session.completed in "payment" mode is a single-video purchase (+1 credit). Verifies the Stripe-Signature header with STRIPE_WEBHOOK_SECRET. */
import { json, hmac, safeEqual } from '../_lib/auth.js';
import { addCredits } from '../_lib/jobs.js';

const toHex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
const TOLERANCE_SECONDS = 300;

export async function verifyStripe(raw, header, secret, now = Date.now() / 1000) {
  if (!header || !secret) return false;
  const parts = header.split(',').map((p) => p.split('='));
  const t = (parts.find((p) => p[0] === 't') || [])[1];
  const sigs = parts.filter((p) => p[0] === 'v1').map((p) => p[1]);
  if (!t || !sigs.length || Math.abs(now - +t) > TOLERANCE_SECONDS) return false;
  const expected = toHex(await hmac(secret, t + '.' + raw));
  return sigs.some((s) => safeEqual(s, expected));
}

const intervalPlan = (sub) => {
  const i = sub && sub.items && sub.items.data && sub.items.data[0] && sub.items.data[0].price && sub.items.data[0].price.recurring;
  return i ? (i.interval === 'year' ? 'yearly' : i.interval === 'month' ? 'monthly' : i.interval) : null;
};

async function setSub(env, uid, patch) {
  const cur = (await env.ACCOUNTS.get('sub:' + uid, 'json')) || {};
  await env.ACCOUNTS.put('sub:' + uid, JSON.stringify(Object.assign(cur, patch, { updated: Date.now() })));
}

export async function onRequestPost({ request, env }) {
  if (!env.ACCOUNTS || !env.STRIPE_WEBHOOK_SECRET) return json({ error: 'Webhook not configured.' }, 503);
  const raw = await request.text();
  if (!(await verifyStripe(raw, request.headers.get('Stripe-Signature'), env.STRIPE_WEBHOOK_SECRET))) return json({ error: 'Bad signature.' }, 400);
  let event; try { event = JSON.parse(raw); } catch (e) { return json({ error: 'Bad JSON.' }, 400); }
  const obj = event.data && event.data.object;
  if (!obj) return json({ ok: true });

  if (event.type === 'checkout.session.completed') {
    const uid = obj.client_reference_id;
    if (uid && /^[0-9a-f]{24}$/.test(uid) && (await env.ACCOUNTS.get('uid:' + uid)) && (obj.payment_status === 'paid' || obj.payment_status === 'no_payment_required')) {
      if (obj.mode === 'payment') {
        /* One-off single-video purchase: add one video credit (once per checkout session). */
        const seen = 'credited:' + obj.id;
        if (!(await env.ACCOUNTS.get(seen))) {
          await env.ACCOUNTS.put(seen, '1', { expirationTtl: 400 * 86400 });
          await addCredits(env, uid, 1);
          await env.ACCOUNTS.put('paid:' + uid, '1');
        }
        return json({ ok: true });
      }
      if (obj.customer) await env.ACCOUNTS.put('cust:' + obj.customer, uid);
      await setSub(env, uid, { active: true, customer: obj.customer || null, subscription: obj.subscription || null });
    }
  } else if (/^customer\.subscription\.(created|updated|deleted)$/.test(event.type)) {
    const uid = obj.customer ? await env.ACCOUNTS.get('cust:' + obj.customer) : null;
    if (uid) {
      const active = event.type !== 'customer.subscription.deleted' && (obj.status === 'active' || obj.status === 'trialing');
      await setSub(env, uid, { active, status: obj.status, plan: intervalPlan(obj), subscription: obj.id, cancelAtPeriodEnd: !!obj.cancel_at_period_end });
    }
  }
  return json({ ok: true });
}
