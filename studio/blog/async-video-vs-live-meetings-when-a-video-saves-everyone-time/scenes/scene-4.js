/* Scene 4 — "Instead of waiting a week for a follow-up meeting, send a five-minute narrated deck the next
 * morning. The next meeting becomes questions, not a presentation."
 * Storyboard: ink stage, a week-long calendar strip. A grey follow-up block sits far right on NEXT MON;
 * on "waiting a week" a dashed span crawls across the week and the block greys out with a strike.
 * On "five-minute narrated deck" a coral video card drops onto tomorrow morning with a "5 min" tag,
 * then forwards along lines to Finance and IT chips. On "next meeting" the camera pushes in on the block,
 * which revives, shrinks on "questions" and fills with question marks. Hold on the shorter block. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w, f) => { const v = ctx.at(i, w); return v == null ? f : v; };
  const tWait = W(0, 'waiting', 1.05), tWeek = W(0, 'week', 1.48), tMeet = W(0, 'meeting,', 2.38);
  const tFive = W(0, 'five-minute', 3.39), tDeck = W(0, 'deck', 4.44), tMorn = W(0, 'morning.', 5.16);
  const tNext = W(1, 'next', 6.26), tQ = W(1, 'questions,', 7.23), tNot = W(1, 'not', 8.11);

  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';
  const X0 = 120, CW = 280, TOP = 280, BOT = 940;
  stage.style.background = 'radial-gradient(70% 60% at 55% 45%, #252c42 0%, var(--ink) 55%, var(--night) 100%)';

  const drift = el('div', 'abs', stage, { inset: 0 });
  const cam = el('div', 'abs', drift, { inset: 0, transformOrigin: '1660px 560px' });

  const title = el('div', 'abs', stage, { left: '120px', top: '96px', font: '800 60px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)' });
  title.textContent = 'Video first, then a shorter meeting';
  const kicker = el('div', 'abs', stage, { left: '124px', top: '176px', font: MONO, letterSpacing: '.14em', color: 'var(--mist)' });
  kicker.textContent = 'THE FOLLOW-UP';

  const days = ['MON · TODAY', 'TUE', 'WED', 'THU', 'FRI', 'NEXT MON'];
  const cols = days.map((d, i) => {
    const c = el('div', 'abs', cam, { left: X0 + i * CW + 'px', top: TOP + 'px', width: CW + 'px', height: BOT - TOP + 'px',
      borderLeft: '1px solid rgba(255,255,255,.08)', background: i === 0 ? 'rgba(143,184,255,.05)' : 'transparent' });
    const h = el('div', 'abs', cam, { left: X0 + i * CW + 16 + 'px', top: TOP - 44 + 'px', font: MONO, fontSize: '18px', letterSpacing: '.12em', color: i === 0 ? 'var(--sky)' : 'var(--mist)' });
    h.textContent = d;
    return [c, h];
  }).flat();
  const rows = [0, 1, 2, 3, 4, 5].map((r) => el('div', 'abs', cam, { left: X0 + 'px', width: CW * 6 + 'px', top: TOP + r * 110 + 'px', height: '1px', background: 'rgba(255,255,255,.06)' }));
  const edge = el('div', 'abs', cam, { left: X0 + CW * 6 + 'px', top: TOP + 'px', width: '1px', height: BOT - TOP + 'px', background: 'rgba(255,255,255,.08)' });

  const BX = X0 + 5 * CW + 14, BW = CW - 28, BY = 400;
  const block = el('div', 'abs', cam, { left: BX + 'px', top: BY + 'px', width: BW + 'px', height: '340px', borderRadius: '14px', overflow: 'hidden',
    background: 'rgba(154,163,181,.28)', border: '2px solid rgba(154,163,181,.5)', boxShadow: '0 30px 60px rgba(0,0,0,.35)' });
  const bLab = el('div', 'abs', block, { left: '20px', top: '18px', right: '16px', font: '700 26px/1.15 Inter', color: 'var(--paper)' });
  bLab.textContent = 'Follow-up meeting';
  const bTag = el('div', 'abs', block, { left: '20px', top: '82px', font: MONO, fontSize: '16px', letterSpacing: '.12em', color: 'var(--mist)' });
  bTag.textContent = 'PRESENTATION';
  const strike = el('div', 'abs', cam, { left: BX - 10 + 'px', top: BY + 168 + 'px', width: BW + 20 + 'px', height: '6px', borderRadius: '3px', background: 'var(--signal)', transformOrigin: '0% 50%' });
  gsap.set(strike, { rotation: -28, scaleX: 0 });
  const qs = [0, 1, 2].map((i) => el('div', 'abs', block, { left: 34 + i * 62 + 'px', top: '88px', font: '900 54px/1 Inter Display, Inter', color: 'var(--night)', opacity: 0 }));
  qs.forEach((q) => { q.textContent = '?'; });
  const notLab = el('div', 'abs', cam, { left: BX + 'px', width: BW + 'px', top: BY + 190 + 'px', textAlign: 'center', font: MONO, fontSize: '17px', letterSpacing: '.12em', color: 'var(--mist)', opacity: 0 });
  notLab.innerHTML = 'NOT A <span style="text-decoration:line-through;text-decoration-color:#FF6B4A;text-decoration-thickness:3px">PRESENTATION</span>';

  const spanY = 340;
  const span = el('div', 'abs', cam, { left: X0 + 40 + 'px', top: spanY + 'px', width: BX - X0 - 60 + 'px', height: '0px', borderTop: '3px dashed rgba(154,163,181,.6)', transformOrigin: '0% 50%' });
  const spanLab = el('div', 'abs', cam, { left: X0 + 3 * CW - 40 + 'px', top: spanY - 34 + 'px', font: MONO, letterSpacing: '.14em', color: 'var(--mist)', background: 'var(--ink)', padding: '0 10px' });
  spanLab.textContent = '1 WEEK';

  const CX = X0 + CW + 12, CY = 420;
  const morning = el('div', 'abs', cam, { left: X0 + CW + 'px', top: TOP + 'px', width: CW + 'px', height: '220px', background: 'linear-gradient(180deg, rgba(255,107,74,.18), transparent)', opacity: 0 });
  const mLab = el('div', 'abs', cam, { left: X0 + CW + 16 + 'px', top: TOP + 16 + 'px', font: MONO, fontSize: '17px', letterSpacing: '.12em', color: 'var(--signal)', opacity: 0 });
  mLab.textContent = '9:00 AM';
  const card = el('div', 'abs', cam, { left: CX + 'px', top: CY + 'px', width: '400px', borderRadius: '18px', padding: '22px 24px 26px', boxSizing: 'border-box',
    background: 'linear-gradient(160deg, #ff8a6d, #FF6B4A 60%, #e6553a)', boxShadow: '0 40px 80px rgba(0,0,0,.45), 0 0 60px rgba(255,107,74,.35)', transformOrigin: '50% 0%' });
  const cTop = el('div', '', card, { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' });
  const play = el('div', '', cTop, { width: '44px', height: '44px', borderRadius: '50%', background: 'var(--paper)', position: 'relative' });
  el('div', 'abs', play, { left: '17px', top: '13px', width: 0, height: 0, borderLeft: '15px solid #FF6B4A', borderTop: '9px solid transparent', borderBottom: '9px solid transparent' });
  const cLab = el('div', '', cTop, { font: MONO, fontSize: '16px', letterSpacing: '.12em', color: 'rgba(255,255,255,.9)' });
  cLab.textContent = 'NARRATED DECK';
  const cTitle = el('div', '', card, { font: '800 30px/1.15 Inter Display, Inter', letterSpacing: '-.02em', color: '#fff' });
  cTitle.textContent = 'Three changes that would halve your month-end reporting time';
  const tag5 = el('div', 'abs', card, { right: '-18px', top: '-20px', padding: '10px 16px', borderRadius: '999px', background: 'var(--paper)', font: '800 24px/1 Inter', color: 'var(--night)', boxShadow: '0 10px 24px rgba(0,0,0,.3)' });
  tag5.textContent = '5 min';

  const lines = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  lines.innerHTML = `<svg width="1920" height="1080">
    <path d="M800 520 C 880 520, 900 430, 1000 430" fill="none" stroke="#2BB3A3" stroke-width="4" stroke-linecap="round"/>
    <path d="M800 560 C 880 560, 900 650, 1000 650" fill="none" stroke="#2BB3A3" stroke-width="4" stroke-linecap="round"/></svg>`;
  const paths = [...lines.querySelectorAll('path')];
  paths.forEach((p) => gsap.set(p, { strokeDasharray: 300, strokeDashoffset: 300 }));
  const chip = (txt, y) => {
    const c = el('div', 'abs', cam, { left: '1000px', top: y - 34 + 'px', height: '68px', padding: '0 28px', display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '999px',
      background: 'rgba(43,179,163,.16)', border: '2px solid var(--teal)', font: '700 28px/1 Inter', color: 'var(--paper)', boxShadow: '0 0 30px rgba(43,179,163,.3)' });
    el('div', '', c, { width: '14px', height: '14px', borderRadius: '50%', background: 'var(--teal)' });
    el('span', '', c).textContent = txt;
    return c;
  };
  const chips = [chip('Finance', 430), chip('IT', 650)];

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  tl.from(cols, { opacity: 0, y: 20, duration: 0.5, stagger: 0.03 }, 0);
  tl.from([...rows, edge], { opacity: 0, duration: 0.6 }, 0.1);
  tl.from([title, kicker], { opacity: 0, y: 24, duration: 0.6, stagger: 0.1 }, 0.05);
  tl.from(block, { opacity: 0, y: 40, duration: 0.6, ease: 'back.out(1.6)' }, 0.25);
  tl.to(drift, { x: -24, y: -10, duration: ctx.dur, ease: 'none' }, 0);

  tl.from(span, { scaleX: 0, duration: Math.max(0.6, tWeek - tWait + 0.3), ease: 'power2.inOut' }, tWait);
  tl.from(spanLab, { opacity: 0, y: 10, duration: 0.4, ease: 'back.out(2)' }, tWeek);
  tl.to(block, { opacity: 0.45, background: 'rgba(80,88,105,.3)', duration: 0.5 }, tMeet - 0.2);
  tl.to(strike, { scaleX: 1, duration: 0.35, ease: 'power3.in' }, tMeet);

  tl.to([morning, mLab], { opacity: 1, duration: 0.5 }, tFive - 0.3);
  tl.from(card, { y: -620, rotation: -10, opacity: 0, duration: 0.8, ease: 'back.out(1.5)' }, tFive - 0.2);
  tl.to(card, { rotation: -1.5, duration: 0.6, ease: 'power2.out' }, tFive + 0.6);
  tl.from(tag5, { scale: 0, rotation: -20, duration: 0.5, ease: 'back.out(2.2)' }, tDeck - 0.15);
  tl.to(play, { scale: 1.2, duration: 0.18, yoyo: true, repeat: 1 }, tDeck);
  tl.to(spanLab, { opacity: 0.35, duration: 0.4 }, tFive);
  tl.to(span, { opacity: 0.3, duration: 0.4 }, tFive);

  tl.to(paths, { strokeDashoffset: 0, duration: 0.5, stagger: 0.15, ease: 'power2.inOut' }, tMorn - 0.1);
  chips.forEach((c, i) => tl.from(c, { scale: 0.4, opacity: 0, duration: 0.5, ease: 'back.out(2)' }, tMorn + 0.3 + i * 0.15));

  tl.to([kicker, cols[1]], { opacity: 0, duration: 0.4 }, tNext - 0.35);
  tl.to(cam, { scale: 1.16, duration: 1.3, ease: 'expo.inOut' }, tNext - 0.3);
  tl.to(strike, { opacity: 0, duration: 0.3 }, tNext);
  tl.to(block, { opacity: 1, background: 'linear-gradient(180deg, #4fd0c0, #2BB3A3)', borderColor: '#7fe3d6', boxShadow: '0 0 60px rgba(43,179,163,.5)', duration: 0.5 }, tNext + 0.1);
  tl.to(bTag, { opacity: 0, duration: 0.25 }, tQ - 0.3);
  tl.to(bLab, { color: 'var(--night)', duration: 0.3 }, tNext + 0.1);
  tl.to(block, { height: 160, duration: 0.6, ease: 'back.out(1.6)' }, tQ - 0.15);
  tl.to(qs, { opacity: 1, duration: 0.01, stagger: 0.12 }, tQ + 0.1);
  tl.from(qs, { scale: 0, y: 20, rotation: -25, duration: 0.5, ease: 'back.out(2.4)', stagger: 0.12 }, tQ + 0.1);
  tl.fromTo(notLab, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.8)', immediateRender: false }, tNot);
  tl.to(block, { boxShadow: '0 0 100px rgba(43,179,163,.75)', duration: 0.7, yoyo: true, repeat: 1 }, tNot + 0.4);
  tl.to(qs, { y: -6, duration: 0.6, stagger: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tNot + 0.6);
});
