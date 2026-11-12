/* Scene 0 — "A slide fills with words. You stop listening to read, and you fall behind on both.
 * Here's how to spot an overloaded slide and fix it."
 * Storyboard: night stage. A blank slate-outlined slide frame sits centre-left, with a live narration
 * waveform beside it. On "fills with words", tiny paper-coloured word blocks pour in, jittery and fast,
 * until the frame is choked. On "stop listening" the waveform flattens to a slate line. On "fall behind"
 * both drift out of focus. On "spot", coral corner brackets lock onto the overloaded slide. On "fix it"
 * the clutter sweeps away and the rebuilt title lands: "How Much Text Is / Too Much?", with
 * "Too Much?" in coral. A slow push-in runs throughout. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const R = ctx.rand(7);
  const fills = ctx.at(0, 'fills'), stop = ctx.at(1, 'stop'), fall = ctx.at(1, 'fall');
  const spot = ctx.at(2, 'spot'), over = ctx.at(2, 'overloaded'), fix = ctx.at(2, 'fix');

  stage.style.background = 'radial-gradient(60% 55% at 45% 45%, #1a1d33 0%, var(--night) 75%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(30% 30% at 50% 50%, rgba(255,90,78,.18), transparent 70%)', opacity: 0 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  const mono = '600 20px/1 ui-monospace, Menlo, monospace';

  const FX = 300, FY = 270, FW = 900, FH = 520;
  const slideWrap = el('div', 'abs', cam, { left: FX + 'px', top: FY + 'px', width: FW + 'px', height: FH + 'px' });
  const frame = el('div', 'abs', slideWrap, { inset: 0, border: '2px solid var(--slate)', borderRadius: '10px', background: 'rgba(246,243,236,.035)', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,.55)' });
  const slideLab = el('div', 'abs', slideWrap, { left: '2px', top: '-44px', font: mono, letterSpacing: '.14em', color: 'var(--slate)' });
  slideLab.textContent = 'SLIDE';

  const rows = [];
  const titleBar = el('div', 'abs', frame, { left: '44px', top: '36px', width: '440px', height: '22px', borderRadius: '4px', background: 'var(--paper)', opacity: 0.9 });
  rows.push([titleBar]);
  for (let y = 86; y < FH - 26; y += 17) {
    const row = [];
    let x = 44 + (R() < 0.3 ? 22 : 0);
    while (x < FW - 90) {
      const w = 16 + Math.floor(R() * 70);
      if (x + w > FW - 44) break;
      row.push(el('div', 'abs', frame, { left: x + 'px', top: y + 'px', width: w + 'px', height: '8px', borderRadius: '3px', background: 'var(--paper)', opacity: 0.55 + R() * 0.35 }));
      x += w + 8;
    }
    rows.push(row);
  }
  const blocks = rows.flat();

  const WX = 1300, WY = 420, WW = 380, WH = 200;
  const waveWrap = el('div', 'abs', cam, { left: WX + 'px', top: WY + 'px', width: WW + 'px', height: WH + 'px' });
  const waveLab = el('div', 'abs', waveWrap, { left: '2px', top: '-44px', font: mono, letterSpacing: '.14em', color: 'var(--slate)' });
  waveLab.textContent = 'NARRATION';
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', WW); svg.setAttribute('height', WH);
  svg.style.overflow = 'visible';
  waveWrap.appendChild(svg);
  const path = document.createElementNS(NS, 'path');
  path.setAttribute('fill', 'none'); path.setAttribute('stroke', '#1FB5A8');
  path.setAttribute('stroke-width', '5'); path.setAttribute('stroke-linecap', 'round'); path.setAttribute('stroke-linejoin', 'round');
  path.style.filter = 'drop-shadow(0 0 12px rgba(31,181,168,.6))';
  svg.appendChild(path);
  const wave = { amp: 1 };
  ctx.onFrame((t) => {
    let d = '';
    const mid = WH / 2;
    for (let i = 0; i <= 90; i++) {
      const x = (i / 90) * WW;
      const env = Math.sin((i / 90) * Math.PI);
      const y = mid + wave.amp * env * 70 * (0.6 * Math.sin(i * 0.42 + t * 9) + 0.4 * Math.sin(i * 0.17 - t * 5.3));
      d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    path.setAttribute('d', d);
  });

  const corners = [[0, 0], [1, 0], [0, 1], [1, 1]].map(([cx, cy]) => {
    const c = el('div', 'abs', cam, { left: FX - 22 + cx * (FW + 44) - cx * 60 + 'px', top: FY - 22 + cy * (FH + 44) - cy * 60 + 'px', width: '60px', height: '60px',
      borderColor: 'var(--coral)', borderStyle: 'solid', borderWidth: `${cy ? 0 : 6}px ${cx ? 6 : 0}px ${cy ? 6 : 0}px ${cx ? 0 : 6}px`,
      filter: 'drop-shadow(0 0 10px rgba(255,90,78,.7))', opacity: 0 });
    return { c, cx, cy };
  });
  const tagOver = el('div', 'abs', cam, { left: FX + 'px', top: FY + FH + 40 + 'px', font: mono, letterSpacing: '.14em', color: 'var(--coral)', opacity: 0 });
  tagOver.textContent = 'OVERLOADED';

  const titleBox = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '350px', textAlign: 'center' });
  const l1 = el('div', '', titleBox, { font: '800 130px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)' });
  const l2 = el('div', '', titleBox, { font: '900 130px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--coral)', textShadow: '0 0 60px rgba(255,90,78,.45)' });
  const c1 = ctx.split(l1, 'How Much Text Is', 'char');
  const c2 = ctx.split(l2, 'Too Much?', 'char');
  const rule = el('div', 'abs', cam, { left: '810px', width: '300px', top: '660px', height: '6px', borderRadius: '3px', background: 'var(--coral)', transformOrigin: '50% 50%' });

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.07 });

  gsap.set([slideWrap, waveWrap], { filter: 'blur(0px)' });
  gsap.set([...c1, ...c2], { opacity: 0, y: 70, filter: 'blur(14px)' });
  gsap.set(rule, { scaleX: 0 });
  gsap.set(blocks, { opacity: 0 });

  tl.to(cam, { scale: 1.07, duration: ctx.dur, ease: 'power1.inOut' }, 0);
  tl.from(slideWrap, { opacity: 0, y: 30, duration: 0.7 }, 0);
  tl.from(waveWrap, { opacity: 0, x: 30, duration: 0.7 }, 0.15);

  rows.forEach((row, i) => {
    const t0 = fills - 0.25 + i * 0.045;
    row.forEach((b, j) => {
      const op = parseFloat(b.style.opacity) || 0.8;
      tl.fromTo(b, { opacity: 0, y: -24 - R() * 30, x: (R() - 0.5) * 30, rotation: (R() - 0.5) * 14 },
        { opacity: op, y: 0, x: 0, rotation: 0, duration: 0.28, ease: 'back.out(2)', immediateRender: false }, t0 + j * 0.012);
    });
  });
  tl.to(frame, { borderColor: 'rgba(255,90,78,.7)', duration: 0.4 }, fills + rows.length * 0.045 - 0.1);

  tl.to(wave, { amp: 0, duration: 0.9, ease: 'power2.inOut' }, stop - 0.05);
  tl.to(path, { attr: { stroke: '#8A90A6' }, duration: 0.6 }, stop + 0.1);
  tl.set(path, { filter: 'none' }, stop + 0.7);

  tl.to(slideWrap, { filter: 'blur(5px)', opacity: 0.55, y: 18, duration: 1.2, ease: 'power2.inOut' }, fall - 0.1);
  tl.to(waveWrap, { filter: 'blur(5px)', opacity: 0.45, y: 26, duration: 1.2, ease: 'power2.inOut' }, fall + 0.05);

  tl.to(slideLab, { opacity: 0, duration: 0.3 }, spot - 0.15);
  corners.forEach(({ c, cx, cy }, i) => {
    tl.fromTo(c, { opacity: 0, x: (cx ? 40 : -40), y: (cy ? 40 : -40) }, { opacity: 1, x: 0, y: 0, duration: 0.55, ease: 'back.out(1.8)', immediateRender: false }, spot - 0.05 + i * 0.04);
  });
  tl.to(slideWrap, { filter: 'blur(0px)', opacity: 1, duration: 0.6 }, spot);
  tl.fromTo(tagOver, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, immediateRender: false }, over);
  tl.to(frame, { boxShadow: '0 0 60px rgba(255,90,78,.45)', duration: 0.4, yoyo: true, repeat: 1 }, over);

  const sw = fix - 0.6;
  tl.to(blocks, { x: 1500, opacity: 0, duration: 0.4, ease: 'power2.in', stagger: { amount: 0.25, from: 'end' } }, sw);
  tl.to([slideWrap, waveWrap, tagOver, ...corners.map((o) => o.c)], { opacity: 0, scale: 0.94, duration: 0.45, ease: 'power2.in' }, sw + 0.1);
  tl.to(glow, { opacity: 1, duration: 1.0, ease: 'power2.out' }, fix - 0.2);
  tl.to(c1, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out', stagger: 0.02 }, fix - 0.3);
  tl.to(c2, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'back.out(1.5)', stagger: 0.03 }, fix - 0.1);
  tl.to(rule, { scaleX: 1, duration: 0.6, ease: 'expo.out' }, fix + 0.3);
});
