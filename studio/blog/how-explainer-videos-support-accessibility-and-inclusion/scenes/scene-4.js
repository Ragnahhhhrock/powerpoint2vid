/* Scene 4 — "Swap a vague 'Results' headline and colour-coded pie for a clear statement and labelled bars.
 *            Now it works with sound or without, and with any colour vision."
 * Storyboard: mist stage, close on a red/amber/green pie under the word "Results". On "clear statement"
 * the headline turns into "Most students passed the first assessment" (90px, two lines) while the pie
 * winds away and unrolls into horizontal bars. On "labelled" each bar gets its direct label: Passed,
 * Resubmit, Not yet submitted (proportional, unnumbered). On "sound" a small Transcript / summary tab
 * slides in at the corner; on "colour vision" the whole scene eases to greyscale and still reads.
 * Calm pacing: soft ease-in-out, no flashes, each element arrives once and holds. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const safe = (i, w, fb) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : fb; };
  const clear = safe(0, 'clear', 3.4);
  const labelled = safe(0, 'labelled', 4.9);
  const sound = safe(1, 'sound', 6.9);
  const colour = safe(1, 'colour', 8.5);

  const world = el('div', 'abs', stage, { inset: 0 });
  el('div', 'abs', world, { inset: 0, background: 'radial-gradient(70% 70% at 50% 40%, #e3e9ef 0%, var(--mist) 60%, #aebbc9 100%)' });
  el('div', 'abs', world, { inset: 0, background: 'radial-gradient(40% 35% at 30% 20%, rgba(255,255,255,.45), transparent 70%)' });
  const cam = el('div', 'abs', world, { inset: 0, transformOrigin: '960px 560px' });

  const card = el('div', 'abs', cam, { left: '110px', top: '70px', width: '1700px', height: '940px', borderRadius: '28px', background: 'var(--paper)', boxShadow: '0 50px 120px rgba(22,32,46,.22), 0 6px 18px rgba(22,32,46,.08)' });

  const tagStyle = { left: '190px', top: '120px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'rgba(22,32,46,.55)' };
  const tagB = el('div', 'abs', cam, tagStyle); tagB.textContent = 'BEFORE';
  const tagA = el('div', 'abs', cam, { ...tagStyle, color: 'var(--teal)' }); tagA.textContent = 'AFTER';

  const oldT = el('div', 'abs', cam, { left: '190px', top: '170px', font: '800 90px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  oldT.textContent = 'Results';
  const newT = el('div', 'abs', cam, { left: '190px', top: '170px', width: '1500px', font: '800 90px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  const l1 = el('div', '', newT), l2 = el('div', '', newT);
  const words = [...ctx.split(l1, 'Most students passed', 'word'), ...ctx.split(l2, 'the first assessment', 'word')];

  const DATA = [
    { label: 'Passed', share: 0.62, pie: '#4f9d5a', bar: 'var(--teal)' },
    { label: 'Resubmit', share: 0.23, pie: '#e9a83a', bar: 'var(--sun)' },
    { label: 'Not yet submitted', share: 0.15, pie: '#d8483a', bar: 'var(--coral)' },
  ];

  const R = 115, C = 2 * Math.PI * R;
  const pieWrap = el('div', 'abs', cam, { left: '730px', top: '380px', width: '460px', height: '460px', transformOrigin: '50% 50%', filter: 'drop-shadow(0 30px 40px rgba(22,32,46,.2))' });
  let acc = 0;
  const segs = DATA.map((d) => { const s = { start: acc, len: d.share * C, d }; acc += s.len; return s; });
  pieWrap.innerHTML = `<svg width="460" height="460" viewBox="0 0 460 460"><g transform="rotate(-90 230 230)">${segs.map((s, i) =>
    `<circle id="seg${i}" cx="230" cy="230" r="${R}" fill="none" stroke="${s.d.pie}" stroke-width="${2 * R}" stroke-dasharray="${s.len} ${C}" stroke-dashoffset="${-s.start}"/>`).join('')}</g></svg>`;

  const BX = 680, BMAX = 1000, BH = 92;
  const rows = DATA.map((d, i) => {
    const y = 470 + i * 150, w = (d.share / DATA[0].share) * BMAX;
    const track = el('div', 'abs', cam, { left: BX + 'px', top: y + 'px', width: BMAX + 'px', height: BH + 'px', borderRadius: '14px', background: 'rgba(22,32,46,.05)' });
    const bar = el('div', 'abs', cam, { left: BX + 'px', top: y + 'px', width: w + 'px', height: BH + 'px', borderRadius: '14px', background: d.bar, transformOrigin: '0% 50%', boxShadow: '0 14px 30px rgba(22,32,46,.15), inset 0 1px 0 rgba(255,255,255,.35)' });
    const lab = el('div', 'abs', cam, { left: '190px', width: '450px', top: y + 'px', height: BH + 'px', textAlign: 'right', font: '700 42px/' + BH + 'px Inter', letterSpacing: '-.02em', color: 'var(--ink)', whiteSpace: 'nowrap' });
    lab.textContent = d.label;
    return { track, bar, lab };
  });

  const tab = el('div', 'abs', world, { left: '1440px', top: '930px', width: '380px', height: '78px', borderRadius: '16px 16px 0 0', background: 'var(--ink)', boxShadow: '0 -10px 40px rgba(22,32,46,.25)', display: 'flex', alignItems: 'center', gap: '18px', padding: '0 26px', boxSizing: 'border-box' });
  const doc = el('div', '', tab, { width: '30px', height: '38px', borderRadius: '5px', background: 'var(--paper)', position: 'relative', flex: 'none' });
  [9, 17, 25].forEach((t) => el('div', 'abs', doc, { left: '6px', top: t + 'px', width: '18px', height: '3px', background: 'var(--ink)', opacity: 0.6 }));
  const tabT = el('div', '', tab, { font: '600 21px/1 ui-monospace, Menlo, monospace', letterSpacing: '.1em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  tabT.textContent = 'TRANSCRIPT / SUMMARY';

  ctx.fx.vignette({ strength: 0.3 });
  ctx.fx.grain({ opacity: 0.05 });

  gsap.set(world, { filter: 'grayscale(0)' });
  gsap.set(cam, { scale: 1.14, x: 0, y: 40 });
  gsap.set([oldT, tagB], { filter: 'blur(0px)' });
  gsap.set(words, { opacity: 0, y: 30, filter: 'blur(6px)' });
  gsap.set(tagA, { opacity: 0 });
  rows.forEach((r) => { gsap.set(r.bar, { scaleX: 0 }); gsap.set(r.track, { opacity: 0 }); gsap.set(r.lab, { opacity: 0, x: -24 }); });
  gsap.set(tab, { x: 620 });

  tl.from(pieWrap, { scale: 0.94, duration: 1.2, ease: 'sine.inOut' }, 0);
  tl.from(oldT, { y: 16, duration: 1.0, ease: 'sine.inOut' }, 0);
  tl.to(pieWrap, { rotation: 8, duration: clear - 0.2, ease: 'sine.inOut' }, 0);
  tl.to(cam, { scale: 1.1, x: -10, duration: clear - 0.4, ease: 'sine.inOut' }, 0);

  tl.to(cam, { scale: 1, x: 0, y: 0, duration: 1.6, ease: 'expo.inOut' }, clear - 0.5);
  tl.to([oldT, tagB], { opacity: 0, y: -14, filter: 'blur(6px)', duration: 0.6, ease: 'sine.inOut' }, clear - 0.2);
  tl.to(tagA, { opacity: 1, duration: 0.7, ease: 'sine.inOut' }, clear + 0.2);
  tl.to(words, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.07, ease: 'power2.out' }, clear + 0.05);

  tl.to(pieWrap, { rotation: -80, scale: 0.35, x: -360, opacity: 0, duration: 1.0, ease: 'sine.inOut' }, clear);
  rows.forEach((r, i) => {
    const t = clear + 0.45 + i * 0.18;
    tl.to(r.track, { opacity: 1, duration: 0.6, ease: 'sine.inOut' }, t - 0.1);
    tl.to(r.bar, { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, t);
  });

  tl.to(rows.map((r) => r.lab), { opacity: 1, x: 0, duration: 0.8, stagger: 0.14, ease: 'power2.out' }, Math.max(labelled - 0.25, clear + 0.8));

  tl.to(tab, { x: 0, duration: 1.0, ease: 'power2.inOut' }, sound - 0.2);

  tl.to(world, { filter: 'grayscale(1)', duration: 1.3, ease: 'sine.inOut' }, colour - 0.3);

  const driftStart = clear + 1.1;
  tl.to(cam, { scale: 1.03, x: -12, duration: Math.max(1, ctx.dur - driftStart), ease: 'sine.inOut' }, driftStart);
});
