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

  /* Draw one slide at animation progress p (0..1). opts: animate, kenburns */
  function drawSlide(ctx, slide, p, opts, tr) {
    const cw = ctx.canvas.width, ch = ctx.canvas.height;
    const k = Math.min(cw / slide.W, ch / slide.H);
    const ox = (cw - slide.W * k) / 2, oy = (ch - slide.H * k) / 2;
    ctx.save();
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, cw, ch);
    if (tr) {
      ctx.globalAlpha = tr.alpha != null ? tr.alpha : 1;
      ctx.translate(tr.dx || 0, 0);
      if (tr.scale && tr.scale !== 1) { ctx.translate(cw / 2, ch / 2); ctx.scale(tr.scale, tr.scale); ctx.translate(-cw / 2, -ch / 2); }
    }
    ctx.translate(ox, oy);
    ctx.beginPath(); ctx.rect(0, 0, slide.W * k, slide.H * k); ctx.clip();
    if (slide.bgImage) ctx.drawImage(slide.bgImage, 0, 0, slide.W * k, slide.H * k);
    else { ctx.fillStyle = slide.bg || '#fff'; ctx.fillRect(0, 0, slide.W * k, slide.H * k); }
    const n = slide.shapes.length;
    slide.shapes.forEach((s, i) => {
      let a = 1, dy = 0;
      if (opts.animate && n > 1) {
        const start = 0.06 + (0.55 * i) / Math.max(1, n - 1), t = ease((p - start) / 0.12);
        a = t; dy = (1 - t) * 0.04 * slide.H * k;
      }
      if (a <= 0) return;
      ctx.save(); ctx.globalAlpha *= a; ctx.translate(0, dy);
      if (s.kind === 'pic') drawPic(ctx, s, k, opts.kenburns ? p : 0);
      else if (s.kind === 'table') drawTable(ctx, s, k);
      else { drawShapeBox(ctx, s, k); drawText(ctx, s, k); }
      ctx.restore();
    });
    ctx.restore();
  }

  function drawCaption(ctx, text) {
    if (!text) return;
    const cw = ctx.canvas.width, ch = ctx.canvas.height;
    const size = Math.round(ch * 0.038);
    ctx.save();
    ctx.font = '600 ' + size + 'px ' + FONT;
    const maxW = cw * 0.8, words = text.split(' '), lines = [];
    let cur = '';
    words.forEach((w) => { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; });
    if (cur) lines.push(cur);
    const lh = size * 1.3, bh = lines.length * lh + size * 0.6, bw = Math.max(...lines.map((l) => ctx.measureText(l).width)) + size * 1.2;
    const bx = (cw - bw) / 2, by = ch - bh - ch * 0.05;
    ctx.fillStyle = 'rgba(14,19,48,0.82)'; ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, size * 0.4); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    lines.forEach((l, i) => ctx.fillText(l, cw / 2, by + size * 0.3 + lh * (i + 0.5)));
    ctx.restore();
  }

  function sentences(t) { return (t.match(/[^.!?]+[.!?]*\s*/g) || [t]).map((s) => s.trim()).filter(Boolean); }

  /* Transition between prev (final frame) and slide at t (0..1) */
  function drawFrame(ctx, slide, prev, p, opts, elapsed) {
    const T = 0.6;
    if (prev && opts.trans !== 'none' && elapsed < T) {
      const t = ease(elapsed / T), cw = ctx.canvas.width;
      if (opts.trans !== 'slide') drawSlide(ctx, prev, 1, opts);
      if (opts.trans === 'fade') drawSlide(ctx, slide, p, opts, { alpha: t });
      else if (opts.trans === 'slide') { drawSlide(ctx, prev, 1, { animate: false, kenburns: false }, { dx: -cw * t }); drawSlide(ctx, slide, p, opts, { dx: cw * (1 - t) }); }
      else if (opts.trans === 'zoom') drawSlide(ctx, slide, p, opts, { alpha: t, scale: 0.9 + 0.1 * t });
    } else drawSlide(ctx, slide, p, opts);
  }

  global.SlideRender = { drawSlide, drawFrame, drawCaption, sentences };
})(window);
