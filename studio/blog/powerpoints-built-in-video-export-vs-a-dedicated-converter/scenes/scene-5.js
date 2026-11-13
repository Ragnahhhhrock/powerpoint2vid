/* Scene 5 (final): "Ordinary slides in, extraordinary video out. On Pro, A.I. directs your video,
 * tightening the story and timing each scene. Try Basic first at powerpoint2vid.com."
 * Storyboard: Paper stage. An empty player frame waits as an amber lane (left) and a blue lane (right)
 * draw in. On "slides" the plain deck slide drops into the frame. On "extraordinary" a vivid video
 * wipes over it and starts playing; on "out" both lanes merge into one glowing progress bar.
 * On "Pro" an ink director badge pops in. On "directs" scattered scene clips snap onto a timeline,
 * on "tightening" they close up, and on "timing" a playhead sweeps and lights each scene.
 * On "Try" the whole set recedes. "Try Basic first" appears, then on "PowerPoint" the URL lands
 * centre at 120px in ink, a warm underline draws in, and the frame holds to the end. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w) => ctx.at(i, w);
  const tSlides = A(0, 'slides'), tExtra = A(0, 'extraordinary'), tOut = A(0, 'out.');
  const tPro = A(1, 'Pro,'), tDirects = A(1, 'directs'), tTight = A(1, 'tightening'), tTiming = A(1, 'timing'), tScene = A(1, 'scene.');
  const tTry = A(2, 'Try'), tBasic = A(2, 'Basic'), tURL = A(2, 'PowerPoint'), tCom = A(2, 'com.');
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(70% 70% at 50% 45%, #fffdf8 0%, var(--paper) 60%, #e9e3d6 100%)';
  const warmGlow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(40% 35% at 30% 75%, rgba(242,163,58,.14), transparent 70%), radial-gradient(40% 35% at 70% 75%, rgba(63,167,214,.14), transparent 70%)' });

  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 480px' });

  /* lanes */
  const FX = 520, FY = 170, FW = 880, FH = 495;
  const lanes = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  lanes.innerHTML = `<svg width="1920" height="1080" style="overflow:visible">
    <defs><filter id="lg" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="10"/></filter></defs>
    <path id="la-g" d="M -40 960 C 420 960, 700 720, 960 690" pathLength="1" fill="none" stroke="#F2A33A" stroke-opacity=".35" stroke-width="40" stroke-linecap="round" filter="url(#lg)" stroke-dasharray="1" stroke-dashoffset="1"/>
    <path id="lb-g" d="M 1960 960 C 1500 960, 1220 720, 960 690" pathLength="1" fill="none" stroke="#3FA7D6" stroke-opacity=".35" stroke-width="40" stroke-linecap="round" filter="url(#lg)" stroke-dasharray="1" stroke-dashoffset="1"/>
    <path id="la" d="M -40 960 C 420 960, 700 720, 960 690" pathLength="1" fill="none" stroke="#F2A33A" stroke-width="18" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1"/>
    <path id="lb" d="M 1960 960 C 1500 960, 1220 720, 960 690" pathLength="1" fill="none" stroke="#3FA7D6" stroke-width="18" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1"/>
  </svg>`;
  const laneA = lanes.querySelectorAll('#la, #la-g'), laneB = lanes.querySelectorAll('#lb, #lb-g');
  const laneLabA = el('div', 'abs', cam, { left: '110px', top: '900px', font: `600 22px/1 ${MONO}`, letterSpacing: '.14em', color: '#b8741c' });
  laneLabA.textContent = 'YOUR VOICE';
  const laneLabB = el('div', 'abs', cam, { right: '110px', top: '900px', font: `600 22px/1 ${MONO}`, letterSpacing: '.14em', color: '#2a7fa6', textAlign: 'right' });
  laneLabB.textContent = 'YOUR NOTES';
  const merge = el('div', 'abs', cam, { left: '930px', top: '660px', width: '60px', height: '60px', borderRadius: '50%', background: 'radial-gradient(circle, #fff 0%, rgba(242,163,58,.9) 35%, rgba(63,167,214,0) 70%)', opacity: 0 });

  /* player frame */
  const frame = el('div', 'abs', cam, { left: FX + 'px', top: FY + 'px', width: FW + 'px', height: FH + 'px', borderRadius: '18px', border: '3px dashed rgba(27,34,56,.28)', boxSizing: 'border-box' });
  const player = el('div', 'abs', cam, { left: FX + 'px', top: FY + 'px', width: FW + 'px', height: FH + 'px', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 30px 70px rgba(27,34,56,.18)' });
  const slide = el('div', 'abs', player, { inset: 0, background: '#fff' });
  const si = el('img', 'abs', slide, { inset: 0, width: '100%', height: '100%', objectFit: 'cover' }); si.src = ctx.asset('slide-6.png');
  const frameTag = el('div', 'abs', cam, { left: FX + 'px', top: FY - 46 + 'px', font: `600 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--mist)' });
  frameTag.textContent = 'SLIDE IN';

  /* the vivid video */
  const video = el('div', 'abs', player, { inset: 0, background: 'radial-gradient(80% 90% at 30% 30%, #2a3358 0%, var(--night) 70%)' });
  const orbA = el('div', 'abs', video, { left: '120px', top: '90px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(242,163,58,.9), rgba(242,163,58,0) 68%)' });
  const orbB = el('div', 'abs', video, { left: '470px', top: '120px', width: '340px', height: '340px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(63,167,214,.9), rgba(63,167,214,0) 68%)', mixBlendMode: 'screen' });
  const vh = el('div', 'abs', video, { left: '70px', top: '150px', font: '900 76px/0.95 Inter Display, Inter', letterSpacing: '-.045em', color: '#fff', textShadow: '0 6px 30px rgba(0,0,0,.4)' });
  vh.innerHTML = 'Your deck,<br>directed.';
  const bars = [0, 1, 2].map((i) => el('div', 'abs', video, { left: '72px', top: 340 + i * 26 + 'px', width: [300, 240, 270][i] + 'px', height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,.22)' }));
  const pTrack = el('div', 'abs', video, { left: '40px', right: '40px', bottom: '34px', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,.15)' });
  const pFill = el('div', 'abs', pTrack, { left: 0, top: 0, height: '100%', width: '0px', borderRadius: '4px', background: 'linear-gradient(90deg, #F2A33A, #3FA7D6)', boxShadow: '0 0 18px rgba(242,163,58,.8)' });
  const playIcon = el('div', 'abs', video, { left: '40px', bottom: '58px', width: 0, height: 0, borderLeft: '20px solid #fff', borderTop: '12px solid transparent', borderBottom: '12px solid transparent', opacity: .85 });
  gsap.set(video, { clipPath: 'inset(0px 100% 0px 0px)' });
  const wipe = el('div', 'abs', cam, { left: FX + 'px', top: FY + 'px', width: '8px', height: FH + 'px', background: 'linear-gradient(180deg, #F2A33A, #3FA7D6)', boxShadow: '0 0 30px rgba(242,163,58,.9)', opacity: 0 });

  /* director badge */
  const badge = el('div', 'abs', cam, { left: FX + FW - 330 + 'px', top: FY - 62 + 'px', width: '330px', height: '50px', borderRadius: '25px', background: 'var(--ink)', boxShadow: '0 14px 30px rgba(27,34,56,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', font: `700 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--paper)', transformOrigin: '100% 50%' });
  const dot = el('span', '', badge, { width: '12px', height: '12px', borderRadius: '50%', background: 'var(--warm)', boxShadow: '0 0 12px var(--warm)', display: 'inline-block' });
  const bt = el('span', '', badge, {}); bt.textContent = 'PRO · AI DIRECTOR';

  /* timeline of scenes */
  const TY = 720, TH = 64;
  const trackBg = el('div', 'abs', cam, { left: FX - 10 + 'px', top: TY - 10 + 'px', width: FW + 20 + 'px', height: TH + 20 + 'px', borderRadius: '14px', background: 'rgba(27,34,56,.06)', border: '1px solid rgba(27,34,56,.1)' });
  const LW = [190, 130, 210, 150, 170, 140], LG = 22;
  const loose = LW.reduce((s, w) => s + w, 0) + LG * 5;
  const TG = 8, tScale = (FW - TG * 5) / LW.reduce((s, w) => s + w, 0);
  const cols = ['#F2A33A', '#3FA7D6', '#E8604C', '#3FA7D6', '#F2A33A', '#3FA7D6'];
  const r = ctx.rand(7);
  let lx = 960 - loose / 2, tx = FX;
  const clips = LW.map((w, i) => {
    const c = el('div', 'abs', cam, { left: lx + 'px', top: TY + 'px', width: w + 'px', height: TH + 'px', borderRadius: '10px', background: `linear-gradient(180deg, ${cols[i]}, ${cols[i]}cc)`, boxShadow: '0 8px 18px rgba(27,34,56,.18), inset 0 1px 0 rgba(255,255,255,.4)', font: `700 18px/64px ${MONO}`, letterSpacing: '.1em', color: 'rgba(255,255,255,.95)', paddingLeft: '14px', boxSizing: 'border-box', overflow: 'hidden' });
    c.textContent = 'S' + (i + 1);
    const o = { el: c, tight: { left: tx, width: w * tScale }, sx: (r() - 0.5) * 500, sy: -160 - r() * 260, rot: (r() - 0.5) * 40 };
    lx += w + LG; tx += w * tScale + TG;
    return o;
  });
  const playhead = el('div', 'abs', cam, { left: FX + 'px', top: TY - 22 + 'px', width: '4px', height: TH + 44 + 'px', borderRadius: '2px', background: 'var(--ink)', boxShadow: '0 0 12px rgba(27,34,56,.4)', opacity: 0 });

  /* CTA */
  const cta = el('div', 'abs', stage, { left: '80px', right: '80px', top: '360px', textAlign: 'center', transformOrigin: '50% 60%' });
  const tryL = el('div', '', cta, { font: `600 30px/1 ${MONO}`, letterSpacing: '.2em', color: 'var(--mist)', marginBottom: '40px' });
  tryL.innerHTML = 'TRY <span style="color:#d2862a">BASIC</span> FIRST';
  const urlWrap = el('div', '', cta, { display: 'inline-block', position: 'relative', paddingBottom: '30px' });
  const url = el('div', '', urlWrap, { font: '800 120px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const chars = ctx.split(url, 'powerpoint2vid.com', 'char');
  const under = el('div', 'abs', urlWrap, { left: '4px', right: '4px', bottom: '0px', height: '14px', borderRadius: '7px', background: 'linear-gradient(90deg, #F2A33A, #f6b65a)', boxShadow: '0 8px 26px rgba(242,163,58,.55)', transformOrigin: '0% 50%' });

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.06 });

  /* procedural: playing video + progress */
  const prog = { p: 0 };
  ctx.onFrame((t) => {
    gsap.set(orbA, { x: Math.sin(t * 0.9) * 40, y: Math.cos(t * 0.7) * 30 });
    gsap.set(orbB, { x: Math.cos(t * 0.8) * 45, y: Math.sin(t * 0.6) * 30 });
    pFill.style.width = (prog.p * (FW - 80)) + 'px';
  });

  /* ---- timeline ---- */
  // opening: frame, lanes start drawing
  tl.from(frame, { opacity: 0, scale: 0.96, duration: 0.6 }, 0);
  tl.from(frameTag, { opacity: 0, y: 10, duration: 0.5 }, 0.15);
  tl.to(laneA, { strokeDashoffset: 0, duration: 1.7, ease: 'power2.inOut' }, 0.1);
  tl.to(laneB, { strokeDashoffset: 0, duration: 1.7, ease: 'power2.inOut' }, 0.25);
  tl.from([laneLabA, laneLabB], { opacity: 0, y: 14, duration: 0.6, stagger: 0.12 }, 0.4);
  tl.to(cam, { scale: 1.03, duration: tTry, ease: 'none' }, 0);

  // "slides in": plain slide drops into the frame
  tl.from(player, { y: -760, rotation: -4, duration: 0.75, ease: 'back.out(1.2)' }, tSlides - 0.35);
  tl.to(frame, { opacity: 0, duration: 0.3 }, tSlides + 0.3);

  // "extraordinary": vivid video wipes over
  tl.to(frameTag, { opacity: 0, duration: 0.25 }, tExtra - 0.2);
  tl.set(wipe, { opacity: 1 }, tExtra);
  tl.to(video, { clipPath: 'inset(0px 0% 0px 0px)', duration: 0.75, ease: 'power2.inOut' }, tExtra);
  tl.to(wipe, { x: FW - 8, duration: 0.75, ease: 'power2.inOut' }, tExtra);
  tl.to(wipe, { opacity: 0, duration: 0.25 }, tExtra + 0.7);
  tl.to(player, { boxShadow: '0 40px 100px rgba(27,34,56,.35), 0 0 80px rgba(242,163,58,.25)', duration: 0.8 }, tExtra + 0.3);
  tl.from(vh, { opacity: 0, y: 30, duration: 0.6, ease: 'back.out(1.6)' }, tExtra + 0.45);
  tl.from(bars, { scaleX: 0, transformOrigin: '0% 50%', duration: 0.5, stagger: 0.08 }, tExtra + 0.6);
  tl.from([orbA, orbB], { scale: 0.3, opacity: 0, duration: 0.9, stagger: 0.1 }, tExtra + 0.2);

  // "out": lanes merge into one progress bar
  tl.fromTo(merge, { scale: 0.3, opacity: 0 }, { scale: 2.4, opacity: 1, duration: 0.35, ease: 'power2.out', immediateRender: false }, tOut - 0.1);
  tl.to(merge, { opacity: 0, scale: 3.2, duration: 0.5 }, tOut + 0.25);
  tl.to(prog, { p: 0.35, duration: 0.6, ease: 'power2.out' }, tOut);
  tl.to(prog, { p: 1, duration: tTry - tOut - 0.6, ease: 'none' }, tOut + 0.6);

  // "Pro": lanes clear, badge pops
  tl.to([lanes, laneLabA, laneLabB], { opacity: 0, y: 30, duration: 0.6, ease: 'power2.in' }, tPro - 0.4);
  tl.from(badge, { scale: 0.4, opacity: 0, duration: 0.6, ease: 'back.out(1.8)' }, tPro);
  tl.to(dot, { scale: 1.5, duration: 0.3, yoyo: true, repeat: 1 }, tPro + 0.5);

  // "directs": clips snap onto the track
  tl.from(trackBg, { opacity: 0, scaleX: 0.9, duration: 0.5 }, tDirects - 0.3);
  clips.forEach((c, i) => {
    tl.from(c.el, { x: c.sx, y: c.sy, rotation: c.rot, opacity: 0, duration: 0.6, ease: 'back.out(1.6)' }, tDirects - 0.15 + i * 0.08);
  });
  // "tightening": they close ranks
  clips.forEach((c, i) => {
    tl.to(c.el, { left: c.tight.left, width: c.tight.width, duration: 0.7, ease: 'expo.inOut' }, tTight - 0.1 + i * 0.03);
  });
  // "timing": playhead lights each scene
  tl.to(playhead, { opacity: 1, duration: 0.2 }, tTiming - 0.2);
  tl.to(playhead, { left: FX + FW - 4, duration: tScene + 0.4 - tTiming, ease: 'none' }, tTiming - 0.1);
  const sweep = tScene + 0.4 - tTiming;
  clips.forEach((c) => {
    const at = tTiming - 0.1 + ((c.tight.left - FX) / FW) * sweep;
    tl.to(c.el, { y: -8, boxShadow: '0 14px 26px rgba(27,34,56,.28), 0 0 24px rgba(242,163,58,.6)', duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, at);
  });

  // "Try": the set recedes, CTA lands
  gsap.set(cam, { filter: 'blur(0px)' });
  tl.to(cam, { scale: 0.82, opacity: 0, filter: 'blur(8px)', duration: 0.7, ease: 'power2.in' }, tTry - 0.35);
  tl.to(warmGlow, { opacity: 0.6, duration: 0.8 }, tTry);
  tl.from(tryL, { opacity: 0, y: 24, duration: 0.6, ease: 'back.out(1.6)' }, tTry + 0.05);
  tl.fromTo(tryL.querySelector('span'), { color: '#9AA3B8' }, { color: '#d2862a', duration: 0.4 }, tBasic);
  tl.from(chars, { opacity: 0, y: 60, rotation: 6, duration: 0.55, ease: 'back.out(1.7)', stagger: 0.035 }, tURL - 0.2);
  tl.from(under, { scaleX: 0, duration: 0.8, ease: 'expo.inOut' }, tURL + 0.55);
  tl.to(under, { boxShadow: '0 8px 40px rgba(242,163,58,.9)', duration: 0.4, yoyo: true, repeat: 1 }, tCom);
  tl.to(cta, { scale: 1.03, duration: ctx.dur - tTry, ease: 'power1.inOut' }, tTry);
});
