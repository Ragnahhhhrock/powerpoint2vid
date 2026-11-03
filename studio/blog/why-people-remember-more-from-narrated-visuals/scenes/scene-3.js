/* Scene 3: "But narrated visuals aren't automatically good. Don't read your bullets aloud, cut decoration that doesn't teach, and talk about what's on screen, while it's on screen."
 * Storyboard: ink stage with coral accents. A busy mock slide is crammed with clip-art and bullets. On 'read your bullets aloud' an amber
 * copy of the bullets slides over them with a voice waveform, and both jam, flashing coral. On 'cut decoration' the clip-art is swept off-frame.
 * On 'talk' the slide calms to one clean picture. On 'while it's on screen' a desynced waveform snaps into alignment under it.
 * The headline 'What gets in the way' sits at the top at 100px; the four bullets are rebuilt as three gesture chips. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w, fb) => { let v; try { v = ctx.at(i, w); } catch (e) {} return (typeof v === 'number' && isFinite(v)) ? v : fb; };
  const tGood = W(0, 'good', 2.732), tRead = W(1, 'read', 3.905), tAloud = W(1, 'aloud', 4.578), tCut = W(1, 'cut', 5.229), tDeco = W(1, 'decoration', 5.496), tTalk = W(1, 'talk', 7.469), tAbout = W(1, 'about', 7.713), tWhile = W(1, 'while', 9.153);
  let seed = 11; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const wave = (w, h, n, color) => { let s = `<svg width="${w}" height="${h}">`; const bw = w / n; for (let i = 0; i < n; i++) { const bh = h * (0.15 + 0.85 * Math.abs(Math.sin(i * 0.55)) * (0.5 + 0.5 * rnd())); s += `<rect x="${(i * bw + bw * 0.2).toFixed(1)}" y="${((h - bh) / 2).toFixed(1)}" width="${(bw * 0.6).toFixed(1)}" height="${bh.toFixed(1)}" rx="${(bw * 0.3).toFixed(1)}" fill="${color}"/>`; } return s + '</svg>'; };

  stage.style.background = 'radial-gradient(80% 70% at 50% 45%, #262f4d 0%, var(--ink) 55%, var(--night) 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  const coralGlow = el('div', 'abs', cam, { left: '460px', top: '200px', width: '1000px', height: '700px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,94,87,.38), transparent)', opacity: 0 });
  const blueGlow = el('div', 'abs', cam, { left: '560px', top: '220px', width: '800px', height: '600px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(61,123,255,.4), transparent)', opacity: 0 });

  const head = el('div', 'abs', cam, { left: '120px', top: '70px', font: '900 100px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  head.textContent = 'What gets in the way';
  const under = el('div', 'abs', cam, { left: '124px', top: '188px', width: '320px', height: '8px', borderRadius: '4px', background: 'var(--coral)', transformOrigin: '0% 50%', boxShadow: '0 0 24px rgba(255,94,87,.6)' });

  const slide = el('div', 'abs', cam, { left: '260px', top: '250px', width: '1400px', height: '560px', borderRadius: '18px', background: 'var(--paper)', boxShadow: '0 50px 120px rgba(0,0,0,.55)' });
  const mockTitle = el('div', 'abs', slide, { left: '60px', top: '36px', font: '700 44px/1 Inter', letterSpacing: '-.02em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  mockTitle.textContent = 'What gets in the way of learning';
  const LINES = ['Reading slide text aloud word for word', 'Decorative extras', 'Words and pictures out of sync', 'Too much at once'];
  const mkList = (left, top, color) => { const b = el('div', 'abs', slide, { left: left + 'px', top: top + 'px', width: '780px', font: '500 36px/1.55 Inter', color, whiteSpace: 'nowrap' }); LINES.forEach((l) => { el('div', '', b, {}).textContent = '\u2022  ' + l; }); return b; };
  const jam = el('div', 'abs', slide, { left: '40px', top: '108px', width: '840px', height: '258px', borderRadius: '12px', border: '4px solid var(--coral)', background: 'rgba(255,94,87,.14)', opacity: 0 });
  const bul = mkList(60, 120, '#2b3350');
  const dup = mkList(74, 130, 'var(--ear-amber)');
  const wave1 = el('div', 'abs', slide, { left: '60px', top: '398px', width: '780px', height: '110px', opacity: 0 });
  wave1.innerHTML = wave(780, 110, 52, '#FFB23D');

  const ART = [
    [1000, 60, 170, 170, '<svg width="170" height="170"><polygon points="85,5 106,62 166,64 118,100 136,160 85,124 34,160 52,100 4,64 64,62" fill="#FF5E57" stroke="#1B2238" stroke-width="4"/></svg>'],
    [1190, 230, 150, 150, '<svg width="150" height="150"><g stroke="#FFB23D" stroke-width="8" stroke-linecap="round"><line x1="75" y1="4" x2="75" y2="26"/><line x1="75" y1="124" x2="75" y2="146"/><line x1="4" y1="75" x2="26" y2="75"/><line x1="124" y1="75" x2="146" y2="75"/><line x1="25" y1="25" x2="40" y2="40"/><line x1="110" y1="110" x2="125" y2="125"/><line x1="125" y1="25" x2="110" y2="40"/><line x1="25" y1="125" x2="40" y2="110"/></g><circle cx="75" cy="75" r="36" fill="#FFD23D"/></svg>'],
    [900, 290, 230, 130, '<svg width="230" height="130"><g fill="#59C3FF"><ellipse cx="115" cy="90" rx="105" ry="36"/><circle cx="85" cy="62" r="40"/><circle cx="140" cy="52" r="48"/></g></svg>'],
    [1120, 410, 210, 120, '<svg width="210" height="120"><path d="M10 100 C 60 10, 120 120, 180 30" fill="none" stroke="#3FBF6A" stroke-width="12" stroke-linecap="round"/><path d="M150 26 L184 26 L180 62" fill="none" stroke="#3FBF6A" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg>'],
    [1240, 36, 110, 150, '<svg width="110" height="150"><circle cx="55" cy="52" r="44" fill="#C77DFF"/><rect x="35" y="94" width="40" height="40" rx="8" fill="#1B2238"/></svg>'],
    [870, 450, 60, 60, '<svg width="60" height="60"><path d="M30 0 L37 23 L60 30 L37 37 L30 60 L23 37 L0 30 L23 23 Z" fill="#FFB23D"/></svg>'],
    [1340, 330, 50, 50, '<svg width="50" height="50"><path d="M25 0 L31 19 L50 25 L31 31 L25 50 L19 31 L0 25 L19 19 Z" fill="#FF5E57"/></svg>']
  ];
  const art = ART.map(([x, y, w, h, svg]) => { const a = el('div', 'abs', slide, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' }); a.innerHTML = svg; return a; });

  /* calm state: one clean picture with the voice under it */
  const pic = el('div', 'abs', slide, { left: '440px', top: '60px', width: '520px', height: '300px', borderRadius: '20px', overflow: 'hidden', background: 'var(--eye-blue)', boxShadow: '0 20px 60px rgba(61,123,255,.45)' });
  pic.innerHTML = '<svg width="520" height="300"><circle cx="400" cy="80" r="38" fill="#F6F3EC"/><path d="M0 300 L150 140 L250 230 L340 160 L520 300 Z" fill="#1B2238" opacity=".55"/></svg>';
  const syncL = el('div', 'abs', slide, { left: '438px', top: '60px', width: '0', height: '450px', borderLeft: '3px dashed var(--eye-blue)', opacity: 0 });
  const syncR = el('div', 'abs', slide, { left: '957px', top: '60px', width: '0', height: '450px', borderLeft: '3px dashed var(--eye-blue)', opacity: 0 });
  const wave2 = el('div', 'abs', slide, { left: '440px', top: '395px', width: '520px', height: '110px' });
  const w2c = el('div', 'abs', wave2, { inset: 0 }); w2c.innerHTML = wave(520, 110, 36, '#FF5E57');
  const w2a = el('div', 'abs', wave2, { inset: 0, opacity: 0 }); w2a.innerHTML = wave(520, 110, 36, '#FFB23D');

  /* the three gestures */
  const row = el('div', 'abs', cam, { left: '0px', width: '1920px', top: '852px', display: 'flex', justifyContent: 'center', gap: '28px' });
  const chips = [['DON\u2019T READ BULLETS', 'var(--ear-amber)'], ['CUT DECORATION', 'var(--coral)'], ['SYNC WORDS + PICTURE', 'var(--eye-blue)']].map(([t, c]) => {
    const ch = el('div', '', row, { display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 30px', borderRadius: '40px', border: '2px solid ' + c, background: 'rgba(255,255,255,.05)', font: '600 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.1em', color: 'var(--paper)', whiteSpace: 'nowrap' });
    el('span', '', ch, { width: '12px', height: '12px', borderRadius: '50%', background: c, display: 'inline-block' });
    el('span', '', ch, {}).textContent = t; return ch;
  });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set([dup, wave1, pic, wave2], { opacity: 0 });
  gsap.set(wave2, { x: 260 });
  gsap.set(wave1, { clipPath: 'inset(0px 100% 0px 0px)' });
  tl.to(cam, { scale: 1.03, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.fromTo(slide, { opacity: 0.3, y: 50, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 0);
  tl.fromTo(head, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, 0.05);
  tl.fromTo(under, { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 0.4);
  art.forEach((a, i) => tl.fromTo(a, { scale: 0, rotation: -25 }, { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.8)' }, 0.3 + i * 0.07));
  tl.fromTo(chips, { opacity: 0, y: 20, scale: 0.8 }, { opacity: 0, duration: 0.01 }, 0);

  // "good.": coral doubt
  tl.to(coralGlow, { opacity: 1, duration: 0.6 }, tGood - 0.15);
  tl.to(under, { width: '760px', duration: 0.6, ease: 'expo.inOut' }, tGood - 0.1);
  tl.to(slide, { rotation: -0.6, duration: 0.08, yoyo: true, repeat: 3, ease: 'sine.inOut' }, tGood);

  // "read your bullets aloud": amber copy and voice jam on the bullets
  tl.fromTo(dup, { opacity: 0, x: -30 }, { opacity: 0.9, x: 0, duration: 0.5, immediateRender: false }, tRead);
  tl.to(wave1, { opacity: 1, clipPath: 'inset(0px 0% 0px 0px)', duration: 0.7, ease: 'power2.out' }, tRead);
  tl.to(chips[0], { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.8)' }, tRead + 0.1);
  tl.fromTo(jam, { opacity: 0 }, { opacity: 1, duration: 0.1, yoyo: true, repeat: 4, immediateRender: false }, tAloud);
  tl.to([bul, dup], { x: '+=10', duration: 0.05, yoyo: true, repeat: 5, ease: 'none' }, tAloud);

  // "cut decoration": clip-art swept off-frame
  tl.to([dup, jam, wave1], { opacity: 0, duration: 0.35 }, tCut);
  art.forEach((a, i) => tl.to(a, { x: 1500 + i * 40, y: -160 + (i % 3) * 90, rotation: 50 + i * 12, duration: 0.8, ease: 'power3.in' }, tDeco - 0.25 + i * 0.05));
  tl.to(chips[1], { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.8)' }, tCut + 0.1);

  // "talk about what's on screen": calm to one clean element
  tl.to([bul, mockTitle], { opacity: 0, y: -20, duration: 0.45, ease: 'power2.in' }, tTalk - 0.3);
  tl.to(coralGlow, { opacity: 0, duration: 0.8 }, tTalk);
  tl.to(blueGlow, { opacity: 1, duration: 0.8 }, tTalk);
  tl.fromTo(pic, { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)', immediateRender: false }, tTalk);
  tl.to(wave2, { opacity: 1, duration: 0.4 }, tAbout);

  // "while it's on screen": the voice snaps into sync
  tl.to(wave2, { x: 0, duration: 0.45, ease: 'back.out(1.6)' }, tWhile - 0.1);
  tl.to(w2a, { opacity: 1, duration: 0.25 }, tWhile + 0.1);
  tl.to(w2c, { opacity: 0, duration: 0.25 }, tWhile + 0.1);
  tl.to([syncL, syncR], { opacity: 0.8, duration: 0.3 }, tWhile + 0.2);
  tl.to(pic, { boxShadow: '0 20px 90px rgba(61,123,255,.85)', duration: 0.4, yoyo: true, repeat: 1 }, tWhile + 0.2);
  tl.to(chips[2], { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.8)' }, tWhile + 0.1);
});
