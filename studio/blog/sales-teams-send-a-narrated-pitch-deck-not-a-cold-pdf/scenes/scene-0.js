/* Scene 0 — "The prospect asked for something to share with the team. You sent a PDF.
 * Here's why a narrated pitch deck makes the case when you're not there."
 * Storyboard: night stage, an email thread. A typing indicator becomes the prospect's bubble
 * "Can you send something for the team?". On "You sent a PDF" a grey PDF attachment thuds into
 * the reply and just sits there. The camera pushes in as it dims and desaturates. On "narrated"
 * a coral play button blooms over it and sound rings ripple out. The camera pulls back and up, and
 * the rebuilt title "Send a narrated pitch deck, not a PDF." sets in at 120px with "narrated"
 * in signal coral. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const T = {
    prospect: ctx.at(0, 'prospect'), share: ctx.at(0, 'share'),
    you: ctx.at(1, 'You'), sent: ctx.at(1, 'sent'), pdf: ctx.at(1, 'PDF.'),
    narrated: ctx.at(2, 'narrated'), deck: ctx.at(2, 'deck'), makes: ctx.at(2, 'makes'), there: ctx.at(2, 'there.')
  };
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 50% 45%, #1a2240 0%, var(--night) 70%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 30% at 55% 55%, rgba(76,125,255,.14), transparent 70%)' });
  const coralGlow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(30% 28% at 52% 52%, rgba(255,107,74,.28), transparent 70%)', opacity: 0, mixBlendMode: 'screen' });

  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  /* email window */
  const win = el('div', 'abs', cam, { left: '460px', top: '170px', width: '1000px', height: '640px', borderRadius: '28px',
    background: 'linear-gradient(180deg, #1f2742 0%, var(--ink) 100%)', boxShadow: '0 50px 120px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.08)', overflow: 'hidden' });
  const head = el('div', 'abs', win, { left: 0, top: 0, width: '1000px', height: '64px', borderBottom: '1px solid rgba(255,255,255,.07)' });
  ['#ff6b4a', '#f5c451', '#3dd6a3'].forEach((c, i) => el('div', 'abs', head, { left: 28 + i * 26 + 'px', top: '25px', width: '14px', height: '14px', borderRadius: '50%', background: c, opacity: 0.7 }));
  const subj = el('div', 'abs', head, { left: '130px', top: '23px', font: `600 18px/1 ${MONO}`, letterSpacing: '.12em', color: 'var(--slate)' });
  subj.textContent = 'RE: NEXT STEPS';

  /* incoming */
  const fromLab = el('div', 'abs', win, { left: '50px', top: '100px', font: `600 18px/1 ${MONO}`, letterSpacing: '.12em', color: 'var(--slate)' });
  fromLab.textContent = 'PROSPECT';
  const typing = el('div', 'abs', win, { left: '50px', top: '134px', width: '120px', height: '64px', borderRadius: '24px 24px 24px 6px', background: '#2a3352' });
  const dots = [0, 1, 2].map((i) => el('div', 'abs', typing, { left: 30 + i * 24 + 'px', top: '26px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--slate)' }));
  const bubble = el('div', 'abs', win, { left: '50px', top: '134px', maxWidth: '640px', padding: '26px 34px', borderRadius: '28px 28px 28px 8px',
    background: '#2a3352', font: '600 38px/1.25 Inter', letterSpacing: '-.01em', color: 'var(--paper)', transformOrigin: '0% 100%' });
  bubble.textContent = 'Can you send something for the team?';

  /* reply */
  const youLab = el('div', 'abs', win, { right: '50px', top: '310px', font: `600 18px/1 ${MONO}`, letterSpacing: '.12em', color: 'var(--slate)', textAlign: 'right' });
  youLab.textContent = 'YOU';
  const card = el('div', 'abs', win, { left: '490px', top: '345px', width: '460px', height: '230px', borderRadius: '22px', background: '#252d48',
    boxShadow: '0 24px 50px rgba(0,0,0,.4)', transformOrigin: '50% 100%' });
  const icon = el('div', 'abs', card, { left: '30px', top: '20px', width: '150px', height: '190px' });
  icon.innerHTML = `<svg width="150" height="190" viewBox="0 0 150 190"><path d="M14 6 H100 L144 50 V176 a8 8 0 0 1 -8 8 H14 a8 8 0 0 1 -8 -8 V14 a8 8 0 0 1 8 -8z" fill="#9aa2b5"/>
    <path d="M100 6 V42 a8 8 0 0 0 8 8 H144z" fill="#6c7489"/><rect x="22" y="112" width="106" height="44" rx="8" fill="#5d6479"/>
    <text x="75" y="145" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" fill="#dfe3ec">PDF</text></svg>`;
  const fname = el('div', 'abs', card, { left: '205px', top: '70px', font: '700 30px/1.2 Inter', color: 'var(--paper)' });
  fname.textContent = 'Proposal_v3.pdf';
  const fmeta = el('div', 'abs', card, { left: '205px', top: '116px', font: `600 18px/1 ${MONO}`, letterSpacing: '.1em', color: 'var(--slate)' });
  fmeta.textContent = '24 PAGES · NO VOICE';
  const status = el('div', 'abs', win, { right: '50px', top: '592px', font: `600 16px/1 ${MONO}`, letterSpacing: '.12em', color: 'var(--slate)' });
  status.textContent = 'SENT ✓';

  /* play button + rings, centred on the PDF icon (stage 1055, 615) */
  const PX = 1055, PY = 615;
  const rings = [0, 1, 2].map(() => el('div', 'abs', cam, { left: PX - 75 + 'px', top: PY - 75 + 'px', width: '150px', height: '150px', borderRadius: '50%', border: '5px solid var(--signal)', opacity: 0 }));
  const play = el('div', 'abs', cam, { left: PX - 75 + 'px', top: PY - 75 + 'px', width: '150px', height: '150px', borderRadius: '50%',
    background: 'radial-gradient(circle at 35% 30%, #ffa58f, #ff6b4a 60%, #e04a2c)', boxShadow: '0 0 70px rgba(255,107,74,.75), 0 20px 40px rgba(0,0,0,.4)' });
  el('div', 'abs', play, { left: '58px', top: '42px', width: 0, height: 0, borderTop: '33px solid transparent', borderBottom: '33px solid transparent', borderLeft: '50px solid #fff' });

  /* headline */
  const hl = el('div', 'abs', stage, { left: '80px', width: '1760px', top: '585px', textAlign: 'center', font: '800 120px/1.02 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)' });
  const l1 = el('div', '', hl), l2 = el('div', '', hl);
  const w1 = ctx.split(l1, 'Send a narrated pitch deck,', 'word');
  const w2 = ctx.split(l2, 'not a PDF.', 'word');
  const words = [...w1, ...w2];
  words.forEach((w) => { w.style.marginRight = '0.22em'; });
  w1[2].style.color = 'var(--signal)';
  w1[2].style.textShadow = '0 0 40px rgba(255,107,74,.45)';
  w2[2].style.color = 'var(--slate)';

  ctx.fx.vignette({ strength: 0.6 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set(card, { filter: 'brightness(1) saturate(1)' });
  gsap.set([bubble, fromLab, youLab, card, status, play, ...words], { opacity: 0 });
  tl.from(win, { y: 40, opacity: 0, scale: 0.97, duration: 0.6 }, 0.0);
  tl.from(typing, { scale: 0, opacity: 0, transformOrigin: '0% 100%', duration: 0.4, ease: 'back.out(1.8)' }, 0.25);
  dots.forEach((d, i) => tl.to(d, { y: -8, duration: 0.18, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 0.35 + i * 0.09));
  tl.to(fromLab, { opacity: 1, duration: 0.4 }, 0.3);
  tl.to(typing, { opacity: 0, scale: 0.6, duration: 0.2 }, T.prospect - 0.05);
  tl.fromTo(bubble, { opacity: 0, scale: 0.6, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'back.out(1.7)' }, T.prospect);

  // "You sent a PDF." — thud
  tl.to(youLab, { opacity: 1, duration: 0.3 }, T.you);
  tl.fromTo(card, { opacity: 0, y: -260 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power4.in' }, T.pdf - 0.3);
  tl.to(card, { scaleY: 0.92, scaleX: 1.04, duration: 0.07, yoyo: true, repeat: 1, ease: 'power2.out' }, T.pdf);
  tl.to(win, { y: 6, duration: 0.06, yoyo: true, repeat: 1 }, T.pdf);
  tl.to(status, { opacity: 1, duration: 0.3 }, T.pdf + 0.2);

  // camera push-in, PDF dims
  tl.to(cam, { scale: 1.3, x: -84, y: -78, duration: 1.3, ease: 'expo.inOut' }, T.pdf + 0.35);
  tl.to(card, { filter: 'brightness(0.55) saturate(0)', duration: 1.0, ease: 'power2.inOut' }, T.pdf + 0.5);
  tl.to([bubble, fromLab, youLab, status], { opacity: 0.4, duration: 0.8 }, T.pdf + 0.6);

  // "narrated" — play blooms, rings ripple
  tl.fromTo(play, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' }, T.narrated - 0.08);
  tl.to(coralGlow, { opacity: 1, duration: 0.5 }, T.narrated);
  tl.to(card, { filter: 'brightness(0.8) saturate(0.4)', duration: 0.6 }, T.narrated);
  rings.forEach((r, i) => tl.fromTo(r, { scale: 1, opacity: 0.9 }, { scale: 3.2, opacity: 0, duration: 1.3, ease: 'power2.out', repeat: 2, immediateRender: false }, T.narrated + 0.1 + i * 0.35));
  tl.to(play, { boxShadow: '0 0 110px rgba(255,107,74,.95), 0 20px 40px rgba(0,0,0,.4)', duration: 0.5, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.narrated + 0.5);

  // pull back and up, headline sets in
  const pull = T.deck - 0.1;
  tl.to(cam, { scale: 0.62, x: 0, y: -220, duration: 0.95, ease: 'expo.inOut' }, pull);
  tl.to(coralGlow, { y: -150, opacity: 0.6, duration: 0.95, ease: 'expo.inOut' }, pull);
  tl.to(glow, { opacity: 0.5, duration: 0.9 }, pull);
  words.forEach((w, i) => {
    const t = T.makes - 0.15 + i * 0.09;
    tl.fromTo(w, { opacity: 0, y: 60, rotationX: -50 }, { opacity: 1, y: 0, rotationX: 0, duration: 0.6, ease: 'back.out(1.6)', immediateRender: false }, t);
  });
  tl.fromTo(w1[2], { scale: 1 }, { scale: 1.08, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, T.makes + 0.5);

  // slow settle drift to the end
  const endT = pull + 0.95;
  tl.to(cam, { scale: 0.645, duration: Math.max(0.5, ctx.dur - endT), ease: 'sine.inOut' }, endT);
  tl.to(hl, { scale: 1.025, duration: Math.max(0.5, ctx.dur - T.makes), ease: 'sine.inOut' }, T.makes);
});
