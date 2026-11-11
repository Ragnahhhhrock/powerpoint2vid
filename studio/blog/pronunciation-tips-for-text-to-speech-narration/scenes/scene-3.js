/* Scene 3: "Voices read numbers literally, so write them as people say them. Spell out symbols and units,
 * and rephrase any word with two pronunciations."
 * Storyboard: Ink stage with paper type and a slow push-in. '$1,500' fills the centre at 160px. On "literally"
 * a faint robotic reading appears beneath it. On "as people say them" '$1,500' morphs into 'fifteen hundred
 * dollars', and the '2026-27' chip flips to 'twenty twenty-six to twenty-seven'. A lateral glide moves to the
 * workshop bench. On "symbols" a '%' and an '&' drop in, then turn into 'per cent' and 'and'. On
 * "rephrase", 'lead' appears. On "two pronunciations" it splits into two ghosted coral copies (LEED / LED)
 * and is then struck out, with a mint "rephrase it" hint. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w, f) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const tNumbers = W(0, 'numbers', 1.316), tLit = W(0, 'literally,', 1.711), tAs = W(0, 'as', 3.034), tSay = W(0, 'say', 3.499);
  const tSym = W(1, 'symbols', 5.287), tUnits = W(1, 'units,', 5.948), tReph = W(1, 'rephrase', 6.703);
  const tTwo = W(1, 'two', 7.992), tPron = W(1, 'pronunciations.', 8.212);
  const MONO = 'ui-monospace, Menlo, monospace';
  const HEAD = 'Inter Display, Inter, sans-serif';

  stage.style.background = 'radial-gradient(60% 55% at 50% 45%, #272d42 0%, var(--ink) 58%, var(--night) 100%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 30% at 50% 46%, rgba(61,123,255,.14), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 50%' });
  const world = el('div', 'abs', cam, { left: 0, top: 0, width: '3840px', height: '1080px' });
  const p1 = el('div', 'abs', world, { left: 0, top: 0, width: '1920px', height: '1080px', perspective: '1400px' });
  const p2 = el('div', 'abs', world, { left: '1920px', top: 0, width: '1920px', height: '1080px' });

  const label = (parent, txt, css) => { const d = el('div', 'abs', parent, Object.assign({ font: `600 22px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--mist)', textTransform: 'uppercase' }, css)); d.textContent = txt; return d; };

  /* ---------- panel 1: numbers ---------- */
  const lab1 = label(p1, 'Write it as it’s said', { left: 0, width: '1920px', top: '250px', textAlign: 'center' });
  const money = el('div', 'abs', p1, { left: 0, width: '1920px', top: '370px', textAlign: 'center', font: `800 160px/1 ${HEAD}`, letterSpacing: '-.04em', color: 'var(--paper)', textShadow: '0 20px 60px rgba(0,0,0,.45)' });
  const mChars = ctx.split(money, '$1,500', 'char');
  const spoken = el('div', 'abs', p1, { left: 0, width: '1920px', top: '392px', textAlign: 'center', font: `800 116px/1 ${HEAD}`, letterSpacing: '-.04em', color: 'var(--paper)', textShadow: '0 0 50px rgba(63,214,164,.25)' });
  const sWords = ctx.split(spoken, 'fifteen hundred dollars', 'word');
  const underline = el('div', 'abs', p1, { left: '460px', width: '1000px', top: '530px', height: '6px', borderRadius: '3px', background: 'var(--mint)', transformOrigin: '0% 50%', boxShadow: '0 0 24px rgba(63,214,164,.6)' });
  const literal = label(p1, '“dollar one comma five hundred”', { left: 0, width: '1920px', top: '580px', textAlign: 'center', fontSize: '26px', color: 'rgba(154,163,181,.85)' });
  const litStrike = el('div', 'abs', p1, { left: '700px', width: '520px', top: '591px', height: '3px', background: 'var(--coral)', transformOrigin: '0% 50%' });

  const chipRow = (txt, size, border, color) => {
    const row = el('div', 'abs', p1, { left: 0, width: '1920px', top: '690px', display: 'flex', justifyContent: 'center' });
    const pill = el('div', '', row, { font: `700 ${size}px/1 ${HEAD}`, letterSpacing: '-.02em', color, padding: '22px 44px', borderRadius: '999px', border: `2px solid ${border}`, background: 'rgba(255,255,255,.04)', boxShadow: '0 20px 50px rgba(0,0,0,.35)', transformOrigin: '50% 50%', backfaceVisibility: 'hidden' });
    pill.textContent = txt; return pill;
  };
  const chipA = chipRow('2026-27', 64, 'rgba(247,244,238,.28)', 'var(--paper)');
  const chipB = chipRow('twenty twenty-six to twenty-seven', 52, 'rgba(63,214,164,.7)', 'var(--mint)');

  /* ---------- panel 2: symbols + "lead" ---------- */
  const lab2 = label(p2, 'Spell out symbols', { left: '160px', top: '200px' });
  const lab3 = label(p2, 'One word, two sounds', { left: '1060px', width: '760px', top: '150px', textAlign: 'center' });
  const divider = el('div', 'abs', p2, { left: '1010px', top: '260px', width: '2px', height: '600px', background: 'linear-gradient(180deg, transparent, rgba(247,244,238,.18), transparent)', transformOrigin: '50% 50%' });

  const rows = [['%', 'per cent', 330], ['&', 'and', 580]].map(([s, w, y]) => {
    const sym = el('div', 'abs', p2, { left: '160px', width: '160px', top: y + 'px', textAlign: 'center', font: `800 160px/1 ${HEAD}`, color: 'var(--paper)', textShadow: '0 20px 50px rgba(0,0,0,.45)' });
    sym.textContent = s;
    const arrow = el('div', 'abs', p2, { left: '345px', top: y + 52 + 'px', width: '90px', height: '56px', transformOrigin: '0% 50%' });
    arrow.innerHTML = '<svg width="90" height="56"><path d="M4 28 H78 M60 10 L80 28 L60 46" fill="none" stroke="#9AA3B5" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const word = el('div', 'abs', p2, { left: '460px', top: y + 34 + 'px', font: `800 104px/1 ${HEAD}`, letterSpacing: '-.04em', color: 'var(--mint)', whiteSpace: 'nowrap', textShadow: '0 0 40px rgba(63,214,164,.3)' });
    word.textContent = w;
    return { sym, arrow, word };
  });

  const leadBox = (color, extra) => { const d = el('div', 'abs', p2, Object.assign({ left: '1060px', width: '760px', top: '400px', textAlign: 'center', font: `800 180px/1 ${HEAD}`, letterSpacing: '-.04em', color }, extra || {})); d.textContent = 'lead'; return d; };
  const ghostUp = leadBox('var(--coral)', { opacity: 0 });
  const ghostDn = leadBox('var(--coral)', { opacity: 0 });
  const lead = leadBox('var(--paper)', { textShadow: '0 20px 60px rgba(0,0,0,.45)' });
  const tagUp = label(p2, 'leed · to guide', { left: '1060px', width: '760px', top: '214px', textAlign: 'center', color: 'var(--coral)' });
  const tagDn = label(p2, 'led · the metal', { left: '1060px', width: '760px', top: '752px', textAlign: 'center', color: 'var(--coral)' });
  const strike = el('div', 'abs', p2, { left: '1210px', width: '460px', top: '492px', height: '12px', borderRadius: '6px', background: 'var(--coral)', transformOrigin: '0% 50%', boxShadow: '0 0 30px rgba(255,107,87,.7)' });
  const hint = el('div', 'abs', p2, { left: '1060px', width: '760px', top: '850px', display: 'flex', justifyContent: 'center' });
  const hintPill = el('div', '', hint, { font: `700 24px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--night)', background: 'var(--mint)', padding: '14px 26px', borderRadius: '999px', boxShadow: '0 0 40px rgba(63,214,164,.45)' });
  hintPill.textContent = 'REPHRASE IT';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---------- initial states ---------- */
  gsap.set([...mChars, ...sWords, literal, chipA, chipB], { filter: 'blur(0px)' });
  gsap.set(sWords, { opacity: 0, y: 50 });
  gsap.set([underline, litStrike, strike], { scaleX: 0 });
  gsap.set([literal, chipA, chipB, lab2, lab3, divider, tagUp, tagDn, hint, lead], { opacity: 0 });
  gsap.set(chipB, { rotationX: -90 });
  rows.forEach((r) => { gsap.set(r.sym, { x: 300, y: -500, scale: 1.25, opacity: 0 }); gsap.set(r.arrow, { scaleX: 0, opacity: 0 }); gsap.set(r.word, { opacity: 0, x: -24, filter: 'blur(8px)' }); });

  /* ---------- camera ---------- */
  tl.fromTo(cam, { scale: 1 }, { scale: 1.045, duration: 4.3, ease: 'none' }, 0);
  tl.to(world, { x: -1920, duration: 1.0, ease: 'expo.inOut' }, 4.25);
  tl.to(cam, { scale: 1.08, duration: ctx.dur - 4.3, ease: 'power1.inOut' }, 4.3);
  tl.to(glow, { opacity: 0.6, duration: 1, yoyo: true, repeat: 1 }, 4.2);

  /* ---------- beat 0 ---------- */
  tl.from(mChars, { y: 60, opacity: 0, duration: 0.45, stagger: 0.04, ease: 'back.out(1.8)' }, 0.05);
  tl.from(lab1, { opacity: 0, y: 12, duration: 0.4 }, 0.15);
  tl.fromTo(chipA, { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.8)', immediateRender: false }, tNumbers);
  tl.fromTo(literal, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, immediateRender: false }, tLit);
  tl.to(litStrike, { scaleX: 1, duration: 0.3, ease: 'power2.out' }, tAs - 0.25);
  // morph $1,500 -> fifteen hundred dollars
  tl.to(mChars, { y: -70, opacity: 0, filter: 'blur(10px)', duration: 0.32, stagger: 0.025, ease: 'power2.in' }, tAs - 0.12);
  tl.to([literal, litStrike], { opacity: 0, duration: 0.3 }, tAs + 0.15);
  tl.to(sWords, { y: 0, opacity: 1, duration: 0.42, stagger: 0.08, ease: 'back.out(1.7)' }, tAs + 0.1);
  tl.to(underline, { scaleX: 1, duration: 0.5, ease: 'power3.out' }, tAs + 0.35);
  // chip flip on "say"
  tl.to(chipA, { rotationX: 90, opacity: 0, duration: 0.22, ease: 'power2.in' }, tSay - 0.05);
  tl.to(chipB, { rotationX: 0, opacity: 1, duration: 0.36, ease: 'back.out(1.6)' }, tSay + 0.17);

  /* ---------- beat 1: symbols ---------- */
  tl.to([lab2, lab3], { opacity: 1, duration: 0.4 }, 4.9);
  tl.fromTo(divider, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.7, immediateRender: false }, 5.0);
  rows.forEach((r, i) => {
    const d = tSym + i * 0.18;
    tl.to(r.sym, { y: 0, opacity: 1, duration: 0.55, ease: 'back.out(1.6)' }, d);
    const m = tUnits - 0.05 + i * 0.22;
    tl.to(r.sym, { x: 0, scale: 1, color: '#9AA3B5', opacity: 0.55, duration: 0.4, ease: 'power3.out' }, m);
    tl.to(r.arrow, { scaleX: 1, opacity: 1, duration: 0.3 }, m + 0.12);
    tl.to(r.word, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.35, ease: 'power3.out' }, m + 0.2);
  });

  /* ---------- beat 1: lead ---------- */
  tl.fromTo(lead, { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.8)', immediateRender: false }, tReph);
  tl.fromTo(ghostUp, { opacity: 0.9, y: 0, scale: 1, filter: 'blur(0px)' }, { opacity: 0.5, y: -200, scale: 0.6, filter: 'blur(1px)', duration: 0.55, ease: 'back.out(1.4)', immediateRender: false }, tTwo);
  tl.fromTo(ghostDn, { opacity: 0.9, y: 0, scale: 1, filter: 'blur(0px)' }, { opacity: 0.5, y: 190, scale: 0.6, filter: 'blur(1px)', duration: 0.55, ease: 'back.out(1.4)', immediateRender: false }, tTwo + 0.08);
  tl.fromTo([tagUp, tagDn], { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.1, immediateRender: false }, tTwo + 0.3);
  tl.to(lead, { x: -6, duration: 0.06, yoyo: true, repeat: 3, ease: 'none' }, tTwo + 0.1);
  const tStrike = Math.min(tPron + 0.6, ctx.dur - 2.0);
  tl.to(strike, { scaleX: 1, duration: 0.35, ease: 'power3.out' }, tStrike);
  tl.to(lead, { color: '#9AA3B5', duration: 0.35 }, tStrike + 0.05);
  tl.fromTo(hint, { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.8)', immediateRender: false }, tStrike + 0.3);
});
