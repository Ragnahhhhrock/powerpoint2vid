/* Scene 6 (final) — "Ordinary slides in, extraordinary video out. Try it first on Basic, no subscription needed,
 * or go Pro and let a.i. direct it. Visit powerpoint2vid.com."
 * Storyboard: warm paper stage. The deck's own plain slide sits greyed on the left, facing a glowing signal gate.
 * On "extraordinary" it slides through the gate and emerges on the right as a vivid, moving night scene.
 * The video glides up to centre; on "Basic" a teal card pops ("No subscription needed"), on "Pro" an amber card
 * ("a.i. directs"), and the video tints to match each. On "PowerPoint to vid" everything retreats and the URL lands
 * centre at 130px in ink, its signal underline drawing on "com". Holds to the end. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (b, w, f) => { const v = ctx.at(b, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const tExtra = A(0, 'extraordinary', 1.86), tOut = A(0, 'out.', 3.02);
  const tTry = A(1, 'Try', 4.18), tBasic = A(1, 'Basic,', 5.11), tNo = A(1, 'no', 5.74);
  const tPro = A(1, 'Pro', 7.67), tAI = A(1, 'A.I.', 8.39);
  const tVisit = A(2, 'Visit', 10.05), tPP = A(2, 'PowerPoint', 10.42), tCom = A(2, 'com.', 11.72);
  const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
  const W = 600, H = 338, TOP = 290, GATE = 960;

  stage.style.background = 'radial-gradient(60% 55% at 50% 42%, #fffdf8 0%, var(--paper) 60%, #e9e3d6 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  // soft warm light pools
  el('div', 'abs', cam, { left: '1100px', top: '120px', width: '760px', height: '600px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,107,74,.10), transparent)' });
  el('div', 'abs', cam, { left: '80px', top: '420px', width: '700px', height: '600px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(43,181,163,.08), transparent)' });

  /* ---- the ordinary slide (grey) ---- */
  const grey = el('div', 'abs', cam, { left: '160px', top: TOP + 'px', width: W + 'px', height: H + 'px', borderRadius: '16px', overflow: 'hidden', background: '#d9d9d6', boxShadow: '0 24px 60px rgba(26,31,46,.18)' });
  const gi = el('img', 'abs', grey, { inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) contrast(.75)', opacity: 0.75, mixBlendMode: 'multiply' });
  gi.src = ctx.asset('slide-6.png');

  /* ---- the gate ---- */
  const gate = el('div', 'abs', cam, { left: GATE - 22 + 'px', top: TOP - 50 + 'px', width: '44px', height: H + 100 + 'px', borderRadius: '22px', border: '5px solid var(--signal)', boxSizing: 'border-box', boxShadow: '0 0 30px rgba(255,107,74,.35), inset 0 0 20px rgba(255,107,74,.25)' });
  const beam = el('div', 'abs', cam, { left: GATE - 3 + 'px', top: TOP - 30 + 'px', width: '6px', height: H + 60 + 'px', borderRadius: '3px', background: 'linear-gradient(180deg, transparent, #fff 20%, #ffd2c6 50%, #fff 80%, transparent)', boxShadow: '0 0 40px 10px rgba(255,107,74,.6)', opacity: 0 });

  /* ---- the extraordinary video ---- */
  const vid = el('div', 'abs', cam, { left: '160px', top: TOP + 'px', width: W + 'px', height: H + 'px', borderRadius: '16px', overflow: 'hidden', transformOrigin: '50% 50%',
    background: 'radial-gradient(80% 90% at 30% 20%, #232a48 0%, var(--night) 70%)', boxShadow: '0 40px 90px rgba(14,18,32,.35), 0 0 60px rgba(255,107,74,.18)' });
  const orbs = [['#FF6B4A', 260, 0], ['#2BB5A3', 220, 2.1], ['#F5B841', 180, 4.2]].map(([c, s, ph]) => ({
    e: el('div', 'abs', vid, { width: s + 'px', height: s + 'px', borderRadius: '50%', background: `radial-gradient(closest-side, ${c}, transparent)`, opacity: 0.75, mixBlendMode: 'screen' }), s, ph }));
  const tintT = el('div', 'abs', vid, { inset: 0, background: 'radial-gradient(70% 70% at 50% 50%, rgba(43,181,163,.55), transparent)', opacity: 0, mixBlendMode: 'screen' });
  const tintA = el('div', 'abs', vid, { inset: 0, background: 'radial-gradient(70% 70% at 50% 50%, rgba(245,184,65,.55), transparent)', opacity: 0, mixBlendMode: 'screen' });
  const vtag = el('div', 'abs', vid, { left: '28px', top: '26px', font: `600 15px/1 ${MONO}`, letterSpacing: '.16em', color: 'rgba(255,255,255,.7)' });
  vtag.textContent = '● SCENE 01';
  const vhead = el('div', 'abs', vid, { left: '28px', top: '120px', width: '540px', font: '900 58px/1 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff' });
  vhead.innerHTML = 'Your deck,<br><span style="color:#FF8F72">directed.</span>';
  const track = el('div', 'abs', vid, { left: '28px', right: '28px', bottom: '24px', height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,.15)' });
  const prog = el('div', 'abs', track, { left: 0, top: 0, bottom: 0, width: '0%', borderRadius: '3px', background: 'var(--signal)', boxShadow: '0 0 12px rgba(255,107,74,.8)' });

  /* labels */
  const labIn = el('div', 'abs', cam, { left: '160px', width: W + 'px', top: TOP + H + 34 + 'px', textAlign: 'center', font: `600 20px/1 ${MONO}`, letterSpacing: '.18em', color: 'var(--mist)' });
  labIn.textContent = 'SLIDES IN';
  const labOut = el('div', 'abs', cam, { left: '1160px', width: W + 'px', top: TOP + H + 34 + 'px', textAlign: 'center', font: `700 20px/1 ${MONO}`, letterSpacing: '.18em', color: 'var(--signal)' });
  labOut.textContent = 'VIDEO OUT';

  /* ---- plan cards ---- */
  const card = (x, color, chip, text, icon) => {
    const c = el('div', 'abs', cam, { left: x + 'px', top: '650px', width: '680px', height: '200px', borderRadius: '22px', background: '#fff', boxShadow: '0 30px 70px rgba(26,31,46,.14)', overflow: 'hidden', transformOrigin: '50% 80%' });
    el('div', 'abs', c, { left: 0, top: 0, bottom: 0, width: '10px', background: color });
    const ic = el('div', 'abs', c, { left: '48px', top: '50px', width: '100px', height: '100px', borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 10px 30px ${color}66` });
    ic.innerHTML = icon;
    const ch = el('div', 'abs', c, { left: '180px', top: '52px', font: `700 20px/1 ${MONO}`, letterSpacing: '.2em', color }); ch.textContent = chip;
    const tx = el('div', 'abs', c, { left: '180px', top: '90px', width: '470px', font: '800 46px/1.05 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)', whiteSpace: 'nowrap' }); tx.textContent = text;
    return { c, ic, tx };
  };
  const check = '<svg width="54" height="54" viewBox="0 0 54 54"><path d="M13 28 L23 38 L42 17" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const star = '<svg width="56" height="56" viewBox="0 0 56 56"><path d="M28 6 C30 20 36 26 50 28 C36 30 30 36 28 50 C26 36 20 30 6 28 C20 26 26 20 28 6Z" fill="#fff"/></svg>';
  const basic = card(250, '#2BB5A3', 'BASIC', 'No subscription needed', check);
  const pro = card(990, '#F5B841', 'PRO', 'a.i. directs', star);
  basic.tx.style.fontSize = '40px';

  /* ---- CTA ---- */
  const cta = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '420px', textAlign: 'center' });
  const kicker = el('div', '', cta, { font: `600 24px/1 ${MONO}`, letterSpacing: '.22em', color: 'var(--mist)', marginBottom: '34px' });
  kicker.textContent = 'TEST DRIVE WITH YOUR OWN DECK';
  const url = el('div', '', cta, { font: '900 130px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)', display: 'inline-block', position: 'relative' });
  const chars = ctx.split(url, 'powerpoint2vid.com', 'char');
  const under = el('div', 'abs', url, { left: '4px', right: '4px', bottom: '-26px', height: '12px', borderRadius: '6px', background: 'var(--signal)', transformOrigin: '0% 50%', boxShadow: '0 8px 24px rgba(255,107,74,.45)' });

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---- per-frame: gate clipping + living video ---- */
  const s = { x: 160, gate: 1 };
  ctx.onFrame((t) => {
    grey.style.left = s.x + 'px';
    vid.style.left = s.x + 'px';
    grey.style.clipPath = `inset(0px ${Math.max(0, s.x + W - GATE)}px 0px 0px round 16px)`;
    vid.style.clipPath = `inset(0px 0px 0px ${Math.min(W, Math.max(0, GATE - s.x)) * s.gate}px round 16px)`;
    orbs.forEach((o, i) => {
      const x = 300 + Math.sin(t * 0.6 + o.ph) * 220 - o.s / 2;
      const y = 170 + Math.cos(t * 0.45 + o.ph * 1.3) * 110 - o.s / 2;
      o.e.style.transform = `translate(${x}px, ${y}px)`;
    });
    vhead.style.transform = `translateX(${Math.sin(t * 0.5) * 6}px) scale(${1 + 0.015 * Math.sin(t * 0.7)})`;
    prog.style.width = Math.max(0, Math.min(100, ((t - 1.8) / 8.5) * 100)) + '%';
  });

  /* ---- timeline ---- */
  gsap.set([vid, grey, ...[basic.c, pro.c]], { filter: 'blur(0px)' });
  gsap.set([labOut, basic.c, pro.c, kicker, ...chars], { opacity: 0 });
  gsap.set(under, { scaleX: 0 });
  tl.to(cam, { scale: 1.03, duration: ctx.dur, ease: 'none' }, 0);

  tl.from(grey, { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out' }, 0.05);
  tl.from(gate, { opacity: 0, scaleY: 0.4, duration: 0.8, ease: 'back.out(1.6)' }, 0.25);
  tl.from(labIn, { opacity: 0, y: 10, duration: 0.5 }, 0.5);

  // "extraordinary video out": through the gate
  tl.to(s, { x: 1160, duration: 1.25, ease: 'expo.inOut' }, tExtra);
  tl.to(beam, { opacity: 1, duration: 0.25 }, tExtra + 0.3);
  tl.to(beam, { opacity: 0, duration: 0.5 }, tExtra + 1.1);
  tl.to(gate, { boxShadow: '0 0 70px rgba(255,107,74,.8), inset 0 0 30px rgba(255,107,74,.5)', duration: 0.4, yoyo: true, repeat: 1 }, tExtra + 0.35);
  tl.to(labIn, { opacity: 0.4, duration: 0.4 }, tExtra + 0.4);
  tl.fromTo(labOut, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.8)', immediateRender: false }, tOut - 0.1);

  // regroup: video to centre top
  const tg = tTry - 0.15;
  tl.to([gate, labIn, labOut, beam], { opacity: 0, duration: 0.5, ease: 'power2.in' }, tg);
  tl.set(grey, { opacity: 0 }, tg);
  tl.set(s, { gate: 0 }, tg + 0.01);
  tl.to(s, { x: 660, duration: 1.0, ease: 'expo.inOut' }, tg + 0.1);
  tl.to(vid, { y: -150, scale: 1.12, duration: 1.0, ease: 'expo.inOut' }, tg + 0.1);

  // "Basic"
  tl.fromTo(basic.c, { opacity: 0, y: 60, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)', immediateRender: false }, tBasic - 0.1);
  tl.from(basic.ic, { scale: 0, rotation: -40, duration: 0.5, ease: 'back.out(2)' }, tBasic + 0.1);
  tl.from(basic.tx, { opacity: 0, x: 20, duration: 0.45 }, tNo - 0.05);
  tl.to(tintT, { opacity: 1, duration: 0.5 }, tBasic);
  tl.to(tintT, { opacity: 0, duration: 0.6 }, tPro - 0.2);

  // "Pro"
  tl.fromTo(pro.c, { opacity: 0, y: 60, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)', immediateRender: false }, tPro - 0.1);
  tl.from(pro.ic, { scale: 0, rotation: 90, duration: 0.55, ease: 'back.out(2)' }, tPro + 0.1);
  tl.from(pro.tx, { opacity: 0, x: 20, duration: 0.45 }, tAI - 0.1);
  tl.to(tintA, { opacity: 1, duration: 0.5 }, tPro);
  tl.to(pro.ic, { scale: 1.15, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, tAI + 0.35);
  tl.to(basic.c, { opacity: 0.75, duration: 0.5 }, tPro);

  // "Visit powerpoint2vid.com": retreat, URL lands
  tl.to(vid, { y: -260, opacity: 0, scale: 0.95, filter: 'blur(8px)', duration: 0.7, ease: 'power2.in' }, tVisit - 0.1);
  tl.to(basic.c, { y: 140, opacity: 0, filter: 'blur(8px)', duration: 0.6, ease: 'power2.in' }, tVisit);
  tl.to(pro.c, { y: 140, opacity: 0, filter: 'blur(8px)', duration: 0.6, ease: 'power2.in' }, tVisit + 0.06);
  tl.fromTo(chars, { opacity: 0, y: 70, rotation: 6 }, { opacity: 1, y: 0, rotation: 0, duration: 0.6, ease: 'back.out(1.8)', stagger: 0.03, immediateRender: false }, tPP - 0.05);
  tl.fromTo(kicker, { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.6, immediateRender: false }, tPP + 0.35);
  tl.to(under, { scaleX: 1, duration: 0.55, ease: 'expo.out' }, tCom - 0.3);
  tl.to(chars.slice(10, 14), { color: '#FF6B4A', duration: 0.4 }, tCom - 0.1);
});
