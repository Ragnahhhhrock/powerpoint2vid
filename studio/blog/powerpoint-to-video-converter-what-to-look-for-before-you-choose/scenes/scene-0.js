/* Scene 0 — "Every PowerPoint to video converter makes different trade-offs. Before you pick one,
 * ask the right questions, so the tool fits your work."
 * Storyboard: night stage. A single slide card floats centre; on "different trade-offs" it glides left
 * and splits into three diverging paths of light (signal, teal, amber) with pulses running along them.
 * On "ask the right questions" the paths and card dissolve and the headline "Choosing a converter"
 * rises in 140px paper type, "What to look for before you choose" settling beneath in mist.
 * The camera slowly pulls back and holds the title. Overlapping slide text is rebuilt cleanly. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const diff = ctx.at(0, 'different'), trade = ctx.at(0, 'trade-offs.');
  const ask = ctx.at(1, 'ask'), right = ctx.at(1, 'right'), questions = ctx.at(1, 'questions,');
  const fits = ctx.at(1, 'fits');
  const COLS = ['#FF6B4A', '#2BB5A3', '#F5B841'];

  stage.style.background = 'radial-gradient(60% 55% at 50% 48%, #1c2340 0%, var(--night) 75%)';
  const glow = el('div', 'abs', stage, { inset: 0, opacity: 0,
    background: 'radial-gradient(30% 30% at 85% 25%, rgba(255,107,74,.16), transparent 70%), radial-gradient(30% 30% at 88% 50%, rgba(43,181,163,.16), transparent 70%), radial-gradient(30% 30% at 85% 76%, rgba(245,184,65,.14), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 520px' });

  /* light paths */
  const svgWrap = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const O = [700, 540];
  const ends = [[1680, 250], [1720, 540], [1680, 830]];
  svgWrap.innerHTML = `<svg width="1920" height="1080"><defs><filter id="gl" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="8"/></filter></defs>
    ${ends.map((e, i) => {
      const d = `M${O[0]} ${O[1]} C ${O[0] + 380} ${O[1]}, ${e[0] - 520} ${e[1]}, ${e[0]} ${e[1]}`;
      return `<g><path d="${d}" fill="none" stroke="${COLS[i]}" stroke-width="16" stroke-linecap="round" opacity=".45" filter="url(#gl)" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" class="pg"/>
        <path id="p${i}" d="${d}" fill="none" stroke="${COLS[i]}" stroke-width="4" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" class="pl"/>
        <circle class="node" cx="${e[0]}" cy="${e[1]}" r="14" fill="${COLS[i]}" style="filter:drop-shadow(0 0 18px ${COLS[i]})"/>
        <circle class="dot" r="7" fill="#fff" style="filter:drop-shadow(0 0 12px ${COLS[i]})"/></g>`;
    }).join('')}</svg>`;
  const pathsGlow = [...svgWrap.querySelectorAll('.pg')], pathsLine = [...svgWrap.querySelectorAll('.pl')];
  const nodes = [...svgWrap.querySelectorAll('.node')], dots = [...svgWrap.querySelectorAll('.dot')];
  const lens = pathsLine.map((p) => p.getTotalLength());
  const dotState = [{ p: 0 }, { p: 0 }, { p: 0 }];

  /* slide card (rebuilt cleanly) */
  const card = el('div', 'abs', cam, { left: '700px', top: '390px', width: '520px', height: '300px', borderRadius: '18px',
    background: 'linear-gradient(160deg, #fbf9f4, #ece7dc)', boxShadow: '0 40px 100px rgba(0,0,0,.55), 0 0 80px rgba(246,243,236,.12)', overflow: 'hidden' });
  const cLab = el('div', 'abs', card, { left: '40px', top: '38px', font: '600 14px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: '#9AA3B5' });
  cLab.textContent = 'SLIDE 1';
  const cT = el('div', 'abs', card, { left: '40px', top: '80px', width: '440px', font: '800 38px/1.08 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)' });
  cT.textContent = 'Choosing a PowerPoint to Video Converter';
  const cS = el('div', 'abs', card, { left: '40px', top: '214px', font: '500 20px/1 Inter', color: '#9AA3B5' });
  cS.textContent = 'What to look for before you choose';
  const cBar = el('div', 'abs', card, { left: '40px', top: '252px', width: '80px', height: '5px', borderRadius: '3px', background: 'var(--signal)' });

  /* headline */
  const head = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '380px', textAlign: 'center', font: '900 140px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)', textShadow: '0 0 60px rgba(246,243,236,.18)' });
  const words = ctx.split(head, 'Choosing a converter', 'word');
  const sub = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '570px', textAlign: 'center', font: '500 48px/1.2 Inter', letterSpacing: '-.01em', color: 'var(--mist)' });
  sub.textContent = 'What to look for before you choose';
  const rule = el('div', 'abs', cam, { left: '880px', width: '160px', top: '680px', height: '5px', borderRadius: '3px', background: 'linear-gradient(90deg, #FF6B4A, #2BB5A3, #F5B841)', transformOrigin: '50% 50%' });

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame(() => {
    dots.forEach((d, i) => {
      const pt = pathsLine[i].getPointAtLength(lens[i] * (dotState[i].p % 1));
      d.setAttribute('cx', pt.x); d.setAttribute('cy', pt.y);
    });
  });

  /* ---- timeline ---- */
  gsap.set([...nodes, ...dots], { opacity: 0, transformOrigin: 'center', transformBox: 'fill-box' });
  gsap.set([card, svgWrap], { filter: 'blur(0px) brightness(1)' });
  gsap.set(words, { opacity: 0, y: 90 });
  gsap.set(sub, { opacity: 0, y: 30 });
  gsap.set(rule, { scaleX: 0 });

  // camera: slow pull back over whole scene
  tl.fromTo(cam, { scale: 1.07, x: 10 }, { scale: 1, x: 0, duration: ctx.dur, ease: 'power1.inOut' }, 0);

  // card arrives and floats
  tl.fromTo(card, { opacity: 0, y: 50, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 1.0 }, 0.05);
  tl.to(card, { y: -10, duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 1.0);

  // "different trade-offs": glide left, split into three paths
  tl.to(card, { x: -520, scale: 0.62, duration: 0.9, ease: 'expo.inOut' }, diff - 0.45);
  pathsLine.forEach((p, i) => {
    const t = diff + 0.15 + i * 0.12;
    tl.to([p, pathsGlow[i]], { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' }, t);
    tl.fromTo(nodes[i], { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, t + 0.85);
    tl.to(dots[i], { opacity: 1, duration: 0.2 }, t + 0.9);
    tl.fromTo(dotState[i], { p: 0 }, { p: 2, duration: 2.6, ease: 'none', immediateRender: false }, t + 0.9);
  });
  tl.to(glow, { opacity: 1, duration: 1.2, ease: 'power2.out' }, trade);

  // "ask the right questions": paths dissolve, headline rises
  tl.to([card, svgWrap], { opacity: 0, filter: 'blur(10px) brightness(.6)', duration: 0.7, ease: 'power2.in' }, ask - 0.15);
  tl.to(glow, { opacity: 0, duration: 0.9 }, ask);
  tl.to(words, { opacity: 1, y: 0, duration: 0.9, stagger: 0.09, ease: 'back.out(1.4)' }, right - 0.15);
  tl.to(sub, { opacity: 1, y: 0, duration: 0.9 }, questions + 0.3);
  tl.to(rule, { scaleX: 1, duration: 0.7, ease: 'expo.out' }, questions + 0.55);
  tl.to(head, { textShadow: '0 0 90px rgba(246,243,236,.32)', duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, fits);
});
