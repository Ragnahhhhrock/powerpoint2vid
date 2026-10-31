/* Scene 1: "Rough notes work on stage, but a voice needs full sentences. Instead of 'results, three groups,
 * control flat', say: let's look at the results. We tested three groups."
 * Storyboard: warm paper stage with a split layout and the headline "Fragments → Sentences" holding at the top.
 * Left card: choppy slate fragments "Results — 3 groups — control flat", labelled NOTES. They pop in unevenly,
 * and each one gets a highlight as the narrator quotes it. On "full sentences" a coral arrow sweeps right to
 * the SCRIPT card. Its words then type on in ink, each one landing on its spoken word, with a caret and a
 * live waveform. The camera drifts gently toward the right half. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const B0 = ctx.beats[0].words, B1 = ctx.beats[1].words, B2 = ctx.beats[2].words;
  const tFull = B0[9].t, tRes = B1[2].t, tThree = B1[3].t, tCtrl = B1[5].t, tSay = B1[7].t;

  stage.style.background = 'radial-gradient(60% 55% at 70% 45%, #fffaf1 0%, var(--paper) 60%, #ebe4d6 100%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 35% at 25% 70%, rgba(255,181,71,.12), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '1500px 540px' });

  /* headline */
  const head = el('div', 'abs', cam, { left: '160px', width: '1600px', top: '110px', textAlign: 'center', font: '800 84px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  head.innerHTML = '<span style="color:var(--slate)">Fragments</span> <span style="color:var(--coral)">→</span> Sentences';

  const cardCss = (x) => ({ left: x + 'px', top: '300px', width: '760px', height: '520px', borderRadius: '28px', background: 'rgba(255,255,255,.72)', boxShadow: '0 40px 90px rgba(26,31,46,.12), 0 2px 0 rgba(255,255,255,.9) inset', border: '1px solid rgba(26,31,46,.06)' });
  const labCss = { left: '60px', top: '48px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.18em' };

  /* NOTES card */
  const notes = el('div', 'abs', cam, cardCss(120));
  const nLab = el('div', 'abs', notes, { ...labCss, color: 'var(--slate)' }); nLab.textContent = 'NOTES';
  const TOK = [['Results', 60, 150, -2], ['—', 330, 150, 0], ['3 groups', 110, 262, 1.5], ['—', 420, 262, 0], ['control flat', 70, 374, -1]];
  const toks = TOK.map(([txt, x, y, r]) => {
    const w = el('div', 'abs', notes, { left: x + 'px', top: y + 'px' });
    const hl = el('div', 'abs', w, { left: '-10px', right: '-10px', top: '14px', bottom: '-4px', borderRadius: '8px', background: 'rgba(255,107,87,.22)', transformOrigin: '0% 50%' });
    const t = el('div', '', w, { position: 'relative', font: '500 60px/1.1 Inter', color: 'var(--slate)', whiteSpace: 'nowrap', transform: `rotate(${r}deg)` });
    t.textContent = txt;
    return { w, hl, t };
  });
  gsap.set(toks.map((k) => k.hl), { scaleX: 0 });

  /* arrow */
  const arrow = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  arrow.innerHTML = `<svg width="1920" height="1080"><path id="ap" d="M892 560 Q 960 520 1026 560" fill="none" stroke="#FF6B57" stroke-width="8" stroke-linecap="round"/>
    <path id="ah" d="M1002 538 L1028 561 L998 578" fill="none" stroke="#FF6B57" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const ap = arrow.querySelector('#ap'), ah = arrow.querySelector('#ah');
  gsap.set(ap, { strokeDasharray: 160, strokeDashoffset: 160 });
  gsap.set(ah, { opacity: 0, scale: 0.4, transformOrigin: '1028px 561px' });

  /* SCRIPT card */
  const script = el('div', 'abs', cam, cardCss(1040));
  const sLab = el('div', 'abs', script, { ...labCss, color: 'var(--coral)' }); sLab.textContent = 'SCRIPT';
  const ghosts = [0, 1, 2].map((i) => el('div', 'abs', script, { left: '60px', top: 150 + i * 72 + 'px', width: [560, 420, 500][i] + 'px', height: '14px', borderRadius: '7px', background: 'rgba(26,31,46,.07)', transformOrigin: '0% 50%' }));
  gsap.set(ghosts, { scaleX: 0 });
  const body = el('div', 'abs', script, { left: '60px', top: '118px', width: '640px', font: '800 58px/1.22 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)' });
  const WORDS = [["Let's", B1[8].t], ['look', B1[9].t], ['at', B1[10].t], ['the', B1[11].t], ['results.', B1[12].t],
    ['We', B2[0].t], ['tested', B2[1].t], ['three', B2[2].t], ['groups.', B2[3].t]];
  const wsp = WORDS.map(([w], i) => {
    const s = el('span', '', body, { display: 'inline-block' }); s.textContent = w;
    if (i < WORDS.length - 1) body.appendChild(document.createTextNode(' '));
    return s;
  });
  const caret = el('div', 'abs', script, { width: '5px', height: '58px', borderRadius: '3px', background: 'var(--coral)', left: '60px', top: '126px', opacity: 0 });

  /* waveform motif */
  const N = 48, wave = el('div', 'abs', script, { left: '60px', top: '420px', width: '640px', height: '64px' });
  const bars = Array.from({ length: N }, (_, i) => el('div', 'abs', wave, { left: i * (640 / N) + 'px', width: '6px', top: '50%', height: '4px', borderRadius: '3px', background: i % 3 ? 'var(--teal)' : 'var(--coral)', opacity: 0.85 }));

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });

  const clamp = (v) => Math.max(0, Math.min(1, v));
  ctx.onFrame((t) => {
    let e = 0;
    ctx.beats.forEach((b) => { e = Math.max(e, clamp((t - b.t) / 0.25) * clamp((b.end - t) / 0.25)); });
    const amp = 0.12 + 0.88 * e;
    bars.forEach((b, i) => {
      const v = Math.abs(Math.sin(t * 7.3 + i * 0.9) * 0.6 + Math.sin(t * 11.1 + i * 0.37) * 0.4);
      b.style.height = (4 + 56 * amp * v) + 'px';
      b.style.marginTop = -(2 + 28 * amp * v) + 'px';
    });
    let last = -1;
    WORDS.forEach(([, wt], i) => { if (t >= wt) last = i; });
    if (t >= tFull + 0.4) {
      const ref = last >= 0 ? wsp[last] : null;
      const x = ref ? 60 + ref.offsetLeft + ref.offsetWidth + 8 : 60;
      const y = ref ? 118 + ref.offsetTop + 8 : 126;
      caret.style.left = x + 'px'; caret.style.top = y + 'px';
      const typing = last >= 0 && t - WORDS[last][1] < 0.4;
      caret.style.opacity = typing ? 1 : (Math.floor(t * 2.2) % 2 ? 0.15 : 1);
    } else caret.style.opacity = 0;
  });

  /* ---- timeline ---- */
  tl.fromTo(head, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0.05);
  tl.fromTo(notes, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.1);
  tl.fromTo(script, { opacity: 0, y: 40 }, { opacity: 0.55, y: 0, duration: 0.8 }, 0.25);
  [0.45, 0.8, 1.05, 1.5, 1.75].forEach((tt, i) => {
    tl.fromTo(toks[i].w, { opacity: 0, y: 18, x: i % 2 ? 10 : -10 }, { opacity: 1, y: 0, x: 0, duration: 0.35, ease: 'back.out(2)' }, tt);
  });
  tl.to(ap, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.inOut' }, tFull - 0.2);
  tl.to(ah, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, tFull + 0.3);
  tl.to(script, { opacity: 1, boxShadow: '0 40px 100px rgba(255,107,87,.18), 0 2px 0 rgba(255,255,255,.9) inset', duration: 0.6 }, tFull + 0.2);
  tl.to(ghosts, { scaleX: 1, duration: 0.6, stagger: 0.08 }, tFull + 0.3);
  [[0, tRes], [2, tThree], [4, tCtrl]].forEach(([i, tt]) => {
    tl.to(toks[i].hl, { scaleX: 1, duration: 0.35, ease: 'power2.out' }, tt);
    tl.to(toks[i].t, { color: '#1A1F2E', duration: 0.3 }, tt);
  });
  tl.to(notes, { opacity: 0.5, scale: 0.97, duration: 0.7, ease: 'power2.inOut' }, tSay);
  tl.to(ghosts, { opacity: 0, duration: 0.4 }, WORDS[0][1] - 0.2);
  WORDS.forEach(([, wt], i) => {
    tl.fromTo(wsp[i], { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.38, ease: 'back.out(1.6)' }, wt - 0.06);
  });
  tl.fromTo(cam, { x: 0, scale: 1 }, { x: -30, scale: 1.035, duration: ctx.dur, ease: 'power1.inOut', immediateRender: false }, 0);
  tl.fromTo(glow, { opacity: 0.6 }, { opacity: 1, duration: ctx.dur, ease: 'none', immediateRender: false }, 0);
});
