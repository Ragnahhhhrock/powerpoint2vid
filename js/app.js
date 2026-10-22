/* PowerPoint2Vid app: UI, narration, playback and recording. */
(function () {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const R = window.SlideRender;
  const stage = $('stage'), ctx = stage.getContext('2d');
  let deck = null, current = 0, running = null; // running = {cancel(), recording}
  const synth = window.speechSynthesis;

  /* ---------- analytics (GA4 custom events; never sends file names or slide content) ---------- */
  const track = (name, params) => { try { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); } catch (e) { /* analytics must never break the app */ } };
  const optParams = (o) => ({ video_style: o.style.id, voice_source: o.source, transition: o.trans, speed: o.rate, min_seconds: o.minSec, animate: o.animate, captions: o.captions, zoom: o.kenburns, tab_audio: o.tabAudio });

  /* Aggregate usage counters (counts only; see functions/api/stats.js) */
  const count = (body) => { try { fetch('/api/stats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), keepalive: true }).catch(() => {}); } catch (e) { /* never break the app */ } };

  /* ---------- settings ---------- */
  const opts = () => ({
    voiceURI: $('voice').value, rate: +$('rate').value, source: $('source').value, trans: $('trans').value,
    minSec: +$('minsec').value, animate: $('anim').checked, captions: $('caps').checked, kenburns: $('kb').checked, tabAudio: $('tabaudio').checked, style: window.VideoStyles.get($('vstyle').value)
  });

  /* ---------- video styles (presets from js/video-styles.js) ---------- */
  $('vstyle').innerHTML = window.VideoStyles.list.map((v) => `<option value="${v.id}">${v.name}</option>`).join('');
  function describeStyle() {
    const v = window.VideoStyles.get($('vstyle').value);
    const credit = v.sources.length ? ' Adapted from prompts by ' + v.sources.map((c) => `<a href="${c.prompt}" target="_blank" rel="noopener">${c.author}</a>`).join(' and ') + '.' : '';
    $('vstyle-desc').innerHTML = v.desc + credit;
  }
  describeStyle();
  $('vstyle').addEventListener('change', () => {
    const v = window.VideoStyles.get($('vstyle').value);
    $('trans').value = v.trans; describeStyle();
    track('select_video_style', { video_style: v.id });
    if (deck && !running) gotoSlide(current);
  });
  $('rate').addEventListener('input', () => ($('rate-out').textContent = (+$('rate').value).toFixed(1) + '×'));
  $('minsec').addEventListener('input', () => ($('min-out').textContent = $('minsec').value + 's'));

  function loadVoices() {
    if (!synth) { $('voice').innerHTML = '<option value="">Text-to-speech not supported</option>'; return; }
    const vs = synth.getVoices().sort((a, b) => (/^en/.test(b.lang) - /^en/.test(a.lang)) || a.name.localeCompare(b.name));
    if (!vs.length) return;
    const prev = $('voice').value;
    $('voice').innerHTML = vs.map((v) => `<option value="${v.voiceURI}">${v.name} (${v.lang})</option>`).join('');
    if (prev) $('voice').value = prev;
  }
  loadVoices();
  if (synth) synth.onvoiceschanged = loadVoices;

  /* ---------- intake ---------- */
  const status = (t) => ($('status').textContent = t);
  const setProgress = (f) => { $('bar').style.width = Math.round(f * 100) + '%'; $('bar').parentElement.setAttribute('aria-valuenow', Math.round(f * 100)); };

  function tab(which) {
    const ppt = which === 'ppt';
    $('tab-ppt').setAttribute('aria-selected', ppt); $('tab-gs').setAttribute('aria-selected', !ppt);
    $('pane-ppt').hidden = !ppt; $('pane-gs').hidden = ppt;
  }
  $('tab-ppt').onclick = () => { tab('ppt'); track('select_input_tab', { input_tab: 'pptx' }); }; $('tab-gs').onclick = () => { tab('gs'); track('select_input_tab', { input_tab: 'google_slides' }); };

  $('gs-open').onclick = () => {
    const m = $('gs-url').value.match(/\/presentation\/d\/([\w-]+)/);
    if (!m) { alert('Paste a Google Slides link that looks like docs.google.com/presentation/d/…'); return; }
    track('google_slides_download');
    window.open('https://docs.google.com/presentation/d/' + m[1] + '/export/pptx', '_blank', 'noopener');
  };

  const drop = $('drop');
  ['dragenter', 'dragover'].forEach((e) => drop.addEventListener(e, (ev) => { ev.preventDefault(); drop.classList.add('is-over'); }));
  ['dragleave', 'drop'].forEach((e) => drop.addEventListener(e, (ev) => { ev.preventDefault(); drop.classList.remove('is-over'); }));
  drop.addEventListener('drop', (ev) => { const f = ev.dataTransfer.files[0]; if (f) handleFile(f); });
  $('file').addEventListener('change', (ev) => { const f = ev.target.files[0]; if (f) handleFile(f); });

  async function handleFile(file) {
    if (!/\.pptx$/i.test(file.name)) { alert('Please choose a .pptx file. For older .ppt files, open them in PowerPoint and Save As .pptx.'); return; }
    track('deck_upload', { file_size_kb: Math.round(file.size / 1024) });
    show(true); status('Reading slides…'); setProgress(0.05);
    try {
      const d = await window.parsePptx(await file.arrayBuffer(), (n, t) => { setProgress(0.05 + 0.9 * (n / t)); status('Reading slide ' + (n + 1) + ' of ' + t + '…'); });
      loadDeck(d);
    } catch (e) { console.error(e); track('deck_parse_error'); show(false); alert('Sorry, that file could not be read: ' + e.message); }
  }

  function show(playerOn) { $('intake').hidden = playerOn; $('player').hidden = !playerOn; }

  function loadDeck(d, isSample) {
    deck = d; current = 0;
    if (!isSample) count({ type: 'deck', slides: d.slides.length });
    track('deck_loaded', { slide_count: d.slides.length });
    const canvasH = 720, canvasW = Math.round((canvasH * d.W) / d.H);
    stage.width = canvasW; stage.height = canvasH;
    stage.parentElement.style.aspectRatio = d.W + '/' + d.H;
    buildStrip(); gotoSlide(0);
    setProgress(0); status(d.slides.length + ' slides ready. Preview with voice, or export the video.');
    show(true);
  }

  function buildStrip() {
    const strip = $('strip'); strip.innerHTML = '';
    deck.slides.forEach((s, i) => {
      const b = document.createElement('button'); b.className = 'thumb'; b.setAttribute('role', 'listitem'); b.setAttribute('aria-label', 'Slide ' + (i + 1) + ': ' + s.title.slice(0, 60));
      const c = document.createElement('canvas'); c.width = 224; c.height = Math.round((224 * deck.H) / deck.W);
      R.drawSlide(c.getContext('2d'), s, 1, { animate: false, kenburns: false });
      b.appendChild(c); b.onclick = () => { stopAll(); gotoSlide(i); }; strip.appendChild(b);
    });
  }
  function gotoSlide(i) {
    current = i; R.drawStill(ctx, deck.slides[i], opts(), { idx: i, total: deck.slides.length });
    Array.from($('strip').children).forEach((b, j) => b.setAttribute('aria-current', j === i ? 'true' : 'false'));
  }

  /* ---------- narration ---------- */
  function scriptFor(slide, o) {
    if (o.source === 'none') return '';
    if (o.source === 'notes') return slide.notes;
    if (o.source === 'text') return slide.text;
    return slide.notes || slide.text;
  }
  function estSeconds(text, o) {
    const words = text ? text.split(/\s+/).length : 0;
    return Math.max(o.minSec, text ? words / (2.6 * o.rate) + 1.2 : o.minSec);
  }
  function speak(text, o, state) {
    // Chrome stops long utterances, so speak sentence by sentence.
    return new Promise((resolve) => {
      if (!synth || !text) return resolve();
      const parts = R.sentences(text); let i = 0;
      const voice = synth.getVoices().find((v) => v.voiceURI === o.voiceURI);
      const next = () => {
        if (state.cancelled || i >= parts.length) return resolve();
        const u = new SpeechSynthesisUtterance(parts[i++]);
        if (voice) { u.voice = voice; u.lang = voice.lang; }
        u.rate = o.rate; u.onend = next; u.onerror = next;
        synth.speak(u);
      };
      synth.cancel(); next();
    });
  }

  /* ---------- playback / recording ---------- */
  const raf = () => new Promise((r) => requestAnimationFrame(r));

  async function playDeck(o, recording) {
    const state = { cancelled: false };
    running = { state, cancel() { state.cancelled = true; if (synth) synth.cancel(); } };
    $('stop').hidden = false; $('play').disabled = true; $('export').disabled = true;
    let prev = null;
    for (let i = 0; i < deck.slides.length && !state.cancelled; i++) {
      const slide = deck.slides[i], text = scriptFor(slide, o), est = estSeconds(text, o);
      const caps = R.sentences(text), total = caps.reduce((a, c) => a + c.length, 0) || 1;
      current = i; Array.from($('strip').children).forEach((b, j) => b.setAttribute('aria-current', j === i ? 'true' : 'false'));
      status((recording ? 'Recording' : 'Playing') + ' slide ' + (i + 1) + ' of ' + deck.slides.length + '…');
      let spoken = !text;
      if (text && (!recording || o.tabAudio)) speak(text, o, state).then(() => (spoken = true)); else spoken = true;
      const t0 = performance.now();
      for (;;) {
        if (state.cancelled) break;
        const el = (performance.now() - t0) / 1000;
        if (el >= est && spoken) break;
        const p = Math.min(1, el / est);
        R.drawFrame(ctx, slide, prev, p, o, el, { idx: i, total: deck.slides.length });
        if (o.captions && caps.length) {
          let acc = 0, shown = caps[caps.length - 1];
          for (const c of caps) { acc += c.length / total; if (p <= acc) { shown = c; break; } }
          R.drawCaption(ctx, shown, o.style);
        }
        if (recording && o.watermark) R.drawWatermark(ctx);
        setProgress((i + Math.min(1, el / est)) / deck.slides.length);
        await raf();
      }
      prev = slide;
    }
    running = null; $('stop').hidden = true; $('play').disabled = false; $('export').disabled = false;
    return !state.cancelled;
  }
  function stopAll() { if (running) running.cancel(); }

  $('play').onclick = async () => {
    track('preview_start', optParams(opts()));
    const ok = await playDeck(opts(), false);
    status(ok ? 'Done. Export the video when you are happy.' : 'Stopped.'); setProgress(0); gotoSlide(current);
  };
  $('stop').onclick = stopAll;
  $('reset').onclick = () => { track('new_deck'); stopAll(); deck = null; $('file').value = ''; show(false); };

  /* ---------- plans: Basic exports carry a watermark; Pro removes it (and adds Opus-directed videos in Studio) ---------- */
  const upsell = $('paywall');
  let watermark = true;
  async function exportPlan() {
    let me = await window.P2V.get();
    if (!me.pro) me = await window.P2V.get(true); // they may have just subscribed in another tab
    if (me.pro) return 'pro';
    track('upsell_shown', { logged_in: !!me.loggedIn });
    $('paywall-login').hidden = !!me.loggedIn;
    return new Promise((resolve) => {
      $('paywall-basic').onclick = () => { upsell.close(); resolve('basic'); };
      $('paywall-close').onclick = () => { upsell.close(); resolve(null); };
      $('paywall-retry').onclick = async () => { upsell.close(); const m = await window.P2V.get(true); resolve(m.pro ? 'pro' : 'basic'); };
      if (upsell.showModal) upsell.showModal(); else upsell.setAttribute('open', '');
    });
  }

  $('export').onclick = async () => {
    const plan = await exportPlan();
    if (!plan) return;
    watermark = plan !== 'pro';
    track('export_plan', { plan });
    const o = Object.assign(opts(), { watermark });
    if (!window.MediaRecorder) { track('export_unsupported'); alert('Your browser cannot record video. Please use Chrome, Edge or Firefox on a desktop.'); return; }
    const stream = stage.captureStream(30);
    let displayStream = null;
    if (o.tabAudio && o.source !== 'none') {
      try {
        displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true, preferCurrentTab: true, selfBrowserSurface: 'include' });
        const at = displayStream.getAudioTracks()[0];
        if (at) stream.addTrack(at); else status('No tab audio was shared, so the video will be silent.');
        displayStream.getVideoTracks().forEach((t) => t.stop());
      } catch (e) { status('Tab audio was not shared. Recording a silent video with captions.'); }
    }
    const types = ['video/mp4;codecs=avc1', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];
    const mime = types.find((t) => MediaRecorder.isTypeSupported(t)) || '';
    track('export_start', Object.assign({ slide_count: deck.slides.length }, optParams(o)));
    const rec = new MediaRecorder(stream, Object.assign({ videoBitsPerSecond: 6e6 }, mime ? { mimeType: mime } : {}));
    const chunks = []; rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    const done = new Promise((r) => (rec.onstop = r));
    rec.start(500);
    const t0 = Date.now();
    const ok = await playDeck(o, true);
    await new Promise((r) => setTimeout(r, 400));
    rec.stop(); await done;
    if (displayStream) displayStream.getTracks().forEach((t) => t.stop());
    if (!ok) { track('export_cancel'); status('Export cancelled.'); setProgress(0); return; }
    const ext = /mp4/.test(rec.mimeType) ? 'mp4' : 'webm';
    const url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'video/webm' }));
    const a = document.createElement('a'); a.href = url; a.download = 'powerpoint2vid-explainer.' + ext; document.body.appendChild(a); a.click(); a.remove();
    count({ type: 'video', seconds: (Date.now() - t0) / 1000 });
    track('export_complete', { format: ext, slide_count: deck.slides.length, size_mb: +(chunks.reduce((n, c) => n + c.size, 0) / 1048576).toFixed(1) });
    status(watermark ? 'Exported powerpoint2vid-explainer.' + ext + ' (Basic, with watermark). Pro removes the watermark and adds Opus-directed videos.' : 'Exported powerpoint2vid-explainer.' + ext + '.'); setProgress(1);
  };

  /* ---------- hero explainer: autoplays muted; button restarts it with sound ---------- */
  const hv = $('hero-video'), hs = $('hero-sound');
  if (hv && hs) {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) { hv.removeAttribute('autoplay'); hv.pause(); hv.controls = true; }
    hs.onclick = () => {
      if (hv.muted) { hv.muted = false; hv.loop = false; hv.currentTime = 0; hv.controls = true; hv.play().catch(() => {}); hs.hidden = true; track('hero_video_sound'); }
    };
  }

  /* ---------- outbound / CTA clicks ---------- */
  document.addEventListener('click', (ev) => {
    const a = ev.target.closest && ev.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (a.classList.contains('btn--accent') && href === '#app') track('cta_click', { location: 'hero' });
    else if (a.dataset.cta) track('cta_click', { location: a.dataset.cta });
    else if (/^mailto:/i.test(href)) track('contact_click');
    else if (/^https?:\/\//i.test(href) && new URL(href).host !== location.host) track('outbound_click', { link_domain: new URL(href).hostname });
  });

  /* ---------- sample deck ---------- */
  function sample() {
    const W = 12190000 + 2000, H = 6858000, E = 914400;
    const mk = (x, y, w, h, o) => Object.assign({ kind: 'shape', box: { x: x * E, y: y * E, w: w * E, h: h * E, rot: 0 }, fill: null, stroke: null, prst: 'rect', paras: [], isTitle: false, defSz: 24, fontScale: 1, anchor: 't', ins: { l: 91440, t: 45720, r: 91440, b: 45720 }, defColor: '#0e1330', text: '', order: 0 }, o);
    const para = (t, o) => Object.assign({ algn: 'l', lvl: 0, bullet: false, runs: [{ t, sz: null, b: null, i: false, color: null }], emptySz: null }, o);
    const title = (t, color) => mk(0.7, 0.55, 11.9, 1.3, { isTitle: true, defSz: 40, anchor: 'ctr', paras: [para(t)], text: t, defColor: color || '#0e1330' });
    const bullets = (arr) => mk(0.7, 2.1, 7.2, 4.6, { defSz: 26, paras: arr.map((t) => para(t, { bullet: true })), text: arr.join('\n') });
    const chip = (x, y, c, t) => mk(x, y, 3.8, 1.2, { fill: c, prst: 'roundRect', anchor: 'ctr', defSz: 26, defColor: '#ffffff', paras: [para(t, { algn: 'ctr' })], text: t });
    const mkSlide = (i, bg, shapes, notes) => ({ index: i, W, H, bg, bgImage: null, shapes, title: shapes[0].text, text: shapes.map((s) => s.text).filter(Boolean).join('. '), notes });
    const slides = [
      mkSlide(0, '#0e1330', [title('Turn slides into explainer videos', '#ffffff'), mk(0.7, 2.2, 11, 1.5, { defSz: 28, defColor: '#aab0d4', paras: [para('Narrated. Animated. Private.')], text: 'Narrated. Animated. Private.' }), chip(0.7, 4.4, '#6d4aff', 'PowerPoint'), chip(4.9, 4.4, '#ff6b4a', 'Google Slides')],
        'Welcome to PowerPoint2Vid. This short sample shows how a slide deck becomes a narrated explainer video, right in your browser.'),
      mkSlide(1, '#f8f7fc', [title('How it works'), bullets(['Drop in a PowerPoint deck', 'Your speaker notes become the voiceover', 'Shapes animate in, slides transition', 'Export a finished video']), chip(8.4, 2.6, '#6d4aff', 'Drop'), chip(8.4, 4.1, '#1fbf8f', 'Narrate'), chip(8.4, 5.6, '#ff6b4a', 'Export')],
        'It works in four steps. Drop in your deck. Your speaker notes become the voiceover. Shapes animate in one by one. Then export your finished video.'),
      mkSlide(2, '#ffffff', [title('Built to be shared'), bullets(['Narration from your speaker notes', 'Animated reveals and captions']), chip(8.4, 3.2, '#0e1330', 'Ready to share')],
        'Your speaker notes become the narration, with animated reveals and captions, ready to share. Try it with your own deck now.')
    ];
    return { W, H, slides };
  }
  $('sample').onclick = (e) => { e.preventDefault(); track('sample_deck'); loadDeck(sample(), true); };
  window.__p2v = { loadDeck, sample };
})();
