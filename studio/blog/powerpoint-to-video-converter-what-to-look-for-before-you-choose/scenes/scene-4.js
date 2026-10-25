/* Scene 4: "Look for timing that follows the speech, captions for viewers with the sound off,
 * an MP4 your platform accepts, and clear limits on price and watermarks."
 * Storyboard: a night stage with a video preview above a horizontal timeline (scene blocks + waveform).
 * On "timing / follows the speech", the waveform fills teal and the scene blocks snap into alignment
 * with its pauses. On "captions", a caption bar slides up in the preview and its words light karaoke-style
 * as they are spoken, with SRT / VTT tags. On "MP4", a file chip drops onto the end of the timeline and
 * gets a check on "accepts". On "price", a price tag swings in and a faded watermark appears. On
 * "watermarks", a signal sweep wipes it clean. Four short chips across the top light up in turn. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (w) => ctx.at(0, w);
  const tTiming = W('timing'), tFollows = W('follows'), tSpeech = W('speech'), tCap = W('captions');
  const tMP4 = W('MP4'), tAccepts = W('accepts'), tPrice = W('price'), tWater = W('watermarks');
  const MONO = 'ui-monospace, Menlo, monospace', DISP = 'Inter Display, Inter';

  stage.style.background = 'radial-gradient(60% 55% at 50% 40%, #1b2236 0%, var(--night) 75%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 30% at 50% 80%, rgba(43,181,163,.10), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  /* ---------- chips ---------- */
  const CH = ['TIMING', 'CAPTIONS', 'MP4', 'PRICE'];
  const chips = CH.map((txt, i) => {
    const c = el('div', 'abs', cam, { left: 395 + i * 290 + 'px', top: '100px', width: '260px', height: '64px', borderRadius: '32px',
      border: '2px solid rgba(154,163,181,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px',
      font: `700 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'rgba(154,163,181,.7)', background: 'rgba(26,31,46,.6)', boxShadow: '0 0 0px rgba(43,181,163,0)' });
    const dot = el('div', '', c, { width: '14px', height: '14px', borderRadius: '50%', background: 'rgba(154,163,181,.4)' });
    const lab = el('span', '', c); lab.textContent = txt;
    return { c, dot };
  });
  const lightChip = (i, t, col) => {
    tl.to(chips[i].c, { borderColor: col, color: '#ffffff', boxShadow: `0 0 34px ${col}66`, duration: 0.35 }, t);
    tl.to(chips[i].dot, { background: col, scale: 1.3, duration: 0.35, ease: 'back.out(2)' }, t);
    tl.fromTo(chips[i].c, { scale: 1 }, { scale: 1.08, duration: 0.14, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, t);
  };

  /* ---------- preview ---------- */
  const PV = { x: 560, y: 220, w: 800, h: 450 };
  const prev = el('div', 'abs', cam, { left: PV.x + 'px', top: PV.y + 'px', width: PV.w + 'px', height: PV.h + 'px', borderRadius: '16px', overflow: 'hidden',
    background: 'linear-gradient(135deg, #252c42 0%, #161b2b 100%)', boxShadow: '0 40px 100px rgba(0,0,0,.55), inset 0 0 0 2px rgba(255,255,255,.08)' });
  el('div', 'abs', prev, { left: '60px', top: '60px', width: '360px', height: '34px', borderRadius: '8px', background: 'rgba(246,243,236,.85)' });
  el('div', 'abs', prev, { left: '60px', top: '112px', width: '240px', height: '18px', borderRadius: '6px', background: 'rgba(154,163,181,.5)' });
  [0, 1, 2].forEach((i) => el('div', 'abs', prev, { left: 60 + i * 120 + 'px', bottom: '130px', width: '80px', height: 80 + i * 55 + 'px', borderRadius: '8px 8px 2px 2px',
    background: i === 2 ? 'linear-gradient(180deg, #ffb199, var(--signal))' : 'linear-gradient(180deg, #4fd3c1, var(--teal))', opacity: 0.85 }));
  el('div', 'abs', prev, { right: '70px', top: '90px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, rgba(245,184,65,.8), rgba(245,184,65,.1) 70%)' });
  const tc = el('div', 'abs', prev, { right: '20px', top: '18px', font: `600 18px/1 ${MONO}`, color: 'rgba(255,255,255,.6)', letterSpacing: '.08em' });

  const wm = el('div', 'abs', prev, { inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0 });
  const wmt = el('div', '', wm, { font: `900 110px/1 ${DISP}`, letterSpacing: '-.03em', color: 'rgba(255,255,255,.28)', transform: 'rotate(-14deg)', textShadow: '0 2px 0 rgba(0,0,0,.2)' });
  wmt.textContent = 'WATERMARK';
  const sweep = el('div', 'abs', prev, { top: 0, bottom: 0, left: '-60px', width: '40px', background: 'linear-gradient(90deg, transparent, var(--signal), #ffd0c2)', boxShadow: '0 0 60px var(--signal)', opacity: 0 });

  const cap = el('div', 'abs', prev, { left: 0, right: 0, bottom: 0, height: '86px', background: 'rgba(8,10,18,.82)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    font: `700 36px/1 Inter`, letterSpacing: '-.01em', color: 'rgba(255,255,255,.5)', gap: '12px' });
  const capWords = 'for viewers with the sound off'.split(' ');
  const capTimes = ['for', 'viewers', 'with', 'the', 'sound', 'off,'].map((w) => W(w));
  const capSpans = capWords.map((w) => { const s = el('span', '', cap, { display: 'inline-block' }); s.textContent = w; return s; });
  const tags = ['SRT', 'VTT'].map((t, i) => {
    const d = el('div', 'abs', cam, { left: '400px', top: 540 + i * 70 + 'px', width: '120px', height: '54px', borderRadius: '10px', border: '2px solid var(--amber)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', font: `800 22px/1 ${MONO}`, letterSpacing: '.12em', color: 'var(--amber)', background: 'rgba(245,184,65,.08)' });
    d.textContent = t; return d;
  });

  // clean badge: top-left corner of the preview, clear of the timecode
  const clean = el('div', 'abs', cam, { left: PV.x - 32 + 'px', top: PV.y - 32 + 'px', width: '64px', height: '64px', borderRadius: '50%', background: 'var(--teal)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(43,181,163,.6)' });
  clean.innerHTML = '<svg width="34" height="34" viewBox="0 0 34 34"><path d="M7 18 L14 25 L27 10" fill="none" stroke="#0E1220" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ---------- price tag ---------- */
  const tagWrap = el('div', 'abs', cam, { left: '1430px', top: '250px', width: '220px', height: '300px', transformOrigin: '110px 0px' });
  el('div', 'abs', tagWrap, { left: '109px', top: 0, width: '2px', height: '60px', background: 'rgba(246,243,236,.6)' });
  const ptag = el('div', 'abs', tagWrap, { left: '20px', top: '56px', width: '180px', height: '220px', background: 'var(--amber)', borderRadius: '10px',
    clipPath: 'polygon(50% 0%, 100% 22%, 100% 100%, 0% 100%, 0% 22%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '30px', boxSizing: 'border-box' });
  el('div', 'abs', ptag, { left: '80px', top: '22px', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--night)' });
  const pd = el('div', '', ptag, { font: `900 96px/1 ${DISP}`, color: 'var(--night)', letterSpacing: '-.04em' }); pd.textContent = '$';
  const pl = el('div', '', ptag, { font: `800 18px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--night)', marginTop: '8px' }); pl.textContent = 'LIMITS';

  /* ---------- timeline ---------- */
  const TL = { x: 160, w: 1440, top: 745 };
  const ruler = el('div', 'abs', cam, { left: TL.x + 'px', top: '708px', width: TL.w + 'px', height: '20px' });
  for (let i = 0; i <= 6; i++) {
    const r = el('div', 'abs', ruler, { left: i * TL.w / 6 + 'px', top: 0, font: `600 15px/1 ${MONO}`, color: 'rgba(154,163,181,.6)', letterSpacing: '.06em' });
    r.textContent = '00:' + String(i * 10).padStart(2, '0');
  }
  const track = el('div', 'abs', cam, { left: TL.x - 16 + 'px', top: TL.top - 14 + 'px', width: TL.w + 32 + 'px', height: '204px', borderRadius: '16px', background: 'rgba(26,31,46,.75)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.06), 0 30px 70px rgba(0,0,0,.4)' });
  const BND = [0, 0.22, 0.47, 0.71, 1];
  const offs = [-70, 55, -45, 65];
  const blocks = BND.slice(0, 4).map((b, i) => {
    const x = TL.x + b * TL.w + 4, w = (BND[i + 1] - b) * TL.w - 8;
    const bl = el('div', 'abs', cam, { left: x + 'px', top: TL.top + 'px', width: w + 'px', height: '64px', borderRadius: '10px', overflow: 'hidden',
      background: 'rgba(154,163,181,.16)', border: '2px solid rgba(154,163,181,.35)', boxSizing: 'border-box' });
    const fill = el('div', 'abs', bl, { inset: 0, background: 'linear-gradient(180deg, #4fd3c1, var(--teal))', opacity: 0 });
    const lb = el('div', 'abs', bl, { left: '16px', top: '22px', font: `700 18px/1 ${MONO}`, letterSpacing: '.12em', color: 'rgba(255,255,255,.75)' });
    lb.textContent = 'SCENE ' + (i + 1);
    return { bl, fill, lb };
  });
  const rnd = ctx.rand(11);
  let bars = '';
  const N = 120, WY = 875;
  for (let i = 0; i < N; i++) {
    const f = (i + 0.5) / N;
    const near = BND.some((b) => Math.abs(f - b) < 0.018);
    const a = near ? 2 : 6 + rnd() * 34 * (0.6 + 0.4 * Math.sin(f * 40));
    bars += `<rect x="${i * 12 + 3}" y="${45 - Math.abs(a)}" width="6" height="${Math.abs(a) * 2}" rx="3"/>`;
  }
  const mkWave = (fill) => { const d = el('div', 'abs', cam, { left: TL.x + 'px', top: WY - 45 + 'px', width: TL.w + 'px', height: '90px' });
    d.innerHTML = `<svg width="${TL.w}" height="90" fill="${fill}">${bars}</svg>`; return d; };
  mkWave('rgba(154,163,181,.35)');
  const waveT = mkWave('#2BB5A3');
  gsap.set(waveT, { clipPath: 'inset(0px 100% 0px 0px)', filter: 'drop-shadow(0 0 8px rgba(43,181,163,.6))' });
  const bLines = BND.slice(1, 4).map((b) => el('div', 'abs', cam, { left: TL.x + b * TL.w - 1 + 'px', top: TL.top - 8 + 'px', width: '2px', height: '190px',
    background: 'repeating-linear-gradient(180deg, var(--teal) 0 8px, transparent 8px 14px)', opacity: 0, transformOrigin: '50% 0%' }));
  const head = el('div', 'abs', cam, { left: TL.x + 'px', top: '700px', width: '3px', height: '232px', background: 'var(--signal)', boxShadow: '0 0 16px var(--signal)' });
  el('div', 'abs', head, { left: '-7px', top: '-4px', width: '17px', height: '17px', borderRadius: '4px', background: 'var(--signal)', transform: 'rotate(45deg)' });

  /* ---------- MP4 file chip ---------- */
  const mp4 = el('div', 'abs', cam, { left: '1648px', top: TL.top + 'px', width: '150px', height: '176px', transformOrigin: '50% 100%' });
  el('div', 'abs', mp4, { inset: 0, background: 'var(--paper)', borderRadius: '12px', clipPath: 'polygon(0 0, 72% 0, 100% 20%, 100% 100%, 0 100%)', boxShadow: '0 20px 40px rgba(0,0,0,.5)' });
  el('div', 'abs', mp4, { right: 0, top: 0, width: '42px', height: '36px', background: '#d9d3c4', clipPath: 'polygon(0 0, 100% 100%, 0 100%)' });
  const mt = el('div', 'abs', mp4, { left: 0, right: 0, top: '62px', textAlign: 'center', font: `900 48px/1 ${DISP}`, letterSpacing: '-.03em', color: 'var(--ink)' }); mt.textContent = 'MP4';
  el('div', 'abs', mp4, { left: '30px', right: '30px', top: '126px', height: '8px', borderRadius: '4px', background: 'var(--signal)' });
  const mcheck = el('div', 'abs', mp4, { right: '-16px', bottom: '-16px', width: '52px', height: '52px', borderRadius: '50%', background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(43,181,163,.7)' });
  mcheck.innerHTML = '<svg width="28" height="28" viewBox="0 0 34 34"><path d="M7 18 L14 25 L27 10" fill="none" stroke="#0E1220" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const land = el('div', 'abs', cam, { left: '1640px', top: '914px', width: '166px', height: '12px', borderRadius: '50%', background: 'rgba(246,243,236,.35)', filter: 'blur(4px)', opacity: 0 });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    const p = Math.min(1, t / ctx.dur);
    gsap.set(head, { x: p * TL.w });
    const s = Math.floor(p * 60);
    tc.textContent = '00:' + String(s).padStart(2, '0') + ':' + String(Math.floor((t * 30) % 30)).padStart(2, '0');
  });

  gsap.set([...tags, tagWrap, mp4, clean, mcheck], { opacity: 0 });
  gsap.set(cap, { yPercent: 110 });
  blocks.forEach((b, i) => gsap.set(b.bl, { x: offs[i], scaleX: 0.86 + (i % 2) * 0.2 }));

  tl.from(prev, { y: 40, opacity: 0, duration: 0.8 }, 0.05);
  tl.from(chips.map((c) => c.c), { y: -20, opacity: 0, duration: 0.6, stagger: 0.06 }, 0.05);
  tl.from([track, ruler], { opacity: 0, y: 30, duration: 0.7 }, 0.1);
  tl.from(blocks.map((b) => b.bl), { opacity: 0, duration: 0.5, stagger: 0.05 }, 0.2);
  tl.to(cam, { scale: 1.035, x: -10, duration: ctx.dur, ease: 'none' }, 0);

  lightChip(0, tTiming, '#2BB5A3');
  tl.to(waveT, { clipPath: 'inset(0px 0% 0px 0px)', duration: tSpeech - tTiming + 0.4, ease: 'power1.inOut' }, tTiming);
  blocks.forEach((b, i) => {
    const t = tFollows + i * 0.12;
    tl.to(b.bl, { x: 0, scaleX: 1, borderColor: 'rgba(79,211,193,.9)', duration: 0.5, ease: 'back.out(1.8)' }, t);
    tl.to(b.fill, { opacity: 1, duration: 0.3 }, t + 0.15);
    tl.to(b.lb, { color: '#0E1220', duration: 0.3 }, t + 0.15);
  });
  tl.fromTo(bLines, { opacity: 0, scaleY: 0 }, { opacity: 0.9, scaleY: 1, duration: 0.4, stagger: 0.07, immediateRender: false }, tSpeech);

  lightChip(1, tCap, '#F5B841');
  tl.to(cap, { yPercent: 0, duration: 0.5, ease: 'back.out(1.4)' }, tCap - 0.1);
  tl.fromTo(tags, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.1, ease: 'back.out(1.8)', immediateRender: false }, tCap + 0.15);
  capSpans.forEach((s, i) => tl.to(s, { color: '#F5B841', duration: 0.15 }, capTimes[i]));

  lightChip(2, tMP4, '#F6F3EC');
  tl.fromTo(mp4, { y: -520, opacity: 0, rotation: -12 }, { y: 0, opacity: 1, rotation: 0, duration: 0.55, ease: 'power3.in', immediateRender: false }, tMP4 - 0.3);
  tl.to(mp4, { scaleY: 0.9, scaleX: 1.06, duration: 0.09, yoyo: true, repeat: 1 }, tMP4 + 0.25);
  tl.fromTo(land, { opacity: 0.9, scaleX: 0.6 }, { opacity: 0.2, scaleX: 1.2, duration: 0.6, immediateRender: false }, tMP4 + 0.25);
  tl.fromTo(mcheck, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.2)', immediateRender: false }, tAccepts);

  lightChip(3, tPrice, '#FF6B4A');
  tl.fromTo(tagWrap, { opacity: 0, rotation: -35 }, { opacity: 1, rotation: 0, duration: 1.1, ease: 'elastic.out(1, 0.45)', immediateRender: false }, tPrice - 0.15);
  tl.fromTo(wm, { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: 0.35, immediateRender: false }, tPrice + 0.05);
  gsap.set(wm, { clipPath: 'inset(0px 0px 0px 0%)' });
  const wipe = tWater + 0.2;
  tl.to(sweep, { opacity: 1, duration: 0.1 }, wipe);
  tl.to(sweep, { x: PV.w + 120, duration: 0.65, ease: 'power2.inOut' }, wipe);
  tl.to(wm, { clipPath: 'inset(0px 0px 0px 100%)', duration: 0.65, ease: 'power2.inOut' }, wipe);
  tl.to(sweep, { opacity: 0, duration: 0.15 }, wipe + 0.6);
  tl.fromTo(clean, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.2)', immediateRender: false }, wipe + 0.6);
  tl.to(glow, { opacity: 1.6, duration: 0.8 }, wipe + 0.6);
});
