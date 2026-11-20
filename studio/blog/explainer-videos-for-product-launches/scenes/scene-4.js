/* Scene 4 — "Build it from your existing launch deck. Cut internal slides and swap labels for claims:
 * Reminders becomes, reminders go out on your schedule, not when you remember."
 * Storyboard: night stage with the launch deck fanned out wide. On "Cut" two slides get stamped INTERNAL;
 * on "internal" they slide off-frame and the deck closes ranks. On "claims" the camera pushes onto
 * the remaining "Reminders" slide, whose label grows to 140px. On "reminders go out" the label is
 * deleted and retyped as the claim at 90px in paper, with "your schedule" in launch orange.
 * A small caption bar slides up beneath to nod at silent viewing. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return Number.isFinite(v) ? v : f; };
  const deckT = A(0, 'deck', 2.6), cutT = A(1, 'Cut', 3.45), intT = A(1, 'internal', 3.75);
  const claimsT = A(1, 'claims', 4.9), remT = A(1, 'Reminders', 5.4), goT = A(1, 'go', 6.6);
  const schedT = A(1, 'schedule', 7.3), notT = A(1, 'not', 8.0), rememberT = A(1, 'remember', 9.4);
  const MONO = 'ui-monospace, Menlo, monospace', DISP = 'Inter Display, Inter, sans-serif';

  stage.style.background = 'radial-gradient(70% 60% at 50% 48%, #1d2540 0%, var(--night) 70%)';
  const glow = el('div', 'abs', stage, { left: '460px', top: '240px', width: '1000px', height: '600px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(61,123,255,.22), transparent)', filter: 'blur(20px)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 520px' });

  const header = el('div', 'abs', cam, { left: '0', width: '1920px', top: '150px', textAlign: 'center', font: `600 24px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--haze)' });
  header.textContent = 'YOUR LAUNCH DECK';

  /* ---- deck cards ---- */
  const W = 420, H = 236, CX = 960, CY = 540;
  const pos = (k) => ({ left: CX - W / 2 + k * 235, top: CY - H / 2 + k * k * 9, rotation: k * 3.5 });
  const spec = [
    { k: -3, img: 'slide-1.png' }, { k: -2, internal: 'Q3 hiring plan' }, { k: -1, img: 'slide-2.png' },
    { k: 0, hero: true }, { k: 1, internal: 'Sprint retro notes' }, { k: 2, img: 'slide-3.png' }, { k: 3, img: 'slide-4.png' },
  ];
  const cards = spec.map((s) => {
    const p = pos(s.k);
    const c = el('div', 'abs', cam, { left: p.left + 'px', top: p.top + 'px', width: W + 'px', height: H + 'px', borderRadius: '12px', overflow: 'hidden',
      zIndex: 10 - Math.abs(s.k), background: s.hero ? 'linear-gradient(160deg, #263050, var(--ink))' : 'var(--paper)',
      boxShadow: '0 30px 70px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.08)' });
    gsap.set(c, { rotation: p.rotation });
    if (s.img) { const im = el('img', 'abs', c, { inset: 0, width: '100%', height: '100%', objectFit: 'cover' }); im.src = ctx.asset(s.img); }
    let stamp = null;
    if (s.internal) {
      const t = el('div', 'abs', c, { left: '28px', top: '30px', font: `800 30px/1.1 ${DISP}`, letterSpacing: '-.03em', color: 'var(--ink)' }); t.textContent = s.internal;
      [0, 1, 2].forEach((j) => el('div', 'abs', c, { left: '28px', top: 96 + j * 30 + 'px', width: 300 - j * 60 + 'px', height: '12px', borderRadius: '6px', background: 'rgba(27,34,51,.15)' }));
      stamp = el('div', 'abs', c, { left: '80px', top: '120px', padding: '10px 22px', border: '5px solid var(--launch)', borderRadius: '8px', color: 'var(--launch)',
        font: `800 40px/1 ${MONO}`, letterSpacing: '.12em', background: 'rgba(247,244,238,.85)', opacity: 0 });
      stamp.textContent = 'INTERNAL';
      gsap.set(stamp, { rotation: -12 });
    }
    return { c, s, stamp };
  });
  const hero = cards.find((x) => x.s.hero).c;
  const internals = cards.filter((x) => x.s.internal);
  const others = cards.filter((x) => !x.s.hero && !x.s.internal);

  /* hero contents */
  const tag = el('div', 'abs', hero, { left: '80px', top: '80px', font: `600 24px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--haze)', opacity: 0 });
  const mini = el('div', 'abs', hero, { left: '30px', top: '30px', font: `600 14px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--haze)' });
  mini.textContent = 'SLIDE 4';
  const bars = [0, 1].map((j) => el('div', 'abs', hero, { left: '30px', top: 150 + j * 28 + 'px', width: 260 - j * 80 + 'px', height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,.14)' }));
  const label = el('div', 'abs', hero, { left: '30px', top: '78px', font: `800 34px/1 ${DISP}`, letterSpacing: '-.04em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  const labelTxt = el('span', '', label, {});
  const LABEL = 'Reminders';
  const cursor = el('span', '', label, { display: 'inline-block', width: '0.06em', height: '0.85em', marginLeft: '0.06em', verticalAlign: '-0.05em', background: 'var(--launch)', opacity: 0 });

  const claim = el('div', 'abs', hero, { left: '80px', top: '150px', width: '1440px', font: `800 90px/1.08 ${DISP}`, letterSpacing: '-.035em', color: 'var(--paper)' });
  const chars = [], hotSpans = [];
  'Reminders go out on your schedule, not when you remember.'.split(' ').forEach((w, wi, arr) => {
    const ws = el('span', '', claim, { display: 'inline-block', whiteSpace: 'nowrap' });
    const hot = w === 'your' || w === 'schedule,';
    [...w].forEach((ch) => {
      const sp = el('span', '', ws, { opacity: 0 });
      sp.textContent = ch;
      if (hot && ch !== ',') { sp.style.color = 'var(--launch)'; hotSpans.push(sp); }
      chars.push(sp);
    });
    if (wi < arr.length - 1) { claim.appendChild(document.createTextNode(' ')); chars.push(null); }
  });
  const realChars = chars.filter(Boolean);
  const SPLIT1 = realChars.indexOf(hotSpans[hotSpans.length - 1]) + 2; // through "schedule,"

  /* caption bar */
  const cap = el('div', 'abs', stage, { left: '960px', top: '900px', display: 'flex', alignItems: 'center', gap: '18px', padding: '16px 28px',
    borderRadius: '14px', background: 'rgba(14,18,32,.88)', boxShadow: '0 20px 50px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.1)', zIndex: 30 });
  const cc = el('div', '', cap, { font: `700 20px/1 ${MONO}`, letterSpacing: '.1em', color: 'var(--night)', background: 'var(--paper)', padding: '6px 10px', borderRadius: '6px' });
  cc.textContent = 'CC';
  const capTxt = el('div', '', cap, { font: `600 30px/1 Inter, sans-serif`, color: 'var(--paper)', whiteSpace: 'nowrap' });
  capTxt.textContent = '…not when you remember.';
  gsap.set(cap, { xPercent: -50, opacity: 0, y: 60 });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- per-frame typing ---- */
  const st = { del: 0, typ: 0, cur: 0 };
  ctx.onFrame((t) => {
    labelTxt.textContent = LABEL.slice(0, Math.max(0, LABEL.length - Math.round(st.del)));
    const n = Math.round(st.typ);
    realChars.forEach((c, i) => { c.style.opacity = i < n ? 1 : 0; });
    if (n <= 0) { if (cursor.parentNode !== label) label.appendChild(cursor); cursor.style.fontSize = ''; }
    else { const last = realChars[n - 1]; if (last.nextSibling !== cursor) last.after(cursor); }
    const typing = st.typ > 0 && st.typ < realChars.length;
    const blink = typing ? 1 : (Math.floor(t * 2.4) % 2 ? 0.15 : 1);
    cursor.style.opacity = st.cur * blink;
    tag.textContent = t < goT - 0.1 ? 'HEADLINE · LABEL' : 'HEADLINE · CLAIM';
  });

  /* ---- timeline ---- */
  // opening: deck fans in
  cards.forEach(({ c, s }, i) => {
    const order = Math.abs(s.k);
    tl.from(c, { y: 140, opacity: 0, rotation: 0, duration: 0.8, ease: 'expo.out' }, 0.02 + order * 0.07);
  });
  tl.from(header, { opacity: 0, y: -16, duration: 0.6, ease: 'expo.out' }, 0.2);
  tl.to(cam, { scale: 1.03, duration: claimsT - 0.4, ease: 'power1.inOut' }, 0);
  // "deck": a quick ripple through the cards
  cards.forEach(({ c, s }) => tl.to(c, { y: -16, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, deckT - 0.15 + (s.k + 3) * 0.04));

  // "Cut": stamps slam
  internals.forEach(({ stamp }, i) => {
    tl.fromTo(stamp, { scale: 2.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.8)', immediateRender: false }, cutT - 0.1 + i * 0.14);
  });
  // "internal": they leave frame
  tl.to(internals[0].c, { x: -1300, y: 120, rotation: -24, duration: 0.7, ease: 'expo.in' }, intT + 0.15);
  tl.to(internals[1].c, { x: 1400, y: -80, rotation: 22, duration: 0.7, ease: 'expo.in' }, intT + 0.25);
  // deck closes ranks
  const remain = cards.filter((x) => !x.s.internal);
  remain.forEach(({ c }, i) => {
    const p = pos(i - 2);
    tl.to(c, { left: p.left, top: p.top, rotation: p.rotation, duration: 0.6, ease: 'expo.out' }, intT + 0.85);
  });

  // "claims": push onto the hero slide
  const zoom = claimsT - 0.35;
  gsap.set(others.map((o) => o.c), { filter: 'blur(0px)' });
  tl.to(others.map((o) => o.c), { opacity: 0, scale: 0.85, filter: 'blur(8px)', duration: 0.7, ease: 'power2.in' }, zoom);
  tl.to(header, { opacity: 0, duration: 0.4 }, zoom);
  tl.to(hero, { left: 160, top: 160, width: 1600, height: 660, rotation: 0, borderRadius: '24px', duration: 1.0, ease: 'expo.inOut',
    boxShadow: '0 50px 120px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.1), 0 0 120px rgba(61,123,255,.18)' }, zoom);
  tl.to(label, { left: 80, top: 160, fontSize: 140, duration: 1.0, ease: 'expo.inOut' }, zoom);
  tl.to([mini, ...bars], { opacity: 0, duration: 0.3 }, zoom);
  tl.to(tag, { opacity: 1, duration: 0.4 }, zoom + 0.8);
  tl.to(glow, { scale: 1.4, opacity: 0.8, duration: 1.0, ease: 'expo.inOut' }, zoom);
  tl.to(cam, { scale: 1.06, duration: ctx.dur - (zoom + 1.0), ease: 'power1.inOut' }, zoom + 1.0);
  tl.fromTo(label, { textShadow: '0 0 0px rgba(255,90,54,0)' }, { textShadow: '0 0 40px rgba(255,90,54,.5)', duration: 0.3, yoyo: true, repeat: 1, immediateRender: false }, remT);

  // "reminders go out…": delete label, type the claim
  tl.to(st, { cur: 1, duration: 0.1 }, goT - 0.6);
  tl.to(st, { del: LABEL.length, duration: 0.3, ease: 'none' }, goT - 0.45);
  tl.to(st, { typ: SPLIT1, duration: Math.max(0.4, schedT + 0.3 - goT), ease: 'none' }, goT - 0.1);
  tl.to(st, { typ: realChars.length, duration: Math.max(0.4, rememberT + 0.35 - notT), ease: 'none' }, Math.max(notT - 0.1, schedT + 0.35));
  tl.fromTo(hotSpans, { textShadow: '0 0 0px rgba(255,90,54,0)' }, { textShadow: '0 0 34px rgba(255,90,54,.7)', duration: 0.35, yoyo: true, repeat: 1, stagger: 0.02, immediateRender: false }, schedT + 0.35);

  // caption bar for silent viewing
  tl.to(cap, { opacity: 1, y: 0, duration: 0.55, ease: 'expo.out' }, notT - 0.2);
});
