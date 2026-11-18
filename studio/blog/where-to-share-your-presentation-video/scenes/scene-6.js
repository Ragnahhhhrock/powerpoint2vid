/* Scene 6 — "You rarely need a brand new video for each channel. Duplicate the deck and adjust it:
 * a full version, a short three-to-five-slide cut, and one personalised with the client's name."
 * Storyboard: paper stage, headline "One deck, several versions" at top. One deck sits in the centre;
 * on "new" three dashed empty slots appear (the new videos you don't need). On "Duplicate" the deck
 * splits into three copies that fan into those slots. "full version": left copy grows, tags
 * Website · YouTube · LMS pop. "short ... cut": middle copy shrinks into a stack of 5 cards, tag Social.
 * "client's name": camera pans right, right copy's title deletes and retypes "Hi, Acme" in coral. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return Number.isFinite(v) ? v : f; };
  const tNew = A(0, 'new', 2.0);
  const tDup = A(1, 'Duplicate', 3.9);
  const tFull = A(1, 'full', 5.6);
  const tShort = A(1, 'short', 6.7);
  const tPers = A(1, 'personalised', 9.0);
  const tName = A(1, 'name', 10.4);

  const SANS = 'Inter Display, Inter, sans-serif';
  const MONO = 'ui-monospace, Menlo, monospace';
  const W = 400, H = 250, L = 760, T = 410, DX = 520;

  stage.style.background = 'radial-gradient(70% 60% at 50% 55%, #fffdf8 0%, var(--paper) 60%, #e9e3d6 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  /* headline */
  const head = el('div', 'abs', cam, { left: '160px', width: '1600px', top: '100px', textAlign: 'center', font: `800 84px/1 ${SANS}`, letterSpacing: '-.04em', color: 'var(--ink)' });
  const hw = ctx.split(head, 'One deck, several versions', 'word');

  /* ghost slots: "brand new video for each channel" */
  const ghosts = [-DX, 0, DX].map((dx) => el('div', 'abs', cam, { left: L + dx + 'px', top: T + 'px', width: W + 'px', height: H + 'px', borderRadius: '20px', border: '3px dashed rgba(26,34,51,.22)', boxSizing: 'border-box', opacity: 0 }));

  function card(parent, extra) {
    const c = el('div', 'abs', parent, Object.assign({ left: 0, top: 0, width: W + 'px', height: H + 'px', borderRadius: '20px', background: '#fff', boxShadow: '0 30px 60px rgba(26,34,51,.16), 0 4px 12px rgba(26,34,51,.08)', overflow: 'hidden' }, extra || {}));
    el('div', 'abs', c, { left: 0, top: 0, right: 0, height: '10px', background: 'var(--ink)' });
    const tag = el('div', 'abs', c, { left: '30px', top: '34px', font: `600 16px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--mist)' });
    tag.textContent = 'DECK.PPTX';
    const title = el('div', 'abs', c, { left: '30px', top: '70px', width: '350px', font: `800 40px/1.05 ${SANS}`, letterSpacing: '-.03em', color: 'var(--ink)', whiteSpace: 'nowrap' });
    title.textContent = 'Q4 Onboarding';
    el('div', 'abs', c, { left: '30px', top: '140px', width: '260px', height: '12px', borderRadius: '6px', background: '#e6e2d9' });
    el('div', 'abs', c, { left: '30px', top: '166px', width: '200px', height: '12px', borderRadius: '6px', background: '#eeeae2' });
    el('div', 'abs', c, { left: '30px', top: '206px', width: '60px', height: '8px', borderRadius: '4px', background: 'var(--signal)' });
    return { c, title };
  }

  const mk = () => el('div', 'abs', cam, { left: L + 'px', top: T + 'px', width: W + 'px', height: H + 'px', transformOrigin: '50% 50%' });
  const wL = mk(), wR = mk(), wC = mk();
  // middle stack (5 cards total)
  const stack = [3, 2, 1, 0].map(() => card(wC).c);
  const cL = card(wL), cR = card(wR), cC = card(wC);

  // left: full-version progress bar
  const bar = el('div', 'abs', cL.c, { left: '130px', top: '208px', width: '240px', height: '6px', borderRadius: '3px', background: 'var(--sky)', transformOrigin: '0 50%' });
  gsap.set(bar, { scaleX: 0 });

  /* labels + chips */
  const lab = (x, txt, col) => {
    const d = el('div', 'abs', cam, { left: x - 250 + 'px', width: '500px', top: '700px', textAlign: 'center', font: `700 20px/1 ${MONO}`, letterSpacing: '.16em', color: col });
    d.textContent = txt; return d;
  };
  const labL = lab(L + W / 2 - DX, 'FULL VERSION', 'var(--ink)');
  const labC = lab(L + W / 2, '3–5 SLIDE CUT', 'var(--ink)');
  const labR = lab(L + W / 2 + DX, 'PERSONALISED', 'var(--ink)');
  const chipRow = (x, items, col) => {
    const row = el('div', 'abs', cam, { left: x - 250 + 'px', width: '500px', top: '748px', display: 'flex', justifyContent: 'center', gap: '14px' });
    return items.map((t) => {
      const ch = el('div', '', row, { padding: '14px 22px', borderRadius: '999px', background: col, color: '#fff', font: `700 26px/1 ${SANS}`, letterSpacing: '-.01em', boxShadow: '0 12px 24px rgba(26,34,51,.15)' });
      ch.textContent = t; return ch;
    });
  };
  const chipsL = chipRow(L + W / 2 - DX, ['Website', 'YouTube', 'LMS'], 'var(--sky)');
  const chipsC = chipRow(L + W / 2, ['Social'], 'var(--mint)');
  const glowR = el('div', 'abs', cam, { left: L + DX - 60 + 'px', top: T - 60 + 'px', width: W + 120 + 'px', height: H + 120 + 'px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,107,74,.35), transparent)', opacity: 0 });
  cam.insertBefore(glowR, wL);

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.06 });

  /* typewriter on the right copy */
  const ORIG = 'Q4 Onboarding', NEW = 'Hi, Acme';
  const tw = { del: 0, typ: 0 };
  const caret = el('span', '', null, {});
  ctx.onFrame((t) => {
    const blink = Math.floor(t * 2.5) % 2 === 0 && t > tPers - 0.6 && t < ctx.dur;
    if (tw.typ > 0) {
      cR.title.textContent = NEW.slice(0, Math.round(tw.typ * NEW.length));
      cR.title.style.color = 'var(--signal)';
    } else {
      cR.title.textContent = ORIG.slice(0, Math.round((1 - tw.del) * ORIG.length));
      cR.title.style.color = 'var(--ink)';
    }
    if (t > tPers - 0.6) cR.title.textContent += blink ? '|' : ' ';
  });

  /* ---- timeline ---- */
  gsap.set([labL, labC, labR, ...chipsL, ...chipsC], { opacity: 0 });
  gsap.set(stack, { opacity: 0 });
  gsap.set(wL, { x: 14, y: 14 }); gsap.set(wR, { x: 28, y: 28 });

  tl.from(hw, { y: 40, opacity: 0, duration: 0.6, stagger: 0.07, ease: 'back.out(1.6)' }, 0.05);
  tl.from([wR, wL, wC], { scale: 0.6, opacity: 0, duration: 0.7, stagger: 0.06, ease: 'back.out(1.7)' }, 0.15);
  tl.to(cam, { scale: 1.04, duration: tDup - 0.2, ease: 'power1.inOut' }, 0.2);

  // "brand new video for each channel": empty slots hint at three new productions
  tl.to(ghosts, { opacity: 1, duration: 0.4, stagger: 0.08 }, tNew - 0.2);
  tl.from(ghosts, { scale: 0.85, duration: 0.5, stagger: 0.08, ease: 'back.out(2)' }, tNew - 0.2);

  // "Duplicate": fan out into the slots
  tl.to(cam, { scale: 1, duration: 0.8, ease: 'expo.inOut' }, tDup - 0.2);
  tl.to(wL, { x: -DX, y: 0, rotation: 0, duration: 0.8, ease: 'back.out(1.4)' }, tDup);
  tl.to(wR, { x: DX, y: 0, duration: 0.8, ease: 'back.out(1.4)' }, tDup + 0.08);
  tl.fromTo([wL, wR], { rotation: 0 }, { rotation: (i) => (i ? 4 : -4), duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, tDup);
  tl.to(ghosts, { opacity: 0, scale: 1.08, duration: 0.5 }, tDup + 0.5);

  // "full version"
  tl.to(wL, { scale: 1.1, duration: 0.6, ease: 'back.out(1.8)' }, tFull - 0.1);
  tl.to(bar, { scaleX: 1, duration: 0.9, ease: 'power2.out' }, tFull);
  tl.to(labL, { opacity: 1, duration: 0.4 }, tFull);
  tl.fromTo(chipsL, { opacity: 0, y: 24, scale: 0.7 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)', immediateRender: false }, tFull + 0.2);
  tl.to(wL, { scale: 1.04, duration: 0.5 }, tShort - 0.2);

  // "short three-to-five-slide cut"
  tl.to(wC, { scale: 0.74, duration: 0.6, ease: 'back.out(1.6)' }, tShort - 0.1);
  tl.to(stack, { opacity: 1, duration: 0.2 }, tShort + 0.1);
  tl.to(stack, { x: (i) => (4 - i) * 26, y: (i) => -(4 - i) * 22, rotation: (i) => (4 - i) * 2.5, duration: 0.6, stagger: 0.06, ease: 'back.out(1.8)' }, tShort + 0.1);
  tl.to(labC, { opacity: 1, duration: 0.4 }, tShort + 0.2);
  tl.fromTo(chipsC, { opacity: 0, y: 24, scale: 0.7 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, tShort + 0.4);

  // "personalised with the client's name": one decisive pan + rewrite
  tl.to(cam, { x: -70, scale: 1.05, duration: 1.1, ease: 'expo.inOut' }, tPers - 0.3);
  tl.to(wR, { scale: 1.1, duration: 0.6, ease: 'back.out(1.8)' }, tPers);
  tl.to(labR, { opacity: 1, duration: 0.4 }, tPers);
  tl.to(tw, { del: 1, duration: Math.max(0.4, (tName - tPers) * 0.45), ease: 'none' }, tPers);
  tl.to(tw, { typ: 1, duration: 0.55, ease: 'none' }, tName - 0.45);
  tl.to(glowR, { opacity: 1, duration: 0.5 }, tName);
  tl.fromTo(wR, { scale: 1.1 }, { scale: 1.16, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, tName + 0.1);
  tl.to(cam, { scale: 1.08, duration: Math.max(0.5, ctx.dur - tName - 0.8), ease: 'power1.inOut' }, tName + 0.8);
});
