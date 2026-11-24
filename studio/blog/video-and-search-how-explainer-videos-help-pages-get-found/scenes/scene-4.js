/* Scene 4 — "Add video structured data, or check your platform does. Keep the page fast with sensible
 * hosting, and use captions and a transcript together."
 * Storyboard: night stage, three columns, one idea per beat. On "structured data" a curly-brace
 * VideoObject snippet assembles in signal blue and clicks onto a page like a label (check on "platform").
 * On "fast" a speed gauge needle swings into the green; the player placeholder reads "load on click"
 * and a cursor taps it on "hosting". On "captions" a caption bar slides out from under the video; on
 * "transcript" amber transcript lines write in. Title builds to "Data. Speed. Captions." */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const tStruct = ctx.at(0, 'structured'), tPlat = ctx.at(0, 'platform');
  const tFast = ctx.at(1, 'fast'), tHost = ctx.at(1, 'hosting');
  const tCap = ctx.at(1, 'captions'), tTrans = ctx.at(1, 'transcript');
  const GREEN = '#3DDC97';
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 50% 30%, #1a2440 0%, var(--night) 70%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 40% at 20% 75%, rgba(61,123,255,.14), transparent 70%), radial-gradient(35% 40% at 82% 75%, rgba(255,181,71,.10), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  const title = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '100px', textAlign: 'center', font: '900 90px/1 Inter Display, Inter', letterSpacing: '-.045em', color: '#fff', whiteSpace: 'nowrap' });
  const words = [['Data', 'var(--signal)'], ['Speed', GREEN], ['Captions', 'var(--amber)']].map(([w, c]) => {
    const s = el('span', '', title, { display: 'inline-block', margin: '0 22px' });
    s.innerHTML = `${w}<span style="color:${c}">.</span>`;
    return s;
  });

  const XS = [120, 700, 1280], TOP = 290, W = 520, H = 650;
  const labels = ['01 · VIDEOOBJECT', '02 · PAGE SPEED', '03 · TRANSCRIPT'];
  const cards = XS.map((x, i) => {
    const c = el('div', 'abs', cam, { left: x + 'px', top: TOP + 'px', width: W + 'px', height: H + 'px', borderRadius: '26px',
      background: 'linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.02))', border: '1px solid rgba(255,255,255,.09)',
      boxShadow: '0 40px 90px rgba(0,0,0,.35)' });
    const l = el('div', 'abs', c, { left: '40px', top: '30px', font: `600 18px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--mist)' });
    l.textContent = labels[i];
    return c;
  });

  const page = el('div', 'abs', cards[0], { left: '40px', top: '80px', width: '440px', height: '520px', borderRadius: '14px', background: 'var(--paper)', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,.4)' });
  const pbar = el('div', 'abs', page, { left: 0, top: 0, width: '100%', height: '34px', background: '#e6e1d6' });
  ['#ff6b5a', '#ffb547', '#3ddc97'].forEach((c, i) => el('div', 'abs', pbar, { left: 16 + i * 20 + 'px', top: '12px', width: '10px', height: '10px', borderRadius: '50%', background: c }));
  el('div', 'abs', page, { left: '24px', top: '56px', width: '260px', height: '18px', borderRadius: '6px', background: '#1B2238' });
  const thumb = el('div', 'abs', page, { left: '24px', top: '92px', width: '392px', height: '220px', borderRadius: '10px', background: 'linear-gradient(135deg, #24305a, #111830)' });
  el('div', 'abs', thumb, { left: '170px', top: '84px', width: 0, height: 0, borderLeft: '44px solid rgba(255,255,255,.85)', borderTop: '26px solid transparent', borderBottom: '26px solid transparent' });
  [0, 1, 2, 3, 4].forEach((i) => el('div', 'abs', page, { left: '24px', top: 334 + i * 30 + 'px', width: [392, 360, 380, 300, 340][i] + 'px', height: '12px', borderRadius: '6px', background: 'rgba(27,34,56,.18)' }));

  const snip = el('div', 'abs', cards[0], { left: '64px', top: '380px', width: '392px', padding: '18px 22px', boxSizing: 'border-box', borderRadius: '12px',
    background: '#0b1a3d', border: '2px solid var(--signal)', boxShadow: '0 0 50px rgba(61,123,255,.45), 0 18px 40px rgba(0,0,0,.45)', font: `600 21px/30px ${MONO}`, color: '#9dbcff', transformOrigin: '50% 0%' });
  const LINES = ['<b style="color:var(--signal)">{</b>', '&nbsp;&nbsp;"@type": "VideoObject",', '&nbsp;&nbsp;"name": "…",', '&nbsp;&nbsp;"transcript": "…"', '<b style="color:var(--signal)">}</b>'];
  const lines = LINES.map((h) => { const d = el('div', '', snip, { whiteSpace: 'nowrap' }); d.innerHTML = h; return d; });
  const check = el('div', 'abs', cards[0], { left: '424px', top: '360px', width: '54px', height: '54px', borderRadius: '50%', background: 'var(--signal)', boxShadow: '0 0 30px rgba(61,123,255,.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' });
  check.innerHTML = '<svg width="30" height="30" viewBox="0 0 30 30"><path d="M6 16 L12 22 L24 8" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ring1 = el('div', 'abs', cards[0], { left: '160px', top: '373px', width: '200px', height: '200px', borderRadius: '50%', border: '4px solid var(--signal)', opacity: 0 });

  const pt = (a, r) => [220 + r * Math.cos(a * Math.PI / 180), 220 - r * Math.sin(a * Math.PI / 180)];
  const arcP = (a0, a1, r) => { const p0 = pt(a0, r), p1 = pt(a1, r); return `M${p0[0]} ${p0[1]} A ${r} ${r} 0 0 1 ${p1[0]} ${p1[1]}`; };
  const gauge = el('div', 'abs', cards[1], { left: '40px', top: '80px', width: '440px', height: '250px' });
  gauge.innerHTML = `<svg width="440" height="250" style="overflow:visible">
    <path d="${arcP(180, 0, 170)}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="34"/>
    <path d="${arcP(178, 122, 170)}" fill="none" stroke="#FF6B5A" stroke-width="22" stroke-linecap="round" opacity=".8"/>
    <path d="${arcP(118, 62, 170)}" fill="none" stroke="#FFB547" stroke-width="22" stroke-linecap="round" opacity=".8"/>
    <path id="g2green" d="${arcP(58, 2, 170)}" fill="none" stroke="${GREEN}" stroke-width="22" stroke-linecap="round" opacity=".55"/>
    <g id="g2needle"><line x1="220" y1="220" x2="220" y2="76" stroke="#fff" stroke-width="8" stroke-linecap="round"/></g>
    <circle cx="220" cy="220" r="18" fill="#fff"/><circle cx="220" cy="220" r="8" fill="var(--night)"/></svg>`;
  const needle = gauge.querySelector('#g2needle'), greenArc = gauge.querySelector('#g2green');
  gsap.set(needle, { svgOrigin: '220 220', rotation: -72 });

  const player = el('div', 'abs', cards[1], { left: '40px', top: '360px', width: '440px', height: '248px', borderRadius: '14px', overflow: 'hidden',
    background: 'linear-gradient(135deg, #2a3766 0%, #141b33 100%)', border: '1px solid rgba(255,255,255,.12)', boxShadow: '0 20px 50px rgba(0,0,0,.4)' });
  const playBtn = el('div', 'abs', player, { left: '175px', top: '74px', width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,.95)', boxShadow: '0 0 40px rgba(61,220,151,.0)' });
  el('div', 'abs', playBtn, { left: '35px', top: '25px', width: 0, height: 0, borderLeft: '30px solid var(--night)', borderTop: '20px solid transparent', borderBottom: '20px solid transparent' });
  const chip = el('div', 'abs', player, { left: '20px', top: '196px', padding: '8px 12px', borderRadius: '8px', background: 'rgba(61,220,151,.16)', border: `1px solid ${GREEN}`, font: `700 17px/1 ${MONO}`, letterSpacing: '.12em', color: GREEN });
  chip.textContent = 'LOAD ON CLICK';
  const cursor = el('div', 'abs', cards[1], { left: '300px', top: '470px', width: '40px', height: '50px' });
  cursor.innerHTML = '<svg width="40" height="50" viewBox="0 0 40 50"><path d="M4 3 L4 40 L14 31 L21 46 L28 43 L21 28 L34 28 Z" fill="#fff" stroke="#0E1424" stroke-width="3" stroke-linejoin="round"/></svg>';
  const ring2 = el('div', 'abs', cards[1], { left: '225px', top: '434px', width: '110px', height: '110px', borderRadius: '50%', border: `4px solid ${GREEN}`, opacity: 0 });

  const capBar = el('div', 'abs', cards[2], { left: '40px', top: '342px', width: '440px', height: '64px', borderRadius: '10px', background: 'rgba(0,0,0,.7)', border: '1px solid rgba(255,255,255,.15)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', font: '600 25px/1 Inter', letterSpacing: '-.01em', color: '#fff' });
  capBar.textContent = 'captions and a transcript';
  const video = el('div', 'abs', cards[2], { left: '40px', top: '80px', width: '440px', height: '248px', borderRadius: '14px', overflow: 'hidden',
    background: 'linear-gradient(135deg, #2b3a6e 0%, #121931 100%)', border: '1px solid rgba(255,255,255,.12)', boxShadow: '0 20px 50px rgba(0,0,0,.45)' });
  el('div', 'abs', video, { left: '196px', top: '94px', width: 0, height: 0, borderLeft: '50px solid rgba(255,255,255,.85)', borderTop: '30px solid transparent', borderBottom: '30px solid transparent' });
  el('div', 'abs', video, { left: '20px', top: '222px', width: '400px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.18)' });
  const prog = el('div', 'abs', video, { left: '20px', top: '222px', width: '400px', height: '6px', borderRadius: '3px', background: 'var(--amber)', transformOrigin: '0 50%' });
  gsap.set(prog, { scaleX: 0.15 });
  const tLabel = el('div', 'abs', cards[2], { left: '40px', top: '434px', font: `700 17px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--amber)' });
  tLabel.textContent = 'TRANSCRIPT';
  const tRows = [0, 1, 2, 3].map((i) => {
    const r = el('div', 'abs', cards[2], { left: '40px', top: 470 + i * 40 + 'px', width: '440px', height: '24px' });
    const ts = el('div', 'abs', r, { left: 0, top: '3px', font: `600 16px/1 ${MONO}`, color: 'rgba(255,181,71,.75)' }); ts.textContent = '00:0' + (2 + i * 2);
    const bar = el('div', 'abs', r, { left: '70px', top: '5px', width: [360, 300, 340, 250][i] + 'px', height: '12px', borderRadius: '6px', background: 'var(--amber)', opacity: 0.85, transformOrigin: '0 50%' });
    return { r, bar };
  });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  tl.to(cam, { scale: 1.03, duration: ctx.dur, ease: 'none' }, 0);
  tl.from(cards, { y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }, 0);
  tl.from(page, { y: 30, opacity: 0, duration: 0.8 }, 0.25);
  gsap.set(words, { opacity: 0, y: 40, scale: 0.92 });
  gsap.set([snip, check], { opacity: 0 });
  gsap.set(lines, { opacity: 0, x: -18 });
  gsap.set([gauge, player, cursor, video, tLabel, ...tRows.map((r) => r.r)], { opacity: 0 });
  gsap.set(capBar, { y: -80, opacity: 0 });
  gsap.set(tRows.map((r) => r.bar), { scaleX: 0 });

  const pop = (w, t) => tl.to(w, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.6)' }, t);
  const focus = (i, t) => tl.to(cards[i], { borderColor: ['rgba(61,123,255,.7)', 'rgba(61,220,151,.6)', 'rgba(255,181,71,.6)'][i], duration: 0.5 }, t);

  pop(words[0], tStruct - 0.1);
  focus(0, tStruct - 0.1);
  tl.fromTo(snip, { opacity: 0, y: -150, rotation: -4, scale: 1.08 }, { opacity: 1, y: -110, rotation: -3, scale: 1.08, duration: 0.45, immediateRender: false }, tStruct - 0.15);
  tl.to(lines, { opacity: 1, x: 0, duration: 0.35, stagger: 0.09 }, tStruct);
  const click = Math.min(tStruct + 0.85, tPlat - 0.2);
  tl.to(snip, { y: 0, rotation: 0, scale: 1, duration: 0.4, ease: 'back.out(2.2)' }, click);
  tl.fromTo(ring1, { scale: 0.4, opacity: 0.9 }, { scale: 2, opacity: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, click + 0.25);
  tl.fromTo(check, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, tPlat);

  tl.to(gauge, { opacity: 1, duration: 0.6 }, tFast - 0.9);
  tl.fromTo(player, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, immediateRender: false }, tFast - 0.7);
  pop(words[1], tFast - 0.05);
  focus(1, tFast - 0.05);
  tl.to(needle, { rotation: 58, duration: 0.9, ease: 'back.out(1.5)' }, tFast - 0.05);
  tl.to(greenArc, { attr: { opacity: 1 }, duration: 0.4 }, tFast + 0.4);
  tl.fromTo(chip, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, immediateRender: false }, tFast + 0.3);
  tl.fromTo(cursor, { opacity: 0, x: 90, y: 70 }, { opacity: 1, x: 0, y: 0, duration: 0.6, ease: 'power3.out', immediateRender: false }, tHost - 0.6);
  tl.to(cursor, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1, transformOrigin: '10% 10%' }, tHost);
  tl.to(playBtn, { scale: 0.9, boxShadow: '0 0 50px rgba(61,220,151,.8)', duration: 0.12, yoyo: true, repeat: 1 }, tHost);
  tl.fromTo(ring2, { scale: 0.6, opacity: 0.9 }, { scale: 1.9, opacity: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, tHost);
  tl.to(cursor, { opacity: 0, duration: 0.4 }, tHost + 0.6);

  tl.fromTo(video, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, immediateRender: false }, tCap - 0.8);
  tl.to(prog, { scaleX: 0.85, duration: ctx.dur - tCap + 0.8, ease: 'none' }, tCap - 0.8);
  pop(words[2], tCap - 0.05);
  focus(2, tCap - 0.05);
  tl.to(capBar, { opacity: 1, duration: 0.25, ease: 'none' }, tCap);
  tl.to(capBar, { y: 0, duration: 0.6, ease: 'back.out(1.5)' }, tCap);
  tl.to(tLabel, { opacity: 1, duration: 0.4 }, tTrans - 0.1);
  tRows.forEach((r, i) => {
    tl.to(r.r, { opacity: 1, duration: 0.3 }, tTrans + i * 0.12);
    tl.to(r.bar, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, tTrans + i * 0.12);
  });
});
