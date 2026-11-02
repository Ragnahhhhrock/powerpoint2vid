/* Scene 2 — "Start by sorting your decks into three groups. Stable policies and company history suit video,
 * things that change often stay out, and welcomes and Q&A stay live."
 * Storyboard: Paper stage, wide. A messy pile of slide cards drops in on "sorting your decks". On "three
 * groups" three bins pop up and the pile fans into a row. Stable cards light teal and glide into "Video" on
 * "suit video". Change-often cards light coral and bounce into "Keep out" on "stay out". The welcome/Q&A
 * cards light sun-yellow and land in "Live" (speech bubble) on "stay live". The camera pushes in on the
 * pile, dollies toward each bin in turn, then pulls back to hold all three. Bullets become one-word labels. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9&]/g, '');
  const W = (i, w) => {
    const b = ctx.beats[i];
    const hit = b && b.words && b.words.find((x) => norm(x.w) === norm(w));
    return hit ? hit.t : ctx.at(i, w);
  };
  const sorting = W(0, 'sorting'), three = W(0, 'three'), groups = W(0, 'groups');
  const stable = W(1, 'Stable'), suit = W(1, 'suit'), video = W(1, 'video');
  const change = W(1, 'change'), out = W(1, 'out'), welcomes = W(1, 'welcomes'), live = W(1, 'live');
  const liveStay = Math.min(live - 0.3, ctx.dur - 2.2);

  stage.style.background = 'radial-gradient(80% 70% at 50% 32%, #fffdf8 0%, var(--paper) 58%, #e9e2d5 100%)';
  const drift = el('div', 'abs', stage, { inset: 0 });
  const cam = el('div', 'abs', drift, { inset: 0, transformOrigin: '960px 560px' });

  /* soft light pools */
  el('div', 'abs', cam, { left: '360px', top: '180px', width: '1200px', height: '520px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,197,71,.12), transparent)' });

  /* headline */
  const tag = el('div', 'abs', cam, { left: 0, width: '1920px', top: '96px', textAlign: 'center', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.22em', color: 'var(--slate)' });
  tag.textContent = 'AUDIT YOUR DECKS';
  const head = el('div', 'abs', cam, { left: 0, width: '1920px', top: '134px', textAlign: 'center', font: '900 92px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--ink)' });
  const headWords = ctx.split(head, 'Three groups', 'word');

  /* bins */
  const BINS = [
    { x: 480, name: 'Video', sub: 'STABLE', col: '#1FB5A8', rgb: '31,181,168', txt: '#fff',
      icon: '<svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="20" fill="none" stroke="#fff" stroke-width="3"/><path d="M17 13 L32 22 L17 31 Z" fill="#fff"/></svg>' },
    { x: 960, name: 'Keep out', sub: 'CHANGES OFTEN', col: '#FF6B5B', rgb: '255,107,91', txt: '#fff',
      icon: '<svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" fill="none" stroke="#fff" stroke-width="3.5"/><path d="M9 35 L35 9" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/></svg>' },
    { x: 1440, name: 'Live', sub: 'NEEDS A HUMAN', col: '#FFC547', rgb: '255,197,71', txt: '#1B2233',
      icon: '<svg width="44" height="44" viewBox="0 0 44 44"><path d="M6 8 H38 a3 3 0 0 1 3 3 V28 a3 3 0 0 1 -3 3 H18 L9 39 V31 H6 a3 3 0 0 1 -3 -3 V11 a3 3 0 0 1 3 -3 Z" fill="none" stroke="#1B2233" stroke-width="3.2" stroke-linejoin="round"/><circle cx="14" cy="20" r="2.6" fill="#1B2233"/><circle cx="22" cy="20" r="2.6" fill="#1B2233"/><circle cx="30" cy="20" r="2.6" fill="#1B2233"/></svg>' },
  ];
  const BTOP = 690;
  BINS.forEach((b) => {
    b.back = el('div', 'abs', cam, { left: b.x - 185 + 'px', top: BTOP + 'px', width: '370px', height: '280px', borderRadius: '22px 22px 18px 18px',
      background: `linear-gradient(180deg, rgba(${b.rgb},.10), rgba(${b.rgb},.28))`, border: `2px solid rgba(${b.rgb},.45)`, transformOrigin: '50% 100%' });
    b.glow = el('div', 'abs', cam, { left: b.x - 260 + 'px', top: BTOP - 40 + 'px', width: '520px', height: '360px', borderRadius: '50%',
      background: `radial-gradient(closest-side, rgba(${b.rgb},.45), transparent)`, opacity: 0 });
  });

  /* cards */
  const R = ctx.rand(7);
  const GROUP = [0, 1, 0, 2, 0, 1, 2]; // row order is mixed, sorting un-mixes it
  const counts = [0, 0, 0], totals = [3, 2, 2];
  const cards = GROUP.map((g, i) => {
    const c = el('div', 'abs', cam, { left: 0, top: 0, width: '200px', height: '124px', borderRadius: '12px', background: '#fff',
      boxShadow: '0 0 0 0px rgba(255,255,255,0), 0 14px 30px rgba(15,22,38,.16)' });
    el('div', 'abs', c, { left: '16px', top: '18px', width: '96px', height: '13px', borderRadius: '7px', background: '#d9dde5' });
    const tint = el('div', 'abs', c, { left: '16px', top: '18px', width: '96px', height: '13px', borderRadius: '7px', background: BINS[g].col, opacity: 0 });
    [150, 128, 104].forEach((w, k) => el('div', 'abs', c, { left: '16px', top: 48 + k * 17 + 'px', width: w + 'px', height: '8px', borderRadius: '4px', background: '#eceef2' }));
    el('div', 'abs', c, { left: '150px', top: '16px', width: '34px', height: '34px', borderRadius: '8px', background: '#f1efe9' });
    const k = counts[g]++;
    const b = BINS[g];
    return {
      c, tint, g,
      pile: { x: 960 + (R() - 0.5) * 110, y: 430 + (R() - 0.5) * 70, r: (R() - 0.5) * 30 },
      row: { x: 960 + (i - 3) * 210, y: 450, r: (i % 2 ? 3 : -3) },
      bin: { x: b.x + (k - (totals[g] - 1) / 2) * 78, y: 772 - k * 8, r: (k - (totals[g] - 1) / 2) * 8 },
    };
  });

  /* bin fronts (in front of cards) */
  BINS.forEach((b) => {
    b.front = el('div', 'abs', cam, { left: b.x - 200 + 'px', top: '792px', width: '400px', height: '190px', borderRadius: '20px',
      background: `linear-gradient(160deg, rgba(${b.rgb},1) 0%, rgba(${b.rgb},.86) 100%)`,
      boxShadow: `0 26px 50px rgba(${b.rgb},.35), inset 0 2px 0 rgba(255,255,255,.4)`, transformOrigin: '50% 100%' });
    const ic = el('div', 'abs', b.front, { left: '30px', top: '44px', width: '44px', height: '44px' }); ic.innerHTML = b.icon;
    const nm = el('div', 'abs', b.front, { left: '94px', top: '38px', font: '800 56px/1 Inter Display, Inter', letterSpacing: '-.035em', color: b.txt });
    nm.textContent = b.name;
    const sb = el('div', 'abs', b.front, { left: '96px', top: '112px', font: '600 18px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: b.txt, opacity: 0.78 });
    sb.textContent = b.sub;
  });

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---- timeline ---- */
  tl.to(drift, { x: -24, y: -8, duration: ctx.dur, ease: 'none' }, 0);
  gsap.set(cam, { scale: 1.04, y: 30 });
  tl.from(tag, { opacity: 0, y: 14, duration: 0.6 }, 0.05);
  tl.from(headWords, { opacity: 0, y: 40, duration: 0.7, stagger: 0.08, ease: 'back.out(1.6)' }, 0.1);

  // pile drops on "sorting your decks"
  cards.forEach((o, i) => {
    gsap.set(o.c, { xPercent: -50, yPercent: -50, x: o.pile.x, y: o.pile.y - 700, rotation: o.pile.r * 2, opacity: 0 });
    const t = sorting - 0.25 + i * 0.06;
    tl.to(o.c, { opacity: 1, duration: 0.15 }, t);
    tl.to(o.c, { y: o.pile.y, rotation: o.pile.r, duration: 0.7, ease: 'back.out(1.3)' }, t);
  });
  tl.to(cam, { scale: 1.1, y: 70, duration: 1.1, ease: 'power2.out' }, sorting - 0.1);

  // "three groups": bins rise, camera opens up, pile fans into a row
  BINS.forEach((b, i) => {
    gsap.set([b.back, b.front], { opacity: 0, scaleY: 0.3, y: 60 });
    tl.to([b.back, b.front], { opacity: 1, scaleY: 1, y: 0, duration: 0.7, ease: 'back.out(1.7)' }, three - 0.1 + i * 0.1);
  });
  tl.to(cam, { scale: 1, y: 0, duration: 1.2, ease: 'expo.inOut' }, three - 0.35);
  cards.forEach((o, i) => {
    tl.to(o.c, { x: o.row.x, y: o.row.y, rotation: o.row.r, duration: 0.8, ease: 'back.out(1.4)' }, groups + i * 0.05);
  });

  const lightUp = (g, t) => cards.filter((o) => o.g === g).forEach((o, k) => {
    const b = BINS[g];
    tl.to(o.tint, { opacity: 1, duration: 0.3 }, t + k * 0.08);
    tl.to(o.c, { y: o.row.y - 26, boxShadow: `0 0 0 5px rgba(${b.rgb},1), 0 22px 40px rgba(${b.rgb},.35)`, duration: 0.45, ease: 'back.out(2)' }, t + k * 0.08);
  });
  const land = (g, t) => {
    const b = BINS[g];
    tl.to(b.glow, { opacity: 1, duration: 0.25 }, t);
    tl.to(b.glow, { opacity: 0.35, duration: 0.8 }, t + 0.3);
    tl.to(b.front, { scaleY: 0.94, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
  };

  // "Stable ... suit video": teal cards glide into Video
  lightUp(0, stable);
  tl.to(cam, { x: 70, scale: 1.04, duration: 1.4, ease: 'expo.inOut' }, stable - 0.1);
  cards.filter((o) => o.g === 0).forEach((o, k) => {
    const t = suit - 0.2 + k * 0.14;
    tl.to(o.c, { x: o.bin.x, y: o.bin.y, rotation: o.bin.r, scale: 0.82, duration: 0.85, ease: 'power3.inOut' }, t);
  });
  land(0, suit + 0.6);

  // "change often ... stay out": coral cards bounce into Keep out
  lightUp(1, change - 0.1);
  tl.to(cam, { x: 0, duration: 1.2, ease: 'expo.inOut' }, change - 0.4);
  cards.filter((o) => o.g === 1).forEach((o, k) => {
    const t = out - 0.45 + k * 0.16;
    tl.to(o.c, { x: o.bin.x, rotation: o.bin.r + (k ? 14 : -14), scale: 0.82, duration: 0.95, ease: 'power1.inOut' }, t);
    tl.to(o.c, { y: o.row.y - 170, duration: 0.32, ease: 'power2.out' }, t);
    tl.to(o.c, { y: o.bin.y, duration: 0.63, ease: 'bounce.out' }, t + 0.32);
    tl.to(o.c, { rotation: o.bin.r, duration: 0.4, ease: 'back.out(2)' }, t + 0.8);
  });
  land(1, out + 0.1);

  // "welcomes and Q&A stay live": sun cards land in Live
  lightUp(2, welcomes);
  tl.to(cam, { x: -70, duration: 1.2, ease: 'expo.inOut' }, welcomes - 0.2);
  cards.filter((o) => o.g === 2).forEach((o, k) => {
    const t = liveStay + k * 0.14;
    tl.to(o.c, { x: o.bin.x, y: o.bin.y, rotation: o.bin.r, scale: 0.82, duration: 0.75, ease: 'back.out(1.3)' }, t);
  });
  land(2, liveStay + 0.55);

  // pull back to hold all three
  tl.to(cam, { x: 0, scale: 0.97, y: -6, duration: Math.max(1.2, ctx.dur - liveStay - 0.1), ease: 'power2.inOut' }, liveStay + 0.1);
  tl.to(BINS.map((b) => b.glow), { opacity: 0.5, duration: 0.6 }, liveStay + 0.9);
});
