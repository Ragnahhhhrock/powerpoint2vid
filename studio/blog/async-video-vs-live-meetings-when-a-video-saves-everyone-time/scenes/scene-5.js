/* Scene 6 — "Put what you'd say in the speaker notes. On Pro, A.I. directs the video, so your proposal
 * lands like a produced pitch. Try it at powerpoint2vid.com."
 * Storyboard: a paper stage with a slide card in the centre and a speaker-notes strip beneath it. On "speaker
 * notes" the note lines lift off as a live sound wave. On "A.I. directs" the card bursts into a dark
 * cinematic frame with coral motion lines, a playhead and a PRO badge. Two chips slide in underneath:
 * "Basic · no subscription needed" and "MP4". On "Try" everything clears. On "PowerPoint" the URL rises
 * at 130px in ink, and on "dot com" a coral underline draws on and holds to the end. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w, f) => { const v = ctx.at(i, w); return (v == null || isNaN(v)) ? f : v; };
  const tSpeaker = W(0, 'speaker', 1.7), tNotes = W(0, 'notes.', 2.08);
  const tAI = W(1, 'A.I.', 3.6), tDirects = W(1, 'directs', 4.1), tLands = W(1, 'lands', 6.26), tProduced = W(1, 'produced', 6.89);
  const tTry = W(2, 'Try', 8.27), tPP = W(2, 'PowerPoint', 8.77), tDot = W(2, 'dot', 9.83);
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 50% 42%, #fffdf8 0%, var(--paper) 55%, #ebe5d8 100%)';
  el('div', 'abs', stage, { left: '-200px', top: '-260px', width: '900px', height: '900px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(143,184,255,.18), transparent 65%)' });
  el('div', 'abs', stage, { left: '1250px', top: '560px', width: '900px', height: '900px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,74,.12), transparent 65%)' });

  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  /* ---------- slide card + speaker notes ---------- */
  const deck = el('div', 'abs', cam, { left: '520px', top: '170px', width: '880px', height: '640px', transformOrigin: '50% 45%' });
  const slide = el('div', 'abs', deck, { left: 0, top: 0, width: '880px', height: '495px', background: '#fff', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 40px 90px rgba(28,34,51,.16), 0 6px 18px rgba(28,34,51,.08)' });
  el('div', 'abs', slide, { left: '70px', top: '70px', width: '520px', height: '34px', borderRadius: '8px', background: 'var(--ink)' });
  el('div', 'abs', slide, { left: '70px', top: '122px', width: '340px', height: '20px', borderRadius: '6px', background: 'var(--mist)', opacity: 0.6 });
  [600, 470, 640, 420].forEach((w, i) => {
    el('div', 'abs', slide, { left: '72px', top: 200 + i * 54 + 'px', width: '14px', height: '14px', borderRadius: '50%', background: 'var(--teal)' });
    el('div', 'abs', slide, { left: '106px', top: 199 + i * 54 + 'px', width: w + 'px', height: '16px', borderRadius: '6px', background: '#dfe3ea' });
  });
  const strip = el('div', 'abs', deck, { left: 0, top: '515px', width: '880px', height: '125px', borderRadius: '14px', background: '#ebe5d9', boxShadow: 'inset 0 0 0 1px rgba(28,34,51,.06)' });
  const notesLab = el('div', 'abs', strip, { left: '30px', top: '22px', font: `600 18px/1 ${MONO}`, letterSpacing: '.14em', color: '#6f7789' });
  notesLab.textContent = 'SPEAKER NOTES';
  const noteLines = [760, 540].map((w, i) => el('div', 'abs', strip, { left: '30px', top: 60 + i * 28 + 'px', width: w + 'px', height: '12px', borderRadius: '6px', background: '#c9c1b2' }));

  const NS = 'http://www.w3.org/2000/svg';
  function makeWave(parent, css, n, w, h, color) {
    const box = el('div', 'abs', parent, css);
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('width', w); svg.setAttribute('height', h);
    box.appendChild(svg);
    const step = w / n, bw = Math.max(3, step * 0.45);
    const bars = [];
    for (let i = 0; i < n; i++) {
      const r = document.createElementNS(NS, 'rect');
      r.setAttribute('x', i * step + (step - bw) / 2); r.setAttribute('width', bw); r.setAttribute('rx', bw / 2);
      r.setAttribute('fill', color);
      svg.appendChild(r); bars.push(r);
    }
    return { box, bars, h, n };
  }
  const wave = makeWave(deck, { left: '40px', top: '530px', width: '800px', height: '100px', opacity: 0, filter: 'drop-shadow(0 8px 16px rgba(255,107,74,.35))' }, 56, 800, 100, '#FF6B4A');
  const amp = { v: 0 };

  /* ---------- cinematic frame ---------- */
  const cine = el('div', 'abs', cam, { left: '360px', top: '180px', width: '1200px', height: '675px', borderRadius: '18px', overflow: 'hidden', opacity: 0,
    background: 'linear-gradient(160deg, #232a40 0%, var(--night) 70%)', boxShadow: '0 50px 110px rgba(15,20,36,.45), 0 0 80px rgba(255,107,74,.25)' });
  el('div', 'abs', cine, { inset: 0, background: 'radial-gradient(45% 55% at 50% 48%, rgba(255,107,74,.32), transparent 70%), radial-gradient(40% 50% at 80% 20%, rgba(143,184,255,.18), transparent 70%)' });
  const lines = [];
  const lr = ctx.rand(7);
  for (let i = 0; i < 12; i++) {
    const w = 160 + lr() * 260;
    const d = el('div', 'abs', cine, { left: 0, top: 80 + lr() * 510 + 'px', width: w + 'px', height: (2 + Math.floor(lr() * 3)) + 'px', borderRadius: '3px',
      background: 'linear-gradient(90deg, transparent, rgba(255,107,74,.9))', opacity: 0 });
    lines.push({ d, sp: 900 + lr() * 1100, off: lr() * 1700, o: 0.4 + lr() * 0.6 });
  }
  const lineAmp = { v: 0 };
  const persp = el('div', 'abs', cine, { inset: 0, perspective: '1400px' });
  const mini = el('div', 'abs', persp, { left: '320px', top: '135px', width: '560px', height: '315px', background: '#fff', borderRadius: '10px', overflow: 'hidden',
    boxShadow: '0 30px 80px rgba(0,0,0,.5), 0 0 60px rgba(255,107,74,.35)', transformOrigin: '50% 50%' });
  el('div', 'abs', mini, { left: '44px', top: '44px', width: '330px', height: '22px', borderRadius: '6px', background: 'var(--ink)' });
  el('div', 'abs', mini, { left: '44px', top: '78px', width: '210px', height: '13px', borderRadius: '5px', background: 'var(--mist)', opacity: 0.6 });
  [380, 300, 400, 260].forEach((w, i) => {
    el('div', 'abs', mini, { left: '46px', top: 128 + i * 34 + 'px', width: '9px', height: '9px', borderRadius: '50%', background: 'var(--teal)' });
    el('div', 'abs', mini, { left: '68px', top: 127 + i * 34 + 'px', width: w + 'px', height: '10px', borderRadius: '4px', background: '#dfe3ea' });
  });
  const wave2 = makeWave(cine, { left: '320px', top: '478px', width: '560px', height: '60px' }, 48, 560, 60, '#2BB3A3');
  el('div', 'abs', cine, { left: 0, top: 0, width: '1200px', height: '58px', background: 'rgba(8,10,20,.85)' });
  el('div', 'abs', cine, { left: 0, top: '617px', width: '1200px', height: '58px', background: 'rgba(8,10,20,.85)' });
  el('div', 'abs', cine, { left: '60px', top: '644px', width: '1080px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.15)' });
  const prog = el('div', 'abs', cine, { left: '60px', top: '644px', width: '1080px', height: '4px', borderRadius: '2px', background: 'var(--signal)', transformOrigin: '0 50%', boxShadow: '0 0 12px rgba(255,107,74,.8)' });
  const badge = el('div', 'abs', cine, { right: '44px', top: '82px', display: 'flex', alignItems: 'center', gap: '16px', transformOrigin: '100% 50%', opacity: 0 });
  const aiLab = el('div', '', badge, { font: `600 18px/1 ${MONO}`, letterSpacing: '.16em', color: 'rgba(255,255,255,.8)' }); aiLab.textContent = 'AI DIRECTED';
  const pro = el('div', '', badge, { font: '900 30px/1 Inter Display, Inter', letterSpacing: '.02em', color: '#fff', background: 'var(--signal)', padding: '12px 22px', borderRadius: '999px', boxShadow: '0 0 40px rgba(255,107,74,.7)' });
  pro.textContent = 'PRO';
  const flash = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(40% 45% at 50% 48%, rgba(255,170,140,.7), transparent 70%)', opacity: 0 });

  /* ---------- chips ---------- */
  const chips = el('div', 'abs', cam, { left: 0, width: '1920px', top: '890px', display: 'flex', justifyContent: 'center', gap: '20px' });
  const chip1 = el('div', '', chips, { display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 28px', borderRadius: '999px', background: '#fff', boxShadow: '0 12px 30px rgba(28,34,51,.12)', font: '600 26px/1 Inter', color: 'var(--ink)', opacity: 0 });
  el('div', '', chip1, { width: '12px', height: '12px', borderRadius: '50%', background: 'var(--teal)' });
  const c1t = el('span', '', chip1, {}); c1t.textContent = 'Basic · no subscription needed';
  const chip2 = el('div', '', chips, { display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 28px', borderRadius: '999px', background: 'var(--ink)', boxShadow: '0 12px 30px rgba(28,34,51,.2)', font: '700 26px/1 Inter', color: 'var(--paper)', opacity: 0 });
  const arrow = el('span', '', chip2, { color: 'var(--signal)', fontWeight: 900 }); arrow.textContent = '↓';
  const c2t = el('span', '', chip2, {}); c2t.textContent = 'MP4';

  /* ---------- URL end card ---------- */
  const end = el('div', 'abs', stage, { left: 0, width: '1920px', top: '420px', textAlign: 'center', transformOrigin: '50% 60%' });
  const tryLab = el('div', '', end, { font: `600 24px/1 ${MONO}`, letterSpacing: '.22em', color: '#6f7789', marginBottom: '34px', opacity: 0 });
  tryLab.textContent = 'TRY IT AT';
  const urlWrap = el('div', '', end, { display: 'inline-block', position: 'relative' });
  const url = el('div', '', urlWrap, { font: '800 130px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const chars = ctx.split(url, 'powerpoint2vid.com', 'char');
  chars.forEach((c) => { if (c.textContent === '2') c.style.color = 'var(--signal)'; });
  const under = el('div', 'abs', urlWrap, { left: '4px', right: '4px', bottom: '-22px', height: '12px', borderRadius: '6px', background: 'var(--signal)', transformOrigin: '0 50%', boxShadow: '0 6px 24px rgba(255,107,74,.45)' });
  gsap.set(chars, { opacity: 0, y: 70 });
  gsap.set(under, { scaleX: 0 });

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---------- per-frame drawing ---------- */
  function drawWave(wv, a, t, k) {
    wv.bars.forEach((r, i) => {
      const env = Math.sin(Math.PI * (i + 0.5) / wv.n);
      const m = 0.3 + 0.7 * Math.abs(Math.sin(t * 6 * k + i * 0.55) * Math.cos(t * 2.3 + i * 0.21));
      const h = Math.max(4, 4 + a * (wv.h - 8) * env * m);
      r.setAttribute('height', h); r.setAttribute('y', (wv.h - h) / 2);
    });
  }
  ctx.onFrame((t) => {
    drawWave(wave, amp.v, t, 1);
    drawWave(wave2, lineAmp.v, t, 1.2);
    lines.forEach((l) => {
      const x = ((t * l.sp + l.off) % 1700) - 420;
      l.d.style.transform = `translateX(${x}px)`;
      l.d.style.opacity = lineAmp.v * l.o;
    });
  });

  /* ---------- timeline ---------- */
  tl.fromTo(cam, { scale: 1 }, { scale: 1.035, duration: tTry, ease: 'none' }, 0);
  tl.from(deck, { y: 40, opacity: 0.3, duration: 0.6 }, 0.02);

  // "speaker notes": the notes lift off as a sound wave
  tl.to(noteLines, { y: -18, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'power2.in' }, tSpeaker - 0.1);
  tl.to(notesLab, { color: 'var(--signal)', duration: 0.3 }, tSpeaker);
  tl.to(wave.box, { opacity: 1, duration: 0.3 }, tSpeaker + 0.1);
  tl.to(amp, { v: 1, duration: 0.5, ease: 'power2.out' }, tSpeaker + 0.1);
  tl.to(wave.box, { y: -44, scale: 1.06, duration: 0.7, ease: 'back.out(1.8)' }, tNotes);
  tl.to(strip, { backgroundColor: '#f3ddd3', duration: 0.5 }, tNotes);

  // "A.I. directs": the card bursts into a cinematic frame
  gsap.set(deck, { filter: 'blur(0px)' });
  tl.to(deck, { scale: 0.96, duration: 0.25, ease: 'power2.in' }, tAI - 0.28);
  tl.to(deck, { scale: 1.3, opacity: 0, filter: 'blur(10px)', duration: 0.38, ease: 'power2.in' }, tAI - 0.03);
  tl.fromTo(flash, { opacity: 0 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, tAI + 0.1);
  tl.fromTo(cine, { opacity: 0, scale: 0.78 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)', immediateRender: false }, tAI + 0.08);
  tl.to(lineAmp, { v: 1, duration: 0.5 }, tAI + 0.2);
  tl.fromTo(mini, { rotationY: -22, rotationX: 8, scale: 0.9 }, { rotationY: 10, rotationX: -4, scale: 1.04, duration: tTry - tAI, ease: 'sine.inOut', immediateRender: false }, tAI);
  tl.fromTo(prog, { scaleX: 0 }, { scaleX: 1, duration: tTry - tAI, ease: 'none', immediateRender: false }, tAI);
  tl.fromTo(badge, { opacity: 0, scale: 0.4, x: 30 }, { opacity: 1, scale: 1, x: 0, duration: 0.55, ease: 'back.out(2)', immediateRender: false }, tDirects - 0.05);
  tl.to(pro, { boxShadow: '0 0 70px rgba(255,107,74,1)', duration: 0.4, yoyo: true, repeat: 1 }, tLands);

  // chips slide in beneath
  tl.fromTo(chip1, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.55, ease: 'back.out(1.6)', immediateRender: false }, tLands + 0.1);
  tl.fromTo(chip2, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.55, ease: 'back.out(1.6)', immediateRender: false }, tProduced);

  // "Try it at": clear the stage
  tl.to([cine, chips], { opacity: 0, scale: 0.9, y: -30, duration: 0.45, ease: 'power2.in', stagger: 0.05 }, tTry - 0.15);
  tl.to(lineAmp, { v: 0, duration: 0.3 }, tTry);
  tl.fromTo(tryLab, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, tTry + 0.2);
  tl.to(chars, { opacity: 1, y: 0, duration: 0.6, stagger: 0.025, ease: 'back.out(1.7)' }, tPP - 0.15);
  tl.to(under, { scaleX: 1, duration: 0.65, ease: 'expo.out' }, tDot - 0.1);
  tl.fromTo(end, { scale: 1 }, { scale: 1.035, duration: Math.max(0.5, ctx.dur - tPP), ease: 'sine.out', immediateRender: false }, tPP);
});
