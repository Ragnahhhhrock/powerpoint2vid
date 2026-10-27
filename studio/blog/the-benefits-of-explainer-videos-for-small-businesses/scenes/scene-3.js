/* Scene 3 — "Pick the spot where a clear explanation would change what people do. That might be your homepage,
 * a welcome email, or the follow-up after a first call."
 * Storyboard: warm paper stage, headline "Start where it changes behaviour" holds above with an amber highlight on "change".
 * An ink journey line draws left to right; a coral customer dot drops on "spot". The camera tracks along the line:
 * browser on "homepage", envelope on "welcome email", sales chat bubble on "follow-up", then a quiet mist
 * "New hires: onboarding" node as the camera pulls back to the whole journey. */
P2V.scene((ctx) => {
  const { tl, el, stage, at } = ctx;
  const tPick = at(0, 'Pick'), tSpot = at(0, 'spot'), tChange = at(0, 'change');
  const s1 = at(1, 'homepage,'), s2 = at(1, 'welcome'), s3 = at(1, 'follow-up');
  const s4 = s3 + 0.8;
  const LINE_Y = 820, NX = [270, 730, 1190, 1650], CW = 380, CT = 330, CH = 380, X0 = 60;
  const mono = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 45% 40%, #fffdf8 0%, var(--paper) 55%, #ece6da 100%)';
  const glow = el('div', 'abs', stage, { left: '-200px', top: '300px', width: '1200px', height: '900px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(242,165,65,.16), transparent)' });
  const glow2 = el('div', 'abs', stage, { left: '1000px', top: '200px', width: '1100px', height: '900px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(43,179,163,.10), transparent)' });

  const cam = el('div', 'abs', stage, { left: 0, top: 0, width: '1920px', height: '1080px', transformOrigin: '0 0' });

  const svgWrap = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  svgWrap.innerHTML = `<svg width="1920" height="1080" style="overflow:visible">
    <path id="jl" d="M${X0} ${LINE_Y} C 400 ${LINE_Y - 18}, 600 ${LINE_Y + 18}, 960 ${LINE_Y} S 1520 ${LINE_Y - 18}, 1860 ${LINE_Y}" pathLength="1"
      fill="none" stroke="#1C2433" stroke-width="5" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1"/>
    <path d="M1846 ${LINE_Y - 12} L1862 ${LINE_Y} L1846 ${LINE_Y + 12}" id="ah" fill="none" stroke="#1C2433" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0"/></svg>`;
  const jl = svgWrap.querySelector('#jl'), ah = svgWrap.querySelector('#ah');

  const LABELS = ['HOMEPAGE', 'WELCOME EMAIL', 'SALES FOLLOW-UP', 'NEW HIRES'];
  const nodes = NX.map((x, i) => {
    const quiet = i === 3;
    const stem = el('div', 'abs', cam, { left: x - 1.5 + 'px', top: CT + CH + 'px', width: '3px', height: LINE_Y - CT - CH + 'px', background: quiet ? 'var(--mist)' : 'var(--ink)', transformOrigin: '50% 100%' });
    const dot = el('div', 'abs', cam, { left: x - 14 + 'px', top: LINE_Y - 14 + 'px', width: '28px', height: '28px', borderRadius: '50%', boxSizing: 'border-box', background: 'var(--paper)', border: `5px solid ${quiet ? 'var(--mist)' : 'var(--ink)'}` });
    const lab = el('div', 'abs', cam, { left: x - 200 + 'px', width: '400px', top: LINE_Y + 40 + 'px', textAlign: 'center', font: mono, letterSpacing: '.14em', color: quiet ? 'var(--mist)' : 'var(--ink)', opacity: 0 });
    lab.textContent = LABELS[i];
    const ring = el('div', 'abs', cam, { left: x - 40 + 'px', top: LINE_Y - 40 + 'px', width: '80px', height: '80px', borderRadius: '50%', border: '4px solid var(--amber)', opacity: 0 });
    return { stem, dot, lab, ring };
  });
  gsap.set(nodes.map((n) => n.stem), { scaleY: 0, opacity: 0 });

  const card = (i, extra) => el('div', 'abs', cam, Object.assign({ left: NX[i] - CW / 2 + 'px', top: CT + 'px', width: CW + 'px', height: CH + 'px', transformOrigin: '50% 100%', opacity: 0 }, extra || {}));
  const playBtn = (parent, size, col) => {
    const b = el('div', 'abs', parent, { left: '50%', top: '50%', width: size + 'px', height: size + 'px', marginLeft: -size / 2 + 'px', marginTop: -size / 2 + 'px', borderRadius: '50%', background: col, boxShadow: '0 8px 24px rgba(0,0,0,.3)' });
    el('div', 'abs', b, { left: size * 0.4 + 'px', top: size * 0.3 + 'px', width: 0, height: 0, borderTop: size * 0.2 + 'px solid transparent', borderBottom: size * 0.2 + 'px solid transparent', borderLeft: size * 0.3 + 'px solid #fff' });
    return b;
  };

  const c1 = card(0, { borderRadius: '18px', background: '#fff', boxShadow: '0 40px 80px rgba(28,36,51,.18), 0 4px 12px rgba(28,36,51,.08)', overflow: 'hidden' });
  const bar = el('div', 'abs', c1, { left: 0, top: 0, right: 0, height: '46px', background: '#efeae1' });
  ['#E8604C', '#F2A541', '#2BB3A3'].forEach((c, k) => el('div', 'abs', bar, { left: 18 + k * 22 + 'px', top: '17px', width: '12px', height: '12px', borderRadius: '50%', background: c }));
  el('div', 'abs', bar, { left: '96px', right: '18px', top: '12px', height: '22px', borderRadius: '11px', background: '#fff' });
  const vid1 = el('div', 'abs', c1, { left: '20px', right: '20px', top: '66px', height: '180px', borderRadius: '12px', background: 'linear-gradient(135deg, #24324a, var(--night))' });
  const prog1 = el('div', 'abs', vid1, { left: '16px', bottom: '14px', width: '0px', height: '5px', borderRadius: '3px', background: 'var(--amber)' });
  const play1 = playBtn(vid1, 64, 'var(--coral)');
  const cap1 = el('div', 'abs', c1, { left: '24px', right: '24px', top: '264px', font: '800 30px/1.12 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)' });
  cap1.textContent = 'What we do in 90 seconds';

  const c2 = card(1, { perspective: '900px' });
  const env = el('div', 'abs', c2, { left: '30px', top: '170px', width: '320px', height: '200px' });
  el('div', 'abs', env, { inset: 0, borderRadius: '10px', background: '#d98f2e', boxShadow: '0 40px 70px rgba(28,36,51,.2)' });
  const letter = el('div', 'abs', env, { left: '24px', top: '14px', width: '272px', height: '210px', borderRadius: '10px', background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,.12)', opacity: 0 });
  const thumb2 = el('div', 'abs', letter, { left: '18px', top: '18px', right: '18px', height: '100px', borderRadius: '8px', background: 'linear-gradient(135deg, #2BB3A3, #1d7f74)' });
  playBtn(thumb2, 48, 'rgba(15,26,43,.85)');
  const cap2 = el('div', 'abs', letter, { left: '18px', right: '18px', top: '134px', font: '800 28px/1.1 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)' });
  cap2.textContent = 'Getting started';
  el('div', 'abs', env, { inset: 0, borderRadius: '10px', background: 'var(--amber)', clipPath: 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)' });
  const flap = el('div', 'abs', env, { left: 0, top: 0, width: '320px', height: '120px', background: '#f6b65e', clipPath: 'polygon(0 0, 100% 0, 50% 100%)', transformOrigin: '50% 0%', zIndex: 3 });

  const c3 = card(2);
  const who = el('div', 'abs', c3, { left: '14px', top: '28px', font: mono, letterSpacing: '.12em', color: 'var(--mist)' });
  who.textContent = 'SALES · AFTER CALL';
  const bubble = el('div', 'abs', c3, { left: '0px', top: '64px', width: '380px', height: '300px', boxSizing: 'border-box', padding: '20px', borderRadius: '26px 26px 26px 6px', background: 'var(--teal)', boxShadow: '0 40px 80px rgba(43,179,163,.3), 0 4px 12px rgba(28,36,51,.1)' });
  const thumb3 = el('div', 'abs', bubble, { left: '20px', right: '20px', top: '20px', height: '160px', borderRadius: '14px', background: 'linear-gradient(135deg, #24324a, var(--night))', overflow: 'hidden' });
  [0, 1, 2].forEach((k) => el('div', 'abs', thumb3, { left: 20 + k * 10 + 'px', top: 20 + k * 10 + 'px', width: '120px', height: '72px', borderRadius: '6px', background: `rgba(247,244,238,${0.15 + k * 0.15})` }));
  playBtn(thumb3, 58, 'var(--coral)');
  const cap3 = el('div', 'abs', bubble, { left: '22px', right: '22px', top: '200px', font: '800 30px/1.12 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff' });
  cap3.textContent = 'Narrated pitch deck';

  const c4 = card(3, { top: CT + 90 + 'px', height: CH - 90 + 'px', borderRadius: '18px', border: '3px dashed var(--mist)', boxSizing: 'border-box', background: 'rgba(154,166,184,.08)' });
  const ic4 = el('div', 'abs', c4, { left: '28px', top: '30px', width: '70px', height: '70px', borderRadius: '50%', border: '4px solid var(--mist)', boxSizing: 'border-box' });
  playBtn(ic4, 40, 'var(--mist)');
  const cap4 = el('div', 'abs', c4, { left: '28px', right: '28px', top: '128px', font: '700 30px/1.15 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--mist)' });
  cap4.textContent = 'New hires: onboarding';

  const cust = el('div', 'abs', cam, { left: X0 - 15 + 'px', top: LINE_Y - 15 + 'px', width: '30px', height: '30px', borderRadius: '50%', background: 'var(--coral)', boxShadow: '0 0 0 8px rgba(232,96,76,.2), 0 0 30px rgba(232,96,76,.6)', opacity: 0, zIndex: 5 });

  const head = el('div', 'abs', stage, { left: '120px', top: '96px', font: '800 76px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const hA = el('span', '', head, { display: 'inline-block' });
  const hWords = ctx.split(hA, 'Start where it ', 'word');
  const hB = el('span', '', head, { display: 'inline-block', backgroundImage: 'linear-gradient(var(--amber), var(--amber))', backgroundRepeat: 'no-repeat', backgroundPosition: '0 88%', backgroundSize: '0% 32%', padding: '0 6px', margin: '0 -6px' });
  hB.textContent = 'changes behaviour';
  const eyebrow = el('div', 'abs', stage, { left: '124px', top: '200px', font: mono, letterSpacing: '.16em', color: 'var(--mist)' });
  eyebrow.textContent = 'WHERE TO PUT YOUR VIDEO';

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.06 });

  const camAt = (s, focusX, screenX) => ({ scale: s, x: screenX - focusX * s, y: 600 - 560 * s });
  const camC = (s) => ({ scale: s, x: 960 - 960 * s, y: 600 - 560 * s });
  gsap.set(cam, camC(0.94));
  tl.to(cam, Object.assign(camC(0.97), { duration: s1 - 0.7, ease: 'none' }), 0);
  tl.to([glow, glow2], { x: 60, duration: ctx.dur, ease: 'none' }, 0);

  tl.from(hWords, { y: 40, opacity: 0, duration: 0.6, stagger: 0.07, ease: 'back.out(1.6)' }, 0.1);
  tl.from(hB, { y: 40, opacity: 0, duration: 0.6, ease: 'back.out(1.6)' }, 0.3);
  tl.from(eyebrow, { opacity: 0, x: -20, duration: 0.6 }, 0.5);
  tl.to(hB, { backgroundSize: '100% 32%', duration: 0.7, ease: 'power2.inOut' }, tChange - 0.1);

  tl.from(nodes.map((n) => n.dot), { scale: 0, duration: 0.5, stagger: 0.5, ease: 'back.out(2)' }, tPick + 0.4);
  tl.to(jl, { attr: { 'stroke-dashoffset': 0 }, duration: 3.2, ease: 'power1.inOut' }, tPick - 0.2);
  tl.to(ah, { attr: { opacity: 1 }, duration: 0.3 }, tPick + 2.9);

  tl.fromTo(cust, { opacity: 0, y: -120, scale: 0.5 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'bounce.out' }, tSpot - 0.1);
  tl.to(cust, { x: 80, duration: 2.4, ease: 'power1.inOut' }, tSpot + 0.6);

  const S = 1.35;
  const stops = [[s1, 0, 620], [s2, 1, 960], [s3, 2, 1250]];
  const cards = [c1, c2, c3];
  stops.forEach(([t, i, sx]) => {
    tl.to(cam, Object.assign(camAt(S, NX[i], sx), { duration: 0.9, ease: 'expo.inOut' }), t - 0.65);
    tl.to(cust, { x: NX[i] - X0, duration: 0.9, ease: 'power2.inOut' }, t - 0.8);
    tl.fromTo(nodes[i].ring, { scale: 0.4, opacity: 1 }, { scale: 1.8, opacity: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, t);
    tl.to(nodes[i].dot, { backgroundColor: '#F2A541', duration: 0.3 }, t);
    tl.to(nodes[i].stem, { scaleY: 1, opacity: 1, duration: 0.35 }, t - 0.05);
    tl.fromTo(nodes[i].lab, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, immediateRender: false }, t + 0.1);
    tl.fromTo(cards[i], { opacity: 0, scale: 0.6, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.7)', immediateRender: false }, t);
  });

  tl.from(play1, { scale: 0, duration: 0.5, ease: 'back.out(2.2)' }, s1 + 0.3);
  tl.to(prog1, { width: '308px', duration: ctx.dur - s1 - 0.5, ease: 'none' }, s1 + 0.5);
  tl.to(flap, { rotationX: 180, duration: 0.5, ease: 'power2.inOut' }, s2 + 0.25);
  tl.set(flap, { zIndex: 0 }, s2 + 0.5);
  tl.set(letter, { zIndex: 1 }, s2 + 0.5);
  tl.fromTo(letter, { opacity: 0, y: 0 }, { opacity: 1, y: -170, duration: 0.7, ease: 'back.out(1.5)', immediateRender: false }, s2 + 0.5);
  tl.from(who, { opacity: 0, x: -14, duration: 0.4 }, s3 + 0.2);
  tl.from(thumb3, { scale: 0.85, opacity: 0, duration: 0.5, ease: 'back.out(1.8)' }, s3 + 0.25);

  tl.to(cam, Object.assign(camC(0.94), { duration: 1.1, ease: 'expo.inOut' }), s3 + 0.7);
  tl.to(cust, { x: NX[3] - X0, duration: 1.0, ease: 'power2.inOut' }, s3 + 0.6);
  tl.to(nodes[3].stem, { opacity: 0.8, scaleY: 1, duration: 0.6 }, s4);
  tl.to(nodes[3].lab, { opacity: 1, duration: 0.6 }, s4);
  tl.fromTo(c4, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, s4);
  tl.to(cam, Object.assign(camC(0.96), { duration: Math.max(0.3, ctx.dur - (s3 + 1.8)), ease: 'power1.out' }), s3 + 1.8);
});
