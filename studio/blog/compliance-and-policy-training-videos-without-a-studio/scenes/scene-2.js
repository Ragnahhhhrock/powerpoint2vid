/* Scene 3 — "Rewrite every headline as an instruction. 'Gifts and hospitality' becomes: declare any gift
 * over the policy limit within five working days."
 * Storyboard: ink stage, close typographic shot. The vague headline "Gifts and hospitality" sits in slate
 * at 110px under a HEADLINE tag. A caret blinks on "Rewrite". On "instruction" the tag flips to teal
 * INSTRUCTION. On "becomes" the old headline shatters letter by letter and the camera pushes in. The
 * letters reassemble in paper white as the deck's rule. "Declare" ignites teal on the word, and
 * "five working days" gets an amber underline on "five". A quick secondary flip follows:
 * "Data handling" turns into "Lock your screen whenever you leave your desk". */
P2V.scene((ctx) => {
  const { tl, el, stage, split } = ctx;
  const dur = ctx.dur;
  const tRewrite = ctx.at(0, 'Rewrite'), tInstr = ctx.at(0, 'instruction');
  const tBecomes = ctx.at(1, 'becomes'), tDeclare = ctx.at(1, 'declare');
  const tFive = ctx.at(1, 'five'), tDays = ctx.at(1, 'days');
  const r = ctx.rand(11);
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(70% 70% at 35% 40%, #26324a 0%, var(--ink) 55%, var(--night) 100%)';
  const glow = el('div', 'abs', stage, { left: '-200px', top: '-150px', width: '1400px', height: '1000px', background: 'radial-gradient(closest-side, rgba(20,163,139,.12), transparent)', opacity: 0.4 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '700px 420px' });

  /* tag */
  const tag = el('div', 'abs', cam, { left: '160px', top: '150px', padding: '12px 20px', borderRadius: '8px', border: '2px solid rgba(138,151,168,.5)', font: `600 24px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--slate mist)' });
  tag.style.color = '#8A97A8';
  tag.textContent = 'HEADLINE';

  /* before headline */
  const before = el('div', 'abs', cam, { left: '160px', top: '300px', font: '800 110px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: '#8A97A8', whiteSpace: 'nowrap' });
  const beforeTxt = el('span', '', before, {});
  const bChars = split(beforeTxt, 'Gifts and hospitality', 'char');
  const caret = el('span', '', before, { display: 'inline-block', width: '8px', height: '100px', marginLeft: '14px', verticalAlign: '-12px', background: '#F2A93B', opacity: 0 });

  /* after headline (deck's exact rule) */
  const after = el('div', 'abs', cam, { left: '160px', top: '280px', font: '800 104px/1.1 Inter Display, Inter', letterSpacing: '-.04em', color: '#F6F3EC', whiteSpace: 'nowrap' });
  const LINES = [['Declare', 'any', 'gift', 'over'], ['the', 'policy', 'limit', 'within'], ['five', 'working', 'days.']];
  const aChars = [], wordChars = {};
  let underline;
  LINES.forEach((words, li) => {
    const line = el('div', '', after, {});
    let holder = line;
    if (li === 2) {
      holder = el('span', '', line, { position: 'relative', display: 'inline-block' });
      underline = el('span', 'abs', holder, { left: '0', right: '30px', bottom: '-6px', height: '12px', borderRadius: '6px', background: '#F2A93B', boxShadow: '0 0 30px rgba(242,169,59,.6)', transformOrigin: '0% 50%' });
    }
    words.forEach((w, wi) => {
      const ws = el('span', '', holder, { display: 'inline-block' });
      const cs = split(ws, w, 'char');
      aChars.push(...cs);
      wordChars[w] = cs;
      if (wi < words.length - 1) holder.appendChild(document.createTextNode(' '));
    });
  });

  /* secondary flip pair */
  const sub = el('div', 'abs', cam, { left: '160px', top: '780px', width: '1600px', height: '140px', perspective: '1200px' });
  const subLab = el('div', 'abs', sub, { left: '0', top: '0', font: `600 20px/1 ${MONO}`, letterSpacing: '.16em', color: '#8A97A8' });
  subLab.textContent = 'NEXT SLIDE';
  const faceStyle = { left: '0', top: '44px', font: '800 60px/1.1 Inter Display, Inter', letterSpacing: '-.035em', whiteSpace: 'nowrap', transformOrigin: '50% 50% -30px', backfaceVisibility: 'hidden' };
  const fBefore = el('div', 'abs', sub, { ...faceStyle, color: '#8A97A8' }); fBefore.textContent = 'Data handling';
  const fAfter = el('div', 'abs', sub, { ...faceStyle, color: '#F6F3EC' });
  fAfter.innerHTML = '<span style="color:#14A38B">Lock</span> your screen whenever you leave your desk';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  const caretS = { v: 0 };
  let tagState = 0;
  ctx.onFrame((t) => {
    caret.style.opacity = caretS.v * (Math.floor(t * 2.4) % 2 ? 0.15 : 1);
    const s = t >= tInstr ? 1 : 0;
    if (s !== tagState) {
      tagState = s;
      tag.textContent = s ? 'INSTRUCTION' : 'HEADLINE';
      tag.style.color = s ? '#14A38B' : '#8A97A8';
      tag.style.borderColor = s ? 'rgba(20,163,139,.8)' : 'rgba(138,151,168,.5)';
    }
  });

  /* ---- timeline ---- */
  tl.to(cam, { scale: 1.02, x: -10, duration: dur, ease: 'none' }, 0);
  tl.to(glow, { opacity: 1, x: 120, duration: dur, ease: 'sine.inOut' }, 0);
  tl.from(tag, { opacity: 0, x: -30, duration: 0.6 }, 0.05);
  tl.from(bChars, { opacity: 0, y: 40, duration: 0.6, stagger: 0.02 }, 0.1);

  tl.to(caretS, { v: 1, duration: 0.2 }, tRewrite);
  tl.fromTo(tag, { scale: 1 }, { scale: 1.12, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, tInstr);
  tl.to(before, { x: 12, duration: 0.5, ease: 'sine.inOut' }, tInstr);

  // shatter on "becomes"
  const sh = tBecomes - 0.1;
  tl.to(caretS, { v: 0, duration: 0.1 }, sh);
  bChars.forEach((c, i) => {
    tl.to(c, { x: (r() - 0.5) * 900, y: (r() - 0.3) * 700, rotation: (r() - 0.5) * 220, scale: 0.4 + r(), opacity: 0, duration: 0.75, ease: 'power3.in' }, sh + Math.abs(i - bChars.length / 2) * 0.012);
  });
  tl.to(cam, { scale: 1.07, duration: 1.2, ease: 'expo.inOut' }, tBecomes - 0.1);

  // reassemble
  aChars.forEach((c) => gsap.set(c, { x: (r() - 0.5) * 1200, y: (r() - 0.5) * 900, rotation: (r() - 0.5) * 240, opacity: 0, scale: 0.5 }));
  gsap.set(underline, { scaleX: 0 });
  tl.to(aChars, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)', stagger: 0.009 }, tBecomes + 0.3);
  tl.to(wordChars['Declare'], { color: '#14A38B', textShadow: '0 0 40px rgba(20,163,139,.6)', duration: 0.35, stagger: 0.03 }, Math.max(tDeclare, tBecomes + 0.6));
  tl.to(underline, { scaleX: 1, duration: 0.45, ease: 'power4.out' }, Math.max(tFive, tBecomes + 1.4));
  tl.to(cam, { scale: 1.04, duration: 1.4, ease: 'power2.inOut' }, Math.max(tFive, tBecomes + 1.4) + 0.2);

  // secondary flip — finished before the last 1.5s
  const flipT = Math.min(tDays, dur - 2.2);
  tl.from([subLab, fBefore], { opacity: 0, y: 24, duration: 0.5, stagger: 0.08 }, flipT - 1.1);
  gsap.set(fAfter, { rotationX: 90, opacity: 0 });
  tl.to(fBefore, { rotationX: -90, opacity: 0, duration: 0.35, ease: 'power2.in' }, flipT);
  tl.to(fAfter, { rotationX: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.8)' }, flipT + 0.3);
  tl.to(subLab, { color: '#14A38B', duration: 0.3 }, flipT + 0.3);
});
