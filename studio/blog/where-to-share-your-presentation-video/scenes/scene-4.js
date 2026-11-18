/* Scene 4 — "For courses, place each video beside its activity. By email, send a link and say the length,
 * like a 3-minute walkthrough."
 * Storyboard: mint-tinted paper stage, split layout. On "courses" a lesson outline builds on the left; on
 * "beside" a small video tile clicks in next to one activity, labelled "One concept each". On "send" the
 * camera makes its one lateral pan right as an email draft slides in. On "link" a coral cross strikes the
 * heavy paperclip attachment, which drops away, and a clean link chip pops in. On "3-minute" the chip reads
 * "3-minute walkthrough", the "3-minute" pulses sky blue, and the camera eases in and holds. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const safe = (v, f) => (Number.isFinite(v) ? v : f);
  const b0 = ctx.beats[0], b1 = ctx.beats[1];
  const tCourses = safe(ctx.at(0, 'courses'), b0.t + 0.1);
  const tBeside = safe(ctx.at(0, 'beside'), b0.t + 1.6);
  const tActivity = safe(ctx.at(0, 'activity'), b0.t + 2.1);
  const tSend = safe(ctx.at(1, 'send'), b1.t + 0.4);
  const tLink = safe(ctx.at(1, 'link'), tSend + 0.5);
  const tWalk = safe(ctx.at(1, 'walkthrough'), b1.t + 3.0);
  const t3 = safe(ctx.at(1, '3-minute'), tWalk - 0.4);

  const MONO = 'ui-monospace, Menlo, monospace';
  stage.style.background = 'radial-gradient(60% 55% at 30% 35%, #ffffff 0%, rgba(255,255,255,0) 70%), radial-gradient(70% 70% at 80% 80%, rgba(61,214,165,.22), transparent 70%), linear-gradient(160deg, #eef7f1 0%, var(--paper) 55%, #e4f1ea 100%)';

  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '1400px 640px' });

  /* ---------- left: lesson outline ---------- */
  const card = el('div', 'abs', cam, { left: '140px', top: '210px', width: '700px', height: '660px', borderRadius: '28px', background: '#fff', boxShadow: '0 50px 100px rgba(26,34,51,.14), 0 4px 14px rgba(26,34,51,.06)' });
  const cTag = el('div', 'abs', card, { left: '48px', top: '46px', font: `600 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--mint)' });
  cTag.textContent = 'COURSE · LESSON 2';
  const cTitle = el('div', 'abs', card, { left: '46px', top: '86px', font: '800 52px/1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--ink)' });
  cTitle.textContent = 'Lesson outline';

  const rows = [0, 1, 2, 3].map((i) => {
    const r = el('div', 'abs', card, { left: '30px', top: 190 + i * 112 + 'px', width: '640px', height: '92px', borderRadius: '18px' });
    const hl = el('div', 'abs', r, { inset: 0, borderRadius: '18px', background: 'rgba(61,214,165,.14)', border: '2px solid rgba(61,214,165,.55)', opacity: 0 });
    const dot = el('div', 'abs', r, { left: '20px', top: '30px', width: '32px', height: '32px', borderRadius: '50%', border: '3px solid #c9d2de', boxSizing: 'border-box' });
    const num = el('div', 'abs', r, { left: '72px', top: '20px', font: `600 16px/1 ${MONO}`, letterSpacing: '.12em', color: 'var(--mist)' });
    num.textContent = 'ACTIVITY ' + (i + 1);
    const bar = el('div', 'abs', r, { left: '72px', top: '48px', width: [300, 250, 320, 230][i] + 'px', height: '16px', borderRadius: '8px', background: '#dde3ec' });
    return { r, hl, dot, bar };
  });
  const hot = rows[1];

  // video tile beside activity 2
  const tile = el('div', 'abs', card, { left: '450px', top: '196px', width: '200px', height: '112px', borderRadius: '14px', overflow: 'hidden', transformOrigin: '50% 50%',
    background: 'linear-gradient(140deg, #1d2a44 0%, var(--night) 100%)', boxShadow: '0 18px 40px rgba(14,20,32,.35), 0 0 0 3px var(--mint)' });
  tile.style.top = 190 + 112 + 6 + 'px';
  tile.style.height = '80px';
  tile.style.width = '142px';
  tile.style.left = '512px';
  const play = el('div', 'abs', tile, { left: '56px', top: '24px', width: 0, height: 0, borderTop: '16px solid transparent', borderBottom: '16px solid transparent', borderLeft: '26px solid #fff' });
  el('div', 'abs', tile, { left: 0, bottom: 0, height: '5px', width: '38%', background: 'var(--mint)' });
  const label = el('div', 'abs', cam, { left: '560px', top: '640px', padding: '14px 22px', borderRadius: '14px', background: 'var(--ink)', color: '#fff', font: '700 28px/1 Inter Display, Inter', letterSpacing: '-.02em', whiteSpace: 'nowrap', boxShadow: '0 20px 40px rgba(14,20,32,.25)', transformOrigin: '20% 0%' });
  label.textContent = 'One concept each';
  const pointer = el('div', 'abs', label, { left: '40px', top: '-10px', width: '20px', height: '20px', background: 'var(--ink)', transform: 'rotate(45deg)' });
  pointer.style.zIndex = '-1';

  /* ---------- right: email draft ---------- */
  const mail = el('div', 'abs', cam, { left: '1020px', top: '180px', width: '780px', height: '720px', borderRadius: '28px', background: '#fff', overflow: 'hidden', boxShadow: '0 60px 120px rgba(26,34,51,.16), 0 4px 14px rgba(26,34,51,.06)' });
  const bar = el('div', 'abs', mail, { left: 0, top: 0, right: 0, height: '76px', background: '#f2f5f9', borderBottom: '1px solid #e3e8ef' });
  ['#ff6b4a', '#ffc24a', '#3dd6a5'].forEach((c, i) => el('div', 'abs', bar, { left: 30 + i * 30 + 'px', top: '29px', width: '16px', height: '16px', borderRadius: '50%', background: c }));
  const mTag = el('div', 'abs', bar, { right: '34px', top: '29px', font: `600 18px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--mist)' });
  mTag.textContent = 'NEW MESSAGE';
  ['TO', 'SUBJECT'].forEach((k, i) => {
    const y = 106 + i * 72;
    const f = el('div', 'abs', mail, { left: '44px', top: y + 'px', font: `600 18px/1 ${MONO}`, letterSpacing: '.12em', color: 'var(--mist)' }); f.textContent = k;
    el('div', 'abs', mail, { left: '180px', top: y + 1 + 'px', width: [260, 380][i] + 'px', height: '16px', borderRadius: '8px', background: '#dde3ec' });
    el('div', 'abs', mail, { left: '44px', right: '44px', top: y + 44 + 'px', height: '1px', background: '#e8edf3' });
  });
  [520, 600, 440].forEach((w, i) => el('div', 'abs', mail, { left: '44px', top: 290 + i * 40 + 'px', width: w + 'px', height: '16px', borderRadius: '8px', background: '#e6ebf1' }));

  // heavy attachment
  const att = el('div', 'abs', mail, { left: '44px', top: '470px', width: '460px', height: '110px', borderRadius: '18px', background: '#f4f6f9', border: '2px solid #dde3ec', boxSizing: 'border-box', transformOrigin: '30% 50%' });
  const clip = el('div', 'abs', att, { left: '26px', top: '22px', width: '62px', height: '62px' });
  clip.innerHTML = '<svg width="62" height="62" viewBox="0 0 24 24"><path d="M21 11.5l-8.6 8.6a5.5 5.5 0 0 1-7.8-7.8l8.6-8.6a3.7 3.7 0 0 1 5.2 5.2l-8.6 8.6a1.8 1.8 0 0 1-2.6-2.6l7.9-7.9" fill="none" stroke="#5a6678" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const attName = el('div', 'abs', att, { left: '108px', top: '30px', font: '700 30px/1 Inter', letterSpacing: '-.02em', color: 'var(--ink)' }); attName.textContent = 'onboarding.mp4';
  const attSub = el('div', 'abs', att, { left: '108px', top: '70px', font: `600 15px/1 ${MONO}`, letterSpacing: '.12em', color: 'var(--mist)' }); attSub.textContent = 'ATTACHMENT';
  const cross = [45, -45].map((r) => el('div', 'abs', att, { left: '130px', top: '49px', width: '200px', height: '12px', borderRadius: '6px', background: 'var(--signal)', boxShadow: '0 4px 16px rgba(255,107,74,.5)', transform: `rotate(${r}deg)`, transformOrigin: '50% 50%' }));

  // clean link chip
  const chip = el('div', 'abs', mail, { left: '44px', top: '470px', width: '560px', height: '110px', borderRadius: '55px', background: 'linear-gradient(180deg, #ffffff, #f3f9ff)', border: '3px solid var(--sky)', boxSizing: 'border-box', transformOrigin: '20% 50%', boxShadow: '0 20px 50px rgba(79,163,255,.25)' });
  const lk = el('div', 'abs', chip, { left: '22px', top: '22px', width: '60px', height: '60px', borderRadius: '50%', background: 'var(--sky)' });
  lk.innerHTML = '<svg width="60" height="60" viewBox="0 0 24 24"><g fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round"><path d="M10.5 13.5a3.5 3.5 0 0 0 5 0l2.5-2.5a3.5 3.5 0 0 0-5-5l-.8.8"/><path d="M13.5 10.5a3.5 3.5 0 0 0-5 0L6 13a3.5 3.5 0 0 0 5 5l.8-.8"/></g></svg>';
  const chipA = el('div', 'abs', chip, { left: '102px', top: '33px', font: '700 36px/1 Inter Display, Inter', letterSpacing: '-.025em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  chipA.textContent = 'Watch the video';
  const chipB = el('div', 'abs', chip, { left: '102px', top: '33px', font: '700 36px/1 Inter Display, Inter', letterSpacing: '-.025em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const three = el('span', '', chipB, { display: 'inline-block', color: 'var(--sky)', transformOrigin: '50% 60%' }); three.textContent = '3-minute';
  el('span', '', chipB).textContent = ' walkthrough';
  const ring = el('div', 'abs', mail, { left: '44px', top: '470px', width: '560px', height: '110px', borderRadius: '55px', border: '4px solid var(--sky)', boxSizing: 'border-box', opacity: 0 });

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---------- timeline ---------- */
  gsap.set(cam, { x: 260, scale: 1 });
  gsap.set(card, { filter: 'saturate(1) brightness(1)' });
  tl.from(card, { y: 70, opacity: 0, duration: 0.7, ease: 'back.out(1.4)' }, 0.05);
  tl.from([cTag, cTitle], { y: 20, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.2);
  tl.from(rows.map((r) => r.r), { x: -40, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.6)' }, Math.max(0.3, tCourses - 0.3));
  // slow push on the outline during beat 0
  tl.to(cam, { scale: 1.03, duration: tSend - 0.4, ease: 'power1.inOut' }, 0);

  // activity 2 lights up, tile clicks in beside it
  tl.to(hot.hl, { opacity: 1, duration: 0.35 }, tBeside - 0.35);
  tl.to(hot.dot, { borderColor: '#3dd6a5', background: '#3dd6a5', duration: 0.3 }, tBeside - 0.35);
  tl.to(rows.filter((r) => r !== hot).map((r) => r.r), { opacity: 0.55, duration: 0.4 }, tBeside - 0.35);
  tl.fromTo(tile, { scale: 0.4, opacity: 0, rotation: -8 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, tBeside);
  gsap.set(tile, { opacity: 0 });
  tl.fromTo(tile, { y: -6 }, { y: 0, duration: 0.12, ease: 'power2.out', immediateRender: false }, tBeside + 0.45);
  tl.from(play, { scale: 0, duration: 0.35, ease: 'back.out(2.4)' }, tBeside + 0.25);
  tl.fromTo(label, { opacity: 0, y: 24, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, tActivity);
  gsap.set(label, { opacity: 0 });

  // the one lateral pan + email arrives
  tl.to(cam, { x: -50, scale: 1, duration: 1.0, ease: 'expo.inOut' }, tSend - 0.45);
  tl.fromTo(mail, { x: 380, opacity: 0, rotation: 2 }, { x: 0, opacity: 1, rotation: 0, duration: 0.85, ease: 'back.out(1.3)', immediateRender: false }, tSend - 0.35);
  gsap.set(mail, { opacity: 0 });
  tl.to(card, { filter: 'saturate(.6) brightness(.97)', opacity: 0.75, duration: 0.6 }, tSend);

  // attachment struck and dropped, link chip pops in
  gsap.set(cross, { scaleX: 0 });
  const tX = Math.max(tSend + 0.45, tLink - 0.2);
  tl.to(cross[0], { scaleX: 1, duration: 0.18, ease: 'power3.out' }, tX);
  tl.to(cross[1], { scaleX: 1, duration: 0.18, ease: 'power3.out' }, tX + 0.12);
  tl.to(att, { y: 340, rotation: 16, opacity: 0, duration: 0.55, ease: 'power2.in' }, tX + 0.38);
  gsap.set(chip, { opacity: 0 });
  tl.fromTo(chip, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.9)', immediateRender: false }, tX + 0.62);

  // "3-minute walkthrough"
  gsap.set(chipB, { opacity: 0 });
  tl.to(chipA, { opacity: 0, y: -18, duration: 0.25, ease: 'power2.in' }, t3 - 0.3);
  tl.fromTo(chipB, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.8)', immediateRender: false }, t3 - 0.1);
  tl.to(three, { scale: 1.16, textShadow: '0 0 24px rgba(79,163,255,.7)', duration: 0.22, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t3 + 0.1);
  tl.fromTo(ring, { scale: 1, opacity: 0.9 }, { scale: 1.18, opacity: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, t3 + 0.1);
  tl.to(chip, { boxShadow: '0 24px 70px rgba(79,163,255,.5)', duration: 0.5 }, t3 + 0.1);
  // camera eases in on the chip and holds
  tl.to(cam, { scale: 1.06, x: -30, duration: Math.max(1, ctx.dur - t3), ease: 'power2.out' }, t3);
});
