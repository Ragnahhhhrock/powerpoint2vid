/* Scene 4 — "In a video, space matters even more. Viewers can't lean in or flip back. Spacious slides stay
 * crisp, give animation room, and leave the bottom clear for captions."
 * Storyboard: a night stage with a video player and the headline "Space matters more in video" at 100px.
 * On "lean in" a ghost cursor tries to zoom the crowded slide and fails. On "flip back" the player's back
 * button greys out. On "crisp" the crowded slide breaks into compression blocks while a spacious one stays
 * sharp beside it. On "animation room" the clutter snaps away and a calm-blue dot glides across open space.
 * On "captions" a clean caption bar slides up into the empty lower third and holds. */
P2V.scene((ctx) => {
  const { tl, el, stage, dur } = ctx;
  const rnd = ctx.rand(5);
  const more = ctx.at(0, 'more');
  const lean = ctx.at(1, 'lean'), back = ctx.at(1, 'back');
  const spacious = ctx.at(2, 'Spacious'), crisp = ctx.at(2, 'crisp');
  const anim = ctx.at(2, 'animation'), caps = ctx.at(2, 'captions');
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 50% 50%, #1a2030 0%, var(--night) 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 55%' });
  el('div', 'abs', cam, { left: '260px', top: '260px', width: '1400px', height: '700px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(59,110,245,.18), transparent)', filter: 'blur(30px)' });

  /* headline */
  const head = el('div', 'abs', cam, { left: '80px', right: '80px', top: '62px', textAlign: 'center', font: '800 100px/1.05 "Inter Display", Inter, sans-serif', letterSpacing: '-.04em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  const words = 'Space matters more in video'.split(' ').map((w) => {
    const s = el('span', '', head, { display: 'inline-block', margin: '0 .11em' }); s.textContent = w; return s;
  });

  /* video player */
  const player = el('div', 'abs', cam, { left: '320px', top: '232px', width: '1280px', height: '712px', borderRadius: '18px', overflow: 'hidden', background: '#07090c', boxShadow: '0 50px 120px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.09)' });
  const screen = el('div', 'abs', player, { left: 0, top: 0, width: '1280px', height: '640px', overflow: 'hidden', background: '#0b0e13' });

  /* crowded slide (1280x640 coords) */
  const crowd = el('div', 'abs', screen, { left: 0, top: 0, width: '1280px', height: '640px', overflow: 'hidden', background: 'var(--paper)', transformOrigin: '0 0' });
  const cc = el('div', 'abs', crowd, { inset: 0 });
  el('div', 'abs', cc, { left: 0, top: 0, width: '1280px', height: '70px', background: '#2b3a55' });
  const ttl = el('div', 'abs', cc, { left: '110px', top: '20px', font: '700 30px/1 Inter, sans-serif', color: '#fff' }); ttl.textContent = 'Q3 Update, Learnings & Next Steps (Draft)';
  el('div', 'abs', cc, { left: '24px', top: '12px', width: '46px', height: '46px', borderRadius: '50%', background: 'var(--signal)' });
  el('div', 'abs', cc, { left: '1200px', top: '12px', width: '56px', height: '46px', borderRadius: '6px', background: '#f2c14e' });
  for (let i = 0; i < 9; i++) {
    el('div', 'abs', cc, { left: '60px', top: 110 + i * 46 + 'px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--ink)' });
    el('div', 'abs', cc, { left: '86px', top: 108 + i * 46 + 'px', width: 380 + rnd() * 300 + 'px', height: '16px', borderRadius: '4px', background: 'rgba(26,29,35,.55)' });
  }
  const chartBox = el('div', 'abs', cc, { left: '880px', top: '110px', width: '330px', height: '200px', border: '2px solid rgba(26,29,35,.3)' });
  [0.4, 0.7, 0.5, 0.9, 0.6].forEach((v, i) => el('div', 'abs', chartBox, { left: 20 + i * 62 + 'px', bottom: '10px', width: '36px', height: v * 170 + 'px', background: i % 2 ? 'var(--calm)' : 'var(--slate)' }));
  el('div', 'abs', cc, { left: '920px', top: '360px', width: 0, height: 0, borderLeft: '120px solid transparent', borderBottom: '110px solid rgba(255,90,60,.35)' });
  el('div', 'abs', cc, { left: '1090px', top: '400px', width: '150px', height: '150px', borderRadius: '50%', border: '10px dotted rgba(59,110,245,.4)' });
  el('div', 'abs', cc, { left: 0, top: '600px', width: '1280px', height: '40px', background: 'repeating-linear-gradient(90deg, #2b3a55 0 40px, #f2c14e 40px 80px)' });

  // compression blocks
  const blocks = [];
  for (let r = 0; r < 8; r++) for (let c = 0; c < 16; c++) {
    const l = 30 + rnd() * 55;
    blocks.push(el('div', 'abs', crowd, { left: c * 80 + 'px', top: r * 80 + 'px', width: '80px', height: '80px', background: `hsl(${210 + rnd() * 30}, ${8 + rnd() * 20}%, ${l}%)`, opacity: 0 }));
  }

  /* spacious slide */
  const space = el('div', 'abs', screen, { left: 0, top: 0, width: '1280px', height: '640px', overflow: 'hidden', background: 'var(--paper)', transformOrigin: '0 0' });
  const sT = el('div', 'abs', space, { left: '100px', top: '96px', font: '800 84px/1 "Inter Display", Inter, sans-serif', letterSpacing: '-.04em', color: 'var(--ink)' }); sT.textContent = 'One clear point.';
  el('div', 'abs', space, { left: '104px', top: '204px', width: '140px', height: '8px', borderRadius: '4px', background: 'var(--calm)' });

  // gliding dot + trail
  const ghosts = [4, 3, 2, 1].map((k) => el('div', 'abs', space, { left: '-55px', top: '-55px', width: '110px', height: '110px', borderRadius: '50%', background: 'var(--calm)', opacity: 0 }));
  const dot = el('div', 'abs', space, { left: '-55px', top: '-55px', width: '110px', height: '110px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #8fb0ff, var(--calm) 60%)', boxShadow: '0 0 60px rgba(59,110,245,.6), 0 20px 40px rgba(59,110,245,.3)', opacity: 0 });

  // caption zone + bar
  const zone = el('div', 'abs', space, { left: '40px', top: '470px', width: '1200px', height: '140px', borderRadius: '14px', border: '3px dashed rgba(59,110,245,.6)', background: 'rgba(59,110,245,.06)', opacity: 0 });
  const cap = el('div', 'abs', space, { left: '640px', top: '502px', height: '78px', padding: '0 44px', borderRadius: '14px', background: 'rgba(14,17,22,.9)', color: 'var(--paper)', font: '600 36px/78px Inter, sans-serif', letterSpacing: '-.01em', whiteSpace: 'nowrap', boxShadow: '0 20px 50px rgba(0,0,0,.3)', opacity: 0 });
  cap.textContent = 'Leave the bottom clear for captions';

  // split labels
  const labL = el('div', 'abs', screen, { left: '30px', width: '589px', top: '500px', textAlign: 'center', font: `600 20px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--signal)', opacity: 0 }); labL.textContent = 'COMPRESSED';
  const labR = el('div', 'abs', screen, { left: '661px', width: '589px', top: '500px', textAlign: 'center', font: `600 20px/1 ${MONO}`, letterSpacing: '.16em', color: '#8fb0ff', opacity: 0 }); labR.textContent = 'CRISP';

  /* controls */
  const ctr = el('div', 'abs', player, { left: 0, top: '640px', width: '1280px', height: '72px', background: '#10141b', borderTop: '1px solid rgba(255,255,255,.06)' });
  const pause = el('div', 'abs', ctr, { left: '30px', top: '24px', width: '24px', height: '24px' });
  pause.innerHTML = '<svg width="24" height="24"><rect x="3" y="2" width="6" height="20" rx="2" fill="#F7F5F0"/><rect x="15" y="2" width="6" height="20" rx="2" fill="#F7F5F0"/></svg>';
  const backBtn = el('div', 'abs', ctr, { left: '86px', top: '12px', width: '56px', height: '48px' });
  backBtn.innerHTML = '<svg width="56" height="48"><path d="M20 12 A14 14 0 1 1 14 26" fill="none" stroke="#F7F5F0" stroke-width="3.5" stroke-linecap="round"/><path d="M12 6 L21 12 L13 19" fill="none" stroke="#F7F5F0" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><text x="28" y="30" text-anchor="middle" font-family="Inter" font-weight="700" font-size="12" fill="#F7F5F0">10</text></svg>';
  const slash = el('div', 'abs', ctr, { left: '84px', top: '34px', width: '62px', height: '5px', borderRadius: '3px', background: 'var(--signal)', transform: 'rotate(-35deg)', transformOrigin: '0 50%' });
  const track = el('div', 'abs', ctr, { left: '180px', top: '34px', width: '880px', height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,.15)' });
  const fill = el('div', 'abs', track, { left: 0, top: 0, height: '5px', width: '0px', borderRadius: '3px', background: 'var(--signal)' });
  const head2 = el('div', 'abs', track, { left: '-8px', top: '-6px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff' });
  const tc = el('div', 'abs', ctr, { left: '1090px', top: '26px', width: '160px', textAlign: 'right', font: `500 20px/1 ${MONO}`, color: 'var(--mist)' });

  /* ghost cursor */
  const cur = el('div', 'abs', cam, { left: 0, top: 0, width: '60px', height: '60px', opacity: 0 });
  cur.innerHTML = '<svg width="44" height="56" style="filter:drop-shadow(0 6px 10px rgba(0,0,0,.5))"><path d="M4 3 L4 44 L15 34 L23 52 L31 48 L23 31 L38 31 Z" fill="#F7F5F0" stroke="#0E1116" stroke-width="2.5" stroke-linejoin="round"/></svg>';
  const badge = el('div', 'abs', cur, { left: '38px', top: '-30px', width: '54px', height: '54px', borderRadius: '50%', background: 'var(--calm)', color: '#fff', font: '700 40px/54px Inter', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,.4)', scale: 0 });
  const plus = el('div', '', badge, { display: 'inline-block' }); plus.textContent = '+';
  const ripples = [0, 1].map(() => el('div', 'abs', cam, { width: '80px', height: '80px', borderRadius: '50%', border: '4px solid var(--paper)', opacity: 0 }));

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  const st = { p: 0 };
  const fmt = (s) => '0:' + String(Math.floor(s)).padStart(2, '0');
  const pathAt = (p) => [140 + p * 1000, 320 - Math.sin(p * Math.PI * 1.6) * 90];
  ctx.onFrame((t) => {
    const w = Math.min(1, t / dur) * 880;
    fill.style.width = w + 'px'; head2.style.left = w - 8 + 'px';
    tc.textContent = fmt(t) + ' / 0:12';
    const [x, y] = pathAt(st.p);
    dot.style.transform = `translate(${x}px, ${y}px)`;
    ghosts.forEach((g, i) => { const k = 4 - i; const [gx, gy] = pathAt(Math.max(0, st.p - k * 0.035)); g.style.transform = `translate(${gx}px, ${gy}px) scale(${1 - k * 0.12})`; });
  });

  /* ---- timeline ---- */
  gsap.set(slash, { scaleX: 0 });
  gsap.set(space, { scale: 0.46, x: 661, y: 173, opacity: 0 });
  gsap.set(cc, { filter: 'blur(0px) saturate(1)' });

  tl.from(player, { opacity: 0, y: 40, scale: 0.97, duration: 1.1 }, 0.05);
  tl.from(words, { opacity: 0, y: 40, duration: 0.9, stagger: 0.08 }, 0.15);
  tl.to(words[2], { color: '#7d9cff', duration: 0.6 }, more);
  tl.to(cam, { scale: 1.025, duration: 3, ease: 'power1.inOut' }, more);

  // "can't lean in": cursor tries to zoom, fails
  gsap.set(cur, { x: 1500, y: 900 });
  tl.to(cur, { opacity: 1, duration: 0.3 }, lean - 0.8);
  tl.to(cur, { x: 960, y: 500, duration: 0.8, ease: 'power3.out' }, lean - 0.8);
  tl.to(badge, { scale: 1, duration: 0.4, ease: 'back.out(2)' }, lean - 0.25);
  [0, 1].forEach((i) => {
    const t = lean + i * 0.35;
    tl.fromTo(ripples[i], { x: 920, y: 460, scale: 0.3, opacity: 0.9 }, { scale: 1.6, opacity: 0, duration: 0.5, ease: 'power2.out', immediateRender: false }, t);
    tl.to(cur, { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1 }, t);
    tl.to(crowd, { scale: 1.025, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
  });
  tl.to(badge, { backgroundColor: '#FF5A3C', duration: 0.2 }, lean + 0.6);
  tl.to(plus, { rotation: 45, duration: 0.3, ease: 'back.out(2)' }, lean + 0.6);
  tl.to(badge, { x: 6, duration: 0.05, yoyo: true, repeat: 3 }, lean + 0.65);

  // "flip back": back button greys out
  tl.to(badge, { scale: 0, duration: 0.2, ease: 'power2.in' }, back - 0.6);
  tl.to(cur, { x: 440, y: 900, duration: 0.55, ease: 'power2.inOut' }, back - 0.6);
  tl.to(cur, { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1 }, back);
  tl.to(backBtn, { opacity: 0.25, duration: 0.3 }, back);
  tl.to(slash, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, back + 0.05);
  tl.to(cur, { opacity: 0, y: '+=30', duration: 0.4 }, back + 0.45);

  // split: crowded left, spacious right
  const split = Math.max(spacious - 0.1, back + 0.5);
  tl.to(crowd, { scale: 0.46, x: 30, y: 173, duration: 0.9, ease: 'expo.inOut' }, split);
  tl.to(space, { opacity: 1, duration: 0.5 }, split + 0.3);
  tl.from(space, { x: 900, duration: 0.9, ease: 'expo.out', immediateRender: false }, split + 0.2);
  tl.to([labL, labR], { opacity: 1, duration: 0.5, stagger: 0.1 }, split + 0.7);

  // "crisp": crowded breaks into blocks
  tl.to(cc, { filter: 'blur(6px) saturate(.6)', duration: 0.6, ease: 'power2.out' }, crisp - 0.1);
  blocks.forEach((b) => tl.to(b, { opacity: 0.55 + rnd() * 0.4, duration: 0.12, ease: 'none' }, crisp - 0.1 + rnd() * 0.6));
  tl.to(space, { boxShadow: '0 0 0 4px rgba(59,110,245,.9), 0 0 50px rgba(59,110,245,.5)', duration: 0.5 }, crisp + 0.2);

  // "animation room": snap clutter away, open space
  tl.to([crowd, labL], { scale: '-=0.1', opacity: 0, duration: 0.22, ease: 'power4.in' }, anim - 0.45);
  tl.to(labR, { opacity: 0, duration: 0.2 }, anim - 0.45);
  tl.to(space, { scale: 1, x: 0, y: 0, boxShadow: '0 0 0 0px rgba(59,110,245,0)', duration: 0.8, ease: 'expo.inOut' }, anim - 0.3);
  tl.fromTo(dot, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, anim + 0.4);
  tl.to(ghosts, { opacity: (i) => 0.08 + i * 0.06, duration: 0.4 }, anim + 0.6);
  tl.to(st, { p: 1, duration: Math.max(1.4, caps - anim - 0.3), ease: 'sine.inOut' }, anim + 0.45);
  tl.to(ghosts, { opacity: 0, duration: 0.5 }, caps);

  // "captions": caption bar slides up into lower third and holds
  tl.to(zone, { opacity: 1, duration: 0.4 }, caps - 0.6);
  gsap.set(cap, { xPercent: -50 });
  tl.fromTo(cap, { y: 160, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.4)', immediateRender: false }, caps - 0.15);
  tl.to(zone, { opacity: 0.35, duration: 0.8 }, caps + 0.7);
  tl.to(cam, { scale: 1.05, duration: dur - caps, ease: 'power1.inOut' }, caps - 0.2);
});
