/* Scene 2 — "White space is any area without content, not just white. It focuses the eye,
 * groups related things, and makes a slide feel calm and confident."
 * Storyboard: a deep calm-blue field fills the frame, captioned "Any area without content"
 * (white space needn't be white). On "focuses" the caption snaps away; one coral dot sits alone
 * and a soft spotlight settles on it. On "groups" scattered dots glide into two tight clusters
 * with a clear gap. On "calm and confident" the clusters exhale and settle, and "Calm" fades in
 * at 120px on the open side. The slide's three overlapping bullets become these three beats. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const sNot = ctx.at(0, 'not');
  const focus = ctx.at(1, 'focuses'), groups = ctx.at(1, 'groups');
  const calm = ctx.at(1, 'calm'), conf = ctx.at(1, 'confident');

  stage.style.background = 'radial-gradient(80% 70% at 50% 45%, #4a7cff 0%, #3B6EF5 40%, #2347b8 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  const dim = el('div', 'abs', cam, { inset: 0, background: 'radial-gradient(90% 80% at 50% 50%, rgba(10,20,60,.25), rgba(8,14,40,.6))', opacity: 0 });
  const spot = el('div', 'abs', cam, { left: 0, top: 0, width: '900px', height: '900px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,255,255,.32) 0%, rgba(255,255,255,.1) 35%, rgba(255,255,255,0) 70%)', opacity: 0 });
  gsap.set(spot, { x: 960, y: 540, xPercent: -50, yPercent: -50, scale: 1.6 });

  // caption
  const cap = el('div', 'abs', cam, { left: '160px', width: '1600px', top: '400px', textAlign: 'center' });
  const label = el('div', '', cap, { font: '600 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.22em', color: 'rgba(247,245,240,.75)' });
  label.textContent = 'WHITE SPACE';
  const head = el('div', '', cap, { font: '800 104px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)', marginTop: '28px' });
  const words = ctx.split(head, 'Any area without content', 'word');
  const notWhite = el('div', '', cap, { font: '600 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.22em', color: 'var(--paper)', marginTop: '34px' });
  notWhite.textContent = 'NOT JUST WHITE';

  const A = [470, 540], B = [900, 540];
  const halos = [A, B].map(([x, y]) => {
    const h = el('div', 'abs', cam, { left: 0, top: 0, width: '300px', height: '300px', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,255,255,.16), rgba(255,255,255,0) 68%)', opacity: 0 });
    gsap.set(h, { x, y, xPercent: -50, yPercent: -50, scale: 0.6 });
    return h;
  });

  const OFF = [[-44, -38], [44, -38], [0, 40]];
  const targets = [...OFF.map(([dx, dy]) => [A[0] + dx, A[1] + dy]), ...OFF.map(([dx, dy]) => [B[0] + dx, B[1] + dy])];
  const scatter = [[960, 540], [330, 260], [1500, 300], [700, 830], [1300, 760], [1650, 640]];
  const dots = scatter.map(([x, y], i) => {
    const d = el('div', 'abs', cam, { left: 0, top: 0, width: '64px', height: '64px', borderRadius: '50%',
      background: i === 0 ? 'radial-gradient(circle at 35% 30%, #ff9a85, var(--signal) 60%, #d8402a)' : 'radial-gradient(circle at 35% 30%, #ffffff, #e9e6de 70%)',
      boxShadow: i === 0 ? '0 0 50px rgba(255,90,60,.7), 0 18px 40px rgba(0,0,0,.3)' : '0 14px 34px rgba(5,15,50,.35)', opacity: 0 });
    gsap.set(d, { x, y, xPercent: -50, yPercent: -50, scale: 0 });
    return d;
  });

  const calmT = el('div', 'abs', cam, { left: '1250px', top: '468px', font: '800 120px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)', opacity: 0 });
  calmT.textContent = 'Calm';
  const calmRule = el('div', 'abs', cam, { left: '1256px', top: '612px', width: '180px', height: '4px', borderRadius: '2px', background: 'var(--signal)', transformOrigin: '0 50%' });
  gsap.set(calmRule, { scaleX: 0 });

  ctx.fx.vignette({ strength: 0.45 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  tl.to(cam, { scale: 1.035, duration: ctx.dur, ease: 'sine.inOut' }, 0);

  gsap.set(notWhite, { opacity: 0 });
  tl.from(label, { opacity: 0, y: 14, duration: 0.7 }, 0);
  tl.from(words, { opacity: 0, y: 40, duration: 0.9, stagger: 0.12, ease: 'power3.out' }, 0.1);
  tl.fromTo(notWhite, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, immediateRender: false }, sNot - 0.05);
  tl.to(cap, { opacity: 0, y: -40, scale: 0.97, duration: 0.25, ease: 'power3.in' }, focus - 0.35);

  // focus: lone coral dot + spotlight
  tl.to(dots[0], { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.8)' }, focus - 0.08);
  tl.to(dim, { opacity: 1, duration: 1.2, ease: 'power2.out' }, focus);
  tl.to(spot, { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' }, focus + 0.05);
  tl.to(dots[0], { boxShadow: '0 0 90px rgba(255,90,60,.95), 0 18px 40px rgba(0,0,0,.3)', duration: 0.7, yoyo: true, repeat: 1, ease: 'sine.inOut' }, focus + 0.5);

  // scattered dots arrive late, then glide into clusters
  const pre = Math.max(focus + 1.3, groups - 0.25);
  const glide = Math.max(groups, pre + 0.2);
  tl.to(dots.slice(1), { opacity: 1, scale: 1, duration: 0.45, stagger: 0.05, ease: 'back.out(1.7)' }, pre);
  dots.forEach((d, i) => {
    tl.to(d, { x: targets[i][0], y: targets[i][1], duration: 1.4, ease: 'power3.inOut' }, glide + i * 0.04);
  });
  tl.to(spot, { x: (A[0] + B[0]) / 2, scale: 1.5, opacity: 0.6, duration: 1.5, ease: 'power3.inOut' }, glide);
  tl.to(dim, { opacity: 0.55, duration: 1.4 }, glide);
  tl.to(halos, { opacity: 1, scale: 1, duration: 1.0, stagger: 0.1, ease: 'power2.out' }, glide + 1.1);

  // calm & confident: clusters exhale and settle
  const ex = Math.max(calm - 0.1, glide + 1.6);
  dots.forEach((d, i) => {
    const c = i < 3 ? A : B, [tx, ty] = targets[i];
    tl.to(d, { x: c[0] + (tx - c[0]) * 1.18, y: c[1] + (ty - c[1]) * 1.18, duration: 0.9, ease: 'sine.inOut' }, ex);
    tl.to(d, { x: c[0] + (tx - c[0]) * 1.06, y: c[1] + (ty - c[1]) * 1.06, duration: 1.4, ease: 'sine.inOut' }, ex + 0.9);
  });
  tl.to(halos, { scale: 1.12, duration: 0.9, ease: 'sine.inOut' }, ex);
  tl.to(halos, { scale: 1.04, duration: 1.4, ease: 'sine.inOut' }, ex + 0.9);
  tl.fromTo(calmT, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 1.4, ease: 'power2.out', immediateRender: false }, calm);
  tl.to(calmRule, { scaleX: 1, duration: 1.0, ease: 'power3.out' }, Math.max(calm + 0.4, conf - 0.1));
});
