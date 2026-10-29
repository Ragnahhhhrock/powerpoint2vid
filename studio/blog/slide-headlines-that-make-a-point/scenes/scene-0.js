/* Scene 0 — "Most slide headlines are labels, like Overview or Pricing. They tell you what a slide is about,
 * but not what it's saying. Let's change that."
 * Storyboard: night stage. Two empty file-tab outlines wait from the first frame. "LABEL" tags tick on under them on "labels".
 * Grey 140px "Overview" and "Pricing" drop into the tabs on their words, flat and inert.
 * On "not what it's saying", a coral question mark blinks beside each.
 * On "Let's change that", the tabs recede upward and a coral pen stroke underlines empty space.
 * Then "Headlines that / make a point" writes itself in at 120px.
 * A slow push-in runs throughout. The blank title slide is rebuilt entirely. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const labels = ctx.at(0, 'labels'), overview = ctx.at(0, 'Overview'), pricing = ctx.at(0, 'Pricing');
  const about = ctx.at(1, 'about'), not = ctx.at(1, 'not'), saying = ctx.at(1, 'saying');
  const lets = ctx.at(2, "Let's"), change = ctx.at(2, 'change');

  const MONO = 'ui-monospace, Menlo, monospace';
  stage.style.background = 'radial-gradient(70% 60% at 50% 45%, #1a1d2c 0%, var(--night) 75%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(40% 30% at 50% 62%, rgba(255,90,60,.16), transparent 70%)', opacity: 0 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  /* kicker */
  const kicker = el('div', 'abs', cam, { left: '210px', top: '200px', font: `600 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--slate)' });
  kicker.textContent = 'SLIDE TITLES · AS USUALLY WRITTEN';

  /* file tabs */
  const wrap = el('div', 'abs', cam, { inset: 0, transformOrigin: '960px 330px' });
  const edge = el('div', 'abs', wrap, { left: '160px', width: '1600px', top: '560px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(138,144,166,.45) 15%, rgba(138,144,166,.45) 85%, transparent)' });
  const TABS = [['Overview', 210, 760, overview, not], ['Pricing', 1090, 620, pricing, saying]];
  const tabs = TABS.map(([word, x, w, tIn, tQ]) => {
    const box = el('div', 'abs', wrap, { left: x + 'px', top: '330px', width: w + 'px', height: '230px', borderRadius: '24px 24px 0 0',
      border: '2px solid rgba(138,144,166,.35)', borderBottom: 'none', background: 'linear-gradient(180deg, rgba(138,144,166,.07), rgba(138,144,166,.02))' });
    const txt = el('div', 'abs', box, { left: 0, width: '100%', top: '50px', textAlign: 'center', font: '800 140px/1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--slate)' });
    txt.textContent = word;
    const q = el('div', 'abs', box, { right: '-34px', top: '-78px', font: '900 120px/1 Inter Display, Inter', color: 'var(--signal)', textShadow: '0 0 40px rgba(255,90,60,.7)', opacity: 0 });
    q.textContent = '?';
    const tag = el('div', 'abs', wrap, { left: x + 'px', top: '586px', font: `600 20px/1 ${MONO}`, letterSpacing: '.16em', color: 'rgba(138,144,166,.8)', opacity: 0 });
    tag.textContent = 'LABEL';
    return { box, txt, q, tag, tIn, tQ };
  });

  /* pen stroke + title */
  const pen = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  pen.innerHTML = `<svg width="1920" height="1080"><path id="ps" d="M330 800 C 620 786, 980 812, 1300 794 S 1560 790, 1600 796" fill="none" stroke="#FF5A3C" stroke-width="10" stroke-linecap="round" style="filter: drop-shadow(0 0 14px rgba(255,90,60,.7))"/></svg>`;
  const ps = pen.querySelector('#ps');
  const PL = 1300;
  ps.style.strokeDasharray = PL; ps.style.strokeDashoffset = PL;

  const title = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '520px', textAlign: 'center', font: '850 120px/1.02 Inter Display, Inter', fontWeight: 850, letterSpacing: '-.04em', color: 'var(--paper)' });
  const l1 = el('div', '', title, {}); const l2 = el('div', '', title, {});
  const c1 = ctx.split(l1, 'Headlines that', 'char');
  const l2a = el('span', '', l2, {}); const l2b = el('span', '', l2, { color: 'var(--signal)', textShadow: '0 0 40px rgba(255,90,60,.55)' });
  const c2 = ctx.split(l2a, 'make a ', 'char').concat(ctx.split(l2b, 'point', 'char'));
  const chars = c1.concat(c2);
  gsap.set(chars, { opacity: 0, y: 24 });

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  tl.to(cam, { scale: 1.07, duration: ctx.dur, ease: 'power1.inOut' }, 0);
  tl.from(kicker, { opacity: 0, x: -20, duration: 0.3 }, 0.05);
  tl.from(edge, { scaleX: 0, duration: 0.6, ease: 'power3.out' }, 0.05);
  tabs.forEach((t, i) => {
    tl.from(t.box, { opacity: 0, y: 30, duration: 0.35 }, 0.12 + i * 0.08);
    tl.to(t.tag, { opacity: 1, duration: 0.2 }, labels + i * 0.1);
    tl.from(t.tag, { y: 10, duration: 0.25, immediateRender: false }, labels + i * 0.1);
    // word drops into its tab
    tl.from(t.txt, { y: -90, opacity: 0, duration: 0.28, ease: 'power3.out' }, t.tIn - 0.08);
    tl.to(t.box, { y: 4, duration: 0.08, yoyo: true, repeat: 1, ease: 'power1.out' }, t.tIn + 0.18);
    // brief brighten on "about", then dull again
    tl.to(t.txt, { color: '#C9CDDA', duration: 0.3 }, about - 0.2);
    tl.to(t.txt, { color: '#8A90A6', duration: 0.4 }, not - 0.1);
    // question marks blink
    tl.fromTo(t.q, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2)', immediateRender: false }, t.tQ - 0.05);
    tl.to(t.q, { opacity: 0.15, duration: 0.22, yoyo: true, repeat: 3, ease: 'steps(1)' }, t.tQ + 0.3);
  });

  // "Let's change that"
  tl.to(kicker, { opacity: 0, duration: 0.25 }, lets - 0.1);
  tl.to(tabs.map((t) => t.q), { opacity: 0, duration: 0.2 }, lets - 0.1);
  tl.to(wrap, { y: -200, scale: 0.6, opacity: 0.3, duration: 0.6, ease: 'expo.inOut' }, lets - 0.15);
  tl.to(glow, { opacity: 1, duration: 0.8 }, lets);
  tl.to(ps, { strokeDashoffset: 0, duration: 0.45, ease: 'power2.inOut' }, lets + 0.05);
  tl.to(chars, { opacity: 1, y: 0, duration: 0.2, stagger: 0.025, ease: 'power3.out' }, change);
  tl.fromTo(l2b, { textShadow: '0 0 40px rgba(255,90,60,.55)' }, { textShadow: '0 0 80px rgba(255,90,60,.95)', duration: 0.5, yoyo: true, repeat: 1, immediateRender: false }, change + 0.6);
});
