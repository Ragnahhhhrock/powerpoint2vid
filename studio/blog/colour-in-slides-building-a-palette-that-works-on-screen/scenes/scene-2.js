/* Scene 2: "Think in roles, not favourite colours. A background, text, a couple of greys, one accent for
 * what matters and a quiet support colour. That's five to seven in total."
 * Storyboard: paper-white stage, wide shot. A noisy pile of "favourite" colour chips opens the scene and
 * tumbles away on "not", leaving six empty labelled slots under the headline "Roles, not favourites".
 * The slots fill as each role is named: background, text, two greys. On "one accent" a coral swatch drops
 * in with a bounce and glows. On "quiet support" a smaller blue swatch slides in. On "five to seven" a
 * bracket draws under the row and a 140px coral "5–7" lands while the camera pushes in. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w) => ctx.at(i, w);
  const tRoles = A(0, 'roles,'), tNot = A(0, 'not'), tFav = A(0, 'favourite');
  const tBg = A(1, 'background,'), tText = A(1, 'text,'), tGreys = A(1, 'greys,'), tCouple = A(1, 'couple');
  const tAccent = A(1, 'accent'), tMatters = A(1, 'matters'), tSupport = A(1, 'support');
  const tFive = A(2, 'five'), tSeven = A(2, 'seven'), tTotal = A(2, 'total.');

  stage.style.background = 'radial-gradient(80% 70% at 45% 40%, #ffffff 0%, var(--paper) 60%, #ece9e1 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  const mono = '600 20px/1 ui-monospace, Menlo, monospace';

  /* headline */
  const kicker = el('div', 'abs', cam, { left: '136px', top: '96px', font: mono, letterSpacing: '.16em', color: 'var(--grey-mid)' });
  kicker.textContent = 'PALETTE · BY ROLE';
  const head = el('div', 'abs', cam, { left: '132px', top: '132px', font: '800 96px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const h1 = el('span', '', head, { display: 'inline-block' }); h1.textContent = 'Roles,';
  const h2 = el('span', '', head, { display: 'inline-block', marginLeft: '24px', color: 'var(--grey-mid)' }); h2.textContent = 'not favourites';

  /* slots */
  const ROLES = [
    ['BACKGROUND', 'var(--paper)', '#F6F4EF'],
    ['TEXT', 'var(--ink)', '#1C2333'],
    ['GREY 1', 'var(--grey-light)', '#C9CCD3'],
    ['GREY 2', 'var(--grey-mid)', '#7A8091'],
    ['ACCENT', 'var(--accent)', '#FF5A36'],
    ['SUPPORT', 'var(--support)', '#3B82C4'],
  ];
  const X0 = 200, W = 220, GAP = 40, TOP = 330, H = 280;
  const slots = ROLES.map(([name, col, hex], i) => {
    const x = X0 + i * (W + GAP);
    const slot = el('div', 'abs', cam, { left: x + 'px', top: TOP + 'px', width: W + 'px', height: H + 'px', borderRadius: '22px', border: '3px dashed var(--grey-light)', boxSizing: 'border-box' });
    const small = i === 5;
    const inset = small ? 38 : 0;
    const sw = el('div', 'abs', cam, {
      left: x + inset + 'px', top: TOP + inset + 'px', width: W - inset * 2 + 'px', height: H - inset * 2 + 'px', borderRadius: small ? '16px' : '22px', background: col,
      boxShadow: i === 0 ? 'inset 0 0 0 2px rgba(28,35,51,.12), 0 24px 50px rgba(28,35,51,.12)' : '0 24px 50px rgba(28,35,51,.18)',
    });
    const lab = el('div', 'abs', cam, { left: x + 'px', width: W + 'px', top: TOP + H + 30 + 'px', textAlign: 'center', font: '700 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: i === 4 ? 'var(--accent)' : 'var(--ink)' });
    lab.textContent = name;
    const hx = el('div', 'abs', cam, { left: x + 'px', width: W + 'px', top: TOP + H + 66 + 'px', textAlign: 'center', font: '500 18px/1 ui-monospace, Menlo, monospace', letterSpacing: '.08em', color: 'var(--grey-mid)' });
    hx.textContent = hex;
    return { slot, sw, lab, hx, x };
  });
  const acc = slots[4];
  const glow = el('div', 'abs', cam, { left: acc.x - 60 + 'px', top: TOP - 60 + 'px', width: W + 120 + 'px', height: H + 120 + 'px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,90,54,.35), transparent)', opacity: 0 });
  cam.insertBefore(glow, acc.sw);

  /* chaos chips */
  const r = ctx.rand(7);
  const CHAOS = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#9a6324', '#800000', '#aaffc3'];
  const chips = CHAOS.map((c) => el('div', 'abs', cam, {
    left: 220 + r() * 1360 + 'px', top: 330 + r() * 220 + 'px', width: 90 + r() * 90 + 'px', height: 90 + r() * 90 + 'px', borderRadius: 10 + r() * 30 + 'px',
    background: c, boxShadow: '0 14px 30px rgba(0,0,0,.18)', transform: `rotate(${(r() - 0.5) * 50}deg)`,
  }));

  /* bracket + count */
  const BY = 750, x1 = X0, x2 = X0 + 6 * W + 5 * GAP, mid = (x1 + x2) / 2;
  const br = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  br.innerHTML = `<svg width="1920" height="1080"><path id="bp" d="M${x1} ${BY} L${x1} ${BY + 26} L${x2} ${BY + 26} L${x2} ${BY}" fill="none" stroke="#1C2333" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path id="bt" d="M${mid} ${BY + 26} L${mid} ${BY + 48}" fill="none" stroke="#1C2333" stroke-width="5" stroke-linecap="round"/></svg>`;
  const bp = br.querySelector('#bp'), bt = br.querySelector('#bt');
  const LEN = 26 * 2 + (x2 - x1);
  gsap.set(bp, { strokeDasharray: LEN, strokeDashoffset: LEN });
  gsap.set(bt, { strokeDasharray: 22, strokeDashoffset: 22 });
  const count = el('div', 'abs', cam, { left: mid - 300 + 'px', width: '600px', top: BY + 62 + 'px', textAlign: 'center', font: '900 140px/1 Inter Display, Inter', letterSpacing: '-.05em', color: 'var(--accent)', transformOrigin: '50% 30%', textShadow: '0 18px 50px rgba(255,90,54,.3)' });
  count.textContent = '5–7';

  ctx.fx.vignette({ strength: 0.18 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---- timeline ---- */
  gsap.set([kicker, h1, h2], { opacity: 0 });
  gsap.set(slots.flatMap((s) => [s.sw, s.lab, s.hx]), { opacity: 0 });
  gsap.set(slots.map((s) => s.slot), { opacity: 0.35 });
  gsap.set(count, { opacity: 0 });

  tl.from(chips, { scale: 0, opacity: 0, duration: 0.45, ease: 'back.out(2)', stagger: 0.025 }, 0.05);
  tl.to(kicker, { opacity: 1, duration: 0.5 }, 0.15);
  tl.fromTo(h1, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' }, tRoles - 0.15);
  tl.fromTo(h2, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, tNot - 0.1);
  chips.forEach((c, i) => {
    tl.to(c, { y: 700 + (i % 4) * 60, rotation: (i % 2 ? 1 : -1) * (60 + i * 7), opacity: 0, duration: 0.8, ease: 'power2.in' }, tFav - 0.1 + i * 0.025);
  });
  tl.to(slots.map((s) => s.slot), { opacity: 1, duration: 0.6, stagger: 0.05 }, tFav + 0.3);
  tl.to(slots.map((s) => s.lab), { opacity: 0.35, duration: 0.5, stagger: 0.05 }, tFav + 0.4);

  const fill = (s, t) => {
    tl.fromTo(s.sw, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', immediateRender: false }, t);
    tl.to(s.lab, { opacity: 1, duration: 0.4 }, t);
    tl.to(s.hx, { opacity: 1, duration: 0.4 }, t + 0.15);
    tl.to(s.slot, { opacity: 0, duration: 0.4 }, t + 0.2);
  };
  fill(slots[0], tBg - 0.1);
  fill(slots[1], tText - 0.1);
  fill(slots[2], tCouple);
  fill(slots[3], tGreys);

  tl.fromTo(acc.sw, { opacity: 0, y: -220, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(2)', immediateRender: false }, tAccent - 0.2);
  tl.to(acc.lab, { opacity: 1, duration: 0.3 }, tAccent);
  tl.to(acc.hx, { opacity: 1, duration: 0.3 }, tAccent + 0.1);
  tl.to(acc.slot, { opacity: 0, duration: 0.3 }, tAccent);
  tl.to(glow, { opacity: 1, duration: 0.5 }, tAccent + 0.2);
  tl.to(acc.sw, { boxShadow: '0 30px 80px rgba(255,90,54,.55)', duration: 0.4 }, tAccent + 0.2);
  tl.to(acc.sw, { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, tMatters);

  const sup = slots[5];
  tl.fromTo(sup.sw, { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', immediateRender: false }, tSupport - 0.25);
  tl.to(sup.lab, { opacity: 1, duration: 0.4 }, tSupport);
  tl.to(sup.hx, { opacity: 1, duration: 0.4 }, tSupport + 0.15);
  tl.to(sup.slot, { opacity: 0.4, duration: 0.5 }, tSupport);

  tl.to(bp, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, tFive - 0.3);
  tl.to(bt, { strokeDashoffset: 0, duration: 0.25, ease: 'power2.out' }, tFive + 0.3);
  tl.fromTo(count, { opacity: 0, scale: 0.5, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(2.2)', immediateRender: false }, tSeven - 0.25);
  tl.to(count, { y: 4, duration: 0.07, yoyo: true, repeat: 1 }, tSeven + 0.2);
  tl.to(glow, { opacity: 0.6, duration: 0.6 }, tTotal);

  tl.to(cam, { scale: 1.012, duration: tFive - 0.4, ease: 'none' }, 0);
  tl.to(cam, { scale: 1.04, y: -16, duration: Math.max(1, ctx.dur - tFive + 0.4), ease: 'expo.inOut' }, tFive - 0.4);
});
