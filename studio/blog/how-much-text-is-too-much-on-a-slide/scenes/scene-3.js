/* Scene 3 — "Keep body text at 24pt or larger. Watch for two ideas fighting on one slide.
 * And if you could read it aloud as your script, move that text."
 * Storyboard: bright paper stage, close-up on a single white slide. A tiny line of body text sits among
 * other tiny lines; on "24pt" it grows until "24pt" reads at 150px in ink, the rest dissolve, and
 * "or larger" lands beneath it. On "two ideas" a teal seam splits the slide and two shapes (coral circle,
 * amber block) slide in and shove against each other on "fighting". On "read it aloud" a speech bubble
 * with a live waveform overlays a paragraph. On "move" the paragraph lifts off the slide and slides out
 * along an arrow labelled "move". We hold on the clean, emptied slide with only its headline. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w) => ctx.at(i, w);
  const tBody = A(0, 'body'), tText = A(0, 'text'), t24 = A(0, '24pt'), tLarger = A(0, 'larger.');
  const tTwo = A(1, 'two'), tIdeas = A(1, 'ideas'), tFight = A(1, 'fighting'), tOne = A(1, 'one');
  const tAnd = A(2, 'And'), tRead = A(2, 'read'), tAloud = A(2, 'aloud'), tScript = A(2, 'script,'), tMove = A(2, 'move'), tTextEnd = A(2, 'text.');
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 50% 40%, #fffdf8 0%, var(--paper) 70%, #ebe6da 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  // soft light pool behind the card
  el('div', 'abs', cam, { left: '260px', top: '120px', width: '1400px', height: '860px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,181,71,.16), transparent)', filter: 'blur(20px)' });

  /* the slide card */
  const CW = 1440, CH = 780;
  const card = el('div', 'abs', cam, { left: '240px', top: '150px', width: CW + 'px', height: CH + 'px', borderRadius: '20px', background: '#ffffff',
    boxShadow: '0 50px 120px rgba(20,22,31,.16), 0 8px 24px rgba(20,22,31,.08), inset 0 0 0 1px rgba(20,22,31,.06)' });
  const cardRing = el('div', 'abs', card, { inset: '-4px', borderRadius: '24px', border: '4px solid var(--coral)', opacity: 0 });

  /* ---- ACT 1: tiny text grows to 24pt ---- */
  const act1 = el('div', 'abs', card, { inset: 0 });
  const rowsY = [330, 355, 380, 405, 430, 455];
  const tiny = [];
  rowsY.forEach((y, r) => {
    if (r === 2) {
      tiny.push(el('div', 'abs', act1, { left: '470px', top: y + 'px', width: '200px', height: '9px', borderRadius: '5px', background: 'rgba(138,144,166,.45)' }));
      tiny.push(el('div', 'abs', act1, { left: '770px', top: y + 'px', width: '200px', height: '9px', borderRadius: '5px', background: 'rgba(138,144,166,.45)' }));
    } else {
      const w = [500, 470, 0, 490, 430, 300][r];
      tiny.push(el('div', 'abs', act1, { left: '470px', top: y + 'px', width: w + 'px', height: '9px', borderRadius: '5px', background: 'rgba(138,144,166,.45)' }));
    }
  });
  const big = el('div', 'abs', act1, { left: '420px', width: '600px', top: 384 - 75 + 'px', height: '150px', textAlign: 'center',
    font: '900 150px/150px Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--slate)', transformOrigin: '50% 50%', whiteSpace: 'nowrap' });
  big.textContent = '24pt';
  const under = el('div', 'abs', act1, { left: '470px', width: '500px', top: '480px', height: '10px', borderRadius: '5px', background: 'var(--coral)', transformOrigin: '0% 50%' });
  const larger = el('div', 'abs', act1, { left: '420px', width: '600px', top: '540px', textAlign: 'center', font: `700 30px/1 ${MONO}`, letterSpacing: '.18em', color: 'var(--coral)' });
  larger.innerHTML = '&#8593;&nbsp; OR LARGER';
  const lab1 = el('div', 'abs', act1, { left: '80px', top: '70px', font: `600 22px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--slate)' });
  lab1.textContent = 'BODY TEXT';

  /* ---- ACT 2: two ideas fighting ---- */
  const act2 = el('div', 'abs', card, { inset: 0 });
  const seam = el('div', 'abs', act2, { left: CW / 2 - 4 + 'px', top: '60px', width: '8px', height: CH - 120 + 'px', borderRadius: '4px', background: 'var(--teal)',
    boxShadow: '0 0 30px rgba(31,181,168,.6)', transformOrigin: '50% 50%' });
  const S = 300, SY = CH / 2 - S / 2 - 30;
  const shapeA = el('div', 'abs', act2, { left: CW / 2 - S - 14 + 'px', top: SY + 'px', width: S + 'px', height: S + 'px', borderRadius: '50%',
    background: 'radial-gradient(circle at 35% 30%, #ff8a80, var(--coral) 60%, #d8392f)', boxShadow: '0 30px 60px rgba(255,90,78,.35)' });
  const shapeB = el('div', 'abs', act2, { left: CW / 2 + 14 + 'px', top: SY + 'px', width: S + 'px', height: S + 'px', borderRadius: '36px',
    background: 'linear-gradient(150deg, #ffd08a, var(--amber) 55%, #e8952a)', boxShadow: '0 30px 60px rgba(255,181,71,.35)' });
  const labA = el('div', 'abs', act2, { left: CW / 2 - S - 14 + 'px', width: S + 'px', top: SY + S + 40 + 'px', textAlign: 'center', font: `700 24px/1 ${MONO}`, letterSpacing: '.18em', color: 'var(--coral)' });
  labA.textContent = 'IDEA A';
  const labB = el('div', 'abs', act2, { left: CW / 2 + 14 + 'px', width: S + 'px', top: SY + S + 40 + 'px', textAlign: 'center', font: `700 24px/1 ${MONO}`, letterSpacing: '.18em', color: '#d88a1c' });
  labB.textContent = 'IDEA B';

  /* ---- ACT 3: read-aloud paragraph moves out ---- */
  const act3 = el('div', 'abs', card, { inset: 0 });
  const head = el('div', 'abs', act3, { left: '110px', top: '100px', font: '800 72px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  head.textContent = 'One clear point';
  const headBar = el('div', 'abs', act3, { left: '112px', top: '196px', width: '120px', height: '8px', borderRadius: '4px', background: 'var(--teal)', transformOrigin: '0% 50%' });
  const para = el('div', 'abs', act3, { left: '110px', top: '270px', width: '1140px', height: '380px', borderRadius: '14px', transformOrigin: '50% 50%' });
  const paraBg = el('div', 'abs', para, { inset: '-24px', borderRadius: '18px', background: '#fff', boxShadow: '0 40px 90px rgba(20,22,31,.22)', opacity: 0 });
  const lineW = [1100, 1060, 1120, 980, 1080, 1040, 640];
  const lines = lineW.map((w, i) => el('div', 'abs', para, { left: 0, top: i * 54 + 'px', width: w + 'px', height: '20px', borderRadius: '10px', background: 'rgba(138,144,166,.4)', transformOrigin: '0% 50%' }));
  const hl = lineW.map((w, i) => el('div', 'abs', para, { left: '-6px', top: i * 54 - 8 + 'px', width: w + 12 + 'px', height: '36px', borderRadius: '8px', background: 'rgba(255,181,71,.35)', transformOrigin: '0% 50%' }));

  // speech bubble with live waveform
  const bubble = el('div', 'abs', act3, { left: '860px', top: '330px', width: '420px', height: '210px', transformOrigin: '20% 100%' });
  el('div', 'abs', bubble, { inset: 0, borderRadius: '40px', background: 'var(--ink)', boxShadow: '0 30px 70px rgba(20,22,31,.35)' });
  el('div', 'abs', bubble, { left: '60px', top: '180px', width: '60px', height: '60px', background: 'var(--ink)', transform: 'rotate(45deg)', borderRadius: '6px' });
  const bars = Array.from({ length: 11 }, (_, i) => el('div', 'abs', bubble, { left: 70 + i * 27 + 'px', top: '45px', width: '14px', height: '120px', borderRadius: '7px', background: i % 2 ? 'var(--teal)' : '#7be0d6', transformOrigin: '50% 50%' }));
  const wave = { amp: 0.15 };

  // arrow labelled "move" (stage coords)
  const arrowWrap = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px', pointerEvents: 'none' });
  arrowWrap.innerHTML = `<svg width="1920" height="1080"><path d="M1260 640 Q 1520 520 1760 600" fill="none" stroke="var(--coral)" stroke-width="8" stroke-linecap="round"/>
    <path d="M1726 568 L1762 601 L1716 618" fill="none" stroke="var(--coral)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const moveLab = el('div', 'abs', cam, { left: '1420px', top: '470px', font: `800 34px/1 ${MONO}`, letterSpacing: '.2em', color: 'var(--coral)' });
  moveLab.textContent = 'MOVE';
  const check = el('div', 'abs', card, { left: CW - 190 + 'px', top: CH - 190 + 'px', width: '110px', height: '110px', borderRadius: '50%', background: 'var(--teal)', boxShadow: '0 20px 50px rgba(31,181,168,.4)' });
  check.innerHTML = `<svg width="110" height="110"><path d="M32 57 L49 74 L80 40" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });
  ctx.onFrame((t) => bars.forEach((b, i) => {
    const s = wave.amp * (0.35 + 0.65 * Math.abs(Math.sin(t * 8.5 + i * 1.27) * Math.cos(t * 3.1 + i * 0.6)));
    b.style.transform = `scaleY(${Math.max(0.08, s)})`;
  }));

  /* ---- timeline ---- */
  tl.fromTo(cam, { scale: 1 }, { scale: 1.05, duration: ctx.dur, ease: 'power1.inOut' }, 0);
  tl.from(card, { y: 40, opacity: 0, duration: 0.5, ease: 'power2.out' }, 0);

  // Act 1
  gsap.set(big, { scale: 0.1 });
  gsap.set(tiny, { filter: 'blur(0px)' });
  gsap.set([under], { scaleX: 0 });
  gsap.set([larger, lab1], { opacity: 0 });
  tl.from(tiny, { scaleX: 0, transformOrigin: '0% 50%', duration: 0.5, stagger: 0.04 }, 0.15);
  tl.from(big, { opacity: 0, duration: 0.4 }, 0.3);
  tl.to(lab1, { opacity: 1, duration: 0.5 }, tBody);
  tl.to(big, { color: 'var(--coral)', duration: 0.3 }, tText);
  tl.to(tiny, { opacity: 0, filter: 'blur(6px)', duration: 0.5, stagger: 0.03, ease: 'power2.in' }, t24 - 0.2);
  tl.to(big, { scale: 1, color: 'var(--ink)', duration: 1.1, ease: 'expo.out' }, t24 - 0.05);
  tl.to(under, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, t24 + 0.55);
  tl.fromTo(larger, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.6)', immediateRender: false }, tLarger - 0.1);
  tl.to(act1, { opacity: 0, y: -50, duration: 0.5, ease: 'power2.in' }, tTwo - 0.5);

  // Act 2
  gsap.set(seam, { scaleY: 0 });
  gsap.set([shapeA, shapeB, labA, labB], { opacity: 0 });
  tl.to(seam, { scaleY: 1, duration: 0.6, ease: 'expo.out' }, tTwo - 0.05);
  tl.fromTo(shapeA, { x: -420, opacity: 0, rotation: -20 }, { x: 0, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.6)', immediateRender: false }, tIdeas - 0.15);
  tl.fromTo(shapeB, { x: 420, opacity: 0, rotation: 20 }, { x: 0, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.6)', immediateRender: false }, tIdeas - 0.05);
  tl.to([labA, labB], { opacity: 1, duration: 0.4, stagger: 0.08 }, tIdeas + 0.3);
  // fighting: shove and jitter
  tl.to(shapeA, { x: 22, scaleX: 0.93, duration: 0.09, yoyo: true, repeat: 5, ease: 'power1.inOut' }, tFight);
  tl.to(shapeB, { x: -22, scaleX: 0.93, duration: 0.09, yoyo: true, repeat: 5, ease: 'power1.inOut' }, tFight + 0.045);
  tl.to(seam, { boxShadow: '0 0 60px rgba(255,90,78,.8)', background: 'var(--coral)', duration: 0.25, yoyo: true, repeat: 1 }, tFight);
  tl.fromTo(cardRing, { opacity: 0 }, { opacity: 1, duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, tOne);
  tl.to(shapeA, { x: -500, opacity: 0, rotation: -25, duration: 0.5, ease: 'power2.in' }, tAnd - 0.45);
  tl.to(shapeB, { x: 500, opacity: 0, rotation: 25, duration: 0.5, ease: 'power2.in' }, tAnd - 0.45);
  tl.to([labA, labB], { opacity: 0, duration: 0.3 }, tAnd - 0.45);
  tl.to(seam, { scaleY: 0, duration: 0.45, ease: 'power2.in' }, tAnd - 0.35);

  // Act 3
  gsap.set([head, ...lines, check, moveLab], { opacity: 0 });
  gsap.set(headBar, { scaleX: 0 });
  gsap.set(hl, { scaleX: 0 });
  gsap.set(bubble, { opacity: 0, scale: 0.4 });
  gsap.set(arrowWrap, { clipPath: 'inset(0px 680px 0px 1240px)' });
  tl.fromTo(head, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, immediateRender: false }, tAnd - 0.1);
  tl.to(headBar, { scaleX: 1, duration: 0.5 }, tAnd + 0.2);
  tl.fromTo(lines, { opacity: 0, scaleX: 0.2 }, { opacity: 1, scaleX: 1, duration: 0.45, stagger: 0.05, immediateRender: false }, tAnd);
  tl.to(bubble, { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.8)' }, tRead - 0.15);
  tl.to(wave, { amp: 1, duration: 0.4 }, tAloud - 0.1);
  tl.to(hl, { scaleX: 1, duration: 0.3, stagger: 0.06, ease: 'power2.out' }, tScript - 0.2);
  // move: lift off and slide out
  tl.to(bubble, { opacity: 0, scale: 0.7, duration: 0.35, ease: 'power2.in' }, tMove - 0.25);
  tl.to(wave, { amp: 0.1, duration: 0.3 }, tMove - 0.25);
  tl.to(paraBg, { opacity: 1, duration: 0.3 }, tMove - 0.1);
  tl.to(para, { y: -24, scale: 1.03, rotation: -1.5, duration: 0.35, ease: 'power2.out' }, tMove - 0.1);
  tl.to(arrowWrap, { clipPath: 'inset(0px 0px 0px 1240px)', duration: 0.55, ease: 'power2.inOut' }, tMove - 0.05);
  tl.fromTo(moveLab, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.8)', immediateRender: false }, tMove);
  tl.to(para, { x: 1000, y: 30, rotation: 4, opacity: 0, duration: 0.85, ease: 'power3.in' }, tTextEnd - 0.25);
  // clean slide hold
  tl.to([arrowWrap, moveLab], { opacity: 0, duration: 0.5, ease: 'power2.out' }, tTextEnd + 0.55);
  tl.fromTo(check, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)', immediateRender: false }, tTextEnd + 0.5);
  tl.to(head, { y: 160, scale: 1.15, transformOrigin: '0% 50%', duration: 1.1, ease: 'expo.inOut' }, tTextEnd + 0.4);
  tl.to(headBar, { y: 175, duration: 1.1, ease: 'expo.inOut' }, tTextEnd + 0.4);
});
