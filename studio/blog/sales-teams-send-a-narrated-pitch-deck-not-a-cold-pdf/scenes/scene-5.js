/* Scene 5 — "Ordinary slides in, extraordinary pitch out. Try Basic with no subscription needed, or go Pro
 * from A$29 a month and let a.i. direct your pitch. Visit powerpoint2vid.com."
 * Storyboard: night stage, centred. The plain slide-6 render slides in from the left, glides through a
 * glowing coral seam and comes out the other side as a playing video. Headline builds in two halves.
 * On "Basic" and "Pro … A$29 a month" two tags pop in side by side, Pro edged in electric blue.
 * On "powerpoint2vid.com" the URL lands at 110px and holds. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w) => ctx.at(i, w);
  const tOrd = A(0, 'Ordinary'), tExtra = A(0, 'extraordinary'), tOut = A(0, 'out.');
  const tBasic = A(1, 'Basic'), tPro = A(1, 'Pro'), tPrice = A(1, 'A$29'), tAI = A(1, 'A.I.');
  const tVisit = A(2, 'Visit'), tURL = A(2, 'PowerPoint'), tCom = A(2, 'com.');
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 50% 48%, #1d2747 0%, var(--night) 70%)';
  const glowBg = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(30% 40% at 50% 42%, rgba(255,107,74,.16), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 500px' });

  const head = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '96px', textAlign: 'center', font: '800 64px/1.1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  const words = ctx.split(head, 'Ordinary slides in, extraordinary pitch out', 'word');
  words.forEach((w, i) => { if (i >= 3) { Object.assign(w.style, { background: 'linear-gradient(100deg, #ffd0c2, #FF6B4A)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }); } });

  const SEAM_TOP = 210, SEAM_H = 440;
  const seamGlow = el('div', 'abs', cam, { left: '880px', top: SEAM_TOP - 20 + 'px', width: '160px', height: SEAM_H + 40 + 'px', background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,107,74,.45), transparent 70%)', filter: 'blur(8px)' });
  const seamLine = el('div', 'abs', cam, { left: '957px', top: SEAM_TOP + 'px', width: '6px', height: SEAM_H + 'px', borderRadius: '3px', background: 'linear-gradient(180deg, transparent, #ffb199 15%, #FF6B4A 50%, #ffb199 85%, transparent)', boxShadow: '0 0 30px #FF6B4A, 0 0 80px rgba(255,107,74,.6)' });

  const W = 640, H = 360, CT = 250;
  const card = el('div', 'abs', cam, { top: CT + 'px', left: '0px', width: W + 'px', height: H + 'px', transformOrigin: '50% 50%' });
  el('div', 'abs', card, { inset: 0, borderRadius: '14px', boxShadow: '0 40px 90px rgba(0,0,0,.55)' });
  const plain = el('div', 'abs', card, { inset: 0, borderRadius: '10px', overflow: 'hidden', background: '#fff' });
  const img = el('img', 'abs', plain, { inset: 0, width: '100%', height: '100%' }); img.src = ctx.asset('slide-6.png');
  const video = el('div', 'abs', card, { inset: 0, borderRadius: '14px', overflow: 'hidden', background: 'linear-gradient(140deg, #222b48 0%, #141a2e 100%)', boxShadow: 'inset 0 0 0 2px rgba(255,107,74,.6), 0 0 60px rgba(255,107,74,.3)' });
  el('div', 'abs', video, { inset: 0, background: 'radial-gradient(60% 70% at 75% 30%, rgba(255,107,74,.25), transparent 70%)' });
  const vt = el('div', 'abs', video, { left: '40px', top: '44px', width: '560px', font: '800 40px/1.05 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff' });
  vt.innerHTML = 'Extraordinary<br><span style="color:#FF6B4A">pitch out</span>';
  el('div', 'abs', video, { left: '40px', top: '150px', width: '64px', height: '6px', borderRadius: '3px', background: '#FF6B4A' });
  [0, 1].forEach((i) => el('div', 'abs', video, { left: '40px', top: 178 + i * 22 + 'px', width: 300 - i * 90 + 'px', height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,.18)' }));
  const cap = el('div', 'abs', video, { left: '50%', top: '238px', transform: 'translateX(-50%)', padding: '8px 16px', borderRadius: '8px', background: 'rgba(0,0,0,.6)', font: '600 19px/1 Inter', color: '#fff', whiteSpace: 'nowrap' });
  cap.textContent = 'Ordinary slides in, extraordinary pitch out.';
  const bar = el('div', 'abs', video, { left: '0', right: '0', bottom: '0', height: '62px', background: 'linear-gradient(180deg, transparent, rgba(0,0,0,.55))' });
  el('div', 'abs', bar, { left: '28px', top: '20px', width: 0, height: 0, borderTop: '11px solid transparent', borderBottom: '11px solid transparent', borderLeft: '18px solid #fff' });
  const track = el('div', 'abs', bar, { left: '66px', right: '120px', top: '29px', height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,.25)' });
  const fill = el('div', 'abs', track, { left: 0, top: 0, bottom: 0, width: '0%', borderRadius: '3px', background: '#FF6B4A', boxShadow: '0 0 10px #FF6B4A' });
  const tc = el('div', 'abs', bar, { right: '24px', top: '22px', font: '600 18px/1 ui-monospace, Menlo, monospace', color: 'rgba(255,255,255,.85)' });

  const R = ctx.rand(29);
  const sparks = Array.from({ length: 14 }, () => {
    const s = el('div', 'abs', cam, { left: '957px', top: SEAM_TOP + 60 + R() * (SEAM_H - 120) + 'px', width: '6px', height: '6px', borderRadius: '50%', background: '#ffb199', boxShadow: '0 0 12px #FF6B4A', opacity: 0 });
    return { s, dx: 40 + R() * 160, dy: (R() - 0.5) * 120, d: R() * 0.9 };
  });

  const TAG_TOP = 680, TW = 520, TH = 170;
  const mkTag = (left, border, glow) => el('div', 'abs', cam, { left: left + 'px', top: TAG_TOP + 'px', width: TW + 'px', height: TH + 'px', borderRadius: '20px', background: 'linear-gradient(160deg, rgba(37,46,76,.95), rgba(22,28,48,.95))', border, boxShadow: glow, padding: '30px 36px', boxSizing: 'border-box' });
  const basic = mkTag(420, '2px solid rgba(255,255,255,.14)', '0 30px 60px rgba(0,0,0,.4)');
  const bl = el('div', '', basic, { font: MONO, letterSpacing: '.16em', color: 'var(--mint)' }); bl.textContent = 'BASIC';
  const bm = el('div', '', basic, { font: '800 44px/1 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff', marginTop: '18px' }); bm.textContent = 'No subscription';
  const bs = el('div', '', basic, { font: '500 24px/1 Inter', color: 'var(--slate)', marginTop: '12px' }); bs.textContent = 'needed';
  const pro = mkTag(980, '2px solid #4C7DFF', '0 0 50px rgba(76,125,255,.45), 0 30px 60px rgba(0,0,0,.4)');
  const pl = el('div', '', pro, { font: MONO, letterSpacing: '.16em', color: '#8fb0ff' }); pl.textContent = 'PRO';
  const pm = el('div', '', pro, { font: '800 44px/1 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff', marginTop: '18px', whiteSpace: 'nowrap' });
  pm.innerHTML = '<span style="font-weight:500;font-size:28px;color:#8A93A8;letter-spacing:0">from </span>A$29<span style="font-weight:500;font-size:28px;color:#8A93A8;letter-spacing:0"> a month</span>';
  const ps = el('div', '', pro, { font: '600 24px/1 Inter', color: '#8fb0ff', marginTop: '12px' }); ps.textContent = 'A.I. directs your pitch';

  const url = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '560px', textAlign: 'center', font: '800 110px/1.1 Inter Display, Inter', letterSpacing: '-.045em', whiteSpace: 'nowrap', transformOrigin: '50% 50%' });
  const urlTxt = el('span', '', url, { background: 'linear-gradient(100deg, #ffffff 0%, #b9ccff 55%, #4C7DFF 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' });
  urlTxt.textContent = 'powerpoint2vid.com';
  const under = el('div', 'abs', cam, { left: '460px', width: '1000px', top: '706px', height: '6px', borderRadius: '3px', background: 'linear-gradient(90deg, #FF6B4A, #4C7DFF)', boxShadow: '0 0 30px rgba(76,125,255,.7)', transformOrigin: '0% 50%' });
  const urlGlow = el('div', 'abs', cam, { left: '360px', width: '1200px', top: '520px', height: '260px', background: 'radial-gradient(50% 50% at 50% 50%, rgba(76,125,255,.35), transparent 70%)', opacity: 0 });
  cam.insertBefore(urlGlow, url);

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  const st = { x: -720, seam: 960 };
  const cl = (v) => Math.max(0, Math.min(W, v));
  ctx.onFrame((t) => {
    card.style.left = st.x + 'px';
    plain.style.clipPath = `inset(0px ${cl(st.x + W - st.seam)}px 0px 0px)`;
    video.style.clipPath = `inset(0px 0px 0px ${cl(st.seam - st.x)}px round 14px)`;
    const p = Math.max(0, Math.min(1, (t - 2.2) / 12.5));
    fill.style.width = (p * 100).toFixed(2) + '%';
    const s = Math.floor(p * 62);
    tc.textContent = '0:' + String(s).padStart(2, '0') + ' / 1:02';
  });

  gsap.set(words, { opacity: 0, y: 26 });
  gsap.set([basic, pro], { opacity: 0, scale: 0.6, y: 30 });
  gsap.set([pm, ps], { opacity: 0 });
  gsap.set([url, urlGlow], { opacity: 0 });
  gsap.set(under, { scaleX: 0 });
  gsap.set(card, { filter: 'blur(0px) brightness(1)' });

  tl.to(cam, { scale: 1.03, duration: ctx.dur, ease: 'none' }, 0);
  tl.from([seamLine, seamGlow], { scaleY: 0.2, opacity: 0, duration: 0.5, ease: 'power2.out' }, 0);

  tl.to(words.slice(0, 3), { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'back.out(1.6)' }, tOrd - 0.1);
  tl.to(words.slice(3), { opacity: 1, y: 0, duration: 0.5, stagger: 0.14, ease: 'back.out(1.6)' }, tExtra - 0.1);

  tl.to(st, { x: 160, duration: 1.0, ease: 'power3.out' }, 0.15);
  tl.to(st, { x: 1080, duration: 1.3, ease: 'power2.inOut' }, tExtra - 0.15);
  tl.to(seamLine, { scaleX: 2.2, boxShadow: '0 0 50px #FF6B4A, 0 0 140px rgba(255,107,74,.9)', duration: 0.4, yoyo: true, repeat: 1 }, tExtra + 0.25);
  tl.to(glowBg, { opacity: 1.6, duration: 0.4, yoyo: true, repeat: 1 }, tExtra + 0.25);
  sparks.forEach((p) => {
    const t0 = tExtra + 0.2 + p.d;
    tl.fromTo(p.s, { opacity: 1, x: 0, y: 0, scale: 1 }, { opacity: 0, x: p.dx, y: p.dy, scale: 0.3, duration: 0.6, ease: 'power2.out', immediateRender: false }, t0);
  });

  // settle: retire seam clipping BEFORE the card moves back left, so the plain slide never reappears
  tl.to([seamLine, seamGlow], { opacity: 0, scaleY: 0.4, duration: 0.5, ease: 'power2.in' }, tOut + 0.35);
  tl.set(st, { seam: -200 }, tOut + 0.38);
  tl.to(st, { x: 640, duration: 0.9, ease: 'expo.inOut' }, tOut + 0.4);

  tl.to(basic, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.8)' }, tBasic - 0.1);
  tl.to(pro, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.8)' }, tPro - 0.1);
  tl.fromTo(pm, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.45, immediateRender: false }, tPrice - 0.05);
  tl.fromTo(ps, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.45, immediateRender: false }, tAI - 0.1);
  tl.to(pro, { boxShadow: '0 0 90px rgba(76,125,255,.8), 0 30px 60px rgba(0,0,0,.4)', duration: 0.4, yoyo: true, repeat: 1 }, tAI);

  tl.to(card, { opacity: 0, scale: 0.86, y: -40, filter: 'blur(8px) brightness(.6)', duration: 0.6, ease: 'power2.in' }, tVisit - 0.3);
  tl.to([basic, pro], { y: -390, duration: 0.8, ease: 'expo.inOut' }, tVisit - 0.15);
  tl.fromTo(url, { opacity: 0, scale: 1.5, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power4.out', immediateRender: false }, tURL - 0.2);
  tl.to(urlGlow, { opacity: 1, duration: 0.6 }, tURL);
  tl.to(under, { scaleX: 1, duration: 0.9, ease: 'expo.out' }, tURL + 0.3);
  tl.to(url, { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, tCom);
  tl.to(urlGlow, { opacity: 0.7, duration: 1.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tCom + 0.4);
});
