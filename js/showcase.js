/* PowerPoint2Vid homepage: hero video sound, showcase reel, before/after slider, header state,
   and GA4 events. No dependencies. */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const track = (name, params) => { try { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); } catch (e) { /* ignore */ } };

  const REEL = {
    explainer: {
      title: 'Product explainer',
      desc: 'Five ordinary office slides, including a default bar chart. Pro rewrote the story, staged each slide as a scene and turned the chart into the moment the video builds to.',
      base: '/assets/example-v3/explainer-v3b', mp4: '/assets/example-v3/explainer-v3b.mp4', webm: '/assets/example-v3/explainer-v3b.webm',
      poster: '/assets/example-v3/explainer-v3b-poster.jpg', vtt: '/assets/example-v3/explainer-v3b-captions.vtt', deck: '/assets/example-v3/explainer-v3b-deck.pptx',
      slides: 5, slideDir: '/assets/showcase/explainer'
    },
    lecture: {
      title: 'University lecture: how solar panels work',
      desc: 'A four-slide physics lecture with bullet points and a stock line chart. Pro turned it into a science explainer: photons you can see, electrons that flow, and the day’s output drawn under the sun as it moves.',
      dir: '/assets/showcase/lecture', slides: 4
    },
    pitch: {
      title: 'Sales pitch: Tidewell',
      desc: 'A plain four-slide sales deck for a fictional helpdesk tool. Pro staged it like a product launch: the overnight backlog, the product at work, and a result that lands on the word. Example data.',
      dir: '/assets/showcase/pitch', slides: 4
    },
    onboarding: {
      title: 'Staff induction: Harbour & Co',
      desc: 'A standard HR induction deck for a fictional company. Pro gave it a warm, print-inspired look: a week mapped as a voyage, values stamped in, and a friendly sign-off.',
      dir: '/assets/showcase/onboarding', slides: 4
    }
  };
  Object.values(REEL).forEach((r) => {
    if (r.dir) Object.assign(r, { mp4: r.dir + '/video.mp4', webm: r.dir + '/video.webm', poster: r.dir + '/poster.jpg', vtt: r.dir + '/captions.vtt', deck: r.dir + '/deck.pptx', slideDir: r.dir });
  });

  /* ---------- hero: autoplays muted; button restarts it with sound ---------- */
  const hv = $('#hero-video'), hs = $('#hero-sound');
  if (hv && hs) {
    if (reduce) { hv.removeAttribute('autoplay'); hv.pause(); hv.controls = true; }
    hs.addEventListener('click', () => {
      hv.muted = false; hv.loop = false; hv.currentTime = 0; hv.controls = true; hv.play().catch(() => {}); hs.hidden = true;
      track('hero_video_sound');
    });
  }

  /* ---------- showcase reel ---------- */
  const rv = $('#reel-video'), tabs = $$('.reel__tab');
  function show(id, play) {
    const r = REEL[id]; if (!r || !rv) return;
    tabs.forEach((t) => t.setAttribute('aria-selected', t.dataset.id === id ? 'true' : 'false'));
    rv.pause();
    rv.innerHTML = `<source src="${r.mp4}" type="video/mp4"><source src="${r.webm}" type="video/webm"><track kind="captions" src="${r.vtt}" srclang="en" label="English" default>`;
    rv.poster = r.poster; rv.load();
    $('#reel-title').textContent = r.title;
    $('#reel-desc').textContent = r.desc;
    $('#reel-deck').href = r.deck;
    $('#reel-slides').innerHTML = Array.from({ length: r.slides }, (_, i) => `<img src="${r.slideDir}/slide-${i + 1}.jpg" alt="Original slide ${i + 1}" loading="lazy" width="480" height="270">`).join('');
    if (play) rv.play().catch(() => {});
  }
  tabs.forEach((t) => t.addEventListener('click', () => { show(t.dataset.id, true); track('showcase_select', { video: t.dataset.id }); }));
  $$('[data-reel]').forEach((a) => a.addEventListener('click', () => show(a.dataset.reel, false)));
  if (rv) {
    show('explainer', false);
    rv.addEventListener('play', () => { const s = tabs.find((t) => t.getAttribute('aria-selected') === 'true'); track('showcase_play', { video: s ? s.dataset.id : '' }); if (hv && !hv.muted) hv.pause(); });
    rv.addEventListener('ended', () => {   // roll on to the next video
      const i = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
      if (i < tabs.length - 1) show(tabs[i + 1].dataset.id, true);
    });
  }

  /* ---------- before / after ---------- */
  $$('[data-ba]').forEach((ba) => {
    const r = $('.ba__range', ba);
    const set = () => ba.style.setProperty('--x', r.value + '%');
    r.addEventListener('input', set); set();
    let once = false; r.addEventListener('change', () => { if (!once) { once = true; track('compare_used'); } });
  });

  /* ---------- header: light over light sections ---------- */
  const header = $('[data-header]');
  const lights = $$('.px-compare, .px-how, .px-faq');
  function headerState() {
    if (!header) return;
    const y = header.offsetHeight / 2;
    header.classList.toggle('is-light', lights.some((el) => { const b = el.getBoundingClientRect(); return b.top <= y && b.bottom >= y; }));
  }
  let ticking = false;
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; headerState(); }); } }, { passive: true });
  headerState();

  /* ---------- clicks ---------- */
  document.addEventListener('click', (ev) => {
    const a = ev.target.closest && ev.target.closest('a[href]');
    if (!a) return;
    if (a.dataset.plan) track('begin_checkout', { plan: a.dataset.plan, currency: 'AUD', location: a.dataset.cta || '' });
    if (a.dataset.cta) track('cta_click', { location: a.dataset.cta });
    else if (/^mailto:/i.test(a.getAttribute('href'))) track('contact_click');
  });
})();
