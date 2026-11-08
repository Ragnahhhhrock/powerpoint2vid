/* Scene 2 — "Low contrast is the most common problem, and one of the easiest to fix.
 * Aim for four and a half to one for normal text, and three to one for large text."
 * Storyboard: night stage. A grey "Read me" sits almost invisible against the dark while a live
 * contrast readout measures it. On "easiest to fix" the contrast turns up: the word sharpens to
 * paper white, a focus ring tightens, and the readout climbs to a pass. On "four and a half to one"
 * the word lifts away and a giant 4.5:1 counts up in paper, labelled "normal text". On "three to one"
 * 3:1 slides in to its right in amber, labelled "large text & key graphics". The camera holds wide
 * on the two ratios with a slow push. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const low = ctx.at(0, 'Low'), easiest = ctx.at(0, 'easiest');
  const four = ctx.at(1, 'four'), normal = ctx.at(1, 'normal');
  const three = ctx.at(1, 'three'), large = ctx.at(1, 'large');

  stage.style.background = 'radial-gradient(60% 55% at 50% 45%, #161a24 0%, var(--night) 75%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 30% at 50% 45%, rgba(247,245,240,.10), transparent 70%)', opacity: 0 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 520px' });

  const START = [0x22, 0x25, 0x2d], END = [0xf7, 0xf5, 0xf0], BG = [0x0b, 0x0d, 0x12];
  const wrap = el('div', 'abs', cam, { left: 0, width: '1920px', top: '340px', height: '260px', transformOrigin: '50% 50%' });
  const readme = el('div', 'abs', wrap, { left: 0, width: '1920px', top: '10px', textAlign: 'center', font: '900 220px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'rgb(34,37,45)' });
  readme.textContent = 'Read me';
  const ring = el('div', 'abs', cam, { left: '470px', top: '320px', width: '980px', height: '300px', borderRadius: '28px', border: '3px solid var(--signal)', boxShadow: '0 0 40px rgba(47,107,255,.5)', opacity: 0 });

  const readout = el('div', 'abs', cam, { left: 0, width: '1920px', top: '660px', textAlign: 'center', font: '600 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'var(--mist)' });
  const roInner = el('span', '', readout, { position: 'relative', display: 'inline-block' });
  const roLabel = el('span', '', roInner, {}); roLabel.textContent = 'CONTRAST ';
  const roVal = el('span', '', roInner, { color: '#ff6b5a', fontVariantNumeric: 'tabular-nums' });
  const roPass = el('span', '', roInner, { position: 'absolute', left: '100%', top: 0, whiteSpace: 'nowrap', color: 'var(--teal)', marginLeft: '18px', opacity: 0 }); roPass.textContent = '✓ PASS';

  const mkBlock = (cx, color) => {
    const b = el('div', 'abs', cam, { left: cx - 350 + 'px', width: '700px', top: '410px', textAlign: 'center' });
    const fig = el('div', '', b, { font: '900 160px/1 Inter Display, Inter', letterSpacing: '-.04em', color, fontVariantNumeric: 'tabular-nums' });
    const lab = el('div', '', b, { marginTop: '28px', font: '600 24px/1.3 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'var(--mist)' });
    const r = el('div', 'abs', cam, { left: cx - 270 + 'px', top: '375px', width: '540px', height: '275px', borderRadius: '24px', border: '3px solid ' + color, opacity: 0 });
    return { b, fig, lab, r };
  };
  const A = mkBlock(600, 'var(--paper)'), B = mkBlock(1320, 'var(--amber)');
  A.fig.style.textShadow = '0 0 50px rgba(247,245,240,.25)';
  B.fig.style.textShadow = '0 0 50px rgba(242,169,0,.35)';
  A.lab.textContent = 'NORMAL TEXT';
  B.lab.textContent = 'LARGE TEXT & KEY GRAPHICS';
  B.fig.textContent = '3:1';
  const divider = el('div', 'abs', cam, { left: '959px', top: '400px', width: '2px', height: '280px', background: 'linear-gradient(180deg, transparent, rgba(154,160,171,.4), transparent)', opacity: 0 });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  const S = { c: 0, n: 0 };
  const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const lum = (rgb) => 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
  const Lbg = lum(BG);
  ctx.onFrame(() => {
    const rgb = START.map((s, i) => Math.round(s + (END[i] - s) * S.c));
    readme.style.color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    const ratio = (lum(rgb) + 0.05) / (Lbg + 0.05);
    roVal.textContent = ratio.toFixed(1) + ':1';
    roVal.style.color = ratio >= 4.5 ? 'var(--teal)' : '#ff6b5a';
    A.fig.textContent = S.n.toFixed(1) + ':1';
  });

  gsap.set(readme, { filter: 'blur(4px)' });
  gsap.set([A.b, B.b, A.lab, B.lab], { opacity: 0 });
  tl.fromTo(wrap, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, 0.05);
  tl.fromTo(readout, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, low + 0.3);
  tl.to(cam, { scale: 1.03, duration: easiest - low, ease: 'power1.inOut' }, low);

  tl.to(S, { c: 1, duration: 0.9, ease: 'power2.inOut' }, easiest - 0.1);
  tl.to(readme, { filter: 'blur(0px)', textShadow: '0 0 60px rgba(247,245,240,.3)', duration: 0.8, ease: 'power2.out' }, easiest - 0.1);
  tl.to(glow, { opacity: 1, duration: 1 }, easiest);
  tl.fromTo(ring, { scale: 1.25, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out', immediateRender: false }, easiest + 0.1);
  tl.to(ring, { opacity: 0, duration: 0.5 }, easiest + 0.9);
  tl.fromTo(roPass, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4, ease: 'back.out(2)', immediateRender: false }, easiest + 0.55);
  tl.to(cam, { scale: 1, duration: 1.2, ease: 'expo.inOut' }, four - 0.8);

  tl.to(wrap, { y: -210, scale: 0.36, opacity: 0.85, duration: 0.9, ease: 'expo.inOut' }, four - 0.6);
  tl.to(readout, { opacity: 0, y: -10, duration: 0.4, ease: 'power2.in' }, four - 0.6);
  tl.to(glow, { opacity: 0.4, duration: 0.8 }, four - 0.4);
  tl.fromTo(A.b, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)', immediateRender: false }, four - 0.1);
  tl.to(S, { n: 4.5, duration: 0.9, ease: 'power2.out' }, four - 0.1);
  tl.to(A.lab, { opacity: 1, duration: 0.5 }, normal - 0.1);
  tl.fromTo(A.r, { scale: 1.25, opacity: 0 }, { scale: 1, opacity: 0.8, duration: 0.55, immediateRender: false }, four + 0.75);
  tl.to(A.r, { opacity: 0, duration: 0.5 }, four + 1.5);

  tl.to(divider, { opacity: 1, duration: 0.6 }, three - 0.3);
  tl.fromTo(B.b, { opacity: 0, x: 140 }, { opacity: 1, x: 0, duration: 0.75, ease: 'back.out(1.4)', immediateRender: false }, three - 0.15);
  tl.to(B.lab, { opacity: 1, duration: 0.5 }, large - 0.1);
  tl.fromTo(B.r, { scale: 1.25, opacity: 0 }, { scale: 1, opacity: 0.8, duration: 0.55, immediateRender: false }, three + 0.45);
  tl.to(B.r, { opacity: 0, duration: 0.5 }, three + 1.2);

  tl.to(cam, { scale: 1.035, duration: Math.max(0.5, ctx.dur - (four + 0.4)), ease: 'power1.inOut' }, four + 0.4);
});
