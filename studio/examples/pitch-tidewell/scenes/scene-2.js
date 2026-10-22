/* Scene 2 — "Tidewell sorts every ticket by topic and urgency. It drafts the answer from your own help
 *            centre, and your team just reviews and sends."
 * Storyboard: light canvas, product UI. Tickets fly into three labelled lanes on "sorts"; urgency pills light
 * on "urgency". A reply drafts itself with help-centre article chips on "help centre"; a cursor clicks Send
 * on "sends" and a green tick blooms. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const sorts = ctx.at(0, 'sorts'), urgency = ctx.at(0, 'urgency'), drafts = ctx.at(1, 'drafts'), help = ctx.at(1, 'help centre'), reviews = ctx.at(1, 'reviews'), sends = ctx.at(1, 'sends');

  stage.style.background = 'var(--paper)';
  el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(45% 50% at 85% 15%, rgba(94,234,212,.35), transparent 70%), radial-gradient(40% 45% at 10% 90%, rgba(255,107,74,.12), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  const head = el('div', 'abs', cam, { left: '160px', top: '84px', font: '800 64px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  head.innerHTML = 'Sorted, drafted, <span style="color:#0fa89a">sent.</span>';

  /* app window */
  const win = el('div', 'abs', cam, { left: '160px', top: '190px', width: '1600px', height: '820px', borderRadius: '28px', background: '#fff', boxShadow: '0 50px 120px -30px rgba(16,32,28,.35), 0 2px 8px rgba(16,32,28,.08)', overflow: 'hidden' });
  const bar = el('div', 'abs', win, { left: 0, right: 0, top: 0, height: '64px', background: '#f3f6f5', borderBottom: '1px solid #e3e9e7' });
  ['#ff6b4a', '#f5c451', '#5eead4'].forEach((c, i) => el('div', 'abs', bar, { left: 26 + i * 28 + 'px', top: '24px', width: '16px', height: '16px', borderRadius: '50%', background: c }));
  const brand = el('div', 'abs', bar, { left: '130px', top: '20px', font: '800 24px/1 Inter', color: 'var(--ink)' }); brand.innerHTML = '<span style="color:#0fa89a">≋</span> Tidewell';

  /* lanes */
  const LANES = [['Orders & delivery', '#0fa89a'], ['Billing', '#3a7bd5'], ['Account', '#8a5cf6']];
  const lanes = LANES.map(([n, c], i) => {
    const L = el('div', 'abs', win, { left: '30px', top: 96 + i * 236 + 'px', width: '640px', height: '212px', borderRadius: '20px', background: '#f7faf9', border: '1px solid #e3e9e7' });
    const h = el('div', 'abs', L, { left: '22px', top: '18px', font: '800 26px/1 Inter', color: c, whiteSpace: 'nowrap' }); h.textContent = n;
    return { L, c };
  });
  const TK = [[0, 'Parcel hasn’t arrived', 'Urgent'], [1, 'Charged twice this month', 'Urgent'], [2, 'Change my email', 'Normal'], [0, 'Wrong item in box', 'Soon'], [1, 'Need a tax invoice', 'Normal'], [2, 'Locked out after reset', 'Soon']];
  const PILL = { Urgent: ['#ff6b4a', '#fff'], Soon: ['#f5c451', '#3d2c00'], Normal: ['#dfe7e5', '#4a5a56'] };
  const counts = [0, 0, 0];
  const tickets = TK.map(([lane, s, u]) => {
    const k = counts[lane]++;
    const t = el('div', 'abs', lanes[lane].L, { left: '22px', right: '22px', top: 62 + k * 70 + 'px', height: '58px', borderRadius: '14px', background: '#fff', border: '1px solid #e3e9e7', boxShadow: '0 6px 16px rgba(16,32,28,.06)' });
    const tx = el('div', 'abs', t, { left: '20px', top: '16px', font: '600 24px/1.1 Inter', color: 'var(--ink)', whiteSpace: 'nowrap' }); tx.textContent = s;
    const p = el('div', 'abs', t, { right: '14px', top: '12px', padding: '8px 14px', borderRadius: '999px', font: '800 18px/1 Inter', background: '#eef2f1', color: '#9aa8a4' }); p.textContent = u;
    return { t, p, u, lane };
  });

  /* reply pane */
  const pane = el('div', 'abs', win, { left: '700px', top: '96px', width: '870px', height: '690px', borderRadius: '20px', background: '#fff', border: '1px solid #e3e9e7' });
  const ph = el('div', 'abs', pane, { left: '30px', top: '26px', font: '800 30px/1.1 Inter', color: 'var(--ink)', whiteSpace: 'nowrap' }); ph.textContent = 'Parcel hasn’t arrived';
  const pm = el('div', 'abs', pane, { left: '30px', top: '68px', font: '500 21px/1 Inter', color: '#6b7c77' }); pm.textContent = 'Priya S. · Order #20931';
  const aiTag = el('div', 'abs', pane, { right: '30px', top: '28px', padding: '9px 16px', borderRadius: '999px', background: 'rgba(15,168,154,.12)', font: '800 19px/1 Inter', color: '#0b8a7f' }); aiTag.textContent = '✦ Drafted by Tidewell';
  const LINES = ['Hi Priya, sorry your parcel is running late.', 'Your order left our warehouse on Monday and', 'is with the courier. Most deliveries arrive within', 'five business days. Track it any time here:'];
  const draft = LINES.map((l, i) => { const d = el('div', 'abs', pane, { left: '30px', top: 130 + i * 44 + 'px', font: '500 27px/1.3 Inter', color: '#22332f', whiteSpace: 'nowrap', clipPath: 'inset(0 100% 0 0)' }); d.textContent = l; return d; });
  const caret = el('div', 'abs', pane, { left: '30px', top: '134px', width: '3px', height: '32px', background: '#0fa89a' });
  const chips = ['Help centre: Delivery times', 'Help centre: Tracking your order'].map((c, i) => { const d = el('div', 'abs', pane, { left: 30 + i * 380 + 'px', top: '330px', padding: '14px 20px', borderRadius: '14px', background: '#f1fbf9', border: '2px solid #9de9dc', font: '700 21px/1 Inter', color: '#0b6f66', whiteSpace: 'nowrap' }); d.textContent = '📄 ' + c; return d; });
  const send = el('div', 'abs', pane, { right: '30px', bottom: '30px', padding: '22px 44px', borderRadius: '16px', background: '#0fa89a', font: '800 28px/1 Inter', color: '#fff', boxShadow: '0 12px 30px rgba(15,168,154,.4)' }); send.textContent = 'Send reply';
  const rev = el('div', 'abs', pane, { left: '30px', bottom: '42px', font: '600 22px/1 Inter', color: '#6b7c77' }); rev.textContent = '👀 Reviewed by Sam';
  const tick = el('div', 'abs', pane, { left: '355px', top: '210px', width: '160px', height: '160px', borderRadius: '50%', background: '#0fa89a', boxShadow: '0 0 0 18px rgba(15,168,154,.15), 0 30px 60px rgba(15,168,154,.45)', opacity: 0 });
  tick.innerHTML = '<svg width="160" height="160" viewBox="0 0 160 160"><path id="tk" d="M48 82 L72 106 L114 58" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="100" stroke-dashoffset="100"/></svg>';
  const tkp = tick.querySelector('#tk');
  const cursor = el('div', 'abs', cam, { left: '1580px', top: '1100px', width: '44px', height: '56px' });
  cursor.innerHTML = '<svg width="44" height="56" viewBox="0 0 44 56"><path d="M3 3l0 42 11-10 8 18 8-4-8-17 15-1z" fill="#10201c" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></svg>';

  ctx.fx.grain({ opacity: 0.04, blend: 'multiply' });

  /* ---- timeline ---- */
  tl.fromTo(cam, { scale: 1.05, y: 30 }, { scale: 1, y: 0, duration: 2, ease: 'expo.out' }, 0);
  tl.from(head, { opacity: 0, y: 24, duration: 0.6, ease: 'back.out(1.6)' }, 0.1);
  tl.from(win, { opacity: 0, y: 80, scale: 0.96, duration: 0.8, ease: 'expo.out' }, 0.05);
  tl.from(lanes.map((l) => l.L), { opacity: 0, x: -30, duration: 0.5, stagger: 0.08 }, 0.4);
  tl.from(pane, { opacity: 0, x: 40, duration: 0.5 }, 0.5);
  tickets.forEach((k, i) => tl.from(k.t, { x: -720, y: -60 + k.lane * 20, rotation: -6, opacity: 0, duration: 0.55, ease: 'back.out(1.4)' }, sorts - 0.25 + i * 0.14));
  tickets.forEach((k, i) => tl.to(k.p, { background: PILL[k.u][0], color: PILL[k.u][1], scale: 1.12, duration: 0.18, ease: 'power2.out' }, urgency - 0.1 + i * 0.06).to(k.p, { scale: 1, duration: 0.2 }, urgency + 0.1 + i * 0.06));
  tl.to(tickets[0].t, { borderColor: '#0fa89a', boxShadow: '0 0 0 3px rgba(15,168,154,.35)', duration: 0.3 }, ctx.beat(1) - 0.3);
  tl.from([ph, pm], { opacity: 0, y: 10, duration: 0.4, stagger: 0.06 }, ctx.beat(1) - 0.2);

  // drafts itself
  tl.from(aiTag, { opacity: 0, scale: 0.7, duration: 0.4, ease: 'back.out(2.4)' }, drafts - 0.1);
  draft.forEach((d, i) => tl.to(d, { clipPath: 'inset(0 0% 0 0)', duration: 0.42, ease: 'none' }, drafts + i * 0.38));
  tl.to(caret, { top: 134 + 3 * 44, left: 560, duration: 1.5, ease: 'steps(4)' }, drafts);
  tl.to(caret, { opacity: 0, duration: 0.15 }, drafts + 1.6);
  tl.from(chips, { opacity: 0, y: 20, scale: 0.85, duration: 0.45, stagger: 0.15, ease: 'back.out(2)' }, help - 0.15);

  // reviews and sends
  tl.from(send, { opacity: 0, scale: 0.8, duration: 0.4, ease: 'back.out(2)' }, reviews - 0.6);
  tl.from(rev, { opacity: 0, x: -10, duration: 0.4 }, reviews - 0.1);
  tl.to(cursor, { left: 1570 + 'px', top: 935 + 'px', duration: 0.8, ease: 'power3.out' }, reviews - 0.3);
  tl.to(cursor, { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1 }, sends);
  tl.to(send, { scale: 0.94, duration: 0.08, yoyo: true, repeat: 1 }, sends);
  tl.to([...draft, ...chips, aiTag], { opacity: 0.12, duration: 0.3 }, sends + 0.12);
  tl.fromTo(tick, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2.4)', immediateRender: false }, sends + 0.15);
  tl.to(tkp, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, sends + 0.35);
  tl.to(tickets[0].t, { opacity: 0, x: 60, duration: 0.4 }, sends + 0.3);
  tl.to(send, { background: '#10201c', duration: 0.3 }, sends + 0.1);
});
