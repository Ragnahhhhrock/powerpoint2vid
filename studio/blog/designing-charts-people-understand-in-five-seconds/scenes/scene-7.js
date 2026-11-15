/* Scene 7 — "Read the headline, see the proof, test passed."
 * Storyboard: the camera pulls back (cut in) to frame the finished, clean chart on a paper stage.
 * On "headline" a soft signal highlighter sweeps the takeaway headline. On "proof" the rising bars
 * pulse once, left to right. On "passed" a signal-orange check draws in and a small stopwatch
 * reading "5s" lands in the top-right corner. Then hold the complete chart with a slow push-in
 * toward the orange Q4 bar. The bars are schematic: the deck gives no values, so no numbers are shown.
 */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const tHead = ctx.at(0, 'headline,'), tProof = ctx.at(0, 'proof,'), tPassed = ctx.at(0, 'passed.');

  stage.style.background = 'radial-gradient(80% 70% at 45% 40%, #FFFFFF 0%, var(--paper) 60%, #ECE9E2 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '1300px 640px' });

  /* headline with highlighter */
  const head = el('div', 'abs', cam, { left: '160px', top: '120px', width: '1280px', font: '800 66px/1.12 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--ink)' });
  const hl = el('span', '', head, {
    backgroundImage: 'linear-gradient(rgba(255,90,60,.24), rgba(255,90,60,.24))',
    backgroundRepeat: 'no-repeat', backgroundPosition: '0 88%', backgroundSize: '0% 42%'
  });
  hl.textContent = 'Renewals rose every quarter after the new onboarding';
  const tag = el('div', 'abs', cam, { left: '164px', top: '300px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'var(--grey)' });
  tag.textContent = 'FY26 · QUARTERLY RENEWALS';

  /* clean chart: no gridlines, no legend, direct labels */
  const BASE = 900, X0 = 420, STEP = 300, BW = 200;
  const H = [190, 270, 350, 440]; // schematic "rises every quarter"
  const floor = el('div', 'abs', cam, { left: '360px', width: '1200px', top: BASE + 'px', height: '3px', background: 'var(--mist)' });
  const bars = H.map((h, i) => {
    const x = X0 + i * STEP, hot = i === 3;
    const bar = el('div', 'abs', cam, {
      left: x + 'px', top: BASE - h + 'px', width: BW + 'px', height: h + 'px', borderRadius: '10px 10px 2px 2px',
      transformOrigin: '50% 100%', background: hot ? 'var(--signal)' : '#C3C8D0',
      boxShadow: hot ? '0 24px 60px rgba(255,90,60,.35)' : '0 18px 40px rgba(26,34,51,.08)'
    });
    const lab = el('div', 'abs', cam, { left: x + 'px', width: BW + 'px', top: BASE + 22 + 'px', textAlign: 'center', font: '700 30px/1 Inter', color: hot ? 'var(--signal)' : 'var(--grey)' });
    lab.textContent = 'Q' + (i + 1);
    gsap.set(bar, { filter: 'brightness(1)' });
    return bar;
  });
  const note = el('div', 'abs', cam, { left: X0 + 3 * STEP - 40 + 'px', width: BW + 80 + 'px', top: BASE - H[3] - 56 + 'px', textAlign: 'center', font: '700 28px/1 Inter', color: 'var(--signal)' });
  note.textContent = 'New onboarding';

  /* corner: check + stopwatch */
  const corner = el('div', 'abs', stage, { right: '110px', top: '96px', width: '340px', height: '170px' });
  const chk = el('div', 'abs', corner, { left: 0, top: '15px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,90,60,.1)', transformOrigin: '50% 50%' });
  chk.innerHTML = '<svg width="140" height="140"><path d="M38 72 L62 96 L104 46" fill="none" stroke="#FF5A3C" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="110" stroke-dashoffset="110"/></svg>';
  const chkPath = chk.querySelector('path');
  const sw = el('div', 'abs', corner, { left: '180px', top: '10px', width: '150px', height: '150px', transformOrigin: '50% 60%' });
  sw.innerHTML = `<svg width="150" height="150" viewBox="0 0 150 150">
    <rect x="63" y="4" width="24" height="14" rx="4" fill="#1A2233"/>
    <circle cx="75" cy="85" r="56" fill="#fff" stroke="#1A2233" stroke-width="8"/>
    <circle cx="75" cy="85" r="44" fill="none" stroke="#FF5A3C" stroke-width="6" stroke-linecap="round" stroke-dasharray="276.5" stroke-dashoffset="276.5" transform="rotate(-90 75 85)"/>
    <text x="75" y="99" text-anchor="middle" font-family="Inter Display, Inter" font-weight="900" font-size="40" letter-spacing="-1" fill="#1A2233">5s</text></svg>`;
  const ring = sw.querySelectorAll('circle')[1];

  ctx.fx.vignette({ strength: 0.18 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---- timeline ---- */
  // cut in mid pull-back
  gsap.set(cam, { scale: 1.14, y: 40 });
  tl.to(cam, { scale: 1, y: 0, duration: 1.0, ease: 'expo.out' }, 0);
  tl.to(cam, { scale: 1.03, duration: ctx.dur - 1.0, ease: 'power1.inOut' }, 1.0);

  // "headline": highlighter sweep
  tl.to(hl, { backgroundSize: '100% 42%', duration: 0.75, ease: 'power2.inOut' }, tHead - 0.1);

  // "proof": bars pulse in sequence
  bars.forEach((b, i) => {
    const t = tProof - 0.2 + i * 0.1;
    tl.to(b, { scaleY: 1.06, filter: 'brightness(1.12)', duration: 0.18, ease: 'power2.out' }, t);
    tl.to(b, { scaleY: 1, filter: 'brightness(1)', duration: 0.35, ease: 'power2.inOut' }, t + 0.18);
  });
  tl.fromTo(note, { opacity: 0.6, y: 0 }, { opacity: 1, y: -6, duration: 0.25, yoyo: true, repeat: 1, immediateRender: false }, tProof + 0.1);

  // "passed": check + stopwatch land
  gsap.set([chk, sw], { opacity: 0, scale: 0.5 });
  tl.to(chk, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)' }, tPassed - 0.2);
  tl.to(chkPath, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }, tPassed - 0.05);
  tl.to(sw, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, tPassed - 0.05);
  tl.to(ring, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, tPassed + 0.1);
});
