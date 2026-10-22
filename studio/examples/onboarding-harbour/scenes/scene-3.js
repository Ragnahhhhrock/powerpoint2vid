/* Scene 3 — "Stuck on anything? Your buddy is your first stop, and the people team is always one message away. Welcome aboard."
 * Storyboard: two paper speech bubbles with ink avatars (Buddy, People team) pop on their words, joined by a
 * dotted line to "you". On "Welcome aboard" a lighthouse beam sweeps across and the sign-off typesets with
 * the Harbour and Co mark. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const INK = '#1d1a16';
  const buddy = ctx.at(1, 'buddy'), people = ctx.at(1, 'people team'), msg = ctx.at(1, 'message'), aboard = ctx.beat(2);

  stage.style.background = 'var(--paper)';
  el('div', 'abs', stage, { inset: 0, backgroundImage: 'radial-gradient(rgba(29,26,22,.14) 1.6px, transparent 1.6px)', backgroundSize: '40px 40px' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  const q = el('div', 'abs', cam, { left: '150px', top: '120px', font: '900 104px/1 Inter Display, Inter', letterSpacing: '-.05em', color: INK, whiteSpace: 'nowrap' });
  q.innerHTML = 'Stuck on <span style="color:#d9483b">anything?</span>';

  const avatar = (x, y, fill, label, size) => {
    const a = el('div', 'abs', cam, { left: x - size / 2 + 'px', top: y - size / 2 + 'px', width: size + 'px', height: size + 'px', borderRadius: '50%', background: fill, border: `6px solid ${INK}`, overflow: 'hidden' });
    a.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="#fffdf8" stroke="${INK}" stroke-width="5"><circle cx="50" cy="40" r="17"/><path d="M14 100 C 18 66, 82 66, 86 100"/></svg>`;
    const l = el('div', 'abs', cam, { left: x - 120 + 'px', top: y + size / 2 + 14 + 'px', width: '240px', textAlign: 'center', font: '800 30px/1 ui-monospace, Menlo, monospace', letterSpacing: '.08em', color: INK }); l.textContent = label;
    return [a, l];
  };
  const you = avatar(420, 600, '#e8a33d', 'YOU', 180);
  const lines = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  lines.innerHTML = `<svg width="1920" height="1080" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round" stroke-dasharray="4 18">
    <path id="l1" d="M520 560 C 700 470, 820 420, 960 420"/><path id="l2" d="M520 650 C 700 740, 820 790, 960 790"/></svg>`;
  const [l1, l2] = ['#l1', '#l2'].map((s) => lines.querySelector(s));
  [l1, l2].forEach((p) => { p.dataset.L = p.getTotalLength(); });
  const clip1 = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const bubble = (y, fill, who, txt) => {
    const b = el('div', 'abs', cam, { left: '960px', top: y - 110 + 'px', width: '820px', height: '220px', borderRadius: '30px', background: '#fffdf8', border: `6px solid ${INK}`, boxShadow: '12px 14px 0 rgba(29,26,22,.18)', transformOrigin: '0% 50%' });
    const av = el('div', 'abs', b, { left: '30px', top: '40px', width: '130px', height: '130px', borderRadius: '50%', background: fill, border: `5px solid ${INK}`, overflow: 'hidden' });
    av.innerHTML = `<svg width="130" height="130" viewBox="0 0 100 100" fill="#fffdf8" stroke="${INK}" stroke-width="5"><circle cx="50" cy="40" r="17"/><path d="M14 100 C 18 66, 82 66, 86 100"/></svg>`;
    const w = el('div', 'abs', b, { left: '190px', top: '46px', font: '800 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.1em', color: '#d9483b' }); w.textContent = who;
    const t = el('div', 'abs', b, { left: '190px', top: '88px', right: '30px', font: '800 48px/1.1 Inter', letterSpacing: '-.03em', color: INK }); t.textContent = txt;
    return b;
  };
  const b1 = bubble(420, '#a9cbd2', 'YOUR BUDDY', 'First stop for anything');
  const b2 = bubble(790, '#f2b8ae', 'PEOPLE TEAM', 'One message away');

  /* finale */
  const veil = el('div', 'abs', stage, { inset: 0, background: '#13202c', clipPath: 'circle(0% at 1700px 160px)' });
  const beam = el('div', 'abs', veil, { left: '1700px', top: '160px', width: '2600px', height: '600px', marginTop: '-300px', transformOrigin: '0 50%', background: 'linear-gradient(90deg, rgba(245,211,142,.75), rgba(245,211,142,0) 80%)', clipPath: 'polygon(0 47%, 100% 0, 100% 100%, 0 53%)', rotate: '120deg' });
  const lamp = el('div', 'abs', veil, { left: '1640px', top: '100px', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, #fff3cf, rgba(245,211,142,0) 70%)' });
  const wave = el('div', 'abs', veil, { left: '-100px', right: '-100px', bottom: '0', height: '200px' });
  let d = 'M0 80'; for (let x = 0; x <= 2200; x += 20) d += ` L${x} ${80 + Math.sin(x / 120) * 18}`;
  wave.innerHTML = `<svg width="2200" height="200"><path d="${d} L2200 200 L0 200 Z" fill="#1f3a5f" stroke="#3f8fa6" stroke-width="4"/></svg>`;
  const sign = el('div', 'abs', veil, { left: 0, right: 0, top: '370px', textAlign: 'center', font: '900 170px/1 Inter Display, Inter', letterSpacing: '-.055em', color: '#fbf7ee' });
  const sw = ctx.split(sign, 'Welcome aboard.', 'word');
  sw[1].style.color = '#e8a33d';
  const mark = el('div', 'abs', veil, { left: 0, right: 0, top: '590px', textAlign: 'center', font: '700 34px/1 Inter', color: 'rgba(251,247,238,.75)', letterSpacing: '.02em' });
  mark.innerHTML = '<span style="color:#d9483b">⚓</span>&nbsp; Harbour &amp; Co · New starter induction';

  ctx.fx.grain({ opacity: 0.07, blend: 'multiply' });

  /* ---- timeline ---- */
  tl.fromTo(cam, { scale: 1.04 }, { scale: 1, duration: ctx.dur, ease: 'power1.out' }, 0);
  tl.from(q, { y: 50, opacity: 0, duration: 0.55, ease: 'back.out(1.8)' }, 0.15);
  tl.from(you, { scale: 0, duration: 0.5, ease: 'back.out(2.4)' }, 0.4);
  gsap.set([l1, l2], { strokeDashoffset: 0 });
  gsap.set(lines, { clipPath: 'inset(0px 1400px 0px 0px)' });
  tl.to(lines, { clipPath: 'inset(0px 900px 540px 0px)', duration: 0.5, ease: 'power2.out' }, buddy - 0.5);
  tl.from(b1, { scale: 0.3, opacity: 0, duration: 0.55, ease: 'back.out(1.9)' }, buddy - 0.2);
  tl.to(lines, { clipPath: 'inset(0px 900px 0px 0px)', duration: 0.5, ease: 'power2.out' }, people - 0.5);
  tl.from(b2, { scale: 0.3, opacity: 0, duration: 0.55, ease: 'back.out(1.9)' }, people - 0.2);
  tl.to(b2, { rotate: -1.5, duration: 0.15, yoyo: true, repeat: 3 }, msg);

  tl.to(veil, { clipPath: 'circle(150% at 1700px 160px)', duration: 1.0, ease: 'power3.inOut' }, aboard - 0.75);
  tl.fromTo(beam, { rotate: 120 }, { rotate: 210, duration: ctx.dur - aboard + 0.8, ease: 'sine.inOut', immediateRender: false }, aboard - 0.8);
  tl.from(sw, { y: 80, opacity: 0, duration: 0.6, stagger: 0.14, ease: 'back.out(1.8)' }, aboard - 0.1);
  tl.from(mark, { opacity: 0, y: 16, duration: 0.6 }, aboard + 0.5);
  tl.fromTo(wave, { x: 0 }, { x: -120, duration: ctx.dur - aboard + 1, ease: 'none', immediateRender: false }, aboard - 0.8);
});
