/* Scene 0 — "Turning lecture slides into video? Captions aren't an optional extra.
 * They decide whether some of your audience can follow at all."
 * Storyboard: the title builds word by word on the right while the deck's original slide drifts
 * in on the left. On "video?" the slide becomes a video player (play button, progress bar).
 * On "Captions" a caption bar rises inside the frame, its words landing as they're spoken.
 * "OPTIONAL EXTRA" pops in and is struck through on "extra". On "some" a few audience figures
 * dim to coral; on "follow" they light up mint as the caption pulses. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w, d) => { const v = ctx.at(i, w); return (v == null || isNaN(v)) ? d : v; };
  const tSlides = W(0, 'slides', 1.65), tVideo = W(0, 'video?', 2.23);
  const tCap = W(1, 'Captions', 3.27), tOpt = W(1, 'optional', 4.28), tExtra = W(1, 'extra.', 4.78);
  const tThey = W(2, 'They', 5.7), tSome = W(2, 'some', 6.57), tFollow = W(2, 'follow', 7.64);
  const mono = '600 22px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 70% at 30% 45%, #1a1f52 0%, var(--night) 70%), var(--night)';
  const glow = el('div', 'abs', stage, { left: '-200px', top: '100px', width: '1400px', height: '900px', background: 'radial-gradient(closest-side, rgba(109,74,255,.28), transparent)', pointerEvents: 'none' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 50%' });

  /* ---- video frame holding the original slide ---- */
  const FX = 120, FY = 250, FW = 960, FH = 540;
  const frame = el('div', 'abs', cam, { left: FX + 'px', top: FY + 'px', width: FW + 'px', height: FH + 'px', borderRadius: '18px', overflow: 'hidden', background: '#fff',
    boxShadow: '0 50px 120px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.08), 0 0 80px rgba(109,74,255,.25)' });
  const img = el('img', 'abs', frame, { inset: 0, width: '100%', height: '100%', objectFit: 'cover' });
  img.src = ctx.asset('slide-1.png');
  const shade = el('div', 'abs', frame, { inset: 0, background: 'linear-gradient(180deg, rgba(8,11,31,0) 50%, rgba(8,11,31,.55) 100%)', opacity: 0 });
  const play = el('div', 'abs', frame, { left: FW / 2 - 60 + 'px', top: FH / 2 - 60 + 'px', width: '120px', height: '120px', borderRadius: '50%', background: 'var(--violet)', boxShadow: '0 0 60px rgba(109,74,255,.8)', opacity: 0 });
  el('div', 'abs', play, { left: '46px', top: '34px', width: 0, height: 0, borderLeft: '40px solid #fff', borderTop: '26px solid transparent', borderBottom: '26px solid transparent' });
  const track = el('div', 'abs', frame, { left: '32px', right: '32px', bottom: '22px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.3)', opacity: 0 });
  const prog = el('div', 'abs', track, { left: 0, top: 0, bottom: 0, width: '100%', borderRadius: '3px', background: 'var(--coral)', transformOrigin: '0 50%' });

  const capBox = el('div', 'abs', frame, { left: '40px', right: '40px', bottom: '52px', textAlign: 'center' });
  const mkCap = (txt, size) => {
    const pill = el('div', 'abs', capBox, { left: '50%', bottom: 0, transform: 'translateX(-50%)', whiteSpace: 'nowrap', padding: '12px 24px', borderRadius: '10px', background: 'rgba(8,11,31,.88)', font: `600 ${size}px/1.2 Inter`, color: '#fff', letterSpacing: '-.01em' });
    const words = ctx.split(pill, txt, 'word');
    return { pill, words };
  };
  const cap1 = mkCap("Captions aren't an optional extra.", 32);
  const cap2 = mkCap('They decide whether some of your audience can follow at all.', 26);
  const capTag = el('div', 'abs', cam, { left: FX + 'px', top: FY - 52 + 'px', font: mono, letterSpacing: '.14em', color: 'var(--muted)' });
  capTag.textContent = 'LECTURE SLIDE → VIDEO';

  /* ---- title ---- */
  const title = el('div', 'abs', cam, { left: '1170px', top: '240px', width: '670px', font: '800 76px/1.02 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff' });
  const tw = ctx.split(title, 'Captions on presentation videos', 'word');
  tw.forEach((s) => { s.style.marginRight = '0.22em'; });
  tw[0].style.color = 'var(--violet-hi)';
  const sub = el('div', 'abs', cam, { left: '1174px', top: '510px', font: mono, letterSpacing: '.18em', color: 'var(--muted)' });
  sub.textContent = 'WHY AND HOW';

  const opt = el('div', 'abs', cam, { left: '1170px', top: '580px', padding: '12px 20px', border: '2px solid var(--coral)', borderRadius: '10px', font: '700 28px/1 ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: 'var(--coral)', transformOrigin: '0% 50%' });
  opt.textContent = 'OPTIONAL EXTRA';
  const strike = el('div', 'abs', opt, { left: '-10px', right: '-10px', top: '50%', height: '5px', marginTop: '-2px', background: 'var(--coral)', borderRadius: '3px', transformOrigin: '0 50%', boxShadow: '0 0 16px rgba(255,107,74,.8)' });

  /* ---- audience ---- */
  const N = 10, AX = 1170, AY = 720, AS = 66;
  const SOME = [1, 4, 6, 9];
  const people = Array.from({ length: N }, (_, i) => {
    const p = el('div', 'abs', cam, { left: AX + i * AS + 'px', top: AY + 'px', width: '46px', height: '86px' });
    const head = el('div', 'abs', p, { left: '11px', top: 0, width: '24px', height: '24px', borderRadius: '50%', background: 'var(--muted)' });
    const body = el('div', 'abs', p, { left: 0, top: '30px', width: '46px', height: '56px', borderRadius: '23px 23px 8px 8px', background: 'var(--muted)' });
    return { p, parts: [head, body] };
  });
  const audLab = el('div', 'abs', cam, { left: AX + 'px', top: AY + 112 + 'px', font: mono, letterSpacing: '.14em', color: 'var(--muted)' });
  audLab.textContent = 'YOUR AUDIENCE';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  tl.to(cam, { scale: 1.04, x: -10, duration: ctx.dur, ease: 'none' }, 0);
  tl.to(glow, { x: 120, duration: ctx.dur, ease: 'none' }, 0);

  gsap.set(frame, { filter: 'brightness(1) blur(0px)' });
  tl.fromTo(frame, { x: -80, y: 40, rotation: -3, opacity: 0, filter: 'brightness(1) blur(8px)' },
    { x: 0, y: 0, rotation: 0, opacity: 1, filter: 'brightness(1) blur(0px)', duration: 1.4, ease: 'power3.out' }, 0.05);
  tl.from(capTag, { opacity: 0, x: -20, duration: 0.6 }, tSlides - 0.2);
  tl.from(tw, { y: 60, opacity: 0, rotation: 4, duration: 0.7, stagger: 0.12, ease: 'back.out(1.6)' }, 0.15);
  tl.from(sub, { opacity: 0, y: 14, duration: 0.6 }, 0.9);

  // "video?": slide becomes a player
  tl.to(frame, { scale: 1.03, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }, tVideo - 0.1);
  tl.to(shade, { opacity: 1, duration: 0.5 }, tVideo);
  tl.fromTo(play, { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' }, tVideo);
  tl.to(track, { opacity: 1, duration: 0.4 }, tVideo);
  gsap.set(prog, { scaleX: 0 });
  tl.to(prog, { scaleX: 1, duration: ctx.dur - tVideo, ease: 'none' }, tVideo);
  tl.to(play, { scale: 0.6, opacity: 0, duration: 0.4, ease: 'power2.in' }, tCap - 0.45);

  // caption words land as spoken
  gsap.set([...cap1.words, ...cap2.words], { opacity: 0 });
  gsap.set([cap1.pill, cap2.pill], { opacity: 0 });
  tl.fromTo(cap1.pill, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, immediateRender: false }, tCap - 0.1);
  const bw = (i) => (ctx.beats[i] && ctx.beats[i].words) || [];
  cap1.words.forEach((s, k) => { const w = bw(1)[k]; tl.to(s, { opacity: 1, duration: 0.2 }, w ? w.t : tCap + k * 0.35); });
  tl.to(cap1.pill, { opacity: 0, y: -10, duration: 0.25 }, tThey - 0.2);
  tl.fromTo(cap2.pill, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, immediateRender: false }, tThey - 0.05);
  cap2.words.forEach((s, k) => { const w = bw(2)[k]; tl.to(s, { opacity: 1, duration: 0.18 }, w ? w.t : tThey + k * 0.22); });

  // "optional extra" — struck out
  tl.fromTo(opt, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, tOpt - 0.1);
  gsap.set(strike, { scaleX: 0 });
  tl.to(strike, { scaleX: 1, duration: 0.35, ease: 'power3.inOut' }, tExtra);
  tl.to(opt, { opacity: 0.45, duration: 0.5 }, tExtra + 0.4);

  // audience
  tl.from(people.map((p) => p.p), { y: 30, opacity: 0, duration: 0.5, stagger: 0.04, ease: 'back.out(1.8)' }, tThey);
  tl.from(audLab, { opacity: 0, duration: 0.5 }, tThey + 0.3);
  const some = SOME.map((i) => people[i]);
  tl.to(some.flatMap((p) => p.parts), { background: 'var(--coral)', duration: 0.3 }, tSome);
  tl.to(some.map((p) => p.p), { opacity: 0.55, y: 8, duration: 0.4 }, tSome);
  tl.to(some.flatMap((p) => p.parts), { background: 'var(--mint)', duration: 0.35 }, tFollow);
  tl.to(some.map((p) => p.p), { opacity: 1, y: -6, duration: 0.5, stagger: 0.05, ease: 'back.out(2.2)' }, tFollow);
  tl.to(some.flatMap((p) => p.parts), { boxShadow: '0 0 24px rgba(31,191,143,.8)', duration: 0.5 }, tFollow);
  tl.to(cap2.pill, { boxShadow: '0 0 0 3px var(--mint), 0 0 40px rgba(31,191,143,.6)', duration: 0.35, yoyo: true, repeat: 1 }, tFollow);
});
