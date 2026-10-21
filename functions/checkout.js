/* GET /checkout?plan=monthly|yearly
 * Requires a signed-in account, then sends the user to the Stripe payment link with their account id attached
 * (client_reference_id) so the webhook can switch on Pro for exactly that account. */
import { sessionUid } from './_lib/auth.js';

const LINKS = {
  monthly: 'https://buy.stripe.com/4gM8wHbqpd4pbJmfP6aAw06',
  yearly: 'https://buy.stripe.com/7sY6ozfGFggB00EauMaAw07'
};

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const plan = url.searchParams.get('plan');
  if (!LINKS[plan]) return Response.redirect(url.origin + '/pricing', 302);
  const uid = env.ACCOUNTS && env.SESSION_SECRET ? await sessionUid(request, env) : null;
  const email = uid ? await env.ACCOUNTS.get('uid:' + uid) : null;
  if (!uid || !email) {
    const next = '/checkout?plan=' + plan;
    return Response.redirect(url.origin + '/account?mode=signup&next=' + encodeURIComponent(next), 302);
  }
  const dest = new URL(LINKS[plan]);
  dest.searchParams.set('client_reference_id', uid);
  dest.searchParams.set('prefilled_email', email);
  return Response.redirect(dest.toString(), 302);
}
