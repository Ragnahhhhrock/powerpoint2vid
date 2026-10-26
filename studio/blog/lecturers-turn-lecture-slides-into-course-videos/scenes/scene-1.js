/* Scene 2 — "Don't start with your whole course. Begin where video helps most, like one assessment
 * explainer. Every student needs it, and it saves you answering the same emails."
 * Storyboard: Paper stage. Twelve slate course cards fill the frame; on "whole course" they dim and
 * slide back. On "helps most" four teal tags drop in (the slide's four bullets, rebuilt). On "one
 * assessment explainer" a single card lifts forward as the camera pushes close. On "student" a row
 * of students gathers beneath it. On "same emails" coral envelopes fly in and dissolve against the
 * card, which settles with a teal check. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const whole = ctx.at(0, 'whole'), helps = ctx.at(1, 'helps'), one = ctx.at(1, 'one'),
    expl = ctx.at(1, 'explainer'), student = ctx.at(2, 'student'), same = ctx.at(2, 'same'), emails = ctx.at(2, 'emails');
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 50% 45%, #fffdf8 0%, var(--paper) 60%, #ece6da 100%)';
  const drift = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });
  const cam = el('div', 'abs', drift, { inset: 0, transformOrigin: '960px 560px' });
  const back = el('div', 'abs', cam, { inset: 0, transformOrigin: '960px 600px' });

  /* course grid */
  const CW = 340, CH = 200, GX = 380, GY = 240, L0 = 220, T0 = 260;
  const cards = [];
  for (let i = 0; i < 12; i++) {
    const c = i % 4, r = Math.floor(i / 4), x = L0 + c * GX, y = T0 + r * GY;
    const card = el('div', 'abs', back, { left: x + 'px', top: y + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '18px',
      background: '#fff', boxShadow: '0 18px 40px rgba(28,36,51,.10), 0 2px 6px rgba(28,36,51,.06)', overflow: 'hidden' });
    el('div', 'abs', card, { left: 0, top: 0, right: 0, height: '10px', background: 'var(--slate)', opacity: 0.55 });
    const lab = el('div', 'abs', card, { left: '28px', top: '40px', font: `600 18px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--slate)' });
    lab.textContent = 'LECTURE ' + String(i + 1).padStart(2, '0');
    el('div', 'abs', card, { left: '28px', top: '88px', width: '230px', height: '16px', borderRadius: '8px', background: 'var(--chalk)' });
    el('div', 'abs', card, { left: '28px', top: '120px', width: '170px', height: '16px', borderRadius: '8px', background: 'var(--chalk)' });
    el('div', 'abs', card, { left: '28px', top: '152px', width: '200px', height: '16px', borderRadius: '8px', background: 'var(--chalk)' });
    cards.push({ card, x, y });
  }
  const courseTag = el('div', 'abs', stage, { left: '220px', top: '190px', font: `600 22px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--slate)' });
  courseTag.textContent = 'YOUR WHOLE COURSE';

  /* hero card (lifts out of the grid) */
  const HI = 5, H = cards[HI];
  const hero = el('div', 'abs', cam, { left: H.x + 'px', top: H.y + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '18px',
    background: '#fff', overflow: 'hidden', boxShadow: '0 30px 70px rgba(15,26,43,.22), 0 0 0 2px rgba(31,163,154,.35)', opacity: 0 });
  el('div', 'abs', hero, { left: 0, top: 0, right: 0, height: '10px', background: 'var(--teal)' });
  const hLab = el('div', 'abs', hero, { left: '24px', top: '34px', font: `700 13px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--teal)' });
  hLab.textContent = 'START HERE';
  const hTitle = el('div', 'abs', hero, { left: '24px', top: '60px', width: '200px', font: '800 27px/1.05 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--ink)' });
  hTitle.textContent = 'Assessment explainer';
  const play = el('div', 'abs', hero, { left: '240px', top: '60px', width: '72px', height: '72px', borderRadius: '50%', background: 'var(--teal)', boxShadow: '0 8px 22px rgba(31,163,154,.45)' });
  play.innerHTML = '<svg width="72" height="72"><path d="M29 22 L52 36 L29 50 Z" fill="#fff"/></svg>';
  el('div', 'abs', hero, { left: '24px', top: '150px', width: '292px', height: '8px', borderRadius: '4px', background: 'var(--chalk)' });
  const prog = el('div', 'abs', hero, { left: '24px', top: '150px', width: '292px', height: '8px', borderRadius: '4px', background: 'var(--teal)', transformOrigin: '0% 50%' });
  const check = el('div', 'abs', hero, { left: '268px', top: '140px', width: '50px', height: '50px', borderRadius: '50%', background: 'var(--teal)', opacity: 0 });
  check.innerHTML = '<svg width="50" height="50"><path d="M14 26 L22 34 L37 17" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const glow = el('div', 'abs', cam, { left: '560px', top: '300px', width: '800px', height: '520px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(31,163,154,.28), transparent)', opacity: 0 });
  cam.insertBefore(glow, hero);

  /* four teal tags (the slide's bullets) */
  const tagRow = el('div', 'abs', stage, { left: '80px', right: '80px', top: '96px', display: 'flex', justifyContent: 'center', gap: '24px' });
  const tags = ['Tricky concepts', 'Stable content', 'Procedures', 'Flipped weeks'].map((t) => {
    const p = el('div', '', tagRow, { padding: '18px 32px', borderRadius: '999px', background: 'var(--teal)', color: '#fff',
      font: '700 30px/1 Inter', letterSpacing: '-.02em', boxShadow: '0 14px 30px rgba(31,163,154,.3)' });
    p.textContent = t; return p;
  });

  /* students */
  const studs = [];
  for (let i = 0; i < 9; i++) {
    const s = el('div', 'abs', stage, { left: 960 - 4 * 70 - 24 + i * 70 + 'px', top: '850px', width: '48px', height: '62px' });
    s.innerHTML = `<svg width="48" height="62"><circle cx="24" cy="15" r="13" fill="${i % 3 === 1 ? '#1FA39A' : '#8A95A8'}"/><path d="M2 62 Q2 34 24 34 Q46 34 46 62 Z" fill="${i % 3 === 1 ? '#1FA39A' : '#8A95A8'}"/></svg>`;
    studs.push(s);
  }

  /* envelopes */
  const rnd = ctx.rand(7);
  const envs = [];
  for (let i = 0; i < 10; i++) {
    const side = i % 2 ? 1 : -1;
    const sx = 960 + side * (760 + rnd() * 160), sy = 180 + rnd() * 720;
    const e = el('div', 'abs', stage, { left: sx - 45 + 'px', top: sy - 32 + 'px', width: '90px', height: '64px', opacity: 0 });
    e.innerHTML = '<svg width="90" height="64"><rect x="3" y="3" width="84" height="58" rx="8" fill="#E8665A"/><path d="M8 10 L45 38 L82 10" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    envs.push({ e, dx: 960 - sx + (rnd() - 0.5) * 220, dy: 560 - sy + (rnd() - 0.5) * 140, rot: (rnd() - 0.5) * 50 });
  }

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  tl.to(drift, { scale: 1.03, x: -10, duration: ctx.dur, ease: 'none' }, 0);
  tl.from(cards.map((c) => c.card), { opacity: 0, y: 30, scale: 0.94, duration: 0.6, stagger: 0.03, ease: 'back.out(1.5)' }, 0);
  tl.from(courseTag, { opacity: 0, x: -20, duration: 0.5 }, 0.2);

  // "whole course": dims and slides back
  gsap.set(back, { filter: 'blur(0px) saturate(1)' });
  tl.to(back, { scale: 0.86, y: 40, opacity: 0.35, filter: 'blur(2px) saturate(0.6)', duration: 1.0, ease: 'power3.inOut' }, whole);
  tl.to(courseTag, { opacity: 0, y: -10, duration: 0.5 }, whole + 0.2);

  // "helps most": tags drop in
  tl.from(tags, { y: -90, opacity: 0, scale: 0.8, rotation: (i) => (i % 2 ? 4 : -4), duration: 0.7, stagger: 0.1, ease: 'back.out(1.8)' }, helps - 0.1);

  // "one assessment explainer": card lifts forward, camera pushes in
  // hero placed at its position inside the scaled-back layer, then lifts to centre
  const bx = 960 + (H.x + CW / 2 - 960) * 0.86 - (H.x + CW / 2), by = 600 + (H.y + CH / 2 - 600) * 0.86 + 40 - (H.y + CH / 2);
  gsap.set(hero, { x: bx, y: by, scale: 0.86 });
  tl.set(hero, { opacity: 0.35 }, one - 0.05);
  tl.set(H.card, { opacity: 0 }, one - 0.05);
  tl.to(hero, { opacity: 1, duration: 0.3 }, one - 0.05);
  tl.to(hero, { x: 960 - (H.x + CW / 2), y: 560 - (H.y + CH / 2), scale: 1.9, duration: 1.1, ease: 'back.out(1.3)' }, one - 0.05);
  tl.to(glow, { opacity: 1, duration: 0.8 }, one + 0.3);
  tl.to(back, { opacity: 0.18, duration: 0.8 }, one);
  tl.to(cam, { scale: 1.1, duration: 1.4, ease: 'expo.inOut' }, assessmentPush());
  function assessmentPush() { return ctx.at(1, 'assessment') - 0.1; }
  tl.to(tags, { opacity: 0.55, y: -6, duration: 0.6, stagger: 0.04 }, expl);
  gsap.set(prog, { scaleX: 0 });
  tl.to(prog, { scaleX: 1, duration: ctx.dur - expl - 0.2, ease: 'none' }, expl);
  tl.from(play, { scale: 0, duration: 0.5, ease: 'back.out(2)' }, expl);

  // "every student"
  tl.from(studs, { y: 40, opacity: 0, scale: 0.6, duration: 0.5, stagger: 0.05, ease: 'back.out(1.8)' }, student - 0.15);
  tl.to(studs, { y: -6, duration: 0.25, stagger: 0.04, yoyo: true, repeat: 1, ease: 'sine.inOut' }, ctx.at(2, 'needs'));

  // "same emails": envelopes fly in and dissolve against the card
  envs.forEach((v, i) => {
    const t = same - 0.5 + i * 0.07;
    tl.fromTo(v.e, { opacity: 0, scale: 0.7, rotation: -v.rot }, { opacity: 1, scale: 1, rotation: 0, duration: 0.25, immediateRender: false }, t);
    tl.to(v.e, { x: v.dx, y: v.dy, rotation: v.rot, duration: 0.6, ease: 'power2.in' }, t);
    tl.to(v.e, { opacity: 0, scale: 0.3, duration: 0.25, ease: 'power2.in' }, t + 0.5);
  });
  tl.to(hero, { x: '+=6', duration: 0.06, yoyo: true, repeat: 3, ease: 'sine.inOut' }, emails);
  tl.fromTo(check, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2.2)', immediateRender: false }, emails + 0.4);
  tl.to(glow, { opacity: 0.6, scale: 1.08, duration: 1.2, ease: 'sine.inOut' }, emails + 0.4);
});
