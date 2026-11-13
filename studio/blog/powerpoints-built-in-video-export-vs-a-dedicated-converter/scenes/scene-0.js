/* Scene 0 — "Want to save PowerPoint as video? You have two sensible options, and they suit different jobs.
 * Here's how to pick the right one for your deck."
 * Storyboard: night stage. The deck's plain title slide is rebuilt as a single paper card, centre. On "video"
 * a play badge pops onto it. On "two sensible options" the card splits into an amber and a blue ghost,
 * and two road lanes draw out of it: warm amber curving left, cool blue curving right. "Built-in Export"
 * and "Dedicated Converter" rise at 110px beside their lanes. Light pulses travel the lanes on
 * "different jobs". On "pick the right one" the camera slowly pushes in toward the fork. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const vid = ctx.at(0, 'video?'), two = ctx.at(1, 'two'), opts = ctx.at(1, 'options,'),
        diff = ctx.at(1, 'different'), pick = ctx.at(2, 'pick'), right = ctx.at(2, 'right');
  const W = 1920, H = 1080, FX = 960, FY = 520;
  const AMBER = '#F2A33A', BLUE = '#3FA7D6';

  stage.style.background =
    'radial-gradient(50% 45% at 50% 40%, #1f2846 0%, transparent 70%),' +
    'radial-gradient(40% 50% at 18% 85%, rgba(242,163,58,.10), transparent 70%),' +
    'radial-gradient(40% 50% at 82% 85%, rgba(63,167,214,.10), transparent 70%), var(--night)';

  const drift = el('div', 'abs', stage, { inset: 0 });
  const cam = el('div', 'abs', drift, { inset: 0, transformOrigin: `${FX}px ${FY}px` });

  /* ---- lanes (SVG) ---- */
  const svgWrap = el('div', 'abs', cam, { left: 0, top: 0, width: W + 'px', height: H + 'px' });
  const dL = `M${FX} 470 L${FX} 520 C ${FX} 720, 820 860, 690 1120`;
  const dR = `M${FX} 470 L${FX} 520 C ${FX} 720, 1100 860, 1230 1120`;
  svgWrap.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs><filter id="gl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter></defs>
    <path class="road" d="${dL}" pathLength="1" fill="none" stroke="${AMBER}" stroke-opacity=".16" stroke-width="70" stroke-linecap="round"/>
    <path class="road" d="${dR}" pathLength="1" fill="none" stroke="${BLUE}" stroke-opacity=".16" stroke-width="70" stroke-linecap="round"/>
    <path class="glow" d="${dL}" pathLength="1" fill="none" stroke="${AMBER}" stroke-width="10" filter="url(#gl)"/>
    <path class="glow" d="${dR}" pathLength="1" fill="none" stroke="${BLUE}" stroke-width="10" filter="url(#gl)"/>
    <path class="core" id="laneL" d="${dL}" pathLength="1" fill="none" stroke="${AMBER}" stroke-width="5" stroke-linecap="round"/>
    <path class="core" id="laneR" d="${dR}" pathLength="1" fill="none" stroke="${BLUE}" stroke-width="5" stroke-linecap="round"/>
    <g id="pulses"></g>
    <circle id="fork" cx="${FX}" cy="${FY}" r="12" fill="#F6F3EC"/>
  </svg>`;
  const svg = svgWrap.querySelector('svg');
  const lines = [...svg.querySelectorAll('.road, .glow, .core')];
  const laneL = svg.querySelector('#laneL'), laneR = svg.querySelector('#laneR');
  const fork = svg.querySelector('#fork');
  const pulseG = svg.querySelector('#pulses');
  const NS = 'http://www.w3.org/2000/svg';
  const pulses = [];
  [[laneL, AMBER], [laneR, BLUE]].forEach(([p, c]) => {
    for (let k = 0; k < 3; k++) {
      const dot = document.createElementNS(NS, 'circle');
      dot.setAttribute('r', '9'); dot.setAttribute('fill', c);
      dot.style.filter = `drop-shadow(0 0 12px ${c})`;
      pulseG.appendChild(dot);
      pulses.push({ p, dot, k });
    }
  });

  /* ---- the slide card + split ghosts ---- */
  const CW = 480, CHt = 270, CX = FX - CW / 2, CY = 195;
  const mkGhost = (c) => el('div', 'abs', cam, { left: CX + 'px', top: CY + 'px', width: CW + 'px', height: CHt + 'px', borderRadius: '14px',
    border: `3px solid ${c}`, background: `${c}22`, boxShadow: `0 0 50px ${c}88`, opacity: 0 });
  const ghostL = mkGhost(AMBER), ghostR = mkGhost(BLUE);
  const card = el('div', 'abs', cam, { left: CX + 'px', top: CY + 'px', width: CW + 'px', height: CHt + 'px', borderRadius: '14px',
    background: 'var(--paper)', boxShadow: '0 40px 90px rgba(0,0,0,.55), 0 0 60px rgba(246,243,236,.10)', overflow: 'hidden' });
  const ct = el('div', 'abs', card, { left: '36px', top: '34px', width: '400px', font: '800 30px/1.12 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)' });
  ct.textContent = 'Built-in Export vs a Dedicated Converter';
  [0, 1, 2].forEach((i) => el('div', 'abs', card, { left: '36px', top: 140 + i * 26 + 'px', width: [300, 360, 220][i] + 'px', height: '10px', borderRadius: '5px', background: 'rgba(27,34,56,.12)' }));
  const tagCard = el('div', 'abs', card, { left: '36px', bottom: '24px', font: '600 14px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'var(--mist)' });
  tagCard.textContent = 'SLIDE 1 · .PPTX';
  const play = el('div', 'abs', card, { right: '30px', bottom: '22px', width: '76px', height: '76px', borderRadius: '50%', background: 'var(--ink)', boxShadow: '0 10px 30px rgba(15,20,36,.35)' });
  el('div', 'abs', play, { left: '30px', top: '23px', width: 0, height: 0, borderTop: '15px solid transparent', borderBottom: '15px solid transparent', borderLeft: '24px solid #F6F3EC' });

  /* ---- labels (outside the camera so they stay in frame) ---- */
  const mkLabel = (side, tagTxt, w1, w2, c) => {
    const g = el('div', 'abs', stage, { [side]: '110px', top: '600px', textAlign: side, width: '640px' });
    const t = el('div', '', g, { font: '600 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: c, marginBottom: '18px' });
    t.textContent = tagTxt;
    const l1 = el('div', '', g, { font: '800 110px/0.95 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)' });
    l1.textContent = w1;
    const l2 = el('div', '', g, { font: '800 110px/0.95 Inter Display, Inter', letterSpacing: '-.045em', color: c, textShadow: `0 0 40px ${c}66` });
    l2.textContent = w2;
    return { g, parts: [t, l1, l2] };
  };
  const labA = mkLabel('left', 'YOUR VOICE', 'Built-in', 'Export', AMBER);
  const labB = mkLabel('right', 'YOUR NOTES', 'Dedicated', 'Converter', BLUE);

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- pulses along lanes ---- */
  const pulseState = { a: 0 };
  let lenL = 0, lenR = 0;
  ctx.onFrame((t) => {
    if (!lenL) { lenL = laneL.getTotalLength() || 900; lenR = laneR.getTotalLength() || 900; }
    pulses.forEach(({ p, dot, k }) => {
      const prog = (((t - diff) * 0.28 + k / 3) % 1 + 1) % 1;
      const len = p === laneL ? lenL : lenR;
      const pt = p.getPointAtLength(prog * len);
      dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
      const fade = Math.min(1, prog * 8, (1 - prog) * 4);
      dot.setAttribute('opacity', (pulseState.a * fade).toFixed(3));
    });
  });

  /* ---- timeline ---- */
  gsap.set(lines, { strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.set(fork, { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
  gsap.set(play, { scale: 0, opacity: 0 });
  gsap.set([...labA.parts, ...labB.parts], { opacity: 0, y: 70 });

  // opening: the card arrives
  tl.fromTo(card, { y: 40, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.9 }, 0.05);
  tl.to(drift, { y: -14, x: 6, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.to(cam, { scale: 1.02, duration: pick, ease: 'power1.inOut' }, 0);

  // "video?": the slide becomes a video
  tl.to(play, { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(2)' }, vid - 0.05);

  // "two": card splits into two paths
  tl.to(ghostL, { opacity: 1, x: -46, y: 10, rotation: -5, duration: 0.8, ease: 'back.out(1.6)' }, two - 0.1);
  tl.to(ghostR, { opacity: 1, x: 46, y: 10, rotation: 5, duration: 0.8, ease: 'back.out(1.6)' }, two - 0.1);
  tl.to(card, { y: -6, duration: 0.8 }, two - 0.1);
  tl.to(fork, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, two + 0.1);
  tl.to(lines, { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut' }, two + 0.15);

  // "options": labels rise on each lane
  tl.to(labA.parts, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, opts - 0.15);
  tl.to(labB.parts, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, opts + 0.15);

  // "different jobs": traffic on both lanes
  tl.to(pulseState, { a: 1, duration: 0.6, ease: 'power1.out' }, diff - 0.2);

  // "pick the right one": slow push toward the fork
  tl.to(cam, { scale: 1.12, y: 30, duration: ctx.dur - pick + 0.2, ease: 'power2.inOut' }, pick - 0.2);
  tl.to(fork, { scale: 1.6, duration: 0.4, yoyo: true, repeat: 1, ease: 'power2.out' }, right);
  tl.to([labA.g, labB.g], { y: -10, duration: ctx.dur - right, ease: 'power1.inOut' }, right);
});
