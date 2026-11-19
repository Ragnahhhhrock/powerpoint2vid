/* Scene 5 (final): "Fewer, bigger images make a better video. On Pro, AI directs it, framing each
 * picture as a scene timed to your voice. Try Basic first at powerpoint2vid.com."
 * Storyboard: a night stage. Three small photos sit in a row. On "Fewer" two of them clear away with
 * quick ease-in exits. On "bigger" the survivor grows into one full-width photo with a long settle,
 * then drifts under a slow Ken Burns zoom. On "framing" crop marks close in on the frame. On "timed"
 * a teal waveform pulses along the top edge, and on "voice" a second photo wipes in on the beat.
 * The bottom band stays empty for captions. On "Try Basic first" the photo dims and the headline
 * lands at 130px in paper white. The URL arrives in amber on "powerpoint2vid.com" and the frame holds. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { try { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; } catch (e) { return f; } };
  const fewer = A(0, 'Fewer', 0.8), bigger = A(0, 'bigger', 1.5);
  const pro = A(1, 'Pro', 3.9), framing = A(1, 'framing', 5.0), timed = A(1, 'timed', 6.9), voice = A(1, 'voice', 7.8);
  const tryT = A(2, 'Try', 8.6), basic = A(2, 'Basic', tryT + 0.3), first = A(2, 'first', basic + 0.35);
  const url = A(2, 'powerpoint2vid.com', A(2, 'powerpoint2vid', first + 0.7));
  const D = ctx.dur;

  // deterministic PRNG for procedural photos
  const prng = (s) => () => { s |= 0; s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  let uid = 0;
  const ridge = (r, base, amp, step) => {
    let d = 'M0 860 L0 ' + base;
    for (let x = 0; x <= 1920 + step; x += step) d += ` L${x} ${(base - r() * amp).toFixed(1)}`;
    return d + ' L1920 860 Z';
  };
  const ridgeTop = (r, base, amp, step) => {
    const pts = []; for (let x = 0; x <= 1920 + step; x += step) pts.push([x, base - r() * amp]); return pts;
  };
  const photo = (kind, seed) => {
    const r = prng(seed), id = 'g' + (uid++);
    if (kind === 'dusk') {
      return `<svg width="100%" height="100%" viewBox="0 0 1920 860" preserveAspectRatio="xMidYMid slice">
        <defs><linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#181a26"/><stop offset=".45" stop-color="#4a4f66"/><stop offset=".75" stop-color="#d98a3a"/><stop offset="1" stop-color="#F2A541"/></linearGradient>
        <radialGradient id="${id}g" cx=".64" cy=".6" r=".35"><stop offset="0" stop-color="#ffd49a" stop-opacity=".85"/><stop offset="1" stop-color="#F2A541" stop-opacity="0"/></radialGradient></defs>
        <rect width="1920" height="860" fill="url(#${id}s)"/><rect width="1920" height="860" fill="url(#${id}g)"/>
        <circle cx="1230" cy="540" r="78" fill="#ffe2b0"/>
        <path d="${ridge(r, 600, 170, 120)}" fill="#5B6275" opacity=".75"/>
        <path d="${ridge(r, 680, 150, 90)}" fill="#2c3042"/>
        <path d="${ridge(r, 770, 110, 70)}" fill="#14161C"/></svg>`;
    }
    if (kind === 'lake') {
      const top = ridgeTop(r, 520, 200, 110);
      const m = 'M0 560 ' + top.map(([x, y]) => `L${x} ${y.toFixed(1)}`).join(' ') + ' L1920 560 Z';
      const refl = 'M0 560 ' + top.map(([x, y]) => `L${x} ${(1120 - y).toFixed(1)}`).join(' ') + ' L1920 560 Z';
      return `<svg width="100%" height="100%" viewBox="0 0 1920 860" preserveAspectRatio="xMidYMid slice">
        <defs><linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d2427"/><stop offset=".6" stop-color="#2BB3A3"/><stop offset="1" stop-color="#cfeee6"/></linearGradient>
        <linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d7d73"/><stop offset="1" stop-color="#0c1d20"/></linearGradient></defs>
        <rect width="1920" height="860" fill="url(#${id}s)"/>
        <circle cx="560" cy="300" r="46" fill="#F6F3EC" opacity=".9"/>
        <path d="${m}" fill="#1b4a4a"/>
        <rect y="560" width="1920" height="300" fill="url(#${id}w)"/>
        <path d="${refl}" fill="#1b4a4a" opacity=".45"/>
        <rect y="556" width="1920" height="4" fill="#F6F3EC" opacity=".35"/>
        <path d="${ridge(r, 860, 90, 140)}" fill="#0b1416"/></svg>`;
    }
    return `<svg width="100%" height="100%" viewBox="0 0 1920 860" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a1f2a"/><stop offset="1" stop-color="#E8604C"/></linearGradient></defs>
      <rect width="1920" height="860" fill="url(#${id}s)"/>
      <path d="${ridge(r, 640, 200, 160)}" fill="#2a1820" opacity=".85"/>
      <path d="${ridge(r, 760, 120, 100)}" fill="#14161C"/></svg>`;
  };

  /* ---- stage ---- */
  stage.style.background = 'radial-gradient(80% 70% at 50% 40%, #1F2230 0%, #14161C 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 430px' });

  const TS = 0.28, TW = 1920 * TS, TH = 860 * TS;
  const tiles = [-1, 1].map((s, i) => {
    const t = el('div', 'abs', cam, { left: 960 + s * 620 - TW / 2 + 'px', top: 430 - TH / 2 + 'px', width: TW + 'px', height: TH + 'px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,.5)' });
    t.innerHTML = photo(i ? 'lake' : 'warm', 11 + i * 7);
    return t;
  });

  const frame = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '860px', overflow: 'hidden', transformOrigin: '960px 430px', borderRadius: '36px', boxShadow: '0 50px 120px rgba(0,0,0,.6)' });
  const p1 = el('div', 'abs', frame, { inset: 0, transformOrigin: '62% 60%' }); p1.innerHTML = photo('dusk', 3);
  const p2w = el('div', 'abs', frame, { inset: 0 });
  const p2 = el('div', 'abs', p2w, { inset: 0, transformOrigin: '30% 40%' }); p2.innerHTML = photo('lake', 29);
  // soft fall-off into the calm caption band
  el('div', 'abs', frame, { left: 0, right: 0, bottom: 0, height: '220px', background: 'linear-gradient(180deg, transparent, rgba(20,22,28,.85))' });
  el('div', 'abs', frame, { left: 0, right: 0, top: 0, height: '200px', background: 'linear-gradient(180deg, rgba(20,22,28,.55), transparent)' });
  const dim = el('div', 'abs', frame, { inset: 0, background: 'radial-gradient(70% 70% at 50% 45%, rgba(20,22,28,.6), rgba(20,22,28,.9))', opacity: 0 });

  // crop marks ("framing")
  const marks = el('div', 'abs', cam, { left: '110px', top: '170px', width: '1700px', height: '600px', transformOrigin: '50% 50%' });
  [['0', '0', 'Top', 'Left'], ['0', 'auto', 'Top', 'Right'], ['auto', '0', 'Bottom', 'Left'], ['auto', 'auto', 'Bottom', 'Right']].forEach(([tp, lf, v, h]) => {
    const m = el('div', 'abs', marks, { width: '70px', height: '70px', top: tp === '0' ? '0' : 'auto', bottom: tp === 'auto' ? '0' : 'auto', left: lf === '0' ? '0' : 'auto', right: lf === 'auto' ? '0' : 'auto' });
    m.style['border' + v] = '4px solid #F6F3EC'; m.style['border' + h] = '4px solid #F6F3EC';
  });
  const proTag = el('div', 'abs', cam, { left: '110px', top: '128px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: '#F6F3EC' });
  proTag.textContent = 'PRO · AI-DIRECTED';
  const sceneTag = el('div', 'abs', cam, { right: '110px', top: '128px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'rgba(246,243,236,.7)', fontVariantNumeric: 'tabular-nums' });

  // waveform along the top edge
  const N = 72, wave = el('div', 'abs', cam, { left: '110px', width: '1700px', top: '40px', height: '72px' });
  const bars = Array.from({ length: N }, (_, i) => el('div', 'abs', wave, { left: i * (1700 / N) + 'px', width: '9px', top: '36px', height: '4px', borderRadius: '5px', background: '#2BB3A3', boxShadow: '0 0 14px rgba(43,179,163,.7)' }));
  const amp = { a: 0, k: 0 };

  // closing card
  const card = el('div', 'abs', cam, { left: '160px', width: '1600px', top: '250px', textAlign: 'center' });
  const head = el('div', '', card, { font: '900 130px/1 "Inter Display", Inter', letterSpacing: '-.045em', color: '#F6F3EC', textShadow: '0 10px 50px rgba(0,0,0,.5)' });
  const words = ctx.split(head, 'Try Basic first', 'word');
  const urlEl = el('div', '', card, { marginTop: '40px', font: '700 60px/1 "Inter Display", Inter', letterSpacing: '-.02em', color: '#F2A541', display: 'inline-block', position: 'relative' });
  urlEl.textContent = 'powerpoint2vid.com';
  const uline = el('div', 'abs', urlEl, { left: 0, right: 0, bottom: '-16px', height: '4px', borderRadius: '2px', background: '#F2A541', transformOrigin: '0% 50%', boxShadow: '0 0 20px rgba(242,165,65,.6)' });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    sceneTag.textContent = t < voice - 0.1 ? 'SCENE 01' : 'SCENE 02';
    for (let i = 0; i < N; i++) {
      const n = Math.abs(Math.sin(t * 7.1 + i * 0.53) * 0.6 + Math.sin(t * 3.3 - i * 0.21) * 0.4);
      const env = 0.55 + 0.45 * Math.sin(i / N * Math.PI);
      const h = 4 + amp.a * (8 + 52 * n * env) + amp.k * 30 * env;
      bars[i].style.height = h.toFixed(1) + 'px';
      bars[i].style.top = (36 - h / 2).toFixed(1) + 'px';
    }
  });

  /* ---- timeline ---- */
  gsap.set(frame, { scale: TS });
  gsap.set(p2w, { clipPath: 'inset(0px 0px 0px 100%)' });
  gsap.set([marks, proTag, sceneTag, wave], { opacity: 0 });
  gsap.set(words, { opacity: 0, y: 50 });
  gsap.set(urlEl, { opacity: 0, y: 30 });
  gsap.set(uline, { scaleX: 0 });
  gsap.set(frame, { filter: 'blur(0px)' });

  tl.from([tiles[0], frame, tiles[1]], { opacity: 0, y: 30, duration: 0.5, stagger: 0.06 }, 0);
  // "Fewer": two clear away fast
  tl.to(tiles, { opacity: 0, y: 60, scale: 0.9, duration: 0.45, ease: 'power2.in', stagger: 0.05 }, fewer - 0.1);
  // "bigger": the survivor grows into full width
  tl.to(frame, { scale: 1, borderRadius: '0px', duration: 1.8, ease: 'expo.out' }, Math.max(bigger - 0.2, fewer + 0.35));
  // Ken Burns
  tl.fromTo(p1, { scale: 1.02, x: 0 }, { scale: 1.16, x: -40, duration: D, ease: 'none', immediateRender: false }, 0);
  tl.to(cam, { scale: 1.03, duration: D - 1.5, ease: 'power1.inOut' }, 1.5);

  // "Pro" / "framing"
  tl.to(proTag, { opacity: 1, duration: 0.5, ease: 'power2.out' }, pro);
  tl.fromTo(marks, { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out', immediateRender: false }, framing);
  tl.to(sceneTag, { opacity: 1, duration: 0.5 }, framing + 0.2);
  // "timed to your voice"
  tl.to(wave, { opacity: 1, duration: 0.4 }, timed - 0.1);
  tl.to(amp, { a: 1, duration: 0.6, ease: 'power2.out' }, timed - 0.1);
  tl.to(p2w, { clipPath: 'inset(0px 0px 0px 0%)', duration: 0.6, ease: 'expo.inOut' }, voice - 0.45);
  tl.to(amp, { k: 1, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, voice);
  tl.fromTo(marks, { scale: 1.04 }, { scale: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, voice);
  tl.fromTo(p2, { scale: 1.14 }, { scale: 1.02, duration: D - voice + 0.45, ease: 'none', immediateRender: false }, voice - 0.45);

  // "Try Basic first"
  tl.to([marks, proTag, sceneTag], { opacity: 0, duration: 0.35, ease: 'power2.in' }, tryT - 0.25);
  tl.to(amp, { a: 0.35, duration: 0.8 }, tryT);
  tl.to(wave, { opacity: 0.5, duration: 0.8 }, tryT);
  tl.to(dim, { opacity: 1, duration: 0.9, ease: 'power2.out' }, tryT - 0.2);
  tl.to(frame, { filter: 'blur(4px)', duration: 1.2, ease: 'power2.out' }, tryT - 0.2);
  [tryT, basic, first].forEach((t, i) => tl.to(words[i], { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)' }, t - 0.08));
  // URL in amber
  tl.to(urlEl, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, url - 0.1);
  tl.to(uline, { scaleX: 1, duration: 0.9, ease: 'expo.out' }, url + 0.2);
});
