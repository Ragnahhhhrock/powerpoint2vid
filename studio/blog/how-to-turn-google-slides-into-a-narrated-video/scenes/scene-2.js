/* Scene 2 — "Reminder notes won't work as a script. Write full sentences, the way you'd explain
 * the slide to a student sitting right next to you."
 * Storyboard: close-up on warm paper. The deck's 'Before' note "Sampling bias - convenience samples -
 * eg uni students" sits in clipped slate mono shorthand. On "won't work" it shakes, turns coral and is
 * struck through. On "full sentences" it dissolves and rewrites itself as "Here's the problem with
 * convenience samples." in 110px ink type. On "explain" a speech bubble forms around it; on "sitting
 * right next to you" the bubble's tail grows toward a small listener dot. Caption: "Short sentences,
 * one idea at a time." */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w) => ctx.at(i, w);
  const reminder = A(0, 'Reminder'), wont = A(0, "won't"), work = A(0, 'work');
  const full = A(1, 'full'), sentences = A(1, 'sentences,'), explain = A(1, 'explain');
  const sitting = A(1, 'sitting'), right = A(1, 'right'), next = A(1, 'next');

  stage.style.background = 'radial-gradient(70% 70% at 45% 40%, #FFFDF8 0%, #F7F4EE 55%, #E9E3D7 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 45%' });
  // soft paper light
  el('div', 'abs', cam, { left: '-200px', top: '-300px', width: '1400px', height: '1000px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(61,123,255,.07), transparent)' });

  /* label */
  const label = el('div', 'abs', cam, { left: '200px', top: '200px', font: '600 24px/1 ui-monospace, Menlo, monospace',
    letterSpacing: '.16em', color: '#8A93A6' });
  const dot = el('span', '', label, { display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%',
    background: '#8A93A6', marginRight: '16px', verticalAlign: '1px' });
  const labTxt = el('span', '', label);

  /* the "before" shorthand note */
  const note = el('div', 'abs', cam, { left: '200px', top: '470px', width: '1520px',
    font: '500 46px/1.2 ui-monospace, Menlo, monospace', letterSpacing: '-.01em', color: '#8A93A6', whiteSpace: 'nowrap' });
  const noteChars = ctx.split(note, 'Sampling bias - convenience samples - eg uni students', 'char');
  const strike = el('div', 'abs', cam, { left: '196px', top: '497px', width: '1480px', height: '5px', borderRadius: '3px',
    background: '#FF6B57', transformOrigin: '0% 50%' });

  /* the speech bubble + rewritten sentence */
  const bubble = el('div', 'abs', cam, { left: '160px', top: '300px', width: '1600px', height: '400px', borderRadius: '48px',
    background: '#FFFFFF', boxShadow: '0 40px 90px rgba(27,34,51,.14), 0 4px 14px rgba(27,34,51,.06)', transformOrigin: '20% 100%' });
  const tail = el('div', 'abs', cam, { left: '300px', top: '690px', width: '140px', height: '130px', transformOrigin: '30% 0%' });
  tail.innerHTML = '<svg width="140" height="130" viewBox="0 0 140 130"><path d="M0 0 L110 0 Q 60 40 18 126 Q 22 50 0 0 Z" fill="#FFFFFF"/></svg>';
  tail.style.filter = 'drop-shadow(0 22px 26px rgba(27,34,51,.12))';
  const listener = el('div', 'abs', cam, { left: '292px', top: '826px', width: '44px', height: '44px', borderRadius: '50%',
    background: '#3D7BFF', boxShadow: '0 0 0 10px rgba(61,123,255,.15), 0 10px 30px rgba(61,123,255,.4)' });

  const sent = el('div', 'abs', cam, { left: '240px', top: '380px', width: '1440px',
    font: '800 110px/1.08 Inter Display, Inter', letterSpacing: '-.04em', color: '#1B2233' });
  const words = ctx.split(sent, "Here's the problem with convenience samples.", 'word');
  words.forEach((w) => { w.style.marginRight = '0.24em'; });

  /* caption */
  const cap = el('div', 'abs', cam, { left: '470px', top: '860px', font: '600 34px/1 Inter', letterSpacing: '-.01em', color: '#1B2233' });
  cap.textContent = 'Short sentences, one idea at a time.';
  const capRule = el('div', 'abs', cam, { left: '470px', top: '912px', width: '120px', height: '4px', borderRadius: '2px', background: '#3CCB9A', transformOrigin: '0% 50%' });

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });

  ctx.onFrame((t) => {
    const after = t >= full;
    labTxt.textContent = after ? 'AFTER · WRITTEN FOR THE EAR' : 'BEFORE · SPEAKER NOTE';
    dot.style.background = after ? '#3CCB9A' : (t >= wont ? '#FF6B57' : '#8A93A6');
  });

  /* ---- timeline ---- */
  gsap.set(strike, { scaleX: 0 });
  gsap.set([bubble], { opacity: 0, scale: 0.94 });
  gsap.set(tail, { scaleY: 0, scaleX: 0.6, opacity: 0 });
  gsap.set(listener, { scale: 0, opacity: 0 });
  gsap.set(words, { opacity: 0, y: 50, filter: 'blur(8px)' });
  gsap.set(noteChars, { filter: 'blur(0px)' });
  gsap.set([cap, capRule], { opacity: 0 });
  gsap.set(capRule, { scaleX: 0 });

  // slow continuous push-in
  tl.fromTo(cam, { scale: 1.0, x: 0 }, { scale: 1.06, x: -20, duration: ctx.dur, ease: 'none' }, 0);

  // opening: label and shorthand note type in
  tl.from(label, { opacity: 0, y: 14, duration: 0.5 }, 0.05);
  tl.from(noteChars, { opacity: 0, duration: 0.05, stagger: 0.012, ease: 'none' }, 0.12);
  tl.to(note, { x: 6, duration: 0.01 }, 0); tl.to(note, { x: 0, duration: 0.01 }, 0.02);
  tl.fromTo(note, { y: 0 }, { y: -6, duration: 1.0, ease: 'sine.inOut', immediateRender: false }, reminder);

  // "won't work": shake, coral, struck through
  tl.to(note, { x: 12, duration: 0.05, repeat: 7, yoyo: true, ease: 'sine.inOut' }, wont);
  tl.to(noteChars, { color: '#FF6B57', duration: 0.3, stagger: 0.004, ease: 'power1.out' }, wont);
  tl.to(strike, { scaleX: 1, duration: 0.45, ease: 'power2.inOut' }, work);
  tl.to([note, strike], { opacity: 0.55, duration: 0.6 }, work + 0.5);

  // "full sentences": the note dissolves and rewrites itself
  tl.to(strike, { opacity: 0, duration: 0.3 }, full - 0.15);
  tl.to(noteChars, { opacity: 0, y: -30, filter: 'blur(6px)', duration: 0.4, stagger: { each: 0.006, from: 'start' }, ease: 'power2.in' }, full - 0.2);
  tl.to(label, { x: 40, duration: 0.6, ease: 'power3.out' }, full);
  tl.to(words, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.08, ease: 'back.out(1.6)' }, full);

  // "explain": a speech bubble forms around the sentence
  tl.to(bubble, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)' }, explain - 0.1);
  tl.to(sent, { y: 0, duration: 0.01 }, explain);

  // "sitting right next to you": tail grows toward a listener
  tl.to(tail, { scaleY: 1, scaleX: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.8)' }, sitting);
  tl.to(listener, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, right);
  tl.to(listener, { boxShadow: '0 0 0 22px rgba(61,123,255,.08), 0 10px 30px rgba(61,123,255,.4)', duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, right + 0.4);

  // caption
  tl.fromTo(cap, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, immediateRender: false }, next);
  tl.to(capRule, { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power3.out' }, next + 0.15);

  // gentle breathe at the end
  tl.to([bubble], { y: -6, duration: 1.4, ease: 'sine.inOut' }, next + 0.6);
});
