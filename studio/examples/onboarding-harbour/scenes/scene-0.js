/* Scene 0 — "Welcome to Harbour and Co. Here's what your first week looks like."
 * Storyboard: paper stage with layered ink-drawn waves drifting. A lighthouse beam sweeps; on "Welcome" the
 * headline is printed in, and an ink underline draws itself. On "first week" a paper calendar card slides up. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const welcome = ctx.at(0, 'welcome'), harbour = ctx.at(0, 'harbour'), week = ctx.at(1, 'first week');
  const INK = '#1d1a16';

  stage.style.background = 'radial-gradient(90% 80% at 40% 30%, #fbf7ee 0%, var(--paper) 60%, #e9e0cd 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '900px 600px' });

  /* lighthouse (line art) + beam */
  const beam = el('div', 'abs', cam, { left: '1560px', top: '330px', width: '2200px', height: '360px', marginTop: '-180px', transformOrigin: '0 50%', background: 'linear-gradient(90deg, rgba(232,163,61,.55), rgba(232,163,61,0) 85%)', clipPath: 'polygon(0 46%, 100% 0, 100% 100%, 0 54%)', rotate: '200deg', mixBlendMode: 'multiply' });
  const lh = el('div', 'abs', cam, { left: '1460px', top: '250px', width: '220px', height: '560px' });
  lh.innerHTML = `<svg width="220" height="560" viewBox="0 0 220 560" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
    <path d="M60 540 L80 150 L140 150 L160 540 Z" fill="#f4efe4"/><path d="M68 400 L152 400 M72 300 L148 300 M76 210 L144 210" stroke="#d9483b" stroke-width="14"/>
    <rect x="72" y="92" width="76" height="58" fill="#f5d38e"/><path d="M62 92 L110 50 L158 92 Z" fill="#d9483b"/><path d="M110 50 L110 30"/><path d="M40 150 L180 150"/></svg>`;
  const lamp = el('div', 'abs', cam, { left: '1520px', top: '290px', width: '100px', height: '100px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,214,130,.95), rgba(232,163,61,0) 70%)' });

  /* waves */
  const waves = [0, 1, 2, 3].map((k) => {
    const w = el('div', 'abs', cam, { left: '-200px', top: 770 + k * 70 + 'px', width: '2400px', height: '140px' });
    let d = 'M0 60'; for (let x = 0; x <= 2400; x += 20) d += ` L${x} ${60 + Math.sin(x / (110 + k * 20) + k) * (16 - k * 2)}`;
    w.innerHTML = `<svg width="2400" height="140"><path d="${d} L2400 140 L0 140 Z" fill="${['#cfe1e4', '#a9cbd2', '#6fa7b5', '#3f8fa6'][k]}" stroke="${INK}" stroke-width="${4 - k * 0.5}"/></svg>`;
    return w;
  });

  /* headline */
  const kick = el('div', 'abs', cam, { left: '150px', top: '210px', font: '600 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.22em', color: '#d9483b' }); kick.textContent = 'NEW STARTER INDUCTION';
  const l1 = el('div', 'abs', cam, { left: '144px', top: '262px', font: '800 96px/1 Inter Display, Inter', letterSpacing: '-.04em', color: INK, whiteSpace: 'nowrap' });
  const w1 = ctx.split(l1, 'Welcome to', 'word');
  const l2 = el('div', 'abs', cam, { left: '140px', top: '360px', font: '900 168px/1 Inter Display, Inter', letterSpacing: '-.055em', color: '#1f3a5f', whiteSpace: 'nowrap' });
  const w2 = ctx.split(l2, 'Harbour & Co', 'char');
  const ul = el('div', 'abs', cam, { left: '140px', top: '540px', width: '1100px', height: '60px' });
  ul.innerHTML = `<svg width="1100" height="60"><path id="u" d="M6 30 C 160 12, 320 46, 520 26 S 860 14, 1040 34" fill="none" stroke="#d9483b" stroke-width="12" stroke-linecap="round" stroke-dasharray="1200" stroke-dashoffset="1200"/></svg>`;
  const up = ul.querySelector('#u');

  /* calendar card */
  const cal = el('div', 'abs', cam, { left: '160px', top: '640px', width: '600px', height: '170px', borderRadius: '10px', background: '#fffdf8', border: `4px solid ${INK}`, boxShadow: '10px 12px 0 rgba(29,26,22,.18)', rotate: '-2deg' });
  const ch = el('div', 'abs', cal, { left: 0, right: 0, top: 0, height: '52px', background: '#d9483b', borderBottom: `4px solid ${INK}`, font: '800 26px/52px Inter', color: '#fff', paddingLeft: '22px' }); ch.textContent = 'Your first week';
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => { const x = el('div', 'abs', cal, { left: 22 + i * 114 + 'px', top: '74px', width: '96px', height: '72px', borderRadius: '8px', border: `3px solid ${INK}`, font: '800 26px/66px Inter', textAlign: 'center', color: INK, background: '#f4efe4' }); x.textContent = d; return x; });

  ctx.fx.grain({ opacity: 0.08, blend: 'multiply' });
  ctx.fx.vignette({ strength: 0.22 });

  /* ---- timeline ---- */
  tl.fromTo(cam, { scale: 1.06 }, { scale: 1, duration: ctx.dur, ease: 'power1.out' }, 0);
  waves.forEach((w, k) => tl.fromTo(w, { x: k % 2 ? -120 : 0 }, { x: k % 2 ? 0 : -160, duration: ctx.dur, ease: 'sine.inOut' }, 0));
  waves.forEach((w, k) => tl.from(w, { y: 120, duration: 0.9, ease: 'expo.out' }, 0.05 + k * 0.08));
  tl.from(lh, { y: 80, opacity: 0, duration: 0.8, ease: 'expo.out' }, 0.1);
  tl.fromTo(beam, { rotate: 160 }, { rotate: 228, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.to(lamp, { scale: 1.3, duration: 0.6, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 0.2);
  tl.from(kick, { opacity: 0, x: -20, duration: 0.5 }, 0.2);
  tl.from(w1, { y: 60, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.8)' }, welcome - 0.2);
  tl.from(w2, { y: 90, opacity: 0, rotation: (i) => (i % 2 ? 8 : -8), duration: 0.55, stagger: 0.035, ease: 'back.out(2)' }, harbour - 0.25);
  tl.to(up, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, harbour + 0.35);

  tl.from(cal, { y: 260, rotate: 6, opacity: 0, duration: 0.7, ease: 'back.out(1.5)' }, week - 0.45);
  tl.from(days, { scale: 0.5, opacity: 0, duration: 0.35, stagger: 0.08, ease: 'back.out(2.4)' }, week - 0.1);
  tl.to(days[0], { background: '#e8a33d', duration: 0.3 }, week + 0.5);
});
