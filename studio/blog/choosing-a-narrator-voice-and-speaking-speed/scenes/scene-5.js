/* Scene 5 (final): "On Pro, a.i. directs the video, timing each animated scene to your narration.
 * Try Basic first, then hear your deck at powerpoint2vid.com."
 * Storyboard: the night stage warms to ink, and a faint waveform from the opening sinks as two cards rise.
 * Basic (narration / captions / transitions icons) sits left, Pro sits right. On "A.I. directs" Pro lifts and
 * glows wave-blue. On "timing" its scene blocks snap onto the waveform segments. On "Try Basic first" the
 * Basic card pulses mint. On "powerpoint2vid.com" the cards fade, the URL builds at 120px and the opening
 * waveform returns, settling into a breathing underline beneath it that holds to the end. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const T = (i, w, f) => { const v = ctx.at(i, w); return (v == null || isNaN(v)) ? f : v; };
  const ai = T(0, 'A.I.', 1.34), timing = T(0, 'timing', 2.85), narr = T(0, 'narration.', 4.66);
  const tryW = T(1, 'Try', 5.54), basicW = T(1, 'Basic', 5.87), ppt = T(1, 'PowerPoint', 7.77), com = T(1, 'com.', 8.9);
  const MONO = 'ui-monospace, Menlo, monospace', DISP = 'Inter Display, Inter, sans-serif';

  stage.style.background = 'var(--night)';
  const warm = el('div', 'abs', stage, { inset: 0, opacity: 0,
    background: 'radial-gradient(70% 65% at 50% 45%, #262c48 0%, var(--ink) 55%, var(--night) 100%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  /* waveform canvas (the recurring hero) */
  const cv = el('canvas', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  cv.width = 1920; cv.height = 1080;
  const g = cv.getContext('2d');
  const W = { amp: 0.35, cy: 540, op: 0.55, width: 1300, glow: 0 };

  /* label */
  const label = el('div', 'abs', cam, { left: '0', width: '1920px', top: '150px', textAlign: 'center', font: `600 24px/1 ${MONO}`, letterSpacing: '.2em', color: 'var(--mist)' });
  label.textContent = 'HEAR YOUR OWN DECK READ ALOUD';

  /* cards */
  const card = (x) => el('div', 'abs', cam, { left: x + 'px', top: '250px', width: '620px', height: '590px', borderRadius: '32px',
    background: 'linear-gradient(160deg, rgba(255,255,255,.075), rgba(255,255,255,.02))', border: '2px solid rgba(255,255,255,.12)',
    boxShadow: '0 40px 90px rgba(0,0,0,.45), 0 0 0px rgba(91,140,255,0)', transformOrigin: '50% 60%' });
  const basic = card(300), pro = card(1000);
  const head = (c, txt, tagTxt, col) => {
    el('div', 'abs', c, { left: '56px', top: '52px', font: `600 20px/1 ${MONO}`, letterSpacing: '.16em', color: col }).textContent = tagTxt;
    el('div', 'abs', c, { left: '52px', top: '88px', font: `800 92px/1 ${DISP}`, letterSpacing: '-.04em', color: 'var(--paper)' }).textContent = txt;
  };
  head(basic, 'Basic', 'PLAN 01', 'var(--mint)');
  head(pro, 'Pro', 'PLAN 02', 'var(--wave)');

  const icons = {
    narration: '<svg width="56" height="56" viewBox="0 0 56 56"><g stroke="#3FD1A3" stroke-width="5" stroke-linecap="round"><path d="M10 22v12M19 14v28M28 8v40M37 16v24M46 23v10"/></g></svg>',
    captions: '<svg width="56" height="56" viewBox="0 0 56 56"><rect x="5" y="11" width="46" height="34" rx="8" fill="none" stroke="#3FD1A3" stroke-width="4.5"/><path d="M14 27h14M32 27h10M14 35h22" stroke="#3FD1A3" stroke-width="4.5" stroke-linecap="round"/></svg>',
    transitions: '<svg width="56" height="56" viewBox="0 0 56 56"><rect x="5" y="9" width="28" height="28" rx="6" fill="none" stroke="#3FD1A3" stroke-width="4.5" opacity=".55"/><rect x="21" y="21" width="28" height="28" rx="6" fill="#3FD1A3" opacity=".9"/></svg>',
  };
  const rows = [['narration', 'Narration'], ['captions', 'Captions'], ['transitions', 'Transitions']].map(([k, txt], i) => {
    const r = el('div', 'abs', basic, { left: '56px', top: 250 + i * 100 + 'px', height: '64px', display: 'flex', alignItems: 'center', gap: '28px' });
    const ic = el('div', '', r, { width: '56px', height: '56px' }); ic.innerHTML = icons[k];
    el('div', '', r, { font: `600 40px/1 ${DISP}`, letterSpacing: '-.02em', color: 'var(--paper)' }).textContent = txt;
    return r;
  });

  /* Pro: AI line + mini timeline */
  const proRow = el('div', 'abs', pro, { left: '56px', top: '250px', display: 'flex', alignItems: 'center', gap: '22px' });
  const spark = el('div', '', proRow, { width: '56px', height: '56px' });
  spark.innerHTML = '<svg width="56" height="56" viewBox="0 0 56 56"><path d="M28 4 L33 23 L52 28 L33 33 L28 52 L23 33 L4 28 L23 23 Z" fill="#5B8CFF"/></svg>';
  el('div', '', proRow, { font: `600 40px/1 ${DISP}`, letterSpacing: '-.02em', color: 'var(--paper)' }).textContent = 'A.I. directs the video';

  const strip = el('div', 'abs', pro, { left: '50px', top: '370px', width: '520px', height: '90px' });
  const R = ctx.rand(7);
  const bars = Array.from({ length: 40 }, (_, i) => {
    const h = 14 + R() * 70;
    const b = el('div', 'abs', strip, { left: i * 13 + 'px', top: 45 - h / 2 + 'px', width: '8px', height: h + 'px', borderRadius: '4px', background: 'rgba(167,174,196,.55)' });
    return { b, h, ph: R() * 6 };
  });
  const SEG = [0, 143, 260, 403, 520];
  const scattered = [[30, 90], [150, 70], [250, 120], [420, 80]];
  const blockCols = ['#5B8CFF', '#3FD1A3', '#FF6B4A', '#A7AEC4'];
  const blocks = scattered.map(([x, w], i) => el('div', 'abs', pro, { left: 50 + x + 'px', top: '480px', width: w + 'px', height: '46px', borderRadius: '10px',
    background: blockCols[i], opacity: 0.35, boxShadow: '0 0 0px rgba(91,140,255,0)' }));

  /* URL */
  const url = el('div', 'abs', cam, { left: '0', width: '1920px', top: '410px', textAlign: 'center', font: `800 120px/1 ${DISP}`, letterSpacing: '-.04em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  const chars = ctx.split(url, 'powerpoint2vid.com', 'char');
  chars.forEach((c, i) => { if (i >= 14) c.style.color = 'var(--wave)'; });

  const ring = el('div', 'abs', cam, { left: '300px', top: '250px', width: '620px', height: '590px', borderRadius: '32px', border: '4px solid var(--mint)', opacity: 0 });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    g.clearRect(0, 0, 1920, 1080);
    if (W.op > 0.002) {
      const n = 90, w0 = W.width, x0 = 960 - w0 / 2, step = w0 / n, bw = Math.max(3, step * 0.5);
      const grad = g.createLinearGradient(x0, 0, x0 + w0, 0);
      grad.addColorStop(0, '#5B8CFF'); grad.addColorStop(0.55, '#7f9dff'); grad.addColorStop(1, '#3FD1A3');
      g.globalAlpha = W.op; g.fillStyle = grad;
      g.shadowColor = 'rgba(91,140,255,.8)'; g.shadowBlur = 10 + W.glow * 30;
      for (let i = 0; i < n; i++) {
        const u = i / (n - 1), env = Math.sin(Math.PI * u) ** 0.7;
        const m = 0.45 + 0.35 * Math.sin(t * 2.4 + i * 0.42) + 0.2 * Math.sin(t * 4.1 - i * 0.9);
        const h = Math.max(bw, 220 * W.amp * env * m);
        const x = x0 + i * step, y = W.cy - h / 2;
        g.beginPath(); g.roundRect ? g.roundRect(x, y, bw, h, bw / 2) : g.rect(x, y, bw, h); g.fill();
      }
      g.globalAlpha = 1; g.shadowBlur = 0;
    }
    bars.forEach((o, i) => { o.b.style.transform = `scaleY(${0.75 + 0.25 * Math.sin(t * 3 + o.ph)})`; });
  });

  /* ---- timeline ---- */
  gsap.set([basic, pro], { filter: 'blur(0px) brightness(1)' });
  tl.to(warm, { opacity: 1, duration: 3, ease: 'power1.inOut' }, 0);
  tl.to(W, { op: 0, amp: 0.15, duration: 0.9, ease: 'power2.in' }, 0.35);
  tl.from(label, { opacity: 0, y: 16, duration: 0.7 }, 0.15);
  tl.from(basic, { opacity: 0, y: 80, duration: 0.9, ease: 'back.out(1.4)' }, 0.2);
  tl.from(pro, { opacity: 0, y: 80, duration: 0.9, ease: 'back.out(1.4)' }, 0.35);
  tl.from(rows, { opacity: 0, x: -30, duration: 0.6, stagger: 0.1 }, 0.6);
  tl.from(proRow, { opacity: 0, x: -30, duration: 0.6 }, 0.8);
  tl.from(bars.map((o) => o.b), { opacity: 0, duration: 0.4, stagger: 0.012 }, 0.9);
  tl.from(blocks, { opacity: 0, y: 20, duration: 0.5, stagger: 0.06 }, 1.0);

  // camera drift
  tl.to(cam, { scale: 1.025, duration: ppt - 0.3, ease: 'none' }, 0);

  // "A.I. directs": Pro lifts and glows wave-blue
  tl.to(pro, { y: -30, scale: 1.04, borderColor: 'rgba(91,140,255,.85)', boxShadow: '0 50px 110px rgba(0,0,0,.5), 0 0 90px rgba(91,140,255,.55)', duration: 0.8, ease: 'back.out(1.6)' }, ai - 0.1);
  tl.to(basic, { filter: 'blur(0px) brightness(.7)', duration: 0.6 }, ai);
  tl.fromTo(spark, { rotation: 0, scale: 1 }, { rotation: 180, scale: 1.25, duration: 0.8, ease: 'back.out(2)', yoyo: true, repeat: 1, immediateRender: false }, ai);
  tl.to(bars.map((o) => o.b), { background: '#5B8CFF', duration: 0.5, stagger: 0.01 }, ai + 0.3);

  // "timing each animated scene": blocks snap onto wave segments
  blocks.forEach((b, i) => {
    tl.to(b, { left: 50 + SEG[i] + 3 + 'px', width: SEG[i + 1] - SEG[i] - 6 + 'px', opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }, timing + i * 0.25);
  });
  tl.to(blocks, { boxShadow: '0 0 30px rgba(91,140,255,.7)', duration: 0.4, yoyo: true, repeat: 1, stagger: 0.08 }, narr);

  // "Try Basic first": Basic pulses mint
  tl.to(pro, { y: 0, scale: 1, borderColor: 'rgba(255,255,255,.12)', boxShadow: '0 40px 90px rgba(0,0,0,.45), 0 0 0px rgba(91,140,255,0)', filter: 'blur(0px) brightness(.75)', duration: 0.7, ease: 'power2.inOut' }, tryW - 0.1);
  tl.to(basic, { filter: 'blur(0px) brightness(1)', y: -24, scale: 1.04, borderColor: 'rgba(63,209,163,.9)', boxShadow: '0 50px 110px rgba(0,0,0,.5), 0 0 90px rgba(63,209,163,.55)', duration: 0.7, ease: 'back.out(1.6)' }, basicW - 0.15);
  tl.fromTo(ring, { opacity: 0.9, scale: 1, y: -24 }, { opacity: 0, scale: 1.18, duration: 0.9, ease: 'power2.out', immediateRender: false }, basicW);
  tl.to(rows, { x: 12, duration: 0.25, yoyo: true, repeat: 1, stagger: 0.08 }, basicW + 0.1);

  // "powerpoint2vid.com": cards fade, URL + waveform underline
  const out = ppt - 0.45;
  tl.to([basic, pro], { opacity: 0, y: '+=50', filter: 'blur(8px) brightness(.6)', duration: 0.6, ease: 'power2.in', stagger: 0.06 }, out);
  tl.to(label, { opacity: 0, duration: 0.4 }, out);
  tl.to(cam, { scale: 1, duration: 0.8, ease: 'expo.inOut' }, out);
  tl.set(W, { cy: 520, width: 1300, amp: 0.2 }, out + 0.3);
  tl.to(W, { op: 1, amp: 0.85, duration: 0.6, ease: 'power2.out' }, out + 0.3);
  tl.from(chars, { opacity: 0, y: 50, duration: 0.55, ease: 'back.out(1.8)', stagger: 0.035 }, ppt - 0.1);
  tl.to(W, { cy: 600, amp: 0.13, width: 1180, glow: 1, duration: 1.0, ease: 'expo.inOut' }, ppt + 0.2);
  tl.fromTo(chars.slice(14), { y: 0 }, { y: -14, duration: 0.18, yoyo: true, repeat: 1, stagger: 0.04, immediateRender: false }, com);
  tl.to(W, { glow: 0.4, duration: 1.2, ease: 'power1.inOut' }, com + 0.3);
  tl.to(cam, { scale: 1.04, duration: Math.max(0.5, ctx.dur - (ppt + 0.4)), ease: 'power1.inOut' }, ppt + 0.4);
});
