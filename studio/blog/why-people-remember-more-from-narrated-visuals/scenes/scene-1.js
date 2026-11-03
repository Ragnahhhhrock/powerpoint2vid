/* Scene 1 of 6: "We take in information through two channels: our eyes and our ears. Each has limited capacity.
 * Show a picture and explain it out loud, and the load is shared."
 * Storyboard: a paper stage with a stylised head in profile, eye and ear marked. The headline "Two channels beat one"
 * sits top-left; the slide's bullet list is cut. On "eyes" a blue stream flows into the eye; on "ears" an amber stream
 * flows into the ear. On "limited capacity" each stream feeds its own vessel, which fills to the brim. On "Show" the
 * vessels drain. Through "picture… explain" both streams pour at once and each vessel settles half full. On "shared"
 * a bright line links the two vessels. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w) => ctx.at(i, w);
  const tTwo = A(0, 'two'), tEyes = A(0, 'eyes'), tEars = A(0, 'ears.');
  const tEach = A(1, 'Each'), tLimited = A(1, 'limited'), tCap = A(1, 'capacity.');
  const tShow = A(2, 'Show'), tPic = A(2, 'picture'), tExplain = A(2, 'explain'), tLoad = A(2, 'load'), tShared = A(2, 'shared.');

  const BLUE = '#3D7BFF', AMBER = '#FFB23D', INK = '#1B2238', CORAL = '#FF5E57';
  const VT = 490, VB = 750, VH = VB - VT;

  stage.style.background = 'radial-gradient(60% 60% at 55% 55%, #fffdf8 0%, var(--paper) 60%, #ece6da 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '1100px 600px' });

  // headline (the slide's bullet list is cut)
  const head = el('div', 'abs', cam, { left: '110px', top: '96px', font: '800 110px/1 Inter Display, Inter', letterSpacing: '-.045em', color: INK, whiteSpace: 'nowrap' });
  const words = ctx.split(head, 'Two channels beat one', 'word');

  const wrap = el('div', 'abs', cam, { inset: 0 });
  wrap.innerHTML = `<svg width="1920" height="1080" viewBox="0 0 1920 1080" style="overflow:visible">
  <defs>
    <clipPath id="cb"><rect x="1306" y="${VT}" width="158" height="${VH - 6}" rx="22"/></clipPath>
    <clipPath id="ca"><rect x="1626" y="${VT}" width="158" height="${VH - 6}" rx="22"/></clipPath>
    <linearGradient id="lb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7aa6ff"/><stop offset="1" stop-color="${BLUE}"/></linearGradient>
    <linearGradient id="la" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd27f"/><stop offset="1" stop-color="${AMBER}"/></linearGradient>
  </defs>
  <path id="headShape" d="M1060 900 L1050 800 C1120 760 1150 680 1150 590 C1150 440 1040 350 900 350 C770 350 690 430 680 540 L640 610 C635 620 640 628 652 630 L680 634 L680 690 C680 720 700 735 730 732 L790 726 L800 800 L810 900 Z"
    fill="#ffffff" stroke="${INK}" stroke-width="6" stroke-linejoin="round" style="filter: drop-shadow(0 30px 40px rgba(27,34,56,.14))"/>
  <path id="bOut" d="M770 540 C900 430 1150 400 1385 470" fill="none" stroke="${BLUE}" stroke-width="6" stroke-linecap="round" opacity=".35"/>
  <path id="aOut" d="M1005 615 C1200 660 1500 380 1705 470" fill="none" stroke="${AMBER}" stroke-width="6" stroke-linecap="round" opacity=".45"/>
  <path id="bOutF" d="M770 540 C900 430 1150 400 1385 470" fill="none" stroke="${BLUE}" stroke-width="9" stroke-linecap="round" stroke-dasharray="2 22" opacity="0"/>
  <path id="aOutF" d="M1005 615 C1200 660 1500 380 1705 470" fill="none" stroke="${AMBER}" stroke-width="9" stroke-linecap="round" stroke-dasharray="2 22" opacity="0"/>
  <path id="bIn" d="M-40 430 C250 400 480 600 705 548" fill="none" stroke="${BLUE}" stroke-width="14" stroke-linecap="round" opacity=".3"/>
  <path id="aIn" d="M-40 820 C400 860 800 760 975 615" fill="none" stroke="${AMBER}" stroke-width="14" stroke-linecap="round" opacity=".4"/>
  <path id="bInF" d="M-40 430 C250 400 480 600 705 548" fill="none" stroke="${BLUE}" stroke-width="14" stroke-linecap="round" stroke-dasharray="3 30" opacity="0" style="filter: drop-shadow(0 0 8px ${BLUE})"/>
  <path id="aInF" d="M-40 820 C400 860 800 760 975 615" fill="none" stroke="${AMBER}" stroke-width="14" stroke-linecap="round" stroke-dasharray="3 30" opacity="0" style="filter: drop-shadow(0 0 8px ${AMBER})"/>
  <g id="eye">
    <circle id="eyeGlow" cx="740" cy="545" r="38" fill="${BLUE}" opacity="0"/>
    <path d="M708 545 Q740 518 772 545 Q740 572 708 545 Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="742" cy="545" r="9" fill="${BLUE}"/>
  </g>
  <g id="ear">
    <circle id="earGlow" cx="992" cy="608" r="42" fill="${AMBER}" opacity="0"/>
    <path d="M972 572 C1012 560 1026 608 1004 632 C994 642 990 652 976 648" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <path d="M984 590 C1000 590 1004 608 994 616" fill="none" stroke="${AMBER}" stroke-width="5" stroke-linecap="round"/>
  </g>
  <g id="vB">
    <rect id="liqB" x="1300" y="${VB}" width="170" height="0" fill="url(#lb)" clip-path="url(#cb)"/>
    <rect x="1300" y="${VT}" width="170" height="${VH}" rx="26" fill="none" stroke="${INK}" stroke-width="6"/>
    <line id="brimB" x1="1290" y1="${VT + 2}" x2="1480" y2="${VT + 2}" stroke="${CORAL}" stroke-width="6" stroke-linecap="round" opacity="0"/>
  </g>
  <g id="vA">
    <rect id="liqA" x="1620" y="${VB}" width="170" height="0" fill="url(#la)" clip-path="url(#ca)"/>
    <rect x="1620" y="${VT}" width="170" height="${VH}" rx="26" fill="none" stroke="${INK}" stroke-width="6"/>
    <line id="brimA" x1="1610" y1="${VT + 2}" x2="1800" y2="${VT + 2}" stroke="${CORAL}" stroke-width="6" stroke-linecap="round" opacity="0"/>
  </g>
  <g id="link" opacity="0">
    <line id="linkLine" x1="1470" y1="620" x2="1620" y2="620" stroke="${INK}" stroke-width="7" stroke-linecap="round" style="filter: drop-shadow(0 0 10px rgba(61,123,255,.7))"/>
    <circle cx="1545" cy="620" r="14" fill="#fff" stroke="${INK}" stroke-width="6"/>
  </g>
</svg>`;
  const $ = (id) => wrap.querySelector('#' + id);
  const headShape = $('headShape'), eye = $('eye'), ear = $('ear');
  const paths = ['bIn', 'aIn', 'bOut', 'aOut'].map((id) => { const p = $(id), L = p.getTotalLength(); p.setAttribute('stroke-dasharray', L + ' ' + L); p.setAttribute('stroke-dashoffset', L); return { p, L }; });
  const flows = ['bInF', 'aInF', 'bOutF', 'aOutF'].map($);
  const liqB = $('liqB'), liqA = $('liqA'), linkLine = $('linkLine');
  const lvl = { b: 0, a: 0 };

  const lab = (x, txt, col) => {
    const d = el('div', 'abs', cam, { left: x - 120 + 'px', width: '240px', top: VB + 30 + 'px', textAlign: 'center', font: '700 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: col });
    d.textContent = txt; return d;
  };
  const labB = lab(1385, 'SEEING', BLUE), labA = lab(1705, 'HEARING', '#d98a12');

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.05 });

  ctx.onFrame((t) => {
    flows.forEach((f, i) => f.setAttribute('stroke-dashoffset', -t * (i < 2 ? 90 : 60)));
    const hb = lvl.b * (VH - 6), ha = lvl.a * (VH - 6);
    liqB.setAttribute('y', VB - hb); liqB.setAttribute('height', hb);
    liqA.setAttribute('y', VB - ha); liqA.setAttribute('height', ha);
  });

  /* ---- timeline ---- */
  tl.to(cam, { scale: 1.04, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.from(headShape, { opacity: 0, y: 30, duration: 0.8 }, 0.05);
  tl.from([eye, ear], { opacity: 0, scale: 0.6, transformOrigin: '50% 50%', duration: 0.6, ease: 'back.out(1.8)', stagger: 0.1 }, 0.3);
  tl.from(words, { opacity: 0, y: 40, duration: 0.7, stagger: 0.08 }, 0.2);
  // "two channels": both senses nudge
  tl.to([eye, ear], { scale: 1.15, transformOrigin: '50% 50%', duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out', stagger: 0.12 }, tTwo);

  // "eyes": blue stream flows into the eye
  tl.to(paths[0].p, { attr: { 'stroke-dashoffset': 0 }, duration: 0.8, ease: 'power2.inOut' }, tEyes - 0.55);
  tl.to(paths[0].p, { opacity: 0.9, duration: 0.4 }, tEyes - 0.2);
  tl.to(flows[0], { opacity: 1, duration: 0.4 }, tEyes);
  tl.fromTo($('eyeGlow'), { opacity: 0, scale: 0.5, transformOrigin: '50% 50%' }, { opacity: 0.22, scale: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, tEyes);
  tl.to(eye, { scale: 1.25, transformOrigin: '50% 50%', duration: 0.3, yoyo: true, repeat: 1 }, tEyes);
  // "ears": amber stream flows into the ear
  tl.to(paths[1].p, { attr: { 'stroke-dashoffset': 0 }, duration: 0.8, ease: 'power2.inOut' }, tEars - 0.55);
  tl.to(paths[1].p, { opacity: 0.9, duration: 0.4 }, tEars - 0.2);
  tl.to(flows[1], { opacity: 1, duration: 0.4 }, tEars);
  tl.fromTo($('earGlow'), { opacity: 0, scale: 0.5, transformOrigin: '50% 50%' }, { opacity: 0.25, scale: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, tEars);
  tl.to(ear, { scale: 1.25, transformOrigin: '50% 50%', duration: 0.3, yoyo: true, repeat: 1 }, tEars);

  // "Each has limited capacity": vessels appear, fill to the brim
  tl.from([$('vB'), $('vA')], { opacity: 0, y: 40, duration: 0.6, ease: 'back.out(1.6)', stagger: 0.1 }, tEach - 0.2);
  tl.from([labB, labA], { opacity: 0, y: 12, duration: 0.5, stagger: 0.1 }, tEach);
  tl.to([paths[2].p, paths[3].p], { attr: { 'stroke-dashoffset': 0 }, duration: 0.6, ease: 'power2.inOut', stagger: 0.08 }, tEach);
  tl.to([flows[2], flows[3]], { opacity: 1, duration: 0.3 }, tEach + 0.5);
  tl.to(lvl, { b: 1, a: 1, duration: tCap + 0.3 - tLimited, ease: 'power1.in' }, tLimited);
  tl.fromTo([$('brimB'), $('brimA')], { opacity: 0 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 3, ease: 'none', immediateRender: false }, tCap + 0.3);
  tl.to([$('vB'), $('vA')], { y: -6, duration: 0.1, yoyo: true, repeat: 1 }, tCap + 0.3);

  // "Show": drain, then "picture" + "explain" pour in together
  tl.to(lvl, { b: 0, a: 0, duration: 0.5, ease: 'power2.in' }, tShow - 0.1);
  tl.to(eye, { scale: 1.2, transformOrigin: '50% 50%', duration: 0.25, yoyo: true, repeat: 1 }, tPic);
  tl.to(ear, { scale: 1.2, transformOrigin: '50% 50%', duration: 0.25, yoyo: true, repeat: 1 }, tExplain);
  tl.to(lvl, { b: 0.5, a: 0.5, duration: tLoad + 0.2 - (tShow + 0.5), ease: 'power1.out' }, tShow + 0.5);

  // "shared": the link line ignites
  tl.set(linkLine, { attr: { x2: 1470 } }, 0);
  tl.to($('link'), { opacity: 1, duration: 0.2 }, tShared - 0.25);
  tl.to(linkLine, { attr: { x2: 1620 }, duration: 0.35, ease: 'power3.out' }, tShared - 0.25);
  tl.to(linkLine, { attr: { stroke: BLUE }, duration: 0.4 }, tShared + 0.1);
  tl.to([$('vB'), $('vA')], { scale: 1.04, transformOrigin: '50% 100%', duration: 0.3, yoyo: true, repeat: 1 }, tShared);
});
