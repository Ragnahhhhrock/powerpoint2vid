/* Scene 6: "Speaker notes set the timing. On Pro, AI directs the video, pacing each scene to your narration.
 * Try Basic first at powerpoint2vid.com."
 * Storyboard: warm paper stage, wide. An ink speaker-notes card sits on the left. On "timing" a teal
 * timeline flows out of it like a stopwatch bar. On "directs" scene tiles pop along the timeline, each
 * sized to its own waveform. On "pacing" a playhead sweeps the scenes in time. On "Try" the whole stage
 * recedes and "powerpoint2vid.com" lands centre at 130px in ink, with an amber underline, then holds
 * on a gentle push-in. The "Watch the full video once" bullet is cut. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const safe = (i, w, f) => { const v = ctx.at(i, w); return Number.isFinite(v) ? v : f; };
  const timing = safe(0, 'timing', 1.6);
  const directs = safe(1, 'directs', 3.3);
  const pacing = safe(1, 'pacing', 4.2);
  const tryT = safe(2, 'Try', 6.24);
  const site = safe(2, 'powerpoint2vid.com', safe(2, 'at', 7.6) + 0.25);
  const mono = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 45% 40%, #fffdf8 0%, var(--paper) 60%, #e9e3d6 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 520px' });
  const world = el('div', 'abs', cam, { inset: 0, transformOrigin: '960px 520px' });

  /* ---- speaker notes card ---- */
  const card = el('div', 'abs', world, { left: '140px', top: '330px', width: '440px', height: '380px', borderRadius: '22px',
    background: 'linear-gradient(160deg, #232b42, var(--ink))', boxShadow: '0 40px 80px rgba(27,34,53,.28), 0 8px 20px rgba(27,34,53,.18)' });
  const clab = el('div', 'abs', card, { left: '40px', top: '38px', font: `600 20px/1 ${mono}`, letterSpacing: '.16em', color: 'var(--amber)' });
  clab.textContent = 'SPEAKER NOTES';
  const lineW = [340, 300, 360, 250, 320, 190];
  const lines = lineW.map((w, i) => el('div', 'abs', card, { left: '40px', top: 100 + i * 42 + 'px', width: w + 'px', height: '14px', borderRadius: '7px', background: 'rgba(246,243,236,.22)', transformOrigin: '0 50%' }));
  const lineHi = lineW.map((w, i) => el('div', 'abs', card, { left: '40px', top: 100 + i * 42 + 'px', width: w + 'px', height: '14px', borderRadius: '7px', background: 'var(--teal)', transformOrigin: '0 50%', boxShadow: '0 0 14px rgba(46,196,182,.6)' }));
  gsap.set(lineHi, { scaleX: 0 });

  /* ---- timeline ---- */
  const TY = 520, TX0 = 580, TX1 = 1780;
  const track = el('div', 'abs', world, { left: TX0 + 'px', top: TY - 4 + 'px', width: TX1 - TX0 + 'px', height: '8px', borderRadius: '4px', transformOrigin: '0 50%',
    background: 'linear-gradient(90deg, #1fa99c, var(--teal))', boxShadow: '0 0 24px rgba(46,196,182,.45)' });
  const head = el('div', 'abs', world, { left: TX0 - 13 + 'px', top: TY - 13 + 'px', width: '26px', height: '26px', borderRadius: '50%', background: 'var(--teal)', boxShadow: '0 0 0 6px rgba(46,196,182,.25), 0 0 30px rgba(46,196,182,.8)' });
  const tlab = el('div', 'abs', world, { left: TX0 + 40 + 'px', top: TY + 150 + 'px', font: `600 20px/1 ${mono}`, letterSpacing: '.16em', color: 'var(--mist)' });
  tlab.textContent = 'PACED TO YOUR NARRATION';

  /* ---- scene tiles sized to waveforms ---- */
  const widths = [170, 270, 140, 330, 190];
  const GAP = 10, X0 = 620;
  const rnd = ctx.rand(61);
  const tints = ['#1B2235', '#26304a', '#1B2235', '#26304a', '#1B2235'];
  let x = X0;
  const tiles = widths.map((w, i) => {
    const tile = el('div', 'abs', world, { left: x + 'px', top: TY - 190 + 'px', width: w + 'px', height: '160px', borderRadius: '14px', transformOrigin: '50% 100%',
      background: tints[i], boxShadow: '0 22px 40px rgba(27,34,53,.22)', overflow: 'hidden' });
    el('div', 'abs', tile, { left: '16px', right: '16px', top: '56px', height: '10px', borderRadius: '5px', background: 'rgba(246,243,236,.18)' });
    el('div', 'abs', tile, { left: '16px', width: '45%', top: '78px', height: '10px', borderRadius: '5px', background: 'rgba(246,243,236,.12)' });
    el('div', 'abs', tile, { left: 0, right: 0, bottom: 0, height: '5px', background: i % 2 ? 'var(--amber)' : 'var(--teal)' });
    const n = el('div', 'abs', tile, { left: '16px', top: '18px', font: `700 18px/1 ${mono}`, letterSpacing: '.1em', color: 'rgba(246,243,236,.7)' });
    n.textContent = '0' + (i + 1);
    const bars = [];
    const count = Math.floor(w / 12);
    for (let b = 0; b < count; b++) {
      const h = 10 + Math.pow(rnd(), 0.8) * 60 * (0.55 + 0.45 * Math.sin((b / count) * Math.PI));
      bars.push(el('div', 'abs', world, { left: x + 4 + b * 12 + 'px', top: TY + 22 + 'px', width: '6px', height: h + 'px', borderRadius: '3px', transformOrigin: '50% 0%',
        background: i % 2 ? 'rgba(242,169,59,.85)' : 'rgba(46,196,182,.85)' }));
    }
    const t = { tile, bars, x, w };
    x += w + GAP;
    return t;
  });
  const playhead = el('div', 'abs', world, { left: X0 - 2 + 'px', top: TY - 210 + 'px', width: '4px', height: '320px', borderRadius: '2px', background: 'var(--coral)', boxShadow: '0 0 18px rgba(239,99,81,.7)', opacity: 0 });

  /* ---- final call to action ---- */
  const cta = el('div', 'abs', cam, { left: '80px', right: '80px', top: '380px', textAlign: 'center', transformOrigin: '50% 60%' });
  const kicker = el('div', '', cta, { font: `600 26px/1 ${mono}`, letterSpacing: '.22em', color: '#7a8296', marginBottom: '34px' });
  kicker.textContent = 'TRY BASIC FIRST';
  const url = el('div', '', cta, { display: 'inline-block', font: '800 130px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const chars = ctx.split(url, 'powerpoint2vid.com', 'char');
  const ulWrap = el('div', '', cta, { display: 'flex', justifyContent: 'center', marginTop: '18px' });
  const ul = el('div', '', ulWrap, { width: '1100px', height: '14px', borderRadius: '7px', background: 'var(--amber)', transformOrigin: '0 50%', boxShadow: '0 8px 24px rgba(242,169,59,.45)' });

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.05, blend: 'multiply' });

  /* ---- timeline ---- */
  gsap.set(world, { filter: 'blur(0px)' });
  gsap.set(track, { scaleX: 0 });
  gsap.set([head, tlab, kicker], { opacity: 0 });
  gsap.set(tiles.map((t) => t.tile), { scaleY: 0, opacity: 0 });
  gsap.set(tiles.flatMap((t) => t.bars), { scaleY: 0 });
  gsap.set(chars, { opacity: 0, y: 60 });
  gsap.set(ul, { scaleX: 0 });

  // slow continuous drift
  tl.fromTo(cam, { scale: 1, x: 0 }, { scale: 1.03, x: -10, duration: tryT, ease: 'none' }, 0);

  tl.from(card, { x: -60, opacity: 0, duration: 0.7 }, 0.05);
  tl.from(lines, { scaleX: 0, duration: 0.5, stagger: 0.05 }, 0.2);
  tl.to(lineHi, { scaleX: 1, duration: 0.35, stagger: 0.12, ease: 'power1.inOut' }, 0.8);

  // "timing": teal timeline flows out of the card, stopwatch stretch and snap
  tl.to(head, { opacity: 1, duration: 0.15 }, timing - 0.2);
  tl.to(track, { scaleX: 1.03, duration: 0.75, ease: 'power2.inOut' }, timing - 0.2);
  tl.to(head, { x: (TX1 - TX0) * 1.03, duration: 0.75, ease: 'power2.inOut' }, timing - 0.2);
  tl.to(track, { scaleX: 1, duration: 0.3, ease: 'back.out(2)' }, timing + 0.55);
  tl.to(head, { x: TX1 - TX0, duration: 0.3, ease: 'back.out(2)' }, timing + 0.55);
  tl.to(tlab, { opacity: 1, duration: 0.5 }, timing + 0.4);

  // "directs": scenes tile along the timeline, each sized to its waveform
  tiles.forEach((t, i) => {
    const s = directs - 0.1 + i * 0.12;
    tl.to(t.tile, { scaleY: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.6)' }, s);
    tl.to(t.bars, { scaleY: 1, duration: 0.45, stagger: 0.012, ease: 'back.out(1.8)' }, s + 0.1);
  });

  // "pacing": playhead sweeps through the scenes
  const endX = x - GAP - X0;
  tl.to(playhead, { opacity: 1, duration: 0.2 }, pacing - 0.1);
  tl.to(playhead, { x: endX, duration: Math.max(1, tryT - pacing - 0.2), ease: 'none' }, pacing - 0.1);
  tiles.forEach((t, i) => {
    const frac = (t.x - X0 + t.w / 2) / endX;
    tl.to(t.tile, { y: -10, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, pacing - 0.1 + frac * Math.max(1, tryT - pacing - 0.2) - 0.1);
  });

  // "Try": the stage recedes, the URL lands
  tl.to(world, { scale: 0.86, opacity: 0.12, filter: 'blur(6px)', duration: 0.8, ease: 'expo.inOut' }, tryT - 0.15);
  tl.to(cam, { scale: 1, x: 0, duration: 0.8, ease: 'expo.inOut' }, tryT - 0.15);
  tl.fromTo(kicker, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, tryT + 0.1);
  const urlT = Math.min(Math.max(tryT + 0.45, site - 0.35), ctx.dur - 2.2);
  tl.to(chars, { opacity: 1, y: 0, duration: 0.55, stagger: 0.03, ease: 'back.out(1.7)' }, urlT);
  tl.to(ul, { scaleX: 1, duration: 0.7, ease: 'expo.out' }, urlT + 0.45);
  tl.fromTo(cta, { scale: 1 }, { scale: 1.05, duration: ctx.dur - urlT, ease: 'power1.inOut', immediateRender: false }, urlT);
});
