/* Scene 6 (final): "With PowerPoint2Vid, your speaker notes become the narration. On Pro, a.i. turns
 * uncluttered slides into calm animated scenes. Try Basic first at powerpoint2vid.com."
 * Storyboard: Bright paper stage. On "speaker notes" the words in a notes panel rise off the page and
 * become a flowing calm-blue waveform labelled NARRATION. On "Pro" the stage snaps clear, and a clean
 * slide unfolds into a living scene with a soft blue glow and a small PRO tag. On "Try Basic first"
 * everything snaps away to wide white space. "powerpoint2vid.com" sits at 120px in ink while a coral
 * underline draws beneath it, then a long, calm hold with a slow push-in. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return Number.isFinite(v) ? v : f; };
  const tSpeaker = A(0, 'speaker', 1.5), tNarr = A(0, 'narration', 3.2);
  const tPro = A(1, 'Pro', 4.5), tUnc = A(1, 'uncluttered', 5.6), tCalm = A(1, 'calm', 6.8), tAnim = A(1, 'animated', 7.2);
  const tTry = A(2, 'Try', 8.65), tUrl = A(2, 'powerpoint2vid', 9.7);
  const MONO = '600 22px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(70% 70% at 50% 40%, #ffffff 0%, var(--paper) 60%, #ece9e1 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 520px' });

  /* ---------- Part 1: notes → narration ---------- */
  const part1 = el('div', 'abs', cam, { inset: 0 });
  const panel = el('div', 'abs', part1, { left: '160px', top: '330px', width: '680px', height: '400px', borderRadius: '22px', background: '#fff',
    boxShadow: '0 40px 90px rgba(26,29,35,.12), 0 2px 0 rgba(26,29,35,.04)', border: '1px solid var(--mist)' });
  const pLab = el('div', 'abs', panel, { left: '48px', top: '44px', font: MONO, letterSpacing: '.14em', color: 'var(--slate)' });
  pLab.textContent = 'SPEAKER NOTES';
  const pRule = el('div', 'abs', panel, { left: '48px', right: '48px', top: '88px', height: '2px', background: 'var(--mist)' });
  const notesBox = el('div', 'abs', panel, { left: '48px', top: '124px', width: '584px', font: '500 34px/1.55 Inter', color: 'var(--ink)', letterSpacing: '-.01em' });
  const words = ctx.split(notesBox, 'We simplified sign-up, and new customers doubled. Keep the slide to one point.', 'word');

  const waveWrap = el('div', 'abs', part1, { left: '960px', top: '380px', width: '800px', height: '300px' });
  const cv = el('canvas', 'abs', waveWrap, { left: 0, top: 0, width: '800px', height: '300px' });
  cv.width = 800; cv.height = 300;
  const g = cv.getContext('2d');
  const wLab = el('div', 'abs', part1, { left: '964px', top: '320px', font: MONO, letterSpacing: '.14em', color: 'var(--calm)' });
  wLab.textContent = 'NARRATION';
  const dot = el('div', 'abs', part1, { left: '940px', top: '318px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--signal)' });
  const wave = { p: 0, a: 0 };

  ctx.onFrame((t) => {
    g.clearRect(0, 0, 800, 300);
    if (wave.p <= 0.001 || wave.a <= 0.001) return;
    const N = 56, step = 800 / N;
    for (let i = 0; i < N; i++) {
      const f = i / N;
      if (f >= wave.p) break;
      const edge = Math.min(1, (wave.p - f) * 8);
      const env = Math.sin(Math.PI * (i + 0.5) / N) * 0.6 + 0.4;
      const amp = wave.a * edge * env * (0.18 + 0.82 * Math.abs(Math.sin(i * 0.37 + t * 3.1) * Math.sin(i * 0.13 - t * 1.6 + 1)));
      const h = Math.max(6, amp * 260);
      g.fillStyle = `rgba(59,110,245,${(0.55 + 0.45 * env) * Math.min(1, wave.a * 3)})`;
      const x = i * step + 2, w = step - 5, y = 150 - h / 2, r = w / 2;
      g.beginPath();
      g.moveTo(x + r, y); g.lineTo(x + w - r, y); g.arcTo(x + w, y, x + w, y + r, r);
      g.lineTo(x + w, y + h - r); g.arcTo(x + w, y + h, x + w - r, y + h, r);
      g.lineTo(x + r, y + h); g.arcTo(x, y + h, x, y + h - r, r);
      g.lineTo(x, y + r); g.arcTo(x, y, x + r, y, r); g.closePath(); g.fill();
    }
  });

  /* ---------- Part 2: clean slide → animated scene ---------- */
  const part2 = el('div', 'abs', cam, { inset: 0, perspective: '1800px' });
  const glow = el('div', 'abs', part2, { left: '360px', top: '160px', width: '1200px', height: '760px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(59,110,245,.32), rgba(59,110,245,0) 100%)', filter: 'blur(20px)' });
  const card = el('div', 'abs', part2, { left: '480px', top: '250px', width: '960px', height: '540px', borderRadius: '20px', overflow: 'hidden',
    background: 'radial-gradient(80% 90% at 70% 30%, #1f2a4a 0%, var(--night) 75%)', transformOrigin: '50% 100%',
    boxShadow: '0 50px 110px rgba(26,29,35,.22), 0 0 0 1px rgba(26,29,35,.06)' });
  const face = el('div', 'abs', card, { inset: 0, background: '#fff' });
  const fTitle = el('div', 'abs', face, { left: '70px', top: '80px', width: '420px', height: '34px', borderRadius: '8px', background: 'var(--ink)' });
  const fSub = el('div', 'abs', face, { left: '70px', top: '138px', width: '260px', height: '16px', borderRadius: '8px', background: 'var(--mist)' });
  const fChart = [180, 260, 340].map((h, i) => el('div', 'abs', face, { left: 560 + i * 110 + 'px', top: 460 - h + 'px', width: '80px', height: h + 'px', borderRadius: '8px 8px 3px 3px', background: 'var(--mist)' }));
  const sTitle = el('div', 'abs', card, { left: '70px', top: '80px', width: '420px', height: '34px', borderRadius: '8px', background: '#fff' });
  const sSub = el('div', 'abs', card, { left: '70px', top: '138px', width: '260px', height: '16px', borderRadius: '8px', background: 'rgba(255,255,255,.35)' });
  const sCols = [180, 260, 340].map((h, i) => el('div', 'abs', card, { left: 560 + i * 110 + 'px', top: 460 - h + 'px', width: '80px', height: h + 'px', borderRadius: '8px 8px 3px 3px', transformOrigin: '50% 100%',
    background: 'linear-gradient(180deg, #8fb0ff, var(--calm))', boxShadow: '0 0 40px rgba(59,110,245,.55)' }));
  const orb = el('div', 'abs', card, { left: '120px', top: '260px', width: '200px', height: '200px', borderRadius: '50%',
    background: 'radial-gradient(circle at 35% 35%, #b9ccff, var(--calm) 60%, rgba(59,110,245,0) 72%)', filter: 'blur(2px)' });
  const floorLine = el('div', 'abs', card, { left: '70px', right: '70px', top: '462px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent)' });
  const pro = el('div', 'abs', part2, { left: '1316px', top: '208px', padding: '12px 22px', borderRadius: '999px', background: 'var(--calm)', color: '#fff',
    font: '700 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', boxShadow: '0 12px 30px rgba(59,110,245,.4)' });
  pro.textContent = 'PRO';

  /* ---------- Part 3: CTA ---------- */
  const part3 = el('div', 'abs', cam, { inset: 0 });
  const kicker = el('div', 'abs', part3, { left: 0, width: '1920px', top: '378px', textAlign: 'center', font: '600 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.22em', color: 'var(--slate)' });
  kicker.textContent = 'TRY BASIC FIRST';
  const url = el('div', 'abs', part3, { left: 0, width: '1920px', top: '440px', textAlign: 'center', font: '800 120px/1.1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  url.textContent = 'powerpoint2vid.com';
  const ul = el('div', 'abs', part3, { left: '460px', top: '600px', width: '1000px', height: '60px' });
  ul.innerHTML = '<svg width="1000" height="60"><path d="M20 34 C 260 18, 560 14, 980 26" fill="none" stroke="#FF5A3C" stroke-width="12" stroke-linecap="round" stroke-dasharray="1000" stroke-dashoffset="1000"/></svg>';
  const ulPath = ul.querySelector('path');

  ctx.fx.vignette({ strength: 0.18 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---------- timeline ---------- */
  gsap.set([wLab, dot, part2, pro, kicker, url], { opacity: 0 });
  gsap.set(card, { rotationX: -88, filter: 'brightness(1) blur(0px)' });
  gsap.set(glow, { opacity: 0, scale: 0.7 });
  gsap.set(sCols, { scaleY: 0 });
  gsap.set(orb, { scale: 0.3, opacity: 0 });

  tl.to(cam, { scale: 1.025, duration: tTry, ease: 'none' }, 0);

  tl.from(panel, { y: 40, opacity: 0, duration: 0.9 }, 0.05);
  tl.from(words, { opacity: 0, y: 12, duration: 0.6, stagger: 0.025 }, 0.2);
  tl.to(panel, { boxShadow: '0 40px 90px rgba(26,29,35,.12), 0 0 0 4px rgba(59,110,245,.25)', duration: 0.5 }, tSpeaker - 0.2);

  words.forEach((w, i) => {
    tl.to(w, { y: -70 - (i % 3) * 20, x: 120 + i * 6, opacity: 0, color: '#3B6EF5', duration: 0.9, ease: 'power2.in' }, tSpeaker + 0.1 + i * 0.05);
  });
  tl.to(pLab, { color: '#3B6EF5', duration: 0.4 }, tSpeaker);
  tl.to(wave, { p: 1, duration: 1.8, ease: 'power2.out' }, tSpeaker + 0.4);
  tl.to(wave, { a: 1, duration: 1.2, ease: 'power2.out' }, tSpeaker + 0.4);
  tl.to([wLab, dot], { opacity: 1, duration: 0.5 }, tNarr - 0.3);
  tl.fromTo(dot, { scale: 0.4 }, { scale: 1, duration: 0.6, ease: 'back.out(2)', immediateRender: false }, tNarr - 0.3);
  tl.to(pRule, { background: '#3B6EF5', duration: 0.4 }, tNarr - 0.3);

  tl.to(part1, { opacity: 0, scale: 0.94, duration: 0.22, ease: 'power3.in' }, tPro - 0.25);
  tl.set(part2, { opacity: 1 }, tPro - 0.05);
  tl.to(card, { rotationX: 0, duration: 1.1, ease: 'expo.out' }, tPro - 0.05);
  tl.fromTo(pro, { opacity: 0, scale: 0.5, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(2)', immediateRender: false }, tPro + 0.35);

  tl.to(face, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, tUnc);
  tl.to(glow, { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' }, tUnc);
  tl.to(card, { boxShadow: '0 50px 110px rgba(26,29,35,.22), 0 0 90px rgba(59,110,245,.45)', duration: 1.2 }, tCalm - 0.3);
  tl.to(orb, { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.4)' }, tUnc + 0.3);
  tl.to(orb, { x: 160, y: -60, duration: tTry - tUnc, ease: 'sine.inOut' }, tUnc + 0.3);
  tl.to(sCols, { scaleY: 1, duration: 0.9, ease: 'back.out(1.5)', stagger: 0.12 }, tAnim - 0.4);
  tl.from([sTitle, sSub], { x: -40, opacity: 0, duration: 0.8, stagger: 0.1 }, tUnc + 0.2);
  tl.from(floorLine, { scaleX: 0, duration: 1 }, tUnc + 0.2);

  tl.to(part2, { opacity: 0, scale: 0.95, duration: 0.22, ease: 'power3.in' }, tTry - 0.15);
  tl.set(cam, { scale: 1 }, tTry + 0.08);
  tl.fromTo(kicker, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, immediateRender: false }, tTry + 0.1);
  tl.fromTo(url, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', immediateRender: false }, Math.min(tTry + 0.35, tUrl - 0.3));
  tl.to(ulPath, { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' }, tUrl + 0.2);
  tl.to(cam, { scale: 1.04, duration: Math.max(1, ctx.dur - tTry - 0.1), ease: 'power1.inOut' }, tTry + 0.1);
});
