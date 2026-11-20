/* Scene 3 — "Keep it shorter than you think. One to two minutes for product page and email, captioned clips
 * for social. Thirty slides? Six to ten will do."
 * Storyboard: paper stage, headline "Shorter than you think" snaps in at 100px with an orange underline on
 * "shorter". On "One to two minutes" a slim signal-blue timeline bar draws in, labelled "1–2 min", beside
 * small page + email icons. On "captioned" a phone frame rises showing a single slide with a caption strip.
 * On "Thirty slides" the panel glides away left and a grid of 30 deck thumbnails fills the frame. On
 * "Six to ten" most fade to haze and collapse; eight snap into a tight orange-highlighted row under "6–10". Hold.
 */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const tShort = ctx.at(0, 'shorter'), tOne = ctx.at(1, 'One'), tCap = ctx.at(1, 'captioned');
  const tThirty = ctx.at(2, 'Thirty'), tSix = ctx.at(3, 'Six');
  const MONO = '600 22px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 50% 35%, #fffdf8 0%, var(--paper) 70%, #ece7dd 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  /* ---------- headline ---------- */
  const head = el('div', 'abs', cam, { left: '160px', top: '110px', font: '800 100px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const words = ctx.split(head, 'Shorter than you think', 'word');
  const underline = el('div', 'abs', cam, { left: '164px', top: '222px', width: '330px', height: '10px', borderRadius: '5px', background: 'var(--launch)', transformOrigin: '0% 50%' });

  /* ---------- phase 1: formats ---------- */
  const p1 = el('div', 'abs', cam, { inset: 0, transformOrigin: '700px 600px' });

  // page icon
  const page = el('div', 'abs', p1, { left: '160px', top: '340px', width: '130px', height: '96px', borderRadius: '12px', background: '#fff', border: '3px solid var(--ink)', boxShadow: '0 14px 30px rgba(27,34,51,.12)', overflow: 'hidden' });
  const pbar = el('div', 'abs', page, { left: 0, right: 0, top: 0, height: '22px', background: 'var(--ink)' });
  [0, 1, 2].forEach((i) => el('div', 'abs', pbar, { left: 10 + i * 14 + 'px', top: '7px', width: '8px', height: '8px', borderRadius: '50%', background: ['#FF5A36', '#f2c14e', '#2FC69A'][i] }));
  [0, 1, 2].forEach((i) => el('div', 'abs', page, { left: '14px', top: 36 + i * 16 + 'px', width: [90, 70, 80][i] + 'px', height: '7px', borderRadius: '4px', background: 'rgba(27,34,51,.18)' }));
  const pageLab = el('div', 'abs', p1, { left: '160px', top: '452px', font: MONO, letterSpacing: '.12em', color: 'var(--haze)' });
  pageLab.textContent = 'PRODUCT PAGE';

  // email icon
  const mail = el('div', 'abs', p1, { left: '420px', top: '340px', width: '130px', height: '96px' });
  mail.innerHTML = `<svg width="130" height="96" viewBox="0 0 130 96"><rect x="2" y="2" width="126" height="92" rx="12" fill="#fff" stroke="#1B2233" stroke-width="3"/><path d="M8 12 L65 54 L122 12" fill="none" stroke="#1B2233" stroke-width="3" stroke-linejoin="round"/></svg>`;
  mail.style.filter = 'drop-shadow(0 14px 30px rgba(27,34,51,.12))';
  const mailLab = el('div', 'abs', p1, { left: '420px', top: '452px', font: MONO, letterSpacing: '.12em', color: 'var(--haze)' });
  mailLab.textContent = 'EMAIL';

  // timeline bar 0–3 min
  const BX = 160, BW = 840, BY = 690;
  const big = el('div', 'abs', p1, { left: BX + 'px', top: '540px', font: '800 96px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--signal)', whiteSpace: 'nowrap' });
  big.textContent = '1–2 min';
  const track = el('div', 'abs', p1, { left: BX + 'px', top: BY + 'px', width: BW + 'px', height: '12px', borderRadius: '6px', background: 'rgba(27,34,51,.1)', transformOrigin: '0% 50%' });
  const fill = el('div', 'abs', p1, { left: BX + 'px', top: BY + 'px', width: (BW * 2) / 3 + 'px', height: '12px', borderRadius: '6px', background: 'linear-gradient(90deg, rgba(61,123,255,.35), var(--signal))', boxShadow: '0 0 24px rgba(61,123,255,.45)', transformOrigin: '0% 50%' });
  const ticks = [0, 1, 2, 3].map((m) => {
    const x = BX + (BW * m) / 3;
    const tk = el('div', 'abs', p1, { left: x - 2 + 'px', top: BY - 10 + 'px', width: '4px', height: '32px', borderRadius: '2px', background: m === 1 || m === 2 ? 'var(--signal)' : 'rgba(27,34,51,.25)' });
    const lb = el('div', 'abs', p1, { left: x - 40 + 'px', width: '80px', textAlign: 'center', top: BY + 36 + 'px', font: MONO, letterSpacing: '.08em', color: 'var(--haze)' });
    lb.textContent = m + ':00';
    return [tk, lb];
  }).flat();

  // phone
  const phone = el('div', 'abs', p1, { left: '1300px', top: '300px', width: '300px', height: '600px', borderRadius: '46px', background: 'var(--ink)', boxShadow: '0 40px 80px rgba(27,34,51,.3), 0 0 0 2px rgba(255,255,255,.06) inset' });
  const screen = el('div', 'abs', phone, { left: '14px', top: '14px', right: '14px', bottom: '14px', borderRadius: '34px', overflow: 'hidden', background: 'var(--night)' });
  const notch = el('div', 'abs', phone, { left: '110px', top: '24px', width: '80px', height: '18px', borderRadius: '10px', background: '#000' });
  const shot = el('img', 'abs', screen, { left: 0, top: '180px', width: '272px', height: '153px', objectFit: 'cover' });
  shot.src = ctx.asset('slide-2.png');
  const caption = el('div', 'abs', screen, { left: '14px', right: '14px', bottom: '70px', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,.78)', font: '700 24px/1.2 Inter', color: '#fff', textAlign: 'center' });
  caption.innerHTML = 'Clear story.<span style="color:#FF5A36"> Fast.</span>';
  const capLab = el('div', 'abs', p1, { left: '1300px', width: '300px', textAlign: 'center', top: '930px', font: MONO, letterSpacing: '.12em', color: 'var(--haze)' });
  capLab.textContent = 'SOCIAL · CAPTIONED';

  /* ---------- phase 2: thirty slides ---------- */
  const g = el('div', 'abs', cam, { inset: 0, transformOrigin: '960px 610px' });
  const COLS = 6, TW = 240, TH = 135, GAP = 28;
  const GX = (1920 - (COLS * TW + (COLS - 1) * GAP)) / 2, GY = 175;
  const KEEP = [1, 4, 8, 13, 16, 20, 25, 28];
  const RW = 180, RH = 101, RG = 24, RX = (1920 - (8 * RW + 7 * RG)) / 2, RY = 590;
  const thumbs = [];
  for (let i = 0; i < 30; i++) {
    const c = i % COLS, r = Math.floor(i / COLS);
    const d = el('div', 'abs', g, { left: GX + c * (TW + GAP) + 'px', top: GY + r * (TH + GAP) + 'px', width: TW + 'px', height: TH + 'px', borderRadius: '10px', overflow: 'hidden', background: '#fff', transformOrigin: '50% 50%' });
    const im = el('img', 'abs', d, { inset: 0, width: '100%', height: '100%', objectFit: 'cover' });
    im.src = ctx.asset(`slide-${(i % 6) + 1}.png`);
    gsap.set(d, { opacity: 0, filter: 'grayscale(0) brightness(1)', boxShadow: '0 0 0 0px rgba(255,90,54,0), 0 12px 26px rgba(27,34,51,.16)' });
    thumbs.push(d);
  }
  const kept = KEEP.map((i) => thumbs[i]);
  const dropped = thumbs.filter((_, i) => !KEEP.includes(i));
  const tag = el('div', 'abs', cam, { left: 0, width: '1920px', top: '330px', textAlign: 'center', font: '900 190px/1 Inter Display, Inter', letterSpacing: '-.05em', color: 'var(--launch)', textShadow: '0 20px 60px rgba(255,90,54,.25)', opacity: 0 });
  tag.textContent = '6–10';
  const tagSub = el('div', 'abs', cam, { left: 0, width: '1920px', top: '740px', textAlign: 'center', font: MONO, fontSize: '26px', letterSpacing: '.24em', color: 'var(--haze)', opacity: 0 });
  tagSub.textContent = 'SLIDES · NOT THIRTY';

  ctx.fx.vignette({ strength: 0.18 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---------- timeline ---------- */
  // opening: headline snaps in
  tl.from(words, { y: 70, opacity: 0, duration: 0.7, ease: 'expo.out', stagger: 0.06 }, 0.1);
  tl.fromTo(underline, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'expo.out' }, Math.max(0.5, tShort - 0.1));
  tl.to(p1, { scale: 1.03, duration: tThirty - 0.5, ease: 'power1.inOut' }, 0.5);

  // "One to two minutes"
  const t1 = tOne - 0.15;
  tl.from([page, mail], { y: 40, opacity: 0, duration: 0.55, ease: 'expo.out', stagger: 0.08 }, t1);
  tl.from([pageLab, mailLab], { opacity: 0, duration: 0.4, stagger: 0.08 }, t1 + 0.2);
  tl.from(big, { y: 40, opacity: 0, duration: 0.6, ease: 'expo.out' }, t1 + 0.1);
  tl.from(track, { scaleX: 0, duration: 0.6, ease: 'expo.out' }, t1 + 0.2);
  tl.from(ticks, { opacity: 0, y: 8, duration: 0.35, stagger: 0.05 }, t1 + 0.35);
  tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 1.0, ease: 'expo.out' }, t1 + 0.45);

  // "captioned clips"
  tl.from(phone, { y: 120, opacity: 0, duration: 0.7, ease: 'expo.out' }, tCap - 0.25);
  tl.from(shot, { opacity: 0, scale: 1.1, duration: 0.5 }, tCap + 0.05);
  tl.from(caption, { y: 40, opacity: 0, duration: 0.45, ease: 'back.out(1.6)' }, tCap + 0.35);
  tl.from(capLab, { opacity: 0, duration: 0.4 }, tCap + 0.2);

  // "Thirty slides?" — decisive lateral glide, grid floods in
  tl.to(p1, { x: -1400, opacity: 0, duration: 0.6, ease: 'expo.inOut' }, tThirty - 0.3);
  tl.to([head, underline], { y: -60, opacity: 0, duration: 0.45, ease: 'expo.in' }, tThirty - 0.3);
  tl.fromTo(thumbs, { opacity: 0, scale: 0.6, x: 260 }, { opacity: 1, scale: 1, x: 0, duration: 0.55, ease: 'expo.out', stagger: 0.018, immediateRender: false }, tThirty - 0.05);

  // "Six to ten will do" — haze, collapse, tight orange row
  tl.to(dropped, { filter: 'grayscale(1) brightness(1.15)', opacity: 0.35, duration: 0.25 }, tSix - 0.15);
  tl.to(dropped, { scale: 0.2, opacity: 0, duration: 0.5, ease: 'expo.in', stagger: { each: 0.008, from: 'center' } }, tSix + 0.1);
  kept.forEach((d, k) => {
    tl.to(d, { left: RX + k * (RW + RG), top: RY, width: RW, height: RH, duration: 0.75, ease: 'expo.inOut' }, tSix + 0.15 + k * 0.025);
  });
  tl.to(kept, { boxShadow: '0 0 0 5px rgba(255,90,54,1), 0 20px 44px rgba(255,90,54,.32)', duration: 0.4, stagger: 0.04 }, tSix + 0.6);
  tl.fromTo(tag, { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'expo.out', immediateRender: false }, tSix + 0.4);
  tl.to(tagSub, { opacity: 1, duration: 0.4 }, tSix + 0.7);
  tl.to(g, { scale: 1.035, duration: Math.max(0.5, ctx.dur - (tSix + 1.0)), ease: 'power1.inOut' }, tSix + 1.0);
});
