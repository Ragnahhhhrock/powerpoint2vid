/* Scene 0 — "Your video is only half the job on YouTube. The title, description, chapters and thumbnail
 * decide whether anyone finds it, and whether they stay."
 * Storyboard: a lone video frame with a play button floats in a dark void. On "half" it splits down the
 * middle and the right half empties to a dashed outline. On "title / description / chapters / thumbnail"
 * four signal-red pieces click into the empty half, one per word. On "whether they stay" the halves lock,
 * the completed frame glows red and the rebuilt headline "The video is only half the job" sets in above it. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w, fb) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : fb; };
  const half = W(0, 'half', 2.2);
  const tT = W(1, 'title', 3.6), tD = W(1, 'description', 4.1), tC = W(1, 'chapters', 4.8), tH = W(1, 'thumbnail', 5.4);
  const stay = W(1, 'stay', 8.6);

  const FW = 1040, FH = 585, HW = FW / 2;
  stage.style.background = 'radial-gradient(55% 55% at 50% 58%, #1d2029 0%, var(--night) 70%, #07080a 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 600px' });

  const pool = el('div', 'abs', cam, { left: '360px', top: '820px', width: '1200px', height: '220px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(232,57,47,.10), transparent)', filter: 'blur(10px)' });

  const fw = el('div', 'abs', cam, { left: (960 - HW) + 'px', top: '360px', width: FW + 'px', height: FH + 'px' });
  const glow = el('div', 'abs', fw, { inset: '-6px', borderRadius: '24px', boxShadow: '0 0 120px rgba(232,57,47,.65), 0 0 0 3px rgba(232,57,47,.9)', opacity: 0 });

  function videoContent(parent, offX) {
    const c = el('div', 'abs', parent, { left: offX + 'px', top: 0, width: FW + 'px', height: FH + 'px',
      background: 'radial-gradient(70% 80% at 30% 20%, #3a3f4c 0%, #23262e 55%, #15171c 100%)' });
    el('div', 'abs', c, { left: '90px', top: '90px', width: '360px', height: '26px', borderRadius: '6px', background: 'rgba(246,243,238,.16)' });
    el('div', 'abs', c, { left: '90px', top: '134px', width: '240px', height: '18px', borderRadius: '6px', background: 'rgba(246,243,238,.09)' });
    el('div', 'abs', c, { left: (HW - 80) + 'px', top: (FH / 2 - 80) + 'px', width: '160px', height: '160px', borderRadius: '50%',
      background: 'rgba(246,243,238,.12)', border: '3px solid rgba(246,243,238,.55)' });
    el('div', 'abs', c, { left: (HW - 22) + 'px', top: (FH / 2 - 38) + 'px', width: 0, height: 0,
      borderTop: '38px solid transparent', borderBottom: '38px solid transparent', borderLeft: '62px solid #F6F3EE' });
    el('div', 'abs', c, { left: '40px', right: '40px', bottom: '38px', height: '8px', borderRadius: '4px', background: 'rgba(246,243,238,.2)' });
    el('div', 'abs', c, { left: '40px', width: '180px', bottom: '38px', height: '8px', borderRadius: '4px', background: '#E8392F' });
    return c;
  }
  const hl = el('div', 'abs', fw, { left: 0, top: 0, width: HW + 'px', height: FH + 'px', overflow: 'hidden', borderRadius: '18px 0 0 18px', boxShadow: '0 40px 100px rgba(0,0,0,.6)' });
  videoContent(hl, 0);
  const hr = el('div', 'abs', fw, { left: HW + 'px', top: 0, width: HW + 'px', height: FH + 'px', overflow: 'hidden', borderRadius: '0 18px 18px 0' });
  const rContent = videoContent(hr, -HW);
  const dash = el('div', 'abs', hr, { inset: 0, borderRadius: '0 18px 18px 0', border: '3px dashed rgba(138,147,163,.75)', borderLeft: 'none', opacity: 0 });

  const RED = '#E8392F';
  const names = ['TITLE', 'DESCRIPTION', 'CHAPTERS', 'THUMBNAIL'];
  const times = [tT, tD, tC, tH];
  const PH = 110, GAP = 22, TOP0 = (FH - (4 * PH + 3 * GAP)) / 2;
  const pieces = names.map((n, i) => {
    const p = el('div', 'abs', fw, { left: (HW + 34) + 'px', top: (TOP0 + i * (PH + GAP)) + 'px', width: (HW - 68) + 'px', height: PH + 'px',
      borderRadius: '14px', background: `linear-gradient(180deg, #f0574d, ${RED} 60%, #c42a21)`,
      boxShadow: '0 18px 40px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.35)', display: 'flex', alignItems: 'center', paddingLeft: '44px', boxSizing: 'border-box' });
    el('div', 'abs', p, { left: '-16px', top: (PH / 2 - 16) + 'px', width: '32px', height: '32px', borderRadius: '50%', background: RED });
    const num = el('div', '', p, { font: '600 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: 'rgba(255,255,255,.65)', marginRight: '22px' });
    num.textContent = '0' + (i + 1);
    const lab = el('div', '', p, { font: '800 38px/1 Inter Display, Inter', letterSpacing: '.02em', color: '#fff' });
    lab.textContent = n;
    return p;
  });

  const head = el('div', 'abs', cam, { left: '120px', width: '1680px', top: '100px', textAlign: 'center',
    font: '800 120px/0.98 Inter Display, Inter', letterSpacing: '-.045em', color: '#F6F3EE' });
  const l1 = el('div', '', head, { overflow: 'hidden', paddingBottom: '8px' });
  const l2 = el('div', '', head, { overflow: 'hidden', paddingBottom: '8px' });
  const w1 = ctx.split(l1, 'The video is only', 'word');
  const w2 = ctx.split(l2, 'half the job', 'word');
  w2.forEach((w) => { w.style.color = RED; });
  [...w1, ...w2].forEach((w) => { w.style.marginRight = '0.22em'; });

  ctx.fx.vignette({ strength: 0.6 });
  ctx.fx.grain({ opacity: 0.06 });

  gsap.set(fw, { y: -150 });
  gsap.set([...w1, ...w2], { yPercent: 110 });
  gsap.set(pieces, { opacity: 0 });

  tl.to(cam, { scale: 1.04, duration: ctx.dur, ease: 'none' }, 0);
  tl.fromTo(fw, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' }, 0.05);
  tl.fromTo(pool, { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0.2);
  tl.to(fw, { y: -130, duration: half - 0.2, ease: 'sine.inOut' }, 0.2);

  tl.to(hl, { x: -16, duration: 0.5, ease: 'power3.out' }, half - 0.1);
  tl.to(hr, { x: 16, duration: 0.5, ease: 'power3.out' }, half - 0.1);
  tl.to(rContent, { opacity: 0, duration: 0.6, ease: 'power2.out' }, half);
  tl.to(dash, { opacity: 1, duration: 0.5 }, half + 0.1);

  pieces.forEach((p, i) => {
    const t = times[i] - 0.12;
    tl.fromTo(p, { opacity: 0, x: 90, scale: 1.12 }, { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: 'back.out(1.8)', immediateRender: false }, t);
    tl.to(p, { x: -4, duration: 0.06, yoyo: true, repeat: 1, ease: 'power1.inOut' }, t + 0.38);
  });

  const lock = stay - 0.75;
  tl.to([hl, hr], { x: 0, duration: 0.4, ease: 'power3.inOut' }, lock);
  tl.to(dash, { opacity: 0, duration: 0.3 }, lock + 0.2);
  tl.to(fw, { y: 30, scale: 0.9, duration: 0.8, ease: 'expo.inOut' }, lock);
  tl.to(glow, { opacity: 1, duration: 0.5 }, lock + 0.35);
  tl.to(pool, { opacity: 1, scale: 1.1, duration: 0.6 }, lock + 0.35);
  tl.to(w1, { yPercent: 0, duration: 0.55, stagger: 0.05, ease: 'power4.out' }, lock + 0.2);
  tl.to(w2, { yPercent: 0, duration: 0.55, stagger: 0.06, ease: 'back.out(1.5)' }, lock + 0.45);
  tl.to(glow, { boxShadow: '0 0 170px rgba(232,57,47,.85), 0 0 0 3px rgba(232,57,47,1)', duration: 0.7, yoyo: true, repeat: 1, ease: 'sine.inOut' }, stay);
});
