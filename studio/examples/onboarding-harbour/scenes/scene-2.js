/* Scene 2 — "Everything we do comes back to three values. Customers first. Own the outcome. Keep it simple."
 * Storyboard: three big ink stamps slam down one per value on the spoken words, each with a small shake and
 * ink splatter, numbered 1-2-3 in red. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const INK = '#1d1a16';
  const three = ctx.at(0, 'three values');
  const VALS = [['Customers', 'first.'], ['Own the', 'outcome.'], ['Keep it', 'simple.']];
  const r = ctx.rand(21);

  stage.style.background = 'radial-gradient(90% 80% at 50% 40%, #fbf7ee 0%, var(--paper) 60%, #e6dcc6 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 580px' });
  const head = el('div', 'abs', cam, { left: 0, right: 0, top: '120px', textAlign: 'center', font: '800 72px/1 Inter Display, Inter', letterSpacing: '-.04em', color: INK });
  const hw = ctx.split(head, 'Three values, everything we do', 'word');
  hw[0].style.color = '#d9483b';
  const rule = el('div', 'abs', cam, { left: '760px', width: '400px', top: '222px', height: '6px', borderRadius: '3px', background: INK, transformOrigin: '50% 50%' });

  const ghosts = [0, 1, 2].map((i) => el('div', 'abs', cam, { left: 170 + i * 540 + 'px', top: '330px', width: '500px', height: '540px', borderRadius: '18px', border: '6px dashed rgba(29,26,22,.25)', rotate: [-4, 2.5, -2][i] + 'deg', font: '900 120px/528px Inter', textAlign: 'center', color: 'rgba(29,26,22,.12)' }));
  ghosts.forEach((g, i) => { g.textContent = String(i + 1); });
  const stamps = VALS.map(([a, b], i) => {
    const x = 170 + i * 540;
    const s = el('div', 'abs', cam, { left: x + 'px', top: '330px', width: '500px', height: '540px', rotate: [-4, 2.5, -2][i] + 'deg' });
    const splat = el('div', 'abs', s, { inset: '-40px' });
    splat.innerHTML = `<svg width="580" height="620">${Array.from({ length: 14 }, () => { const ang = r() * 6.28, rr = 250 + r() * 60; return `<circle cx="${290 + Math.cos(ang) * rr}" cy="${310 + Math.sin(ang) * rr * 1.05}" r="${3 + r() * 9}" fill="${i === 1 ? '#1f3a5f' : '#d9483b'}" opacity=".75"/>`; }).join('')}</svg>`;
    const card = el('div', 'abs', s, { inset: 0, borderRadius: '18px', border: `8px solid ${INK}`, background: '#fffdf8', boxShadow: '12px 14px 0 rgba(29,26,22,.2)' });
    el('div', 'abs', card, { inset: '14px', borderRadius: '10px', border: `3px dashed rgba(29,26,22,.35)` });
    const num = el('div', 'abs', card, { left: '40px', top: '40px', width: '110px', height: '110px', borderRadius: '50%', background: ['#d9483b', '#1f3a5f', '#e8a33d'][i], border: `6px solid ${INK}`, font: '900 64px/98px Inter', textAlign: 'center', color: '#fff' }); num.textContent = String(i + 1);
    const t = el('div', 'abs', card, { left: '40px', right: '30px', top: '220px', font: '900 80px/1 Inter Display, Inter', letterSpacing: '-.045em', color: INK });
    t.innerHTML = `${a}<br><span style="color:${['#d9483b', '#1f3a5f', '#b5761a'][i]}">${b}</span>`;
    return { s, splat };
  });

  ctx.fx.grain({ opacity: 0.08, blend: 'multiply' });
  ctx.fx.vignette({ strength: 0.22 });

  /* ---- timeline ---- */
  tl.fromTo(cam, { scale: 1.04 }, { scale: 1, duration: ctx.dur, ease: 'power1.out' }, 0);
  tl.from(hw, { y: 50, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'back.out(1.8)' }, 0.2);
  tl.from(rule, { scaleX: 0, duration: 0.6, ease: 'power3.inOut' }, three - 0.2);
  tl.from(ghosts, { opacity: 0, scale: 0.85, duration: 0.45, stagger: 0.12, ease: 'back.out(2)' }, three - 0.1);
  stamps.forEach((k, i) => {
    const t = ctx.beat(i + 1) - 0.12;
    gsap.set(k.s, { opacity: 0 });
    tl.fromTo(k.s, { opacity: 0, scale: 2.4, y: -60 }, { opacity: 1, scale: 1, y: 0, duration: 0.28, ease: 'power4.in', immediateRender: false }, t - 0.28);
    tl.from(k.splat, { scale: 0.6, opacity: 0, duration: 0.3, ease: 'power3.out' }, t);
    tl.to(cam, { x: [10, -12, 8][i], y: 8, duration: 0.05, yoyo: true, repeat: 3, ease: 'none' }, t);
  });
});
