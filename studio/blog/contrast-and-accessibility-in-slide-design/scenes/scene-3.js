/* Scene 3 — "Some viewers can't tell red from green. Give each status a label and an icon, and let
 * colour be an extra cue, not the only one."
 * Storyboard: split screen on paper. Left BEFORE card: a red and a green status dot. On "red" and
 * "green" each pulses, then both drain to the same muddy grey and an "=" lands between them.
 * Right AFTER card: on "label" grey pills pop in ("On track" / "Late"), on "icon" a tick and a
 * clock snap in with a tightening focus ring, still readable in grey. On "colour… extra cue"
 * teal/amber floods softly back behind the pills. On "not the only one" a small line chart with
 * series labelled directly at the line ends slides in below and holds. Slow push-in throughout. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w) => ctx.at(i, w);
  const tCant = W(0, "can't"), tRed = W(0, 'red'), tGreen = W(0, 'green.');
  const tLabel = W(1, 'label'), tIcon = W(1, 'icon,'), tColour = W(1, 'colour'), tCue = W(1, 'cue,'), tNot = W(1, 'not');
  const MONO = 'ui-monospace, Menlo, monospace';
  const GREY = '#9A958B';

  stage.style.background = 'radial-gradient(80% 70% at 50% 40%, #FFFFFF 0%, var(--paper) 60%, #ECE8DF 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  /* title */
  const title = el('div', 'abs', cam, { left: '120px', top: '80px', font: '800 72px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  title.textContent = 'Never rely on colour alone';

  const card = (left, label) => {
    const c = el('div', 'abs', cam, { left: left + 'px', top: '210px', width: '780px', height: '420px', borderRadius: '28px', background: '#FFFFFF',
      boxShadow: '0 30px 70px rgba(20,22,28,.10), 0 2px 0 rgba(20,22,28,.04)', border: '1px solid rgba(20,22,28,.06)' });
    const t = el('div', 'abs', c, { left: '44px', top: '38px', font: `600 22px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--mist)' });
    t.textContent = label;
    return c;
  };
  const before = card(120, 'BEFORE · COLOUR ONLY');
  const after = card(1020, 'AFTER · LABEL + ICON');

  /* BEFORE: two dots */
  const mkDot = (x, col) => el('div', 'abs', before, { left: x + 'px', top: '150px', width: '170px', height: '170px', borderRadius: '50%', background: col,
    boxShadow: '0 18px 40px rgba(20,22,28,.18), inset 0 -10px 24px rgba(0,0,0,.12), inset 0 8px 16px rgba(255,255,255,.25)' });
  const dRed = mkDot(150, '#D9483B'), dGreen = mkDot(460, '#2E9E4F');
  const eq = el('div', 'abs', before, { left: '320px', width: '140px', top: '172px', textAlign: 'center', font: '800 110px/1 Inter Display, Inter', color: 'var(--ink)', opacity: 0 });
  eq.textContent = '=';
  const huh = el('div', 'abs', before, { left: '0', width: '780px', top: '350px', textAlign: 'center', font: `600 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--mist)', opacity: 0 });
  huh.textContent = 'WHICH IS WHICH?';

  /* AFTER: pills */
  const tick = '<svg width="40" height="40" viewBox="0 0 40 40"><path d="M9 21 L17 29 L31 12" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const clock = '<svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="13" fill="none" stroke="#fff" stroke-width="4.5"/><path d="M20 12 V20 L26 24" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const mkPill = (top, text, svg, col, glowCol) => {
    const glow = el('div', 'abs', after, { left: '40px', top: top - 40 + 'px', width: '560px', height: '190px', borderRadius: '50%',
      background: `radial-gradient(closest-side, ${glowCol}, transparent)`, opacity: 0, filter: 'blur(6px)' });
    const pill = el('div', 'abs', after, { left: '70px', top: top + 'px', height: '110px', display: 'flex', alignItems: 'center', gap: '24px', padding: '0 44px 0 18px',
      borderRadius: '56px', background: '#EFECE6', border: '3px solid #D6D1C7', transformOrigin: '20% 50%' });
    const ic = el('div', '', pill, { width: '74px', height: '74px', borderRadius: '50%', background: GREY, display: 'flex', alignItems: 'center', justifyContent: 'center' });
    ic.innerHTML = svg;
    const tx = el('div', '', pill, { font: '800 48px/1 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)', whiteSpace: 'nowrap' });
    tx.textContent = text;
    const ring = el('div', 'abs', after, { left: '78px', top: top + 8 + 'px', width: '94px', height: '94px', borderRadius: '50%', border: '4px solid var(--signal)', opacity: 0 });
    return { glow, pill, ic, ring, col };
  };
  const pOk = mkPill(120, 'On track', tick, 'var(--teal)', 'rgba(18,165,148,.38)');
  const pLate = mkPill(260, 'Late', clock, 'var(--amber)', 'rgba(242,169,0,.42)');

  /* chart */
  const chart = el('div', 'abs', cam, { left: '120px', top: '670px', width: '1680px', height: '310px', borderRadius: '28px', background: '#FFFFFF',
    boxShadow: '0 30px 70px rgba(20,22,28,.10)', border: '1px solid rgba(20,22,28,.06)' });
  const ctag = el('div', 'abs', chart, { left: '44px', top: '34px', font: `600 22px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--mist)' });
  ctag.textContent = 'LABEL SERIES DIRECTLY · ILLUSTRATIVE';
  const ptsA = [[120, 230], [380, 205], [640, 190], [900, 160], [1160, 140], [1360, 110]];
  const ptsB = [[120, 250], [380, 240], [640, 252], [900, 228], [1160, 236], [1360, 214]];
  const d = (p) => 'M' + p.map((q) => q.join(' ')).join(' L ');
  const svgW = el('div', 'abs', chart, { left: 0, top: 0, width: '1680px', height: '310px' });
  svgW.innerHTML = `<svg width="1680" height="310">
    <line x1="120" y1="270" x2="1380" y2="270" stroke="rgba(20,22,28,.12)" stroke-width="2"/>
    <path id="la" d="${d(ptsA)}" fill="none" stroke="#12A594" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <path id="lb" d="${d(ptsB)}" fill="none" stroke="#F2A900" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 0"/>
    <circle id="ca" cx="1360" cy="110" r="10" fill="#12A594"/><circle id="cb" cx="1360" cy="214" r="10" fill="#F2A900"/></svg>`;
  const la = svgW.querySelector('#la'), lb = svgW.querySelector('#lb');
  const lenA = la.getTotalLength(), lenB = lb.getTotalLength();
  gsap.set(la, { strokeDasharray: lenA, strokeDashoffset: lenA });
  gsap.set(lb, { strokeDasharray: lenB, strokeDashoffset: lenB });
  const ends = [svgW.querySelector('#ca'), svgW.querySelector('#cb')];
  const mkLab = (top, text, col) => {
    const l = el('div', 'abs', chart, { left: '1392px', top: top + 'px', font: '800 36px/1 Inter Display, Inter', letterSpacing: '-.03em', color: col, whiteSpace: 'nowrap' });
    l.textContent = text; return l;
  };
  const labA = mkLab(92, 'On track', '#0E8577'), labB = mkLab(196, 'Late', '#B67F00');

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.05, blend: 'multiply' });

  /* ---- timeline ---- */
  tl.to(cam, { scale: 1.035, duration: ctx.dur, ease: 'none' }, 0);
  tl.from(title, { opacity: 0, y: 24, duration: 0.6 }, 0.02);
  tl.from([before, after], { opacity: 0, y: 40, duration: 0.7, stagger: 0.1 }, 0.05);
  tl.from([dRed, dGreen], { scale: 0.4, opacity: 0, duration: 0.6, ease: 'back.out(1.8)', stagger: 0.08 }, 0.2);
  gsap.set([pOk.pill, pLate.pill, pOk.ic, pLate.ic, chart, labA, labB, ...ends], { opacity: 0 });

  // "can't tell red from green"
  tl.to([dRed, dGreen], { x: 6, duration: 0.07, yoyo: true, repeat: 3, ease: 'sine.inOut' }, tCant);
  tl.to(dRed, { scale: 1.12, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, tRed);
  tl.to(dGreen, { scale: 1.12, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, tGreen);
  tl.to([dRed, dGreen], { backgroundColor: GREY, duration: 0.8, ease: 'power2.inOut' }, tGreen + 0.2);
  tl.fromTo(eq, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, tGreen + 0.75);
  tl.to(huh, { opacity: 1, duration: 0.5 }, tGreen + 0.9);
  tl.to(before, { opacity: 0.6, scale: 0.98, duration: 0.8, ease: 'power2.inOut' }, W(1, 'status'));

  // "a label" → pills (grey)
  [pOk, pLate].forEach((p, i) => {
    tl.fromTo(p.pill, { opacity: 0, scale: 0.7, x: -30 }, { opacity: 1, scale: 1, x: 0, duration: 0.6, ease: 'back.out(1.7)', immediateRender: false }, tLabel - 0.1 + i * 0.12);
    // "an icon" → icon snaps in with tightening focus ring
    tl.fromTo(p.ic, { opacity: 0, scale: 0.3, rotation: -40 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.55, ease: 'back.out(2)', immediateRender: false }, tIcon - 0.1 + i * 0.12);
    tl.fromTo(p.ring, { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', immediateRender: false }, tIcon - 0.05 + i * 0.12);
    tl.to(p.ring, { opacity: 0, duration: 0.4 }, tIcon + 0.5 + i * 0.12);
    // colour floods back as an extra cue
    tl.to(p.glow, { opacity: 1, duration: 1.0, ease: 'power2.out' }, tColour + i * 0.15);
    tl.to(p.ic, { backgroundColor: p.col, duration: 0.9, ease: 'power2.out' }, tColour + 0.1 + i * 0.15);
    tl.to(p.pill, { borderColor: p.col, backgroundColor: '#FFFFFF', duration: 0.9, ease: 'power2.out' }, tColour + 0.2 + i * 0.15);
    tl.to(p.pill, { scale: 1.04, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tCue + i * 0.1);
  });

  // "not the only one" → chart with direct labels
  tl.fromTo(chart, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', immediateRender: false }, tNot - 0.15);
  tl.to(la, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, tNot + 0.2);
  tl.to(lb, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, tNot + 0.3);
  tl.fromTo(ends, { opacity: 0, scale: 0, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2.5)', stagger: 0.1, immediateRender: false }, tNot + 1.05);
  tl.fromTo([labA, labB], { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.1, immediateRender: false }, tNot + 1.1);
});
