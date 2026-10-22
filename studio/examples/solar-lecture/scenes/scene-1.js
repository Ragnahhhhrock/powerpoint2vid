/* Scene 1 — "When a photon hits the silicon, it knocks an electron loose. The cell's built-in electric
 *            field pushes those electrons one way, and that flow is a current."
 * Storyboard: zoom into a silicon lattice of glowing atoms. A photon streak hits on "photon"; an electron
 * pops free on "loose". On "electric field" chevrons sweep across; on "current" many electrons stream
 * right in a river of light with a label. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const hits = ctx.at(0, 'hits'), loose = ctx.at(0, 'loose'), field = ctx.at(1, 'electric field'), pushes = ctx.at(1, 'pushes'), current = ctx.at(1, 'current');
  const r = ctx.rand(11);

  stage.style.background = 'radial-gradient(80% 70% at 50% 55%, #10264a 0%, #050d18 78%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  /* lattice */
  const COLS = 11, ROWS = 5, X0 = 260, Y0 = 330, DX = 140, DY = 130;
  const lat = el('div', 'abs', cam, { inset: 0 });
  const bonds = el('div', 'abs', lat, { left: 0, top: 0, width: '1920px', height: '1080px' });
  let d = '';
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
    const px = X0 + x * DX, py = Y0 + y * DY;
    if (x < COLS - 1) d += `M${px} ${py} L${px + DX} ${py} `;
    if (y < ROWS - 1) d += `M${px} ${py} L${px} ${py + DY} `;
  }
  bonds.innerHTML = `<svg width="1920" height="1080"><path d="${d}" stroke="rgba(120,170,255,.22)" stroke-width="3" stroke-dasharray="8 10"/></svg>`;
  const atoms = [];
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
    const a = el('div', 'abs', lat, { left: X0 + x * DX - 30 + 'px', top: Y0 + y * DY - 30 + 'px', width: '60px', height: '60px', borderRadius: '50%',
      background: 'radial-gradient(circle at 38% 34%, #9cc4ff 0%, #3c6fc0 45%, #1a3a74 100%)', boxShadow: '0 0 24px rgba(80,140,255,.35)', font: '700 18px/60px Inter', textAlign: 'center', color: 'rgba(255,255,255,.75)' });
    a.textContent = 'Si'; atoms.push(a);
  }
  const target = atoms[2 * COLS + 5]; const TX = X0 + 5 * DX, TY = Y0 + 2 * DY;

  /* field band */
  const band = el('div', 'abs', cam, { left: '160px', right: '160px', top: Y0 - 80 + 'px', height: (ROWS - 1) * DY + 160 + 'px', borderRadius: '30px', background: 'linear-gradient(90deg, rgba(255,107,74,.10), rgba(58,160,255,.14))', border: '2px solid rgba(160,200,255,.18)', opacity: 0 });
  const chevs = Array.from({ length: 5 }, (_, row) => Array.from({ length: 7 }, (_, k) => {
    const c = el('div', 'abs', cam, { left: 200 + k * 230 + 'px', top: Y0 - 18 + row * DY + 'px', font: '800 40px/1 Inter', color: 'rgba(255,214,120,.65)', opacity: 0 });
    c.textContent = '›'; return c;
  })).flat();
  const fieldTag = el('div', 'abs', stage, { left: '160px', top: '960px', font: '600 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: '#ffd27a', whiteSpace: 'nowrap' });
  fieldTag.textContent = 'BUILT-IN ELECTRIC FIELD  →→→';

  /* photon + electron */
  const photon = el('div', 'abs', cam, { left: TX + 'px', top: TY + 'px', width: '260px', height: '6px', marginTop: '-3px', borderRadius: '3px', transformOrigin: '100% 50%', rotate: '-58deg', translate: '-260px 0',
    background: 'linear-gradient(90deg, transparent, #ffd27a 70%, #fff)', boxShadow: '0 0 20px #ffb547', opacity: 0 });
  const flash = el('div', 'abs', cam, { left: TX - 120 + 'px', top: TY - 120 + 'px', width: '240px', height: '240px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,240,200,.95), rgba(255,180,60,0) 65%)', opacity: 0 });
  const ring = el('div', 'abs', cam, { left: TX - 50 + 'px', top: TY - 50 + 'px', width: '100px', height: '100px', borderRadius: '50%', border: '4px solid #ffd27a', opacity: 0 });
  const eWrap = el('div', 'abs', cam, { left: TX + 'px', top: TY + 'px' });
  const e = el('div', 'abs', eWrap, { left: '-17px', top: '-17px', width: '34px', height: '34px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, #eaffff, #5eead4 50%, #10b5a0)', boxShadow: '0 0 30px 6px rgba(94,234,212,.8)', font: '800 22px/34px Inter', textAlign: 'center', color: '#063b35' });
  e.textContent = '−';
  const eTag = el('div', 'abs', eWrap, { left: '30px', top: '-70px', padding: '10px 16px', borderRadius: '999px', background: 'rgba(94,234,212,.14)', border: '1px solid rgba(94,234,212,.5)', font: '700 24px/1 Inter', color: '#bdfcf1', whiteSpace: 'nowrap' });
  eTag.textContent = 'free electron';
  const hole = el('div', 'abs', cam, { left: TX - 30 + 'px', top: TY - 30 + 'px', width: '60px', height: '60px', borderRadius: '50%', border: '3px dashed #ff8f72', opacity: 0 });

  /* current river: electrons streaming right, drawn per frame */
  const river = el('div', 'abs', cam, { inset: 0 });
  const N = 46;
  const dots = Array.from({ length: N }, (_, i) => ({ el: el('div', 'abs', river, { left: 0, top: 0, width: '22px', height: '22px', marginLeft: '-11px', marginTop: '-11px', borderRadius: '50%',
    background: 'radial-gradient(circle, #eaffff, #5eead4 55%, rgba(16,181,160,0))', boxShadow: '0 0 18px rgba(94,234,212,.9)' }), lane: i % 4, off: r(), sp: 0.85 + r() * 0.35 }));
  const wire = el('div', 'abs', cam, { left: '1720px', top: Y0 - 60 + 'px', width: '24px', height: (ROWS - 1) * DY + 120 + 'px', borderRadius: '12px', background: 'linear-gradient(180deg, #c98a3a, #ffb547, #c98a3a)', opacity: 0 });
  const curTag = el('div', 'abs', stage, { right: '120px', top: '150px', font: '900 96px/1 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff', textAlign: 'right' });
  curTag.innerHTML = 'That flow is<br><span style="background:linear-gradient(100deg,#bdfcf1,#5eead4,#3aa0ff);-webkit-background-clip:text;background-clip:text;color:transparent">a current.</span>';

  const head = el('div', 'abs', stage, { left: '120px', top: '110px', font: '600 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.2em', color: 'var(--muted)' });
  head.textContent = 'INSIDE A SILICON CELL';
  const head2 = el('div', 'abs', stage, { left: '114px', top: '150px', font: '800 72px/1 Inter Display, Inter', letterSpacing: '-.035em', color: '#fff', whiteSpace: 'nowrap' });
  head2.textContent = 'One photon, one electron';

  ctx.fx.vignette({ strength: 0.6 });
  ctx.fx.grain({ opacity: 0.06 });

  const state = { flow: 0 };
  ctx.onFrame((t) => {
    const k = state.flow;
    dots.forEach((dd) => {
      const x = 160 + (((dd.off + (t - current + 0.6) * 0.32 * dd.sp) % 1 + 1) % 1) * 1560;
      const y = Y0 + 65 + dd.lane * DY + Math.sin(x / 90 + dd.off * 6) * 14;
      dd.el.style.transform = `translate(${x}px, ${y}px)`;
      dd.el.style.opacity = String(k * Math.min(1, (x - 160) / 120) * Math.min(1, (1720 - x) / 80));
    });
  });

  /* ---- timeline ---- */
  tl.fromTo(cam, { scale: 1.35 }, { scale: 1.02, duration: 3.2, ease: 'expo.out' }, 0);
  tl.to(cam, { scale: 0.96, duration: ctx.dur - 3.2, ease: 'sine.inOut' }, 3.2);
  tl.from(atoms, { scale: 0, opacity: 0, duration: 0.6, stagger: { each: 0.012, from: 'center' }, ease: 'back.out(2)' }, 0.05);
  tl.from(bonds, { opacity: 0, duration: 0.8 }, 0.3);
  tl.from([head, head2], { opacity: 0, y: 20, duration: 0.6, stagger: 0.12 }, 0.4);

  // photon hits
  tl.set(photon, { opacity: 1 }, hits - 0.55);
  tl.fromTo(photon, { x: -420, y: -680 }, { x: 0, y: 0, duration: 0.5, ease: 'power2.in', immediateRender: false }, hits - 0.55);
  tl.set(photon, { opacity: 0 }, hits - 0.05);
  tl.fromTo(flash, { opacity: 1, scale: 0.4 }, { opacity: 0, scale: 1.4, duration: 0.7, ease: 'power2.out', immediateRender: false }, hits - 0.05);
  tl.fromTo(ring, { opacity: 1, scale: 0.6 }, { opacity: 0, scale: 2.6, duration: 0.8, ease: 'power2.out', immediateRender: false }, hits - 0.05);
  tl.to(target, { scale: 1.25, background: 'radial-gradient(circle at 38% 34%, #fff3cf 0%, #ffb547 50%, #c06a1a 100%)', duration: 0.2, yoyo: true, repeat: 1 }, hits - 0.05);

  // electron knocked loose
  gsap.set(eWrap, { opacity: 0 });
  tl.set(eWrap, { opacity: 1 }, loose - 0.35);
  tl.fromTo(eWrap, { x: 0, y: 0, scale: 0.3 }, { x: 70, y: -95, scale: 1, duration: 0.7, ease: 'back.out(2.4)', immediateRender: false }, loose - 0.35);
  tl.from(eTag, { opacity: 0, x: -14, duration: 0.4 }, loose);
  tl.to(hole, { opacity: 1, duration: 0.3 }, loose);

  // field
  tl.to(band, { opacity: 1, duration: 0.6 }, field - 0.2);
  chevs.forEach((c, i) => tl.fromTo(c, { opacity: 0, x: -40 }, { opacity: 1, x: 30, duration: 0.5, ease: 'power2.out', immediateRender: false }, field - 0.1 + (i % 7) * 0.06));
  tl.from(fieldTag, { opacity: 0, x: -20, duration: 0.5 }, field);
  tl.to([head, head2], { opacity: 0, y: -20, duration: 0.5 }, field);

  // pushes one way
  tl.to(eTag, { opacity: 0, duration: 0.3 }, pushes - 0.1);
  tl.to(eWrap, { x: 1560 - TX + 160, y: 65, duration: 1.8, ease: 'power2.in' }, pushes);
  tl.to(chevs, { color: 'rgba(255,214,120,1)', duration: 0.3, stagger: 0.01 }, pushes);

  // current
  tl.to(state, { flow: 1, duration: 0.9, ease: 'power2.out' }, current - 0.7);
  tl.to(wire, { opacity: 1, duration: 0.5 }, current - 0.5);
  tl.to(wire, { boxShadow: '0 0 60px rgba(255,181,71,.9)', duration: 0.5, yoyo: true, repeat: 3 }, current - 0.2);
  tl.to(atoms, { opacity: 0.45, duration: 0.6 }, current - 0.5);
  gsap.set(curTag, { filter: 'blur(0px)' });
  tl.from(curTag, { opacity: 0, y: 30, filter: 'blur(10px)', duration: 0.6, ease: 'back.out(1.6)' }, current - 0.55);
});
