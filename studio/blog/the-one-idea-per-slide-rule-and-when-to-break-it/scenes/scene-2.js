/* Scene 2 — "The audience knows where to look. What they see stays in step with what they hear. And in a
 *            video, every new idea means a fresh picture on screen."
 * Storyboard: three glowing orbs, one per phrase (focus, eye+ear in step, film strip of fresh pictures). */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const t0 = ctx.at(0, 'know'), t1 = ctx.at(1, 'see'), t2 = ctx.at(2, 'fresh');
  stage.style.background = 'radial-gradient(90% 80% at 50% 60%, #1a1850 0%, #0a0d24 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });
  el('div', 'abs', cam, { left: '560px', top: '260px', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,74,255,.35), rgba(109,74,255,0) 65%)' });

  const head = el('div', 'abs', stage, { left: 0, right: 0, top: '110px', textAlign: 'center', font: '600 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.28em', color: '#aab0d4' });
  head.textContent = 'WHY THE RULE WORKS';

  const XS = [480, 960, 1440], CY = 470, R = 150;
  const cols = [['#8f75ff', '#6d4aff'], ['#ff9a7a', '#ff6b4a'], ['#7ff5e0', '#14b8a6']];
  const names = ['Know where to look', 'Eyes and ears in step', 'A fresh picture each idea'];
  const orbs = XS.map((x, i) => {
    const w = el('div', 'abs', cam, { left: x - R + 'px', top: CY - R + 'px', width: 2 * R + 'px', height: 2 * R + 'px' });
    const glow = el('div', 'abs', w, { inset: '-60px', borderRadius: '50%', background: `radial-gradient(circle, ${cols[i][0]}88, ${cols[i][1]}00 65%)`, opacity: 0.0 });
    const body = el('div', 'abs', w, { inset: 0, borderRadius: '50%', background: `radial-gradient(circle at 36% 30%, ${cols[i][0]}, ${cols[i][1]} 62%, #1a1850 130%)`, boxShadow: '0 40px 90px rgba(0,0,0,.5), inset 0 -20px 50px rgba(0,0,0,.25)' });
    const lab = el('div', 'abs', cam, { left: x - 280 + 'px', top: CY + R + 70 + 'px', width: '560px', textAlign: 'center', font: '800 42px/1.1 Inter Display, Inter', letterSpacing: '-.02em', color: '#fff' });
    lab.textContent = names[i];
    return { w, glow, body, lab };
  });

  /* orb 1: focus rings */
  const o1 = orbs[0].w;
  const rings = [0, 1, 2].map((k) => el('div', 'abs', o1, { left: 50 + k * 22 + 'px', top: 50 + k * 22 + 'px', width: 200 - k * 44 + 'px', height: 200 - k * 44 + 'px', borderRadius: '50%', border: '6px solid rgba(255,255,255,.9)' }));
  const dot = el('div', 'abs', o1, { left: '130px', top: '130px', width: '40px', height: '40px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 30px #fff' });

  /* orb 2: eye + sound arcs, linked */
  const o2 = orbs[1].w;
  const svg2 = el('div', 'abs', o2, { inset: 0 });
  svg2.innerHTML = '<svg width="300" height="300" viewBox="0 0 300 300" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"><path d="M50 120 Q100 70 150 120 Q100 170 50 120Z" fill="rgba(255,255,255,.18)"/><circle cx="100" cy="120" r="14" fill="#fff"/><path d="M185 100 Q215 120 185 140"/><path d="M205 80 Q250 120 205 160"/><path d="M80 215 L220 215" stroke-dasharray="2 18"/></svg>';
  const pulse = el('div', 'abs', o2, { left: '70px', top: '203px', width: '24px', height: '24px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 24px #fff' });

  /* orb 3: film strip with flipping frames */
  const o3 = orbs[2].w;
  const strip = el('div', 'abs', o3, { left: '55px', top: '75px', width: '190px', height: '150px', borderRadius: '14px', background: 'rgba(8,20,40,.55)', overflow: 'hidden' });
  const frames = [0, 1, 2].map((k) => el('div', 'abs', strip, { left: 12 + k * 58 + 'px', top: '36px', width: '50px', height: '78px', borderRadius: '8px', background: ['#fff', '#ffd27a', '#ff9a7a'][k] }));
  for (let k = 0; k < 5; k++) { el('div', 'abs', strip, { left: 10 + k * 38 + 'px', top: '10px', width: '16px', height: '10px', borderRadius: '3px', background: 'rgba(255,255,255,.7)' }); el('div', 'abs', strip, { left: 10 + k * 38 + 'px', top: '130px', width: '16px', height: '10px', borderRadius: '3px', background: 'rgba(255,255,255,.7)' }); }
  const link = el('div', 'abs', cam, { left: XS[0] + R + 'px', top: CY + 'px', width: XS[2] - XS[0] - 2 * R + 'px', height: '4px', borderRadius: '2px', background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.35), rgba(255,255,255,0))', opacity: 0 });

  ctx.fx.vignette({ strength: 0.55 }); ctx.fx.grain({ opacity: 0.06 });

  /* timeline */
  tl.to(cam, { scale: 1.05, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.from(head, { opacity: 0, y: -14, duration: 0.5 }, 0.2);
  const times = [t0, t1, t2];
  orbs.forEach((o, i) => {
    const s = times[i] - 0.5;
    tl.from(o.w, { scale: 0, opacity: 0, y: 60, duration: 0.8, ease: 'back.out(1.8)' }, s);
    tl.from(o.lab, { opacity: 0, y: 24, duration: 0.5 }, s + 0.25);
    tl.to(o.glow, { opacity: 1, duration: 0.5 }, s + 0.2);
    // later orbs take the spotlight: previous ones dim
    if (i < 2) { tl.to([o.w, o.lab], { opacity: 0.4, scale: 0.94, duration: 0.6 }, times[i + 1] - 0.5); tl.to(o.glow, { opacity: 0, duration: 0.5 }, times[i + 1] - 0.5); }
  });
  tl.to(orbs.map((o) => [o.w, o.lab]).flat(), { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' }, ctx.dur - 1.8);
  tl.to(orbs.map((o) => o.glow), { opacity: 1, duration: 0.9 }, ctx.dur - 1.8);
  // orb 1 rings pulse
  tl.from(rings, { scale: 0, duration: 0.6, stagger: 0.12, ease: 'back.out(2)' }, t0 - 0.2);
  tl.fromTo(dot, { scale: 1 }, { scale: 1.5, duration: 0.5, yoyo: true, repeat: 5, ease: 'sine.inOut', immediateRender: false }, t0 + 0.4);
  // orb 2: pulse travels from ear to eye
  tl.fromTo(pulse, { x: 0, opacity: 0 }, { x: 130, opacity: 1, duration: 0.7, ease: 'power1.inOut', repeat: 3, immediateRender: false }, t1);
  tl.to(link, { opacity: 1, duration: 0.6 }, t1 + 0.3);
  // orb 3: frames flip
  const picks = ['#ff9a7a', '#5eead4', '#fff', '#ffd27a', '#8f75ff'];
  frames.forEach((f, k) => picks.forEach((c, j) => tl.to(f, { backgroundColor: picks[(j + k) % picks.length], scaleY: j % 2 ? 0.8 : 1, duration: 0.25, ease: 'power2.inOut' }, t2 + 0.25 + j * 0.5)));
});
