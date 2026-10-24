/* Scene 0: "Your slide deck already explains something well. Here's how to make it work without
 * you in the room, by turning it into a video."
 * Storyboard: a night stage. One 16:9 slide card (the deck's plain title, rebuilt) sits under a
 * spotlight with dust motes, beside an empty lectern lit by its own cone. The camera pushes in slowly
 * and glides once. On "without you in the room" the lectern and its light fade away and the slide stays
 * lit, alone. On "turning" a coral play triangle stamps onto the card. The card then fills the frame,
 * turns into a dark video frame, and "PowerPoint → Video" rises in 140px paper type on "video". A
 * scrubber starts to play. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const tSlide = ctx.at(0, 'slide'), tWell = ctx.at(0, 'well');
  const tWithout = ctx.at(1, 'without'), tRoom = ctx.at(1, 'room');
  const tTurn = ctx.at(1, 'turning'), tVideo = ctx.at(1, 'video');
  const zoomAt = tTurn + 0.2;

  stage.style.background = 'radial-gradient(80% 70% at 46% 45%, #1a2236 0%, var(--night) 70%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '880px 520px' });

  /* light & floor */
  const floorGlow = el('div', 'abs', cam, { left: '160px', top: '740px', width: '1700px', height: '240px', background: 'radial-gradient(closest-side, rgba(91,140,255,.10), transparent)' });
  const pool = el('div', 'abs', cam, { left: '260px', top: '140px', width: '1240px', height: '800px', background: 'radial-gradient(closest-side, rgba(247,244,238,.13), transparent)' });
  const cone = el('div', 'abs', cam, { left: '470px', top: '-80px', width: '820px', height: '1000px', background: 'linear-gradient(180deg, rgba(247,244,238,.18), rgba(247,244,238,.02))', clipPath: 'polygon(42% 0, 58% 0, 100% 100%, 0 100%)', filter: 'blur(20px)', mixBlendMode: 'screen' });
  const lCone = el('div', 'abs', cam, { left: '1370px', top: '-80px', width: '400px', height: '1000px', background: 'linear-gradient(180deg, rgba(201,207,219,.12), rgba(201,207,219,.015))', clipPath: 'polygon(42% 0, 58% 0, 100% 100%, 0 100%)', filter: 'blur(16px)', mixBlendMode: 'screen' });
  const lPool = el('div', 'abs', cam, { left: '1380px', top: '780px', width: '380px', height: '140px', background: 'radial-gradient(closest-side, rgba(201,207,219,.12), transparent)' });

  /* empty lectern silhouette */
  const lect = el('div', 'abs', cam, { left: '1440px', top: '430px', width: '260px', height: '440px' });
  lect.innerHTML = `<svg width="260" height="440" viewBox="0 0 260 440">
    <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a3450"/><stop offset="1" stop-color="#141a29"/></linearGradient></defs>
    <path d="M196 40 C 196 10, 170 -4, 150 6" fill="none" stroke="#3a4560" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="146" cy="8" rx="9" ry="6" fill="#3a4560"/>
    <polygon points="78,92 186,78 206,420 58,420" fill="url(#lg)" stroke="rgba(201,207,219,.18)" stroke-width="2"/>
    <polygon points="8,66 252,30 252,60 8,98" fill="#2c3652" stroke="rgba(201,207,219,.3)" stroke-width="2" stroke-linejoin="round"/>
    <rect x="34" y="416" width="196" height="16" rx="5" fill="#1d2438" stroke="rgba(201,207,219,.15)"/>
  </svg>`;

  /* dust motes in the spotlight */
  const motesBox = el('div', 'abs', cam, { inset: 0 });
  const R = ctx.rand(7);
  const motes = Array.from({ length: 30 }, () => {
    const s = 2 + R() * 4;
    const m = el('div', 'abs', motesBox, { left: 0, top: 0, width: s + 'px', height: s + 'px', borderRadius: '50%', background: 'rgba(247,244,238,.8)', filter: 'blur(1px)' });
    return { m, x: 560 + R() * 640, y: R() * 900, sp: 8 + R() * 18, ph: R() * 6.28, sw: 10 + R() * 25 };
  });

  /* the slide card, with the plain deck title rebuilt */
  const card = el('div', 'abs', cam, { left: '400px', top: '250px', width: '960px', height: '540px', background: 'var(--paper)', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 50px 120px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.08)' });
  const title = el('div', 'abs', card, { left: '80px', top: '74px', width: '800px', textAlign: 'center', font: '800 64px/1.08 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--ink)' });
  const tWords = ctx.split(title, 'How to Convert PowerPoint to Video', 'word');
  const rule = el('div', 'abs', card, { left: '420px', top: '242px', width: '120px', height: '4px', borderRadius: '2px', background: 'var(--mist)', transformOrigin: '50% 50%' });
  const cLab = el('div', 'abs', card, { left: '40px', bottom: '30px', font: '600 16px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: '#8a92a6' });
  cLab.textContent = 'SLIDE 1 / 6';
  const vfill = el('div', 'abs', card, { inset: 0, background: 'radial-gradient(70% 70% at 50% 40%, #222b42 0%, var(--night) 80%)', opacity: 0 });
  const tri = el('div', 'abs', card, { left: '420px', top: '265px', width: '120px', height: '130px', filter: 'drop-shadow(0 0 22px rgba(255,107,74,.7))', opacity: 0 });
  tri.innerHTML = `<svg width="120" height="130" viewBox="0 0 120 130"><path d="M22 14 L104 65 L22 116 Z" fill="#FF6B4A" stroke="#FF6B4A" stroke-width="18" stroke-linejoin="round"/></svg>`;
  const ring = el('div', 'abs', card, { left: '390px', top: '240px', width: '180px', height: '180px', borderRadius: '50%', border: '5px solid #FF6B4A', opacity: 0 });

  /* payoff headline + scrubber (screen layer) */
  const head = el('div', 'abs', stage, { left: '80px', width: '1760px', top: '470px', textAlign: 'center', font: '900 140px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)', whiteSpace: 'nowrap', transformOrigin: '50% 60%' });
  const hParts = [['PowerPoint', 'var(--paper)'], ['→', 'var(--signal)'], ['Video', 'var(--paper)']].map(([w, c], i) => {
    const s = el('span', '', head, { display: 'inline-block', color: c, margin: i === 1 ? '0 .22em' : '0' });
    s.textContent = w; return s;
  });
  const scrub = el('div', 'abs', stage, { left: '240px', width: '1440px', top: '870px', height: '6px', borderRadius: '3px', background: 'rgba(247,244,238,.16)', opacity: 0 });
  const sFill = el('div', 'abs', scrub, { left: 0, top: 0, height: '6px', width: '0px', borderRadius: '3px', background: 'var(--signal)', boxShadow: '0 0 16px rgba(255,107,74,.7)' });
  const sDot = el('div', 'abs', scrub, { left: '-9px', top: '-6px', width: '18px', height: '18px', borderRadius: '50%', background: 'var(--paper)' });
  const prog = { p: 0 };

  ctx.fx.vignette({ strength: 0.6 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    motes.forEach((o) => {
      const y = 860 - (((900 - o.y) + t * o.sp) % 900);
      const x = o.x + Math.sin(t * 0.6 + o.ph) * o.sw;
      o.m.style.transform = `translate(${x}px, ${y}px)`;
      o.m.style.opacity = (0.25 + 0.35 * Math.sin(t * 1.3 + o.ph) ** 2).toFixed(3);
    });
    const w = prog.p * 1440;
    sFill.style.width = w + 'px';
    sDot.style.left = (w - 9) + 'px';
  });

  /* ---- timeline ---- */
  gsap.set(lect, { filter: 'blur(0px) brightness(1)' });
  gsap.set(card, { filter: 'brightness(1)' });

  // opening: stage lit, card rises in
  tl.from([cone, pool], { opacity: 0, duration: 0.8, ease: 'power2.out' }, 0);
  tl.from(card, { y: 40, opacity: 0, scale: 0.97, duration: 0.9, ease: 'back.out(1.4)' }, 0.05);
  tl.from([lect, lCone, lPool], { opacity: 0, y: 20, duration: 0.9, stagger: 0.05 }, 0.3);
  tl.from(tWords, { opacity: 0, y: 24, duration: 0.6, stagger: 0.06, ease: 'back.out(1.6)' }, tSlide);
  tl.from(rule, { scaleX: 0, duration: 0.5 }, tSlide + 0.4);
  tl.from(cLab, { opacity: 0, duration: 0.4 }, tSlide + 0.5);
  // "well": the slide earns its light
  tl.to(pool, { opacity: 1.3, scale: 1.04, duration: 0.8, ease: 'power2.out' }, tWell);
  tl.to(card, { filter: 'brightness(1.06)', duration: 0.6, yoyo: true, repeat: 1 }, tWell);

  // slow push-in with one lateral glide
  tl.to(cam, { scale: 1.06, x: -40, duration: zoomAt, ease: 'power1.inOut' }, 0);

  // "without you in the room": the lectern and its light leave
  tl.to(lect, { opacity: 0, y: 30, filter: 'blur(6px) brightness(.5)', duration: 0.9, ease: 'power2.in' }, tWithout);
  tl.to([lCone, lPool], { opacity: 0, duration: 0.9, ease: 'power2.in' }, tWithout + 0.1);
  tl.to(cone, { opacity: 1.25, duration: 0.6 }, tRoom);
  tl.to(card, { boxShadow: '0 50px 120px rgba(0,0,0,.55), 0 0 90px rgba(247,244,238,.18)', duration: 0.6 }, tRoom);

  // "turning": the play triangle stamps on
  tl.fromTo(tri, { opacity: 0, scale: 2.6, rotation: -14 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.32, ease: 'power4.in', immediateRender: false }, tTurn - 0.32);
  tl.fromTo(ring, { opacity: 1, scale: 0.5 }, { opacity: 0, scale: 1.8, duration: 0.7, ease: 'power2.out', immediateRender: false }, tTurn);
  tl.to(card, { y: 5, duration: 0.07, yoyo: true, repeat: 1, ease: 'power1.out' }, tTurn);

  // the card fills the frame and becomes a video frame
  tl.to(cam, { scale: 1, x: 0, duration: 0.95, ease: 'expo.inOut' }, zoomAt);
  tl.to(card, { scale: 2.04, x: 80, y: 20, borderRadius: 0, duration: 0.95, ease: 'expo.inOut' }, zoomAt);
  tl.to([...tWords, rule, cLab], { opacity: 0, duration: 0.3, ease: 'power2.in' }, zoomAt);
  tl.to(vfill, { opacity: 1, duration: 0.6, ease: 'power2.inOut' }, zoomAt + 0.1);
  tl.to(tri, { y: -163, scale: 0.6, duration: 0.95, ease: 'expo.inOut' }, zoomAt);
  tl.to([motesBox, cone, pool, floorGlow], { opacity: 0, duration: 0.5 }, zoomAt);

  // "video": the headline rises
  tl.from(hParts, { opacity: 0, y: 90, duration: 0.7, stagger: 0.08, ease: 'back.out(1.5)' }, tVideo - 0.05);
  tl.to(scrub, { opacity: 1, duration: 0.5 }, tVideo + 0.3);
  tl.to(prog, { p: 0.3, duration: Math.max(0.5, ctx.dur - tVideo - 0.3), ease: 'none' }, tVideo + 0.3);
  tl.to(head, { scale: 1.03, duration: Math.max(0.5, ctx.dur - tVideo), ease: 'power1.inOut' }, tVideo);
  tl.to(tri, { filter: 'drop-shadow(0 0 40px rgba(255,107,74,.95))', duration: 0.6, yoyo: true, repeat: 1 }, tVideo + 0.3);
});
