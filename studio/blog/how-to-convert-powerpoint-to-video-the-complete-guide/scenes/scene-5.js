/* Scene 5 — "Upload your deck and pick a voice. Try it on Basic first. On Pro, A.I. directs your video
 * with animated scenes and a tighter story. Visit powerpoint2vid.com."
 * Storyboard: the slide title builds word by word and stays on top. On "Upload" the real slide (slide-6)
 * drifts off a deck stack into a glowing drop zone while a progress bar fills. On "voice" a voice card
 * pops with a live waveform. On "Basic" a Basic card springs in with a slide preview. On "Pro" a glowing
 * Pro card takes focus: an "AI-DIRECTED" chip lands on "A.I.", mini columns rise on "animated scenes",
 * and a scene strip snaps tight on "tighter". On "Visit" everything recedes and powerpoint2vid.com
 * builds letter by letter, then holds with an underline glow to the end. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const tUpload = A(0, 'Upload', 0.55), tVoice = A(0, 'voice.', 1.84);
  const tBasic = A(1, 'Basic', 3.07), tPro = A(2, 'Pro,', 4.8), tAI = A(2, 'A.I.', 5.28);
  const tAnim = A(2, 'animated', 6.66), tTight = A(2, 'tighter', 7.88);
  const tVisit = A(3, 'Visit', 9.26), tPP = A(3, 'PowerPoint', 9.64), tCom = A(3, 'com.', 10.95);
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 50% 45%, #161b46 0%, var(--night) 75%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 35% at 70% 60%, rgba(109,74,255,.22), transparent 70%)', opacity: 0.5 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  /* title */
  const title = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '100px', textAlign: 'center', font: '800 66px/1.1 Inter Display, Inter', letterSpacing: '-.035em', color: '#fff' });
  const words = ctx.split(title, 'Ordinary slides in, extraordinary video out', 'word');
  words.forEach((w, i) => { if (i >= 3) { w.style.background = 'linear-gradient(100deg,#c9bcff,#8f75ff)'; w.style.webkitBackgroundClip = 'text'; w.style.backgroundClip = 'text'; w.style.color = 'transparent'; } });

  /* ---------- phase 1: upload + voice ---------- */
  const p1 = el('div', 'abs', cam, { inset: 0 });
  const deckImgs = ['slide-4.png', 'slide-5.png', 'slide-6.png'];
  const deck = deckImgs.map((n, i) => {
    const c = el('div', 'abs', p1, { left: 200 + i * 14 + 'px', top: 420 - i * 10 + 'px', width: '480px', height: '270px', borderRadius: '10px', overflow: 'hidden', background: '#fff',
      boxShadow: '0 30px 70px rgba(0,0,0,.5)', transform: `rotate(${(i - 2) * 3}deg)` });
    const im = el('img', 'abs', c, { inset: 0, width: '100%', height: '100%' }); im.src = ctx.asset(n);
    return c;
  });
  const front = deck[2];
  const zone = el('div', 'abs', p1, { left: '780px', top: '400px', width: '380px', height: '360px', borderRadius: '24px', border: '3px dashed rgba(170,176,212,.45)', background: 'rgba(14,19,48,.6)' });
  zone.innerHTML = `<svg class="abs" style="left:150px;top:90px" width="80" height="80" viewBox="0 0 80 80"><path d="M40 60 V18 M22 34 L40 16 L58 34" fill="none" stroke="#aab0d4" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const zl = el('div', 'abs', zone, { left: 0, right: 0, top: '200px', textAlign: 'center', font: `600 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--muted)' }); zl.textContent = 'UPLOAD .PPTX';
  const pbar = el('div', 'abs', zone, { left: '50px', right: '50px', top: '270px', height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,.08)', overflow: 'hidden' });
  const pfill = el('div', 'abs', pbar, { left: 0, top: 0, bottom: 0, width: '100%', background: 'linear-gradient(90deg,#1fbf8f,#6ef0c4)', transformOrigin: '0 50%', transform: 'scaleX(0)' });

  const voice = el('div', 'abs', p1, { left: '1260px', top: '430px', width: '460px', height: '300px', borderRadius: '24px', background: 'linear-gradient(160deg,#1b2160,#11163a)', boxShadow: '0 30px 80px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.12)' });
  const vl = el('div', 'abs', voice, { left: '36px', top: '36px', font: `600 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--violet-hi)' }); vl.textContent = 'PICK A VOICE';
  const mic = el('div', 'abs', voice, { left: '36px', top: '90px', width: '64px', height: '64px', borderRadius: '50%', background: 'var(--violet)', boxShadow: '0 0 30px rgba(109,74,255,.7)' });
  mic.innerHTML = `<svg width="64" height="64" viewBox="0 0 64 64"><rect x="26" y="16" width="12" height="22" rx="6" fill="#fff"/><path d="M20 32 a12 12 0 0 0 24 0 M32 44 V50" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>`;
  const wave = el('div', 'abs', voice, { left: '36px', right: '36px', top: '180px', height: '90px' });
  const bars = Array.from({ length: 30 }, (_, i) => el('div', 'abs', wave, { left: i * 13 + 'px', width: '7px', top: '45px', height: '4px', borderRadius: '4px', background: i % 3 ? 'var(--violet-hi)' : '#c9bcff' }));
  const wv = { a: 0.08 };
  const rnd = ctx.rand(7); const ph = bars.map(() => rnd() * 6.28);

  /* ---------- phase 2: Basic vs Pro ---------- */
  const p2 = el('div', 'abs', cam, { inset: 0 });
  const card = (left, bg) => el('div', 'abs', p2, { left: left + 'px', top: '290px', width: '560px', height: '600px', borderRadius: '28px', background: bg, boxShadow: '0 40px 90px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.12)', transformOrigin: '50% 60%' });
  const basic = card(320, 'linear-gradient(160deg,#1a1f4a,#10142f)');
  const bl = el('div', 'abs', basic, { left: '40px', top: '40px', font: `700 24px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--mint)' }); bl.textContent = 'BASIC';
  const bh = el('div', 'abs', basic, { left: '40px', top: '86px', font: '800 52px/1 Inter Display, Inter', letterSpacing: '-.035em', color: '#fff' }); bh.textContent = 'Try it first';
  const prev = el('div', 'abs', basic, { left: '40px', top: '190px', width: '480px', height: '270px', borderRadius: '12px', overflow: 'hidden', background: '#fff', boxShadow: '0 20px 40px rgba(0,0,0,.4)' });
  const pim = el('img', 'abs', prev, { inset: 0, width: '100%', height: '100%' }); pim.src = ctx.asset('slide-6.png');
  const play = el('div', 'abs', prev, { left: '200px', top: '95px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(8,11,31,.75)' });
  play.innerHTML = `<svg width="80" height="80"><path d="M32 24 L58 40 L32 56 Z" fill="#fff"/></svg>`;
  const bscrub = el('div', 'abs', basic, { left: '40px', top: '490px', width: '480px', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,.1)' });
  const bscrubF = el('div', 'abs', bscrub, { left: 0, top: 0, bottom: 0, width: '100%', borderRadius: '4px', background: 'var(--mint)', transformOrigin: '0 50%', transform: 'scaleX(0)' });

  const pro = card(1040, 'linear-gradient(160deg,#2a1f7a,#151245)');
  pro.style.boxShadow = '0 40px 90px rgba(0,0,0,.5), 0 0 80px rgba(109,74,255,.45), inset 0 1px 0 rgba(255,255,255,.2)';
  const pl = el('div', 'abs', pro, { left: '40px', top: '40px', font: `700 24px/1 ${MONO}`, letterSpacing: '.16em', color: '#c9bcff' }); pl.textContent = 'PRO';
  const chipAI = el('div', 'abs', pro, { left: '40px', top: '86px', padding: '14px 22px', borderRadius: '40px', background: 'var(--violet)', font: '800 30px/1 Inter', letterSpacing: '-.01em', color: '#fff', boxShadow: '0 0 30px rgba(143,117,255,.7)', transformOrigin: '0 50%' });
  chipAI.textContent = 'AI-directed';
  const chipWM = el('div', 'abs', pro, { left: '270px', top: '86px', padding: '14px 22px', borderRadius: '40px', border: '2px solid rgba(201,188,255,.5)', font: '700 26px/1 Inter', color: '#e6e0ff', transformOrigin: '0 50%' });
  chipWM.textContent = 'No watermark';
  const mstage = el('div', 'abs', pro, { left: '40px', top: '180px', width: '480px', height: '250px', borderRadius: '14px', overflow: 'hidden', background: 'radial-gradient(70% 70% at 50% 70%, #241a6e, #0b0d28)' });
  const mbars = [0.35, 0.55, 0.72, 1].map((v, i) => el('div', 'abs', mstage, { left: 70 + i * 92 + 'px', bottom: '30px', width: '64px', height: v * 170 + 'px', borderRadius: '8px 8px 2px 2px', transformOrigin: '50% 100%', transform: 'scaleY(0)',
    background: i === 3 ? 'linear-gradient(180deg,#ffb199,#ff6b4a)' : 'linear-gradient(180deg,#8f75ff,#5b3df0)', boxShadow: i === 3 ? '0 0 30px rgba(255,107,74,.7)' : '0 0 20px rgba(109,74,255,.4)' }));
  const strip = el('div', 'abs', pro, { left: '40px', top: '470px', width: '480px', height: '70px' });
  const blocks = Array.from({ length: 6 }, (_, i) => el('div', 'abs', strip, { left: i * 82 + 'px', top: '12px', width: '62px', height: '46px', borderRadius: '8px', background: i % 2 ? '#5b3df0' : '#8f75ff', opacity: 0.85 }));

  /* ---------- phase 3: URL ---------- */
  const p3 = el('div', 'abs', cam, { inset: 0 });
  const visit = el('div', 'abs', p3, { left: 0, right: 0, top: '430px', textAlign: 'center', font: `600 28px/1 ${MONO}`, letterSpacing: '.3em', color: 'var(--muted)' }); visit.textContent = 'VISIT';
  const url = el('div', 'abs', p3, { left: '80px', right: '80px', top: '500px', textAlign: 'center', font: '900 130px/1.05 Inter Display, Inter', letterSpacing: '-.045em', color: '#fff', whiteSpace: 'nowrap' });
  const chars = ctx.split(url, 'powerpoint2vid.com', 'char');
  chars.forEach((c, i) => { if (i >= 10 && i < 14) c.style.color = 'var(--violet-hi)'; if (i >= 14) c.style.color = 'var(--muted)'; });
  const uline = el('div', 'abs', p3, { left: '360px', width: '1200px', top: '668px', height: '8px', borderRadius: '4px', background: 'linear-gradient(90deg,#6d4aff,#ff6b4a)', boxShadow: '0 0 30px rgba(143,117,255,.8)', transformOrigin: '0 50%', transform: 'scaleX(0)' });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    bars.forEach((b, i) => {
      const h = 4 + 80 * wv.a * (0.35 + 0.65 * Math.abs(Math.sin(t * 7 + ph[i]) * Math.sin(t * 3.1 + i * 0.4)));
      b.style.height = h + 'px'; b.style.top = 45 - h / 2 + 'px';
    });
  });

  /* ---------- timeline ---------- */
  tl.to(cam, { scale: 1.04, x: -10, duration: ctx.dur, ease: 'none' }, 0);
  tl.to(glow, { opacity: 1, duration: 4, yoyo: true, repeat: 2, ease: 'sine.inOut' }, 0);
  tl.from(words, { opacity: 0, y: 40, rotationX: -60, duration: 0.6, stagger: 0.09, ease: 'back.out(1.6)' }, 0.05);

  // phase 1
  const deckIn = 0.05, deckDur = 0.4, deckStag = 0.04;
  tl.from(deck, { opacity: 0, x: -120, duration: deckDur, stagger: deckStag }, deckIn);
  const tMove = Math.max(tUpload, deckIn + 2 * deckStag + deckDur + 0.01);
  tl.from(zone, { opacity: 0, scale: 0.9, duration: 0.6, ease: 'back.out(1.6)' }, 0.25);
  tl.to(front, { x: 530, y: 30, scale: 0.42, rotation: 0, duration: 0.8, ease: 'power3.inOut' }, tMove);
  tl.to(front, { opacity: 0, scale: 0.3, duration: 0.25, ease: 'power2.in' }, tMove + 0.75);
  tl.to(zone, { borderColor: 'rgba(31,191,143,.9)', boxShadow: '0 0 60px rgba(31,191,143,.35)', duration: 0.3 }, tMove + 0.6);
  tl.to(pfill, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, tMove + 0.7);
  tl.fromTo(voice, { opacity: 0, scale: 0.8, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.8)' }, tVoice - 0.3);
  tl.to(wv, { a: 1, duration: 0.5 }, tVoice);
  tl.to(p1, { opacity: 0, y: -50, duration: 0.5, ease: 'power2.in' }, 2.4);

  // phase 2
  gsap.set([basic, pro, chipAI, chipWM], { opacity: 0 });
  gsap.set(basic, { filter: 'brightness(1)' });
  tl.fromTo(basic, { opacity: 0, scale: 0.8, y: 60 }, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.6)', immediateRender: false }, tBasic - 0.25);
  tl.to(bscrubF, { scaleX: 1, duration: 1.4, ease: 'none' }, tBasic + 0.3);
  tl.fromTo(pro, { opacity: 0, scale: 0.8, y: 60 }, { opacity: 1, scale: 1.04, y: 0, duration: 0.75, ease: 'back.out(1.6)', immediateRender: false }, tPro - 0.3);
  tl.to(basic, { opacity: 0.4, scale: 0.94, filter: 'brightness(0.8)', duration: 0.6 }, tPro);
  tl.fromTo(chipAI, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, tAI - 0.1);
  tl.fromTo(chipWM, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, immediateRender: false }, tAI + 0.35);
  tl.to(mbars, { scaleY: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.5)' }, tAnim - 0.1);
  // tighter: blocks snap into an even 66px pitch (4px gaps), centred in the 480px strip
  const PITCH = 66, OFF = (480 - (5 * PITCH + 62)) / 2;
  blocks.forEach((b, i) => tl.to(b, { x: OFF + i * PITCH - i * 82, duration: 0.6, ease: 'expo.inOut' }, tTight));
  tl.to(blocks, { background: '#8f75ff', opacity: 1, boxShadow: '0 0 18px rgba(143,117,255,.6)', duration: 0.4 }, tTight + 0.3);
  tl.to(p2, { opacity: 0, scale: 0.9, y: -30, duration: 0.55, ease: 'power2.in', transformOrigin: '960px 600px' }, tVisit - 0.35);

  // phase 3
  tl.from(visit, { opacity: 0, y: 20, letterSpacing: '.6em', duration: 0.6 }, tVisit);
  tl.from(chars, { opacity: 0, y: 70, scale: 0.6, duration: 0.5, stagger: 0.045, ease: 'back.out(1.8)' }, tPP - 0.15);
  tl.to(uline, { scaleX: 1, duration: 0.8, ease: 'expo.inOut' }, tCom - 0.2);
  tl.to(uline, { boxShadow: '0 0 60px rgba(255,107,74,.9)', duration: 0.7, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tCom + 0.7);
  tl.to(url, { scale: 1.03, duration: ctx.dur - tCom, ease: 'sine.inOut', transformOrigin: '50% 50%' }, tCom);
});
