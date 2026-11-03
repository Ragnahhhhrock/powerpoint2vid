/* Scene 2 — "A PDF deck makes readers do everything with their eyes. Narration moves the explaining
 * to audio, and the voice tells viewers where to look, and when."
 * Storyboard: split screen on paper. Left is a dense page: grey text lines around a three-step diagram.
 * Right are eye and ear with capacity bars. The blue stream strains on "everything with their eyes".
 * On "moves the explaining to audio" the text lines slide off the page edge into an amber wave flowing to
 * the ear, leaving the clean diagram. On "where to look, and when" an amber spotlight glides across
 * the nodes. Headline "Let the visual show" lands at the end. */
P2V.scene((ctx) => {
  const { tl, el, stage, at } = ctx;
  const T = {
    pdf: at(0, 'PDF'), every: at(0, 'everything'), eyes: at(0, 'eyes.'),
    narr: at(1, 'Narration'), moves: at(1, 'moves'), explaining: at(1, 'explaining'), audio: at(1, 'audio,'),
    voice: at(1, 'voice'), where: at(1, 'where'), when: at(1, 'when.')
  };
  const NS = 'http://www.w3.org/2000/svg';
  const mono = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 70% at 30% 55%, #ffffff 0%, var(--paper) 60%, #e9e4d8 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 600px' });

  const PL = 200, PT = 250, PW = 640, PH = 720;
  const pageTag = el('div', 'abs', cam, { left: PL + 'px', top: PT - 46 + 'px', font: mono, letterSpacing: '.14em', color: 'var(--mist)' });
  pageTag.textContent = 'PDF DECK';
  const page = el('div', 'abs', cam, { left: PL + 'px', top: PT + 'px', width: PW + 'px', height: PH + 'px', background: '#fff', borderRadius: '14px', overflow: 'hidden',
    boxShadow: '0 40px 90px rgba(27,34,56,.18), 0 4px 14px rgba(27,34,56,.08)' });

  const rnd = ctx.rand(7);
  const lines = [];
  const addLine = (y, w, h = 14, c = '#c9ccd6') => {
    const d = el('div', 'abs', page, { left: '40px', top: y + 'px', width: w + 'px', height: h + 'px', borderRadius: '7px', background: c, transformOrigin: '0% 50%' });
    lines.push({ d, y }); return d;
  };
  addLine(40, 380, 26, '#9aa0b2');
  for (let i = 0; i < 5; i++) addLine(92 + i * 26, 470 + rnd() * 90);
  for (let i = 0; i < 7; i++) addLine(520 + i * 26, i === 6 ? 300 : 460 + rnd() * 100);

  const DX = 40, DY = 240, DW = 560, DH = 260;
  const diag = document.createElementNS(NS, 'svg');
  diag.setAttribute('width', DW); diag.setAttribute('height', DH);
  Object.assign(diag.style, { position: 'absolute', left: DX + 'px', top: DY + 'px', overflow: 'visible', transformOrigin: '50% 50%' });
  page.appendChild(diag);
  const NX = [90, 280, 470], NY = 130, R = 58;
  diag.innerHTML = `
    <defs><marker id="ah" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto"><path d="M0 0 L8 5 L0 10z" fill="#1B2238"/></marker></defs>
    <path d="M${NX[0] + R + 8} ${NY} L${NX[1] - R - 14} ${NY}" stroke="#1B2238" stroke-width="5" marker-end="url(#ah)"/>
    <path d="M${NX[1] + R + 8} ${NY} L${NX[2] - R - 14} ${NY}" stroke="#1B2238" stroke-width="5" marker-end="url(#ah)"/>
    ${NX.map((x, i) => `<circle id="n${i}" cx="${x}" cy="${NY}" r="${R}" fill="#EEF3FF" stroke="#3D7BFF" stroke-width="5"/>`).join('')}
    <circle cx="${NX[0]}" cy="${NY}" r="20" fill="#3D7BFF"/>
    <rect x="${NX[1] - 20}" y="${NY - 20}" width="40" height="40" rx="6" fill="#3D7BFF"/>
    <path d="M${NX[2]} ${NY - 24} L${NX[2] + 23} ${NY + 18} L${NX[2] - 23} ${NY + 18}z" fill="#3D7BFF"/>`;
  const nodes = [0, 1, 2].map((i) => diag.querySelector('#n' + i));

  const EYE = [1400, 440], EAR = [1400, 790];
  const viewTag = el('div', 'abs', cam, { left: '1300px', top: PT - 46 + 'px', font: mono, letterSpacing: '.14em', color: 'var(--mist)' });
  viewTag.textContent = 'VIEWER';
  const eye = el('div', 'abs', cam, { left: EYE[0] - 100 + 'px', top: EYE[1] - 70 + 'px', width: '200px', height: '140px' });
  eye.innerHTML = `<svg width="200" height="140" viewBox="0 0 200 140"><path d="M10 70 Q100 -10 190 70 Q100 150 10 70z" fill="#fff" stroke="#1B2238" stroke-width="7" stroke-linejoin="round"/>
    <circle id="iris" cx="100" cy="70" r="34" fill="#3D7BFF"/><circle id="pupil" cx="100" cy="70" r="14" fill="#0E1424"/><circle cx="112" cy="58" r="6" fill="#fff"/></svg>`;
  const pupil = eye.querySelector('#pupil');
  const ear = el('div', 'abs', cam, { left: EAR[0] - 70 + 'px', top: EAR[1] - 95 + 'px', width: '140px', height: '190px' });
  ear.innerHTML = `<svg width="140" height="190" viewBox="0 0 140 190"><path d="M30 75 C30 20 120 10 120 75 C120 115 85 115 80 145 C76 175 40 180 32 155" fill="none" stroke="#1B2238" stroke-width="9" stroke-linecap="round"/>
    <path d="M58 80 C58 50 95 50 95 78 C95 98 72 98 72 115" fill="none" stroke="#FFB23D" stroke-width="8" stroke-linecap="round"/></svg>`;

  const mkBar = (cy, label) => {
    const wrap = el('div', 'abs', cam, { left: '1560px', top: cy - 100 + 'px', width: '24px', height: '200px', borderRadius: '12px', background: 'rgba(27,34,56,.08)', overflow: 'hidden' });
    const fill = el('div', 'abs', wrap, { left: 0, bottom: 0, width: '100%', height: '0%', borderRadius: '12px' });
    const lab = el('div', 'abs', cam, { left: '1612px', top: cy - 10 + 'px', font: mono, letterSpacing: '.14em', color: 'var(--ink)' });
    lab.textContent = label;
    return { wrap, fill, lab };
  };
  const eyeBar = mkBar(EYE[1], 'EYES'), earBar = mkBar(EAR[1], 'EARS');

  const sv = document.createElementNS(NS, 'svg');
  sv.setAttribute('width', 1920); sv.setAttribute('height', 1080);
  Object.assign(sv.style, { position: 'absolute', left: 0, top: 0, overflow: 'visible' });
  cam.appendChild(sv);
  const mkPath = (col, w, dash) => {
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('fill', 'none'); p.setAttribute('stroke', col); p.setAttribute('stroke-width', w);
    p.setAttribute('stroke-linecap', 'round'); if (dash) p.setAttribute('stroke-dasharray', dash);
    sv.appendChild(p); return p;
  };
  const blue = [0, 1, 2].map(() => mkPath('#3D7BFF', 6, '22 18'));
  const amber = [0, 1].map((k) => mkPath('#FFB23D', k ? 4 : 7, k ? '6 14' : ''));

  const sx = (i, sc) => PL + DX + DW / 2 + (NX[i] - DW / 2) * sc;
  const syC = PT + DY + NY;
  const spot = el('div', 'abs', cam, { left: 0, top: 0, width: '190px', height: '190px', marginLeft: '-95px', marginTop: '-95px', borderRadius: '50%',
    background: 'radial-gradient(circle, transparent 0%, transparent 52%, rgba(255,178,61,.22) 62%, transparent 74%)', border: '5px solid #FFB23D',
    boxShadow: '0 0 60px rgba(255,178,61,.6)', opacity: 0 });

  const head = el('div', 'abs', stage, { left: '80px', right: '80px', top: '70px', textAlign: 'center', font: '800 100px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  head.innerHTML = 'Let the visual <span style="color:var(--eye-blue)">show</span>';

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.06, blend: 'multiply' });

  const S = { blueOn: 0, strain: 0, eyeLoad: 0, earLoad: 0, amp: 0, ampOn: 0 };
  const lerp = (a, b, k) => a + (b - a) * k;
  ctx.onFrame((t) => {
    const x0 = PL + PW + 20, x1 = EYE[0] - 115;
    blue.forEach((p, k) => {
      let d = '';
      for (let x = x0; x <= x1; x += 12) {
        const u = (x - x0) / (x1 - x0);
        const base = lerp(470 + (k - 1) * 40, EYE[1] + (k - 1) * 10, u);
        const j = S.strain * (Math.sin(x * 0.21 + t * 37 + k * 2) * 9 + Math.sin(x * 0.07 - t * 23) * 6);
        d += (d ? ' L' : 'M') + x.toFixed(1) + ' ' + (base + Math.sin(x * 0.03 - t * 4 + k) * 4 + j).toFixed(1);
      }
      p.setAttribute('d', d);
      p.setAttribute('stroke-dashoffset', (-t * (90 + 260 * S.strain)).toFixed(1));
      const flick = S.strain * (0.5 + 0.5 * Math.sin(t * 53 + k * 1.7)) * 0.7;
      p.setAttribute('opacity', (S.blueOn * (1 - flick)).toFixed(3));
      p.setAttribute('stroke', S.strain > 0.6 && Math.sin(t * 31 + k) > 0.6 ? '#FF5E57' : '#3D7BFF');
    });
    const a0 = PL + PW + 20, a1 = EAR[0] - 85, reach = lerp(a0, a1, S.ampOn);
    amber.forEach((p, k) => {
      let d = '';
      for (let x = a0; x <= reach + 0.1; x += 8) {
        const u = (x - a0) / (a1 - a0);
        const y = lerp(PT + 560, EAR[1], u) + Math.sin(x * 0.045 - t * 6 + k * 1.2) * S.amp * (k ? 0.6 : 1) * Math.sin(Math.PI * Math.min(1, u * 1.1 + 0.05));
        d += (d ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
      }
      p.setAttribute('d', d || 'M0 0');
      p.setAttribute('opacity', S.ampOn > 0.01 ? 1 : 0);
      if (k) p.setAttribute('stroke-dashoffset', (-t * 120).toFixed(1));
    });
    const jx = S.strain * Math.sin(t * 47) * 5, jy = S.strain * Math.cos(t * 41) * 3;
    eye.style.transform = `translate(${jx.toFixed(2)}px, ${jy.toFixed(2)}px)`;
    pupil.setAttribute('r', (14 - 6 * S.strain).toFixed(2));
    eyeBar.fill.style.height = (S.eyeLoad * 100).toFixed(1) + '%';
    eyeBar.fill.style.background = S.eyeLoad > 0.82 ? '#FF5E57' : '#3D7BFF';
    earBar.fill.style.height = (S.earLoad * 100).toFixed(1) + '%';
    earBar.fill.style.background = '#FFB23D';
  });

  gsap.set(head, { opacity: 0, y: 30 });
  tl.from(page, { x: -60, opacity: 0, duration: 0.6, ease: 'power3.out' }, 0);
  tl.from(pageTag, { opacity: 0, duration: 0.5 }, 0.15);
  tl.from(lines.map((l) => l.d), { scaleX: 0, duration: 0.5, stagger: 0.025 }, 0.1);
  tl.from(diag, { opacity: 0, scale: 0.9, duration: 0.6, ease: 'back.out(1.6)' }, 0.25);
  tl.to(cam, { scale: 1.03, duration: ctx.dur, ease: 'none' }, 0);

  tl.from([eye, ear], { opacity: 0, scale: 0.7, duration: 0.6, ease: 'back.out(1.8)', stagger: 0.12 }, T.pdf - 0.1);
  tl.from([viewTag, eyeBar.wrap, earBar.wrap, eyeBar.lab, earBar.lab], { opacity: 0, duration: 0.5, stagger: 0.05 }, T.pdf + 0.1);
  tl.to(S, { blueOn: 1, duration: 0.6, ease: 'power2.out' }, T.pdf + 0.2);
  tl.to(S, { eyeLoad: 0.4, duration: 0.8 }, T.pdf + 0.3);

  tl.to(S, { strain: 1, eyeLoad: 1, duration: T.eyes - T.every + 0.3, ease: 'power2.in' }, T.every - 0.1);
  tl.to(eyeBar.wrap, { boxShadow: '0 0 30px rgba(255,94,87,.7)', duration: 0.3 }, T.eyes);

  // text slides off the right page edge (clipped by page) and becomes the amber wave
  lines.forEach((l, i) => {
    const t0 = T.moves - 0.15 + i * 0.04;
    tl.to(l.d, { backgroundColor: '#FFB23D', duration: 0.2, ease: 'none' }, t0);
    tl.to(l.d, { x: PW - 40, y: (560 - l.y) * 0.6, scaleX: 0.2, scaleY: 0.6, duration: 0.7, ease: 'power2.in' }, t0);
    tl.to(l.d, { opacity: 0, duration: 0.15 }, t0 + 0.6);
  });
  tl.to(S, { ampOn: 1, duration: 1.0, ease: 'power2.inOut' }, T.moves + 0.1);
  tl.to(S, { amp: 26, duration: 0.9, ease: 'power2.out' }, T.moves + 0.2);
  tl.to(diag, { scale: 1.15, duration: 0.9, ease: 'expo.inOut' }, T.explaining);
  tl.to(S, { strain: 0, eyeLoad: 0.5, earLoad: 0.5, duration: 0.8, ease: 'power2.out' }, T.audio - 0.15);
  tl.to(eyeBar.wrap, { boxShadow: '0 0 0px rgba(255,94,87,0)', duration: 0.4 }, T.audio);
  tl.fromTo(ear, { scale: 1 }, { scale: 1.12, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, T.audio + 0.1);

  const SC = 1.15;
  gsap.set(spot, { x: sx(0, SC), y: syC });
  tl.fromTo(spot, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, T.voice);
  tl.to(nodes[0], { attr: { fill: '#FFE7BF' }, duration: 0.3 }, T.voice + 0.1);
  tl.to(spot, { x: sx(1, SC), duration: 0.55, ease: 'power3.inOut' }, T.where - 0.25);
  tl.to(nodes[0], { attr: { fill: '#EEF3FF' }, duration: 0.3 }, T.where - 0.1);
  tl.to(nodes[1], { attr: { fill: '#FFE7BF' }, duration: 0.3 }, T.where + 0.15);
  tl.to(spot, { x: sx(2, SC), duration: 0.55, ease: 'power3.inOut' }, T.when - 0.3);
  tl.to(nodes[1], { attr: { fill: '#EEF3FF' }, duration: 0.3 }, T.when - 0.15);
  tl.to(nodes[2], { attr: { fill: '#FFE7BF' }, duration: 0.3 }, T.when + 0.1);

  tl.to(head, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' }, T.when - 0.1);
  tl.to([pageTag, viewTag], { opacity: 0, duration: 0.3 }, T.when - 0.1);
});
