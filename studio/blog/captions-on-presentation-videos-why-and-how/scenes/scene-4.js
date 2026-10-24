/* Scene 4: "Captions sit near the bottom of the frame, so keep that area light.
 *  Use less text, strong contrast, and labels instead of colour alone."
 * Storyboard: the slide title builds word by word. On the right, a live mock video frame drifts in.
 * On "bottom", a caption band rises into a dashed zone that collides with the slide's content.
 * On "keep … light", the content lifts clear and the zone turns mint. The deck's four rules land
 * as cards on their words: "light" gives Bottom clear; "less" collapses the text lines; "contrast"
 * turns the murky caption crisp at the 4.5:1 minimum; "labels" adds text labels to the chart bars. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w) => ctx.at(i, w);
  const tBottom = A(0, 'bottom'), tKeep = A(0, 'keep'), tLight = A(0, 'light');
  const tLess = A(1, 'less'), tContrast = A(1, 'contrast'), tLabels = A(1, 'labels'), tAlone = A(1, 'alone');

  stage.style.background = 'radial-gradient(60% 55% at 70% 55%, #1a1f4f 0%, var(--night) 70%), var(--night)';
  const glow = el('div', 'abs', stage, { left: '900px', top: '200px', width: '900px', height: '700px', background: 'radial-gradient(50% 50% at 50% 50%, rgba(109,74,255,.25), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '1200px 560px' });

  /* title */
  const kicker = el('div', 'abs', cam, { left: '120px', top: '96px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'var(--violet-hi)' });
  kicker.textContent = 'DESIGN FOR CAPTIONS';
  const title = el('div', 'abs', cam, { left: '116px', top: '134px', font: '800 72px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff', whiteSpace: 'nowrap' });
  const words = ctx.split(title, 'Design slides with captions in mind', 'word');

  /* rule cards */
  const RULES = [['Bottom clear', 'mint'], ['Less text', 'violet-hi'], ['Contrast ≥ 4.5:1', 'coral'], ['Labels, not colour alone', 'mint']];
  const cards = RULES.map(([txt, c], i) => {
    const card = el('div', 'abs', cam, { left: '120px', top: 330 + i * 132 + 'px', width: '600px', height: '108px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(255,255,255,.07), rgba(255,255,255,.02))', border: '1px solid rgba(255,255,255,.1)', boxShadow: '0 24px 60px rgba(0,0,0,.35)', display: 'flex', alignItems: 'center', gap: '24px', padding: '0 28px', boxSizing: 'border-box' });
    const num = el('div', '', card, { width: '56px', height: '56px', borderRadius: '16px', flex: '0 0 56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `var(--${c})`, font: '800 26px/1 Inter', color: 'var(--night)', boxShadow: `0 0 30px var(--${c})` });
    num.textContent = String(i + 1);
    const t = el('div', '', card, { font: '700 36px/1.1 Inter', letterSpacing: '-.03em', color: '#fff', whiteSpace: 'nowrap' });
    t.textContent = txt;
    return card;
  });

  /* mock video frame */
  const FW = 980, FH = 551;
  const frameWrap = el('div', 'abs', cam, { left: '820px', top: '290px', width: FW + 'px', height: FH + 'px' });
  const frame = el('div', 'abs', frameWrap, { inset: 0, borderRadius: '18px', overflow: 'hidden', background: 'var(--paper)', boxShadow: '0 50px 120px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.12)' });
  const ftag = el('div', 'abs', frameWrap, { left: '4px', top: '-42px', font: '600 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: 'var(--muted)' });
  ftag.textContent = 'VIDEO FRAME · 16:9';

  const content = el('div', 'abs', frame, { left: 0, top: 0, width: FW + 'px', height: FH + 'px', transformOrigin: '50% 0%' });
  el('div', 'abs', content, { left: '60px', top: '50px', width: '460px', height: '40px', borderRadius: '10px', background: '#1d2250' });
  const lines = [0, 1, 2, 3, 4, 5].map((i) => el('div', 'abs', content, { left: '60px', top: 130 + i * 62 + 'px', width: [440, 400, 460, 380, 420, 340][i] + 'px', height: '22px', borderRadius: '11px', background: '#c9cbe0', transformOrigin: '0% 50%' }));
  const BARS = [[640, 220, '#6d4aff', 'PLAN'], [780, 330, '#ff6b4a', 'ACTUAL']];
  const bars = BARS.map(([x, h, c, lab]) => {
    const b = el('div', 'abs', content, { left: x + 'px', top: 520 - h + 'px', width: '100px', height: h + 'px', borderRadius: '10px 10px 0 0', background: c });
    const l = el('div', 'abs', content, { left: x - 30 + 'px', width: '160px', top: 520 - h - 44 + 'px', textAlign: 'center', font: '700 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.06em', color: '#1d2250' });
    l.textContent = lab;
    return { b, l };
  });
  const hatch = el('div', 'abs', bars[1].b, { inset: 0, background: 'repeating-linear-gradient(45deg, rgba(255,255,255,.45) 0 8px, transparent 8px 20px)' });
  el('div', 'abs', content, { left: '600px', top: '520px', width: '320px', height: '3px', background: '#1d2250' });

  // caption zone + band
  const ZT = 430;
  const zone = el('div', 'abs', frame, { left: '14px', right: '14px', top: ZT + 'px', bottom: '14px', borderRadius: '10px', border: '3px dashed var(--coral)', background: 'rgba(255,107,74,.12)' });
  // label sits below the frame on the dark stage, right-aligned with the frame edge
  const zlab = el('div', 'abs', frameWrap, { right: '4px', top: FH + 22 + 'px', font: '700 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: 'var(--coral)', whiteSpace: 'nowrap' });
  zlab.textContent = 'CAPTION ZONE';
  const band = el('div', 'abs', frame, { left: '200px', right: '200px', bottom: '30px', height: '66px', borderRadius: '10px', background: 'rgba(170,176,212,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' });
  const cap = el('div', '', band, { font: '600 30px/1 Inter', color: '#9a9fbf', letterSpacing: '-.01em', whiteSpace: 'nowrap' });
  cap.textContent = 'Captions sit near the bottom';
  // badge sits inside the zone, right of the band
  const ratio = el('div', 'abs', frameWrap, { right: '30px', top: FH - 82 + 'px', padding: '8px 12px', borderRadius: '10px', background: 'var(--coral)', font: '800 20px/1 ui-monospace, Menlo, monospace', color: 'var(--night)', boxShadow: '0 0 30px rgba(255,107,74,.7)', whiteSpace: 'nowrap' });
  ratio.textContent = '4.5:1 MIN';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  tl.to(cam, { scale: 1.03, x: -10, duration: ctx.dur, ease: 'none' }, 0);
  tl.to(glow, { x: -60, y: 30, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.from(kicker, { opacity: 0, x: -20, duration: 0.5 }, 0.05);
  tl.from(words, { opacity: 0, y: 40, rotationX: -50, duration: 0.6, stagger: 0.09, ease: 'back.out(1.6)' }, 0.1);
  tl.from(frameWrap, { opacity: 0, x: 90, y: 20, rotation: 1.5, duration: 1.1, ease: 'expo.out' }, 0.25);

  gsap.set(cards, { opacity: 0, x: -40 });
  gsap.set([zone, zlab, ratio], { opacity: 0 });
  gsap.set(band, { y: 120 });
  gsap.set(bars.map((b) => b.l), { opacity: 0, y: 10 });
  gsap.set(hatch, { opacity: 0 });

  tl.to(band, { y: 0, duration: 0.7, ease: 'back.out(1.5)' }, tBottom - 0.15);
  tl.to([zone, zlab], { opacity: 1, duration: 0.4 }, tBottom);
  tl.fromTo(zone, { scaleY: 0.6 }, { scaleY: 1, duration: 0.6, ease: 'back.out(1.8)', transformOrigin: '50% 100%', immediateRender: false }, tBottom);

  tl.to(content, { scale: 0.76, y: 6, duration: 0.9, ease: 'expo.inOut' }, tKeep);
  tl.to(zone, { borderColor: '#1fbf8f', backgroundColor: 'rgba(31,191,143,.10)', duration: 0.5 }, tLight - 0.2);
  tl.to(zlab, { color: '#1fbf8f', duration: 0.5 }, tLight - 0.2);
  tl.to(cards[0], { opacity: 1, x: 0, duration: 0.6, ease: 'back.out(1.7)' }, tLight - 0.15);

  tl.to(cards[1], { opacity: 1, x: 0, duration: 0.6, ease: 'back.out(1.7)' }, tLess - 0.1);
  tl.to(lines.slice(2), { scaleX: 0, opacity: 0, duration: 0.5, stagger: 0.05, ease: 'power3.in' }, tLess);
  tl.to(lines.slice(0, 2), { height: 30, borderRadius: 15, background: '#8a8fb8', duration: 0.5 }, tLess + 0.3);

  tl.to(cards[2], { opacity: 1, x: 0, duration: 0.6, ease: 'back.out(1.7)' }, tContrast - 0.15);
  tl.to(band, { backgroundColor: 'rgba(8,11,31,.94)', duration: 0.4 }, tContrast);
  tl.to(cap, { color: '#ffffff', duration: 0.4 }, tContrast);
  tl.fromTo(band, { scale: 1 }, { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, tContrast);
  tl.fromTo(ratio, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, tContrast + 0.15);

  tl.to(cards[3], { opacity: 1, x: 0, duration: 0.6, ease: 'back.out(1.7)' }, tLabels - 0.15);
  tl.to(bars.map((b) => b.l), { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' }, tLabels);
  tl.to(hatch, { opacity: 1, duration: 0.5 }, tLabels + 0.25);
  tl.to(cards[3], { borderColor: 'rgba(31,191,143,.7)', boxShadow: '0 0 50px rgba(31,191,143,.35), 0 24px 60px rgba(0,0,0,.35)', duration: 0.5 }, tAlone);
});
