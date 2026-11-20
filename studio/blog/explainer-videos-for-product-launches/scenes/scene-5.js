/* Scene 5 (final): "Your speaker notes become the voiceover. On Pro, a.i. directs each animated scene,
 * so the reveal feels produced. Try Basic first at powerpoint2vid.com."
 * Storyboard: on paper, the deck's slide sits with its speaker notes beneath. On "voiceover" the note
 * text lifts away letter by letter and becomes a live signal-blue soundwave. On "directs" the slide flips
 * into a play-ready video frame, an orange spark traces its edge, and the stage dissolves to night.
 * On "Try" the frame recedes and "Try Basic first" lands at 130px with "powerpoint2vid.com" in mint
 * at 64px below. The spark settles as an underline, and the call to action holds for over two seconds. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const voice = ctx.at(0, 'voiceover'), directs = ctx.at(1, 'directs'), produced = ctx.at(1, 'produced');
  const tryT = ctx.at(2, 'Try');
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 50% 40%, #ffffff 0%, var(--paper) 70%)';
  const night = el('div', 'abs', stage, { inset: 0, opacity: 0,
    background: 'radial-gradient(60% 55% at 50% 42%, #1d2540 0%, var(--night) 75%)' });
  const nightGlow = el('div', 'abs', stage, { inset: 0, opacity: 0, mixBlendMode: 'screen',
    background: 'radial-gradient(30% 30% at 50% 40%, rgba(255,90,54,.18), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 480px' });

  const CX = 460, CY = 120, CW = 1000, CH = 562;
  const persp = el('div', 'abs', cam, { left: CX + 'px', top: CY + 'px', width: CW + 'px', height: CH + 'px', perspective: '2200px' });
  const front = el('div', 'abs', persp, { inset: 0, background: '#fff', borderRadius: '18px', boxShadow: '0 40px 90px rgba(27,34,51,.18), 0 2px 0 rgba(27,34,51,.05)', overflow: 'hidden' });
  const fTitle = el('div', 'abs', front, { left: '70px', top: '70px', width: '860px', font: '800 50px/1.1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--ink)' });
  fTitle.textContent = 'From launch deck to launch video';
  ['Speaker notes become the voiceover', 'On Pro, a.i. directs each scene', 'Try Basic first'].forEach((s, i) => {
    const r = el('div', 'abs', front, { left: '70px', top: 200 + i * 66 + 'px', font: '500 30px/1 Inter', color: '#4a5266', display: 'flex', alignItems: 'center', gap: '18px' });
    el('span', '', r, { width: '12px', height: '12px', borderRadius: '50%', background: 'var(--signal)', display: 'inline-block' });
    el('span', '', r).textContent = s;
  });
  const fTag = el('div', 'abs', front, { right: '40px', bottom: '34px', font: `600 18px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--haze)' });
  fTag.textContent = 'SLIDE 6';

  const back = el('div', 'abs', persp, { inset: 0, borderRadius: '18px', overflow: 'hidden',
    background: 'linear-gradient(160deg, #222b44 0%, #121829 100%)', boxShadow: '0 50px 120px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.06)' });
  el('div', 'abs', back, { inset: 0, background: 'radial-gradient(50% 60% at 50% 45%, rgba(61,123,255,.22), transparent 70%)' });
  const play = el('div', 'abs', back, { left: CW / 2 - 70 + 'px', top: CH / 2 - 90 + 'px', width: '140px', height: '140px', borderRadius: '50%',
    background: 'var(--launch)', boxShadow: '0 0 70px rgba(255,90,54,.6)' });
  el('div', 'abs', play, { left: '54px', top: '40px', width: 0, height: 0, borderTop: '30px solid transparent', borderBottom: '30px solid transparent', borderLeft: '48px solid #fff' });
  const bTag = el('div', 'abs', back, { left: '40px', top: '36px', font: `600 18px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--haze)' });
  bTag.textContent = 'AI DIRECTED · SCENE 6';
  const track = el('div', 'abs', back, { left: '40px', right: '40px', bottom: '44px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.12)' });
  const prog = el('div', 'abs', track, { left: 0, top: 0, bottom: 0, width: '100%', borderRadius: '3px', background: 'var(--launch)', transformOrigin: '0% 50%' });

  const PER = 2 * (CW + CH);
  const traceWrap = el('div', 'abs', cam, { left: CX - 10 + 'px', top: CY - 10 + 'px', width: CW + 20 + 'px', height: CH + 20 + 'px', pointerEvents: 'none' });
  traceWrap.innerHTML = `<svg width="${CW + 20}" height="${CH + 20}"><rect x="10" y="10" width="${CW}" height="${CH}" rx="18" fill="none" stroke="#FF5A36" stroke-width="5" stroke-dasharray="${PER} ${PER}" stroke-dashoffset="${PER}" style="filter:drop-shadow(0 0 10px rgba(255,90,54,.8))"/></svg>`;
  const traceRect = traceWrap.querySelector('rect');
  const spark = el('div', 'abs', cam, { left: 0, top: 0, width: '22px', height: '22px', marginLeft: '-11px', marginTop: '-11px', borderRadius: '50%',
    background: '#fff', boxShadow: '0 0 0 5px rgba(255,90,54,.9), 0 0 40px 12px rgba(255,90,54,.8)', opacity: 0 });
  const sp = { p: 0, x: CX, y: CY, free: 0 };
  const perim = (p) => {
    let d = p * PER;
    if (d < CW) return [CX + d, CY]; d -= CW;
    if (d < CH) return [CX + CW, CY + d]; d -= CH;
    if (d < CW) return [CX + CW - d, CY + CH]; d -= CW;
    return [CX, CY + CH - d];
  };

  const notes = el('div', 'abs', cam, { left: CX + 'px', top: '730px', width: CW + 'px', height: '230px', borderRadius: '16px',
    background: 'rgba(255,255,255,.7)', border: '1px solid rgba(27,34,51,.08)' });
  const nLab = el('div', 'abs', notes, { left: '40px', top: '32px', font: `600 18px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--haze)' });
  nLab.textContent = 'SPEAKER NOTES';
  const nText = el('div', 'abs', notes, { left: '40px', top: '82px', width: '920px', font: '500 36px/1.2 Inter', letterSpacing: '-.01em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const chars = ctx.split(nText, 'Your speaker notes become the voiceover.', 'char');
  const bars = [0, 1].map((i) => el('div', 'abs', notes, { left: '40px', top: 150 + i * 30 + 'px', width: (i ? 520 : 760) + 'px', height: '12px', borderRadius: '6px', background: 'rgba(27,34,51,.08)' }));

  const waveBox = el('div', 'abs', cam, { left: CX + 'px', top: '730px', width: CW + 'px', height: '230px', pointerEvents: 'none' });
  waveBox.innerHTML = `<svg width="${CW}" height="230"><path id="w2" fill="none" stroke="rgba(61,123,255,.35)" stroke-width="3" stroke-linecap="round"/><path id="w1" fill="none" stroke="#3D7BFF" stroke-width="6" stroke-linecap="round" style="filter:drop-shadow(0 0 12px rgba(61,123,255,.7))"/></svg>`;
  const w1 = waveBox.querySelector('#w1'), w2 = waveBox.querySelector('#w2');
  const wave = { amp: 0 };

  const cta = el('div', 'abs', stage, { left: '120px', width: '1680px', top: '330px', textAlign: 'center' });
  const head = el('div', '', cta, { font: '900 130px/1 Inter Display, Inter', letterSpacing: '-.045em', color: '#fff' });
  const words = ctx.split(head, 'Try Basic first', 'word');
  const url = el('div', '', cta, { font: '700 64px/1 Inter Display, Inter', letterSpacing: '-.02em', color: 'var(--mint)', marginTop: '70px', textShadow: '0 0 40px rgba(47,198,154,.35)' });
  url.textContent = 'powerpoint2vid.com';
  const uline = el('div', 'abs', stage, { left: '760px', width: '400px', top: '505px', height: '6px', borderRadius: '3px', background: 'var(--launch)',
    boxShadow: '0 0 24px rgba(255,90,54,.8)', transformOrigin: '0% 50%' });

  ctx.fx.vignette({ strength: 0.45 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    const N = 120; let a = '', b = '';
    for (let i = 0; i <= N; i++) {
      const x = 40 + (i / N) * (CW - 80), u = i / N;
      const env = Math.sin(Math.PI * u) ** 1.2;
      const y1 = 115 + wave.amp * env * (Math.sin(u * 22 - t * 7) * 0.6 + Math.sin(u * 47 + t * 11) * 0.3 + Math.sin(u * 9 + t * 3) * 0.25);
      const y2 = 115 + wave.amp * 0.7 * env * Math.sin(u * 15 + t * 5 + 1.3);
      a += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y1.toFixed(1);
      b += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y2.toFixed(1);
    }
    w1.setAttribute('d', a); w2.setAttribute('d', b);
    const [px, py] = perim(sp.p % 1);
    const x = px + (sp.x - px) * sp.free, y = py + (sp.y - py) * sp.free;
    spark.style.transform = `translate(${x}px, ${y}px)`;
  });

  gsap.set(back, { rotationY: -90, opacity: 0 });
  gsap.set(prog, { scaleX: 0 });
  gsap.set(cta, { opacity: 1 });
  gsap.set(words, { opacity: 0, y: 70 });
  gsap.set(url, { opacity: 0, y: 30 });
  gsap.set(uline, { scaleX: 0 });
  gsap.set(waveBox, { opacity: 0 });
  gsap.set([persp, notes, traceWrap], { filter: 'blur(0px)' });

  tl.from(persp, { y: 40, opacity: 0, duration: 0.6, ease: 'expo.out' }, 0.05);
  tl.from(notes, { y: 40, opacity: 0, duration: 0.6, ease: 'expo.out' }, 0.2);
  tl.to(cam, { scale: 1.035, duration: directs - 0.2, ease: 'power1.inOut' }, 0.2);

  tl.to(chars, { y: -40, opacity: 0, duration: 0.45, stagger: 0.012, ease: 'power2.in' }, voice - 0.35);
  tl.to(bars, { scaleX: 0, opacity: 0, transformOrigin: '0% 50%', duration: 0.4, ease: 'power2.in' }, voice - 0.2);
  tl.to(waveBox, { opacity: 1, duration: 0.25, ease: 'power2.out' }, voice - 0.05);
  tl.to(wave, { amp: 62, duration: 0.7, ease: 'expo.out' }, voice);
  tl.to(nLab, { color: '#3D7BFF', duration: 0.3 }, voice);

  tl.to(front, { rotationY: 90, duration: 0.3, ease: 'power2.in' }, directs - 0.3);
  tl.set(front, { opacity: 0 }, directs);
  tl.to(back, { rotationY: 0, opacity: 1, duration: 0.7, ease: 'expo.out' }, directs);
  tl.to(night, { opacity: 1, duration: 1.0, ease: 'power2.inOut' }, directs - 0.1);
  tl.to(nightGlow, { opacity: 1, duration: 1.2 }, directs + 0.3);
  tl.to(notes, { background: 'rgba(255,255,255,.04)', borderColor: 'rgba(255,255,255,.08)', duration: 1.0 }, directs);
  tl.to(cam, { scale: 1, duration: 1.2, ease: 'expo.inOut' }, directs);
  tl.to(spark, { opacity: 1, duration: 0.15 }, directs + 0.35);
  tl.to(sp, { p: 1, duration: 1.6, ease: 'power2.inOut' }, directs + 0.35);
  tl.to(traceRect, { attr: { 'stroke-dashoffset': 0 }, duration: 1.6, ease: 'power2.inOut' }, directs + 0.35);
  tl.to(prog, { scaleX: 1, duration: tryT - (directs + 0.6), ease: 'none' }, directs + 0.6);
  tl.fromTo(play, { scale: 1 }, { scale: 1.12, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, produced);

  tl.to([persp, traceWrap], { scale: 0.7, y: -80, opacity: 0, filter: 'blur(8px)', duration: 0.5, ease: 'power3.in' }, tryT - 0.45);
  tl.to([notes, waveBox], { y: 80, opacity: 0, duration: 0.45, ease: 'power3.in' }, tryT - 0.45);
  tl.to(words, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'expo.out' }, tryT);
  tl.to(sp, { free: 1, x: 760, y: 508, duration: 0.6, ease: 'expo.inOut' }, tryT - 0.3);
  tl.to(sp, { x: 1160, duration: 0.5, ease: 'expo.out' }, tryT + 0.35);
  tl.to(uline, { scaleX: 1, duration: 0.5, ease: 'expo.out' }, tryT + 0.35);
  tl.to(spark, { scale: 0.6, duration: 0.4 }, tryT + 0.85);
  tl.to(url, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, tryT + 0.7);
  tl.to(cta, { scale: 1.025, duration: ctx.dur - tryT, ease: 'power1.out', transformOrigin: '50% 40%' }, tryT);
});
