/* Offline fallbacks so a job always finishes: a story built from the slides alone (no API),
 * and a clean template scene used when a generated scene fails to load or render.
 * Nothing here is invented: narration comes from the speaker notes, or else the slide's own words. */

const sentences = (s) => (s.match(/[^.!?\n]+[.!?]?/g) || []).map((x) => x.trim()).filter(Boolean);

export function mockStory(plan) {
  const slides = plan.scenes.map((s) => s.slide);
  const theme = plan.deck?.theme || {};
  const palette = { night: '#080b1f', ink: '#0e1330', violet: theme.accent1 && theme.accent1 !== '#4f81bd' ? theme.accent1 : '#6d4aff', 'violet-hi': '#8f75ff', coral: '#ff6b4a', mint: '#1fbf8f', paper: '#f8f7fc', muted: '#aab0d4' };
  const scenes = slides.map((s, i) => {
    const lines = s.text.split('\n').map((x) => x.trim()).filter(Boolean);
    const narration = s.notes || (i === 0 ? [s.title, ...lines].join('. ') : [s.title, ...lines.slice(0, 4)].join('. ')).replace(/\.\./g, '.') + '.';
    return { slide_index: i, narration, storyboard: 'Template scene: title builds word by word, key lines land on their beats, slide image drifts in.', transition: i ? ['fade', 'wipeleft', 'slideup', 'fade'][i % 4] : undefined, min_duration: Math.max(6, Math.min(14, sentences(narration).length * 3)) };
  });
  return { brief: { palette, font: 'Inter', motion: 'Confident, smooth easing; one idea per beat.', story: plan.title || 'Deck' }, scenes };
}

/* Self-contained scene source for slide `s` (title, bullets, image). */
export function templateScene(s, i) {
  const lines = s.text.split('\n').map((x) => x.trim()).filter(Boolean).slice(0, 5);
  const data = JSON.stringify({ title: s.title, lines, image: s.image.replace(/^assets\//, ''), first: i === 0 });
  return `/* Template scene (fallback) */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx; const D = ${data};
  stage.style.background = 'var(--night)';
  const glow = el('div', 'abs', stage, { width: '1100px', height: '1100px', left: '1000px', top: '-300px', borderRadius: '50%', background: 'var(--violet)', filter: 'blur(160px)', opacity: 0.45 });
  const pic = el('div', 'abs', stage, { right: '110px', top: '210px', width: '760px', height: '430px', borderRadius: '22px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,.5)', background: '#fff' });
  const im = el('img', 'abs', pic, { inset: 0, width: '100%', height: '100%', objectFit: 'contain' }); im.src = ctx.asset(D.image);
  const h = el('div', 'abs', stage, { left: '110px', top: D.lines.length ? '190px' : '400px', width: D.lines.length ? '920px' : '1500px', font: '800 ' + (D.title.length > 40 ? 76 : 96) + 'px/1.05 Inter', letterSpacing: '-.04em', color: '#fff' });
  const words = D.title.split(' ').map((w, k) => { const sp = el('span', '', h, { display: 'inline-block', marginRight: '.25em' }); sp.textContent = w; return sp; });
  const list = D.lines.map((t) => { const r = el('div', 'abs', stage, { position: 'relative', left: '110px', width: '900px', font: '500 40px/1.3 Inter', color: 'rgba(255,255,255,.88)' }); r.textContent = t; return r; });
  if (list.length) { const box = el('div', 'abs', stage, { left: '110px', top: '520px', width: '920px', display: 'flex', flexDirection: 'column', gap: '18px' }); list.forEach((r) => { r.style.position = 'static'; box.appendChild(r); }); }
  ctx.fx.vignette({ strength: 0.45 }); ctx.fx.grain({ opacity: 0.05 });
  tl.to(glow, { x: -180, y: 120, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.from(pic, { x: 140, opacity: 0, scale: 0.94, duration: 0.9, ease: 'power3.out' }, 0.3);
  tl.to(im, { scale: 1.06, duration: ctx.dur, ease: 'none' }, 0);
  words.forEach((w, k) => tl.from(w, { yPercent: 70, opacity: 0, duration: 0.5, ease: 'back.out(1.6)' }, 0.2 + k * 0.08));
  list.forEach((r, k) => tl.from(r, { x: -40, opacity: 0, duration: 0.5, ease: 'power2.out' }, Math.max(0.9, ctx.beat(Math.min(k + 1, ctx.beats.length - 1)) - 0.1 + (ctx.beats.length > 1 ? 0 : k * 0.9))));
});
`;
}
