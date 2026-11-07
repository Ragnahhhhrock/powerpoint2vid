/* Scene 2 — "MP4 plays almost everywhere, so it's the safest bet for uploads. WebM is a solid web format,
 * but sometimes needs converting for a specific destination."
 * Storyboard: night stage, wide. A row of device silhouettes (phone, laptop, TV, platform tile).
 * On "almost everywhere" blue lines from the MP4 chip light every device in sequence; "SAFEST BET"
 * badge on "safest", the platform tile pulses on "uploads". Camera glides down; on "solid web format"
 * the green WebM chip lights Chrome, Edge and Firefox. On "sometimes needs converting" its lines to
 * phone and TV draw dashed and flicker, tagged "VARIES"; the LMS tile turns amber: "check your system". */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const BLUE = '#3D7BFF', GREEN = '#2EC4A0', AMBER = '#FFB547', SLATE = '#8A90A6';
  const W = (i, w) => ctx.at(i, w);
  const tMP4 = W(0, 'MP4'), tPlays = W(0, 'plays'), tSafest = W(0, 'safest'), tUploads = W(0, 'uploads.');
  const tWebM = W(1, 'WebM'), tWeb = W(1, 'web'), tSome = W(1, 'sometimes'), tNeeds = W(1, 'needs'),
    tConv = W(1, 'converting'), tSpec = W(1, 'specific'), tDest = W(1, 'destination.');
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background =
    'radial-gradient(55% 50% at 30% 30%, rgba(61,123,255,.13), transparent 70%),' +
    'radial-gradient(55% 50% at 30% 75%, rgba(46,196,160,.10), transparent 70%),' +
    'radial-gradient(90% 80% at 55% 50%, #161a2e 0%, var(--night) 75%)';

  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 50%' });
  const pan = el('div', 'abs', cam, { inset: 0 });

  el('div', 'abs', pan, { left: '-100px', top: '-100px', width: '2120px', height: '1280px', opacity: 0.35,
    backgroundImage: 'radial-gradient(rgba(138,144,166,.25) 1.2px, transparent 1.4px)', backgroundSize: '40px 40px' });

  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', '1920'); svg.setAttribute('height', '1080');
  svg.style.cssText = 'position:absolute;left:0;top:0;overflow:visible';
  pan.appendChild(svg);
  const mkPath = (d, color, width, cap = 'round') => {
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', d); p.setAttribute('fill', 'none'); p.setAttribute('stroke', color);
    p.setAttribute('stroke-width', width); p.setAttribute('stroke-linecap', cap);
    svg.appendChild(p);
    return { p, len: p.getTotalLength() };
  };

  const ICONS = {
    phone: '<rect x="55" y="8" width="50" height="104" rx="11"/><path d="M72 100 H88"/>',
    laptop: '<rect x="25" y="14" width="110" height="72" rx="6"/><path d="M8 96 H152 L142 106 H18 Z"/>',
    tv: '<rect x="10" y="10" width="140" height="84" rx="6"/><path d="M80 94 V110 M58 112 H102"/>',
    platform: '<rect x="20" y="12" width="120" height="96" rx="20"/><path d="M68 40 L102 60 L68 80 Z" fill="currentColor"/>',
    browser: '<rect x="14" y="14" width="132" height="92" rx="10"/><path d="M14 38 H146"/><circle cx="30" cy="26" r="3.5" fill="currentColor"/><circle cx="42" cy="26" r="3.5" fill="currentColor"/><circle cx="54" cy="26" r="3.5" fill="currentColor"/>',
    lms: '<rect x="14" y="14" width="132" height="92" rx="10"/><path d="M80 34 L118 50 L80 66 L42 50 Z"/><path d="M58 58 V78 Q80 90 102 78 V58"/>',
  };
  const mkNode = (kind, label, x, y) => {
    const box = el('div', 'abs', pan, { left: x - 80 + 'px', top: y - 60 + 'px', width: '160px', height: '120px', color: SLATE, opacity: 0.5 });
    box.innerHTML = `<svg width="160" height="120" viewBox="0 0 160 120" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">${ICONS[kind]}</svg>`;
    gsap.set(box, { filter: 'drop-shadow(0 0 0px rgba(0,0,0,0))' });
    const lab = el('div', 'abs', pan, { left: x - 130 + 'px', top: y + 74 + 'px', width: '260px', textAlign: 'center',
      font: `600 19px/1 ${MONO}`, letterSpacing: '.16em', color: SLATE, opacity: 0.7 });
    lab.textContent = label;
    return { box, lab, x, y };
  };

  const TOP = 330, BOT = 760, XS = [800, 1080, 1360, 1640];
  const devices = [['phone', 'PHONES'], ['laptop', 'COMPUTERS'], ['tv', 'TVS'], ['platform', 'PLATFORMS']]
    .map(([k, l], i) => mkNode(k, l, XS[i], TOP));
  const browsers = ['CHROME', 'EDGE', 'FIREFOX'].map((l, i) => mkNode('browser', l, XS[i], BOT));
  const lms = mkNode('lms', 'LMS', XS[3], BOT);
  const check = el('div', 'abs', pan, { left: XS[3] - 150 + 'px', top: BOT + 106 + 'px', width: '300px', textAlign: 'center',
    font: `700 18px/1 ${MONO}`, letterSpacing: '.12em', color: AMBER, opacity: 0 });
  check.textContent = 'CHECK YOUR SYSTEM';

  const mkChip = (txt, y, c1, c2, glow) => {
    const chip = el('div', 'abs', pan, { left: '160px', top: y - 60 + 'px', width: '260px', height: '120px', borderRadius: '22px',
      background: `linear-gradient(140deg, ${c1}, ${c2})`, boxShadow: `0 0 60px ${glow}, 0 30px 60px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.4)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', font: '900 64px/1 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff' });
    chip.textContent = txt;
    return chip;
  };
  const mp4 = mkChip('.MP4', TOP, '#6f9bff', BLUE, 'rgba(61,123,255,.55)');
  const webm = mkChip('.WebM', BOT, '#5fe0c0', '#1f9b7f', 'rgba(46,196,160,.5)');
  const safe = el('div', 'abs', pan, { left: '170px', top: TOP + 84 + 'px', width: '240px', textAlign: 'center', padding: '10px 0',
    borderRadius: '30px', border: `2px solid ${BLUE}`, background: 'rgba(61,123,255,.15)',
    font: `700 19px/1 ${MONO}`, letterSpacing: '.16em', color: '#bcd2ff', opacity: 0 });
  safe.textContent = 'SAFEST BET';

  /* lines (webm lines end below the browser labels so they don't cross the text) */
  const WB_END = 878;
  const mpLines = XS.map((x) => mkPath(`M420 312 C 540 130, ${x - 170} 130, ${x} 250`, BLUE, 5));
  const mpFlow = XS.map((x) => mkPath(`M420 312 C 540 130, ${x - 170} 130, ${x} 250`, '#d6e4ff', 4));
  const wbLines = XS.slice(0, 3).map((x) => mkPath(`M420 778 C 540 990, ${x - 170} 990, ${x} ${WB_END}`, GREEN, 5));
  const wbFlow = XS.slice(0, 3).map((x) => mkPath(`M420 778 C 540 990, ${x - 170} 990, ${x} ${WB_END}`, '#d0fff2', 4));
  const dashTargets = [XS[0], XS[2]];
  const dashLines = dashTargets.map((x) => mkPath(`M420 740 C 580 590, ${x - 140} 580, ${x} 470`, GREEN, 5, 'butt'));
  [...mpLines, ...wbLines].forEach(({ p, len }) => gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 }));
  [...mpFlow, ...wbFlow].forEach(({ p }) => { p.setAttribute('stroke-dasharray', '5 45'); gsap.set(p, { opacity: 0 }); });
  const dashState = dashLines.map(() => ({ p: 0 }));
  const varies = dashLines.map(({ p, len }) => {
    const pt = p.getPointAtLength(len * 0.58);
    const v = el('div', 'abs', pan, { left: pt.x + 'px', top: pt.y + 'px', padding: '8px 16px', borderRadius: '20px',
      background: 'rgba(20,22,31,.92)', border: `2px solid ${AMBER}`, font: `700 18px/1 ${MONO}`, letterSpacing: '.16em', color: AMBER, whiteSpace: 'nowrap' });
    v.textContent = 'VARIES';
    gsap.set(v, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
    return v;
  });
  const ring = el('div', 'abs', pan, { left: XS[3] - 100 + 'px', top: TOP - 100 + 'px', width: '200px', height: '200px', borderRadius: '50%', border: `5px solid ${BLUE}`, opacity: 0 });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    [...mpFlow, ...wbFlow].forEach(({ p }) => p.setAttribute('stroke-dashoffset', String(-t * 110)));
    dashLines.forEach(({ p, len }, i) => {
      const reach = dashState[i].p * len, arr = [];
      let d = 0;
      while (d < reach) { const s = Math.min(16, reach - d); arr.push(s, 12); d += s + 12; }
      arr.push(0, len * 2);
      p.setAttribute('stroke-dasharray', arr.join(' '));
      p.setAttribute('stroke-dashoffset', String(-((t * 30) % 28) * (dashState[i].p >= 1 ? 1 : 0)));
    });
  });

  const lightOn = (n, col, rgba, t) => {
    tl.to(n.box, { color: col, opacity: 1, filter: `drop-shadow(0 0 18px ${rgba})`, duration: 0.35 }, t);
    tl.fromTo(n.box, { scale: 1 }, { scale: 1.12, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, t);
    tl.to(n.lab, { color: '#fff', opacity: 1, duration: 0.3 }, t);
  };

  tl.to(cam, { scale: 1.045, x: -12, duration: ctx.dur, ease: 'none' }, 0);
  tl.from([...devices, ...browsers, lms].flatMap((n) => [n.box, n.lab]), { opacity: 0, y: 20, duration: 0.6, stagger: 0.03 }, 0.05);

  tl.from(mp4, { scale: 0.3, opacity: 0, duration: 0.6, ease: 'back.out(1.8)' }, tMP4 - 0.2);
  mpLines.forEach(({ p }, i) => {
    const t = tPlays + i * 0.28;
    tl.set(p, { opacity: 1 }, t);
    tl.to(p, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' }, t);
    tl.to(mpFlow[i].p, { opacity: 0.8, duration: 0.4 }, t + 0.5);
    lightOn(devices[i], '#a9c4ff', 'rgba(61,123,255,.85)', t + 0.42);
  });
  tl.fromTo(safe, { opacity: 0, y: -12, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(2)', immediateRender: false }, tSafest - 0.05);
  tl.fromTo(ring, { scale: 0.6, opacity: 0.9 }, { scale: 1.6, opacity: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, tUploads);
  tl.fromTo(devices[3].box, { scale: 1 }, { scale: 1.15, duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, tUploads);

  tl.to(pan, { y: -40, duration: 1.2, ease: 'expo.inOut' }, tWebM - 0.7);
  tl.to([mp4, safe, ...mpLines.map((l) => l.p), ...mpFlow.map((l) => l.p)], { opacity: 0.35, duration: 0.6 }, tWebM - 0.3);
  tl.to(devices.map((d) => d.box), { opacity: 0.6, duration: 0.6 }, tWebM - 0.3);
  tl.from(webm, { scale: 0.3, opacity: 0, duration: 0.6, ease: 'back.out(1.8)' }, tWebM - 0.2);

  wbLines.forEach(({ p }, i) => {
    const t = tWeb - 0.25 + i * 0.2;
    tl.set(p, { opacity: 1 }, t);
    tl.to(p, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' }, t);
    tl.to(wbFlow[i].p, { opacity: 0.8, duration: 0.4 }, t + 0.5);
    lightOn(browsers[i], '#9ff0da', 'rgba(46,196,160,.85)', t + 0.42);
  });

  dashState.forEach((s, i) => tl.to(s, { p: 1, duration: 0.7, ease: 'power2.inOut' }, tSome - 0.1 + i * 0.15));
  tl.to([devices[0].box, devices[2].box], { opacity: 1, duration: 0.3 }, tSome + 0.5);
  varies.forEach((v, i) => tl.to(v, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)' }, tNeeds + i * 0.1));
  dashLines.forEach(({ p }, i) => tl.to(p, { opacity: 0.25, duration: 0.07, yoyo: true, repeat: 5, ease: 'none' }, tConv + i * 0.05));

  tl.to(lms.box, { color: AMBER, opacity: 1, filter: 'drop-shadow(0 0 20px rgba(255,181,71,.8))', duration: 0.4 }, tSpec);
  tl.fromTo(lms.box, { scale: 1 }, { scale: 1.12, duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, tSpec);
  tl.to(lms.lab, { color: AMBER, opacity: 1, duration: 0.3 }, tSpec);
  tl.fromTo(check, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.8)', immediateRender: false }, tDest - 0.1);
});
