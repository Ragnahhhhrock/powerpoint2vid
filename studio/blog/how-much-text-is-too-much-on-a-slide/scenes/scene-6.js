/* Scene 6 — "The headline makes the point, the graphic shows the steps, and the narration carries
 * the detail about accrual and reply times."
 * Storyboard: paper stage, still close on the clean 'after' slide with its speaker-notes panel beside it.
 * On "headline" the headline is underlined in coral. On "graphic" the three-step flow
 * (Submit → Manager reviews → Reply) pulses teal, one step after another. On "narration" a teal
 * voice waveform rises beneath the slide. The 'accrual' and 'reply times' tags float out of the notes
 * panel and settle onto the waveform as each is said. The scene then holds on the calm, clean layout. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (w, f) => { const v = ctx.at(0, w); return Number.isFinite(v) ? v : f; };
  const tHead = A('headline', 0.71), tGraphic = A('graphic', 2.11), tNarr = A('narration', 4.03);
  const tAccrual = A('accrual', 5.79), tReply = A('reply', 6.44);
  const FONT = 'Inter Display, Inter, sans-serif', MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(70% 60% at 40% 35%, #ffffff 0%, var(--paper) 60%, #ebe6da 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '760px 480px' });

  const card = el('div', 'abs', cam, { left: '140px', top: '100px', width: '1180px', height: '680px', borderRadius: '22px', background: '#fff',
    boxShadow: '0 40px 90px rgba(20,22,31,.12), 0 6px 18px rgba(20,22,31,.06)' });
  const tag = el('div', 'abs', card, { left: '70px', top: '52px', font: `600 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--slate)' });
  tag.textContent = 'AFTER · LEAVE POLICY';
  const head = el('div', 'abs', card, { left: '70px', top: '100px', width: '1040px', font: `800 64px/1.18 ${FONT}`, letterSpacing: '-.035em', color: 'var(--ink)' });
  const lines = ['Request leave two weeks ahead,', 'through the HR portal'].map((txt) => {
    const row = el('div', '', head, {});
    const s = el('span', '', row, { backgroundImage: 'linear-gradient(var(--coral), var(--coral))', backgroundRepeat: 'no-repeat',
      backgroundPosition: '0 94%', backgroundSize: '0% 10px', paddingBottom: '4px' });
    s.textContent = txt; return s;
  });

  const STEPS = ['Submit', 'Manager reviews', 'Reply'], CX = [230, 590, 950], CY = 450, R = 58;
  const conns = [0, 1].map((i) => {
    const x0 = CX[i] + R + 18, w = CX[i + 1] - CX[i] - 2 * R - 36;
    const base = el('div', 'abs', card, { left: x0 + 'px', top: CY - 2 + 'px', width: w + 'px', height: '4px', borderRadius: '2px', background: 'rgba(138,144,166,.35)' });
    const fill = el('div', 'abs', card, { left: x0 + 'px', top: CY - 2 + 'px', width: w + 'px', height: '4px', borderRadius: '2px', background: 'var(--teal)', transformOrigin: '0 50%' });
    const tip = el('div', 'abs', card, { left: x0 + w - 6 + 'px', top: CY - 9 + 'px', width: 0, height: 0, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', borderLeft: '14px solid rgba(138,144,166,.6)' });
    return { base, fill, tip };
  });
  const steps = STEPS.map((label, i) => {
    const ring = el('div', 'abs', card, { left: CX[i] - R + 'px', top: CY - R + 'px', width: 2 * R + 'px', height: 2 * R + 'px', borderRadius: '50%', border: '3px solid var(--teal)', opacity: 0 });
    const c = el('div', 'abs', card, { left: CX[i] - R + 'px', top: CY - R + 'px', width: 2 * R + 'px', height: 2 * R + 'px', borderRadius: '50%',
      background: '#fff', border: '4px solid var(--ink)', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center',
      font: `800 46px/1 ${FONT}`, color: 'var(--ink)', boxShadow: '0 0 0 rgba(31,181,168,0)' });
    c.textContent = String(i + 1);
    const lab = el('div', 'abs', card, { left: CX[i] - 160 + 'px', width: '320px', top: CY + R + 28 + 'px', textAlign: 'center', font: `700 34px/1.1 ${FONT}`, letterSpacing: '-.02em', color: 'var(--ink)' });
    lab.textContent = label;
    return { ring, c, lab };
  });

  const notes = el('div', 'abs', cam, { left: '1370px', top: '100px', width: '410px', height: '680px', borderRadius: '22px', background: '#f1ede3',
    border: '2px dashed rgba(138,144,166,.45)', boxSizing: 'border-box' });
  const nl = el('div', 'abs', notes, { left: '36px', top: '50px', font: `600 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--slate)' });
  nl.textContent = 'SPEAKER NOTES';
  const bars = [300, 260, 320, 210, 280, 240].map((w, i) =>
    el('div', 'abs', notes, { left: '36px', top: 110 + i * 40 + 'px', width: w + 'px', height: '12px', borderRadius: '6px', background: 'rgba(138,144,166,.28)' }));
  const mkChip = (txt, top, col) => el('div', 'abs', cam, { left: '1406px', top: top + 'px', padding: '14px 26px', borderRadius: '40px', background: '#fff', zIndex: 10,
    border: `3px solid ${col}`, font: `700 30px/1 ${FONT}`, letterSpacing: '-.01em', color: 'var(--ink)', boxShadow: '0 12px 30px rgba(20,22,31,.12)', whiteSpace: 'nowrap' });
  const chipA = mkChip('accrual', 470, 'var(--amber)'); chipA.textContent = 'accrual';
  const chipR = mkChip('reply times', 560, 'var(--coral)'); chipR.textContent = 'reply times';

  const wlab = el('div', 'abs', cam, { left: '140px', top: '818px', font: `600 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--teal)' });
  wlab.textContent = 'NARRATION';
  const cv = el('canvas', 'abs', cam, { left: '140px', top: '850px', width: '1640px', height: '140px', zIndex: 1 });
  cv.width = 1640; cv.height = 140;
  const g = cv.getContext('2d');
  const wave = { amp: 0 };
  ctx.onFrame((t) => {
    g.clearRect(0, 0, 1640, 140);
    g.fillStyle = '#1FB5A8';
    const N = 82;
    for (let i = 0; i < N; i++) {
      const env = Math.sin(Math.PI * (i + 0.5) / N);
      const v = 0.25 + 0.75 * Math.abs(Math.sin(i * 0.37 + t * 3.1) * Math.sin(i * 0.11 - t * 1.7 + 1));
      const h = Math.max(4, wave.amp * env * v * 120);
      const x = i * 20 + 6;
      g.globalAlpha = 0.55 + 0.45 * env;
      g.beginPath();
      g.roundRect ? g.roundRect(x, 70 - h / 2, 8, h, 4) : g.rect(x, 70 - h / 2, 8, h);
      g.fill();
    }
    g.globalAlpha = 1;
  });

  ctx.fx.vignette({ strength: 0.18 });
  ctx.fx.grain({ opacity: 0.05 });

  gsap.set(cam, { scale: 1 });
  gsap.set(conns.map((c) => c.fill), { scaleX: 0 });
  gsap.set([wlab, cv], { opacity: 0 });
  gsap.set(cv, { y: 30 });
  tl.to(cam, { scale: 1.035, x: -10, duration: ctx.dur, ease: 'none' }, 0);
  tl.from([chipA, chipR], { opacity: 0, y: 14, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, 0.15);

  tl.to(lines[0], { backgroundSize: '100% 10px', duration: 0.6, ease: 'power2.inOut' }, tHead);
  tl.to(lines[1], { backgroundSize: '100% 10px', duration: 0.45, ease: 'power2.inOut' }, tHead + 0.5);
  tl.fromTo(head, { scale: 1 }, { scale: 1.015, duration: 0.4, yoyo: true, repeat: 1, ease: 'sine.inOut', transformOrigin: '0 50%', immediateRender: false }, tHead + 0.3);

  steps.forEach((s, i) => {
    const t = tGraphic + i * 0.38;
    tl.to(s.c, { background: '#1FB5A8', borderColor: '#1FB5A8', color: '#fff', boxShadow: '0 14px 40px rgba(31,181,168,.45)', duration: 0.3, ease: 'power2.out' }, t);
    tl.fromTo(s.c, { scale: 1 }, { scale: 1.16, duration: 0.22, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, t);
    tl.fromTo(s.ring, { scale: 1, opacity: 0.9 }, { scale: 1.9, opacity: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, t);
    tl.to(s.lab, { color: '#0f7f76', duration: 0.3 }, t);
    if (i < 2) {
      tl.to(conns[i].fill, { scaleX: 1, duration: 0.36, ease: 'power2.inOut' }, t + 0.08);
      tl.to(conns[i].tip, { borderLeftColor: '#1FB5A8', duration: 0.2 }, t + 0.36);
    }
  });

  tl.to([wlab, cv], { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, tNarr - 0.1);
  tl.to(wave, { amp: 1, duration: 0.9, ease: 'power2.out' }, tNarr);

  const fly = (chip, land, dx, dy) => {
    tl.to(chip, { x: dx, y: dy, duration: 1.0, ease: 'power3.inOut' }, land - 0.85);
    tl.to(chip, { rotation: -3, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, land - 0.85);
    tl.to(chip, { boxShadow: '0 18px 44px rgba(31,181,168,.35)', borderColor: '#1FB5A8', duration: 0.4 }, land);
    tl.fromTo(chip, { scale: 1 }, { scale: 1.08, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, land + 0.1);
  };
  fly(chipA, tAccrual, 520 - 1406, 896 - 470);
  fly(chipR, tReply, 1000 - 1406, 896 - 560);
  tl.to(bars, { opacity: 0.45, duration: 0.8, stagger: 0.05 }, tAccrual - 0.4);

  tl.to(wave, { amp: 0.55, duration: Math.max(0.6, ctx.dur - (tReply + 0.6)), ease: 'sine.inOut' }, tReply + 0.6);
});
