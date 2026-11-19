/* Scene 2 — "Before you add any image, ask one question: what would the viewer lose without it?
 *            If the answer is nothing, leave it out."
 * Storyboard: a paper-light stage. An empty frame slot sits on the right and fills with a generic
 * stock photo on "image". The question "What would the viewer lose?" builds word by word in heavy
 * ink, left-aligned. An amber underline draws under "lose". On "lose without it" the photo fades to
 * 40% to test its absence. On "nothing" it crumples into a dot and vanishes. "Leave it out." lands
 * in coral beneath the question. Two small amber tags (actual product / real place, team or object)
 * drift into the freed space as the images worth keeping, then settle. The slow push-in never stops.
 * The bullet list is cut. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w, f) => { const v = ctx.at(i, w); return (v == null || isNaN(v)) ? f : v; };
  const tImage = W(0, 'image', 1.7), tQ = W(0, 'question', 2.6);
  const tWhat = W(0, 'what', 3.1), tWould = W(0, 'would', 3.35), tThe = W(0, 'the', 3.55);
  const tViewer = W(0, 'viewer', 3.75), tLose = W(0, 'lose', 4.2), tWithout = W(0, 'without', 4.55);
  const tNothing = W(1, 'nothing', 6.9), tLeave = W(1, 'leave', 7.45), tOut = W(1, 'out', 7.9);

  stage.style.background = 'radial-gradient(80% 70% at 30% 35%, #fffdf8 0%, var(--paper) 60%, #ebe6da 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '760px 520px' });
  // soft warm light pool
  el('div', 'abs', cam, { left: '1050px', top: '160px', width: '860px', height: '760px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(242,165,65,.10), transparent)' });

  /* ---- the question ---- */
  const q = el('div', 'abs', cam, { left: '140px', top: '250px', width: '1000px', font: '900 128px/1.02 Inter Display, Inter',
    letterSpacing: '-.045em', color: 'var(--ink)' });
  const mkLine = (words) => {
    const line = el('div', '', q, { whiteSpace: 'nowrap' });
    return words.map((w) => { const s = el('span', '', line, { display: 'inline-block', marginRight: '.24em' }); s.textContent = w; return s; });
  };
  const [wWhat, wWould] = mkLine(['What', 'would']);
  const [wThe, wViewer, wLose] = mkLine(['the', 'viewer', 'lose?']);
  wLose.style.position = 'relative';
  const underline = el('div', 'abs', wLose, { left: '0px', right: '-6px', bottom: '2px', height: '16px', borderRadius: '8px',
    background: 'var(--amber)', zIndex: -1, transformOrigin: '0% 50%', opacity: 0.85 });

  const leave = el('div', 'abs', cam, { left: '144px', top: '600px', font: '900 96px/1 Inter Display, Inter',
    letterSpacing: '-.04em', color: 'var(--coral)' });
  leave.textContent = 'Leave it out.';

  /* ---- placeholder photo frame ---- */
  const FX = 1220, FY = 270, FW = 560, FH = 420;
  const slot = el('div', 'abs', cam, { left: FX + 'px', top: FY + 'px', width: FW + 'px', height: FH + 'px', borderRadius: '18px',
    border: '3px dashed rgba(91,98,117,.35)', boxSizing: 'border-box' });
  const frame = el('div', 'abs', cam, { left: FX + 'px', top: FY + 'px', width: FW + 'px', height: FH + 'px', borderRadius: '18px',
    overflow: 'hidden', background: '#fff', boxShadow: '0 40px 80px rgba(31,34,48,.18), 0 6px 18px rgba(31,34,48,.10)', transformOrigin: '50% 50%' });
  frame.innerHTML = `<svg width="${FW}" height="${FH}" viewBox="0 0 560 420">
    <defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9cbe0"/><stop offset="1" stop-color="#e9e3d6"/></linearGradient></defs>
    <rect width="560" height="420" fill="url(#sk)"/>
    <circle cx="420" cy="120" r="46" fill="#f6d9a6"/>
    <path d="M0 330 L130 190 L230 290 L330 170 L470 310 L560 250 L560 420 L0 420Z" fill="#8a93a8"/>
    <path d="M0 370 L160 280 L300 360 L420 300 L560 360 L560 420 L0 420Z" fill="#5B6275"/></svg>`;
  const cap = el('div', 'abs', frame, { left: '22px', bottom: '18px', font: '600 18px/1 ui-monospace, Menlo, monospace',
    letterSpacing: '.12em', color: 'rgba(255,255,255,.85)' });
  cap.textContent = 'STOCK_PHOTO_03.JPG';
  const dot = el('div', 'abs', cam, { left: FX + FW / 2 - 14 + 'px', top: FY + FH / 2 - 14 + 'px', width: '28px', height: '28px',
    borderRadius: '50%', background: 'var(--slate)', opacity: 0 });
  const ring = el('div', 'abs', cam, { left: FX + FW / 2 - 60 + 'px', top: FY + FH / 2 - 60 + 'px', width: '120px', height: '120px',
    borderRadius: '50%', border: '3px solid rgba(91,98,117,.4)', boxSizing: 'border-box', opacity: 0 });

  /* ---- images worth keeping ---- */
  const mkTag = (txt, top) => {
    const t = el('div', 'abs', cam, { left: FX + 'px', top: top + 'px', display: 'flex', alignItems: 'center', gap: '16px',
      padding: '18px 26px', borderRadius: '999px', background: 'rgba(242,165,65,.14)', border: '2px solid rgba(242,165,65,.7)',
      font: '700 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.1em', color: '#9a5f12', whiteSpace: 'nowrap' });
    const d = el('span', '', t, { width: '14px', height: '14px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' });
    const s = el('span', '', t); s.textContent = txt;
    return t;
  };
  const tag1 = mkTag('ACTUAL PRODUCT', 400);
  const tag2 = mkTag('REAL PLACE, TEAM OR OBJECT', 490);

  ctx.fx.vignette({ strength: 0.18 });
  ctx.fx.grain({ opacity: 0.05, blend: 'multiply' });

  /* ---- timeline ---- */
  const words = [[wWhat, tWhat], [wWould, tWould], [wThe, tThe], [wViewer, tViewer], [wLose, tLose]];
  gsap.set(words.map((w) => w[0]), { opacity: 0, y: 50 });
  gsap.set(underline, { scaleX: 0 });
  gsap.set(leave, { opacity: 0 });
  gsap.set([tag1, tag2], { opacity: 0 });
  gsap.set(frame, { filter: 'saturate(1) brightness(1) blur(0px)', opacity: 0, scale: 0.94 });

  // camera: slow, constant push-in
  tl.fromTo(cam, { scale: 1 }, { scale: 1.045, duration: ctx.dur, ease: 'sine.inOut', immediateRender: false }, 0);

  // empty slot is there immediately; photo arrives on "image"
  tl.from(slot, { opacity: 0, scale: 0.97, duration: 0.6, ease: 'power2.out' }, 0.05);
  tl.to(frame, { opacity: 1, scale: 1, duration: 0.9, ease: 'expo.out' }, Math.min(tImage - 0.15, 1.6));
  tl.to(slot, { opacity: 0.6, duration: 0.5 }, tQ);

  // question builds word by word
  words.forEach(([w, t]) => tl.to(w, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, t - 0.12));
  tl.to(underline, { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, tLose + 0.1);

  // "lose without it": test its absence
  tl.to(frame, { opacity: 0.4, filter: 'saturate(.3) brightness(1.05) blur(0px)', duration: 0.8, ease: 'power2.inOut' }, tWithout - 0.2);

  // "nothing": crumple into a dot, vanish
  tl.to(frame, { rotation: -9, scaleX: 0.55, scaleY: 0.38, skewX: 14, borderRadius: '42%', filter: 'saturate(.2) brightness(.9) blur(1px)', duration: 0.32, ease: 'power2.in' }, tNothing - 0.1);
  tl.to(frame, { scaleX: 0.05, scaleY: 0.05, rotation: 34, skewX: 0, borderRadius: '50%', duration: 0.26, ease: 'power3.in' }, tNothing + 0.22);
  tl.set(frame, { opacity: 0 }, tNothing + 0.48);
  tl.fromTo(dot, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.12, immediateRender: false }, tNothing + 0.42);
  tl.to(dot, { scale: 0, duration: 0.3, ease: 'back.in(2)' }, tNothing + 0.62);
  tl.fromTo(ring, { opacity: 0.8, scale: 0.3 }, { opacity: 0, scale: 1.4, duration: 0.6, ease: 'power2.out', immediateRender: false }, tNothing + 0.5);
  tl.to(slot, { opacity: 0, scale: 0.96, duration: 0.4, ease: 'power2.in' }, tNothing + 0.5);
  tl.to(wLose, { color: 'var(--slate)', duration: 0.5 }, tNothing + 0.2);

  // "leave it out."
  tl.fromTo(leave, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out', immediateRender: false }, tLeave - 0.1);

  // the images worth keeping drift in, then settle quietly
  const tg = Math.min(tOut + 0.25, ctx.dur - 1.6);
  tl.fromTo(tag1, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 1.1, ease: 'expo.out', immediateRender: false }, tg);
  tl.fromTo(tag2, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 1.1, ease: 'expo.out', immediateRender: false }, tg + 0.12);
  tl.to([tag1, tag2], { y: -6, duration: ctx.dur - tg - 0.6, ease: 'sine.inOut' }, tg + 0.6);
});
