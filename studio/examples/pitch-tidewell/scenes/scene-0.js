/* Scene 0 — "Your support inbox never sleeps. Neither does Tidewell."
 * Storyboard: night stage, a notification stack keeps arriving and piling up. On "Neither" a wave of teal
 * light sweeps through, the notifications fold away and the Tidewell wordmark forms. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const sleeps = ctx.at(0, 'sleeps'), neither = ctx.at(1, 'neither'), tide = ctx.at(1, 'tidewell');

  stage.style.background = 'radial-gradient(70% 70% at 50% 40%, #12302a 0%, var(--night) 70%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  const SUBJ = ['Where is my order?', 'Refund for #20931', 'Can’t log in', 'Change delivery address', 'Invoice missing', 'Password reset link expired', 'Item arrived damaged', 'How do I cancel?', 'Wrong size sent', 'Promo code not working', 'Update card details', 'Order stuck in transit'];
  const TIMES = ['11:02 pm', '11:19 pm', '11:48 pm', '12:31 am', '1:07 am', '1:55 am', '2:40 am', '3:12 am', '4:26 am', '5:03 am', '5:47 am', '6:15 am'];
  const stack = el('div', 'abs', cam, { left: '660px', top: '170px', width: '600px', height: '760px' });
  const cards = SUBJ.map((s, i) => {
    const c = el('div', 'abs', stack, { left: 0, top: 0, width: '600px', height: '112px', borderRadius: '24px', background: 'rgba(255,255,255,.10)', border: '1px solid rgba(255,255,255,.16)', backdropFilter: 'blur(14px)', boxShadow: '0 20px 50px rgba(0,0,0,.35)', transformOrigin: '50% 0%', overflow: 'hidden' });
    const ic = el('div', 'abs', c, { left: '22px', top: '24px', width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, #ff8f72, #ff6b4a)', font: '800 30px/64px Inter', textAlign: 'center', color: '#fff' }); ic.textContent = '✉';
    const a = el('div', 'abs', c, { left: '108px', top: '26px', right: '24px', font: '700 26px/1.1 Inter', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }); a.textContent = s;
    const b = el('div', 'abs', c, { left: '108px', top: '64px', font: '500 21px/1 Inter', color: 'rgba(255,255,255,.55)', whiteSpace: 'nowrap' }); b.textContent = 'New ticket · ' + TIMES[i];
    return c;
  });
  const badge = el('div', 'abs', cam, { left: '1220px', top: '140px', minWidth: '84px', height: '84px', padding: '0 20px', borderRadius: '42px', background: '#ff6b4a', boxShadow: '0 0 40px rgba(255,107,74,.7)', font: '800 40px/84px Inter', textAlign: 'center', color: '#fff', fontVariantNumeric: 'tabular-nums' });
  const kick = el('div', 'abs', stage, { left: '120px', top: '120px', font: '600 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.2em', color: 'rgba(255,255,255,.5)' });
  kick.textContent = 'SUPPORT INBOX · OVERNIGHT';

  /* wave sweep */
  const wave = el('div', 'abs', stage, { top: '-10%', bottom: '-10%', width: '1300px', left: '-1400px', background: 'linear-gradient(90deg, transparent 0%, rgba(15,168,154,.0) 10%, rgba(94,234,212,.55) 55%, rgba(15,168,154,.9) 70%, #0a1714 100%)', filter: 'blur(4px)' });
  const after = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(70% 70% at 50% 45%, #0f3d36 0%, #08201c 60%, var(--night) 100%)', clipPath: 'inset(0 100% 0 0)' });
  const lines = el('div', 'abs', after, { inset: 0 });
  lines.innerHTML = `<svg width="1920" height="1080" fill="none" stroke="rgba(94,234,212,.18)" stroke-width="3">${[0, 1, 2, 3, 4].map((k) => { let d = `M-20 ${760 + k * 50}`; for (let x = 0; x <= 1960; x += 40) d += ` L${x} ${760 + k * 50 + Math.sin(x / 140 + k) * 22}`; return `<path d="${d}"/>`; }).join('')}</svg>`;
  const mark = el('div', 'abs', after, { left: 0, right: 0, top: '360px', textAlign: 'center' });
  const logo = el('div', '', mark, { display: 'inline-block', width: '120px', height: '120px', borderRadius: '30px', background: 'linear-gradient(135deg, #5eead4, #0fa89a)', boxShadow: '0 20px 60px rgba(15,168,154,.6)', verticalAlign: 'middle', marginRight: '34px', position: 'relative', overflow: 'hidden' });
  logo.innerHTML = '<svg width="120" height="120" viewBox="0 0 120 120"><path d="M18 66 q 14 -18 28 0 t 28 0 t 28 0" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/><path d="M18 86 q 14 -18 28 0 t 28 0 t 28 0" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="8" stroke-linecap="round"/></svg>';
  const word = el('div', '', mark, { display: 'inline-block', verticalAlign: 'middle', font: '900 168px/1 Inter Display, Inter', letterSpacing: '-.055em', color: '#fff' });
  const chars = ctx.split(word, 'Tidewell', 'char');
  const tag = el('div', 'abs', after, { left: 0, right: 0, top: '560px', textAlign: 'center', font: '600 40px/1.2 Inter', color: 'rgba(220,255,248,.8)', letterSpacing: '-.01em' });
  tag.textContent = 'Customer support, without the backlog.';
  const pill = el('div', 'abs', after, { left: '50%', top: '660px', transform: 'translateX(-50%)', padding: '14px 26px', borderRadius: '999px', border: '1px solid rgba(94,234,212,.5)', background: 'rgba(94,234,212,.12)', font: '700 24px/1 Inter', color: '#bdfcf1', whiteSpace: 'nowrap' });
  pill.innerHTML = '<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#5eead4;margin-right:12px;box-shadow:0 0 12px #5eead4"></span>Inbox clear · 0 waiting';

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  const st = { n: 0 };
  ctx.onFrame(() => { badge.textContent = String(Math.round(st.n)); });

  /* ---- timeline ---- */
  tl.fromTo(cam, { scale: 1.06 }, { scale: 1, duration: ctx.dur, ease: 'power1.out' }, 0);
  tl.from(kick, { opacity: 0, x: -20, duration: 0.5 }, 0.15);
  const ARR = neither - 0.4;
  cards.forEach((c, i) => {
    const t = 0.1 + i * ((ARR - 0.3) / cards.length);
    tl.fromTo(c, { y: -140, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.6)', immediateRender: false }, t);
    gsap.set(c, { opacity: 0 });
    // previous cards get pushed down and recede
    cards.slice(0, i).forEach((p, k) => { const depth = i - k; tl.to(p, { y: Math.min(depth, 6) * 104 + (depth > 6 ? (depth - 6) * 10 : 0), scale: 1 - Math.min(depth, 8) * 0.025, opacity: depth > 6 ? 0.25 : 1 - depth * 0.07, duration: 0.4, ease: 'power3.out' }, t); });
  });
  tl.to(st, { n: 128, duration: ARR - 0.1, ease: 'power1.in' }, 0.1);
  tl.from(badge, { scale: 0, duration: 0.5, ease: 'back.out(2.5)' }, 0.25);
  tl.to(badge, { scale: 1.18, duration: 0.15, yoyo: true, repeat: 1 }, sleeps);
  tl.to(cam, { x: 10, duration: 0.05, yoyo: true, repeat: 5, ease: 'none' }, sleeps + 0.2);

  // the tide comes in
  tl.to(wave, { left: '2100px', duration: 1.1, ease: 'power2.inOut' }, neither - 0.35);
  tl.to(after, { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power2.inOut' }, neither - 0.15);
  tl.to(cards, { scaleY: 0, opacity: 0, duration: 0.35, stagger: 0.03, ease: 'power2.in' }, neither - 0.2);
  tl.from(logo, { scale: 0, rotation: -30, duration: 0.7, ease: 'back.out(2.2)' }, tide - 0.45);
  tl.from(chars, { yPercent: 110, opacity: 0, duration: 0.6, stagger: 0.035, ease: 'back.out(1.8)' }, tide - 0.35);
  tl.from(tag, { opacity: 0, y: 20, duration: 0.6 }, tide + 0.35);
  tl.from(pill, { opacity: 0, y: 16, duration: 0.5, ease: 'back.out(2)' }, tide + 0.75);
  tl.fromTo(lines, { x: 0 }, { x: -160, duration: ctx.dur - neither, ease: 'none', immediateRender: false }, neither);
});
