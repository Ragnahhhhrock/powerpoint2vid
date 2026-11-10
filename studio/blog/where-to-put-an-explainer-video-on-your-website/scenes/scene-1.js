/* Scene 2 — "Every explainer answers one question. Write it down, then ask where a visitor is when they
 * have it. That's where the video goes."
 * Storyboard: paper stage, wide. On "one question" a huge sky-blue question mark draws itself centre frame,
 * then glides left. The deck's four questions flicker in beside it one at a time in 48px ink. On "where"
 * three fade to mist and "What does this company actually do?" stays bold and underlined. On "visitor" a
 * cursor glides in beside it. On "That's where" the headline "Start with the question" rises at 110px.
 * On "video goes" a coral pin drops onto the cursor with a ripple, and the camera eases in. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const one = ctx.at(0, 'one'), write = ctx.at(1, 'Write'), where = ctx.at(1, 'where'), visitor = ctx.at(1, 'visitor');
  const thats = ctx.at(2, "That's"), video = ctx.at(2, 'video'), goes = ctx.at(2, 'goes');
  const QS = ['What does this company actually do?', 'How does this feature work?', 'Is the paid plan worth it?', 'How do I get started?'];

  stage.style.background = 'radial-gradient(70% 70% at 45% 45%, #fffdf8 0%, var(--paper) 60%, #ebe6db 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '1300px 460px' });

  // faint dot grid for a "page" feel
  el('div', 'abs', cam, { inset: 0, opacity: 0.5, backgroundImage: 'radial-gradient(rgba(27,34,56,.10) 1.5px, transparent 1.6px)', backgroundSize: '40px 40px' });
  const glow = el('div', 'abs', cam, { left: '560px', top: '180px', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,140,255,.22), transparent 65%)' });

  const label = el('div', 'abs', cam, { left: '144px', top: '86px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'rgba(27,34,56,.55)' });
  label.textContent = 'PLACEMENT · STEP 1';

  /* the question mark */
  const qm = el('div', 'abs', cam, { left: '750px', top: '250px', width: '420px', height: '560px', filter: 'drop-shadow(0 24px 40px rgba(91,140,255,.35))' });
  qm.innerHTML = `<svg width="420" height="560" viewBox="0 0 420 560">
    <path id="hook" pathLength="1" d="M110 170 C110 80 180 40 215 40 C300 40 330 100 330 160 C330 240 215 250 215 340 L215 380"
      fill="none" stroke="#5B8CFF" stroke-width="64" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1" stroke-dashoffset="1"/>
    <circle id="dot" cx="215" cy="480" r="40" fill="#5B8CFF"/></svg>`;
  const hook = qm.querySelector('#hook'), dot = qm.querySelector('#dot');
  gsap.set(dot, { scale: 0, transformOrigin: '215px 480px' });

  /* the four questions */
  const list = el('div', 'abs', cam, { left: '760px', top: '440px' });
  const rows = QS.map((q, i) => {
    const r = el('div', 'abs', list, { left: 0, top: i * 100 + 'px', whiteSpace: 'nowrap', font: '500 48px/1.2 Inter, sans-serif', letterSpacing: '-.02em', color: 'var(--ink)' });
    r.textContent = q;
    return r;
  });
  const r1 = rows[0];
  const under = el('div', 'abs', r1, { left: 0, bottom: '-8px', width: '100%', height: '6px', borderRadius: '3px', background: 'var(--sky)', transformOrigin: '0% 50%' });
  gsap.set(under, { scaleX: 0 });

  const cursor = el('div', 'abs', r1, { left: 'calc(100% + 24px)', top: '8px', width: '36px', height: '48px', transformOrigin: '0% 0%' });
  cursor.innerHTML = `<svg width="36" height="48" viewBox="0 0 36 48"><path d="M3 3 L3 39 L12 31 L18 45 L25 42 L19 28 L31 28 Z" fill="#1B2238" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></svg>`;
  cursor.style.filter = 'drop-shadow(0 6px 10px rgba(15,20,36,.3))';

  const ripple = el('div', 'abs', r1, { left: 'calc(100% + 27px - 40px)', top: '-6px', width: '80px', height: '28px', borderRadius: '50%', border: '4px solid var(--signal)', opacity: 0 });
  const pin = el('div', 'abs', r1, { left: 'calc(100% + 27px - 32px)', top: '-80px', width: '64px', height: '86px', transformOrigin: '50% 100%' });
  pin.innerHTML = `<svg width="64" height="86" viewBox="0 0 64 86"><path d="M32 84 C26 66 4 52 4 30 A28 28 0 0 1 60 30 C60 52 38 66 32 84 Z" fill="#FF6B4A"/><circle cx="32" cy="30" r="11" fill="#fff"/></svg>`;
  pin.style.filter = 'drop-shadow(0 14px 18px rgba(255,107,74,.45))';

  /* headline */
  const head = el('div', 'abs', cam, { left: '140px', top: '128px', whiteSpace: 'nowrap', font: '800 110px/1.05 "Inter Display", Inter, sans-serif', letterSpacing: '-.04em', color: 'var(--ink)' });
  const words = ctx.split(head, 'Start with the question', 'word');
  words[3].style.color = 'var(--sky)';

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---- timeline ---- */
  gsap.set([label, glow], { opacity: 0 });
  gsap.set(rows, { opacity: 0 });
  gsap.set([cursor, pin], { opacity: 0 });
  gsap.set(words, { opacity: 0, y: 70 });
  tl.to(label, { opacity: 1, duration: 0.5 }, 0.05);
  tl.fromTo(glow, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' }, 0.05);
  tl.fromTo(cam, { scale: 1 }, { scale: 1.015, duration: 7.3, ease: 'none' }, 0);

  // "one question": draw the question mark
  tl.to(hook, { attr: { 'stroke-dashoffset': 0 }, duration: 0.75, ease: 'power2.inOut' }, one - 0.15);
  tl.to(dot, { scale: 1, duration: 0.5, ease: 'back.out(2)' }, one + 0.5);
  tl.fromTo(qm, { scale: 0.9 }, { scale: 1, duration: 1.0, ease: 'back.out(1.6)', immediateRender: false }, one - 0.15);

  // glide left to make room for the questions
  const slide = Math.min(one + 0.6, write - 0.6);
  tl.to(qm, { left: '200px', top: '320px', duration: 0.9, ease: 'expo.inOut' }, slide);
  tl.to(glow, { left: '10px', top: '200px', duration: 0.9, ease: 'expo.inOut' }, slide);

  // questions flicker in one at a time
  const q0 = slide + 0.45, gap = Math.max(0.3, (where - 0.15 - q0) / 4);
  rows.forEach((r, i) => {
    const t = q0 + i * gap;
    tl.fromTo(r, { x: 40 }, { x: 0, duration: 0.5, ease: 'back.out(1.6)', immediateRender: false }, t);
    tl.to(r, { keyframes: [{ opacity: 1, duration: 0.05 }, { opacity: 0.25, duration: 0.05 }, { opacity: 1, duration: 0.08 }] }, t);
    if (i > 0) tl.to(rows[i - 1], { opacity: 0.6, duration: 0.25 }, t);
  });

  // "where": focus on the first question
  tl.to(rows.slice(1), { color: 'var(--mist)', opacity: 1, y: 14, duration: 0.6, ease: 'power2.out' }, where);
  tl.set(r1, { fontWeight: 700 }, where);
  tl.to(r1, { opacity: 1, duration: 0.2 }, where);
  tl.fromTo(r1, { scale: 1.03 }, { scale: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, where);
  tl.to(under, { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }, where + 0.15);

  // "visitor": the cursor glides in
  tl.fromTo(cursor, { opacity: 0, x: 140, y: 130 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out', immediateRender: false }, visitor - 0.1);
  tl.to(cursor, { scale: 0.82, duration: 0.1, yoyo: true, repeat: 1, ease: 'power1.inOut' }, visitor + 0.85);

  // "That's where": headline rises
  tl.to(words, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.6)', stagger: 0.08 }, thats - 0.1);
  tl.to(label, { opacity: 0.4, duration: 0.5 }, thats);

  // "video goes": pin drops onto the cursor
  const land = goes;
  tl.fromTo(pin, { opacity: 0, y: -280 }, { opacity: 1, y: 0, duration: Math.max(0.3, land - video + 0.05), ease: 'power3.in', immediateRender: false }, video - 0.05);
  tl.to(pin, { scaleY: 0.82, scaleX: 1.1, duration: 0.09, yoyo: true, repeat: 1, ease: 'power1.out' }, land);
  tl.fromTo(ripple, { opacity: 1, scale: 0.4 }, { opacity: 0, scale: 2.4, duration: 0.9, ease: 'power2.out', immediateRender: false }, land);
  tl.to(cursor, { y: 4, duration: 0.09, yoyo: true, repeat: 1 }, land);
  tl.to(cam, { scale: 1.035, duration: Math.max(1.2, ctx.dur - (video - 0.2)), ease: 'expo.inOut' }, video - 0.2);
  tl.to(dot, { fill: '#FF6B4A', duration: 0.5, ease: 'power2.out' }, land + 0.1);
});
