/* GET /checkout?plan=monthly
 * Requires a signed-in account, then sends the user to the Stripe payment link with their account id attached
 * (client_reference_id) so the webhook can switch on Pro for exactly that account. */
import { sessionUid } from './_lib/auth.js';

/* Pro (A$29/month, 10 Opus-directed videos). Set the Stripe payment link as the Cloudflare variable
 * STRIPE_LINK_PRO_MONTHLY. The old A$12 monthly and A$99 yearly links are retired. */
const links = (env) => ({ monthly: env.STRIPE_LINK_PRO_MONTHLY || '' });

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const plan = url.searchParams.get('plan');
  const LINKS = links(env);
  if (!LINKS[plan]) return Response.redirect(url.origin + '/pricing?unavailable=1', 302);
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
