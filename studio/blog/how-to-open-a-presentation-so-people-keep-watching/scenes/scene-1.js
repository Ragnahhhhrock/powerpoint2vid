/* Scene 2 — "Before adding anything, remove what slows you down. Viewers don't need an agenda,
 * your full bio or an apology before they know why they care."
 * Storyboard: a wide paper stage. The ink headline 'Cut what slows the opening' sits top-left, and "slows" is
 * struck coral on the word. Three heavy grey slabs (Agenda, Full bio, Apology) thud down in a
 * stack that hides a small glowing 'Why care?' card. On "agenda", "bio" and "apology" each slab
 * gets a coral strike and drops out of frame. On "why they care" the camera pushes in, the headline
 * clears, and the card ignites in amber. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return (v == null || isNaN(v)) ? f : v; };
  const tSlows = A(0, 'slows', 2.4), tAgenda = A(1, 'agenda', 5.0), tBio = A(1, 'bio', 5.9),
        tApology = A(1, 'apology', 6.7), tWhy = A(1, 'why', 8.1), tCare = A(1, 'care', 8.8);

  stage.style.background = 'radial-gradient(80% 70% at 62% 60%, #fffdf8 0%, var(--paper) 55%, #e9e4d8 100%)';
  const drift = el('div', 'abs', stage, { inset: 0 });
  const cam = el('div', 'abs', drift, { inset: 0, transformOrigin: '1200px 640px' });

  /* headline */
  const tag = el('div', 'abs', cam, { left: '124px', top: '96px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'var(--mist)' });
  tag.textContent = 'BEFORE ADDING ANYTHING';
  const head = el('div', 'abs', cam, { left: '120px', top: '136px', font: '800 88px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const words = ctx.split(head, 'Cut what slows the opening', 'word');
  const slows = words[2];
  slows.style.position = 'relative';
  const slowsStrike = el('div', 'abs', slows, { left: '-4px', right: '-4px', top: '52%', height: '9px', borderRadius: '5px', background: 'var(--signal)', transformOrigin: '0% 50%' });

  /* the hidden card */
  const halo = el('div', 'abs', cam, { left: '850px', top: '390px', width: '700px', height: '500px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,181,71,.55), rgba(255,181,71,0) 70%)', opacity: 0.55 });
  const card = el('div', 'abs', cam, { left: '970px', top: '510px', width: '460px', height: '260px', borderRadius: '28px', background: '#fbf8f1', border: '3px solid rgba(255,181,71,.7)', boxShadow: '0 0 40px rgba(255,181,71,.35)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' });
  const cardTag = el('div', '', card, { font: '600 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'var(--mist)', marginBottom: '18px' });
  cardTag.textContent = 'THE POINT';
  const cardTxt = el('div', '', card, { font: '900 76px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'rgba(26,31,46,.55)' });
  cardTxt.textContent = 'Why care?';

  /* three heavy slabs, back to front: apology, bio, agenda */
  const specs = [
    { label: 'Apology', n: '03', left: 860, top: 360, rot: 2.5, t: tApology, fall: 14 },
    { label: 'Full bio', n: '02', left: 820, top: 400, rot: -1.5, t: tBio, fall: -12 },
    { label: 'Agenda', n: '01', left: 780, top: 440, rot: 1, t: tAgenda, fall: 10 },
  ];
  const slabs = specs.map((s, i) => {
    const b = el('div', 'abs', cam, { left: s.left + 'px', top: s.top + 'px', width: '680px', height: '400px', borderRadius: '22px', rotation: 0,
      background: `linear-gradient(160deg, ${['#c9c5bb', '#bdb9ae', '#b1ada2'][i]} 0%, ${['#aeaa9f', '#a39f94', '#97938a'][i]} 100%)`,
      boxShadow: '0 30px 70px rgba(26,31,46,.28), inset 0 2px 0 rgba(255,255,255,.45)' });
    const num = el('div', 'abs', b, { left: '50px', top: '44px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'rgba(26,31,46,.5)' });
    num.textContent = s.n;
    const lab = el('div', 'abs', b, { left: '50px', bottom: '50px', font: '800 96px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'rgba(26,31,46,.78)', whiteSpace: 'nowrap' });
    lab.textContent = s.label;
    const strike = el('div', 'abs', lab, { left: '-10px', right: '-10px', top: '50%', height: '12px', marginTop: '-6px', borderRadius: '6px', background: 'var(--signal)', boxShadow: '0 4px 18px rgba(255,90,60,.5)', transformOrigin: '0% 50%' });
    gsap.set(b, { rotation: s.rot });
    return { b, strike, s };
  });

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set([slowsStrike, ...slabs.map((x) => x.strike)], { scaleX: 0 });
  tl.from(tag, { opacity: 0, x: -20, duration: 0.4 }, 0.05);
  tl.from(words, { y: 40, opacity: 0, duration: 0.5, stagger: 0.06 }, 0.08);
  tl.from(card, { scale: 0.85, opacity: 0, duration: 0.5, ease: 'back.out(1.6)' }, 0.1);
  // slabs thud down onto the card
  slabs.forEach((x, i) => {
    tl.from(x.b, { y: -900, duration: 0.55, ease: 'power4.in' }, 0.25 + i * 0.22);
    tl.to(x.b, { y: 8, duration: 0.07, yoyo: true, repeat: 1, ease: 'power1.out' }, 0.8 + i * 0.22);
  });
  tl.to(cam, { y: 4, duration: 0.06, yoyo: true, repeat: 1 }, 1.24);

  // "slows": struck in coral
  tl.to(slows, { color: '#FF5A3C', duration: 0.2 }, tSlows - 0.05);
  tl.to(slowsStrike, { scaleX: 1, duration: 0.3, ease: 'power4.out' }, tSlows);
  // weight of the stack while the idea holds
  tl.to(cam, { scale: 1.03, duration: Math.max(0.5, tAgenda - 1.5), ease: 'power1.inOut' }, 1.4);

  // strike + drop each slab on its word (front to back)
  [slabs[2], slabs[1], slabs[0]].forEach((x) => {
    const t = x.s.t;
    tl.to(x.strike, { scaleX: 1, duration: 0.22, ease: 'power4.out' }, t - 0.08);
    tl.to(x.b, { x: 10, duration: 0.05, yoyo: true, repeat: 1 }, t + 0.12);
    tl.to(x.b, { y: 1000, rotation: x.s.fall, duration: 0.55, ease: 'power3.in' }, t + 0.24);
    tl.to(halo, { opacity: '+=0.12', duration: 0.3 }, t + 0.4);
  });

  // "why they care": push in, card ignites
  tl.to([tag, head], { opacity: 0, y: -60, duration: 0.45, ease: 'power3.in' }, tWhy - 0.2);
  tl.to(cam, { scale: 1.42, x: -240, y: -100, duration: 1.1, ease: 'expo.inOut' }, tWhy - 0.2);
  tl.to(card, { background: 'linear-gradient(150deg, #ffd27f 0%, #FFB547 55%, #ff9a3a 100%)', borderColor: 'rgba(255,255,255,.6)', boxShadow: '0 0 90px rgba(255,181,71,.85), 0 30px 60px rgba(26,31,46,.2)', duration: 0.5 }, tWhy);
  tl.to(cardTxt, { color: '#1A1F2E', duration: 0.4 }, tWhy);
  tl.to(cardTag, { color: 'rgba(26,31,46,.65)', duration: 0.4 }, tWhy);
  tl.to(halo, { opacity: 1, scale: 1.3, duration: 0.8 }, tWhy);
  tl.fromTo(card, { scale: 1 }, { scale: 1.08, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, tCare);
  tl.to(cam, { scale: 1.48, duration: Math.max(0.3, ctx.dur - (tWhy + 0.9)), ease: 'none' }, tWhy + 0.9);

  // gentle lateral drift so no frame sits still
  tl.fromTo(drift, { x: 10 }, { x: -14, duration: ctx.dur, ease: 'none', immediateRender: false }, 0);
});
