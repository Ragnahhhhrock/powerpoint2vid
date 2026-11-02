/* Scene 2 — "A new hire is more likely to finish five six-minute videos than one thirty-minute video.
 * So split your content into short, focused topics."
 * Storyboard: night stage with a 0–30 min timeline rail. On "five six-minute videos" five dashed
 * ghost slots flicker in, then fade on "than". On "one thirty-minute video" a long glowing coral bar
 * sweeps across, with the counter running to "30 min". On "split" it snaps into five teal "6 min"
 * segments that spring apart. On "short, focused topics" three of them flip to paper cards: Welcome &
 * how we work / Policies / Systems & tools. The camera dollies along the row, then holds. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w) => ctx.at(i, w);
  const tFive = W(0, 'five'), tThan = W(0, 'than'), tOne = W(0, 'one'), tThirty = W(0, 'thirty-minute'),
    tVideo = W(0, 'video.'), tSplit = W(1, 'split'), tShort = W(1, 'short,'), tFocused = W(1, 'focused'), tTopics = W(1, 'topics.');

  const RX = 160, RW = 1600, TOP = 430, H = 220, SW = 300, GAP = 25;
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 50% 52%, #1d2740 0%, var(--night) 75%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 30% at 50% 50%, rgba(255,107,91,.0), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  const tag = el('div', 'abs', cam, { left: RX + 'px', top: '128px', font: `600 22px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--slate)' });
  tag.textContent = 'ONBOARDING · RUNTIME';
  const head = el('div', 'abs', cam, { left: RX + 'px', top: '172px', width: '1600px', font: '800 80px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)' });
  const headWords = ctx.split(head, 'Short videos beat one long one', 'word');

  const track = el('div', 'abs', cam, { left: RX + 'px', top: TOP + 'px', width: RW + 'px', height: H + 'px', borderRadius: '22px', background: 'rgba(255,255,255,.035)', border: '2px solid rgba(255,255,255,.07)', boxSizing: 'border-box' });
  const ticks = [];
  for (let i = 0; i <= 5; i++) {
    const x = RX + i * 320;
    const ln = el('div', 'abs', cam, { left: x - 1 + 'px', top: TOP + H + 22 + 'px', width: '2px', height: '18px', background: 'rgba(255,255,255,.3)' });
    const lb = el('div', 'abs', cam, { left: x - 100 + 'px', width: '200px', top: TOP + H + 52 + 'px', textAlign: 'center', font: `600 22px/1 ${MONO}`, letterSpacing: '.1em', color: 'var(--slate)' });
    lb.textContent = i === 5 ? '30 MIN' : String(i * 6);
    ticks.push(ln, lb);
  }

  const ghosts = [0, 1, 2, 3, 4].map((i) => el('div', 'abs', cam, { left: RX + i * (SW + GAP) + 'px', top: TOP + 'px', width: SW + 'px', height: H + 'px', borderRadius: '22px', border: '3px dashed rgba(31,181,168,.55)', boxSizing: 'border-box' }));

  const bar = el('div', 'abs', cam, { left: RX + 'px', top: TOP + 'px', width: RW + 'px', height: H + 'px', borderRadius: '22px', transformOrigin: '0% 50%',
    background: 'linear-gradient(180deg, #ff8a7c 0%, var(--coral) 55%, #e2493a 100%)', boxShadow: '0 0 70px rgba(255,107,91,.45), inset 0 2px 0 rgba(255,255,255,.35)' });
  const barLab = el('div', 'abs', cam, { left: RX + 56 + 'px', top: TOP + 58 + 'px', font: '900 104px/1 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff', fontVariantNumeric: 'tabular-nums' });
  const counter = { n: 0 };

  const TOPICS = ['Welcome & how we work', 'Policies', 'Systems & tools'];
  const segs = [0, 1, 2, 3, 4].map((i) => {
    const seg = el('div', 'abs', cam, { left: RX + i * 320 + 'px', top: TOP + 'px', width: '320px', height: H + 'px', perspective: '1400px' });
    const inner = el('div', 'abs', seg, { inset: 0, transformStyle: 'preserve-3d' });
    const front = el('div', 'abs', inner, { inset: 0, borderRadius: '22px', backgroundColor: '#FF6B5B', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden',
      boxShadow: '0 24px 60px rgba(0,0,0,.4), 0 0 40px rgba(31,181,168,.25)' });
    el('div', 'abs', front, { inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,.22), rgba(0,0,0,.12))' });
    const vid = el('div', 'abs', front, { left: '26px', top: '24px', font: `700 18px/1 ${MONO}`, letterSpacing: '.14em', color: 'rgba(255,255,255,.8)' });
    vid.textContent = 'VIDEO 0' + (i + 1);
    const six = el('div', 'abs', front, { left: 0, right: 0, top: '92px', textAlign: 'center', font: '800 72px/1 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff' });
    six.textContent = '6 min';
    let back = null;
    if (i < 3) {
      back = el('div', 'abs', inner, { inset: 0, borderRadius: '22px', background: 'var(--paper)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
        boxShadow: '0 30px 70px rgba(0,0,0,.45), 0 0 50px rgba(255,197,71,.25)' });
      const num = el('div', 'abs', back, { left: '26px', top: '24px', font: `700 18px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--coral)' });
      num.textContent = '0' + (i + 1) + ' · 6 MIN';
      const tp = el('div', 'abs', back, { left: '26px', right: '22px', bottom: '28px', font: '800 38px/1.08 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)' });
      tp.textContent = TOPICS[i];
      gsap.set(back, { rotationY: 180 });
    }
    return { seg, inner, front, vid, six, back };
  });

  const cuts = [1, 2, 3, 4].map((i) => el('div', 'abs', cam, { left: RX + i * 320 - 3 + 'px', top: TOP - 40 + 'px', width: '6px', height: H + 80 + 'px', borderRadius: '3px', background: '#fff', boxShadow: '0 0 30px #fff', opacity: 0, transformOrigin: '50% 50%' }));

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });
  ctx.onFrame(() => { barLab.textContent = Math.round(counter.n) + ' min'; });

  gsap.set([...ghosts, bar, barLab, ...segs.map((s) => s.seg), ...segs.flatMap((s) => [s.vid, s.six])], { opacity: 0 });
  gsap.set(bar, { scaleX: 0 });

  tl.from(track, { opacity: 0, scaleX: 0.92, duration: 0.7 }, 0.05);
  tl.from(tag, { opacity: 0, x: -20, duration: 0.5 }, 0.1);
  tl.from(headWords, { opacity: 0, y: 40, duration: 0.6, stagger: 0.06, ease: 'back.out(1.6)' }, 0.15);
  tl.from(ticks, { opacity: 0, y: 10, duration: 0.4, stagger: 0.03 }, 0.4);

  tl.fromTo(ghosts, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.09, ease: 'back.out(1.8)' }, tFive - 0.05);
  tl.to(ghosts, { opacity: 0, duration: 0.4 }, tThan);

  tl.to(bar, { opacity: 1, duration: 0.15 }, tOne - 0.05);
  tl.to(bar, { scaleX: 1, duration: tVideo + 0.2 - tOne, ease: 'power2.inOut' }, tOne - 0.05);
  tl.to(barLab, { opacity: 1, duration: 0.3 }, tOne + 0.1);
  tl.to(counter, { n: 30, duration: tVideo + 0.2 - tOne, ease: 'power2.inOut' }, tOne - 0.05);
  tl.to(glow, { background: 'radial-gradient(45% 35% at 50% 50%, rgba(255,107,91,.18), transparent 70%)', duration: 0.8 }, tThirty);
  tl.to(bar, { boxShadow: '0 0 110px rgba(255,107,91,.7), inset 0 2px 0 rgba(255,255,255,.35)', duration: 0.4, yoyo: true, repeat: 1 }, tVideo);

  tl.fromTo(cuts, { opacity: 0, scaleY: 0.3 }, { opacity: 1, scaleY: 1, duration: 0.12, stagger: 0.03, immediateRender: false }, tSplit - 0.15);
  tl.to(cuts, { opacity: 0, duration: 0.3 }, tSplit + 0.05);
  tl.set(segs.map((s) => s.seg), { opacity: 1 }, tSplit);
  tl.set([bar, barLab], { opacity: 0 }, tSplit);
  segs.forEach((s, i) => {
    tl.to(s.seg, { left: RX + i * (SW + GAP), width: SW, duration: 0.75, ease: 'back.out(1.7)' }, tSplit + 0.02);
    tl.fromTo(s.seg, { y: 0 }, { y: -14, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, tSplit + 0.02 + i * 0.04);
    tl.to(s.front, { backgroundColor: '#1FB5A8', duration: 0.4, ease: 'power2.out' }, tSplit + 0.05 + i * 0.05);
  });
  tl.fromTo(segs.flatMap((s) => [s.vid, s.six]), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, immediateRender: false }, tSplit + 0.2);
  tl.to(glow, { background: 'radial-gradient(45% 35% at 50% 50%, rgba(31,181,168,.16), transparent 70%)', duration: 0.8 }, tSplit);
  tl.to(ticks, { opacity: 0.3, duration: 0.5 }, tSplit + 0.3);

  [tShort, tFocused, tTopics].forEach((t, i) => {
    tl.to(segs[i].inner, { rotationY: 180, duration: 0.75, ease: 'back.out(1.4)' }, t - 0.1);
    tl.fromTo(segs[i].seg, { y: 0 }, { y: -24, duration: 0.75, ease: 'back.out(1.6)', immediateRender: false }, t - 0.1);
  });
  tl.to([segs[3].seg, segs[4].seg], { opacity: 0.55, duration: 0.6 }, tTopics);

  tl.fromTo(cam, { scale: 1 }, { scale: 1.02, duration: tSplit, ease: 'sine.inOut' }, 0);
  tl.to(cam, { y: -10, duration: ctx.dur, ease: 'none' }, 0);
  tl.to(cam, { scale: 1.04, x: -40, duration: 1.3, ease: 'expo.inOut' }, tTopics - 0.3);
});
