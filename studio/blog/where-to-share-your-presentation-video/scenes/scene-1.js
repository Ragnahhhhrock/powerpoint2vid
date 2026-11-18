/* Scene 1 — "Get the file ready first. Start with an MP4 and a clear name, like Q4 onboarding IT setup."
 * Storyboard: Paper stage, close-up on a large file card. The kicker "Get the file ready first" settles
 * above it. On "MP4" a bold sky-blue MP4 badge stamps onto the card's preview, and a small WebM tag
 * slides in beside it. On "clear name" the messy filename "final_v3_REAL.mp4" types out. On "like" it
 * strikes through in coral. On "Q4" it rewrites as "Q4 onboarding IT setup" at 96px. The camera
 * eases in and pans slightly as the clean name settles, then holds. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const T = (i, w, f) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const ready = T(0, 'ready', 1.3);
  const mp4 = T(1, 'MP4', 3.3);
  const clear = T(1, 'clear', 4.1);
  let like = T(1, 'like', 4.9);
  let q4 = T(1, 'Q4', 5.2);
  if (like < clear + 0.6) like = clear + 0.6;
  if (q4 < like + 0.3) q4 = like + 0.3;

  stage.style.background = 'radial-gradient(80% 70% at 50% 40%, #fffdf8 0%, var(--paper) 60%, #ebe5d8 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 640px' });

  /* kicker */
  const kick = el('div', 'abs', cam, { left: '240px', top: '196px', display: 'flex', alignItems: 'center', gap: '16px', font: '700 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'var(--ink)' });
  el('div', '', kick, { width: '14px', height: '14px', borderRadius: '50%', background: 'var(--signal)', boxShadow: '0 0 16px rgba(255,107,74,.6)' });
  const kickTxt = el('div', '', kick, {}); kickTxt.textContent = 'GET THE FILE READY FIRST';

  /* file card */
  const card = el('div', 'abs', cam, { left: '240px', top: '270px', width: '1440px', height: '620px', borderRadius: '28px', background: '#fff', boxShadow: '0 50px 120px rgba(26,34,51,.18), 0 6px 18px rgba(26,34,51,.08)', overflow: 'hidden' });
  const thumb = el('div', 'abs', card, { left: 0, top: 0, width: '1440px', height: '300px', background: 'radial-gradient(60% 120% at 30% 30%, #2a3a5c 0%, var(--ink) 55%, var(--night) 100%)' });
  const play = el('div', 'abs', thumb, { left: '660px', top: '90px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,.12)', border: '2px solid rgba(255,255,255,.35)', boxShadow: '0 0 60px rgba(79,163,255,.35)' });
  el('div', 'abs', play, { left: '46px', top: '36px', width: 0, height: 0, borderTop: '24px solid transparent', borderBottom: '24px solid transparent', borderLeft: '38px solid #fff' });
  const track = el('div', 'abs', thumb, { left: '60px', right: '60px', bottom: '36px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.15)' });
  const prog = el('div', 'abs', track, { left: 0, top: 0, bottom: 0, width: '100%', borderRadius: '3px', background: 'var(--sky)', transformOrigin: '0 50%' });

  /* MP4 badge + WebM tag */
  const badge = el('div', 'abs', thumb, { left: '60px', top: '50px', padding: '18px 34px', borderRadius: '18px', background: 'var(--sky)', color: '#fff', font: '900 72px/1 Inter Display, Inter', letterSpacing: '-.03em', boxShadow: '0 20px 50px rgba(79,163,255,.5)', transformOrigin: '50% 50%' });
  badge.textContent = 'MP4';
  const webm = el('div', 'abs', thumb, { left: '300px', top: '78px', padding: '12px 20px', borderRadius: '12px', border: '2px solid rgba(255,255,255,.4)', color: 'rgba(255,255,255,.85)', font: '700 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.1em' });
  webm.textContent = 'WEBM';
  const ring = el('div', 'abs', thumb, { left: '90px', top: '0px', width: '200px', height: '200px', borderRadius: '50%', border: '5px solid var(--sky)', opacity: 0 });

  /* filename area */
  const lab = el('div', 'abs', card, { left: '80px', top: '350px', font: '700 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'var(--mist)' });
  lab.textContent = 'FILE NAME';
  const messyBox = el('div', 'abs', card, { left: '80px', top: '410px', height: '110px', display: 'flex', alignItems: 'center' });
  const messyWrap = el('div', '', messyBox, { position: 'relative', display: 'inline-block' });
  const messy = el('span', '', messyWrap, { font: '600 76px/1 ui-monospace, Menlo, monospace', letterSpacing: '-.02em', color: 'rgba(26,34,51,.75)', whiteSpace: 'pre' });
  const caret = el('div', '', messyBox, { width: '5px', height: '80px', marginLeft: '6px', background: 'var(--sky)' });
  const strike = el('div', 'abs', messyWrap, { left: '-10px', right: '-10px', top: '50%', height: '9px', marginTop: '-4px', borderRadius: '5px', background: 'var(--signal)', transformOrigin: '0 50%' });
  const clean = el('div', 'abs', card, { left: '80px', top: '410px', height: '110px', display: 'flex', alignItems: 'center', font: '800 96px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)', whiteSpace: 'pre' });
  const chars = ctx.split(clean, 'Q4 onboarding IT setup', 'char');
  const check = el('div', 'abs', card, { right: '80px', top: '425px', width: '80px', height: '80px', borderRadius: '50%', background: 'var(--mint)', boxShadow: '0 12px 30px rgba(61,214,165,.45)' });
  check.innerHTML = '<svg width="80" height="80"><path d="M24 41 L35 52 L57 29" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.06 });

  /* typing state */
  const MESSY = 'final_v3_REAL.mp4';
  const typed = { n: 0 }, caretOn = { v: 0 };
  ctx.onFrame((t) => {
    messy.textContent = MESSY.slice(0, Math.round(typed.n));
    caret.style.opacity = caretOn.v * ((Math.floor(t * 3) % 2 === 0) ? 1 : 0.15);
  });

  /* ---- timeline ---- */
  gsap.set([badge, webm, strike, check], { opacity: 0 });
  gsap.set(strike, { scaleX: 0 });
  gsap.set(prog, { scaleX: 0 });
  gsap.set(chars, { opacity: 0, y: 40 });
  gsap.set(caret, { opacity: 0 });

  tl.from(card, { y: 70, opacity: 0, scale: 0.97, duration: 0.8, ease: 'back.out(1.4)' }, 0.05);
  tl.from(lab, { opacity: 0, duration: 0.5 }, 0.4);
  tl.from(play, { scale: 0.5, opacity: 0, duration: 0.6, ease: 'back.out(1.8)' }, 0.3);
  tl.from(kick, { x: -40, opacity: 0, duration: 0.6, ease: 'back.out(1.6)' }, 0.75);
  tl.to(prog, { scaleX: 1, duration: ctx.dur - 0.5, ease: 'none' }, 0.5);
  tl.to(caretOn, { v: 1, duration: 0.2 }, ready);
  tl.fromTo(cam, { scale: 1 }, { scale: 1.02, duration: 2, ease: 'power1.inOut' }, 0.5);

  // "MP4" stamp
  tl.fromTo(badge, { opacity: 0, scale: 2.6, rotation: -14 }, { opacity: 1, scale: 1, rotation: -3, duration: 0.38, ease: 'power4.in', immediateRender: false }, mp4 - 0.3);
  tl.to(card, { y: 8, duration: 0.07, yoyo: true, repeat: 1, ease: 'power1.out' }, mp4 + 0.08);
  tl.fromTo(ring, { scale: 0.4, opacity: 0.9 }, { scale: 1.8, opacity: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, mp4 + 0.08);
  tl.fromTo(webm, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, mp4 + 0.3);

  // "clear name": messy filename types
  tl.to(typed, { n: MESSY.length, duration: Math.max(0.45, like - clear - 0.15), ease: 'none' }, clear - 0.1);
  // "like": coral strike
  tl.to(strike, { opacity: 1, scaleX: 1, duration: 0.3, ease: 'power3.out' }, like - 0.1);
  tl.to(caretOn, { v: 0, duration: 0.15 }, like - 0.1);
  // "Q4": rewrite
  tl.to(messyBox, { y: -60, opacity: 0, filter: 'blur(6px)', duration: 0.35, ease: 'power2.in' }, q4 - 0.2);
  tl.to(chars, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.8)', stagger: 0.025 }, q4);
  tl.fromTo(check, { opacity: 0, scale: 0.3, rotation: -30 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.55, ease: 'back.out(2)', immediateRender: false }, q4 + 0.6);
  // camera: one decisive push-in + lateral settle onto the clean name, then hold
  tl.to(cam, { scale: 1.08, x: 40, y: -20, duration: Math.max(1, ctx.dur - q4 - 0.2), ease: 'expo.inOut' }, q4 - 0.1);
});
