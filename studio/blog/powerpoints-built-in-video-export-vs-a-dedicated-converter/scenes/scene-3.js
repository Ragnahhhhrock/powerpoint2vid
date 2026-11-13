/* Scene 3 — "Take one headline about new starters' laptops. Record it yourself, and every change means a new take.
 * Type it into the notes, and a change is one quick edit."
 * Storyboard: paper stage, wide split-screen. The quote "New starters get their laptop on day one" lands top-centre.
 * Left amber half (built-in, your voice): on "every change means a new take" a clapperboard snaps three times and
 * the take counter ticks 1, 2, 3. Right blue half (converter, your notes): the line is typed into the notes; on
 * "one quick edit" the caret swaps one word and a single export arrow fires into a finished video. The camera
 * holds wide so both halves read at once. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w) => ctx.at(i, w);
  const tHeadline = W(0, 'headline'), tLaptops = W(0, 'laptops.');
  const tRecord = W(1, 'Record'), s1 = W(1, 'change'), s2 = W(1, 'means'), s3 = W(1, 'take.');
  const tType = W(2, 'Type'), tChange = W(2, 'change'), tIs = W(2, 'is'), tQuick = W(2, 'quick'), tEdit = W(2, 'edit.');
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 50% 40%, #fffdf8 0%, var(--paper) 60%, #e9e4d8 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  /* ---- quote ---- */
  const quote = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '90px', textAlign: 'center',
    font: '800 68px/1.1 "Inter Display", Inter, sans-serif', letterSpacing: '-.035em', color: 'var(--ink)' });
  const qWords = ctx.split(quote, '“New starters get their laptop on day one”', 'word');
  const under = el('div', 'abs', cam, { left: '0px', top: '176px', height: '8px', width: '10px', borderRadius: '4px',
    background: 'linear-gradient(90deg, var(--warm), var(--cool))', transformOrigin: '0% 50%' });

  /* ---- halves ---- */
  const mkHalf = (x, tint, edge) => el('div', 'abs', cam, { left: x + 'px', top: '240px', width: '860px', height: '770px', borderRadius: '28px',
    background: `linear-gradient(180deg, ${tint} 0%, rgba(255,255,255,.35) 100%)`, border: `2px solid ${edge}`,
    boxShadow: '0 30px 70px rgba(15,20,36,.10)' });
  const left = mkHalf(80, 'rgba(242,163,58,.16)', 'rgba(242,163,58,.35)');
  const right = mkHalf(980, 'rgba(63,167,214,.15)', 'rgba(63,167,214,.35)');
  const mkLabel = (x, txt, col) => { const d = el('div', 'abs', cam, { left: x + 'px', top: '280px', width: '780px', font: `700 22px/1 ${MONO}`, letterSpacing: '.14em', color: col }); d.textContent = txt; return d; };
  const lLab = mkLabel(120, 'BUILT-IN EXPORT · YOUR VOICE', '#c97a12');
  const rLab = mkLabel(1020, 'CONVERTER · YOUR NOTES', '#1f7fae');
  const leftGrp = [left, lLab], rightGrp = [right, rLab];

  /* ---- LEFT: clapperboard ---- */
  const L = el('div', 'abs', cam, { left: '80px', top: '240px', width: '860px', height: '770px' });
  const ring = el('div', 'abs', L, { left: '310px', top: '200px', width: '240px', height: '240px', borderRadius: '50%', border: '6px solid var(--warm)', opacity: 0 });
  const board = el('div', 'abs', L, { left: '230px', top: '190px', width: '400px', height: '300px' });
  const body = el('div', 'abs', board, { left: 0, top: '60px', width: '400px', height: '240px', borderRadius: '14px', background: 'var(--ink)',
    boxShadow: '0 30px 60px rgba(15,20,36,.35)' });
  const baseStripe = el('div', 'abs', board, { left: 0, top: '60px', width: '400px', height: '46px', borderRadius: '14px 14px 0 0',
    background: 'repeating-linear-gradient(-45deg, #1B2238 0 30px, #F6F3EC 30px 60px)' });
  const stick = el('div', 'abs', board, { left: 0, top: '8px', width: '400px', height: '46px', borderRadius: '8px',
    background: 'repeating-linear-gradient(45deg, #1B2238 0 30px, #F2A33A 30px 60px)', transformOrigin: '0% 100%', boxShadow: '0 6px 14px rgba(0,0,0,.25)' });
  const scn = el('div', 'abs', body, { left: '28px', top: '66px', font: `700 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--mist)' }); scn.textContent = 'SCENE 04';
  const takeL = el('div', 'abs', body, { left: '28px', top: '120px', font: `700 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--mist)' }); takeL.textContent = 'TAKE';
  const takeN = el('div', 'abs', body, { left: '150px', top: '100px', width: '220px', textAlign: 'right', font: '900 120px/1 "Inter Display", Inter', letterSpacing: '-.04em', color: 'var(--warm)', fontVariantNumeric: 'tabular-nums' });
  const rec = el('div', 'abs', body, { right: '24px', top: '66px', font: `700 20px/1 ${MONO}`, letterSpacing: '.12em', color: 'var(--coral)', display: 'flex', alignItems: 'center', gap: '8px' });
  rec.innerHTML = '<span style="width:14px;height:14px;border-radius:50%;background:#E8604C;display:inline-block;box-shadow:0 0 12px #E8604C"></span>REC';
  const pills = [1, 2, 3].map((n, i) => {
    const p = el('div', 'abs', L, { left: 215 + i * 150 + 'px', top: '560px', width: '130px', height: '56px', borderRadius: '28px', textAlign: 'center',
      font: `700 22px/56px ${MONO}`, letterSpacing: '.1em', color: '#fff', background: i === 2 ? 'var(--coral)' : 'var(--warm)', boxShadow: '0 12px 26px rgba(242,163,58,.35)' });
    p.textContent = 'TAKE ' + n; return p;
  });

  /* ---- RIGHT: notes + export ---- */
  const R = el('div', 'abs', cam, { left: '980px', top: '240px', width: '860px', height: '770px' });
  const notes = el('div', 'abs', R, { left: '60px', top: '110px', width: '740px', height: '250px', borderRadius: '18px', background: '#fff',
    boxShadow: '0 30px 60px rgba(15,20,36,.14)', border: '1px solid rgba(15,20,36,.08)', overflow: 'hidden' });
  const nh = el('div', 'abs', notes, { left: 0, top: 0, right: 0, height: '54px', background: 'rgba(63,167,214,.12)', borderBottom: '1px solid rgba(63,167,214,.25)' });
  const nl = el('div', 'abs', nh, { left: '28px', top: '17px', font: `700 20px/1 ${MONO}`, letterSpacing: '.14em', color: '#1f7fae' }); nl.textContent = 'SPEAKER NOTES';
  const nt = el('div', 'abs', notes, { left: '32px', top: '84px', width: '676px', font: '600 42px/1.35 Inter, sans-serif', letterSpacing: '-.015em', color: 'var(--ink)' });
  const arrow = el('div', 'abs', R, { left: 0, top: 0, width: '860px', height: '770px' });
  arrow.innerHTML = `<svg width="860" height="770"><path id="ap" d="M430 378 L430 520" fill="none" stroke="#3FA7D6" stroke-width="6" stroke-linecap="round" stroke-dasharray="142" stroke-dashoffset="142"/>
    <path id="ah" d="M410 504 L430 526 L450 504" fill="none" stroke="#3FA7D6" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0"/></svg>`;
  const ap = arrow.querySelector('#ap'), ah = arrow.querySelector('#ah');
  const dot = el('div', 'abs', R, { left: '416px', top: '364px', width: '28px', height: '28px', borderRadius: '50%', background: '#fff',
    boxShadow: '0 0 0 6px rgba(63,167,214,.6), 0 0 30px #3FA7D6', opacity: 0 });
  const pill = el('div', 'abs', R, { left: '220px', top: '548px', width: '420px', height: '84px', borderRadius: '42px', background: 'var(--cool)',
    boxShadow: '0 20px 50px rgba(63,167,214,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
    font: `700 24px/1 ${MONO}`, letterSpacing: '.12em', color: '#fff' });
  pill.innerHTML = '<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="14" fill="#fff"/><path d="M8 15.5 L13 20 L22 10" fill="none" stroke="#3FA7D6" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>VIDEO EXPORTED';
  const oneEdit = el('div', 'abs', R, { left: '220px', top: '652px', width: '420px', textAlign: 'center', font: `700 20px/1 ${MONO}`, letterSpacing: '.14em', color: '#1f7fae' });
  oneEdit.textContent = '1 EDIT · 1 EXPORT';

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05, blend: 'multiply' });

  /* ---- per-frame text ---- */
  const FULL = 'New starters get their laptop on day one.';
  const st = { n: 0, sel: 0, rep: 0 };
  const caret = (o) => `<span style="display:inline-block;width:4px;height:1em;margin-left:2px;background:#3FA7D6;vertical-align:-0.12em;opacity:${o}"></span>`;
  ctx.onFrame((t) => {
    takeN.textContent = t < s1 ? '–' : t < s2 ? '1' : t < s3 ? '2' : '3';
    const blink = Math.floor(t * 2.2) % 2 === 0 ? 1 : 0;
    const n = Math.floor(st.n);
    if (n < FULL.length) {
      nt.innerHTML = FULL.slice(0, n) + (t > tType - 0.3 ? caret(st.n > 0.5 && st.n < FULL.length ? 1 : blink) : '');
    } else {
      let word;
      if (st.rep > 0) word = `<span style="color:#1f7fae">${'receive'.slice(0, Math.ceil(st.rep))}</span>` + caret(st.rep < 7 ? 1 : blink);
      else word = `<span style="background:rgba(63,167,214,${0.32 * st.sel});border-radius:6px;padding:0 2px">get</span>` + (st.sel > 0 ? caret(1) : '');
      nt.innerHTML = 'New starters ' + word + ' their laptop on day one.' + (st.sel === 0 && st.rep === 0 ? caret(blink) : '');
    }
  });

  /* ---- timeline ---- */
  tl.to(cam, { scale: 1.02, duration: ctx.dur, ease: 'none' }, 0);
  tl.from([left, right], { y: 40, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.05);
  tl.from([lLab, rLab], { opacity: 0, x: -16, duration: 0.6, stagger: 0.08 }, 0.25);
  tl.from(board, { y: 30, opacity: 0, duration: 0.8 }, 0.3);
  tl.from(notes, { y: 30, opacity: 0, duration: 0.8 }, 0.38);
  gsap.set(stick, { rotation: -24 });
  gsap.set([rec, dot, pill, oneEdit, ...pills], { opacity: 0 });

  // quote lands on "headline"
  tl.from(qWords, { y: 40, opacity: 0, duration: 0.6, stagger: 0.07, ease: 'back.out(1.6)' }, tHeadline - 0.45);
  // underline "laptop" on "laptops"
  const lw = qWords[4];
  tl.call(() => {}, null, 0);
  ctx.onFrame(() => { gsap.set(under, { left: lw.offsetLeft + 80 + 'px', width: lw.offsetWidth + 'px' }); });
  gsap.set(under, { scaleX: 0 });
  tl.to(under, { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }, tLaptops - 0.1);

  // beat 1: focus left
  tl.to(rightGrp.concat([R]), { opacity: 0.45, duration: 0.6 }, tRecord - 0.2);
  tl.to(rec, { opacity: 1, duration: 0.3 }, tRecord);
  tl.to(rec, { opacity: 0.35, duration: 0.3, yoyo: true, repeat: 5, ease: 'sine.inOut' }, tRecord + 0.4);
  [s1, s2, s3].forEach((s, i) => {
    tl.to(stick, { rotation: -24, duration: 0.16, ease: 'power2.out' }, s - 0.3);
    tl.to(stick, { rotation: 0, duration: 0.1, ease: 'power4.in' }, s - 0.1);
    tl.to(board, { y: 6, duration: 0.06, yoyo: true, repeat: 1 }, s);
    tl.fromTo(ring, { scale: 0.6, opacity: 0.9 }, { scale: 2, opacity: 0, duration: 0.7, ease: 'power2.out', immediateRender: false }, s);
    tl.fromTo(takeN, { scale: 1.35 }, { scale: 1, duration: 0.4, ease: 'back.out(2)', immediateRender: false }, s);
    tl.fromTo(pills[i], { opacity: 0, scale: 0.4, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, s);
  });

  // beat 2: focus right
  tl.to(rightGrp.concat([R]), { opacity: 1, duration: 0.6 }, tType - 0.4);
  tl.to(leftGrp.concat([L]), { opacity: 0.5, duration: 0.6 }, tType - 0.4);
  tl.to(rec, { opacity: 0, duration: 0.3 }, tType - 0.4);
  tl.to(st, { n: FULL.length, duration: Math.max(0.6, tChange - tType - 0.25), ease: 'none' }, tType);
  tl.to(st, { sel: 1, duration: 0.25, ease: 'power2.out' }, tChange);
  tl.to(notes, { scale: 1.03, duration: 0.5, ease: 'back.out(1.6)' }, tChange);
  tl.to(st, { rep: 7, duration: Math.max(0.35, tQuick - tIs + 0.15), ease: 'none' }, tIs);
  tl.to(notes, { scale: 1, duration: 0.5 }, tQuick + 0.1);
  // single export fires on "edit"
  tl.to(ap, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.in' }, tEdit - 0.3);
  tl.to(ah, { opacity: 1, duration: 0.1 }, tEdit);
  tl.fromTo(dot, { opacity: 1, y: 0 }, { y: 150, duration: 0.35, ease: 'power2.in', immediateRender: false }, tEdit - 0.3);
  tl.to(dot, { opacity: 0, duration: 0.15 }, tEdit + 0.05);
  tl.fromTo(pill, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.8)', immediateRender: false }, tEdit);
  tl.to(oneEdit, { opacity: 1, duration: 0.4 }, tEdit + 0.25);
  // hold wide: both halves read at once
  tl.to(leftGrp.concat([L]), { opacity: 1, duration: 0.6 }, tEdit + 0.2);
  tl.to(pill, { boxShadow: '0 20px 80px rgba(63,167,214,.85)', duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tEdit + 0.6);
});
