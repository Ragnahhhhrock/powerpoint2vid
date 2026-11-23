/* Scene 5 — "Try Basic first, with narration, captions and transitions. On Pro, a.i. directs your video,
 * one clear scene per rule. Start at powerpoint2vid.com."
 * Storyboard: night stage, wide. A plain slide deck slides in from the left and passes through a teal light
 * gate, emerging on the right as a playing video. On "Basic" three chips pop in (Narration, Captions,
 * Transitions). On "Pro" a teal director's clapper snaps shut above the gate; on "scene" the progress bar
 * splits into scene segments. On "powerpoint2vid.com" the pipeline recedes and the URL lands centre at 100px
 * in paper white, with ".pptx" and "Google Slides" tags beneath. Hold. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const safe = (v, f) => (Number.isFinite(v) ? v : f);
  const B = ctx.beats;
  const tBasic = safe(ctx.at(0, 'Basic'), B[0].t + 0.3);
  const tNarr = safe(ctx.at(0, 'narration'), tBasic + 0.6);
  const tCap = safe(ctx.at(0, 'captions'), tNarr + 0.6);
  const tTrans = safe(ctx.at(0, 'transitions'), tCap + 0.6);
  const tPro = safe(ctx.at(1, 'Pro'), B[1].t + 0.1);
  const tDir = safe(ctx.at(1, 'directs'), tPro + 0.8);
  const tScene = safe(ctx.at(1, 'scene'), tDir + 1.2);
  const tUrl = safe(ctx.at(2, 'powerpoint2vid.com'), B[2].t + 0.45);
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 50% 42%, #17263c 0%, var(--night) 70%)';
  const glowBg = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(22% 40% at 50% 41%, rgba(20,163,139,.22), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 500px' });
  const pipe = el('div', 'abs', cam, { inset: 0, transformOrigin: '960px 440px' });

  const W = 440, H = 248, TOP = 316, X0 = 300, X1 = 1180;
  const leftClip = el('div', 'abs', pipe, { inset: 0, clipPath: 'inset(0px 960px 0px 0px)' });
  const rightClip = el('div', 'abs', pipe, { inset: 0, clipPath: 'inset(0px 0px 0px 960px)' });

  /* plain deck: front card is the real slide, back cards are blank paper sheets (no peeking text) */
  const deck = el('div', 'abs', leftClip, { left: X0 + 'px', top: TOP + 'px', width: W + 'px', height: H + 'px' });
  [2, 1, 0].forEach((k) => {
    const c = el('div', 'abs', deck, { left: k * 14 + 'px', top: -k * 14 + 'px', width: W + 'px', height: H + 'px', borderRadius: '8px', overflow: 'hidden', background: k ? (k === 1 ? '#e9e5dc' : '#d9d5cc') : '#fff', boxShadow: '0 20px 50px rgba(0,0,0,.45)' });
    if (k === 0) {
      const im = el('img', 'abs', c, { inset: 0, width: '100%', height: '100%', objectFit: 'cover' });
      im.src = ctx.asset('slide-6.png');
    }
  });

  /* video player */
  const vid = el('div', 'abs', rightClip, { left: X0 + 'px', top: TOP + 'px', width: W + 'px', height: H + 'px', borderRadius: '14px', overflow: 'hidden', background: 'var(--ink)', boxShadow: '0 30px 80px rgba(0,0,0,.6), 0 0 60px rgba(20,163,139,.35)', border: '2px solid rgba(20,163,139,.6)' });
  const vimg = el('img', 'abs', vid, { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.45) saturate(1.2)', transformOrigin: '50% 50%' });
  vimg.src = ctx.asset('slide-3.png');
  el('div', 'abs', vid, { inset: 0, background: 'linear-gradient(160deg, rgba(20,163,139,.35), rgba(14,23,38,.6) 60%)' });
  const play = el('div', 'abs', vid, { left: W / 2 - 34 + 'px', top: H / 2 - 44 + 'px', width: '68px', height: '68px', borderRadius: '50%', background: 'rgba(246,243,236,.92)' });
  el('div', 'abs', play, { left: '26px', top: '20px', width: 0, height: 0, borderLeft: '24px solid var(--night)', borderTop: '14px solid transparent', borderBottom: '14px solid transparent' });
  const track = el('div', 'abs', vid, { left: '24px', right: '24px', bottom: '20px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.18)', overflow: 'hidden' });
  const fill = el('div', 'abs', track, { left: 0, top: 0, bottom: 0, width: '100%', background: '#14A38B', transformOrigin: '0 50%' });
  const ticks = [1, 2, 3].map((k) => el('div', 'abs', vid, { left: 24 + (k * (W - 48)) / 4 - 2 + 'px', bottom: '16px', width: '4px', height: '14px', borderRadius: '2px', background: 'var(--paper)', opacity: 0 }));

  /* light gate */
  const gate = el('div', 'abs', pipe, { left: '957px', top: '250px', width: '6px', height: '380px', borderRadius: '3px', background: 'linear-gradient(180deg, transparent, #7ff0dc 20%, #14A38B 50%, #7ff0dc 80%, transparent)', boxShadow: '0 0 30px #14A38B, 0 0 80px rgba(20,163,139,.7)' });
  const gateFlare = el('div', 'abs', pipe, { left: '860px', top: '250px', width: '200px', height: '380px', background: 'radial-gradient(50% 50% at 50% 50%, rgba(127,240,220,.55), transparent 70%)', opacity: 0, mixBlendMode: 'screen' });

  /* clapper above gate */
  const clap = el('div', 'abs', pipe, { left: '885px', top: '96px', width: '150px', height: '130px' });
  clap.innerHTML = `<svg width="150" height="130" viewBox="0 0 150 130">
    <rect x="8" y="46" width="134" height="78" rx="8" fill="#14A38B"/>
    <rect x="8" y="46" width="134" height="20" fill="#0E1726" opacity=".35"/>
    <g id="arm" style="transform-origin:12px 40px"><rect x="8" y="24" width="134" height="20" rx="4" fill="#14A38B"/>
    <path d="M30 24 L44 44 M62 24 L76 44 M94 24 L108 44 M126 24 L138 40" stroke="#0E1726" stroke-width="9"/></g></svg>`;
  const arm = clap.querySelector('#arm');
  const proTag = el('div', 'abs', pipe, { left: '1060px', top: '150px', font: `700 24px/1 ${MONO}`, letterSpacing: '.16em', color: '#14A38B' });
  proTag.textContent = 'PRO · AI DIRECTOR';

  /* basic chips */
  const basicTag = el('div', 'abs', cam, { left: '0px', width: '1920px', top: '664px', textAlign: 'center', font: `700 22px/1 ${MONO}`, letterSpacing: '.2em', color: '#8A97A8' });
  basicTag.textContent = 'BASIC';
  const row = el('div', 'abs', cam, { left: '0px', width: '1920px', top: '712px', display: 'flex', justifyContent: 'center', gap: '28px' });
  const chips = ['Narration', 'Captions', 'Transitions'].map((s) => {
    const c = el('div', '', row, { padding: '18px 34px', borderRadius: '40px', font: '700 34px/1 Inter Display, Inter', letterSpacing: '-.02em', color: 'var(--paper)', background: 'rgba(27,36,51,.9)', border: '2px solid rgba(242,169,59,.7)', boxShadow: '0 14px 40px rgba(0,0,0,.4)' });
    c.textContent = s; return c;
  });

  /* URL */
  const url = el('div', 'abs', cam, { left: '0px', width: '1920px', top: '560px', textAlign: 'center', font: '900 100px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)', textShadow: '0 0 60px rgba(20,163,139,.45)' });
  url.textContent = 'powerpoint2vid.com';
  const ul = el('div', 'abs', cam, { left: '660px', width: '600px', top: '682px', height: '6px', borderRadius: '3px', background: '#14A38B', boxShadow: '0 0 24px #14A38B', transformOrigin: '50% 50%' });
  const tagRow = el('div', 'abs', cam, { left: '0px', width: '1920px', top: '728px', display: 'flex', justifyContent: 'center', gap: '20px' });
  const tags = ['.pptx', 'Google Slides'].map((s) => {
    const t = el('div', '', tagRow, { padding: '12px 24px', borderRadius: '8px', font: `600 24px/1 ${MONO}`, letterSpacing: '.08em', color: '#8A97A8', border: '1.5px solid rgba(138,151,168,.5)' });
    t.textContent = s; return t;
  });

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  const dx = X1 - X0;
  gsap.set([vimg], { filter: 'brightness(.45) saturate(1.2)' });
  gsap.set([...chips, basicTag, clap, proTag, url, ul, ...tags], { opacity: 0 });
  gsap.set(gate, { scaleY: 0.2, opacity: 0 });
  gsap.set(arm, { rotation: -32 });
  gsap.set(fill, { scaleX: 0 });

  tl.to(cam, { scale: 1.035, duration: ctx.dur, ease: 'none' }, 0);
  tl.from(deck, { x: -700, duration: 1.0, ease: 'power3.out' }, 0);
  tl.to(gate, { scaleY: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.6)' }, 0.15);

  const tr0 = 1.15, trD = 1.7;
  tl.to([deck, vid], { x: dx, duration: trD, ease: 'expo.inOut' }, tr0);
  tl.fromTo(gateFlare, { opacity: 0 }, { opacity: 1, duration: 0.35, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, tr0 + 0.45);
  tl.to(gate, { width: 12, x: -3, duration: 0.35, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tr0 + 0.45);
  tl.to(fill, { scaleX: 1, duration: ctx.dur - (tr0 + trD), ease: 'none' }, tr0 + trD);
  tl.to(vimg, { scale: 1.12, duration: ctx.dur - tr0, ease: 'none' }, tr0);
  tl.to(play, { scale: 0.88, duration: 0.6, yoyo: true, repeat: 7, ease: 'sine.inOut' }, tr0 + trD);

  tl.to(basicTag, { opacity: 1, duration: 0.4 }, tBasic);
  [tNarr, tCap, tTrans].forEach((t, i) => {
    tl.fromTo(chips[i], { opacity: 0, y: 30, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.8)', immediateRender: false }, Math.max(tBasic + 0.1 * i, t - 0.1));
  });

  tl.fromTo(clap, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.6)', immediateRender: false }, tPro - 0.3);
  tl.to(arm, { rotation: 0, duration: 0.14, ease: 'power4.in' }, tPro + 0.1);
  tl.to(clap, { y: 5, duration: 0.06, yoyo: true, repeat: 1 }, tPro + 0.24);
  tl.fromTo(gateFlare, { opacity: 0 }, { opacity: 0.8, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, tPro + 0.24);
  tl.to(proTag, { opacity: 1, duration: 0.4 }, tPro + 0.25);
  tl.to(chips, { opacity: 0.45, duration: 0.5 }, tPro);
  tl.to(cam, { x: -20, duration: 1.4, ease: 'expo.inOut' }, tDir - 0.3);
  tl.to(vid, { boxShadow: '0 30px 80px rgba(0,0,0,.6), 0 0 110px rgba(20,163,139,.7)', duration: 0.5 }, tDir);
  ticks.forEach((tk, i) => tl.fromTo(tk, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.3, ease: 'back.out(2)', immediateRender: false }, tScene - 0.1 + i * 0.08));

  tl.to(pipe, { y: -170, scale: 0.78, opacity: 0.35, duration: 0.8, ease: 'expo.inOut' }, tUrl - 0.6);
  tl.to(cam, { x: 0, duration: 0.8, ease: 'expo.inOut' }, tUrl - 0.6);
  tl.to([...chips, basicTag, clap, proTag], { opacity: 0, y: '+=20', duration: 0.4, ease: 'power2.in' }, tUrl - 0.6);
  tl.to(glowBg, { opacity: 0.6, duration: 0.6 }, tUrl - 0.4);
  tl.fromTo(url, { opacity: 0, scale: 1.25, filter: 'blur(10px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out', immediateRender: false }, tUrl - 0.2);
  tl.fromTo(ul, { opacity: 1, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.5, ease: 'expo.out', immediateRender: false }, tUrl + 0.2);
  tags.forEach((tg, i) => tl.fromTo(tg, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.6)', immediateRender: false }, tUrl + 0.45 + i * 0.1));
});
