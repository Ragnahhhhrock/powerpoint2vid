/* Scene 4 — "Take the water cycle. Instead of a paragraph read aloud, the diagram carries the structure,
 * the voice carries the explanation, and each stage arrives as it's named."
 * Storyboard: a grey wall of paragraph text on paper sits under a slow push-in. On "instead of a paragraph"
 * it dissolves word by word. The headline "Water moves in a loop / driven by the sun" types in at 90px and
 * a sun rises top-right. Four stages build around a loop, joined by blue arrows: Evaporation on "diagram",
 * Condensation on "structure", Precipitation on "explanation", Collection on "stage". An amber voice waveform
 * appears on "voice". The last arrow closes the loop on "named", then a glowing highlight orbits the
 * finished diagram, lighting each stage as it passes. */
P2V.scene((ctx) => {
  const { tl, el, stage, at, dur } = ctx;
  const T = {
    cycle: at(0, 'cycle.'), paragraph: at(1, 'paragraph'), aloud: at(1, 'aloud,'),
    diagram: at(1, 'diagram'), structure: at(1, 'structure,'), voice: at(1, 'voice'),
    explanation: at(1, 'explanation,'), stage: at(1, 'stage'), named: at(1, 'named.')
  };
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 78% 22%, #fff6e2 0%, rgba(246,243,236,0) 60%), radial-gradient(80% 70% at 40% 70%, #fbf9f4 0%, var(--paper) 70%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 600px' });

  /* ---------- BEFORE: wall of paragraph text ---------- */
  const wall = el('div', 'abs', cam, { left: '360px', top: '250px', width: '1200px', transformOrigin: '50% 40%' });
  const wallTag = el('div', '', wall, { font: `600 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--coral)', marginBottom: '28px' });
  wallTag.textContent = 'BEFORE · A PARAGRAPH READ ALOUD';
  const para = el('div', '', wall, { font: '500 31px/1.55 Inter', color: '#a3a9b6', textAlign: 'justify' });
  const words = ctx.split(para, 'The water cycle describes the continuous movement of water on, above and below the surface of the Earth. Heat from the sun causes water in oceans, lakes and rivers to evaporate, turning it into vapour that rises into the atmosphere, where it cools and condenses into tiny droplets that form clouds. When these droplets combine and grow heavy enough, they fall back to the ground as precipitation, such as rain, sleet, snow or hail, which then collects in oceans, rivers, lakes and underground stores, before the whole process begins again and continues indefinitely.', 'word');

  /* ---------- AFTER: headline ---------- */
  const head = el('div', 'abs', cam, { left: '120px', top: '120px', font: '800 90px/1.02 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  const l1 = el('div', '', head, { whiteSpace: 'pre' });
  const l2 = el('div', '', head, { whiteSpace: 'pre' });
  const chars = [...ctx.split(l1, 'Water moves in a loop', 'char'), ...ctx.split(l2, 'driven by the sun', 'char')];

  /* ---------- sun ---------- */
  const SX = 1660, SY = 215;
  const sunWrap = el('div', 'abs', cam, { left: SX - 160 + 'px', top: SY - 160 + 'px', width: '320px', height: '320px' });
  const halo = el('div', 'abs', sunWrap, { inset: '-40px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,178,61,.45) 0%, rgba(255,178,61,0) 65%)' });
  const rays = el('div', 'abs', sunWrap, { inset: 0 });
  let rs = '';
  for (let i = 0; i < 12; i++) rs += `<line x1="160" y1="40" x2="160" y2="72" stroke="#FFB23D" stroke-width="8" stroke-linecap="round" transform="rotate(${i * 30} 160 160)"/>`;
  rays.innerHTML = `<svg width="320" height="320">${rs}</svg>`;
  el('div', 'abs', sunWrap, { left: '90px', top: '90px', width: '140px', height: '140px', borderRadius: '50%', background: 'radial-gradient(circle at 38% 35%, #ffe1a3 0%, #FFB23D 55%, #f39a1c 100%)', boxShadow: '0 0 70px rgba(255,178,61,.7), 0 20px 50px rgba(243,154,28,.35)' });

  /* ---------- loop geometry ---------- */
  const CX = 960, CY = 700, RX = 560, RY = 200;
  const rad = (d) => d * Math.PI / 180;
  const P = (d) => [CX + RX * Math.cos(rad(d)), CY - RY * Math.sin(rad(d))];
  const gap = (a) => (a % 180 === 0 ? 21 : 27);

  const svgWrap = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const arcs = [0, 90, 180, 270].map((a) => {
    const s = a + gap(a), e = a + 90 - gap((a + 90) % 360);
    const pts = [];
    for (let k = 0; k <= 40; k++) pts.push(P(s + (e - s) * k / 40).map((v) => v.toFixed(1)).join(' '));
    const [ex, ey] = P(e);
    const ang = Math.atan2(-RY * Math.cos(rad(e)), -RX * Math.sin(rad(e))) * 180 / Math.PI;
    return { d: 'M' + pts.join(' L'), ex, ey, ang };
  });
  let ell = '';
  for (let k = 0; k <= 120; k++) ell += (k ? 'L' : 'M') + P(k * 3).map((v) => v.toFixed(1)).join(' ');
  svgWrap.innerHTML = `<svg width="1920" height="1080" style="overflow:visible">
    <path class="track" d="${ell}Z" fill="none" stroke="#9AA3B8" stroke-opacity=".35" stroke-width="3" stroke-dasharray="2 14" stroke-linecap="round"/>
    ${arcs.map((a) => `<path class="arc" d="${a.d}" pathLength="1" fill="none" stroke="#3D7BFF" stroke-width="7" stroke-linecap="round" style="stroke-dasharray:1;stroke-dashoffset:1;filter:drop-shadow(0 4px 10px rgba(61,123,255,.35))"/>
      <g class="head" transform="translate(${a.ex.toFixed(1)} ${a.ey.toFixed(1)})" opacity="0"><path d="M-16 -12 L4 0 L-16 12" transform="rotate(${a.ang.toFixed(1)})" fill="none" stroke="#3D7BFF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>`).join('')}
  </svg>`;
  const track = svgWrap.querySelector('.track');
  const arcEls = [...svgWrap.querySelectorAll('.arc')];
  const heads = [...svgWrap.querySelectorAll('.head')];

  /* ---------- stage nodes ---------- */
  const ICONS = [
    '<path d="M24 52 q-7 -8 0 -16 q7 -8 0 -16 M36 52 q-7 -8 0 -16 q7 -8 0 -16 M48 52 q-7 -8 0 -16 q7 -8 0 -16"/>',
    '<path d="M22 48 h30 a10 10 0 0 0 0 -20 a14 14 0 0 0 -27 -2 a11 11 0 0 0 -3 22 z"/>',
    '<path d="M26 24 l-6 12 M40 22 l-6 12 M52 28 l-6 12 M33 40 l-6 12 M47 42 l-6 12"/>',
    '<path d="M16 32 q5 -6 10 0 t10 0 t10 0 t10 0 M16 46 q5 -6 10 0 t10 0 t10 0 t10 0"/>'
  ];
  const NAMES = ['Evaporation', 'Condensation', 'Precipitation', 'Collection'];
  const nodes = [0, 90, 180, 270].map((a, i) => {
    const [x, y] = P(a);
    const n = el('div', 'abs', cam, { left: x - 165 + 'px', top: y - 54 + 'px', width: '330px', height: '108px' });
    const glow = el('div', 'abs', n, { inset: '-6px', borderRadius: '60px', boxShadow: '0 0 0 4px rgba(61,123,255,.55), 0 0 60px rgba(61,123,255,.55)', opacity: 0 });
    const card = el('div', 'abs', n, { inset: 0, borderRadius: '54px', background: '#fff', boxShadow: '0 24px 50px rgba(27,34,56,.14), 0 2px 6px rgba(27,34,56,.08)' });
    const ic = el('div', 'abs', card, { left: '18px', top: '18px', width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(160deg, #6a9bff, #3D7BFF)', boxShadow: '0 8px 20px rgba(61,123,255,.4)' });
    ic.innerHTML = `<svg width="72" height="72" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">${ICONS[i]}</svg>`;
    const num = el('div', 'abs', card, { left: '108px', top: '24px', font: `600 15px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--mist)' });
    num.textContent = 'STAGE 0' + (i + 1);
    const lab = el('div', 'abs', card, { left: '106px', top: '46px', font: '800 33px/1 Inter', letterSpacing: '-.03em', color: 'var(--ink)' });
    lab.textContent = NAMES[i];
    return { n, glow, a };
  });

  /* ---------- amber voice waveform ---------- */
  const voice = el('div', 'abs', cam, { left: '120px', top: '940px', height: '60px', display: 'flex', alignItems: 'center', gap: '14px' });
  const bars = el('div', '', voice, { display: 'flex', alignItems: 'center', gap: '6px', height: '60px' });
  const barEls = Array.from({ length: 9 }, () => el('div', '', bars, { width: '7px', height: '20px', borderRadius: '4px', background: 'var(--ear-amber)' }));
  const vlab = el('div', '', voice, { font: `600 18px/1 ${MONO}`, letterSpacing: '.16em', color: '#c98a24' });
  vlab.textContent = 'VOICE';

  /* ---------- orbiting highlight ---------- */
  const tail = Array.from({ length: 7 }, (_, k) => el('div', 'abs', cam, {
    left: 0, top: 0, width: 28 - k * 3 + 'px', height: 28 - k * 3 + 'px', borderRadius: '50%',
    background: k ? 'rgba(61,123,255,' + (0.5 - k * 0.06) + ')' : '#fff',
    boxShadow: k ? 'none' : '0 0 0 6px #3D7BFF, 0 0 40px 10px rgba(61,123,255,.8)', opacity: 0 }));
  const orb = { a: 0, k: 0 };

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.05, blend: 'multiply' });

  ctx.onFrame((t) => {
    rays.style.transform = `rotate(${t * 8}deg)`;
    barEls.forEach((b, i) => {
      const h = 12 + 34 * Math.abs(Math.sin(t * (5 + i * 0.9) + i * 1.7)) * (0.5 + 0.5 * Math.sin(t * 2.3 + i));
      b.style.height = h.toFixed(1) + 'px';
    });
    tail.forEach((d, k) => {
      const [x, y] = P(orb.a - k * 3.5);
      const s = 28 - k * 3;
      d.style.transform = `translate(${(x - s / 2).toFixed(1)}px, ${(y - s / 2).toFixed(1)}px)`;
      d.style.opacity = orb.k;
    });
    nodes.forEach((nd) => {
      let dd = Math.abs((((orb.a - nd.a) % 360) + 540) % 360 - 180);
      nd.glow.style.opacity = (Math.max(0, 1 - dd / 32) * orb.k).toFixed(3);
    });
  });

  /* ---------- timeline ---------- */
  tl.to(cam, { scale: 1.035, duration: dur, ease: 'none' }, 0);

  // before: the paragraph
  gsap.set(wall, { filter: 'blur(0px)' });
  tl.from(wall, { opacity: 0, y: 30, duration: 0.5, ease: 'power2.out' }, 0);
  tl.to(wall, { scale: 1.04, duration: T.paragraph, ease: 'power1.inOut' }, 0);
  tl.to(wallTag, { opacity: 0, duration: 0.3 }, T.paragraph - 0.15);
  tl.to(words, { opacity: 0, y: -24, duration: 0.45, ease: 'power2.in', stagger: { each: 0.006, from: 'random' } }, T.paragraph - 0.1);
  tl.to(wall, { filter: 'blur(8px)', duration: 0.9, ease: 'power2.in' }, T.paragraph - 0.1);

  // headline types in
  gsap.set(chars, { opacity: 0 });
  const typeStart = T.aloud;
  tl.to(chars, { opacity: 1, duration: 0.01, ease: 'none', stagger: 0.02 }, typeStart);

  // sun rises
  tl.fromTo(sunWrap, { y: 170, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' }, typeStart + 0.15);
  tl.fromTo(halo, { scale: 0.6 }, { scale: 1, duration: 1.4, ease: 'power2.out', immediateRender: false }, typeStart + 0.3);

  // loop track appears
  gsap.set(track, { opacity: 0 });
  tl.to(track, { opacity: 1, duration: 0.6, ease: 'power2.out' }, T.diagram - 0.3);

  // stages + arrows
  const nodeT = [T.diagram, T.structure, T.explanation, T.stage];
  nodes.forEach((nd, i) => {
    gsap.set(nd.n, { opacity: 0 });
    tl.fromTo(nd.n, { opacity: 0, scale: 0.6, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)', immediateRender: false }, nodeT[i] - 0.05);
    tl.fromTo(nd.glow, { opacity: 0.9 }, { opacity: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, nodeT[i] + 0.1);
  });
  const arcT = [[T.diagram + 0.45, T.structure], [T.voice + 0.15, T.explanation], [T.stage - 0.6, T.stage], [T.named - 0.65, T.named]];
  arcEls.forEach((p, i) => {
    const [s, e] = arcT[i];
    tl.to(p, { strokeDashoffset: 0, duration: e - s, ease: 'power2.inOut' }, s);
    tl.to(heads[i], { opacity: 1, duration: 0.15, ease: 'none' }, e - 0.08);
  });

  // voice waveform
  tl.fromTo(voice, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.6)' }, T.voice - 0.05);

  // loop closes: highlight orbits
  tl.to(orb, { k: 1, duration: 0.4, ease: 'power2.out' }, T.named + 0.05);
  tl.fromTo(orb, { a: 0 }, { a: 360, duration: dur - T.named - 0.05, ease: 'none', immediateRender: false }, T.named + 0.05);
});
