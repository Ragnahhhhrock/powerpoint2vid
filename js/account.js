/* Account state shared by every page. window.P2V.get() resolves to { loggedIn, email, pro, plan, configured }. */
(function () {
  'use strict';
  let cache = null;
  const fetchMe = () => fetch('/api/me', { credentials: 'same-origin' }).then((r) => r.json()).catch(() => ({ loggedIn: false, pro: false, configured: false }));
  const P2V = { get(force) { if (!cache || force) cache = fetchMe(); return cache; } };
  window.P2V = P2V;

  // Header link: "Log in" when signed out, "Account" when signed in.
  P2V.get().then((me) => {
    const nav = document.querySelector('.nav');
    if (!nav || nav.querySelector('[data-account-link]')) return;
    const a = document.createElement('a');
    a.setAttribute('data-account-link', '');
    a.href = '/account';
    a.textContent = me.loggedIn ? 'Account' : 'Log in';
    nav.appendChild(a);
  });
})();
