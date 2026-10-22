/* Scene 3 — "In this example, first reply time fell from over nine hours to just over one. Book a demo today."
 * Storyboard: two giant bars on dark: "Before" rises tall in coral to 9.4h, "After" snaps up only to 1.2h in
 * teal on "just over one"; a big "-87%" lands. On "Book a demo" a button lands and a cursor clicks it.
 * Small "Example data · fictional company" label. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const nine = ctx.at(0, 'nine'), one = ctx.at(0, 'just over one'), book = ctx.at(1, 'book'), today = ctx.at(1, 'today');
  const BASE = 900, PX = 62, BW = 260;
  const bars = [['Before', 9.4, 360, ['#ffb199', '#ff6b4a', '#c93f26']], ['After', 1.2, 740, ['#bdfcf1', '#5eead4', '#0fa89a']]];

  stage.style.background = 'radial-gradient(75% 70% at 40% 60%, #143a34 0%, var(--night) 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '700px 700px' });
  const title = el('div', 'abs', cam, { left: '160px', top: '96px', font: '800 72px/1 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff', whiteSpace: 'nowrap' }); title.textContent = 'First reply time';
  const tag = el('div', 'abs', cam, { left: '164px', top: '186px', font: '600 21px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'rgba(255,255,255,.5)' }); tag.textContent = 'EXAMPLE DATA · FICTIONAL COMPANY · HOURS';
  el('div', 'abs', cam, { left: '260px', width: '820px', top: BASE + 'px', height: '3px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.4), transparent)' });

  const B = bars.map(([n, v, x, [a, b, c]]) => {
    const h = v * PX;
    const bar = el('div', 'abs', cam, { left: x + 'px', top: BASE - h + 'px', width: BW + 'px', height: h + 'px', borderRadius: '22px 22px 6px 6px', transformOrigin: '50% 100%', background: `linear-gradient(180deg, ${a} 0%, ${b} 45%, ${c} 100%)`, boxShadow: `0 0 70px ${b}66` });
    const lab = el('div', 'abs', cam, { left: x + 'px', width: BW + 'px', top: BASE + 26 + 'px', textAlign: 'center', font: '700 32px/1 Inter', color: 'rgba(255,255,255,.7)' }); lab.textContent = n;
    const num = el('div', 'abs', cam, { left: x - 60 + 'px', width: BW + 120 + 'px', top: BASE - h - 96 + 'px', textAlign: 'center', font: '900 76px/1 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff', fontVariantNumeric: 'tabular-nums' });
    return { bar, lab, num, v, h, val: { n: 0 } };
  });
  const big = el('div', 'abs', cam, { left: '1120px', top: '300px', width: '700px', transformOrigin: '30% 50%' });
  big.innerHTML = '<div style="font:900 220px/0.9 Inter Display,Inter;letter-spacing:-.06em;background:linear-gradient(100deg,#e7fffa,#5eead4 60%,#0fa89a);-webkit-background-clip:text;background-clip:text;color:transparent">−87%</div><div style="font:600 34px/1.2 Inter;color:rgba(255,255,255,.8);margin-top:10px">faster first replies</div>';
  const ring = el('div', 'abs', cam, { left: 740 + BW / 2 - 110 + 'px', top: BASE - 1.2 * PX - 110 + 'px', width: '220px', height: '220px', borderRadius: '50%', border: '6px solid #5eead4', opacity: 0 });

  const btn = el('div', 'abs', stage, { left: '1180px', top: '720px', padding: '30px 56px', borderRadius: '999px', background: '#fff', font: '800 46px/1 Inter', letterSpacing: '-.02em', color: 'var(--ink)', whiteSpace: 'nowrap', boxShadow: '0 30px 80px rgba(15,168,154,.5)' });
  btn.innerHTML = 'Book a demo <span style="color:#0fa89a">→</span>';
  const ripple = el('div', 'abs', stage, { left: '1500px', top: '770px', width: '40px', height: '40px', marginLeft: '-20px', marginTop: '-20px', borderRadius: '50%', border: '4px solid #5eead4', opacity: 0 });
  const cursor = el('div', 'abs', stage, { left: '1500px', top: '770px', width: '44px', height: '56px' });
  cursor.innerHTML = '<svg width="44" height="56" viewBox="0 0 44 56"><path d="M3 3l0 42 11-10 8 18 8-4-8-17 15-1z" fill="#10201c" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></svg>';
  const mark = el('div', 'abs', stage, { right: '110px', bottom: '64px', font: '800 30px/1 Inter', color: 'rgba(255,255,255,.75)' }); mark.innerHTML = '<span style="color:#5eead4">≋</span> Tidewell';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });
  ctx.onFrame(() => B.forEach((b) => { b.num.textContent = b.val.n.toFixed(1) + 'h'; }));

  /* ---- timeline ---- */
  gsap.set(B.flatMap((b) => [b.bar, b.num]), { opacity: 0 });
  gsap.set(B.map((b) => b.bar), { scaleY: 0 });
  gsap.set(cursor, { opacity: 0 });
  tl.from([title, tag], { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }, 0.05);
  tl.from(B.map((b) => b.lab), { opacity: 0, duration: 0.4, stagger: 0.1 }, 0.2);
  const rise = (b, t, d) => {
    tl.to(b.bar, { opacity: 1, scaleY: 1, duration: d, ease: 'back.out(1.2)' }, t);
    tl.to(b.num, { opacity: 1, duration: 0.3 }, t + 0.05);
    tl.fromTo(b.num, { y: b.h * 0.9 }, { y: 0, duration: d, ease: 'back.out(1.2)', immediateRender: false }, t);
    tl.to(b.val, { n: b.v, duration: d, ease: 'power2.out' }, t);
  };
  rise(B[0], 0.5, Math.max(1.2, nine - 0.2));
  rise(B[1], one - 0.3, 0.6);
  tl.fromTo(ring, { scale: 0.4, opacity: 1 }, { scale: 2, opacity: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, one + 0.25);
  tl.to([B[0].bar, B[0].num], { opacity: 0.4, duration: 0.5 }, one + 0.2);
  tl.fromTo(big, { scale: 2, opacity: 0, rotation: -4 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.45, ease: 'power4.in', immediateRender: false }, ctx.beats[0].end - 0.25);
  gsap.set(big, { opacity: 0 });
  tl.to(cam, { x: 6, duration: 0.05, yoyo: true, repeat: 3 }, ctx.beats[0].end + 0.2);
  tl.to(big, { y: -170, scale: 0.8, duration: 0.6, ease: 'expo.inOut' }, book - 0.5);
  tl.from(btn, { opacity: 0, y: 50, scale: 0.85, duration: 0.55, ease: 'back.out(1.8)' }, book - 0.2);
  tl.fromTo(cursor, { opacity: 0, x: 300, y: 200 }, { opacity: 1, x: 0, y: 0, duration: 0.7, ease: 'power3.out', immediateRender: false }, book + 0.1);
  const click = today + 0.25;
  tl.to(cursor, { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1 }, click);
  tl.to(btn, { scale: 0.95, duration: 0.08, yoyo: true, repeat: 1 }, click);
  tl.fromTo(ripple, { scale: 0.5, opacity: 0.9 }, { scale: 4, opacity: 0, duration: 0.7, ease: 'power2.out', immediateRender: false }, click);
  tl.from(mark, { opacity: 0, duration: 0.6 }, click + 0.2);
  tl.to(cam, { scale: 1.03, duration: ctx.dur, ease: 'sine.inOut' }, 0);
});
