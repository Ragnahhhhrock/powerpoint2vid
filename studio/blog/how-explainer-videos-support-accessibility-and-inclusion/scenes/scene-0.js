/* Scene 0 — "An explainer video can reach people a slide deck misses, or it can shut them out.
 * Here's how to make sure it brings more people in."
 * Storyboard: a dark night stage with a tall doorway of paper-coloured light at centre.
 * On "reach people" the door swings wide. Four soft figures drift toward it, each tagged in
 * small mist labels. On "shut them out" the door narrows to a sliver and the figures pause.
 * On "brings more people in" the door opens fully, the figures step closer, lit warm, and
 * "Accessible explainer videos" rises at 120px beneath. A slow push-in runs throughout. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const reach = ctx.at(0, 'reach'), shut = ctx.at(0, 'shut'), brings = ctx.at(1, 'brings');
  const FLOOR = 650, DX = 810, DW = 300, DH = 480, DTOP = FLOOR - DH;

  stage.style.background = 'radial-gradient(60% 55% at 50% 45%, #1a2a42 0%, var(--night) 70%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 480px' });

  const halo = el('div', 'abs', cam, { left: DX - 460 + 'px', top: DTOP - 260 + 'px', width: DW + 920 + 'px', height: DH + 520 + 'px',
    background: 'radial-gradient(closest-side, rgba(247,230,190,.32), rgba(242,181,68,.08) 55%, transparent)', opacity: 0.2 });
  const spill = el('div', 'abs', cam, { left: 0, top: FLOOR + 'px', width: '1920px', height: '300px',
    background: 'linear-gradient(180deg, rgba(247,236,210,.26), rgba(247,236,210,0) 85%)' });
  const floor = el('div', 'abs', cam, { left: '160px', width: '1600px', top: FLOOR + 'px', height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(201,211,222,.3), transparent)' });

  const doorWrap = el('div', 'abs', cam, { left: DX - 14 + 'px', top: DTOP - 14 + 'px', width: DW + 28 + 'px', height: DH + 14 + 'px',
    borderRadius: '8px 8px 0 0', background: '#22314a', boxShadow: '0 30px 80px rgba(0,0,0,.5)' });
  const opening = el('div', 'abs', doorWrap, { left: '14px', top: '14px', width: DW + 'px', height: DH + 'px', overflow: 'visible', perspective: '1300px' });
  const light = el('div', 'abs', opening, { inset: 0, background: 'linear-gradient(180deg, #fffaf0 0%, var(--paper) 55%, #f3dcae 100%)',
    boxShadow: '0 0 60px rgba(247,230,190,.5)' });
  const panel = el('div', 'abs', opening, { inset: 0, transformOrigin: '0% 50%',
    background: 'linear-gradient(90deg, #1b2638, #16202E 60%, #121a27)', boxShadow: 'inset 0 0 0 2px rgba(201,211,222,.08)' });
  el('div', 'abs', panel, { left: '30px', top: '30px', right: '30px', height: '180px', border: '2px solid rgba(201,211,222,.07)', borderRadius: '4px' });
  el('div', 'abs', panel, { left: '30px', top: '240px', right: '30px', bottom: '30px', border: '2px solid rgba(201,211,222,.07)', borderRadius: '4px' });
  el('div', 'abs', panel, { right: '26px', top: '250px', width: '14px', height: '14px', borderRadius: '50%', background: 'var(--sun)', opacity: 0.8 });

  const LABELS = ['Deaf or hard of hearing', 'Blind or low vision', 'Second-language readers', 'Learning differences'];
  const XF = [380, 660, 1260, 1540];
  const figs = LABELS.map((txt, i) => {
    const left = i < 2;
    const wrap = el('div', 'abs', cam, { left: XF[i] - 60 + 'px', top: FLOOR - 200 + 'px', width: '120px', height: '200px' });
    const dir = left ? '90deg' : '270deg';
    const head = el('div', 'abs', wrap, { left: '34px', top: '0px', width: '52px', height: '52px', borderRadius: '50%', overflow: 'hidden',
      background: 'radial-gradient(circle at 50% 40%, #3d4e69, #24324b)' });
    const body = el('div', 'abs', wrap, { left: '10px', top: '62px', width: '100px', height: '138px', borderRadius: '50px 50px 10px 10px', overflow: 'hidden',
      background: 'linear-gradient(180deg, #364660, #1f2c43)', boxShadow: '0 20px 40px rgba(0,0,0,.35)' });
    const lit = [head, body].map((p) => el('div', 'abs', p, { inset: 0,
      background: `linear-gradient(${dir}, rgba(247,236,210,0) 35%, rgba(247,236,210,.75) 100%)`, opacity: 0 }));
    const lab = el('div', 'abs', wrap, { left: '-65px', width: '250px', top: '222px', textAlign: 'center',
      font: '600 19px/1.4 ui-monospace, Menlo, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--mist)' });
    lab.textContent = txt;
    return { wrap, lit, lab, out: left ? -1 : 1 };
  });

  const head = el('div', 'abs', cam, { left: '0px', width: '1920px', top: '780px', textAlign: 'center',
    font: '800 120px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)', textShadow: '0 6px 30px rgba(10,16,28,.6)' });
  head.textContent = 'Accessible explainer videos';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  const S = { o: 0.07 };
  ctx.onFrame(() => {
    const o = S.o;
    const th = o * 80 * Math.PI / 180;
    panel.style.transform = `rotateY(${o * 80}deg)`;
    halo.style.opacity = (0.15 + 0.85 * o).toFixed(3);
    light.style.boxShadow = `0 0 ${40 + 120 * o}px rgba(247,230,190,${(0.25 + 0.5 * o).toFixed(3)})`;
    // beam comes from the visible gap on the right (latch) side, between projected panel edge and the frame
    const xL = DX + DW * Math.cos(th), xR = DX + DW;
    const bl = xL - 60 - 520 * o, br = xR + 60 + 420 * o;
    spill.style.clipPath = `polygon(${xL.toFixed(1)}px 0px, ${xR}px 0px, ${br.toFixed(1)}px 300px, ${bl.toFixed(1)}px 300px)`;
    const gap = 1 - Math.cos(th);
    spill.style.opacity = Math.min(1, 0.05 + 3 * gap + 0.5 * o).toFixed(3);
    figs.forEach((f) => f.lit.forEach((l) => { l.style.opacity = (o * 0.9).toFixed(3); }));
  });

  tl.from([doorWrap, floor], { opacity: 0, duration: 0.9, ease: 'sine.inOut' }, 0);
  tl.to(cam, { scale: 1.07, x: -14, duration: ctx.dur, ease: 'sine.inOut' }, 0);

  tl.to(S, { o: 1, duration: 1.6, ease: 'sine.inOut' }, reach - 0.2);
  const drift = Math.max(1.2, Math.min(2.2, shut - reach - 0.2));
  figs.forEach((f, i) => {
    tl.fromTo(f.wrap, { x: f.out * 270, opacity: 0 }, { x: f.out * 70, opacity: 1, duration: drift, ease: 'sine.out' }, reach - 0.1 + i * 0.12);
    tl.fromTo(f.lab, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8, ease: 'sine.out' }, reach + 0.5 + i * 0.12);
  });

  tl.to(S, { o: 0.12, duration: 1.1, ease: 'power2.inOut' }, shut - 0.15);

  tl.to(S, { o: 1, duration: 1.5, ease: 'sine.inOut' }, brings - 0.2);
  figs.forEach((f, i) => tl.to(f.wrap, { x: 0, duration: 1.6, ease: 'sine.inOut' }, brings + i * 0.08));
  tl.fromTo(head, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, brings + 0.15);
});
