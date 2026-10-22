/* PowerPoint2Vid scene runtime.
 *
 * Contract for generated scenes (what Opus writes):
 *   P2V.scene(function build(ctx) { ... });
 * ctx = {
 *   stage   : the 1920x1080 root element to draw into
 *   tl      : a PAUSED gsap timeline; add every animation to it (positions in seconds)
 *   dur     : scene length in seconds (narration + padding)
 *   beats   : array of {t, text} — when each narration sentence starts (seconds into the scene)
 *   brief   : deck design brief {palette:{...}, font, motion}
 *   slide   : parsed slide {title, text, notes, image}  (image = URL of the original slide render)
 *   asset(n): URL of an asset from the job's assets folder
 *   el(tag, cls, parent, css) : helper that creates an element
 *   onFrame(fn(t)) : per-frame hook for canvas/procedural drawing (called after each seek)
 *   rand(seed) : seeded PRNG (never use Math.random: frames must be deterministic)
 *   at(i, word): time the narrator says `word` in beat i (exact when the voice gave word timings, else estimated)
 *   split(el, text, by='char'|'word') : fills el with spans, returns them
 *   fx.grain({opacity}) / fx.vignette({strength}) : shared finishing layers
 * }
 * Rules: no CSS animations/transitions, no timers, no network, no Math.random, no Date.
 * The renderer calls __seek(t) for every frame, so the timeline IS the video.
 */
(function () {
  'use strict';
  let builder = null;
  window.P2V = {
    scene(fn) { builder = fn; },
    async boot(jobUrl, index) {
      const job = await (await fetch(jobUrl.replace(/\/$/, '') + '/plan.json')).json();
      const sc = job.scenes[index];
      const brief = job.brief || {};
      const root = document.documentElement.style;
      Object.entries(brief.palette || {}).forEach(([k, v]) => root.setProperty('--' + k, v));
      if (brief.font) root.setProperty('--font', brief.font);

      await new Promise((res, rej) => {
        const s = document.createElement('script');
        s.src = jobUrl.replace(/\/$/, '') + '/' + sc.file + '?v=' + Date.now();
        s.onload = res; s.onerror = () => rej(new Error('scene load failed: ' + sc.file));
        document.head.appendChild(s);
      });
      if (!builder) throw new Error('scene did not call P2V.scene()');

      gsap.ticker.lagSmoothing(0);
      gsap.ticker.sleep();                      // we drive time ourselves
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
      const frameHooks = [];
      const stage = document.getElementById('stage');
      const ctx = {
        stage, tl, dur: sc.duration, beats: sc.beats || [], brief, slide: sc.slide || {},
        asset: (n) => jobUrl.replace(/\/$/, '') + '/assets/' + n,
        el(tag, cls, parent, css) {
          const e = document.createElement(tag || 'div');
          if (cls) e.className = cls;
          if (css) Object.assign(e.style, css);
          (parent || stage).appendChild(e); return e;
        },
        onFrame(fn) { frameHooks.push(fn); },
        rand(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); },
        beat(i, fallback) { const b = ctx.beats[i]; return b ? b.t : (fallback != null ? fallback : 0); },
        at(i, word) {
          const b = ctx.beats[i]; if (!b) return 0;
          const end = b.end != null ? b.end : (ctx.beats[i + 1] ? ctx.beats[i + 1].t : ctx.dur - 1);
          if (!word) return b.t;
          const norm = (x) => String(x).toLowerCase().replace(/[^a-z0-9]/g, '');
          const target = norm(String(word).trim().split(/\s+/)[0]);   // a phrase is timed from its first word
          if (b.words && target) { const w = b.words.find((x) => norm(x.w).startsWith(target)) || b.words.find((x) => norm(x.w).includes(target)); if (w) return w.t; }
          const k = b.text.toLowerCase().indexOf(String(word).toLowerCase());
          return k < 0 ? b.t : b.t + (end - b.t) * (k / b.text.length);
        },
        split(el, text, by) {
          el.textContent = '';
          const parts = by === 'word' ? text.split(/(\s+)/) : Array.from(text);
          return parts.map((p) => {
            if (/^\s+$/.test(p)) { el.appendChild(document.createTextNode(p)); return null; }
            const s = document.createElement('span'); s.textContent = p; s.style.display = 'inline-block';
            el.appendChild(s); return s;
          }).filter(Boolean);
        },
        fx: {
          grain(o) {
            o = o || {}; const c = document.createElement('canvas'); c.width = 480; c.height = 270;
            Object.assign(c.style, { position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: o.opacity || 0.06, mixBlendMode: o.blend || 'overlay', pointerEvents: 'none', zIndex: 999 });
            stage.appendChild(c); const g = c.getContext('2d'); const img = g.createImageData(480, 270);
            frameHooks.push((t) => {
              const r = ctx.rand(1 + Math.floor(t * (o.fps || 24)) * 7919);
              for (let i = 0; i < img.data.length; i += 4) { const v = r() * 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
              g.putImageData(img, 0, 0);
            });
            return c;
          },
          vignette(o) {
            o = o || {}; const v = document.createElement('div');
            Object.assign(v.style, { position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 998,
              background: `radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(0,0,0,${o.strength || 0.55}) 100%)` });
            stage.appendChild(v); return v;
          }
        }
      };
      await builder(ctx);
      if (tl.duration() < sc.duration) tl.set({}, {}, sc.duration);   // pad to full length

      // wait for fonts and images so frame 0 is complete
      await document.fonts.ready;
      await Promise.all(Array.from(document.images).map((im) => im.decode().catch(() => {})));

      window.__seek = (t) => { tl.seek(t, false); frameHooks.forEach((f) => f(t)); };
      window.__meta = { duration: sc.duration, timeline: tl.duration() };
      window.__seek(0);
      window.__ready = true;
    }
  };
  window.addEventListener('error', (e) => { window.__error = String(e.message || e); });
  window.addEventListener('unhandledrejection', (e) => { window.__error = String(e.reason && e.reason.message || e.reason); });
})();
