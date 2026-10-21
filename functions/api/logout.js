/* POST /api/logout -> clears the session cookie. */
import { json, clearCookie } from '../_lib/auth.js';

export async function onRequestPost() {
  return json({ ok: true }, 200, { 'Set-Cookie': clearCookie() });
}
