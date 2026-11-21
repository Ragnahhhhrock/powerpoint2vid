/* Scene 4: "A breach reporting slide sat still for over a minute while viewers drifted.
 *  As three slides, the length stayed similar, but every topic change brought a new visual."
 * Storyboard: warm paper stage, split layout. Left is one dense card of six grey bullets. A stopwatch
 * chip counts up to "about 70s" while the runtime bar stretches across the frame. On the right, a
 * row of viewer eyes fades away one by one on "drifted". On "three" the card shatters into three
 * cards that slide right, each tagged 15–20s. The runtime bar snaps into three segments of similar
 * total length. On "new visual" each card flashes a fresh amber icon in turn. The camera holds wide
 * on a slow push-in. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';
  const still = ctx.at(0, 'still'), minute = ctx.at(0, 'minute'), drifted = ctx.at(0, 'drifted');
  const three = ctx.at(1, 'three'), visual = ctx.at(1, 'visual');

  stage.style.background = 'radial-gradient(80% 70% at 40% 40%, #fffdf7 0%, var(--paper) 55%, #e9e3d6 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 520px' });

  /* ---------- BEFORE: one dense card ---------- */
  const BIG = { x: 170, y: 190, w: 760, h: 620 };
  const big = el('div', 'abs', cam, { left: BIG.x + 'px', top: BIG.y + 'px', width: BIG.w + 'px', height: BIG.h + 'px', borderRadius: '22px', background: '#fff', boxShadow: '0 40px 90px rgba(27,34,53,.16), 0 4px 14px rgba(27,34,53,.08)', overflow: 'hidden' });
  const bigTag = el('div', 'abs', big, { left: '48px', top: '44px', font: MONO, letterSpacing: '.14em', color: 'var(--mist)' });
  bigTag.textContent = 'BEFORE · 1 SLIDE';
  const bigTitle = el('div', 'abs', big, { left: '48px', top: '84px', font: '800 46px/1.1 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)' });
  bigTitle.textContent = 'Breach reporting';
  const widths = [600, 540, 620, 480, 580, 420];
  const bullets = widths.map((w, i) => {
    const row = el('div', 'abs', big, { left: '48px', top: 190 + i * 66 + 'px', width: '660px', height: '24px' });
    el('div', 'abs', row, { left: 0, top: '4px', width: '16px', height: '16px', borderRadius: '50%', background: '#c9cdd8' });
    el('div', 'abs', row, { left: '36px', top: '2px', width: w - 40 + 'px', height: '20px', borderRadius: '10px', background: '#dfe2e9' });
    return row;
  });

  // stopwatch chip
  const chip = el('div', 'abs', cam, { left: BIG.x + 'px', top: '104px', height: '58px', padding: '0 26px 0 20px', borderRadius: '29px', background: 'var(--ink)', color: 'var(--paper)', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 14px 30px rgba(27,34,53,.25)' });
  chip.innerHTML = `<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="17" r="11" fill="none" stroke="#EF6351" stroke-width="3"/><path d="M15 17 L15 10" stroke="#EF6351" stroke-width="3" stroke-linecap="round"/><path d="M11 3 H19" stroke="#EF6351" stroke-width="3" stroke-linecap="round"/></svg>`;
  const chipTxt = el('div', '', chip, { font: '700 28px/1 Inter', letterSpacing: '-.01em', fontVariantNumeric: 'tabular-nums' });

  // viewers (eyes)
  const eyeLab = el('div', 'abs', cam, { left: '1080px', top: '330px', font: MONO, letterSpacing: '.14em', color: 'var(--mist)' });
  eyeLab.textContent = 'VIEWERS';
  const eyes = [];
  for (let i = 0; i < 6; i++) {
    const e = el('div', 'abs', cam, { left: 1080 + (i % 3) * 210 + 'px', top: 390 + Math.floor(i / 3) * 170 + 'px', width: '150px', height: '90px' });
    e.innerHTML = `<svg width="150" height="90" viewBox="0 0 150 90"><path d="M8 45 Q75 -10 142 45 Q75 100 8 45 Z" fill="#fff" stroke="#1B2235" stroke-width="5" stroke-linejoin="round"/><circle cx="75" cy="45" r="20" fill="#1B2235"/><circle cx="82" cy="38" r="6" fill="#fff"/></svg>`;
    eyes.push(e);
  }

  /* ---------- runtime bar (the anchor) ---------- */
  const BX = 170, BW = 1580, BY = 900;
  const barLab = el('div', 'abs', cam, { left: BX + 'px', top: BY - 40 + 'px', font: MONO, letterSpacing: '.14em', color: 'var(--mist)' });
  barLab.textContent = 'RUNTIME';
  const track = el('div', 'abs', cam, { left: BX + 'px', top: BY + 'px', width: BW + 'px', height: '14px', borderRadius: '7px', background: 'rgba(27,34,53,.08)' });
  const fill = el('div', 'abs', cam, { left: BX + 'px', top: BY + 'px', width: BW + 'px', height: '14px', borderRadius: '7px', background: 'linear-gradient(90deg, #f2a93b, #ef6351)', transformOrigin: '0% 50%', boxShadow: '0 0 20px rgba(239,99,81,.35)' });

  /* ---------- AFTER: three cards ---------- */
  const CW = 500, CH = 600, CY = 200, XS = [170, 710, 1250];
  const icons = [
    `<svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="34" r="22" fill="none" stroke="#fff" stroke-width="5"/><path d="M32 34 V20 M32 34 L42 40" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>`,
    `<svg width="64" height="64" viewBox="0 0 64 64"><rect x="14" y="8" width="36" height="48" rx="5" fill="none" stroke="#fff" stroke-width="5"/><path d="M22 22 H42 M22 32 H42 M22 42 H34" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>`,
    `<svg width="64" height="64" viewBox="0 0 64 64"><rect x="8" y="12" width="48" height="40" rx="6" fill="none" stroke="#fff" stroke-width="5"/><circle cx="22" cy="26" r="5" fill="#fff"/><path d="M12 48 L28 34 L38 42 L46 34 L54 42" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round"/></svg>`,
  ];
  const texts = ['Report to the privacy team within one hour', 'Use the breach form, not email', null];
  const cards = XS.map((x, i) => {
    const c = el('div', 'abs', cam, { left: x + 'px', top: CY + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '22px', background: '#fff', boxShadow: '0 34px 80px rgba(27,34,53,.15), 0 4px 12px rgba(27,34,53,.07)', overflow: 'hidden' });
    const num = el('div', 'abs', c, { left: '44px', top: '44px', font: MONO, letterSpacing: '.14em', color: 'var(--mist)' });
    num.textContent = 'SLIDE ' + (i + 1);
    const pill = el('div', 'abs', c, { right: '40px', top: '34px', padding: '10px 18px', borderRadius: '20px', background: 'rgba(46,196,182,.14)', color: '#178f84', font: '700 24px/1 Inter', fontVariantNumeric: 'tabular-nums' });
    pill.textContent = '15–20s';
    const iconWrap = el('div', 'abs', c, { left: '44px', top: '120px', width: '120px', height: '120px', borderRadius: '30px', background: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 40px rgba(242,169,59,.5)' });
    iconWrap.innerHTML = icons[i];
    const ghost = el('div', 'abs', c, { left: '44px', top: '120px', width: '120px', height: '120px', borderRadius: '30px', border: '3px dashed #dfe2e9' });
    const ring = el('div', 'abs', c, { left: '44px', top: '120px', width: '120px', height: '120px', borderRadius: '30px', border: '5px solid var(--amber)', opacity: 0 });
    if (texts[i]) {
      const tx = el('div', 'abs', c, { left: '44px', top: '290px', width: CW - 88 + 'px', font: '800 44px/1.14 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)' });
      tx.textContent = texts[i];
    } else {
      [380, 320, 260].forEach((w, k) => el('div', 'abs', c, { left: '44px', top: 300 + k * 56 + 'px', width: w + 'px', height: '22px', borderRadius: '11px', background: '#dfe2e9' }));
    }
    const seg = el('div', 'abs', cam, { left: x + 'px', top: BY + 'px', width: CW + 'px', height: '14px', borderRadius: '7px', background: 'var(--teal)', boxShadow: '0 0 18px rgba(46,196,182,.4)', transformOrigin: '0% 50%' });
    return { c, iconWrap, ghost, ring, seg, x };
  });

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.05, blend: 'multiply' });

  const st = { n: 0 };
  ctx.onFrame(() => { chipTxt.textContent = 'about ' + Math.round(st.n) + 's'; });

  /* ---------- timeline ---------- */
  gsap.set(cards.map((k) => k.c), { opacity: 0 });
  gsap.set(cards.map((k) => k.iconWrap), { scale: 0, opacity: 0 });
  gsap.set(cards.map((k) => k.seg), { opacity: 0, scaleX: 0.6 });
  gsap.set(fill, { scaleX: 0 });
  gsap.set(big, { filter: 'brightness(1) blur(0px)' });

  tl.to(cam, { scale: 1.035, duration: ctx.dur, ease: 'none' }, 0);
  tl.fromTo(big, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 }, 0.05);
  tl.from(bullets, { opacity: 0, x: -20, duration: 0.4, stagger: 0.06 }, 0.3);
  tl.from([chip, barLab, track], { opacity: 0, y: 14, duration: 0.5, stagger: 0.08 }, 0.25);
  tl.from(eyeLab, { opacity: 0, duration: 0.5 }, 0.6);
  tl.from(eyes, { opacity: 0, scale: 0.6, duration: 0.5, ease: 'back.out(1.8)', stagger: 0.08 }, 0.65);

  // the slide sits still while time piles up
  const runEnd = Math.max(minute + 0.6, 2.5);
  tl.to(st, { n: 70, duration: runEnd - 0.9, ease: 'power1.in' }, 0.9);
  tl.to(fill, { scaleX: 1, duration: runEnd - 0.9, ease: 'power1.in' }, 0.9);
  tl.to(chip, { scale: 1.08, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, runEnd);

  // viewers drift
  eyes.forEach((e, i) => {
    tl.to(e, { opacity: 0, y: 30 + (i % 2) * 20, rotation: (i % 2 ? 8 : -8), duration: 0.6, ease: 'power2.in' }, drifted + i * 0.13);
  });
  tl.to(eyeLab, { opacity: 0, duration: 0.4 }, drifted + 0.8);

  // "three": shatter into three cards
  tl.to(big, { x: 6, duration: 0.05, yoyo: true, repeat: 3, ease: 'none' }, three - 0.25);
  tl.to(big, { opacity: 0, scale: 0.94, filter: 'brightness(1.2) blur(6px)', duration: 0.35, ease: 'power2.in' }, three - 0.05);
  tl.to(chip, { opacity: 0, y: -14, duration: 0.35 }, three);
  cards.forEach((k, i) => {
    const dx = (BIG.x + BIG.w / 2) - (k.x + CW / 2);
    tl.to(k.c, { opacity: 1, duration: 0.25 }, three + i * 0.08);
    tl.fromTo(k.c, { x: dx, scale: 0.86, rotation: (i - 1) * 4 }, { x: 0, scale: 1, rotation: 0, duration: 0.95, ease: 'expo.out', immediateRender: false }, three + i * 0.08);
  });
  // runtime bar snaps into three segments
  tl.to(fill, { opacity: 0, duration: 0.25 }, three + 0.2);
  tl.to(cards.map((k) => k.seg), { opacity: 1, scaleX: 1, duration: 0.6, ease: 'back.out(2)', stagger: 0.1 }, three + 0.25);

  // "new visual": each card flashes a fresh amber icon
  cards.forEach((k, i) => {
    const t = visual - 0.15 + i * 0.28;
    tl.to(k.iconWrap, { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(2)' }, t);
    tl.to(k.ghost, { opacity: 0, duration: 0.2 }, t);
    tl.fromTo(k.ring, { opacity: 0.9, scale: 1 }, { opacity: 0, scale: 1.7, duration: 0.7, ease: 'power2.out', immediateRender: false }, t + 0.05);
    tl.to(k.c, { y: -10, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
  });
});
