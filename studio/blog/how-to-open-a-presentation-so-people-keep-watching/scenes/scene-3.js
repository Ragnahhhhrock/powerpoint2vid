/* Scene 3 — "Instead of thanks, introductions and project history, open with the finding.
 *  The viewer knows the point and the plan in under twenty seconds."
 * Storyboard: ink stage split into BEFORE / AFTER. Left: four grey slide thumbnails (title, About me,
 * Agenda, Background) deal in one by one on thanks / introductions / project, then dim and get struck
 * on "history". On "finding" the right side lights up and the paper-white headline
 * "Shorter reminder emails got more replies" snaps in word by word. "Three things we tested" clicks in
 * on "plan"; a teal stopwatch ring closes on "twenty seconds" and holds. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const T = (i, w, fb) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : fb; };
  const thanks = T(0, 'thanks', 1.0), intro = T(0, 'introductions', 1.8), project = T(0, 'project', 2.9);
  const history = T(0, 'history', 3.5), finding = T(0, 'finding', 4.9);
  const point = T(1, 'point', 6.7), plan = T(1, 'plan', 7.3), twenty = T(1, 'twenty', 8.0);
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 30% 55%, #222838 0%, var(--ink) 55%, var(--night) 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  /* right-side light */
  const glow = el('div', 'abs', cam, { left: '960px', top: 0, width: '960px', height: '1080px',
    background: 'radial-gradient(70% 55% at 45% 45%, rgba(246,243,236,.13) 0%, rgba(46,196,182,.06) 45%, transparent 75%)', opacity: 0 });
  const divider = el('div', 'abs', cam, { left: '959px', top: '150px', width: '2px', height: '800px',
    background: 'linear-gradient(180deg, transparent, rgba(154,163,181,.35), transparent)', transformOrigin: '50% 0%' });

  const label = (txt, x, color) => {
    const d = el('div', 'abs', cam, { left: x + 'px', top: '150px', font: `600 24px/1 ${MONO}`, letterSpacing: '.22em', color });
    d.textContent = txt; return d;
  };
  const lBefore = label('BEFORE', 160, 'var(--mist)');
  const lAfter = label('AFTER', 1060, 'rgba(154,163,181,.45)');

  /* ---- left: the slow deck ---- */
  const NAMES = ['Q3 Project Update', 'About me', 'Agenda', 'Background'];
  const deck = el('div', 'abs', cam, { left: 0, top: 0, width: '960px', height: '1080px' });
  const cards = NAMES.map((n, i) => {
    const c = el('div', 'abs', deck, { left: 170 + i * 22 + 'px', top: 340 + i * 26 + 'px', width: '560px', height: '315px',
      borderRadius: '12px', background: 'linear-gradient(160deg, #3a4052, #2b3041)', border: '1px solid rgba(255,255,255,.08)',
      boxShadow: '0 30px 60px rgba(0,0,0,.45)', transformOrigin: '50% 60%' });
    const t = el('div', 'abs', c, { left: '40px', top: i === 0 ? '110px' : '44px', font: `700 ${i === 0 ? 44 : 38}px/1 Inter Display, Inter`,
      letterSpacing: '-.03em', color: '#aab1c0' });
    t.textContent = n;
    if (i === 0) {
      el('div', 'abs', c, { left: '40px', top: '178px', width: '220px', height: '12px', borderRadius: '6px', background: 'rgba(154,163,181,.25)' });
    } else {
      [0, 1, 2].forEach((k) => {
        el('div', 'abs', c, { left: '40px', top: 118 + k * 44 + 'px', width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(154,163,181,.35)' });
        el('div', 'abs', c, { left: '68px', top: 118 + k * 44 + 'px', width: [360, 300, 330][k] - i * 20 + 'px', height: '12px', borderRadius: '6px', background: 'rgba(154,163,181,.22)' });
      });
    }
    return c;
  });
  const strike = el('div', 'abs', cam, { left: '140px', top: '520px', width: '680px', height: '8px', borderRadius: '4px',
    background: 'var(--signal)', boxShadow: '0 0 24px rgba(255,90,60,.6)', transformOrigin: '0% 50%', rotation: -6 });
  gsap.set(strike, { rotation: -8, scaleX: 0 });
  const timeTag = el('div', 'abs', cam, { left: '170px', top: '760px', font: `600 22px/1 ${MONO}`, letterSpacing: '.16em', color: 'rgba(255,90,60,.85)' });
  timeTag.textContent = 'STILL NO POINT';

  /* ---- right: the finding ---- */
  const head = el('div', 'abs', cam, { left: '1060px', top: '250px', width: '760px', font: '800 76px/1.04 Inter Display, Inter',
    letterSpacing: '-.04em', color: 'var(--paper)', textShadow: '0 0 40px rgba(246,243,236,.18)' });
  const words = ctx.split(head, 'Shorter reminder emails got more replies', 'word');
  words.forEach((w) => { w.style.marginRight = '0.22em'; });
  words.slice(4).forEach((w) => { w.style.color = 'var(--amber)'; });
  const uline = el('div', 'abs', cam, { left: '1060px', top: '520px', width: '120px', height: '8px', borderRadius: '4px', background: 'var(--signal)', transformOrigin: '0% 50%' });

  const sub = el('div', 'abs', cam, { left: '1060px', top: '580px', display: 'flex', alignItems: 'center', gap: '20px' });
  const dots = [1, 2, 3].map((n) => {
    const d = el('div', '', sub, { width: '46px', height: '46px', borderRadius: '50%', border: '3px solid var(--teal)', color: 'var(--teal)',
      font: '800 24px/40px Inter', textAlign: 'center' });
    d.textContent = n; return d;
  });
  const subT = el('div', '', sub, { font: '700 40px/1 Inter Display, Inter', letterSpacing: '-.02em', color: 'rgba(246,243,236,.85)', marginLeft: '6px' });
  subT.textContent = 'Three things we tested';

  /* stopwatch */
  const sw = el('div', 'abs', cam, { left: '1060px', top: '700px', width: '220px', height: '220px' });
  const C = 2 * Math.PI * 86;
  sw.innerHTML = `<svg width="220" height="220" viewBox="0 0 220 220">
    <rect x="98" y="2" width="24" height="14" rx="4" fill="#2EC4B6"/>
    <circle cx="110" cy="116" r="86" fill="none" stroke="rgba(46,196,182,.15)" stroke-width="14"/>
    <circle id="ring" cx="110" cy="116" r="86" fill="none" stroke="#2EC4B6" stroke-width="14" stroke-linecap="round"
      stroke-dasharray="${C}" stroke-dashoffset="${C}" transform="rotate(-90 110 116)" style="filter:drop-shadow(0 0 12px rgba(46,196,182,.7))"/></svg>`;
  const ring = sw.querySelector('#ring');
  const swTxt = el('div', 'abs', sw, { left: 0, top: '84px', width: '220px', textAlign: 'center', font: '900 60px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)' });
  swTxt.textContent = '<20s';
  const swLab = el('div', 'abs', cam, { left: '1310px', top: '780px', font: `600 24px/1.5 ${MONO}`, letterSpacing: '.16em', color: 'var(--teal)' });
  swLab.innerHTML = 'POINT + PLAN<br><span style="color:var(--mist)">UNDER TWENTY SECONDS</span>';

  const flash = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(45% 50% at 72% 40%, rgba(246,243,236,.35), transparent 70%)', opacity: 0, mixBlendMode: 'screen' });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set(cards, { filter: 'brightness(1) grayscale(0)' });
  gsap.set([head, uline, sub, sw, swLab, timeTag], { opacity: 1 });
  tl.to(cam, { scale: 1.03, duration: finding, ease: 'none' }, 0);
  tl.from([lBefore, lAfter], { opacity: 0, y: -14, duration: 0.4, stagger: 0.08 }, 0.05);
  tl.from(divider, { scaleY: 0, duration: 0.6, ease: 'expo.out' }, 0.05);

  const dealT = [0.1, thanks - 0.1, intro - 0.1, project - 0.1];
  cards.forEach((c, i) => {
    tl.from(c, { x: -720, rotation: -14, opacity: 0, duration: 0.6, ease: 'power3.out' }, dealT[i]);
    tl.to(c, { rotation: [-3, 2, -2, 3][i], duration: 0.4, ease: 'back.out(2)' }, dealT[i] + 0.45);
  });
  // slow shuffle drift of the whole deck while it drags on
  tl.to(deck, { x: 24, y: 10, duration: history, ease: 'none' }, 0);

  // "history": dim and strike
  tl.to(cards, { filter: 'brightness(.45) grayscale(1)', duration: 0.4, stagger: 0.05 }, history);
  tl.to(strike, { scaleX: 1, duration: 0.28, ease: 'power4.out' }, history + 0.15);
  tl.from(timeTag, { opacity: 0, x: -20, duration: 0.3 }, history + 0.3);
  tl.to([lBefore], { opacity: 0.45, duration: 0.4 }, history + 0.2);

  // "finding": right side lights, headline snaps in
  tl.to(cam, { scale: 1, x: -40, duration: 0.6, ease: 'expo.inOut' }, finding - 0.3);
  tl.to([deck, strike, timeTag], { opacity: 0.35, duration: 0.4 }, finding - 0.1);
  tl.to(glow, { opacity: 1, duration: 0.35, ease: 'power2.out' }, finding - 0.1);
  tl.fromTo(flash, { opacity: 0 }, { opacity: 1, duration: 0.1, yoyo: true, repeat: 1, immediateRender: false }, finding - 0.05);
  tl.to(lAfter, { color: 'var(--paper)', duration: 0.3 }, finding - 0.1);
  tl.from(words, { y: 50, opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.06, ease: 'back.out(1.8)' }, finding - 0.15);
  tl.from(uline, { scaleX: 0, duration: 0.35, ease: 'power4.out' }, finding + 0.35);
  tl.to(cam, { scale: 1.035, duration: ctx.dur - finding - 0.3, ease: 'power1.inOut' }, finding + 0.3);

  // "point": headline pulse
  tl.to(head, { textShadow: '0 0 60px rgba(246,243,236,.4)', duration: 0.3, yoyo: true, repeat: 1 }, point);

  // "plan": subline clicks in
  tl.from(dots, { scale: 0, opacity: 0, duration: 0.35, stagger: 0.07, ease: 'back.out(2.4)' }, plan - 0.15);
  tl.from(subT, { x: -30, opacity: 0, duration: 0.35 }, plan);

  // "twenty seconds": stopwatch closes and holds
  tl.from(sw, { scale: 0.6, opacity: 0, duration: 0.4, ease: 'back.out(1.8)' }, twenty - 0.45);
  tl.from(swLab, { x: -20, opacity: 0, duration: 0.35 }, twenty - 0.2);
  tl.to(ring, { attr: { 'stroke-dashoffset': 0 }, duration: 0.9, ease: 'power2.inOut' }, twenty - 0.2);
  tl.to(sw, { scale: 1.06, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, twenty + 0.7);
});
