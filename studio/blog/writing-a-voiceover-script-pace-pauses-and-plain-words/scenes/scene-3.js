/* Scene 3 — "Spoken jargon is harder to decode, because there's no time to stop. Say use, not utilise.
 * Help, not facilitate. Define technical terms once."
 * Storyboard: warm paper stage. A thin ink voice-line hums on "Spoken". On "harder to decode" the line
 * fades and "utilise" appears in mist grey, letters scrambling and jittering. On "use" a coral strike
 * cuts through it and "use" pops in at 160px ink. On "Help" the camera slides right, "help" pops and,
 * on "facilitate", the same coral strike repeats. On "Define technical terms" the camera pulls back to
 * hold both swaps, and on "once" a small amber stamp lands beneath them. ("prior to → before" cut.) */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w) => ctx.at(i, w);
  const tSpoken = W(0, 'Spoken'), tHarder = W(0, 'harder'), tDecode = W(0, 'decode');
  const tUse = W(1, 'use'), tUtil = W(1, 'utilise');
  const tHelp = W(2, 'Help'), tFac = W(2, 'facilitate');
  const tDefine = W(3, 'Define'), tTech = W(3, 'technical'), tOnce = W(3, 'once');

  const hash = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

  stage.style.background = 'radial-gradient(80% 70% at 45% 40%, #fffaf0 0%, var(--paper) 55%, #e9e1d1 100%)';
  const warm = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 40% at 75% 25%, rgba(255,181,71,.12), transparent 70%)' });

  const drift = el('div', 'abs', stage, { inset: 0 });
  const cam = el('div', 'abs', drift, { left: 0, top: 0, width: '3200px', height: '1080px', transformOrigin: '1560px 540px' });

  /* corner label */
  const label = el('div', 'abs', stage, { left: '96px', top: '86px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'var(--mist)' });
  label.textContent = 'PLAIN WORDS · SPOKEN';
  const rule = el('div', 'abs', stage, { left: '96px', top: '122px', width: '80px', height: '3px', background: 'var(--coral)', transformOrigin: '0 50%' });

  /* voice line (procedural) */
  const wave = el('div', 'abs', stage, { left: 0, top: 0, width: '1920px', height: '1080px' });
  wave.innerHTML = '<svg width="1920" height="1080"><path fill="none" stroke="#1C2333" stroke-width="4" stroke-linecap="round"/></svg>';
  const wavePath = wave.querySelector('path');
  const wv = { a: 0 };

  /* swap pair builder */
  function pair(cx, oldWord, newWord) {
    const col = el('div', 'abs', cam, { left: cx - 700 + 'px', width: '1400px', top: '300px', textAlign: 'center' });
    const wrap = el('div', '', col, { display: 'inline-block', position: 'relative' });
    const old = el('div', '', wrap, { font: '700 132px/1.1 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--mist)', whiteSpace: 'nowrap' });
    const chars = ctx.split(old, oldWord, 'char');
    const strike = el('div', 'abs', wrap, { left: '-5%', width: '110%', top: '52%', height: '14px', borderRadius: '7px', background: 'var(--coral)', transformOrigin: '0 50%', boxShadow: '0 6px 20px rgba(255,107,90,.35)' });
    const tag = el('div', '', col, { marginTop: '34px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.2em', color: 'var(--coral)' });
    tag.textContent = 'SAY';
    const nw = el('div', '', col, { marginTop: '6px', font: '900 160px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--ink)', display: 'inline-block', textShadow: '0 18px 40px rgba(28,35,51,.18)' });
    nw.textContent = newWord;
    gsap.set(strike, { scaleX: 0, rotation: -3 });
    gsap.set([old, tag, nw], { opacity: 0 });
    return { col, wrap, old, chars, orig: oldWord.split(''), strike, tag, nw };
  }
  const P1 = pair(960, 'utilise', 'use');
  const P2 = pair(2160, 'facilitate', 'help');
  const jit = [
    { p: P1, start: tHarder, end: tUse - 0.1 },
    { p: P2, start: tHelp - 0.45, end: tFac - 0.05 },
  ];

  /* define + once */
  const defLab = el('div', 'abs', stage, { left: 0, width: '1920px', top: '735px', textAlign: 'center', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.2em', color: 'var(--mist)' });
  defLab.textContent = 'DEFINE TECHNICAL TERMS';
  const stamp = el('div', 'abs', stage, { left: '835px', width: '250px', top: '790px', height: '96px', boxSizing: 'border-box', border: '5px solid var(--amber)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    font: '900 58px/1 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--amber)', background: 'rgba(255,181,71,.08)', boxShadow: '0 14px 40px rgba(255,181,71,.25)' });
  stamp.textContent = 'once';
  const ring = el('div', 'abs', stage, { left: '810px', width: '300px', top: '768px', height: '140px', borderRadius: '20px', border: '4px solid var(--amber)', opacity: 0 });
  gsap.set([defLab, stamp], { opacity: 0 });

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.06, blend: 'multiply' });

  ctx.onFrame((t) => {
    /* voice line */
    let d = 'M 360 540';
    for (let x = 0; x <= 1200; x += 12) {
      const env = Math.sin((x / 1200) * Math.PI);
      const y = 540 + wv.a * env * (Math.sin(x * 0.045 + t * 9) * 38 + Math.sin(x * 0.11 - t * 14) * 18);
      d += ` L ${360 + x} ${y.toFixed(1)}`;
    }
    wavePath.setAttribute('d', d);
    /* scramble + jitter */
    jit.forEach(({ p, start, end }) => {
      const live = t >= start && t < end;
      const k = Math.floor(t * 30);
      p.chars.forEach((c, i) => {
        if (live) {
          const scr = t < start + 0.7 && hash(k * 13 + i) < 0.55 - (t - start) * 0.7;
          c.textContent = scr ? 'aeilostucfz'[Math.floor(hash(k * 7 + i * 3) * 11)] : p.orig[i];
          const dx = (hash(k * 3 + i) - 0.5) * 7, dy = (hash(k * 5 + i * 9) - 0.5) * 9, r = (hash(k + i * 17) - 0.5) * 6;
          c.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) rotate(${r.toFixed(1)}deg)`;
        } else {
          c.textContent = p.orig[i];
          c.style.transform = 'none';
        }
      });
    });
  });

  /* ---- timeline ---- */
  tl.to(drift, { x: -24, y: -8, scale: 1.015, duration: ctx.dur, ease: 'none' }, 0);
  tl.from(label, { opacity: 0, y: -10, duration: 0.5 }, 0.05);
  tl.from(rule, { scaleX: 0, duration: 0.6 }, 0.15);
  tl.to(wv, { a: 0.25, duration: 0.3 }, 0.05);
  tl.to(wv, { a: 1, duration: 0.5, ease: 'power2.out' }, tSpoken - 0.05);
  tl.to(wv, { a: 0.6, duration: 0.4 }, tSpoken + 0.6);
  tl.to(wave, { opacity: 0, y: 140, duration: 0.6, ease: 'power2.in' }, tHarder - 0.2);

  // "harder to decode": utilise appears, scrambled
  tl.fromTo(P1.old, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, tHarder);
  tl.to(P1.old, { scale: 1.03, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }, tDecode);

  // "use": strike + pop
  tl.to(P1.strike, { scaleX: 1, duration: 0.28, ease: 'power4.out' }, tUse - 0.12);
  tl.to(P1.old, { opacity: 0.45, duration: 0.4 }, tUse);
  tl.fromTo(P1.nw, { opacity: 0, scale: 0.4, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.8)' }, tUse);
  tl.to(P1.tag, { opacity: 1, duration: 0.3 }, tUse + 0.1);
  tl.to(P1.nw, { color: '#2a3142', duration: 0.3 }, tUtil);

  // "Help": camera slides right, help pops, strike on facilitate
  tl.to(cam, { x: -1200, duration: 0.75, ease: 'expo.inOut' }, tHelp - 0.55);
  tl.fromTo(P2.old, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, tHelp - 0.45);
  tl.fromTo(P2.nw, { opacity: 0, scale: 0.4, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.8)' }, tHelp);
  tl.to(P2.tag, { opacity: 1, duration: 0.3 }, tHelp + 0.1);
  tl.to(P2.strike, { scaleX: 1, duration: 0.28, ease: 'power4.out' }, tFac - 0.1);
  tl.to(P2.old, { opacity: 0.45, duration: 0.4 }, tFac + 0.05);

  // "Define technical terms": pull back to hold both
  tl.to(cam, { x: -600, scale: 0.7, duration: 0.9, ease: 'expo.inOut' }, tDefine - 0.2);
  tl.fromTo(defLab, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, tTech);

  // "once": amber stamp
  tl.fromTo(stamp, { opacity: 0, scale: 2.2, rotation: 4 }, { opacity: 1, scale: 1, rotation: -5, duration: 0.32, ease: 'power4.in' }, tOnce - 0.3);
  tl.to(stamp, { y: 5, duration: 0.07, yoyo: true, repeat: 1 }, tOnce + 0.02);
  tl.fromTo(ring, { opacity: 0.9, scale: 0.85 }, { opacity: 0, scale: 1.3, duration: 0.7, ease: 'power2.out', immediateRender: false }, tOnce + 0.02);
  tl.to(cam, { y: -6, duration: 0.07, yoyo: true, repeat: 1 }, tOnce + 0.02);
  tl.to(warm, { opacity: 1.6, duration: 0.6 }, tOnce);
});
