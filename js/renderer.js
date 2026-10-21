/* Canvas renderer + animation timeline for the slide model. */
(function (global) {
  'use strict';
  const EMU_PT = 12700;
  const ease = (t) => (t < 0 ? 0 : t > 1 ? 1 : 1 - Math.pow(1 - t, 3));
  const FONT = 'Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

  function fontStr(px, bold, italic) { return (italic ? 'italic ' : '') + (bold ? '700 ' : '400 ') + px + 'px ' + FONT; }

  /* Lay out paragraphs into lines at a given scale; returns {lines, height}. */
  function layout(ctx, shape, k, pxPerPt, maxW, scale) {
    const lines = [];
    let height = 0;
    shape.paras.forEach((p) => {
      const baseSz = (p.runs.find((r) => r.sz) || {}).sz || p.emptySz || shape.defSz;
      const size = baseSz * shape.fontScale * scale * pxPerPt;
      const indent = p.bullet ? size * 1.1 * (1 + p.lvl) : 0;
      const bold = shape.isTitle;
      const words = [];
      p.runs.forEach((r) => {
        if (r.t === '\n') { words.push({ br: true }); return; }
        r.t.split(/(\s+)/).forEach((w) => { if (w) words.push({ w, run: r }); });
      });
      let cur = [], curW = 0, first = true;
      const flush = () => {
        lines.push({ words: cur, size, algn: p.algn, indent, bullet: first && p.bullet, width: curW, spaceBefore: first ? size * 0.35 : 0 });
        height += size * 1.2 + (first ? size * 0.35 : 0);
        cur = []; curW = 0; first = false;
      };
      if (!p.runs.length) { cur = []; flush(); return; }
      words.forEach((wd) => {
        if (wd.br) { flush(); return; }
        const sz = (wd.run.sz || baseSz) * shape.fontScale * scale * pxPerPt;
        ctx.font = fontStr(sz, wd.run.b != null ? wd.run.b : bold, wd.run.i);
        const wpx = ctx.measureText(wd.w).width;
        if (curW + wpx > maxW - indent && cur.length && wd.w.trim()) flush();
        if (!cur.length && !wd.w.trim()) return;
        cur.push({ w: wd.w, px: sz, wpx, run: wd.run });
        curW += wpx;
      });
      flush();
    });
    return { lines, height };
  }

  function drawShapeBox(ctx, s, k) {
    const b = s.box, x = b.x * k, y = b.y * k, w = b.w * k, h = b.h * k;
    ctx.save();
    if (b.rot) { ctx.translate(x + w / 2, y + h / 2); ctx.rotate((b.rot * Math.PI) / 180); ctx.translate(-(x + w / 2), -(y + h / 2)); }
    if (s.fill || s.stroke) {
      ctx.beginPath();
      if (s.prst === 'ellipse') ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
      else if (s.prst === 'roundRect') ctx.roundRect(x, y, w, h, Math.min(w, h) * 0.16);
      else ctx.rect(x, y, w, h);
      if (s.fill) { ctx.fillStyle = s.fill; ctx.fill(); }
      if (s.stroke) { ctx.strokeStyle = s.stroke; ctx.lineWidth = Math.max(1, k * 12700); ctx.stroke(); }
    }
    ctx.restore();
  }

  function drawText(ctx, s, k) {
    if (!s.text) return;
    const b = s.box, pxPerPt = EMU_PT * k;
    const x = (b.x + s.ins.l) * k, y = (b.y + s.ins.t) * k;
    const w = (b.w - s.ins.l - s.ins.r) * k, h = (b.h - s.ins.t - s.ins.b) * k;
    let scale = 1, L = layout(ctx, s, k, pxPerPt, w, scale);
    for (let i = 0; i < 12 && L.height > h * 1.02 && scale > 0.45; i++) { scale *= 0.92; L = layout(ctx, s, k, pxPerPt, w, scale); }
    let cy = s.anchor === 'ctr' ? y + (h - L.height) / 2 : s.anchor === 'b' ? y + h - L.height : y;
    ctx.save();
    if (b.rot) { ctx.translate((b.x + b.w / 2) * k, (b.y + b.h / 2) * k); ctx.rotate((b.rot * Math.PI) / 180); ctx.translate(-(b.x + b.w / 2) * k, -(b.y + b.h / 2) * k); }
    ctx.textBaseline = 'alphabetic';
    L.lines.forEach((ln) => {
      cy += ln.spaceBefore;
      const base = cy + ln.size * 0.95;
      let lx = x + ln.indent;
      const avail = w - ln.indent;
      if (ln.algn === 'ctr') lx += (avail - ln.width) / 2;
      else if (ln.algn === 'r') lx += avail - ln.width;
      const first = ln.words[0];
      const color = (first && first.run.color) || s.defColor;
      if (ln.bullet) { ctx.fillStyle = color; ctx.font = fontStr(ln.size, false); ctx.fillText('•', x + ln.indent - ln.size * 0.9, base); }
      ln.words.forEach((wd) => {
        ctx.font = fontStr(wd.px, wd.run.b != null ? wd.run.b : s.isTitle, wd.run.i);
        ctx.fillStyle = wd.run.color || s.defColor;
        ctx.fillText(wd.w, lx, base);
        lx += wd.wpx;
      });
      cy += ln.size * 1.2;
    });
    ctx.restore();
  }

  function drawPic(ctx, s, k, kb) {
    const b = s.box, x = b.x * k, y = b.y * k, w = b.w * k, h = b.h * k;
    const im = s.img, c = s.crop || { l: 0, t: 0, r: 0, b: 0 };
    const sx = im.naturalWidth * c.l, sy = im.naturalHeight * c.t;
    const sw = im.naturalWidth * (1 - c.l - c.r), sh = im.naturalHeight * (1 - c.t - c.b);
    ctx.save();
    ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    const z = 1 + 0.06 * kb;
    ctx.translate(x + w / 2, y + h / 2); ctx.scale(z, z); ctx.translate(-(x + w / 2), -(y + h / 2));
    try { ctx.drawImage(im, sx, sy, sw, sh, x, y, w, h); } catch (e) { /* ignore broken image */ }
    ctx.restore();
  }

  function drawTable(ctx, s, k) {
    const b = s.box, x = b.x * k, y = b.y * k, w = b.w * k, h = b.h * k;
    const rows = s.rows.length, cols = Math.max(...s.rows.map((r) => r.length));
    const rh = h / rows, cw = w / cols, fz = Math.min(rh * 0.5, 28);
    ctx.save();
    s.rows.forEach((r, i) => r.forEach((t, j) => {
      ctx.fillStyle = i === 0 ? s.accent : (i % 2 ? '#f2f2f5' : '#ffffff');
      ctx.fillRect(x + j * cw, y + i * rh, cw, rh);
      ctx.strokeStyle = '#d6d6e0'; ctx.strokeRect(x + j * cw, y + i * rh, cw, rh);
      ctx.fillStyle = i === 0 ? '#ffffff' : s.defColor; ctx.font = fontStr(fz, i === 0);
      ctx.textBaseline = 'middle'; ctx.fillText(String(t).slice(0, 40), x + j * cw + fz * 0.5, y + i * rh + rh / 2, cw - fz);
    }));
    ctx.restore();
  }

  /* ---------- video style helpers (see js/video-styles.js) ---------- */
  const MONO = 'ui-monospace, "IBM Plex Mono", Menlo, Consolas, monospace';
  const DISPLAY = '"Archivo Black", "Arial Black", Impact, ' + FONT;
  const clamp01 = (t) => (t < 0 ? 0 : t > 1 ? 1 : t);
  const smooth = (t) => { t = clamp01(t); return t * t * (3 - 2 * t); };
  /* Closed-form damped spring step response: 0 -> 1 with overshoot set by zeta. */
  function spring(t, zeta, w) {
    if (t <= 0) return 0;
    const wd = w * Math.sqrt(1 - zeta * zeta);
    return 1 - Math.exp(-zeta * w * t) * (Math.cos(wd * t) + ((zeta * w) / wd) * Math.sin(wd * t));
  }
  const DEFAULT_STYLE = { motion: 'fade-up', frame: { bg: '#000' }, camera: 'none', caption: 'box', fx: {} };

  /* Entrance state for one shape at raw progress u (0..1 of its reveal window). */
  function entrance(motion, u, H) {
    switch (motion) {
      case 'spring': { const v = spring(u * 1.6, 0.62, 9); return { a: clamp01(u * 3), dy: (1 - v) * 0.035 * H, s: 0.94 + 0.06 * v, blur: (1 - clamp01(u * 2.5)) * 6 }; }
      case 'slam': { const v = spring(u * 1.4, 0.38, 11); return { a: clamp01(u * 6), dy: (1 - v) * 0.16 * H, s: 1, blur: 0, impact: u > 0.18 && u < 0.34 }; }
      case 'blur': { const t = smooth(u); return { a: t, dy: 0, s: 1.035 - 0.035 * t, blur: (1 - t) * 14 }; }
      default: { const t = ease(u); return { a: t, dy: (1 - t) * 0.04 * H, s: 1, blur: 0 }; }
    }
  }

  let grainPat = null;
  function grain(ctx, amt) {
    if (!grainPat) {
      const g = document.createElement('canvas'); g.width = g.height = 160;
      const gx = g.getContext('2d'), id = gx.createImageData(160, 160);
      for (let i = 0; i < id.data.length; i += 4) { const v = Math.random() * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255; }
      gx.putImageData(id, 0, 0); grainPat = ctx.createPattern(g, 'repeat');
    }
    const cw = ctx.canvas.width, ch = ctx.canvas.height;
    ctx.save(); ctx.globalAlpha = amt; ctx.globalCompositeOperation = 'overlay';
    ctx.translate(-Math.random() * 160, -Math.random() * 160); ctx.fillStyle = grainPat; ctx.fillRect(0, 0, cw + 160, ch + 160);
    ctx.restore();
  }
  function vignette(ctx, amt) {
    const cw = ctx.canvas.width, ch = ctx.canvas.height;
    const g = ctx.createRadialGradient(cw / 2, ch / 2, Math.min(cw, ch) * 0.35, cw / 2, ch / 2, Math.hypot(cw, ch) * 0.6);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,' + amt + ')');
    ctx.save(); ctx.fillStyle = g; ctx.fillRect(0, 0, cw, ch); ctx.restore();
  }
  let tint = null;
  /* Print misregistration: colour fringes on edges (frame minus offset copy), works on light and dark slides. */
  function misregister(ctx, colors) {
    const cw = ctx.canvas.width, ch = ctx.canvas.height, off = Math.max(2, Math.round(ch / 240));
    if (!tint) tint = document.createElement('canvas');
    tint.width = cw; tint.height = ch;
    const tx = tint.getContext('2d');
    const snap = document.createElement('canvas'); snap.width = cw; snap.height = ch; snap.getContext('2d').drawImage(ctx.canvas, 0, 0);
    colors.forEach((c, i) => {
      const dx = i ? -off : off, dy = i ? off * 0.5 : -off * 0.5;
      tx.globalCompositeOperation = 'source-over'; tx.drawImage(snap, 0, 0);
      tx.globalCompositeOperation = 'difference'; tx.drawImage(snap, dx, dy);
      tx.globalCompositeOperation = 'multiply'; tx.fillStyle = c; tx.fillRect(0, 0, cw, ch);
      ctx.save(); ctx.globalCompositeOperation = 'difference'; ctx.drawImage(tint, 0, 0); ctx.restore();
    });
  }
  function hud(ctx, color, info) {
    if (!info || !info.total) return;
    const cw = ctx.canvas.width, ch = ctx.canvas.height, sz = Math.round(ch * 0.022), m = ch * 0.035;
    const pad = (n) => String(n).padStart(2, '0');
    ctx.save(); ctx.font = '500 ' + sz + 'px ' + MONO; ctx.textBaseline = 'top';
    const chip = (t, x, right) => { const w = ctx.measureText(t).width + sz, cx = right ? x - w : x; ctx.fillStyle = '#0a0a0a'; ctx.fillRect(cx, m - sz * 0.35, w, sz * 1.7); ctx.fillStyle = color; ctx.fillText(t, cx + sz / 2, m); };
    chip(pad(info.idx + 1) + ' / ' + pad(info.total), m, false);
    chip('POWERPOINT2VID', cw - m, true);
    ctx.fillStyle = color;
    ctx.fillRect(m, ch - m - 2, (cw - 2 * m) * clamp01((info.idx + (info.p || 0)) / info.total), 2);
    ctx.restore();
  }
  /* Wobbly hand-drawn stroke under the slide title. */
  function underline(ctx, slide, k, t, color) {
    const s = slide.shapes.find((x) => x.isTitle && x.text);
    if (!s || t <= 0) return;
    const x0 = (s.box.x + s.ins.l) * k, w = Math.min(s.box.w * k * 0.55, s.text.length * s.defSz * k * 6000), y = (s.box.y + s.box.h) * k - 4;
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = Math.max(3, slide.H * k * 0.008); ctx.lineCap = 'round';
    ctx.beginPath();
    const N = 24, upto = Math.ceil(N * clamp01(t));
    for (let i = 0; i <= upto; i++) { const xi = x0 + (w * i) / N, yi = y + Math.sin(i * 1.7 + slide.index) * ctx.lineWidth * 0.35 + (i / N) * ctx.lineWidth * 0.6; i ? ctx.lineTo(xi, yi) : ctx.moveTo(xi, yi); }
    ctx.stroke(); ctx.restore();
  }

  /* Draw one slide at animation progress p (0..1). opts: animate, kenburns, style. Returns {impact}. */
  function drawSlide(ctx, slide, p, opts, tr) {
    const st = opts.style || DEFAULT_STYLE, fr = st.frame || {};
    const cw = ctx.canvas.width, ch = ctx.canvas.height;
    const inset = fr.card || 0;
    const k = Math.min(cw / slide.W, ch / slide.H) * (1 - 2 * inset);
    const sw = slide.W * k, sh = slide.H * k, ox = (cw - sw) / 2, oy = (ch - sh) / 2;
    let impact = false;
    ctx.save();
    if (!tr || tr.base !== false) {
      ctx.fillStyle = fr.bg || '#000'; ctx.fillRect(0, 0, cw, ch);
      if (fr.glow) { const g = ctx.createRadialGradient(cw / 2, ch * 0.45, 0, cw / 2, ch * 0.45, cw * 0.6); g.addColorStop(0, fr.glow); g.addColorStop(1, fr.bg); ctx.fillStyle = g; ctx.fillRect(0, 0, cw, ch); }
    }
    if (tr) {
      ctx.globalAlpha = tr.alpha != null ? tr.alpha : 1;
      ctx.translate(tr.dx || 0, 0);
      if (tr.scale && tr.scale !== 1) { ctx.translate(cw / 2, ch / 2); ctx.scale(tr.scale, tr.scale); ctx.translate(-cw / 2, -ch / 2); }
    }
    /* camera */
    let cs = 1, cdx = 0, cdy = 0, rot = (fr.tilt || 0) * Math.PI / 180;
    if (opts.animate !== false && opts.style) {
      if (st.camera === 'push') cs = 1 + 0.045 * smooth(p);
      else if (st.camera === 'drift') { cs = 1.0 + 0.03 * smooth(p); cdx = (smooth(p) - 0.5) * cw * 0.012; cdy = Math.sin(p * Math.PI) * -ch * 0.006; }
      else if (st.camera === 'settle') cs = 1.05 - 0.05 * spring(p * 2.2, 0.7, 7);
      if (st.fx && st.fx.boil) { const f = Math.floor(performance.now() / 125); rot += (((f * 9301 + 49297) % 233280) / 233280 - 0.5) * 0.004; cdx += ((f * 7) % 3) - 1; }
    }
    ctx.translate(cw / 2 + cdx, ch / 2 + cdy); ctx.scale(cs, cs); ctx.rotate(rot); ctx.translate(-cw / 2, -ch / 2);
    ctx.translate(ox, oy);
    const r = (fr.radius || 0) * sh;
    if (inset && fr.shadow) {
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,' + fr.shadow + ')'; ctx.shadowBlur = sh * 0.06; ctx.shadowOffsetY = sh * 0.02;
      ctx.fillStyle = slide.bg || '#fff'; ctx.beginPath(); ctx.roundRect(0, 0, sw, sh, r); ctx.fill(); ctx.restore();
    }
    ctx.beginPath(); ctx.roundRect(0, 0, sw, sh, r); ctx.clip();
    if (slide.bgImage) ctx.drawImage(slide.bgImage, 0, 0, sw, sh);
    else { ctx.fillStyle = slide.bg || '#fff'; ctx.fillRect(0, 0, sw, sh); }
    const n = slide.shapes.length;
    slide.shapes.forEach((s, i) => {
      let e = { a: 1, dy: 0, s: 1, blur: 0 };
      if (opts.animate && n > 1) {
        const start = 0.06 + (0.55 * i) / Math.max(1, n - 1);
        e = entrance(st.motion, (p - start) / 0.12, sh);
        if (e.impact) impact = true;
      }
      if (e.a <= 0) return;
      ctx.save(); ctx.globalAlpha *= e.a; ctx.translate(0, e.dy);
      if (e.s !== 1) { const b = s.box, cx = (b.x + b.w / 2) * k, cy = (b.y + b.h / 2) * k; ctx.translate(cx, cy); ctx.scale(e.s, e.s); ctx.translate(-cx, -cy); }
      if (e.blur > 0.3) ctx.filter = 'blur(' + ((e.blur * ch) / 720).toFixed(1) + 'px)';
      if (s.kind === 'pic') drawPic(ctx, s, k, opts.kenburns ? p : 0);
      else if (s.kind === 'table') drawTable(ctx, s, k);
      else { drawShapeBox(ctx, s, k); drawText(ctx, s, k); }
      ctx.restore();
    });
    if (opts.style && st.fx && st.fx.underline) underline(ctx, slide, k, opts.animate ? (p - 0.12) / 0.15 : 1, st.fx.underline);
    ctx.restore();
    return { impact };
  }

  /* Whole-frame finishing passes for a style (grain, vignette, HUD, misregistration). */
  function finish(ctx, opts, info, impact) {
    const st = opts.style; if (!st || !st.fx) return;
    const fx = st.fx;
    if (fx.misreg && impact) misregister(ctx, fx.misreg);
    if (fx.vignette) vignette(ctx, fx.vignette);
    if (fx.grain) grain(ctx, fx.grain);
    if (fx.hud) hud(ctx, fx.hud, info);
  }

  /* A still frame (static preview) with the style applied. */
  function drawStill(ctx, slide, opts, info) {
    const o = Object.assign({}, opts, { animate: false, kenburns: false });
    drawSlide(ctx, slide, 1, o); finish(ctx, o, info, false);
  }

  function wrap(ctx, text, maxW) {
    const words = text.split(' '), lines = []; let cur = '';
    words.forEach((w) => { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; });
    if (cur) lines.push(cur);
    return lines;
  }

  function drawCaption(ctx, text, style) {
    if (!text) return;
    const kind = (style && style.caption) || 'box';
    const cw = ctx.canvas.width, ch = ctx.canvas.height;
    let size = Math.round(ch * 0.038), font = '600 ' + size + 'px ' + FONT;
    if (kind === 'cinematic') { size = Math.round(ch * 0.034); font = '500 ' + size + 'px ' + FONT; }
    if (kind === 'kinetic') { text = text.toUpperCase(); size = Math.round(ch * 0.036); font = size + 'px ' + DISPLAY; }
    if (kind === 'tape') { size = Math.round(ch * 0.032); font = '500 ' + size + 'px ' + MONO; }
    ctx.save();
    ctx.font = font;
    const lines = wrap(ctx, text, cw * (kind === 'tape' ? 0.7 : 0.8));
    const lh = size * 1.3, bh = lines.length * lh + size * 0.6, bw = Math.max(...lines.map((l) => ctx.measureText(l).width)) + size * 1.2;
    const bx = (cw - bw) / 2, by = ch - bh - ch * 0.05;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const textY = (i) => by + size * 0.3 + lh * (i + 0.5);
    if (kind === 'cinematic') {
      const top = by - size * 1.5, g = ctx.createLinearGradient(0, top, 0, ch);
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.45, 'rgba(0,0,0,0.6)'); g.addColorStop(1, 'rgba(0,0,0,0.78)');
      ctx.fillStyle = g; ctx.fillRect(0, top, cw, ch - top);
      ctx.shadowColor = 'rgba(0,0,0,0.85)'; ctx.shadowBlur = size * 0.4; ctx.fillStyle = '#f5f5f5';
    } else if (kind === 'glass') {
      ctx.fillStyle = 'rgba(22,22,30,0.78)'; ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, bh / 2 > size ? size : bh / 2); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fff';
    } else if (kind === 'ui') {
      ctx.fillStyle = '#111'; ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, Math.min(bh / 2, size)); ctx.fill(); ctx.fillStyle = '#fafafa';
    } else if (kind === 'kinetic') {
      ctx.fillStyle = '#0a0a0a'; ctx.fillRect(bx, by, bw, bh); ctx.fillStyle = '#b8ff00'; ctx.fillRect(bx, by + bh - 3, bw, 3); ctx.fillStyle = '#f5f5f5';
    } else if (kind === 'tape') {
      ctx.translate(cw / 2, by + bh / 2); ctx.rotate(-0.012); ctx.translate(-cw / 2, -(by + bh / 2));
      ctx.fillStyle = 'rgba(250,247,238,0.96)'; ctx.shadowColor = 'rgba(0,0,0,0.25)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 2;
      ctx.fillRect(bx, by, bw, bh); ctx.shadowColor = 'transparent'; ctx.fillStyle = '#1d1a16';
    } else {
      ctx.fillStyle = 'rgba(14,19,48,0.82)'; ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, size * 0.4); ctx.fill(); ctx.fillStyle = '#fff';
    }
    lines.forEach((l, i) => ctx.fillText(l, cw / 2, textY(i)));
    ctx.restore();
  }

  function sentences(t) { return (t.match(/[^.!?]+[.!?]*\s*/g) || [t]).map((s) => s.trim()).filter(Boolean); }

  /* Transition between prev (final frame) and slide. info: {idx, total, p} for HUD styles. */
  function drawFrame(ctx, slide, prev, p, opts, elapsed, info) {
    const T = 0.6;
    let impact = false;
    if (prev && opts.trans !== 'none' && elapsed < T) {
      const t = ease(elapsed / T), cw = ctx.canvas.width;
      const still = Object.assign({}, opts, { animate: false, kenburns: false });
      if (opts.trans !== 'slide') drawSlide(ctx, prev, 1, still);
      if (opts.trans === 'fade') impact = drawSlide(ctx, slide, p, opts, { alpha: t, base: false }).impact;
      else if (opts.trans === 'slide') { drawSlide(ctx, prev, 1, still, { dx: -cw * t }); impact = drawSlide(ctx, slide, p, opts, { dx: cw * (1 - t), base: false }).impact; }
      else if (opts.trans === 'zoom') impact = drawSlide(ctx, slide, p, opts, { alpha: t, scale: 0.9 + 0.1 * t, base: false }).impact;
    } else {
      impact = drawSlide(ctx, slide, p, opts).impact;
      if (prev && opts.trans === 'none' && elapsed < 0.12) impact = true; // hard cut hit
    }
    finish(ctx, opts, Object.assign({ p }, info), impact);
  }

  global.SlideRender = { drawSlide, drawFrame, drawStill, drawCaption, sentences };
})(window);
