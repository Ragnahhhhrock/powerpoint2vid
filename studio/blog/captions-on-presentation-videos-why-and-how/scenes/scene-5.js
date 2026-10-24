/* Scene 6 — "Start with Basic to caption your deck, no subscription needed. On Pro, A.I. directs, timing
 * animation and captions to your narration. Try it at powerpoint2vid.com."
 * Storyboard: the slide's title "Ordinary slides in, captioned video out" builds word by word. The deck's
 * slide drifts in as a playing video frame with a live burned-in caption that follows the narration.
 * The plan cards land on their words: BASIC on "Basic" with "No subscription needed", then PRO on "Pro"
 * with "A.I. directs". Timing / Animation / Captions chips pop on their words, and a narration waveform
 * wakes on "narration". On "PowerPoint" the URL builds letter by letter and glows. A slow camera push holds to the end. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w, fb) => { const v = ctx.at(i, w); return Number.isFinite(v) ? v : fb; };
  const tBasic = W(0, 'Basic', 1.1), tNo = W(0, 'no', 2.9);
  const tPro = W(1, 'Pro,', 4.96), tAI = W(1, 'A.I.', 5.6);
  const tTiming = W(1, 'timing', 6.76), tAnim = W(1, 'animation', 7.19), tCap = W(1, 'captions', 7.9), tNarr = W(1, 'narration.', 8.75);
  const tURL = W(2, 'PowerPoint', 10.2), tCom = W(2, 'com.', 11.54);
  const mono = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 30% 60%, #1a1f52 0%, transparent 70%), radial-gradient(50% 50% at 80% 40%, rgba(109,74,255,.22) 0%, transparent 70%), var(--night)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  const titleBox = el('div', 'abs', cam, { left: '120px', top: '84px', width: '1680px', font: '800 76px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff' });
  const l1 = el('div', '', titleBox, {}), l2 = el('div', '', titleBox, {});
  const w1 = ctx.split(l1, 'Ordinary slides in,', 'word');
  const w2 = ctx.split(l2, 'captioned video out', 'word');
  w2.forEach((w) => { w.style.background = 'linear-gradient(100deg, #c9bcff, var(--violet-hi))'; w.style.webkitBackgroundClip = 'text'; w.style.backgroundClip = 'text'; w.style.color = 'transparent'; });
  const titleWords = [...w1, ...w2];

  const persp = el('div', 'abs', cam, { left: '120px', top: '330px', width: '800px', height: '450px', perspective: '1800px' });
  const video = el('div', 'abs', persp, { inset: 0, borderRadius: '18px', overflow: 'hidden', background: '#fff', boxShadow: '0 50px 110px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.12)' });
  const img = el('img', 'abs', video, { inset: 0, width: '100%', height: '100%', objectFit: 'cover' }); img.src = ctx.asset('slide-6.png');
  el('div', 'abs', video, { left: 0, right: 0, bottom: 0, height: '160px', background: 'linear-gradient(0deg, rgba(8,11,31,.55), transparent)' });
  const capWrap = el('div', 'abs', video, { left: '40px', right: '40px', bottom: '44px', textAlign: 'center' });
  const cap = el('span', '', capWrap, { display: 'inline-block', padding: '10px 20px', borderRadius: '10px', background: 'rgba(8,11,31,.82)', font: '700 28px/1.2 Inter', color: '#fff', letterSpacing: '-.01em' });
  const prog = el('div', 'abs', video, { left: '24px', right: '24px', bottom: '18px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.3)' });
  const progFill = el('div', 'abs', prog, { left: 0, top: 0, bottom: 0, width: '0%', borderRadius: '3px', background: 'var(--coral)' });
  const ccTag = el('div', 'abs', video, { right: '24px', top: '22px', padding: '6px 10px', borderRadius: '6px', background: 'rgba(8,11,31,.85)', font: '800 18px/1 Inter', color: '#fff', letterSpacing: '.04em' }); ccTag.textContent = 'CC';
  const vLabel = el('div', 'abs', cam, { left: '124px', top: '800px', font: mono, letterSpacing: '.14em', color: 'var(--muted)' }); vLabel.textContent = 'YOUR DECK · CAPTIONED';

  const cardCss = (top, h, col) => ({ left: '1000px', top: top + 'px', width: '800px', height: h + 'px', borderRadius: '22px', background: 'linear-gradient(160deg, rgba(255,255,255,.08), rgba(255,255,255,.02))', border: '1px solid rgba(255,255,255,.12)', boxShadow: `0 30px 80px rgba(0,0,0,.45), inset 4px 0 0 ${col}`, transformOrigin: '20% 50%' });
  const basic = el('div', 'abs', cam, cardCss(330, 190, 'var(--mint)'));
  const bLab = el('div', 'abs', basic, { left: '44px', top: '36px', font: '700 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.2em', color: 'var(--mint)' }); bLab.textContent = 'BASIC';
  const bLine = el('div', 'abs', basic, { left: '44px', top: '90px', display: 'flex', alignItems: 'center', gap: '18px' });
  const bCheck = el('div', '', bLine, { width: '54px', height: '54px', borderRadius: '50%', background: 'var(--mint)', boxShadow: '0 0 30px rgba(31,191,143,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' });
  bCheck.innerHTML = '<svg width="30" height="30" viewBox="0 0 30 30"><path d="M6 16 L13 22 L24 8" fill="none" stroke="#08201a" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const bText = el('div', '', bLine, { font: '800 46px/1 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff' }); bText.textContent = 'No subscription needed';

  const pro = el('div', 'abs', cam, cardCss(550, 260, 'var(--violet-hi)'));
  const proGlow = el('div', 'abs', pro, { inset: 0, borderRadius: '22px', boxShadow: '0 0 90px rgba(109,74,255,.55)', opacity: 0 });
  const pLab = el('div', 'abs', pro, { left: '44px', top: '34px', font: '700 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.2em', color: 'var(--violet-hi)' }); pLab.textContent = 'PRO';
  const pText = el('div', 'abs', pro, { left: '44px', top: '72px', font: '800 52px/1 Inter Display, Inter', letterSpacing: '-.035em', color: '#fff' }); pText.textContent = 'A.I. directs';
  const chipRow = el('div', 'abs', pro, { left: '44px', top: '148px', display: 'flex', gap: '14px' });
  const chips = ['Timing', 'Animation', 'Captions'].map((t) => {
    const c = el('div', '', chipRow, { padding: '10px 20px', borderRadius: '999px', background: 'rgba(109,74,255,.25)', border: '1px solid rgba(143,117,255,.6)', font: '700 26px/1 Inter', color: '#e6e0ff' }); c.textContent = t; return c;
  });
  const wave = el('div', 'abs', pro, { left: '44px', right: '44px', top: '212px', height: '30px', display: 'flex', alignItems: 'center', gap: '5px' });
  const bars = Array.from({ length: 64 }, () => el('div', '', wave, { flex: '1', height: '4px', borderRadius: '2px', background: 'var(--violet-hi)' }));
  const waveState = { a: 0 };

  const urlBox = el('div', 'abs', cam, { left: '0px', width: '1920px', top: '872px', textAlign: 'center' });
  const urlPill = el('div', '', urlBox, { display: 'inline-block', padding: '16px 44px', borderRadius: '999px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', font: '900 64px/1 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff', boxShadow: '0 0 0 rgba(255,107,74,0)' });
  const urlChars = ctx.split(urlPill, 'powerpoint2vid.com', 'char');
  urlChars.slice(10, 14).forEach((c) => (c.style.color = 'var(--coral)'));

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    progFill.style.width = Math.min(100, (t / ctx.dur) * 100) + '%';
    let txt = '';
    for (const b of ctx.beats) {
      if (t >= b.t - 0.05 && t <= b.end + 0.4 && b.words) {
        const said = b.words.filter((w) => w.t <= t).map((w) => w.w);
        txt = said.slice(Math.max(0, said.length - 6)).join(' ');
      }
    }
    if (t >= tURL - 0.02) txt = 'Try it at powerpoint2vid.com';
    cap.textContent = txt;
    cap.style.opacity = txt ? 1 : 0;
    bars.forEach((b, i) => {
      const v = Math.abs(Math.sin(i * 0.55 + t * 6) * Math.sin(i * 0.17 + t * 2.3));
      b.style.height = 4 + waveState.a * 26 * v + 'px';
    });
  });

  gsap.set(titleWords, { opacity: 0, y: 40 });
  tl.to(titleWords, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.6)', stagger: 0.11 }, 0.1);

  gsap.set(video, { filter: 'brightness(1) blur(0px)' });
  tl.fromTo(video, { x: -160, opacity: 0, rotationY: 22 }, { x: 0, opacity: 1, rotationY: 8, duration: 1.1, ease: 'expo.out' }, 0.5);
  tl.to(video, { rotationY: -3, y: -8, duration: ctx.dur - 1.6, ease: 'sine.inOut' }, 1.6);
  tl.from(vLabel, { opacity: 0, x: -20, duration: 0.5 }, 0.9);
  tl.from(ccTag, { scale: 0, duration: 0.45, ease: 'back.out(2)' }, W(0, 'caption', 1.73));

  tl.fromTo(basic, { opacity: 0, x: 80, scale: 0.92 }, { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'back.out(1.5)' }, tBasic - 0.15);
  gsap.set([bCheck, bText], { opacity: 0 });
  tl.fromTo(bCheck, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.2)', immediateRender: false }, tNo - 0.1);
  tl.fromTo(bText, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.55, immediateRender: false }, tNo);

  tl.fromTo(pro, { opacity: 0, x: 80, scale: 0.92 }, { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'back.out(1.5)' }, tPro - 0.2);
  tl.to(basic, { opacity: 0.55, duration: 0.6 }, tPro);
  gsap.set(pText, { opacity: 0 });
  tl.fromTo(pText, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, ease: 'back.out(1.6)', immediateRender: false }, tAI - 0.1);
  tl.to(proGlow, { opacity: 1, duration: 0.6 }, tAI);
  [tTiming, tAnim, tCap].forEach((t, i) => {
    tl.fromTo(chips[i], { opacity: 0, scale: 0.4, y: 14 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(2)' }, t - 0.08);
  });
  gsap.set(wave, { opacity: 0.25 });
  tl.to(wave, { opacity: 1, duration: 0.4 }, tNarr - 0.2);
  tl.to(waveState, { a: 1, duration: 0.6, ease: 'power2.out' }, tNarr - 0.2);
  tl.to(waveState, { a: 0.35, duration: 1.2, ease: 'power2.inOut' }, tNarr + 1.2);

  gsap.set(urlPill, { opacity: 0, scale: 0.9 });
  tl.to(urlPill, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.6)' }, tURL - 0.3);
  tl.fromTo(urlChars, { opacity: 0, y: 30, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(2)', stagger: Math.max(0.03, Math.min(0.08, (tCom - tURL) / 18)) }, tURL - 0.1);
  tl.to(urlPill, { borderColor: 'rgba(255,107,74,.7)', boxShadow: '0 0 70px rgba(255,107,74,.45)', duration: 0.6 }, tCom);
  tl.to(urlPill, { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, tCom);
  tl.to(basic, { opacity: 0.8, duration: 0.6 }, tURL);

  tl.fromTo(cam, { scale: 1, x: 0 }, { scale: 1.04, x: -10, duration: ctx.dur, ease: 'sine.inOut', immediateRender: false }, 0);
});
