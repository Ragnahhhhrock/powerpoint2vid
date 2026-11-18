/* Scene 3: "Put explainers on your website beside the content they explain. Use YouTube to be found
 * in search. On LinkedIn, make the first few seconds carry the point."
 * Storyboard: night stage, wide shot of three channel cards that start as faint placeholders and
 * light up one at a time. "website": a paper-toned browser frame builds, and the video slides in
 * BESIDE the product copy. "YouTube…search": a search bar types "tutorial", then our coral video
 * climbs from 3rd result to #1. "LinkedIn…first few seconds": a feed card's video lights coral and
 * a 0→3s counter fills its timeline segment, pulsing on "point". One decisive lateral pan carries
 * the camera left to right; a slow push-in runs throughout. Slide title is cut. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const WEB = A(0, 'website', 1.9), BES = A(0, 'beside', 2.6), CON = A(0, 'content', 3.0);
  const YT = A(1, 'YouTube', 4.9), FOUND = A(1, 'found', 5.6), SEARCH = A(1, 'search', 6.1);
  const LI = A(2, 'LinkedIn', 7.0), FIRST = A(2, 'first', 8.1), POINT = Math.max(A(2, 'point', 9.7), FIRST + 1);

  const MONO = 'ui-monospace, Menlo, monospace';
  const px = (n) => n + 'px';
  stage.style.background = 'radial-gradient(70% 60% at 50% 45%, #1a2338 0%, var(--night) 75%)';
  const glowL = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(30% 35% at 20% 30%, rgba(79,163,255,.10), transparent 70%), radial-gradient(30% 35% at 80% 70%, rgba(255,107,74,.10), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  const play = (parent, s, left, top, color) => el('div', 'abs', parent, { left: px(left), top: px(top), width: 0, height: 0, borderLeft: `${s}px solid ${color}`, borderTop: `${s * 0.62}px solid transparent`, borderBottom: `${s * 0.62}px solid transparent` });
  const bar = (parent, l, t, w, h, bg) => el('div', 'abs', parent, { left: px(l), top: px(t), width: px(w), height: px(h), background: bg, borderRadius: px(h / 2) });

  /* ---- card factory ---- */
  const DEF = [['Website', 'EXPLAINERS', '#4FA3FF', '79,163,255'], ['YouTube', 'SEARCH', '#FF6B4A', '255,107,74'], ['LinkedIn', 'FIRST SECONDS', '#3DD6A5', '61,214,165']];
  const cards = DEF.map(([name, sub, col, rgb], i) => {
    const card = el('div', 'abs', cam, { left: px(150 + i * 560), top: '200px', width: '500px', height: '660px', borderRadius: '28px', overflow: 'hidden',
      background: 'linear-gradient(180deg, #1f2940 0%, #161d2c 100%)', border: '1px solid rgba(255,255,255,.08)' });
    gsap.set(card, { boxShadow: `0 40px 80px rgba(0,0,0,.45), 0 0 0px rgba(${rgb},0)` });
    const head = el('div', 'abs', card, { inset: 0 });
    el('div', 'abs', head, { left: '36px', top: '48px', width: '14px', height: '14px', borderRadius: '50%', background: col, boxShadow: `0 0 18px ${col}` });
    const nm = el('div', 'abs', head, { left: '62px', top: '34px', font: '800 42px/1 Inter Display, Inter', letterSpacing: '-.035em', color: '#fff' }); nm.textContent = name;
    const sb = el('div', 'abs', head, { left: '38px', top: '90px', font: `600 18px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--mist)' }); sb.textContent = sub;
    const ix = el('div', 'abs', head, { right: '34px', top: '44px', font: `600 18px/1 ${MONO}`, letterSpacing: '.12em', color: 'rgba(154,166,184,.6)' }); ix.textContent = '0' + (i + 1);
    const body = el('div', 'abs', card, { inset: 0 });
    return { card, head, body, col, rgb };
  });

  /* ---- card 1: website ---- */
  const c1 = cards[0].body;
  const br = el('div', 'abs', c1, { left: '30px', top: '130px', width: '440px', height: '420px', background: 'var(--paper)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,.4)' });
  el('div', 'abs', br, { left: 0, top: 0, width: '440px', height: '40px', background: '#e6e1d6' });
  ['#ff6b4a', '#f5c04a', '#3dd6a5'].forEach((c, k) => el('div', 'abs', br, { left: px(16 + k * 18), top: '15px', width: '10px', height: '10px', borderRadius: '50%', background: c }));
  const url = el('div', 'abs', br, { left: '82px', top: '9px', width: '300px', height: '22px', background: '#fff', borderRadius: '11px', font: `500 13px/22px ${MONO}`, color: '#8a8478', paddingLeft: '14px', boxSizing: 'border-box' }); url.textContent = 'acme.com/product';
  const h1 = bar(br, 24, 62, 230, 16, '#1A2233'), h2 = bar(br, 24, 88, 150, 10, '#c9c2b4');
  const vid1 = el('div', 'abs', br, { left: '24px', top: '116px', width: '220px', height: '150px', borderRadius: '10px', background: 'linear-gradient(135deg, #24304a, #0E1420)', boxShadow: '0 10px 30px rgba(255,107,74,.35), 0 0 0 2px rgba(255,107,74,.7)' });
  el('div', 'abs', vid1, { left: '84px', top: '49px', width: '52px', height: '52px', borderRadius: '50%', background: 'var(--signal)', boxShadow: '0 0 24px rgba(255,107,74,.8)' });
  play(vid1, 18, 104, 64, '#fff');
  bar(vid1, 14, 134, 192, 4, 'rgba(255,255,255,.2)');
  const prog1 = bar(vid1, 14, 134, 192, 4, 'var(--signal)'); prog1.style.transformOrigin = '0 50%';
  const copy = [150, 134, 150, 96].map((w, k) => bar(br, 262, 122 + k * 22, w, 10, '#c9c2b4'));
  const btn = el('div', 'abs', br, { left: '262px', top: '220px', width: '110px', height: '34px', borderRadius: '17px', background: 'var(--signal)' });
  const feats = [0, 1, 2].map((k) => { const f = el('div', 'abs', br, { left: px(24 + k * 136), top: '292px', width: '120px', height: '104px', borderRadius: '10px', background: '#ebe6dc' }); bar(f, 14, 16, 30, 30, '#d6cfc0'); bar(f, 14, 62, 86, 8, '#c9c2b4'); bar(f, 14, 78, 60, 8, '#c9c2b4'); return f; });

  /* ---- card 2: YouTube search ---- */
  const c2 = cards[1].body;
  const sbx = el('div', 'abs', c2, { left: '30px', top: '130px', width: '440px', height: '64px', borderRadius: '32px', background: '#0E1420', border: '2px solid rgba(255,255,255,.12)', boxSizing: 'border-box' });
  el('div', 'abs', sbx, { left: '24px', top: '18px', width: '18px', height: '18px', borderRadius: '50%', border: '3px solid var(--mist)' });
  el('div', 'abs', sbx, { left: '42px', top: '38px', width: '10px', height: '3px', background: 'var(--mist)', transform: 'rotate(45deg)', transformOrigin: '0 50%' });
  const typed = el('div', 'abs', sbx, { left: '66px', top: '14px', font: '600 28px/1.2 Inter', letterSpacing: '-.01em', color: '#fff', whiteSpace: 'nowrap' });
  const caret = el('div', 'abs', sbx, { left: '66px', top: '16px', width: '3px', height: '30px', background: 'var(--signal)' });
  const rows = [0, 1, 2].map((k) => {
    const ours = k === 2;
    const r = el('div', 'abs', c2, { left: '30px', top: px(220 + k * 116), width: '440px', height: '100px' });
    const th = el('div', 'abs', r, { left: 0, top: '5px', width: '160px', height: '90px', borderRadius: '10px', background: ours ? 'linear-gradient(135deg, #2a3756, #0E1420)' : '#283247',
      boxShadow: ours ? '0 0 0 2px rgba(255,107,74,.85), 0 10px 30px rgba(255,107,74,.35)' : 'none' });
    if (ours) { el('div', 'abs', th, { left: '58px', top: '23px', width: '44px', height: '44px', borderRadius: '50%', background: 'var(--signal)', boxShadow: '0 0 22px rgba(255,107,74,.8)' }); play(th, 15, 75, 36, '#fff'); }
    bar(r, 178, 16, ours ? 230 : 210, 14, ours ? '#fff' : 'rgba(255,255,255,.25)');
    bar(r, 178, 42, 160, 10, 'rgba(154,166,184,.45)');
    bar(r, 178, 62, 100, 10, 'rgba(154,166,184,.3)');
    return r;
  });
  const ourRow = rows[2];
  const badge = el('div', 'abs', ourRow, { left: '376px', top: '50px', padding: '6px 12px', borderRadius: '8px', background: 'var(--signal)', font: `700 18px/1 ${MONO}`, color: '#fff', letterSpacing: '.06em', boxShadow: '0 0 20px rgba(255,107,74,.6)' });
  badge.textContent = '#1';

  /* ---- card 3: LinkedIn feed ---- */
  const c3 = cards[2].body;
  const av = el('div', 'abs', c3, { left: '30px', top: '132px', width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--sky), var(--mint))' });
  const nb = [bar(c3, 96, 140, 160, 14, 'rgba(255,255,255,.7)'), bar(c3, 96, 164, 100, 10, 'rgba(154,166,184,.45)'), bar(c3, 30, 204, 420, 10, 'rgba(154,166,184,.4)'), bar(c3, 30, 224, 300, 10, 'rgba(154,166,184,.4)')];
  const vid3 = el('div', 'abs', c3, { left: '30px', top: '250px', width: '440px', height: '278px', borderRadius: '14px', overflow: 'hidden', background: 'linear-gradient(135deg, #263250, #0E1420)', border: '2px solid rgba(255,255,255,.1)', boxSizing: 'border-box' });
  const vlight = el('div', 'abs', vid3, { inset: 0, background: 'radial-gradient(60% 70% at 50% 50%, rgba(255,107,74,.35), transparent 75%)', opacity: 0 });
  const count = el('div', 'abs', vid3, { left: 0, width: '436px', top: '82px', textAlign: 'center', font: '900 104px/1 Inter Display, Inter', letterSpacing: '-.05em', color: 'rgba(255,255,255,.35)', fontVariantNumeric: 'tabular-nums' });
  const muted = el('div', 'abs', vid3, { left: '16px', top: '16px', font: `600 15px/1 ${MONO}`, letterSpacing: '.12em', color: 'var(--mist)' }); muted.textContent = 'AUTOPLAY · MUTED';
  const ring = el('div', 'abs', vid3, { left: '118px', top: '39px', width: '200px', height: '200px', borderRadius: '50%', border: '5px solid var(--signal)', opacity: 0 });
  const TW = 176;
  bar(c3, 30, 546, 440, 8, 'rgba(255,255,255,.1)');
  const zone = bar(c3, 30, 546, TW, 8, 'rgba(255,107,74,.25)');
  const fill = bar(c3, 30, 546, TW, 8, 'var(--signal)'); fill.style.transformOrigin = '0 50%'; fill.style.boxShadow = '0 0 14px rgba(255,107,74,.8)';
  const l0 = el('div', 'abs', c3, { left: '30px', top: '566px', font: `600 16px/1 ${MONO}`, color: 'var(--mist)' }); l0.textContent = '0s';
  const l3 = el('div', 'abs', c3, { left: px(30 + TW - 14), top: '566px', font: `700 16px/1 ${MONO}`, color: 'var(--signal)' }); l3.textContent = '3s';
  const reacts = [0, 1, 2].map((k) => el('div', 'abs', c3, { left: px(30 + k * 16), top: '604px', width: '22px', height: '22px', borderRadius: '50%', background: ['#4FA3FF', '#3DD6A5', '#FF6B4A'][k], border: '2px solid #1a2233' }));
  const rb = bar(c3, 90, 610, 120, 10, 'rgba(154,166,184,.35)');

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- per-frame text ---- */
  const ty = { n: 0 }, sec = { v: 0 };
  const WORD = 'tutorial';
  ctx.onFrame((t) => {
    const n = Math.round(ty.n);
    typed.textContent = WORD.slice(0, n);
    caret.style.left = px(68 + typed.offsetWidth);
    caret.style.opacity = (Math.floor(t * 2.5) % 2 === 0) ? '1' : '0';
    count.textContent = sec.v.toFixed(1) + 's';
  });

  /* ---- timeline ---- */
  gsap.set(cards.map((c) => c.card), { opacity: 0 });
  gsap.set(cards.flatMap((c) => [c.head, c.body]), { opacity: 0 });
  gsap.set(cam, { x: 36, scale: 1 });
  tl.to(cards.map((c) => c.card), { opacity: 0.35, duration: 0.6, stagger: 0.1 }, 0.05);
  tl.from(cards.map((c) => c.card), { y: 50, duration: 0.8, stagger: 0.1, ease: 'back.out(1.4)' }, 0.05);
  tl.to(cam, { scale: 1.04, duration: ctx.dur, ease: 'power1.inOut' }, 0);
  // one decisive lateral pan, left to right
  tl.to(cam, { x: -36, duration: Math.max(1.2, LI - YT + 0.6), ease: 'expo.inOut' }, YT - 0.4);

  const reveal = (c, t) => {
    tl.to(c.card, { opacity: 1, boxShadow: `0 40px 80px rgba(0,0,0,.45), 0 0 60px rgba(${c.rgb},.28)`, duration: 0.4 }, t - 0.15);
    tl.fromTo(c.card, { scale: 0.95 }, { scale: 1, duration: 0.6, ease: 'back.out(2)', immediateRender: false }, t - 0.15);
    tl.to([c.head, c.body], { opacity: 1, duration: 0.3 }, t - 0.1);
    tl.from(c.head.children, { y: 20, opacity: 0, duration: 0.5, stagger: 0.05, ease: 'back.out(1.8)' }, t - 0.1);
  };

  // card 1: website
  reveal(cards[0], WEB);
  tl.from(br, { scale: 0.88, y: 30, opacity: 0, duration: 0.6, ease: 'back.out(1.6)' }, WEB);
  tl.from([h1, h2], { scaleX: 0, transformOrigin: '0 50%', duration: 0.5, stagger: 0.06 }, WEB + 0.25);
  tl.from(feats, { y: 30, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'back.out(1.6)' }, WEB + 0.35);
  tl.from(vid1, { x: -80, opacity: 0, scale: 0.85, duration: 0.6, ease: 'back.out(1.8)' }, Math.max(BES - 0.1, WEB + 0.3));
  tl.from([...copy, btn], { scaleX: 0, transformOrigin: '0 50%', duration: 0.45, stagger: 0.05 }, Math.max(CON - 0.2, BES + 0.1));
  tl.fromTo(prog1, { scaleX: 0 }, { scaleX: 1, duration: ctx.dur - BES, ease: 'none', immediateRender: true }, BES);
  tl.to(cards[0].card, { opacity: 0.55, boxShadow: '0 40px 80px rgba(0,0,0,.45), 0 0 0px rgba(79,163,255,0)', duration: 0.5 }, YT - 0.2);

  // card 2: YouTube
  reveal(cards[1], YT);
  tl.from(sbx, { scaleX: 0.6, opacity: 0, duration: 0.5, ease: 'back.out(1.6)' }, YT);
  tl.to(sbx, { borderColor: 'rgba(255,107,74,.8)', duration: 0.3 }, YT + 0.1);
  tl.to(ty, { n: WORD.length, duration: Math.max(0.5, FOUND - YT), ease: 'none' }, YT + 0.15);
  tl.from(rows, { y: 40, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.5)' }, YT + 0.4);
  gsap.set(badge, { opacity: 0, scale: 0.3 });
  const rise = SEARCH - 0.2;
  tl.to(ourRow, { y: -232, duration: 0.7, ease: 'back.out(1.4)' }, rise);
  tl.to([rows[0], rows[1]], { y: 116, opacity: 0.6, duration: 0.7, ease: 'back.out(1.2)' }, rise);
  tl.to(badge, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2.5)' }, rise + 0.45);
  tl.to(cards[1].card, { opacity: 0.55, boxShadow: '0 40px 80px rgba(0,0,0,.45), 0 0 0px rgba(255,107,74,0)', duration: 0.5 }, LI - 0.2);

  // card 3: LinkedIn
  reveal(cards[2], LI);
  tl.from([av, ...nb], { y: 20, opacity: 0, duration: 0.45, stagger: 0.05, ease: 'back.out(1.6)' }, LI);
  tl.from(vid3, { scale: 0.9, opacity: 0, duration: 0.6, ease: 'back.out(1.6)' }, LI + 0.15);
  tl.from([...reacts, rb], { opacity: 0, x: -10, duration: 0.4, stagger: 0.04 }, LI + 0.35);
  gsap.set(fill, { scaleX: 0 });
  tl.to(vid3, { borderColor: 'rgba(255,107,74,.9)', boxShadow: '0 0 50px rgba(255,107,74,.45)', duration: 0.3 }, FIRST - 0.05);
  tl.to(vlight, { opacity: 1, duration: 0.3 }, FIRST - 0.05);
  tl.to(count, { color: '#fff', duration: 0.3 }, FIRST - 0.05);
  tl.fromTo(count, { scale: 1.15 }, { scale: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, FIRST - 0.05);
  const run = Math.max(0.8, POINT - FIRST);
  tl.to(sec, { v: 3, duration: run, ease: 'none' }, FIRST);
  tl.to(fill, { scaleX: 1, duration: run, ease: 'none' }, FIRST);
  tl.to(zone, { background: 'rgba(255,107,74,.45)', duration: 0.3 }, FIRST);
  // "point": it lands
  tl.fromTo(count, { scale: 1 }, { scale: 1.18, color: '#FF6B4A', duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, POINT);
  tl.fromTo(ring, { scale: 0.5, opacity: 1 }, { scale: 1.6, opacity: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, POINT);
  // hold: all three channels lit together
  tl.to([cards[0].card, cards[1].card], { opacity: 1, duration: 0.6 }, POINT + 0.4);
});
