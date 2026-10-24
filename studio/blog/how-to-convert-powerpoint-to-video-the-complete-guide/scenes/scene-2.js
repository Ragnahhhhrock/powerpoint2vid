/* Scene 2 — "You can export from PowerPoint and record yourself, or screen record a run-through.
 * A dedicated converter builds the video from your notes, so updates are easy."
 * Storyboard: the title "Three ways to convert your deck" builds word by word. Three live cards land
 * on their words: Export + record on "export" (its mic joins on "record"), Screen record on "screen"
 * (a REC dot pulses). On "converter" the third card rises as the hero and the other two dim. On
 * "builds" a progress bar fills. On "notes" note lines flow into a video frame. On "updates" a mint
 * badge pops. The original slide render overlaps its own title, so its three options are rebuilt as
 * cards instead of showing the image. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return (v == null || isNaN(v)) ? f : v; };
  const tExport = A(0, 'export', 0.875), tRecord = A(0, 'record', 2.2), tScreen = A(0, 'screen', 3.49);
  const tDed = A(1, 'dedicated', 5.53), tConv = A(1, 'converter', 6.1), tBuilds = A(1, 'builds', 6.68);
  const tNotes = A(1, 'notes,', 7.85), tUpd = A(1, 'updates', 8.6);

  stage.style.background = 'radial-gradient(60% 55% at 50% 45%, #1a1f52 0%, var(--ink) 50%, var(--night) 100%)';
  const glowBg = el('div', 'abs', stage, { left: '900px', top: '200px', width: '1100px', height: '900px', background: 'radial-gradient(closest-side, rgba(109,74,255,.35), transparent)', opacity: 0 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  /* title */
  const title = el('div', 'abs', cam, { left: '0', width: '1920px', top: '110px', textAlign: 'center', font: '800 76px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff' });
  const words = ctx.split(title, 'Three ways to convert your deck', 'word');
  const kicker = el('div', 'abs', cam, { left: '0', width: '1920px', top: '70px', textAlign: 'center', font: '600 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.22em', color: 'var(--muted)' });
  kicker.textContent = 'STEP 01 · CHOOSE A METHOD';

  /* cards */
  const CW = 480, CH = 500, TOP = 330, XS = [180, 720, 1260];
  const mkCard = (x, label, sub) => {
    const c = el('div', 'abs', cam, { left: x + 'px', top: TOP + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '28px',
      background: 'linear-gradient(160deg, rgba(255,255,255,.09), rgba(255,255,255,.03))', border: '1px solid rgba(255,255,255,.12)',
      boxShadow: '0 40px 90px rgba(0,0,0,.45)', transformOrigin: '50% 60%' });
    const icon = el('div', 'abs', c, { left: '40px', top: '36px', width: '400px', height: '260px' });
    const txt = el('div', 'abs', c, { left: '40px', width: '400px', bottom: '66px', display: 'flex', flexDirection: 'column', gap: '14px' });
    const lab = el('div', '', txt, { font: '800 40px/1.05 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff' });
    lab.textContent = label;
    const s = el('div', '', txt, { font: '600 18px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'var(--muted)', whiteSpace: 'nowrap' });
    s.textContent = sub;
    return { c, icon };
  };
  const c1 = mkCard(XS[0], 'Export + record', 'POWERPOINT · MIC');
  const c2 = mkCard(XS[1], 'Screen record', 'LIVE RUN-THROUGH');
  const c3 = mkCard(XS[2], 'Dedicated converter', 'BUILT FROM NOTES');

  c1.icon.innerHTML = `<svg width="400" height="260" viewBox="0 0 400 260">
    <rect x="20" y="40" width="230" height="150" rx="14" fill="rgba(255,255,255,.08)" stroke="#aab0d4" stroke-width="4"/>
    <rect x="45" y="70" width="120" height="14" rx="7" fill="#aab0d4"/><rect x="45" y="100" width="170" height="10" rx="5" fill="rgba(170,176,212,.5)"/><rect x="45" y="122" width="140" height="10" rx="5" fill="rgba(170,176,212,.5)"/>
    <path d="M200 150 L250 100 M222 98 L252 98 L252 128" stroke="#8f75ff" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <g id="mic"><rect x="305" y="70" width="44" height="80" rx="22" fill="#ff6b4a"/><path d="M290 125 Q290 175 327 175 Q364 175 364 125" stroke="#ff6b4a" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M327 175 L327 205 M305 208 L349 208" stroke="#ff6b4a" stroke-width="7" stroke-linecap="round"/></g></svg>`;
  c2.icon.innerHTML = `<svg width="400" height="260" viewBox="0 0 400 260">
    <rect x="40" y="20" width="320" height="190" rx="16" fill="rgba(255,255,255,.08)" stroke="#aab0d4" stroke-width="4"/>
    <path d="M160 245 L240 245 M200 210 L200 245" stroke="#aab0d4" stroke-width="6" stroke-linecap="round"/>
    <rect x="80" y="70" width="150" height="14" rx="7" fill="#aab0d4"/><rect x="80" y="100" width="220" height="10" rx="5" fill="rgba(170,176,212,.5)"/><rect x="80" y="124" width="180" height="10" rx="5" fill="rgba(170,176,212,.5)"/>
    <circle id="rec" cx="320" cy="50" r="12" fill="#ff6b4a"/><text x="250" y="57" fill="#ff6b4a" font-family="ui-monospace, Menlo, monospace" font-weight="700" font-size="18" letter-spacing="2">REC</text></svg>`;
  c3.icon.innerHTML = `<svg width="400" height="260" viewBox="0 0 400 260">
    <rect x="10" y="40" width="140" height="180" rx="14" fill="rgba(255,255,255,.1)" stroke="#aab0d4" stroke-width="4"/>
    <g id="nl"><rect x="32" y="75" width="96" height="10" rx="5" fill="#8f75ff"/><rect x="32" y="105" width="80" height="10" rx="5" fill="#8f75ff"/><rect x="32" y="135" width="96" height="10" rx="5" fill="#8f75ff"/><rect x="32" y="165" width="60" height="10" rx="5" fill="#8f75ff"/></g>
    <path id="arr" d="M168 130 L210 130 M196 116 L212 130 L196 144" stroke="#8f75ff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect id="vf" x="225" y="55" width="170" height="150" rx="16" fill="rgba(109,74,255,.25)" stroke="#8f75ff" stroke-width="4"/>
    <path id="play" d="M290 105 L290 155 L332 130 Z" fill="#fff"/></svg>`;
  const pbTrack = el('div', 'abs', c3.c, { left: '40px', width: '400px', top: '456px', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,.1)', overflow: 'hidden' });
  const pb = el('div', 'abs', pbTrack, { left: 0, top: 0, height: '100%', width: '100%', background: 'linear-gradient(90deg, #6d4aff, #8f75ff)', transformOrigin: '0 50%' });

  const badge = el('div', 'abs', cam, { left: XS[2] + 'px', width: CW + 'px', top: TOP + CH + 46 + 'px', display: 'flex', justifyContent: 'center' });
  const pill = el('div', '', badge, { padding: '18px 34px', borderRadius: '40px', background: 'rgba(31,191,143,.16)', border: '2px solid var(--mint)', font: '700 30px/1 Inter', color: '#d6fff1', letterSpacing: '-.01em', boxShadow: '0 0 40px rgba(31,191,143,.35)', whiteSpace: 'nowrap' });
  pill.textContent = '✓  Updates are easy';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  const mic = c1.icon.querySelector('#mic'), rec = c2.icon.querySelector('#rec');
  const nl = c3.icon.querySelector('#nl'), arr = c3.icon.querySelector('#arr'), vf = c3.icon.querySelector('#vf'), play = c3.icon.querySelector('#play');
  ctx.onFrame((t) => { if (t > tScreen) rec.setAttribute('opacity', (0.35 + 0.65 * (0.5 + 0.5 * Math.cos((t - tScreen) * 6))).toFixed(3)); });

  /* ---- timeline ---- */
  tl.from(kicker, { opacity: 0, y: -10, duration: 0.5 }, 0.05);
  tl.from(words, { opacity: 0, y: 40, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.09 }, 0.1);
  tl.fromTo(cam, { scale: 1 }, { scale: 1.03, duration: ctx.dur, ease: 'none' }, 0);

  [c1.c, c2.c, c3.c].forEach((c) => gsap.set(c, { filter: 'brightness(1)' }));
  tl.from(c1.c, { opacity: 0, y: 90, scale: 0.9, duration: 0.8, ease: 'back.out(1.5)' }, tExport - 0.2);
  gsap.set(mic, { opacity: 0, transformOrigin: '327px 140px' });
  tl.fromTo(mic, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)', immediateRender: false }, tRecord - 0.05);
  tl.from(c2.c, { opacity: 0, y: 90, scale: 0.9, duration: 0.8, ease: 'back.out(1.5)' }, tScreen - 0.2);

  gsap.set([arr, vf, play], { opacity: 0.25 });
  gsap.set(pb, { scaleX: 0 });
  tl.from(c3.c, { opacity: 0, y: 110, scale: 0.85, duration: 0.9, ease: 'back.out(1.5)' }, tConv - 0.3);
  tl.to([c1.c, c2.c], { opacity: 0.45, scale: 0.94, filter: 'brightness(.7)', duration: 0.7, ease: 'power2.inOut' }, tConv);
  tl.to(c3.c, { scale: 1.06, y: -16, borderColor: 'rgba(143,117,255,.8)', boxShadow: '0 40px 100px rgba(0,0,0,.5), 0 0 80px rgba(109,74,255,.55)', duration: 0.8, ease: 'power2.inOut' }, tConv + 0.2);
  tl.to(glowBg, { opacity: 1, duration: 1 }, tConv);
  tl.to(badge, { y: -16, duration: 0.8, ease: 'power2.inOut' }, tConv + 0.2);

  tl.to(pb, { scaleX: 1, duration: Math.max(0.8, tNotes + 0.4 - tBuilds), ease: 'power1.inOut' }, tBuilds);
  tl.to(nl, { x: 18, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.inOut' }, tNotes - 0.2);
  tl.to(arr, { opacity: 1, duration: 0.3 }, tNotes - 0.1);
  tl.to(vf, { opacity: 1, duration: 0.4 }, tNotes);
  gsap.set(play, { transformOrigin: '310px 130px' });
  tl.fromTo(play, { scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2.2)', immediateRender: false }, tNotes + 0.05);

  tl.from(pill, { opacity: 0, scale: 0.6, y: 20, duration: 0.6, ease: 'back.out(2)' }, tUpd - 0.1);
  tl.to(pill, { boxShadow: '0 0 70px rgba(31,191,143,.7)', duration: 0.5, yoyo: true, repeat: 1 }, tUpd + 0.5);
});
