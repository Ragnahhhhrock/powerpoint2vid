/* Scene 2: "Use a strong title slide as the thumbnail, and burn in captions for people watching on mute."
 * Storyboard: paper stage. The file card from the last scene flips to reveal a landscape phone on the left.
 * On "title slide" a bold title card snaps into the screen as its thumbnail. On "burn" a caption bar slides
 * up across the bottom, its words lighting in sync with the narration. On "mute" a coral muted-speaker icon
 * pops into the corner. The camera makes one decisive pan right to "Captions on. Sound off." (110px, ink). */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (w, f) => { let v; try { v = ctx.at(0, w); } catch (e) { v = undefined; } return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const tTitle = A('title', 1.3), tThumb = A('thumbnail', 2.3), tBurn = A('burn', 3.0);
  const tPeople = A('people', 4.3), tWatch = A('watching', 4.7), tMute = A('mute', 5.3);
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 70% at 35% 45%, #fffdf8 0%, var(--paper) 55%, #e9e3d6 100%)';
  const persp = el('div', 'abs', stage, { inset: 0, perspective: '1800px' });
  const cam = el('div', 'abs', persp, { left: 0, top: 0, width: '2600px', height: '1080px', transformOrigin: '700px 540px' });

  /* soft light pool under the phone */
  el('div', 'abs', cam, { left: '80px', top: '200px', width: '1120px', height: '700px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(79,163,255,.14), transparent)' });

  /* ---- file card (carried over) ---- */
  const PX = 200, PY = 290, PW = 880, PH = 500;
  const card = el('div', 'abs', cam, { left: PX + 180 + 'px', top: PY + 90 + 'px', width: '520px', height: '320px', borderRadius: '28px', background: '#fff', boxShadow: '0 40px 80px rgba(26,34,51,.18)', transformOrigin: '50% 50%', backfaceVisibility: 'hidden' });
  const ic = el('div', 'abs', card, { left: '44px', top: '50px', width: '96px', height: '120px', borderRadius: '14px', background: 'var(--signal)', boxShadow: '0 12px 30px rgba(255,107,74,.4)' });
  ic.innerHTML = '<svg width="96" height="120"><path d="M38 44 L66 60 L38 76 Z" fill="#fff"/></svg>';
  const ext = el('div', 'abs', card, { left: '164px', top: '62px', font: MONO, letterSpacing: '.14em', color: 'var(--mist)' }); ext.textContent = 'MP4 · READY';
  const fname = el('div', 'abs', card, { left: '44px', top: '200px', width: '440px', font: '800 38px/1.12 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)' });
  fname.textContent = 'Q4 onboarding IT setup.mp4';

  /* ---- phone (landscape) ---- */
  const phone = el('div', 'abs', cam, { left: PX + 'px', top: PY + 'px', width: PW + 'px', height: PH + 'px', borderRadius: '64px', background: 'linear-gradient(145deg, #2a3348, #0e1420)', boxShadow: '0 60px 120px rgba(14,20,32,.35), inset 0 2px 0 rgba(255,255,255,.12)', transformOrigin: '50% 50%' });
  const scr = el('div', 'abs', phone, { left: '22px', top: '22px', right: '22px', bottom: '22px', borderRadius: '44px', overflow: 'hidden', background: '#1d2536' });
  // placeholder frame
  const ph = el('div', 'abs', scr, { inset: 0, background: 'linear-gradient(160deg, #2b3447, #1a2233)' });
  ph.innerHTML = '<svg class="abs" style="left:368px;top:178px" width="100" height="100"><circle cx="50" cy="50" r="46" fill="rgba(255,255,255,.12)"/><path d="M40 32 L68 50 L40 68 Z" fill="rgba(255,255,255,.5)"/></svg>';
  // title-card thumbnail
  const thumb = el('div', 'abs', scr, { inset: 0, background: 'radial-gradient(70% 90% at 20% 20%, #24304a, var(--night) 70%)', transformOrigin: '50% 50%' });
  el('div', 'abs', thumb, { left: '60px', top: '70px', width: '90px', height: '10px', borderRadius: '5px', background: 'var(--signal)' });
  const tk = el('div', 'abs', thumb, { left: '60px', top: '102px', font: MONO, letterSpacing: '.16em', color: 'var(--sky)' }); tk.textContent = 'ONBOARDING · Q4';
  const tt = el('div', 'abs', thumb, { left: '56px', top: '140px', width: '700px', font: '900 92px/0.95 Inter Display, Inter', letterSpacing: '-.045em', color: '#fff' });
  tt.innerHTML = 'IT setup,<br>day one';
  el('div', 'abs', thumb, { right: '-80px', bottom: '-120px', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,107,74,.45), transparent)' });
  const flashT = el('div', 'abs', scr, { inset: 0, background: '#fff', opacity: 0 });

  // caption bar
  const cap = el('div', 'abs', scr, { left: '40px', right: '40px', bottom: '28px', height: '70px', borderRadius: '16px', background: 'rgba(8,11,18,.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', font: '700 32px/1 Inter', letterSpacing: '-.01em' });
  const CW = ['burn', 'in', 'captions', 'for', 'people', 'watching', 'on', 'mute'];
  const capWords = CW.map((w) => { const s = el('span', '', cap, { color: 'rgba(255,255,255,.4)', display: 'inline-block' }); s.textContent = w; return s; });

  // mute badge
  const mute = el('div', 'abs', scr, { right: '28px', top: '28px', width: '88px', height: '88px', borderRadius: '50%', background: 'var(--signal)', boxShadow: '0 10px 40px rgba(255,107,74,.6)', transformOrigin: '50% 50%' });
  mute.innerHTML = '<svg width="88" height="88"><path d="M24 36 H34 L48 24 V64 L34 52 H24 Z" fill="#fff"/><path d="M56 36 L70 52 M70 36 L56 52" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>';
  const ring = el('div', 'abs', cam, { left: PX + PW - 22 - 28 - 44 - 70 + 'px', top: PY + 22 + 28 + 44 - 70 + 'px', width: '140px', height: '140px', borderRadius: '50%', border: '5px solid var(--signal)', opacity: 0 });

  // annotation
  const note = el('div', 'abs', cam, { left: PX + 10 + 'px', top: PY + PH + 40 + 'px', font: MONO, letterSpacing: '.14em', color: 'var(--mist)' });
  note.textContent = 'FIRST FRAME = THUMBNAIL';

  /* ---- the phrase ---- */
  const phrase = el('div', 'abs', cam, { left: '1330px', top: '360px', width: '900px' });
  const lab = el('div', '', phrase, { font: MONO, letterSpacing: '.16em', color: 'var(--signal)', marginBottom: '28px' }); lab.textContent = 'THE RULE';
  const l1 = el('div', '', phrase, { font: '900 110px/1.02 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--ink)' });
  const l2 = el('div', '', phrase, { font: '900 110px/1.02 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--ink)' });
  const w1 = ctx.split(l1, 'Captions on.', 'word'), w2 = ctx.split(l2, 'Sound off.', 'word');

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---- timeline ---- */
  gsap.set([thumb, mute, lab, note], { opacity: 0 });
  gsap.set(phone, { rotationY: -90 });
  gsap.set(cap, { yPercent: 160 });
  gsap.set([...w1, ...w2], { opacity: 0, y: 60 });

  // flip: card -> phone
  tl.to(card, { rotationY: 90, duration: 0.35, ease: 'power2.in' }, 0.3);
  tl.set(card, { opacity: 0 }, 0.65);
  tl.to(phone, { rotationY: 0, duration: 0.6, ease: 'back.out(1.6)' }, 0.65);
  tl.fromTo(cam, { scale: 1 }, { scale: 1.035, duration: 4.4, ease: 'power1.inOut', immediateRender: false }, 0.3);

  // title slide snaps in as thumbnail
  tl.fromTo(thumb, { opacity: 0, scale: 1.25 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.8)', immediateRender: false }, tTitle - 0.05);
  tl.fromTo(flashT, { opacity: 0 }, { opacity: 0.5, duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, tTitle);
  tl.fromTo(tt, { x: -40 }, { x: 0, duration: 0.5, immediateRender: false }, tTitle + 0.05);
  tl.fromTo(note, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, immediateRender: false }, tThumb - 0.1);

  // captions burn in
  tl.to(cap, { yPercent: 0, duration: 0.5, ease: 'back.out(1.5)' }, tBurn - 0.15);
  const fb = (i) => tBurn + i * 0.28;
  const ts = CW.map((w, i) => {
    if (i === 0) return tBurn;
    const v = A(w, fb(i));
    return v > tBurn ? v : fb(i);
  });
  capWords.forEach((s, i) => {
    tl.to(s, { color: '#FF6B4A', scale: 1.08, duration: 0.1, ease: 'power2.out' }, ts[i]);
    tl.to(s, { color: '#ffffff', scale: 1, duration: 0.2, ease: 'power2.out' }, ts[i] + 0.22);
  });

  // mute icon
  tl.fromTo(mute, { opacity: 0, scale: 0.2, rotation: -20 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, tMute - 0.08);
  tl.fromTo(ring, { opacity: 0.9, scale: 0.5 }, { opacity: 0, scale: 1.6, duration: 0.7, ease: 'power2.out', immediateRender: false }, tMute);

  // decisive pan right to the phrase
  tl.to(cam, { x: -470, duration: 1.1, ease: 'expo.inOut' }, tPeople - 0.1);
  tl.to(lab, { opacity: 1, duration: 0.4 }, tWatch);
  tl.to(w1, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)', stagger: 0.08 }, tWatch + 0.1);
  tl.to(w2, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)', stagger: 0.08 }, tWatch + 0.35);
  // slow push-in on the hero type to hold
  const holdStart = tPeople + 1.0;
  tl.to(cam, { scale: 1.07, duration: Math.max(0.5, ctx.dur - holdStart), ease: 'power1.out' }, holdStart);
});
