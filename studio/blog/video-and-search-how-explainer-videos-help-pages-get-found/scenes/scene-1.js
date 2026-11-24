/* Scene 2 — "Search engines want pages that answer the question. A clear explainer helps, and it can show up
 * in video results and on YouTube. But it never guarantees a ranking boost."
 * Storyboard: paper stage, wide results page. A search bar types a question with a blinking cursor; on
 * "answer the question" the page card slides up and a check mark draws. On "video results" a video tile pops
 * into a results carousel; on "YouTube" a play-button tile joins it. On "never guarantees" a ranking arrow
 * tries to climb, stalls and slips back, and a coral tag lands: "No guaranteed boost". */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const answer = ctx.at(0, 'answer');
  const video = ctx.at(1, 'video'), yt = ctx.at(1, 'YouTube');
  const never = ctx.at(2, 'never'), guar = ctx.at(2, 'guarantees');
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 40% 30%, #fffdf8 0%, var(--paper) 60%, #e9e4d8 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 45%' });

  /* search bar */
  const bar = el('div', 'abs', cam, { left: '160px', top: '110px', width: '1600px', height: '100px', borderRadius: '50px', background: '#fff',
    boxShadow: '0 20px 60px rgba(27,34,56,.12), 0 0 0 2px rgba(27,34,56,.06)' });
  const mag = el('div', 'abs', bar, { left: '40px', top: '30px', width: '40px', height: '40px' });
  mag.innerHTML = '<svg width="40" height="40" viewBox="0 0 40 40"><circle cx="17" cy="17" r="11" fill="none" stroke="#3D7BFF" stroke-width="4"/><path d="M25 25 L35 35" stroke="#3D7BFF" stroke-width="4" stroke-linecap="round"/></svg>';
  const QUERY = 'what does a good explainer page need?';
  const qWrap = el('div', 'abs', bar, { left: '110px', top: '27px', height: '50px', display: 'flex', alignItems: 'center' });
  const qText = el('span', '', qWrap, { font: '600 42px/1 Inter Display, Inter', letterSpacing: '-.02em', color: 'var(--ink)', whiteSpace: 'pre' });
  const caret = el('span', '', qWrap, { display: 'inline-block', width: '4px', height: '46px', marginLeft: '4px', background: 'var(--signal)', borderRadius: '2px' });
  const typed = { n: 0 };

  /* the answering page card */
  const card = el('div', 'abs', cam, { left: '160px', top: '270px', width: '1000px', height: '300px', borderRadius: '24px', background: '#fff',
    boxShadow: '0 40px 90px rgba(27,34,56,.16), 0 0 0 2px rgba(61,123,255,.18)' });
  const url = el('div', 'abs', card, { left: '48px', top: '44px', font: MONO, letterSpacing: '.08em', color: 'var(--mist)' });
  url.textContent = 'YOURSITE.COM › EXPLAINER';
  const ttl = el('div', 'abs', card, { left: '48px', top: '84px', font: '800 52px/1.1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--signal)' });
  ttl.textContent = 'Answers the question';
  [[170, 720], [210, 640], [250, 520]].forEach(([y, w]) => el('div', 'abs', card, { left: '48px', top: y + 'px', width: w + 'px', height: '16px', borderRadius: '8px', background: 'rgba(27,34,56,.1)' }));
  const badge = el('div', 'abs', card, { left: '840px', top: '80px', width: '120px', height: '120px', borderRadius: '50%', background: 'var(--signal)',
    boxShadow: '0 0 0 10px rgba(61,123,255,.14), 0 20px 50px rgba(61,123,255,.45)' });
  badge.innerHTML = '<svg width="120" height="120" viewBox="0 0 120 120"><path id="chk" d="M36 62 L53 79 L86 44" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="80" stroke-dashoffset="80"/></svg>';
  const chk = badge.querySelector('#chk');

  /* video carousel */
  const carLab = el('div', 'abs', cam, { left: '164px', top: '622px', font: MONO, letterSpacing: '.16em', color: 'var(--ink)', opacity: 0.7 });
  carLab.textContent = 'VIDEO RESULTS';
  const mkTile = (x, label, yt) => {
    const t = el('div', 'abs', cam, { left: x + 'px', top: '665px', width: '400px', height: '260px', transformOrigin: '50% 80%' });
    const th = el('div', 'abs', t, { left: 0, top: 0, width: '400px', height: '210px', borderRadius: '20px', overflow: 'hidden',
      background: yt ? 'linear-gradient(140deg, #2a3150, var(--night))' : 'linear-gradient(140deg, #3D7BFF, #1d3f9a)', boxShadow: '0 30px 60px rgba(27,34,56,.25)' });
    el('div', 'abs', th, { inset: 0, background: 'radial-gradient(60% 70% at 30% 20%, rgba(255,255,255,.22), transparent 70%)' });
    const play = el('div', 'abs', th, { left: yt ? '150px' : '160px', top: yt ? '70px' : '65px', width: yt ? '100px' : '80px', height: yt ? '70px' : '80px',
      borderRadius: yt ? '20px' : '50%', background: yt ? 'var(--coral)' : 'rgba(255,255,255,.95)', boxShadow: '0 10px 30px rgba(0,0,0,.3)' });
    const c = yt ? '#fff' : '#3D7BFF';
    play.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"><path d="M40 30 L70 50 L40 70 Z" fill="${c}"/></svg>`;
    const l = el('div', 'abs', t, { left: '4px', top: '228px', font: MONO, letterSpacing: '.14em', color: 'var(--ink)' });
    l.textContent = label;
    return t;
  };
  const tile1 = mkTile(160, 'VIDEO RESULT', false);
  const tile2 = mkTile(590, 'YOUTUBE', true);

  /* ranking panel */
  const panel = el('div', 'abs', cam, { left: '1240px', top: '270px', width: '520px', height: '700px', borderRadius: '24px', background: '#fff',
    boxShadow: '0 40px 90px rgba(27,34,56,.14), 0 0 0 2px rgba(27,34,56,.05)' });
  const pLab = el('div', 'abs', panel, { left: '44px', top: '44px', font: MONO, letterSpacing: '.16em', color: 'var(--mist)' });
  pLab.textContent = 'RANKING';
  for (let i = 0; i < 5; i++) {
    const y = 110 + i * 100;
    const r = el('div', 'abs', panel, { left: '170px', top: y + 'px', width: '300px', height: '60px', borderRadius: '14px', background: i === 0 ? 'rgba(255,181,71,.18)' : 'rgba(27,34,56,.05)' });
    const n = el('div', 'abs', r, { left: '22px', top: '17px', font: '800 26px/1 Inter Display, Inter', color: i === 0 ? 'var(--amber)' : 'rgba(27,34,56,.4)' });
    n.textContent = '#' + (i + 1);
    el('div', 'abs', r, { left: '90px', top: '24px', width: 150 - i * 12 + 'px', height: '12px', borderRadius: '6px', background: 'rgba(27,34,56,.1)' });
  }
  const BASEY = 540;
  const trail = el('div', 'abs', panel, { left: '91px', width: '8px', top: BASEY + 'px', height: '0px', borderRadius: '4px', background: 'linear-gradient(180deg, var(--signal), rgba(61,123,255,.1))' });
  const arrow = el('div', 'abs', panel, { left: '60px', top: BASEY - 30 + 'px', width: '70px', height: '60px' });
  arrow.innerHTML = '<svg width="70" height="60" viewBox="0 0 70 60"><path d="M35 4 L66 52 L4 52 Z" fill="#3D7BFF" stroke="#3D7BFF" stroke-width="6" stroke-linejoin="round"/></svg>';
  const arrowPath = arrow.querySelector('path');
  const climb = { y: 0 };
  const tag = el('div', 'abs', panel, { left: '44px', top: '608px', padding: '14px 26px', borderRadius: '30px', background: 'var(--coral)', color: '#fff',
    font: '800 30px/1 Inter Display, Inter', letterSpacing: '-.02em', whiteSpace: 'nowrap', boxShadow: '0 16px 40px rgba(255,107,90,.45)', transformOrigin: '20% 50%' });
  tag.textContent = 'No guaranteed boost';

  ctx.fx.vignette({ strength: 0.18 });
  ctx.fx.grain({ opacity: 0.05 });

  ctx.onFrame((t) => {
    const n = Math.floor(typed.n);
    qText.textContent = QUERY.slice(0, n);
    const typing = n > 0 && n < QUERY.length && t < answer;
    caret.style.opacity = typing ? 1 : (Math.floor(t * 2.2) % 2 === 0 ? 1 : 0);
    arrow.style.transform = `translateY(${climb.y}px)`;
    trail.style.top = BASEY + climb.y + 'px';
    trail.style.height = -climb.y + 'px';
  });

  /* ---- timeline ---- */
  tl.to(cam, { scale: 1.035, duration: ctx.dur, ease: 'none' }, 0);
  tl.from(bar, { y: -30, opacity: 0, duration: 0.6 }, 0.05);
  const typeStart = 0.45, typeDur = Math.max(0.9, answer - 0.45 - typeStart);
  tl.to(typed, { n: QUERY.length, duration: typeDur, ease: 'none' }, typeStart);

  // "answer the question"
  tl.fromTo(card, { y: 140, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.4)' }, answer - 0.25);
  tl.fromTo(badge, { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2)' }, answer + 0.25);
  tl.to(chk, { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out' }, answer + 0.45);

  // carousel
  tl.fromTo(carLab, { opacity: 0, x: -20 }, { opacity: 0.7, x: 0, duration: 0.5 }, video - 0.5);
  tl.fromTo(tile1, { scale: 0.5, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 0.65, ease: 'back.out(1.8)' }, video - 0.05);
  tl.fromTo(tile2, { scale: 0.5, opacity: 0, x: -120 }, { scale: 1, opacity: 1, x: 0, duration: 0.65, ease: 'back.out(1.8)' }, yt - 0.1);

  // ranking caveat
  tl.fromTo(panel, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.7 }, ctx.beats[2].t - 0.6);
  tl.to(climb, { y: -260, duration: 1.0, ease: 'power3.out' }, never - 0.15);
  tl.to(arrow, { x: 4, duration: 0.06, yoyo: true, repeat: 5, ease: 'none' }, guar - 0.05);
  tl.to(climb, { y: -170, duration: 0.6, ease: 'power2.inOut' }, guar + 0.3);
  tl.to(arrowPath, { attr: { fill: '#A9B3C9', stroke: '#A9B3C9' }, duration: 0.5 }, guar + 0.3);
  tl.fromTo(tag, { scale: 0.4, opacity: 0, rotation: -6 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.55, ease: 'back.out(2)' }, guar + 0.15);
  tl.to([card, tile1, tile2], { opacity: 0.85, duration: 0.6 }, guar + 0.2);
});
