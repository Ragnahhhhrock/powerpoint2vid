/* Scene 2 — "PowerPoint2Vid reads your whole deck. It writes the story, designs every scene,
 *            and times each animation to the narration."
 * Storyboard: light paper scene (contrast after the dim player). A scan beam reads the stacked deck,
 * then a path draws left to right and three cards pop exactly on "story", "scene" and "times":
 * a script being written, a storyboard, and keyframes snapping to a waveform. Ends on a glowing
 * play button on "narration". */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const reads = ctx.at(0, 'reads'), whole = ctx.at(0, 'whole');
  const story = ctx.at(1, 'story'), designs = ctx.at(1, 'designs'), times = ctx.at(1, 'times'), narration = ctx.at(1, 'narration');

  stage.style.background = 'var(--paper)';
  el('div', 'abs', stage, { inset: 0, backgroundImage: 'radial-gradient(rgba(14,19,48,.13) 1.6px, transparent 1.6px)', backgroundSize: '36px 36px' });
  el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(50% 45% at 85% 70%, rgba(255,107,74,.10), transparent 70%), radial-gradient(45% 45% at 15% 20%, rgba(109,74,255,.10), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0 });

  const eyebrow = el('div', 'abs', cam, { left: '140px', top: '118px', font: '700 24px/1 Inter', letterSpacing: '.22em', color: 'var(--violet)' });
  eyebrow.textContent = 'HOW IT WORKS';
  const head = el('div', 'abs', cam, { left: '132px', top: '160px', font: '800 100px/1.05 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const hw = ctx.split(head, 'Your whole deck, directed.', 'word');

  const row = el('div', 'abs', cam, { inset: 0, transform: 'translateY(48px)' });
  /* deck stack */
  const stack = el('div', 'abs', row, { left: '140px', top: '420px', width: '360px', height: '203px' });
  const cards = [5, 4, 3, 2, 1].map((n, i) => { const im = el('img', 'abs', stack, { width: '360px', borderRadius: '8px', boxShadow: '0 12px 30px rgba(14,19,48,.18)', border: '1px solid rgba(14,19,48,.08)', left: (4 - i) * -10 + 'px', top: (4 - i) * 14 + 'px' }); im.src = ctx.asset(`slide-${n}.png`); return im; });
  const beam = el('div', 'abs', stack, { left: '-60px', width: '480px', height: '6px', top: '-30px', borderRadius: '3px', background: 'linear-gradient(90deg, transparent, var(--violet), transparent)', boxShadow: '0 0 30px 8px rgba(109,74,255,.35)', opacity: 0 });
  const tags = ['5 slides', '1 chart', 'speaker notes'].map((t, i) => { const d = el('div', 'abs', row, { left: 140 + i * 128 + (i === 2 ? 0 : 0) + 'px', top: '700px', padding: '10px 16px', borderRadius: '999px', background: '#fff', border: '1px solid rgba(14,19,48,.1)', font: '600 20px/1 Inter', color: 'var(--ink)', boxShadow: '0 6px 16px rgba(14,19,48,.08)', whiteSpace: 'nowrap' }); d.textContent = t; return d; });
  tags[1].style.left = '264px'; tags[2].style.left = '384px';

  /* path */
  const svg = el('div', 'abs', row, { left: 0, top: 0, width: '1920px', height: '1080px' });
  svg.innerHTML = `<svg width="1920" height="1080"><defs><linearGradient id="pg" x1="0" x2="1"><stop offset="0" stop-color="#6d4aff"/><stop offset="1" stop-color="#ff6b4a"/></linearGradient></defs>
    <path id="p" d="M520 545 C 560 545, 570 545, 600 545 L 1660 545" fill="none" stroke="url(#pg)" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 14"/></svg>`;
  const path = svg.querySelector('#p'); const PL = path.getTotalLength();
  gsap.set(svg, { clipPath: 'inset(0px 1400px 0px 0px)' });

  /* node cards */
  const node = (x, label, accent) => {
    const c = el('div', 'abs', row, { left: x + 'px', top: '360px', width: '320px', height: '370px', borderRadius: '22px', background: '#fff', boxShadow: '0 30px 60px -20px rgba(14,19,48,.28), 0 2px 6px rgba(14,19,48,.06)', border: '1px solid rgba(14,19,48,.06)', overflow: 'hidden' });
    const h = el('div', 'abs', c, { left: '28px', top: '26px', font: '800 34px/1 Inter', letterSpacing: '-.02em', color: 'var(--ink)' }); h.textContent = label;
    el('div', 'abs', c, { left: '28px', top: '72px', width: '44px', height: '5px', borderRadius: '3px', background: accent });
    return c;
  };
  const nStory = node(620, 'Story', 'var(--violet)');
  const nScene = node(980, 'Scenes', 'var(--coral)');
  const nTime = node(1340, 'Timing', 'var(--mint)');

  // Story: script lines being written
  const lines = ['This video started life', 'as five ordinary slides.', 'Watch what happens', 'when they get a director.'];
  const lineEls = lines.map((t, i) => { const d = el('div', 'abs', nStory, { left: '28px', top: 112 + i * 52 + 'px', font: '500 22px/1.3 Inter', color: i % 2 ? '#5b6190' : '#0e1330', whiteSpace: 'nowrap', clipPath: 'inset(0 100% 0 0)' }); d.textContent = t; return d; });
  const caret = el('div', 'abs', nStory, { left: '28px', top: '114px', width: '3px', height: '28px', background: 'var(--violet)' });

  // Scenes: three storyboard frames
  const frames = [['#1b1f4f', '#6d4aff'], ['#fff1ec', '#ff6b4a'], ['#0e1330', '#1fbf8f']].map(([bg, ac], i) => {
    const f = el('div', 'abs', nScene, { left: 28 + (i % 2) * 138 + 'px', top: 112 + Math.floor(i / 2) * 116 + 'px', width: '126px', height: '100px', borderRadius: '10px', background: bg, border: '1px solid rgba(14,19,48,.1)', overflow: 'hidden' });
    if (i === 0) { el('div', 'abs', f, { left: '14px', top: '22px', width: '70px', height: '10px', borderRadius: '5px', background: '#fff' }); el('div', 'abs', f, { left: '14px', top: '40px', width: '90px', height: '10px', borderRadius: '5px', background: ac }); }
    if (i === 1) { [26, 40, 58].forEach((h, k) => el('div', 'abs', f, { left: 22 + k * 30 + 'px', bottom: '16px', width: '20px', height: h + 'px', borderRadius: '4px', background: k === 2 ? ac : '#ffc4b5' })); }
    if (i === 2) { el('div', 'abs', f, { left: '40px', top: '27px', width: '46px', height: '46px', borderRadius: '50%', background: ac, boxShadow: `0 0 24px ${ac}` }); }
    return f;
  });
  const f4 = el('div', 'abs', nScene, { left: '166px', top: '228px', width: '126px', height: '100px', borderRadius: '10px', border: '2px dashed rgba(14,19,48,.18)' });
  frames.push(f4);

  // Timing: waveform + keyframe diamonds
  const wf = el('div', 'abs', nTime, { left: '28px', top: '150px', width: '264px', height: '110px' });
  const H = [18, 34, 60, 42, 22, 70, 88, 50, 30, 64, 40, 20, 52, 76, 36, 18, 44, 30];
  const barsW = H.map((h, i) => el('div', 'abs', wf, { left: i * 15 + 'px', top: 55 - h / 2 + 'px', width: '8px', height: h + 'px', borderRadius: '4px', background: 'rgba(31,191,143,.35)', transformOrigin: '50% 50%' }));
  const peaks = [6, 13];
  const dia = peaks.map((p) => el('div', 'abs', nTime, { left: 28 + p * 15 - 7 + 'px', top: '290px', width: '22px', height: '22px', background: 'var(--violet)', transform: 'rotate(45deg)', borderRadius: '4px' }));
  const ph = el('div', 'abs', nTime, { left: '28px', top: '140px', width: '3px', height: '180px', background: 'var(--coral)' });
  const kfLabel = el('div', 'abs', nTime, { left: '28px', top: '326px', font: '600 18px/1 ui-monospace, Menlo, monospace', color: '#5b6190' });
  kfLabel.textContent = 'keyframes → words';

  // Final play button
  const play = el('div', 'abs', row, { left: '1690px', top: '475px', width: '140px', height: '140px', borderRadius: '50%', background: 'linear-gradient(135deg, #6d4aff, #ff6b4a)', boxShadow: '0 20px 60px rgba(109,74,255,.45)' });
  play.innerHTML = '<svg width="140" height="140" viewBox="0 0 140 140"><path d="M58 44l40 26-40 26z" fill="#fff"/></svg>';
  const ring = el('div', 'abs', row, { left: '1690px', top: '475px', width: '140px', height: '140px', borderRadius: '50%', border: '4px solid #ff6b4a', opacity: 0 });
  const pl = el('div', 'abs', row, { left: '1690px', top: '640px', width: '140px', textAlign: 'center', font: '800 30px/1 Inter', color: 'var(--ink)' }); pl.textContent = 'Video';

  ctx.fx.grain({ opacity: 0.05, blend: 'multiply' });

  /* ---- timeline ---- */
  const pop = (t, target) => tl.from(target, { y: 40, scale: 0.9, opacity: 0, duration: 0.7, ease: 'back.out(1.6)' }, t);
  tl.fromTo(cam, { scale: 1.04, x: 30 }, { scale: 1, x: 0, duration: ctx.dur, ease: 'power1.out' }, 0);
  tl.from(eyebrow, { opacity: 0, x: -20, duration: 0.5 }, 0.2);
  tl.from(hw, { yPercent: 100, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'back.out(1.5)' }, 0.3);
  tl.from(cards, { y: 60, opacity: 0, rotation: (i) => (i - 2) * 3, duration: 0.7, stagger: 0.07, ease: 'back.out(1.4)' }, 0.25);

  // reads the whole deck: beam sweeps, each card lifts as it's read
  tl.set(beam, { opacity: 1 }, reads);
  tl.fromTo(beam, { top: -20 }, { top: 270, duration: whole - reads + 0.6, ease: 'power1.inOut' }, reads);
  tl.to(cards, { y: '-=14', duration: 0.18, yoyo: true, repeat: 1, stagger: 0.12, ease: 'power2.out' }, reads + 0.1);
  tl.to(beam, { opacity: 0, duration: 0.3 }, whole + 0.6);
  tl.from(tags, { y: 20, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'back.out(2)' }, whole);

  // path draws through the nodes
  tl.to(svg, { clipPath: 'inset(0px 260px 0px 0px)', duration: narration - story + 0.6, ease: 'none' }, story - 0.5);
  pop(story - 0.25, nStory);
  lineEls.forEach((l, i) => tl.to(l, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'none' }, story + 0.1 + i * 0.42));
  tl.to(caret, { top: (i) => 114 + 3 * 52, left: 300, duration: 1.7, ease: 'steps(4)' }, story + 0.1);
  tl.to(caret, { opacity: 0, duration: 0.2 }, story + 2);

  pop(designs - 0.25, nScene);
  tl.from(frames, { scale: 0.6, opacity: 0, duration: 0.5, stagger: 0.14, ease: 'back.out(2)' }, designs + 0.1);

  pop(times - 0.25, nTime);
  tl.from(barsW, { scaleY: 0.1, duration: 0.45, stagger: 0.025, ease: 'back.out(2)' }, times);
  tl.fromTo(ph, { left: 28 }, { left: 28 + 17 * 15, duration: narration - times + 0.4, ease: 'none' }, times + 0.1);
  peaks.forEach((p, i) => {
    const tt = times + 0.1 + ((narration - times + 0.4) * p) / 17;
    tl.from(dia[i], { y: -40, opacity: 0, duration: 0.35, ease: 'bounce.out' }, tt - 0.35);
    tl.to(barsW[p], { background: 'var(--mint)', scaleY: 1.2, duration: 0.15, yoyo: true, repeat: 1 }, tt);
  });
  tl.from(kfLabel, { opacity: 0, duration: 0.4 }, times + 0.5);

  // narration -> video
  tl.from([play, pl], { scale: 0.3, opacity: 0, duration: 0.6, ease: 'back.out(2.2)' }, narration - 0.1);
  tl.fromTo(ring, { scale: 1, opacity: 0.9 }, { scale: 1.8, opacity: 0, duration: 1, ease: 'power2.out', immediateRender: false }, narration + 0.25);
  tl.fromTo(ring, { scale: 1, opacity: 0.6 }, { scale: 1.8, opacity: 0, duration: 1, ease: 'power2.out', immediateRender: false }, narration + 0.85);
});
