/* Scene 4 — "Many people watch forwarded videos with the sound off, so turn on burned-in captions.
 *  Then send a brief email that states the length and the ask."
 * Storyboard: electric-blue stage. A landscape phone plays the narrated deck; on "sound off" the audio
 * waveform stutters and drops, a muted slash draws and a SOUND OFF tag pops. On "turn on" a captions
 * toggle flips mint; on "burned-in captions" bold captions burn in along the bottom of the video.
 * Smooth expo pan right to an email draft: attachment chip on "email", the subject types out
 * "The 3-minute version for your team" with "3-minute" highlighted on "length". On "the ask" a mint
 * "Next step" line slides in and the Send button pulses to the end. */
P2V.scene((ctx) => {
  const { tl, el, stage, at, dur } = ctx;
  const W = (w) => at(0, w), E = (w) => at(1, w);
  const tSound = W('sound'), tOff = W('off,'), tTurn = W('turn'), tBurn = W('burned-in'), tCap = W('captions.');
  const tThen = E('Then'), tSend = E('send'), tEmail = E('email'), tThat = E('that'), tLength = E('length'), tAsk = E('ask.');
  const MONO = 'ui-monospace, Menlo, monospace';
  const HEAD = 'Inter Display, Inter, sans-serif';

  stage.style.background = 'radial-gradient(75% 85% at 50% 45%, #2f56d8 0%, #1a2c78 48%, var(--night) 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  const world = el('div', 'abs', cam, { left: 0, top: 0, width: '3840px', height: '1080px' });
  // moving light pools
  el('div', 'abs', world, { left: '200px', top: '80px', width: '1500px', height: '900px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(76,125,255,.45), transparent)' });
  el('div', 'abs', world, { left: '2100px', top: '60px', width: '1600px', height: '960px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(120,160,255,.35), transparent)' });

  const label = (txt, x, y, parent = world) => {
    const d = el('div', 'abs', parent, { left: x + 'px', top: y + 'px', font: `600 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'rgba(255,255,255,.75)' });
    d.textContent = txt; return d;
  };

  /* ---------------- PHONE ---------------- */
  const phone = el('div', 'abs', world, { left: '400px', top: '220px', width: '1120px', height: '600px', borderRadius: '64px', background: 'linear-gradient(160deg,#20263a,#07090f)', boxShadow: '0 60px 120px rgba(5,10,40,.6), 0 0 0 2px rgba(255,255,255,.08) inset' });
  const screen = el('div', 'abs', phone, { left: '40px', top: '40px', width: '1040px', height: '520px', borderRadius: '36px', overflow: 'hidden', background: 'linear-gradient(135deg, var(--ink), var(--night))' });
  // the "video": a narrated slide
  el('div', 'abs', screen, { inset: 0, background: 'radial-gradient(60% 80% at 80% 30%, rgba(76,125,255,.35), transparent 70%)' });
  el('div', 'abs', screen, { left: '70px', top: '90px', width: '470px', height: '38px', borderRadius: '8px', background: 'rgba(255,255,255,.9)' });
  el('div', 'abs', screen, { left: '70px', top: '146px', width: '340px', height: '38px', borderRadius: '8px', background: 'rgba(255,255,255,.9)' });
  el('div', 'abs', screen, { left: '70px', top: '214px', width: '300px', height: '14px', borderRadius: '7px', background: 'rgba(138,147,168,.6)' });
  el('div', 'abs', screen, { left: '70px', top: '240px', width: '250px', height: '14px', borderRadius: '7px', background: 'rgba(138,147,168,.6)' });
  [90, 140, 120, 200].forEach((h, i) => el('div', 'abs', screen, { left: 640 + i * 80 + 'px', top: 340 - h + 'px', width: '54px', height: h + 'px', borderRadius: '8px 8px 2px 2px', background: i === 3 ? 'var(--mint)' : 'var(--electric)', opacity: i === 3 ? 1 : 0.75 }));
  const prog = el('div', 'abs', screen, { left: 0, bottom: 0, width: '1040px', height: '8px', background: 'rgba(255,255,255,.15)' });
  const progFill = el('div', 'abs', prog, { left: 0, top: 0, height: '8px', width: '0px', background: 'var(--signal)' });

  // audio pill: speaker + waveform + mute slash
  const pill = el('div', 'abs', screen, { left: '770px', top: '28px', width: '240px', height: '72px', borderRadius: '36px', background: 'rgba(0,0,0,.5)' });
  const spk = el('div', 'abs', pill, { left: '20px', top: '14px', width: '44px', height: '44px' });
  spk.innerHTML = `<svg width="44" height="44" viewBox="0 0 44 44"><path d="M6 16h8l10-8v28l-10-8H6z" fill="#fff"/>
    <line id="sl" x1="4" y1="40" x2="40" y2="4" stroke="#FF6B4A" stroke-width="5" stroke-linecap="round" stroke-dasharray="52" stroke-dashoffset="52"/></svg>`;
  const slash = spk.querySelector('#sl');
  const waves = [0, 1, 2, 3, 4, 5].map((i) => el('div', 'abs', pill, { left: 84 + i * 24 + 'px', width: '11px', borderRadius: '6px', background: 'var(--mint)' }));
  const amp = { v: 1 };

  // captions
  const capWrap = el('div', 'abs', screen, { left: 0, width: '1040px', top: '392px', textAlign: 'center' });
  const capBox = el('span', '', capWrap, { display: 'inline-block', padding: '12px 28px', borderRadius: '14px', background: 'rgba(0,0,0,.78)', font: `900 44px/1.15 ${HEAD}`, letterSpacing: '-.02em', color: '#fff', whiteSpace: 'nowrap' });
  const capWords = ctx.split(capBox, "Here's what changes for your team.", 'word');
  const burnFlash = el('div', 'abs', screen, { inset: 0, background: 'radial-gradient(60% 40% at 50% 85%, rgba(255,140,90,.55), transparent 70%)', opacity: 0, mixBlendMode: 'screen' });

  const lbl1 = label('01 · FORWARDED VIDEO', 404, 160);
  const offTag = el('div', 'abs', world, { left: '1210px', top: '146px', padding: '10px 18px', borderRadius: '10px', background: 'var(--signal)', font: `700 22px/1 ${MONO}`, letterSpacing: '.14em', color: '#fff', boxShadow: '0 10px 30px rgba(255,107,74,.5)' });
  offTag.textContent = 'SOUND OFF';

  // captions toggle
  const tog = el('div', 'abs', world, { left: '760px', top: '866px', width: '400px', height: '70px' });
  const togLbl = el('div', 'abs', tog, { left: 0, top: '24px', font: `700 24px/1 ${MONO}`, letterSpacing: '.14em', color: '#fff' });
  togLbl.textContent = 'CAPTIONS';
  const track = el('div', 'abs', tog, { left: '200px', top: '6px', width: '116px', height: '58px', borderRadius: '29px', background: 'rgba(255,255,255,.2)' });
  const knob = el('div', 'abs', track, { left: '6px', top: '6px', width: '46px', height: '46px', borderRadius: '50%', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,.3)' });
  const onLbl = el('div', 'abs', tog, { left: '336px', top: '22px', font: `800 26px/1 ${HEAD}`, color: 'var(--mint)' });
  onLbl.textContent = 'ON';

  /* ---------------- EMAIL ---------------- */
  const OX = 2220;
  const lbl2 = label('02 · THE EMAIL', OX + 4, 96);
  const mail = el('div', 'abs', world, { left: OX + 'px', top: '150px', width: '1320px', height: '790px', borderRadius: '28px', background: 'var(--paper)', boxShadow: '0 60px 140px rgba(5,10,40,.55)', overflow: 'hidden', color: 'var(--ink)' });
  const bar = el('div', 'abs', mail, { left: 0, top: 0, width: '1320px', height: '70px', background: '#ebe6dc' });
  ['#FF6B4A', '#f5c04a', '#3DD6A3'].forEach((c, i) => el('div', 'abs', bar, { left: 30 + i * 30 + 'px', top: '26px', width: '18px', height: '18px', borderRadius: '50%', background: c }));
  const nm = el('div', 'abs', bar, { left: '150px', top: '24px', font: `600 22px/1 ${MONO}`, letterSpacing: '.12em', color: 'var(--slate)' }); nm.textContent = 'NEW MESSAGE';

  const row = (y) => { el('div', 'abs', mail, { left: '56px', top: y + 70 + 'px', width: '1208px', height: '2px', background: 'rgba(27,34,56,.1)' }); };
  const toL = el('div', 'abs', mail, { left: '56px', top: '102px', font: `600 24px/1 ${MONO}`, letterSpacing: '.1em', color: 'var(--slate)' }); toL.textContent = 'TO';
  const toV = el('div', 'abs', mail, { left: '230px', top: '96px', font: `600 34px/1 ${HEAD}`, color: 'var(--ink)' }); toV.textContent = 'Buying team';
  row(100);
  const sjL = el('div', 'abs', mail, { left: '56px', top: '200px', font: `600 24px/1 ${MONO}`, letterSpacing: '.1em', color: 'var(--slate)' }); sjL.textContent = 'SUBJECT';
  const sj = el('div', 'abs', mail, { left: '230px', top: '188px', font: `800 46px/1.1 ${HEAD}`, letterSpacing: '-.03em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const sPre = el('span', '', sj), sHl = el('span', '', sj, { backgroundImage: 'linear-gradient(rgba(61,214,163,.55), rgba(61,214,163,.55))', backgroundRepeat: 'no-repeat', backgroundPosition: '0 88%', backgroundSize: '0% 38%' }), sPost = el('span', '', sj);
  const caret = el('span', '', sj, { display: 'inline-block', width: '4px', height: '46px', marginLeft: '4px', verticalAlign: '-6px', background: 'var(--electric)' });
  row(200);
  const S_PRE = 'The ', S_HL = '3-minute', S_POST = ' version for your team';
  const S_ALL = S_PRE + S_HL + S_POST;
  const typ = { n: 0 };

  // attachment chip
  const chip = el('div', 'abs', mail, { left: '56px', top: '310px', width: '560px', height: '130px', borderRadius: '20px', background: 'var(--ink)', boxShadow: '0 20px 40px rgba(15,20,36,.25)', transformOrigin: '0% 50%' });
  const thumb = el('div', 'abs', chip, { left: '16px', top: '16px', width: '170px', height: '98px', borderRadius: '12px', background: 'linear-gradient(135deg,#4C7DFF,#2a3f9a)' });
  thumb.innerHTML = '<svg class="abs" style="left:66px;top:30px" width="40" height="40" viewBox="0 0 40 40"><path d="M10 5l26 15-26 15z" fill="#fff"/></svg>';
  const ct = el('div', 'abs', chip, { left: '212px', top: '34px', font: `800 32px/1 ${HEAD}`, letterSpacing: '-.02em', color: '#fff' }); ct.textContent = 'Narrated pitch';
  const cm = el('div', 'abs', chip, { left: '212px', top: '80px', font: `600 22px/1 ${MONO}`, letterSpacing: '.12em', color: 'var(--mint)' }); cm.textContent = '3 MIN · CAPTIONS ON';
  const sk = [[480, 0], [400, 1]].map(([w, i]) => el('div', 'abs', mail, { left: '56px', top: 480 + i * 36 + 'px', width: w + 'px', height: '16px', borderRadius: '8px', background: 'rgba(138,147,168,.35)', transformOrigin: '0 50%' }));

  // next step
  const ns = el('div', 'abs', mail, { left: '56px', top: '578px', width: '780px', height: '84px', borderRadius: '14px', background: 'rgba(61,214,163,.18)', borderLeft: '8px solid var(--mint)', overflow: 'hidden' });
  const nsT = el('div', 'abs', ns, { left: '28px', top: '24px', font: `800 36px/1 ${HEAD}`, letterSpacing: '-.02em', color: '#127a5a', whiteSpace: 'nowrap' });
  nsT.textContent = 'Next step: pick a time to talk →';

  // send button
  const ripple = el('div', 'abs', mail, { left: '1012px', top: '662px', width: '252px', height: '84px', borderRadius: '42px', border: '5px solid var(--electric)', opacity: 0 });
  const ripple2 = el('div', 'abs', mail, { left: '1012px', top: '662px', width: '252px', height: '84px', borderRadius: '42px', border: '5px solid var(--electric)', opacity: 0 });
  const send = el('div', 'abs', mail, { left: '1012px', top: '662px', width: '252px', height: '84px', borderRadius: '42px', background: 'var(--electric)', boxShadow: '0 12px 30px rgba(76,125,255,.35)', font: `800 34px/84px ${HEAD}`, color: '#fff', textAlign: 'center', letterSpacing: '-.01em' });
  send.textContent = 'Send  ➤';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    progFill.style.width = Math.min(1040, 1040 * (0.18 + t / dur * 0.5)) + 'px';
    waves.forEach((b, i) => {
      const h = 6 + amp.v * (12 + 26 * Math.abs(Math.sin(t * 9 + i * 1.7)));
      b.style.height = h + 'px'; b.style.top = 36 - h / 2 + 'px';
      b.style.background = amp.v < 0.5 ? 'var(--slate)' : 'var(--mint)';
    });
    const n = Math.round(typ.n);
    sPre.textContent = S_ALL.slice(0, Math.min(n, 4));
    sHl.textContent = S_ALL.slice(4, Math.max(4, Math.min(n, 12)));
    sPost.textContent = S_ALL.slice(12, Math.max(12, n));
    const typing = n > 0 && n < S_ALL.length;
    caret.style.opacity = typing || Math.floor(t * 2.4) % 2 === 0 ? 1 : 0;
  });

  /* ---------------- TIMELINE ---------------- */
  gsap.set(capWords, { opacity: 0, filter: 'blur(10px) brightness(1)' });
  gsap.set(capBox, { backgroundColor: 'rgba(0,0,0,0)' });
  gsap.set([offTag, tog, onLbl], { opacity: 0 });

  // phone arrives
  tl.from(phone, { y: 70, rotation: -2, duration: 0.7, ease: 'power3.out' }, 0);
  tl.from(lbl1, { opacity: 0, x: -20, duration: 0.5 }, 0.3);
  tl.to(tog, { opacity: 1, duration: 0.5 }, 1.0);
  tl.from(tog, { y: 20, duration: 0.5 }, 1.0);
  // slow push on the phone
  tl.to(cam, { scale: 1.06, duration: 5.3, ease: 'power1.inOut' }, 0.1);

  // "sound off": waveform stutters and drops
  tl.fromTo(offTag, { opacity: 0, scale: 0.4, rotation: -8 }, { opacity: 1, scale: 1, rotation: -3, duration: 0.45, ease: 'back.out(2)', immediateRender: false }, tSound);
  tl.to(amp, { v: 0.25, duration: 0.07, ease: 'none' }, tOff - 0.1);
  tl.to(amp, { v: 0.8, duration: 0.07, ease: 'none' }, tOff - 0.03);
  tl.to(amp, { v: 0, duration: 0.35, ease: 'bounce.out' }, tOff + 0.05);
  tl.to(slash, { strokeDashoffset: 0, duration: 0.3, ease: 'power2.out' }, tOff + 0.05);
  tl.to(pill, { backgroundColor: 'rgba(120,20,10,.6)', duration: 0.3 }, tOff + 0.05);

  // "turn on": toggle flips
  tl.to(knob, { x: 58, duration: 0.35, ease: 'back.out(1.8)' }, tTurn);
  tl.to(track, { backgroundColor: '#3DD6A3', boxShadow: '0 0 30px rgba(61,214,163,.6)', duration: 0.3 }, tTurn);
  tl.fromTo(onLbl, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3, immediateRender: false }, tTurn + 0.1);

  // "burned-in captions": captions burn in
  tl.to(capBox, { backgroundColor: 'rgba(0,0,0,.78)', duration: 0.3 }, tBurn);
  tl.fromTo(capWords, { opacity: 0, scale: 1.5, color: '#FF6B4A', filter: 'blur(10px) brightness(1.8)' },
    { opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)', duration: 0.4, stagger: 0.07, ease: 'back.out(1.6)', immediateRender: false }, tBurn);
  tl.to(capWords, { color: '#ffffff', duration: 0.5, stagger: 0.07 }, tBurn + 0.3);
  tl.fromTo(burnFlash, { opacity: 0 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, tCap);

  // pan right to the email
  const panT = Math.min(tThen - 0.35, 5.45);
  tl.to(world, { x: -1920, duration: 1.1, ease: 'expo.inOut' }, panT);
  tl.to(cam, { scale: 1.0, duration: 1.1, ease: 'expo.inOut' }, panT);
  tl.from(mail, { x: 220, rotation: 2, duration: 1.3, ease: 'expo.out' }, panT + 0.1);
  tl.from(lbl2, { opacity: 0, x: 30, duration: 0.5 }, panT + 0.7);
  tl.to(cam, { scale: 1.05, duration: dur - (panT + 1.1), ease: 'power1.inOut' }, panT + 1.1);

  gsap.set([toV, chip, ...sk, ns], { opacity: 0 });
  tl.fromTo(toV, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.4, immediateRender: false }, tSend);
  tl.fromTo(chip, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)', immediateRender: false }, tEmail - 0.05);
  tl.fromTo(sk, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.5, stagger: 0.08, immediateRender: false }, tEmail + 0.25);

  // subject types out; "3-minute" highlighted on "length"
  const typeEnd = tLength + 0.35;
  tl.to(typ, { n: S_ALL.length, duration: typeEnd - tThat, ease: 'none' }, tThat);
  tl.fromTo(sHl, { backgroundSize: '0% 38%' }, { backgroundSize: '100% 38%', duration: 0.4, ease: 'power2.out', immediateRender: false }, tLength);

  // "the ask": next step + send pulse
  tl.fromTo(ns, { opacity: 0, x: -40, clipPath: 'inset(0% 100% 0% 0%)' }, { opacity: 1, x: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'power3.out', immediateRender: false }, tAsk - 0.1);
  tl.to(send, { scale: 1.12, boxShadow: '0 0 60px rgba(76,125,255,.85)', duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, tAsk + 0.2);
  tl.fromTo(ripple, { opacity: 0.9, scale: 1 }, { opacity: 0, scale: 1.5, duration: 0.9, ease: 'power2.out', immediateRender: false }, tAsk + 0.25);
  tl.fromTo(ripple2, { opacity: 0.9, scale: 1 }, { opacity: 0, scale: 1.5, duration: 0.9, ease: 'power2.out', immediateRender: false }, tAsk + 0.9);
  tl.to(send, { scale: 1.06, boxShadow: '0 0 50px rgba(76,125,255,.7)', duration: 0.4, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tAsk + 1.0);
  tl.to(send, { boxShadow: '0 0 40px rgba(76,125,255,.6)', duration: 0.3 }, Math.min(dur - 0.4, tAsk + 1.85));
});
