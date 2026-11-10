/* Scene 5 — "When the product changes, edit the slides and export again, no reshoot. On Pro, a.i. directs each
 * video. Try Basic first, with no subscription. Start at powerpoint2vid.com."
 * Storyboard: a night stage that warms toward coral. On "edit the slides" a slide card's headline deletes and
 * retypes itself. On "export again" frames flow into a video player, which receives the new slide, and a mint
 * "No reshoot" tick pops. On "Pro, a.i. directs" the player glides to centre and bursts into a lively animated
 * frame. On "Basic" a small tag follows. On "Start" coral floods the stage: the headline "Make videos from decks
 * you control" lands, then the URL at 140px in paper. Hold to the end. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { try { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; } catch (e) { return f; } };
  const tEdit = A(0, 'edit', 1.92), tExport = A(0, 'export', 2.87), tNo = A(0, 'no', 3.92);
  const tPro = A(1, 'Pro', 5.93), tAI = A(1, 'directs', 6.79), tBasic = A(2, 'Basic', 8.79);
  const tStart = A(3, 'Start', 11.08), tURL = A(3, 'PowerPoint', 11.58), tCom = A(3, 'com', 12.82);
  const MONO = '600 22px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(70% 65% at 50% 45%, #1d2542 0%, var(--night) 75%)';
  const warm = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(60% 55% at 70% 80%, rgba(255,107,74,.35), transparent 70%)', opacity: 0 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  /* ---------- slide card ---------- */
  const CX = 200, CY = 330, W = 660, H = 380;
  const card = el('div', 'abs', cam, { left: CX + 'px', top: CY + 'px', width: W + 'px', height: H + 'px', borderRadius: '18px', background: 'var(--paper)', boxShadow: '0 40px 90px rgba(0,0,0,.5)', overflow: 'hidden' });
  const dots = el('div', 'abs', card, { left: '28px', top: '24px', display: 'flex', gap: '10px' });
  ['#FF6B4A', '#F5C04A', '#3DD6A3'].forEach((c) => el('div', '', dots, { width: '14px', height: '14px', borderRadius: '50%', background: c }));
  const rw = el('div', 'abs', card, { left: '48px', top: '78px', font: '800 52px/1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const caret = el('div', 'abs', card, { left: '48px', top: '76px', width: '4px', height: '56px', background: 'var(--sky)', opacity: 0 });
  const lines = [0.82, 0.64, 0.72].map((w, i) => el('div', 'abs', card, { left: '48px', top: 170 + i * 36 + 'px', width: (W - 96) * w + 'px', height: '14px', borderRadius: '7px', background: 'rgba(27,34,56,.14)' }));
  const hl = el('div', 'abs', card, { left: '40px', top: '64px', width: '0px', height: '84px', borderRadius: '10px', background: 'rgba(91,140,255,.16)' });
  const track = el('div', 'abs', card, { left: '48px', right: '48px', bottom: '40px', height: '10px', borderRadius: '5px', background: 'rgba(27,34,56,.1)', overflow: 'hidden' });
  const fill = el('div', 'abs', track, { left: 0, top: 0, bottom: 0, width: '100%', background: 'var(--sky)', transformOrigin: '0 50%' });
  gsap.set(fill, { scaleX: 0 });
  const cardTag = el('div', 'abs', cam, { left: CX + 'px', top: CY - 46 + 'px', font: MONO, letterSpacing: '.14em', color: 'var(--mist)' });
  cardTag.textContent = 'SLIDE';
  const OLD = 'Classic dashboard', NEW = 'New dashboard';
  const type = { p: 0 };

  /* ---------- flow frames ---------- */
  const flow = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const conn = el('div', 'abs', flow, { left: CX + W + 20 + 'px', top: CY + H / 2 + 'px', width: '160px', height: '0px', borderTop: '3px dashed rgba(201,206,219,.35)' });
  const frames = [0, 1, 2, 3, 4].map(() => el('div', 'abs', flow, { left: CX + W + 10 + 'px', top: CY + H / 2 - 18 + 'px', width: '48px', height: '34px', borderRadius: '6px', background: 'var(--paper)', boxShadow: '0 0 20px rgba(91,140,255,.6)', opacity: 0 }));

  /* ---------- player ---------- */
  const PX = 1060;
  const player = el('div', 'abs', cam, { left: PX + 'px', top: CY + 'px', width: W + 'px', height: H + 'px', borderRadius: '18px', background: 'var(--ink)', border: '1px solid rgba(255,255,255,.1)', boxShadow: '0 40px 90px rgba(0,0,0,.55), 0 0 0px rgba(91,140,255,0)', overflow: 'hidden' });
  const screen = el('div', 'abs', player, { left: 0, top: 0, width: W + 'px', height: H - 60 + 'px', overflow: 'hidden', background: '#11172b' });
  const mini = el('div', 'abs', screen, { left: '40px', top: '30px', width: W - 80 + 'px', height: H - 120 + 'px', borderRadius: '10px', background: 'var(--paper)', opacity: 0 });
  const miniT = el('div', 'abs', mini, { left: '36px', top: '40px', font: '800 40px/1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--ink)' }); miniT.textContent = NEW;
  [0.8, 0.6].forEach((w, i) => el('div', 'abs', mini, { left: '36px', top: 112 + i * 30 + 'px', width: (W - 152) * w + 'px', height: '12px', borderRadius: '6px', background: 'rgba(27,34,56,.14)' }));
  // animated "AI directed" layer
  const live = el('div', 'abs', screen, { inset: 0, background: 'linear-gradient(135deg, #2a3a8f 0%, #5B8CFF 55%, #3DD6A3 120%)', opacity: 0 });
  const orbs = ['#FF6B4A', '#F6F3EC', '#3DD6A3'].map((c, i) => el('div', 'abs', live, { left: 0, top: 0, width: 60 - i * 12 + 'px', height: 60 - i * 12 + 'px', borderRadius: '50%', background: c, boxShadow: `0 0 30px ${c}` }));
  const bars = [0, 1, 2, 3, 4].map((i) => el('div', 'abs', live, { left: 360 + i * 44 + 'px', bottom: '40px', width: '30px', height: '100px', borderRadius: '8px 8px 2px 2px', background: 'rgba(246,243,236,.85)', transformOrigin: '50% 100%' }));
  const focus = el('div', 'abs', live, { left: 0, top: 0, width: '200px', height: '130px', border: '3px solid rgba(255,255,255,.9)', borderRadius: '10px' });
  const play = el('div', 'abs', screen, { left: W / 2 - 46 + 'px', top: (H - 60) / 2 - 46 + 'px', width: '92px', height: '92px', borderRadius: '50%', background: 'rgba(255,255,255,.14)', backdropFilter: 'blur(4px)' });
  play.innerHTML = '<svg width="92" height="92"><path d="M38 28 L66 46 L38 64 Z" fill="#F6F3EC"/></svg>';
  const ctrl = el('div', 'abs', player, { left: '28px', right: '28px', bottom: '25px', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,.14)', overflow: 'hidden' });
  const ctrlFill = el('div', 'abs', ctrl, { left: 0, top: 0, bottom: 0, width: '100%', background: 'var(--signal)', transformOrigin: '0 50%' });
  const playerTag = el('div', 'abs', cam, { left: PX + 'px', top: CY - 46 + 'px', font: MONO, letterSpacing: '.14em', color: 'var(--mist)' });
  playerTag.textContent = 'VIDEO';

  /* no reshoot pill */
  const pill = el('div', 'abs', cam, { left: PX + W - 300 + 'px', top: CY - 76 + 'px', height: '60px', padding: '0 26px 0 10px', borderRadius: '30px', background: 'rgba(61,214,163,.14)', border: '2px solid var(--mint)', display: 'flex', alignItems: 'center', gap: '14px', font: '700 28px/1 Inter', color: 'var(--mint)', letterSpacing: '-.01em', transformOrigin: '50% 50%' });
  const tick = el('div', '', pill, { width: '42px', height: '42px', borderRadius: '50%', background: 'var(--mint)' });
  tick.innerHTML = '<svg width="42" height="42"><path id="ck" d="M12 22 L19 29 L31 14" fill="none" stroke="#0F1424" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="30" stroke-dashoffset="30"/></svg>';
  el('span', '', pill).textContent = 'No reshoot';
  const ck = tick.querySelector('path');

  /* pro label + basic tag */
  const proTag = el('div', 'abs', cam, { left: '0px', width: '1920px', top: '160px', textAlign: 'center', font: '700 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'var(--sky)', opacity: 0 });
  proTag.textContent = 'PRO · AI DIRECTS EACH VIDEO';
  const basicWrap = el('div', 'abs', cam, { left: 0, width: '1920px', top: '790px', display: 'flex', justifyContent: 'center' });
  const basic = el('div', '', basicWrap, { padding: '18px 34px', borderRadius: '40px', background: 'rgba(246,243,236,.08)', border: '1px solid rgba(246,243,236,.3)', font: '600 30px/1 Inter', color: 'var(--paper)', opacity: 0 });
  basic.innerHTML = '<b style="color:#FF6B4A;font-weight:800">Basic</b> · try it first, no subscription needed';
  const ring = el('div', 'abs', cam, { left: 960 - 200 + 'px', top: 490 - 200 + 'px', width: '400px', height: '400px', borderRadius: '50%', border: '6px solid var(--sky)', opacity: 0 });

  /* ---------- coral finale ---------- */
  const flood = el('div', 'abs', stage, { left: '930px', top: '510px', width: '60px', height: '60px', borderRadius: '50%', background: 'radial-gradient(circle, #ff8466 0%, var(--signal) 60%)' });
  gsap.set(flood, { scale: 0 });
  const fin = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 520px' });
  const head = el('div', 'abs', fin, { left: '100px', width: '1720px', top: '350px', textAlign: 'center', font: '700 64px/1.1 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--paper)' });
  const hw = ctx.split(head, 'Make videos from decks you control', 'word');
  hw.forEach((s) => { s.style.marginRight = '0.25em'; });
  const url = el('div', 'abs', fin, { left: '80px', width: '1760px', top: '470px', textAlign: 'center', font: '900 140px/1.1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  const uc = ctx.split(url, 'powerpoint2vid.com', 'char');
  const under = el('div', 'abs', fin, { left: '560px', width: '800px', top: '650px', height: '8px', borderRadius: '4px', background: 'var(--paper)', transformOrigin: '50% 50%' });
  gsap.set(under, { scaleX: 0 });
  gsap.set([...hw, ...uc], { opacity: 0 });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    const p = type.p;
    rw.textContent = p < 1 ? OLD.slice(0, Math.round(OLD.length * (1 - p))) : NEW.slice(0, Math.round(NEW.length * (p - 1)));
    caret.style.left = 48 + rw.offsetWidth + 4 + 'px';
    caret.style.opacity = (t > tEdit - 0.2 && t < tExport + 0.3) ? (Math.floor(t * 3) % 2 ? 0.3 : 1) : 0;
    orbs.forEach((o, i) => {
      const a = t * (1.6 + i * 0.5) + i * 2.1;
      o.style.transform = `translate(${150 + Math.cos(a) * (90 + i * 20)}px, ${140 + Math.sin(a * 1.3) * (70 + i * 10)}px)`;
    });
    bars.forEach((b, i) => { b.style.transform = `scaleY(${0.35 + 0.65 * Math.abs(Math.sin(t * 2.2 + i * 0.9))})`; });
    focus.style.transform = `translate(${200 + Math.sin(t * 0.9) * 170}px, ${80 + Math.cos(t * 1.1) * 50}px)`;
  });

  /* ---------- timeline ---------- */
  tl.to(cam, { scale: 1.035, duration: tStart, ease: 'none' }, 0);
  tl.to(warm, { opacity: 1, duration: tStart, ease: 'power1.in' }, 0);
  tl.from([card, cardTag], { y: 60, opacity: 0, duration: 0.8, ease: 'back.out(1.4)' }, 0.05);
  tl.from([player, playerTag], { y: 60, opacity: 0, duration: 0.8, ease: 'back.out(1.4)' }, 0.2);
  tl.from(conn, { scaleX: 0, transformOrigin: '0 50%', duration: 0.6 }, 0.45);

  // edit the slides
  tl.to(hl, { width: '560px', duration: 0.4, ease: 'power2.out' }, tEdit - 0.1);
  tl.to(type, { p: 1, duration: 0.35, ease: 'none' }, tEdit);
  tl.to(type, { p: 2, duration: 0.5, ease: 'none' }, tEdit + 0.4);
  tl.to(hl, { opacity: 0, duration: 0.4 }, tExport);

  // export again
  tl.to(fill, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, tExport);
  frames.forEach((f, i) => {
    const t0 = tExport + 0.1 + i * 0.1;
    tl.fromTo(f, { x: 0, opacity: 0, scale: 0.6 }, { x: 170, opacity: 1, scale: 1, duration: 0.45, ease: 'power2.inOut', immediateRender: false }, t0);
    tl.to(f, { opacity: 0, duration: 0.15 }, t0 + 0.4);
  });
  tl.fromTo(mini, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)', immediateRender: false }, tExport + 0.5);
  tl.fromTo(ctrlFill, { scaleX: 0 }, { scaleX: 0.35, duration: 1.2, ease: 'power1.inOut', immediateRender: false }, tExport + 0.6);
  gsap.set(ctrlFill, { scaleX: 0 });

  // no reshoot
  tl.from(pill, { scale: 0.4, opacity: 0, duration: 0.55, ease: 'back.out(2)' }, tNo - 0.15);
  tl.to(ck, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, tNo + 0.1);

  // Pro: player to centre
  tl.to([card, cardTag, flow, conn], { x: -260, opacity: 0, duration: 0.7, ease: 'power2.in' }, tPro - 0.35);
  tl.to([pill, playerTag], { opacity: 0, y: -20, duration: 0.4 }, tPro - 0.3);
  tl.to(player, { x: -430, y: -30, scale: 1.3, duration: 0.9, ease: 'expo.inOut' }, tPro - 0.1);
  tl.to(proTag, { opacity: 1, duration: 0.5 }, tPro + 0.5);
  tl.from(proTag, { y: 20, duration: 0.6, ease: 'back.out(1.6)' }, tPro + 0.5);
  // AI directs: the burst
  tl.to(live, { opacity: 1, duration: 0.3 }, tAI - 0.4);
  tl.to(play, { opacity: 0, scale: 0.5, duration: 0.3 }, tAI - 0.4);
  tl.fromTo(ring, { scale: 0.6, opacity: 1 }, { scale: 2.6, opacity: 0, duration: 1, ease: 'power2.out', immediateRender: false }, tAI - 0.4);
  tl.to(player, { boxShadow: '0 40px 90px rgba(0,0,0,.55), 0 0 120px rgba(91,140,255,.6)', duration: 0.5 }, tAI - 0.4);
  tl.to(player, { scale: 1.36, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, tAI - 0.4);
  tl.to(ctrlFill, { scaleX: 1, duration: tStart - tAI, ease: 'none' }, tAI);

  // Basic tag
  tl.fromTo(basic, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)', immediateRender: false }, tBasic - 0.1);

  // Start: coral flood
  tl.to([player, proTag, basicWrap], { scale: 0.85, opacity: 0, duration: 0.6, ease: 'power2.in' }, tStart - 0.35);
  tl.to(flood, { scale: 45, duration: 0.9, ease: 'expo.inOut' }, tStart - 0.3);
  tl.fromTo(hw, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'back.out(1.6)', immediateRender: false }, tStart + 0.15);
  tl.fromTo(uc, { opacity: 0, y: 60, scale: 0.7 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.04, ease: 'back.out(1.8)', immediateRender: false }, tURL - 0.05);
  tl.to(under, { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }, tCom - 0.1);
  tl.fromTo(fin, { scale: 1 }, { scale: 1.04, duration: ctx.dur - tStart, ease: 'power1.inOut', immediateRender: false }, tStart);
});
