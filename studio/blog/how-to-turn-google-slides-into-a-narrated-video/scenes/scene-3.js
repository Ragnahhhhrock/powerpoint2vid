/* Scene 3: 'In Google Slides, download your deck as a PowerPoint file. Upload it, choose a voice and speed that sounds
 * natural, and keep captions on for every student.'
 * Storyboard: ink stage with a three-step horizontal track. Step 1 on 'download': File > Download > PowerPoint (.pptx)
 * menu path animates and a .pptx file drops. Step 2 on 'choose a voice and speed': the file slides right into a voice
 * picker, speed slider settles mid-track in signal blue. Step 3 on 'captions on': CC toggle flips mint, caption bars
 * appear under a video frame. Footnote chip: swap embedded videos for a still image. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, d) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : d; };
  const T = { dl: A(0, 'download', 1.79), ppt: A(0, 'PowerPoint', 2.9), file: A(0, 'file', 3.4), up: A(1, 'Upload', 4.16), choose: A(1, 'choose', 4.96), voice: A(1, 'voice', 5.39), speed: A(1, 'speed', 5.83), cap: A(1, 'captions', 7.81), on: A(1, 'on', 8.3) };
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';
  const SIGNAL = '#3D7BFF', MINT = '#3CCB9A', CORAL = '#FF6B57';

  stage.style.background = 'radial-gradient(60% 55% at 50% 45%, #26304a 0%, var(--ink) 60%, var(--night) 100%)';
  const glow = el('div', 'abs', stage, { left: '500px', top: '200px', width: '900px', height: '700px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(61,123,255,.18), transparent)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  /* title */
  const title = el('div', 'abs', cam, { left: '160px', top: '120px', width: '1600px', font: '800 64px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff' });
  const tWords = ctx.split(title, 'Download as .pptx, then choose a voice', 'word');

  /* track */
  const XS = [160, 720, 1280], CW = 480, CT = 300, CH = 500;
  const line = el('div', 'abs', cam, { left: '400px', top: '268px', width: '1120px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.1)' });
  const fill = el('div', 'abs', line, { left: 0, top: 0, width: '100%', height: '100%', borderRadius: '2px', background: SIGNAL, transformOrigin: '0% 50%', boxShadow: '0 0 16px rgba(61,123,255,.8)' });
  const nodes = XS.map((x) => el('div', 'abs', cam, { left: x + CW / 2 - 10 + 'px', top: '260px', width: '20px', height: '20px', borderRadius: '50%', background: '#3a4256', boxShadow: '0 0 0 6px rgba(27,34,51,1)' }));
  const LABELS = ['01 · DOWNLOAD', '02 · VOICE & SPEED', '03 · CAPTIONS'];
  const cards = XS.map((x, i) => {
    const c = el('div', 'abs', cam, { left: x + 'px', top: CT + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '24px', background: 'linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))', border: '2px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 90px rgba(0,0,0,.35)' });
    const lab = el('div', 'abs', c, { left: '32px', top: '32px', font: MONO, letterSpacing: '.12em', color: 'var(--slate)' }); lab.textContent = LABELS[i];
    return c;
  });
  gsap.set(cards, { borderColor: 'rgba(255,255,255,0.1)' });

  /* step 1: menu path */
  const c1 = cards[0];
  const fileBtn = el('div', 'abs', c1, { left: '32px', top: '84px', padding: '10px 22px', borderRadius: '10px', font: '700 26px/1 Inter', color: '#fff', background: 'rgba(255,255,255,0.08)' }); fileBtn.textContent = 'File';
  gsap.set(fileBtn, { backgroundColor: 'rgba(255,255,255,0.08)' });
  const menu = el('div', 'abs', c1, { left: '32px', top: '148px', width: '416px', padding: '10px', borderRadius: '14px', background: 'var(--paper)', boxShadow: '0 20px 50px rgba(0,0,0,.4)' });
  const row1 = el('div', '', menu, { display: 'flex', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '8px', font: '600 26px/1 Inter', color: 'var(--ink)', background: 'rgba(61,123,255,0)' });
  row1.innerHTML = '<span>Download</span><span>›</span>';
  const row2 = el('div', '', menu, { marginTop: '6px', marginLeft: '28px', padding: '14px 16px', borderRadius: '8px', font: '700 26px/1 Inter', color: 'var(--ink)', background: 'rgba(61,123,255,0)' });
  row2.textContent = 'PowerPoint (.pptx)';
  gsap.set([row1, row2], { backgroundColor: 'rgba(61,123,255,0)' });
  gsap.set(menu, { clipPath: 'inset(0% 0% 100% 0%)' });
  gsap.set(row2, { opacity: 0, x: -20 });

  /* the .pptx file (in cam so it can travel) */
  const FX = 345, FY = 630;
  const file = el('div', 'abs', cam, { left: FX + 'px', top: FY + 'px', width: '110px', height: '140px', borderRadius: '10px 26px 10px 10px', background: 'var(--paper)', boxShadow: '0 24px 50px rgba(0,0,0,.45)', overflow: 'hidden', transformOrigin: '0% 0%' });
  const fP = el('div', 'abs', file, { left: 0, right: 0, top: '22px', textAlign: 'center', font: '900 52px/1 Inter Display, Inter', color: CORAL }); fP.textContent = 'P';
  const fBand = el('div', 'abs', file, { left: 0, right: 0, bottom: 0, height: '40px', background: CORAL, textAlign: 'center', font: '800 20px/40px Inter', color: '#fff', letterSpacing: '.04em' }); fBand.textContent = '.PPTX';
  gsap.set(file, { opacity: 0, y: -90 });

  /* step 2: voice picker + speed */
  const c2 = cards[1];
  const vRows = [0, 1, 2].map((k) => {
    const r = el('div', 'abs', c2, { left: '32px', top: 96 + k * 76 + 'px', width: '416px', height: '64px', borderRadius: '14px', border: '2px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', gap: '4px', padding: '0 18px', boxSizing: 'border-box' });
    el('div', '', r, { width: '34px', height: '34px', borderRadius: '50%', marginRight: '14px', flex: 'none', background: k === 1 ? 'linear-gradient(135deg,#7fa6ff,#3D7BFF)' : 'linear-gradient(135deg,#5b6378,#3a4256)' });
    const bars = [];
    for (let i = 0; i < 26; i++) bars.push(el('div', '', r, { width: '6px', borderRadius: '3px', flex: 'none', height: 8 + Math.round(Math.abs(Math.sin(i * 1.7 + k * 2.3)) * 28) + 'px', background: 'rgba(255,255,255,.35)' }));
    return { r, bars };
  });
  gsap.set(vRows.map((v) => v.r), { borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.03)' });
  const spLab = el('div', 'abs', c2, { left: '32px', top: '346px', font: MONO, letterSpacing: '.12em', color: 'var(--slate)' }); spLab.textContent = 'SPEED';
  const trk = el('div', 'abs', c2, { left: '40px', top: '396px', width: '400px', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,.12)' });
  const trkFill = el('div', 'abs', trk, { left: 0, top: 0, width: '100%', height: '100%', borderRadius: '4px', background: SIGNAL, transformOrigin: '0% 50%' });
  const knob = el('div', 'abs', c2, { left: '24px', top: '384px', width: '32px', height: '32px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 0 6px rgba(61,123,255,.35), 0 6px 16px rgba(0,0,0,.4)' });
  const slow = el('div', 'abs', c2, { left: '40px', top: '434px', font: '600 16px/1 ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: 'var(--slate)' }); slow.textContent = 'SLOW';
  const fast = el('div', 'abs', c2, { right: '40px', top: '434px', font: '600 16px/1 ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: 'var(--slate)' }); fast.textContent = 'FAST';
  gsap.set(trkFill, { scaleX: 0 });

  /* step 3: video frame + CC toggle */
  const c3 = cards[2];
  const vid = el('div', 'abs', c3, { left: '40px', top: '86px', width: '400px', height: '225px', borderRadius: '14px', background: 'linear-gradient(160deg,#1f2a44,var(--night))', border: '1px solid rgba(255,255,255,.1)', overflow: 'hidden' });
  const play = el('div', 'abs', vid, { left: '182px', top: '62px', width: 0, height: 0, borderTop: '22px solid transparent', borderBottom: '22px solid transparent', borderLeft: '36px solid rgba(255,255,255,.5)' });
  const capBars = [[300, 160], [210, 188]].map(([w, top]) => el('div', 'abs', vid, { left: (400 - w) / 2 + 'px', top: top + 'px', width: w + 'px', height: '16px', borderRadius: '4px', background: 'rgba(247,244,238,.92)', boxShadow: '0 0 0 4px rgba(0,0,0,.55)' }));
  gsap.set(capBars, { clipPath: 'inset(0% 100% 0% 0%)' });
  const cc = el('div', 'abs', c3, { left: '40px', top: '366px', padding: '8px 12px', borderRadius: '8px', border: '2px solid rgba(255,255,255,.5)', font: '800 24px/1 Inter', color: '#fff' }); cc.textContent = 'CC';
  const tog = el('div', 'abs', c3, { left: '132px', top: '362px', width: '96px', height: '48px', borderRadius: '24px', background: '#3a4256' });
  gsap.set(tog, { backgroundColor: '#3a4256', boxShadow: '0 0 0px rgba(60,203,154,0)' });
  const togK = el('div', 'abs', tog, { left: '4px', top: '4px', width: '40px', height: '40px', borderRadius: '50%', background: '#fff', boxShadow: '0 4px 10px rgba(0,0,0,.35)' });
  const capOn = el('div', 'abs', c3, { left: '252px', top: '378px', font: MONO, letterSpacing: '.12em', color: MINT }); capOn.textContent = 'ON';
  gsap.set(capOn, { opacity: 0 });

  /* footnote chip */
  const chip = el('div', 'abs', cam, { left: '160px', top: '870px', display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 22px 12px 12px', borderRadius: '30px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)' });
  const chipT = el('div', '', chip, { padding: '6px 12px', borderRadius: '18px', background: CORAL, font: '700 16px/1 ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: '#fff' }); chipT.textContent = 'TIP';
  const chipX = el('div', '', chip, { font: '500 24px/1 Inter', color: 'rgba(255,255,255,.85)' }); chipX.textContent = 'Swap embedded videos for a still image';
  gsap.set(chip, { opacity: 0, y: 20 });

  ctx.fx.vignette({ strength: 0.45 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    const on = t > T.voice;
    vRows[1].bars.forEach((b, i) => { b.style.transform = on ? 'scaleY(' + (0.45 + 0.55 * Math.abs(Math.sin(t * 5 + i * 0.8))).toFixed(3) + ')' : 'scaleY(1)'; b.style.background = on ? SIGNAL : 'rgba(255,255,255,.35)'; });
  });

  /* ---- timeline ---- */
  tl.fromTo(cam, { scale: 1, x: 0 }, { scale: 1.035, x: -12, duration: ctx.dur, ease: 'none' }, 0);
  tl.to(glow, { x: 220, y: 40, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.from(tWords, { yPercent: 60, opacity: 0, duration: 0.55, stagger: 0.05, ease: 'back.out(1.6)' }, 0.05);
  tl.from(cards, { y: 40, duration: 0.9, stagger: 0.08 }, 0);
  gsap.set(fill, { scaleX: 0 });

  // step 1
  const act = (i, t) => {
    tl.to(cards[i], { borderColor: 'rgba(61,123,255,0.7)', duration: 0.4 }, t);
    tl.to(nodes[i], { backgroundColor: SIGNAL, scale: 1.3, duration: 0.4, ease: 'back.out(2)' }, t);
    if (i > 0) tl.to(cards[i - 1], { borderColor: 'rgba(255,255,255,0.1)', duration: 0.4 }, t);
  };
  act(0, T.dl - 0.3);
  tl.to(fill, { scaleX: 0.04, duration: 0.5 }, T.dl - 0.3);
  tl.to(fileBtn, { backgroundColor: 'rgba(61,123,255,0.9)', duration: 0.25 }, T.dl - 0.3);
  tl.to(menu, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.45 }, T.dl - 0.1);
  tl.to(row1, { backgroundColor: 'rgba(61,123,255,0.15)', duration: 0.25 }, T.dl + 0.3);
  tl.to(row2, { opacity: 1, x: 0, duration: 0.4, ease: 'back.out(1.6)' }, T.ppt - 0.25);
  tl.to(row2, { backgroundColor: 'rgba(61,123,255,1)', color: '#ffffff', duration: 0.25 }, T.ppt + 0.1);
  tl.to(file, { opacity: 1, y: 0, duration: 0.7, ease: 'bounce.out' }, T.file - 0.35);
  tl.to(chip, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' }, T.file + 0.2);

  // step 2
  act(1, T.up);
  tl.to(fill, { scaleX: 0.5, duration: 0.9, ease: 'expo.inOut' }, T.up);
  tl.to(file, { x: 1090 - FX, y: 320 - FY, scale: 0.45, rotation: 6, duration: 0.9, ease: 'expo.inOut' }, T.up);
  tl.to([menu, fileBtn], { opacity: 0.45, duration: 0.5 }, T.up + 0.2);
  tl.to(vRows[1].r, { borderColor: 'rgba(61,123,255,1)', backgroundColor: 'rgba(61,123,255,0.15)', scale: 1.03, duration: 0.45, ease: 'back.out(2)' }, T.voice - 0.1);
  tl.to(knob, { x: 184, duration: 0.9, ease: 'back.out(1.4)' }, T.speed - 0.1);
  tl.to(trkFill, { scaleX: 0.5, duration: 0.9, ease: 'back.out(1.4)' }, T.speed - 0.1);

  // step 3
  act(2, T.cap - 0.3);
  tl.to(fill, { scaleX: 1, duration: 0.8, ease: 'expo.inOut' }, T.cap - 0.3);
  tl.to(togK, { x: 48, duration: 0.35, ease: 'back.out(2)' }, T.on - 0.15);
  tl.to(tog, { backgroundColor: MINT, boxShadow: '0 0 30px rgba(60,203,154,.7)', duration: 0.3 }, T.on - 0.15);
  tl.to(cc, { borderColor: MINT, color: MINT, duration: 0.3 }, T.on - 0.15);
  tl.to(capOn, { opacity: 1, duration: 0.3 }, T.on);
  tl.to(capBars, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, stagger: 0.12, ease: 'power2.out' }, T.on);
  tl.to(cards[2], { boxShadow: '0 40px 90px rgba(0,0,0,.35), 0 0 60px rgba(60,203,154,.25)', duration: 0.6 }, T.on);
});
