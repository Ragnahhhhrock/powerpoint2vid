/* Scene 5 — "When a policy changes, just edit the slide and convert again. On Pro, a.i. directs each
 * video so it lands like a produced welcome. Try Basic first at powerpoint2vid.com."
 * Storyboard: paper stage with a rebuilt slide card and its MP4 tile. On "edit the slide" a cursor
 * selects one line and rewrites it (bar turns coral). On "convert again" an arrow fires, the old MP4
 * drops away and a fresh teal tile swaps in, plus a "Review every six months" calendar tag.
 * On "Pro" the stage warms to night: a sun-yellow spotlight on a polished video frame, a directed
 * timeline lights clip by clip and "Welcome aboard" lands on "welcome". On "Try" a teal circle opens
 * and settles on "powerpoint2vid.com" at 130px, holding to the end. */
P2V.scene((ctx) => {
  const { tl, el, stage, dur } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return (v == null || isNaN(v)) ? f : v; };
  const edit = A(0, 'edit', 2.22), slideW = A(0, 'slide', 2.6), convert = A(0, 'convert', 3.21), again = A(0, 'again', 3.62);
  const pro = A(1, 'Pro,', 4.75), ai = A(1, 'A.I.', 5.33), directs = A(1, 'directs', 5.79), lands = A(1, 'lands', 7.35), welcome = A(1, 'welcome.', 8.32);
  const tryT = A(2, 'Try', 9.36), basic = A(2, 'Basic', 9.71), pp = A(2, 'PowerPoint', 10.7);
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 40% 40%, #fffdf8 0%, var(--paper) 60%, #ece6da 100%)';

  /* ---------- PAPER LAYER ---------- */
  const paper = el('div', 'abs', stage, { inset: 0 });
  const cam = el('div', 'abs', paper, { inset: 0, transformOrigin: '760px 470px' });

  const head = el('div', 'abs', cam, { left: '200px', top: '110px', font: '800 64px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  head.textContent = 'Update the slide, not the recording';
  const headTag = el('div', 'abs', cam, { left: '204px', top: '190px', font: MONO, letterSpacing: '.14em', color: 'var(--slate)' });
  headTag.textContent = 'WHEN A POLICY CHANGES';

  // slide card
  const card = el('div', 'abs', cam, { left: '200px', top: '270px', width: '760px', height: '428px', borderRadius: '18px', background: '#fff',
    boxShadow: '0 40px 90px rgba(27,34,51,.16), 0 4px 14px rgba(27,34,51,.08)' });
  el('div', 'abs', card, { left: '48px', top: '48px', width: '420px', height: '30px', borderRadius: '8px', background: 'var(--ink)' });
  const lineW = [560, 470, 600, 380];
  const lines = lineW.map((w, i) => el('div', 'abs', card, { left: '48px', top: 130 + i * 62 + 'px', width: w + 'px', height: '20px', borderRadius: '6px', background: '#d9dce4' }));
  const target = lines[2];
  const sel = el('div', 'abs', card, { left: '40px', top: 130 + 2 * 62 - 10 + 'px', width: '616px', height: '40px', borderRadius: '8px', background: 'rgba(255,107,91,.16)', transformOrigin: '0% 50%' });
  const newLine = el('div', 'abs', card, { left: '48px', top: 130 + 2 * 62 + 'px', width: '540px', height: '20px', borderRadius: '6px', background: 'var(--coral)', transformOrigin: '0% 50%', boxShadow: '0 0 20px rgba(255,107,91,.45)' });
  const edited = el('div', 'abs', card, { left: '610px', top: 130 + 2 * 62 - 6 + 'px', padding: '6px 12px', borderRadius: '8px', background: 'var(--coral)', color: '#fff', font: '700 16px/1 ui-monospace, Menlo, monospace', letterSpacing: '.1em' });
  edited.textContent = 'EDITED';
  const cardTag = el('div', 'abs', cam, { left: '200px', top: '722px', font: MONO, letterSpacing: '.14em', color: 'var(--slate)' });
  cardTag.textContent = 'SLIDE + NOTES';

  // cursor
  const cursor = el('div', 'abs', cam, { left: 0, top: 0, width: '44px', height: '56px', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,.25))' });
  cursor.innerHTML = '<svg width="44" height="56" viewBox="0 0 44 56"><path d="M4 3 L4 46 L15 35 L23 53 L31 49 L23 32 L39 32 Z" fill="#1B2233" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></svg>';
  const ripple = el('div', 'abs', cam, { left: '228px', top: '434px', width: '60px', height: '60px', borderRadius: '50%', border: '4px solid var(--coral)', opacity: 0 });

  // convert arrow
  const arrow = el('div', 'abs', cam, { left: '985px', top: '440px', width: '160px', height: '60px' });
  arrow.innerHTML = '<svg width="160" height="60"><path d="M6 30 H140" stroke="#1FB5A8" stroke-width="7" stroke-linecap="round"/><path d="M118 10 L146 30 L118 50" fill="none" stroke="#1FB5A8" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  gsap.set(arrow, { clipPath: 'inset(0px 160px 0px 0px)' });

  // MP4 tiles
  const mkTile = (bg, badge, badgeBg) => {
    const t = el('div', 'abs', cam, { left: '1170px', top: '300px', width: '560px', height: '315px', borderRadius: '18px', overflow: 'hidden', background: bg,
      boxShadow: '0 40px 90px rgba(27,34,51,.22)', transformOrigin: '50% 50%' });
    const play = el('div', 'abs', t, { left: '235px', top: '112px', width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,.92)' });
    play.innerHTML = '<svg width="90" height="90"><path d="M37 28 L64 45 L37 62 Z" fill="#1B2233"/></svg>';
    const nm = el('div', 'abs', t, { left: '28px', bottom: '26px', font: '700 26px/1 Inter', color: '#fff', letterSpacing: '-.01em' }); nm.textContent = 'onboarding.mp4';
    const b = el('div', 'abs', t, { right: '24px', top: '24px', padding: '8px 14px', borderRadius: '8px', background: badgeBg, font: '700 16px/1 ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: '#fff' }); b.textContent = badge;
    return t;
  };
  const oldTile = mkTile('linear-gradient(135deg, #a3aab9, #6e7688)', 'OLD', 'rgba(27,34,51,.55)');
  const newTile = mkTile('linear-gradient(135deg, #3fd1c3, #1FB5A8 55%, #148a80)', 'NEW', 'var(--coral)');

  // calendar tag
  const cal = el('div', 'abs', cam, { left: '1170px', top: '650px', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px 16px 18px', borderRadius: '14px',
    background: '#fff', boxShadow: '0 20px 50px rgba(27,34,51,.14)', transformOrigin: '0% 50%' });
  const icon = el('div', '', cal, { width: '44px', height: '44px', borderRadius: '8px', overflow: 'hidden', border: '3px solid var(--ink)', position: 'relative' });
  el('div', 'abs', icon, { left: 0, top: 0, right: 0, height: '12px', background: 'var(--coral)' });
  const six = el('div', 'abs', icon, { left: 0, right: 0, top: '13px', textAlign: 'center', font: '800 22px/1 Inter', color: 'var(--ink)' }); six.textContent = '6';
  const calT = el('div', '', cal, { font: '700 26px/1 Inter', color: 'var(--ink)', letterSpacing: '-.01em' }); calT.textContent = 'Review every six months';

  /* ---------- NIGHT LAYER ---------- */
  const night = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(80% 70% at 50% 45%, #1d2742 0%, var(--night) 70%)', opacity: 0 });
  const ncam = el('div', 'abs', night, { inset: 0, transformOrigin: '960px 500px' });
  const spot = el('div', 'abs', ncam, { left: '260px', top: '-200px', width: '1400px', height: '1300px', background: 'radial-gradient(45% 50% at 50% 50%, rgba(255,197,71,.42), rgba(255,197,71,.1) 55%, transparent 75%)', mixBlendMode: 'screen' });
  const proTag = el('div', 'abs', ncam, { left: '410px', top: '140px', font: MONO, letterSpacing: '.16em', color: 'var(--sun)' }); proTag.textContent = 'PRO · AI-DIRECTED';
  const frame = el('div', 'abs', ncam, { left: '410px', top: '185px', width: '1100px', height: '619px', borderRadius: '22px', overflow: 'hidden',
    background: 'linear-gradient(135deg, #2a3557 0%, #1B2233 60%)', boxShadow: '0 0 0 2px rgba(255,197,71,.5), 0 50px 120px rgba(0,0,0,.6), 0 0 120px rgba(255,197,71,.25)' });
  const glowA = el('div', 'abs', frame, { left: '-200px', top: '-200px', width: '900px', height: '900px', background: 'radial-gradient(circle, rgba(255,107,91,.45), transparent 65%)' });
  const glowB = el('div', 'abs', frame, { left: '500px', top: '100px', width: '900px', height: '900px', background: 'radial-gradient(circle, rgba(31,181,168,.4), transparent 65%)' });
  const wel = el('div', 'abs', frame, { left: 0, right: 0, top: '230px', textAlign: 'center', font: '900 110px/1 Inter Display, Inter', letterSpacing: '-.05em', color: '#fff' });
  const welWords = ctx.split(wel, 'Welcome aboard', 'word');
  const brackets = ['0 0', '1 0', '0 1', '1 1'].map((p) => {
    const [px, py] = p.split(' ').map(Number);
    const b = el('div', 'abs', frame, { width: '60px', height: '60px', left: px ? 'auto' : '30px', right: px ? '30px' : 'auto', top: py ? 'auto' : '30px', bottom: py ? '30px' : 'auto',
      borderLeft: px ? 'none' : '4px solid var(--sun)', borderRight: px ? '4px solid var(--sun)' : 'none', borderTop: py ? 'none' : '4px solid var(--sun)', borderBottom: py ? '4px solid var(--sun)' : 'none' });
    return b;
  });
  const recDot = el('div', 'abs', frame, { left: '110px', top: '44px', display: 'flex', alignItems: 'center', gap: '10px', font: MONO, letterSpacing: '.14em', color: '#fff' });
  el('div', '', recDot, { width: '14px', height: '14px', borderRadius: '50%', background: 'var(--coral)' });
  el('span', '', recDot).textContent = 'SCENE 1';
  const clipsW = [150, 210, 120, 240, 170, 130];
  let cx = 410;
  const clips = clipsW.map((w) => { const c = el('div', 'abs', ncam, { left: cx + 'px', top: '850px', width: w - 10 + 'px', height: '46px', borderRadius: '8px', background: 'rgba(255,255,255,.1)' }); cx += w; return c; });
  const playhead = el('div', 'abs', ncam, { left: '410px', top: '836px', width: '4px', height: '74px', borderRadius: '2px', background: 'var(--sun)', boxShadow: '0 0 16px var(--sun)' });

  /* ---------- TEAL LAYER ---------- */
  const teal = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(75% 70% at 50% 45%, #2cc9bb 0%, var(--teal) 55%, #12867c 100%)' });
  gsap.set(teal, { clipPath: 'circle(0% at 50% 50%)' });
  const tcam = el('div', 'abs', teal, { inset: 0, transformOrigin: '960px 540px' });
  const tTry = el('div', 'abs', tcam, { left: 0, right: 0, top: '340px', textAlign: 'center', font: '800 64px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--night)' });
  const tryWords = ctx.split(tTry, 'Try Basic first', 'word');
  const url = el('div', 'abs', tcam, { left: '80px', right: '80px', top: '450px', textAlign: 'center', font: '900 130px/1 Inter Display, Inter', letterSpacing: '-.045em', color: '#fff', textShadow: '0 20px 60px rgba(15,22,38,.3)' });
  url.textContent = 'powerpoint2vid.com';
  const under = el('div', 'abs', tcam, { left: '560px', width: '800px', top: '620px', height: '8px', borderRadius: '4px', background: 'var(--sun)', transformOrigin: '0% 50%' });
  const tLab = el('div', 'abs', tcam, { left: 0, right: 0, top: '680px', textAlign: 'center', font: MONO, letterSpacing: '.2em', color: 'rgba(15,22,38,.7)' });
  tLab.textContent = 'START FREE · UPGRADE TO PRO ANYTIME';

  ctx.fx.vignette({ strength: 0.35 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---------- TIMELINE ---------- */
  // opening (something on screen immediately)
  tl.from(head, { y: 30, opacity: 0, duration: 0.6 }, 0.05);
  tl.from(headTag, { opacity: 0, duration: 0.5 }, 0.25);
  tl.from(card, { y: 60, opacity: 0, duration: 0.7, ease: 'back.out(1.4)' }, 0.15);
  tl.from(cardTag, { opacity: 0, duration: 0.5 }, 0.5);
  tl.from(oldTile, { y: 60, opacity: 0, duration: 0.7, ease: 'back.out(1.4)' }, 0.35);
  tl.fromTo(cam, { scale: 1 }, { scale: 1.03, duration: pro, ease: 'none' }, 0);

  gsap.set([sel, newLine], { scaleX: 0 });
  gsap.set([edited, newTile, cal], { opacity: 0 });
  gsap.set(cursor, { x: 900, y: 860 });
  // cursor arrives & edits
  tl.to(cursor, { x: 252, y: 448, duration: 0.9, ease: 'power3.inOut' }, edit - 0.85);
  tl.to(cursor, { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1 }, edit);
  tl.fromTo(ripple, { scale: 0.3, opacity: 1 }, { scale: 1.6, opacity: 0, duration: 0.5, ease: 'power2.out', immediateRender: false }, edit);
  tl.to(sel, { scaleX: 1, duration: 0.35, ease: 'power2.out' }, edit + 0.05);
  tl.to(cursor, { x: 690, duration: 0.35, ease: 'power2.out' }, edit + 0.05);
  tl.to(target, { opacity: 0, duration: 0.15 }, slideW - 0.1);
  tl.to(newLine, { scaleX: 1, duration: 0.4, ease: 'power2.out' }, slideW - 0.05);
  tl.to(sel, { opacity: 0, duration: 0.3 }, slideW + 0.3);
  tl.fromTo(edited, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)', immediateRender: false }, slideW + 0.1);
  tl.to(cursor, { x: 960, y: 900, opacity: 0, duration: 0.5, ease: 'power2.in' }, convert - 0.3);

  // convert again: arrow, swap
  tl.to(arrow, { clipPath: 'inset(0px 0px 0px 0px)', duration: 0.4, ease: 'power2.out' }, convert);
  tl.to(oldTile, { y: 120, rotation: 4, opacity: 0, scale: 0.9, duration: 0.5, ease: 'power2.in' }, again - 0.2);
  tl.fromTo(newTile, { y: -140, opacity: 0, scale: 1.08 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.6)', immediateRender: false }, again);
  tl.fromTo(cal, { x: -20, opacity: 0, scale: 0.8 }, { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, again + 0.35);

  // Pro: warm to night
  gsap.set(paper, { filter: 'blur(0px)' });
  tl.to(paper, { filter: 'blur(8px)', scale: 0.96, duration: 0.7, ease: 'power2.inOut' }, pro - 0.3);
  tl.to(night, { opacity: 1, duration: 0.6, ease: 'power2.inOut' }, pro - 0.2);
  gsap.set([frame, proTag, spot, ...clips, playhead, ...brackets, recDot, ...welWords], { opacity: 0 });
  tl.fromTo(spot, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out', immediateRender: false }, pro);
  tl.fromTo(frame, { opacity: 0, y: 50, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.4)', immediateRender: false }, pro + 0.05);
  tl.to(proTag, { opacity: 1, duration: 0.4 }, ai - 0.1);
  tl.to(clips, { opacity: 1, duration: 0.3, stagger: 0.04 }, ai);
  tl.to(playhead, { opacity: 1, duration: 0.2 }, directs - 0.1);
  tl.to(playhead, { left: cx + 'px', duration: lands - directs + 0.9, ease: 'none' }, directs);
  clips.forEach((c, i) => tl.to(c, { background: i % 2 ? 'var(--coral)' : 'var(--sun)', duration: 0.2 }, directs + i * ((lands - directs + 0.9) / clips.length)));
  tl.fromTo(brackets, { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)', stagger: 0.06, immediateRender: false }, directs);
  tl.to(recDot, { opacity: 1, duration: 0.3 }, directs + 0.2);
  tl.to(glowA, { x: 220, y: 80, duration: 4, ease: 'sine.inOut' }, pro);
  tl.to(glowB, { x: -200, y: -60, duration: 4, ease: 'sine.inOut' }, pro);
  tl.fromTo(ncam, { scale: 1 }, { scale: 1.06, duration: tryT - pro, ease: 'power1.inOut' }, pro);
  tl.fromTo(welWords, { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.7)', stagger: 0.1, immediateRender: false }, welcome - 0.2);
  tl.to(frame, { boxShadow: '0 0 0 2px rgba(255,197,71,.8), 0 50px 120px rgba(0,0,0,.6), 0 0 180px rgba(255,197,71,.45)', duration: 0.5 }, welcome);

  // Try Basic: teal circle opens
  tl.to(teal, { clipPath: 'circle(150% at 50% 50%)', duration: 0.9, ease: 'expo.inOut' }, tryT - 0.35);
  gsap.set([...tryWords, url, tLab], { opacity: 0 });
  gsap.set(under, { scaleX: 0 });
  tl.fromTo(tryWords, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)', stagger: 0.12, immediateRender: false }, tryT + 0.1);
  tl.to(tryWords[1], { color: '#fff', duration: 0.3 }, basic);
  tl.fromTo(url, { opacity: 0, scale: 0.85, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)', immediateRender: false }, pp - 0.25);
  tl.to(under, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, pp + 0.3);
  tl.to(tLab, { opacity: 1, duration: 0.5 }, pp + 0.6);
  tl.fromTo(tcam, { scale: 1 }, { scale: 1.035, duration: Math.max(0.5, dur - tryT), ease: 'power1.out' }, tryT);
});
