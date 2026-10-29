/* Scene 4 — "In a narrated video, your notes become the voiceover. Open by restating the headline aloud,
 * so the point lands twice: on screen and in their ears."
 * Storyboard: split stage. Left half is paper, with the slide shown as a screen carrying the headline
 * "Implementation takes four steps and about three weeks". Right half is night, with a live waveform and
 * the notes transcript. On "voiceover" the waveform pulses mint. On "restating the headline", "four steps"
 * and "three weeks" light butter on both sides at the same moment. On "lands twice" two coral pins drop:
 * one on the screen, one on an ear icon, and they hold. "ON SCREEN" and "IN THEIR EARS" snap in as they're said. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w) => ctx.at(i, w);
  const narrated = W(0, 'narrated'), notes = W(0, 'notes'), voice = W(0, 'voiceover.');
  const restating = W(1, 'restating'), lands = W(1, 'lands'), twice = W(1, 'twice:');
  const screenW = W(1, 'screen'), ears = W(1, 'ears.');
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';
  const BUTTER = '#FFD166', MINT = '#2EC4A0', SIGNAL = '#FF5A3C', SLATE = '#8A90A6';

  stage.style.background = 'var(--night)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 520px' });

  /* halves */
  const paper = el('div', 'abs', cam, { left: '-40px', top: '-40px', width: '1000px', height: '1160px',
    background: 'radial-gradient(70% 60% at 50% 45%, #fffdf8 0%, var(--paper) 65%, #e9e4d8 100%)' });
  const night = el('div', 'abs', cam, { left: '960px', top: '-40px', width: '1000px', height: '1160px',
    background: 'radial-gradient(70% 60% at 45% 45%, #1b1f33 0%, var(--night) 70%)' });
  const seam = el('div', 'abs', cam, { left: '958px', top: 0, width: '4px', height: '1080px',
    background: 'linear-gradient(180deg, transparent, rgba(255,90,60,.6), transparent)' });

  /* LEFT: the slide on a screen */
  const lTag = el('div', 'abs', cam, { left: '120px', top: '180px', font: MONO, letterSpacing: '.14em', color: '#6b6f80' });
  lTag.textContent = 'SLIDE · HEADLINE';
  const card = el('div', 'abs', cam, { left: '120px', top: '250px', width: '720px', height: '405px', background: '#fff',
    borderRadius: '14px', border: '10px solid var(--ink)', boxSizing: 'border-box', boxShadow: '0 40px 80px rgba(20,22,31,.22)' });
  const neck = el('div', 'abs', cam, { left: '455px', top: '655px', width: '50px', height: '50px', background: 'var(--ink)' });
  const base = el('div', 'abs', cam, { left: '370px', top: '700px', width: '220px', height: '14px', borderRadius: '7px', background: 'var(--ink)' });
  const head = el('div', 'abs', card, { left: '50px', top: '62px', width: '600px', font: '800 54px/1.14 Inter Display, Inter',
    letterSpacing: '-.035em', color: 'var(--ink)' });
  const hlCss = 'background-image:linear-gradient(#FFD166,#FFD166);background-repeat:no-repeat;background-size:0% 100%;' +
    '-webkit-box-decoration-break:clone;box-decoration-break:clone;padding:0 6px;margin:0 -6px;border-radius:6px;';
  head.innerHTML = `Implementation takes <span class="hl" style="${hlCss}">four steps</span> and about <span class="hl" style="${hlCss}">three weeks</span>`;
  const headHL = [...head.querySelectorAll('.hl')];
  const lLabel = el('div', 'abs', cam, { left: '120px', width: '720px', top: '760px', textAlign: 'center',
    font: '800 44px/1 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)' });
  lLabel.textContent = 'On screen';

  /* RIGHT: ear, waveform, transcript */
  const rTag = el('div', 'abs', cam, { left: '1060px', top: '180px', font: MONO, letterSpacing: '.14em', color: SLATE });
  rTag.textContent = 'NOTES → VOICEOVER';
  const ear = el('div', 'abs', cam, { left: '1390px', top: '215px', width: '140px', height: '150px' });
  ear.innerHTML = `<svg width="140" height="150" viewBox="0 0 140 150"><g fill="none" stroke-width="9" stroke-linecap="round" stroke="currentColor">
    <path d="M38 62 C38 18 112 14 112 64 C112 92 84 94 82 116 C80 140 52 142 46 124"/>
    <path d="M62 66 C62 44 90 44 90 64 C90 76 76 78 76 88"/></g></svg>`;
  ear.style.color = SLATE;
  const wave = el('div', 'abs', cam, { left: '1060px', top: '400px', width: '760px', height: '200px' });
  const N = 44, rnd = ctx.rand(7);
  const bars = Array.from({ length: N }, (_, i) => {
    const b = el('div', 'abs', wave, { left: i * (760 / N) + 'px', top: 0, width: '9px', height: '200px', borderRadius: '5px', background: SLATE });
    return { b, ph: rnd() * 6.28, sp: 6 + rnd() * 9, env: 0.35 + 0.65 * Math.sin(Math.PI * (i + 0.5) / N) };
  });
  gsap.set(wave, { filter: 'drop-shadow(0 0 0px rgba(46,196,160,0))' });
  const tr = el('div', 'abs', cam, { left: '1060px', top: '650px', width: '760px', font: '600 42px/1.3 Inter Display, Inter',
    letterSpacing: '-.02em', color: '#c9cddb' });
  tr.innerHTML = `“Getting started takes about <span class="hl" style="${hlCss}">three weeks</span>, in <span class="hl" style="${hlCss}">four steps</span>.”`;
  const trHL = [...tr.querySelectorAll('.hl')];
  const rLabel = el('div', 'abs', cam, { left: '1060px', width: '760px', top: '860px', textAlign: 'center',
    font: '800 44px/1 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff' });
  rLabel.textContent = 'In their ears';

  /* coral pins */
  const mkPin = (cx, tipY) => {
    const p = el('div', 'abs', cam, { left: cx - 32 + 'px', top: tipY - 88 + 'px', width: '64px', height: '88px', transformOrigin: '50% 100%' });
    el('div', 'abs', p, { left: '4px', top: '0px', width: '56px', height: '56px', background: SIGNAL, borderRadius: '50% 50% 50% 0',
      transform: 'translateY(10px) rotate(-45deg)', boxShadow: '0 0 30px rgba(255,90,60,.6)' });
    el('div', 'abs', p, { left: '22px', top: '20px', width: '20px', height: '20px', borderRadius: '50%', background: '#fff' });
    const sh = el('div', 'abs', cam, { left: cx - 26 + 'px', top: tipY - 6 + 'px', width: '52px', height: '12px', borderRadius: '50%', background: 'rgba(0,0,0,.35)', filter: 'blur(3px)' });
    const ring = el('div', 'abs', cam, { left: cx - 70 + 'px', top: tipY - 70 + 'px', width: '140px', height: '140px', borderRadius: '50%', border: '5px solid ' + SIGNAL, opacity: 0 });
    return { p, sh, ring };
  };
  const pin1 = mkPin(800, 258), pin2 = mkPin(1460, 236);

  ctx.fx.vignette({ strength: 0.4 });
  ctx.fx.grain({ opacity: 0.06 });

  /* waveform state */
  const amp = { v: 0.06, c: 0 };
  const mixC = gsap.utils.interpolate(SLATE, MINT);
  ctx.onFrame((t) => {
    const col = mixC(amp.c);
    bars.forEach((o) => {
      const s = Math.abs(Math.sin(t * o.sp + o.ph)) * 0.7 + Math.abs(Math.sin(t * o.sp * 0.43 + o.ph * 2)) * 0.3;
      o.b.style.transform = `scaleY(${Math.max(0.05, amp.v * o.env * (0.35 + s))})`;
      o.b.style.background = col;
    });
  });

  /* ---- timeline ---- */
  tl.from(paper, { xPercent: -8, duration: 0.6, ease: 'expo.out' }, 0);
  tl.from(night, { xPercent: 8, duration: 0.6, ease: 'expo.out' }, 0);
  tl.from([card, neck, base], { y: 40, opacity: 0, duration: 0.3, stagger: 0.04 }, 0.1);
  tl.from(head, { opacity: 0, y: 16, duration: 0.25 }, 0.3);
  tl.from([lTag, rTag], { opacity: 0, x: -14, duration: 0.25, stagger: 0.08 }, 0.25);
  tl.from(ear, { opacity: 0, scale: 0.7, duration: 0.3, ease: 'back.out(1.8)' }, 0.4);
  tl.from(seam, { scaleY: 0, duration: 0.6 }, 0.1);

  // narrator starts: wave comes alive
  tl.to(amp, { v: 0.45, duration: 0.4 }, narrated - 0.2);
  // "notes": transcript appears
  tl.from(tr, { opacity: 0, y: 20, duration: 0.3 }, notes - 0.05);
  // "voiceover": mint pulse
  tl.to(amp, { c: 1, v: 0.95, duration: 0.25, ease: 'power2.out' }, voice);
  tl.to(wave, { filter: 'drop-shadow(0 0 22px rgba(46,196,160,.85))', duration: 0.25 }, voice);
  tl.to(amp, { v: 0.6, duration: 0.6, ease: 'power2.inOut' }, voice + 0.35);
  tl.to(wave, { filter: 'drop-shadow(0 0 10px rgba(46,196,160,.45))', duration: 0.6 }, voice + 0.35);

  // "restating the headline": both sides light butter at once
  tl.to(cam, { scale: 1.03, duration: 2.2, ease: 'expo.inOut' }, restating - 0.4);
  tl.to([...headHL, ...trHL], { backgroundSize: '100% 100%', duration: 0.28, ease: 'power3.out' }, restating);
  tl.to(trHL, { color: '#14161F', duration: 0.2 }, restating);

  // "lands twice": pins drop and hold
  [[pin1, lands], [pin2, twice]].forEach(([pn, t]) => {
    tl.fromTo(pn.p, { y: -420, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, ease: 'power3.in' }, t - 0.32);
    tl.fromTo(pn.p, { scaleY: 0.8 }, { scaleY: 1, duration: 0.4, ease: 'back.out(3)', immediateRender: false }, t);
    tl.from(pn.sh, { scale: 0, opacity: 0, duration: 0.3 }, t - 0.2);
    tl.fromTo(pn.ring, { scale: 0.3, opacity: 1 }, { scale: 1.6, opacity: 0, duration: 0.7, ease: 'power2.out', immediateRender: false }, t);
  });
  tl.to(card, { borderColor: SIGNAL, duration: 0.2 }, lands);
  tl.to(ear, { color: SIGNAL, duration: 0.2 }, twice);

  // "screen" / "ears" labels snap in
  tl.from(lLabel, { opacity: 0, y: 24, duration: 0.25 }, screenW - 0.1);
  tl.from(rLabel, { opacity: 0, y: 24, duration: 0.25 }, ears - 0.1);
  tl.to(rLabel, { color: SIGNAL, duration: 0.2 }, ears + 0.1);
  tl.to(lLabel, { color: SIGNAL, duration: 0.2 }, screenW + 0.1);

  // speech eases down as the narration ends; slow push continues
  tl.to(amp, { v: 0.12, duration: 0.8 }, Math.min(ctx.dur - 1, 10.3));
  tl.to(cam, { scale: 1.055, duration: ctx.dur - (restating + 1.8), ease: 'power1.inOut' }, restating + 1.8);
});
