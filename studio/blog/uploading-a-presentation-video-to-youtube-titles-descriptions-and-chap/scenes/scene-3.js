/* Scene 3 — "Make the first two lines a plain summary, since they show before the more link.
 *            Then add three to five bullets, your chapters and your links."
 * Storyboard: Paper stage. The slide's bullets become a stylised YouTube description box built from stacked rows.
 * On "first two lines" the top two rows light up amber. Everything below blurs behind a "...more" fold.
 * On "more link" the fold unrolls downward and the camera glides down the growing box.
 * On "three … bullets" three mint dots tick in. On "chapters" a timestamp block slides in.
 * On "links" three link pills pop: Website, Related videos, Sign-up. Numbered markers 1–4 rebuild the slide's list. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const first = ctx.at(0, 'first'), lines = ctx.at(0, 'lines'), more = ctx.at(0, 'more'), link = ctx.at(0, 'link');
  const three = ctx.at(1, 'three'), chapters = ctx.at(1, 'chapters'), links = ctx.at(1, 'links');
  const MONO = 'ui-monospace, Menlo, monospace';
  const CL = 460, CT = 140, CW = 1000;

  stage.style.background = 'radial-gradient(60% 55% at 50% 30%, #fffdf9 0%, var(--paper) 70%, #ebe6dd 100%)';
  const grid = el('div', 'abs', stage, { inset: 0, opacity: 0.5,
    backgroundImage: 'radial-gradient(rgba(28,31,38,.12) 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' });

  const stepTag = el('div', 'abs', stage, { left: '80px', top: '64px', font: `600 20px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--slate)' });
  stepTag.innerHTML = '<span style="color:var(--signal red, #E8392F);color:#E8392F">●</span>&nbsp; STEP 3 · DESCRIPTION';

  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 420px' });

  /* ---- the description card ---- */
  const card = el('div', 'abs', cam, { left: CL + 'px', top: CT + 'px', width: CW + 'px', height: '380px', background: '#fff', borderRadius: '28px',
    boxShadow: '0 50px 110px rgba(28,31,38,.14), 0 8px 20px rgba(28,31,38,.06)' });
  const head = el('div', 'abs', card, { left: '64px', top: '44px', font: `600 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--slate)' });
  head.textContent = 'DESCRIPTION';
  el('div', 'abs', card, { right: '64px', top: '46px', width: '180px', height: '14px', borderRadius: '7px', background: '#EEE9E1' });

  // summary rows + amber highlight
  const hl = el('div', 'abs', card, { left: '40px', top: '90px', width: '920px', height: '116px', borderRadius: '16px',
    background: 'rgba(245,166,35,.2)', borderLeft: '6px solid #F5A623', transformOrigin: '0% 50%' });
  const sum = [[108, 860], [160, 620]].map(([y, w]) => el('div', 'abs', card, { left: '70px', top: y + 'px', width: w + 'px', height: '26px', borderRadius: '13px', background: '#2A2E37', transformOrigin: '0% 50%' }));

  // teaser (collapsed) rows + "...more"
  const teaser = el('div', 'abs', card, { left: '70px', top: '232px', width: '860px', height: '80px' });
  [[0, 820], [44, 700]].forEach(([y, w]) => el('div', 'abs', teaser, { left: 0, top: y + 'px', width: w + 'px', height: '22px', borderRadius: '11px', background: '#CFC9BF' }));
  const moreTxt = el('div', 'abs', card, { left: '70px', top: '318px', font: '800 28px/1 Inter', letterSpacing: '-.01em', color: 'var(--ink)', transformOrigin: '0% 50%' });
  moreTxt.textContent = '...more';

  // body (unrolls)
  const body = el('div', 'abs', card, { left: 0, top: '220px', width: CW + 'px', height: '560px' });
  const label = (txt, y) => { const l = el('div', 'abs', body, { left: '70px', top: y + 'px', font: `600 18px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--slate)' }); l.textContent = txt; return l; };
  const labels = [label("WHAT YOU'LL LEARN", 14), label('CHAPTERS', 214), label('LINKS', 444)];
  const bullets = [600, 520, 680].map((w, i) => {
    const y = 54 + i * 48;
    const dot = el('div', 'abs', body, { left: '70px', top: y + 'px', width: '22px', height: '22px', borderRadius: '50%', background: '#3FC1A0', boxShadow: '0 0 18px rgba(63,193,160,.55)' });
    const bar = el('div', 'abs', body, { left: '112px', top: y + 2 + 'px', width: w + 'px', height: '18px', borderRadius: '9px', background: '#D9D3C9', transformOrigin: '0% 50%' });
    return { dot, bar };
  });
  const chRows = [['0:00', 360], ['1:20', 420], ['3:45', 300], ['6:10', 380]].map(([ts, w], i) => {
    const row = el('div', 'abs', body, { left: '70px', top: 252 + i * 44 + 'px', width: '700px', height: '30px' });
    const t = el('div', 'abs', row, { left: 0, top: 0, font: `700 24px/30px ${MONO}`, color: '#E8392F' }); t.textContent = ts;
    el('div', 'abs', row, { left: '100px', top: '6px', width: w + 'px', height: '18px', borderRadius: '9px', background: '#D9D3C9' });
    return row;
  });
  const pillRow = el('div', 'abs', body, { left: '70px', top: '484px', display: 'flex', gap: '18px' });
  const pills = ['Website', 'Related videos', 'Sign-up'].map((txt) => {
    const p = el('div', '', pillRow, { height: '56px', padding: '0 28px', borderRadius: '28px', border: '2px solid var(--ink)', font: '700 24px/52px Inter',
      letterSpacing: '-.01em', color: 'var(--ink)', background: '#fff', whiteSpace: 'nowrap', boxShadow: '0 10px 24px rgba(28,31,38,.1)' });
    p.innerHTML = '<span style="color:#E8392F">↗</span>&nbsp; ' + txt;
    return p;
  });
  const roll = el('div', 'abs', card, { left: '24px', top: '220px', width: '952px', height: '30px', borderRadius: '15px', opacity: 0,
    background: 'linear-gradient(180deg, #e2dcd2 0%, #ffffff 45%, #cfc8bd 100%)', boxShadow: '0 14px 26px rgba(28,31,38,.18)' });

  // side annotations
  const tag = el('div', 'abs', cam, { left: CL + CW + 30 + 'px', top: CT + 128 + 'px', padding: '12px 18px', borderRadius: '12px', background: '#F5A623',
    font: `700 18px/1 ${MONO}`, letterSpacing: '.12em', color: 'var(--night)', whiteSpace: 'nowrap', boxShadow: '0 12px 28px rgba(245,166,35,.35)' });
  tag.textContent = '← SHOWN FIRST';
  const markers = [CT + 124, CT + 220 + 54, CT + 220 + 254, CT + 220 + 490].map((y, i) => {
    const m = el('div', 'abs', cam, { left: CL - 82 + 'px', top: y + 'px', width: '48px', height: '48px', borderRadius: '50%', background: i === 0 ? '#F5A623' : 'var(--ink)',
      color: i === 0 ? 'var(--night)' : 'var(--paper)', font: '800 24px/48px Inter', textAlign: 'center' });
    m.textContent = i + 1;
    return m;
  });

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---- timeline ---- */
  gsap.set(cam, { y: 150, scale: 1.04 });
  gsap.set(hl, { scaleX: 0 });
  gsap.set(teaser, { filter: 'blur(0px)' });
  gsap.set(body, { clipPath: 'inset(0px 0px 100% 0px)' });
  gsap.set([tag, ...markers, ...labels, ...chRows, moreTxt], { opacity: 0 });
  gsap.set(bullets.map((b) => b.dot), { scale: 0 });
  gsap.set(bullets.map((b) => b.bar), { scaleX: 0 });
  gsap.set(pills, { opacity: 0, scale: 0.6 });

  tl.from(card, { y: 70, opacity: 0, duration: 0.7 }, 0.02);
  tl.from(stepTag, { opacity: 0, x: -20, duration: 0.5 }, 0.15);
  tl.from(sum, { scaleX: 0, duration: 0.6, stagger: 0.08 }, 0.3);
  tl.from(teaser, { opacity: 0, duration: 0.5 }, 0.45);
  tl.to(cam, { y: 120, duration: Math.max(0.5, first - 0.2), ease: 'power1.inOut' }, 0);

  // "first two lines": amber highlight, fold blurs
  tl.to(cam, { y: 190, scale: 1.1, duration: 1.1, ease: 'expo.inOut' }, first - 0.2);
  tl.to(hl, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, first);
  tl.fromTo(markers[0], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, first + 0.1);
  tl.to(teaser, { filter: 'blur(6px)', opacity: 0.55, duration: 0.6 }, lines);
  tl.fromTo(moreTxt, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, lines + 0.1);
  tl.fromTo(tag, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.6)', immediateRender: false }, lines + 0.3);

  // "more link": pulse, then the fold unrolls
  tl.to(moreTxt, { scale: 1.18, color: '#E8392F', duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }, more - 0.05);
  const U = Math.max(more + 0.25, link - 0.1), UD = 0.95;
  tl.to([teaser, moreTxt], { opacity: 0, y: 30, duration: 0.35, ease: 'power2.in' }, U);
  tl.to(card, { height: 810, duration: UD, ease: 'power2.inOut' }, U);
  tl.to(body, { clipPath: 'inset(0px 0px 0% 0px)', duration: UD, ease: 'power2.inOut' }, U);
  tl.set(roll, { opacity: 1 }, U);
  tl.to(roll, { top: 790, duration: UD, ease: 'power2.inOut' }, U);
  tl.to(roll, { opacity: 0, duration: 0.3 }, U + UD - 0.1);
  tl.to(cam, { y: 0, scale: 1, duration: 1.2, ease: 'expo.inOut' }, U - 0.1);
  tl.to(labels, { opacity: 1, duration: 0.4, stagger: 0.12 }, U + 0.4);
  tl.to(cam, { y: -20, scale: 1.02, duration: Math.max(1, ctx.dur - (U + 1.1)), ease: 'power1.inOut' }, U + 1.1);

  // "three to five bullets"
  bullets.forEach((b, i) => {
    tl.to(b.dot, { scale: 1, duration: 0.45, ease: 'back.out(2.4)' }, three + i * 0.14);
    tl.to(b.bar, { scaleX: 1, duration: 0.5 }, three + 0.06 + i * 0.14);
  });
  tl.fromTo(markers[1], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)', immediateRender: false }, three);

  // "chapters"
  tl.fromTo(chRows, { opacity: 0, x: 70 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, immediateRender: false }, chapters - 0.1);
  tl.fromTo(markers[2], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)', immediateRender: false }, chapters - 0.05);

  // "links"
  tl.to(pills, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.9)', stagger: 0.1 }, links - 0.05);
  tl.fromTo(markers[3], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)', immediateRender: false }, links);
  tl.to(hl, { background: 'rgba(245,166,35,.3)', duration: 0.5, yoyo: true, repeat: 1 }, links + 0.6);
});
