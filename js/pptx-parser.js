/* PPTX parser: reads a .pptx (zip) into a simple slide model. Runs entirely in the browser. */
(function (global) {
  'use strict';
  const NS_R = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
  const parseXml = (s) => new DOMParser().parseFromString(s, 'application/xml');
  const kids = (el, tag) => Array.from(el.children).filter((c) => c.nodeName === tag);
  const kid = (el, tag) => (el ? kids(el, tag)[0] : null);
  const all = (el, tag) => Array.from(el.getElementsByTagName(tag));
  const num = (v, d) => (v == null || v === '' || isNaN(+v) ? d : +v);

  function dirname(p) { return p.replace(/[^/]*$/, ''); }
  function resolve(base, target) {
    if (target.startsWith('/')) return target.slice(1);
    const parts = (dirname(base) + target).split('/');
    const out = [];
    for (const p of parts) { if (p === '..') out.pop(); else if (p !== '.' && p !== '') out.push(p); }
    return out.join('/');
  }

  async function readText(zip, path) {
    const f = zip.file(path);
    return f ? f.async('string') : null;
  }
  async function readRels(zip, path) {
    const relPath = dirname(path) + '_rels/' + path.split('/').pop() + '.rels';
    const xml = await readText(zip, relPath);
    const map = {};
    if (!xml) return map;
    all(parseXml(xml), 'Relationship').forEach((r) => {
      map[r.getAttribute('Id')] = { type: r.getAttribute('Type'), target: resolve(path, r.getAttribute('Target')), mode: r.getAttribute('TargetMode') };
    });
    return map;
  }

  /* ---- theme colours ---- */
  function parseTheme(xml) {
    const t = { dk1: '000000', lt1: 'FFFFFF', dk2: '1F2937', lt2: 'F3F4F6', accent1: '4472C4', accent2: 'ED7D31', accent3: 'A5A5A5', accent4: 'FFC000', accent5: '5B9BD5', accent6: '70AD47', hlink: '0563C1', folHlink: '954F72' };
    if (!xml) return t;
    const cs = all(parseXml(xml), 'a:clrScheme')[0];
    if (!cs) return t;
    Array.from(cs.children).forEach((c) => {
      const name = c.nodeName.replace('a:', '');
      const v = c.firstElementChild;
      if (!v) return;
      t[name] = v.getAttribute('val') === 'windowText' ? '000000' : v.getAttribute('val') === 'window' ? 'FFFFFF' : (v.getAttribute('lastClr') || v.getAttribute('val'));
    });
    return t;
  }

  function adjust(hex, mods) {
    let r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
    const lumMod = mods.lumMod != null ? mods.lumMod / 1e5 : 1, lumOff = mods.lumOff != null ? mods.lumOff / 1e5 : 0;
    if (mods.lumMod != null || mods.lumOff != null) {
      const f = (c) => Math.max(0, Math.min(255, Math.round(c * lumMod + 255 * lumOff)));
      r = f(r); g = f(g); b = f(b);
    }
    if (mods.tint != null) { const t = mods.tint / 1e5; const f = (c) => Math.round(c * t + 255 * (1 - t)); r = f(r); g = f(g); b = f(b); }
    if (mods.shade != null) { const s = mods.shade / 1e5; const f = (c) => Math.round(c * s); r = f(r); g = f(g); b = f(b); }
    const h = (c) => c.toString(16).padStart(2, '0');
    return '#' + h(r) + h(g) + h(b);
  }

  function colorOf(el, theme, clrMap) {
    if (!el) return null;
    const c = el.firstElementChild;
    if (!c) return null;
    let base = null;
    if (c.nodeName === 'a:srgbClr') base = c.getAttribute('val');
    else if (c.nodeName === 'a:schemeClr') {
      let v = c.getAttribute('val');
      v = (clrMap && clrMap[v]) || v;
      const alias = { tx1: 'dk1', bg1: 'lt1', tx2: 'dk2', bg2: 'lt2' };
      base = theme[alias[v] || v] || null;
    } else if (c.nodeName === 'a:sysClr') base = c.getAttribute('lastClr') || '000000';
    else if (c.nodeName === 'a:prstClr') base = ({ black: '000000', white: 'FFFFFF', red: 'FF0000' })[c.getAttribute('val')] || '000000';
    if (!base) return null;
    const mods = {};
    Array.from(c.children).forEach((m) => { mods[m.nodeName.replace('a:', '')] = num(m.getAttribute('val'), null); });
    return adjust(base.padStart(6, '0'), mods);
  }

  function fillOf(spPr, theme, clrMap) {
    if (!spPr) return null;
    const solid = kid(spPr, 'a:solidFill');
    if (solid) return colorOf(solid, theme, clrMap);
    const grad = kid(spPr, 'a:gradFill');
    if (grad) { const gs = all(grad, 'a:gs')[0]; if (gs) return colorOf(gs, theme, clrMap); }
    return null;
  }

  function xfrmOf(spPr) {
    const x = spPr && kid(spPr, 'a:xfrm');
    if (!x) return null;
    const off = kid(x, 'a:off'), ext = kid(x, 'a:ext');
    if (!off || !ext) return null;
    return { x: num(off.getAttribute('x'), 0), y: num(off.getAttribute('y'), 0), w: num(ext.getAttribute('cx'), 0), h: num(ext.getAttribute('cy'), 0), rot: num(x.getAttribute('rot'), 0) / 60000 };
  }

  /* ---- inherited placeholders ---- */
  function placeholderMap(doc) {
    const m = { byIdx: {}, byType: {} };
    all(doc, 'p:sp').forEach((sp) => {
      const ph = all(sp, 'p:ph')[0];
      if (!ph) return;
      const spPr = kid(sp, 'p:spPr');
      const info = { xfrm: xfrmOf(spPr), bodyPr: all(sp, 'a:bodyPr')[0] || null };
      const idx = ph.getAttribute('idx'), type = ph.getAttribute('type') || 'body';
      if (idx != null) m.byIdx[idx] = info;
      m.byType[type] = m.byType[type] || info;
    });
    return m;
  }
  function lookupPh(ph, ...maps) {
    const idx = ph.getAttribute('idx'), type = ph.getAttribute('type') || 'body';
    const norm = type === 'ctrTitle' ? 'title' : type === 'subTitle' ? 'body' : type;
    for (const m of maps) {
      if (!m) continue;
      const hit = (idx != null && m.byIdx[idx]) || m.byType[type] || m.byType[norm];
      if (hit && hit.xfrm) return hit;
    }
    return null;
  }

  function styleSize(master, kind) {
    try {
      const st = all(master, kind === 'title' ? 'p:titleStyle' : 'p:bodyStyle')[0];
      const d = all(kid(st, 'a:lvl1pPr'), 'a:defRPr')[0];
      return num(d.getAttribute('sz'), null) / 100 || null;
    } catch (e) { return null; }
  }

  function parseParas(txBody, theme, clrMap, defaults) {
    const paras = [];
    if (!txBody) return paras;
    kids(txBody, 'a:p').forEach((p) => {
      const pPr = kid(p, 'a:pPr');
      const lvl = num(pPr && pPr.getAttribute('lvl'), 0);
      const algn = (pPr && pPr.getAttribute('algn')) || defaults.algn;
      const hasBullet = pPr && (kid(pPr, 'a:buChar') || kid(pPr, 'a:buAutoNum'));
      const noBullet = pPr && kid(pPr, 'a:buNone');
      const runs = [];
      Array.from(p.children).forEach((c) => {
        if (c.nodeName === 'a:r' || c.nodeName === 'a:fld') {
          const rPr = kid(c, 'a:rPr'), t = kid(c, 'a:t');
          if (!t || !t.textContent) return;
          const sz = rPr && rPr.getAttribute('sz') ? +rPr.getAttribute('sz') / 100 : null;
          runs.push({ t: t.textContent, sz, b: rPr ? rPr.getAttribute('b') === '1' : null, i: rPr ? rPr.getAttribute('i') === '1' : false, color: rPr ? fillOf(rPr, theme, clrMap) : null });
        } else if (c.nodeName === 'a:br') runs.push({ t: '\n', sz: null });
      });
      const end = kid(p, 'a:endParaRPr');
      const emptySz = end && end.getAttribute('sz') ? +end.getAttribute('sz') / 100 : null;
      paras.push({ algn, lvl, bullet: !!(hasBullet || (defaults.bullet && !noBullet && lvl >= 0 && runs.length)), runs, emptySz });
    });
    return paras;
  }

  function textOf(paras) { return paras.map((p) => p.runs.map((r) => r.t).join('')).join('\n').trim(); }

  async function parsePptx(buffer, onProgress) {
    const zip = await JSZip.loadAsync(buffer);
    const pres = await readText(zip, 'ppt/presentation.xml');
    if (!pres) throw new Error('This does not look like a .pptx file.');
    const presDoc = parseXml(pres);
    const sz = all(presDoc, 'p:sldSz')[0];
    const W = num(sz && sz.getAttribute('cx'), 12192000), H = num(sz && sz.getAttribute('cy'), 6858000);
    const presRels = await readRels(zip, 'ppt/presentation.xml');
    const order = all(presDoc, 'p:sldId').map((s) => presRels[s.getAttributeNS(NS_R, 'id') || s.getAttribute('r:id')]).filter(Boolean).map((r) => r.target);

    const themeFile = Object.keys(zip.files).find((f) => /^ppt\/theme\/theme1\.xml$/.test(f));
    const theme = parseTheme(themeFile ? await readText(zip, themeFile) : null);

    const imgCache = {};
    async function loadImage(path) {
      if (imgCache[path]) return imgCache[path];
      const f = zip.file(path);
      if (!f) return null;
      const ext = path.split('.').pop().toLowerCase();
      if (!['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg'].includes(ext)) return null;
      const blob = new Blob([await f.async('uint8array')], { type: ext === 'svg' ? 'image/svg+xml' : 'image/' + (ext === 'jpg' ? 'jpeg' : ext) });
      const url = URL.createObjectURL(blob);
      imgCache[path] = new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = url; });
      return imgCache[path];
    }

    const slides = [];
    for (let n = 0; n < order.length; n++) {
      onProgress && onProgress(n, order.length);
      const path = order[n];
      const xml = await readText(zip, path);
      if (!xml) continue;
      const doc = parseXml(xml);
      const rels = await readRels(zip, path);
      const layoutRel = Object.values(rels).find((r) => /slideLayout$/.test(r.type));
      let layoutDoc = null, masterDoc = null, layoutPh = null, masterPh = null, masterRels = {}, layoutRels = {}, clrMap = null;
      if (layoutRel) {
        const lx = await readText(zip, layoutRel.target);
        if (lx) {
          layoutDoc = parseXml(lx); layoutPh = placeholderMap(layoutDoc); layoutRels = await readRels(zip, layoutRel.target);
          const mRel = Object.values(layoutRels).find((r) => /slideMaster$/.test(r.type));
          if (mRel) { const mx = await readText(zip, mRel.target); if (mx) { masterDoc = parseXml(mx); masterPh = placeholderMap(masterDoc); masterRels = await readRels(zip, mRel.target); } }
        }
      }
      if (masterDoc) {
        const cm = all(masterDoc, 'p:clrMap')[0];
        if (cm) { clrMap = {}; Array.from(cm.attributes).forEach((a) => (clrMap[a.name] = a.value)); }
      }
      const titleSz = (masterDoc && styleSize(masterDoc, 'title')) || 44;
      const bodySz = (masterDoc && styleSize(masterDoc, 'body')) || 28;

      /* background */
      let bg = null, bgImage = null;
      const tryBg = async (d, rl) => {
        if (!d) return false;
        const b = all(d, 'p:bg')[0];
        if (!b) return false;
        const pr = kid(b, 'p:bgPr');
        if (pr) {
          const c = fillOf(pr, theme, clrMap);
          if (c) { bg = c; return true; }
          const blip = all(pr, 'a:blip')[0];
          if (blip) { const rid = blip.getAttributeNS(NS_R, 'embed') || blip.getAttribute('r:embed'); if (rl[rid]) { bgImage = await loadImage(rl[rid].target); return !!bgImage; } }
        }
        const ref = kid(b, 'p:bgRef');
        if (ref) { const c = colorOf(ref, theme, clrMap); if (c) { bg = c; return true; } }
        return false;
      };
      (await tryBg(doc, rels)) || (await tryBg(layoutDoc, layoutRels)) || (await tryBg(masterDoc, masterRels));
      if (!bg && !bgImage) bg = '#' + (theme.lt1 || 'FFFFFF');

      /* shapes */
      const shapes = [];
      const spTree = all(doc, 'p:spTree')[0];
      async function walk(container) {
        for (const el of Array.from(container.children)) {
          if (el.nodeName === 'p:grpSp') { await walk(el); continue; }
          if (el.nodeName === 'p:sp') {
            const spPr = kid(el, 'p:spPr'), tx = kid(el, 'p:txBody');
            const ph = all(el, 'p:ph')[0];
            if (ph && ['dt', 'ftr', 'sldNum'].includes(ph.getAttribute('type'))) continue;
            let box = xfrmOf(spPr);
            let bodyPr = tx ? kid(tx, 'a:bodyPr') : null;
            if (!box && ph) { const inh = lookupPh(ph, layoutPh, masterPh); if (inh) { box = inh.xfrm; if (!bodyPr) bodyPr = inh.bodyPr; } }
            if (!box) box = { x: W * 0.08, y: H * 0.08, w: W * 0.84, h: H * 0.84, rot: 0 };
            const type = ph ? (ph.getAttribute('type') || 'body') : null;
            const isTitle = type === 'title' || type === 'ctrTitle';
            const fill = fillOf(spPr, theme, clrMap);
            const ln = spPr && kid(spPr, 'a:ln');
            const stroke = ln ? fillOf(ln, theme, clrMap) : null;
            const geom = spPr && kid(spPr, 'a:prstGeom');
            const prst = geom ? geom.getAttribute('prst') : 'rect';
            const defaults = { algn: isTitle ? (type === 'ctrTitle' ? 'ctr' : 'l') : 'l', bullet: type === 'body' || type === 'obj' || (ph && !type) };
            const paras = parseParas(tx, theme, clrMap, defaults);
            const txt = textOf(paras);
            if (!txt && !fill && !stroke) continue;
            const bpr = bodyPr;
            const fs = bpr && all(bpr, 'a:normAutofit')[0];
            shapes.push({
              kind: 'shape', box, fill, stroke, prst, paras, isTitle, defSz: isTitle ? titleSz : bodySz,
              fontScale: fs && fs.getAttribute('fontScale') ? +fs.getAttribute('fontScale') / 1e5 : 1,
              anchor: bpr ? bpr.getAttribute('anchor') || (isTitle ? 'ctr' : 't') : (isTitle ? 'ctr' : 't'),
              ins: { l: num(bpr && bpr.getAttribute('lIns'), 91440), t: num(bpr && bpr.getAttribute('tIns'), 45720), r: num(bpr && bpr.getAttribute('rIns'), 91440), b: num(bpr && bpr.getAttribute('bIns'), 45720) },
              defColor: '#' + (theme.dk1 || '000000'),
              text: txt, order: shapes.length
            });
          } else if (el.nodeName === 'p:pic') {
            const spPr = kid(el, 'p:spPr'), box = xfrmOf(spPr);
            const blip = all(el, 'a:blip')[0];
            if (!box || !blip) continue;
            const rid = blip.getAttributeNS(NS_R, 'embed') || blip.getAttribute('r:embed');
            const rel = rels[rid];
            if (!rel) continue;
            const img = await loadImage(rel.target);
            if (!img) continue;
            const src = all(el, 'a:srcRect')[0];
            const crop = src ? { l: num(src.getAttribute('l'), 0) / 1e5, t: num(src.getAttribute('t'), 0) / 1e5, r: num(src.getAttribute('r'), 0) / 1e5, b: num(src.getAttribute('b'), 0) / 1e5 } : null;
            shapes.push({ kind: 'pic', box, img, crop, order: shapes.length });
          } else if (el.nodeName === 'p:graphicFrame') {
            const t = all(el, 'a:tbl')[0];
            const fx = kid(el, 'p:xfrm');
            if (t && fx) {
              const off = kid(fx, 'a:off'), ext = kid(fx, 'a:ext');
              const rows = all(t, 'a:tr').map((tr) => all(tr, 'a:tc').map((tc) => textOf(parseParas(kid(tc, 'a:txBody'), theme, clrMap, { algn: 'l' }))));
              shapes.push({ kind: 'table', box: { x: +off.getAttribute('x'), y: +off.getAttribute('y'), w: +ext.getAttribute('cx'), h: +ext.getAttribute('cy') }, rows, order: shapes.length, defColor: '#' + (theme.dk1 || '000000'), accent: '#' + theme.accent1 });
            }
          }
        }
      }
      if (spTree) await walk(spTree);

      /* notes */
      let notes = '';
      const nRel = Object.values(rels).find((r) => /notesSlide$/.test(r.type));
      if (nRel) {
        const nx = await readText(zip, nRel.target);
        if (nx) {
          const nd = parseXml(nx);
          all(nd, 'p:sp').forEach((sp) => {
            const ph = all(sp, 'p:ph')[0];
            if (ph && ph.getAttribute('type') === 'body') notes += textOf(parseParas(kid(sp, 'p:txBody'), theme, null, { algn: 'l' })) + ' ';
          });
        }
      }

      const titleShape = shapes.find((s) => s.isTitle);
      const textShapes = shapes.filter((s) => s.kind === 'shape' && s.text);
      slides.push({
        index: n, W, H, bg, bgImage, shapes,
        title: titleShape ? titleShape.text : (textShapes[0] ? textShapes[0].text.split('\n')[0] : 'Slide ' + (n + 1)),
        text: textShapes.map((s) => s.text.replace(/\n+/g, '. ')).join('. ').replace(/\.\s*\./g, '.'),
        notes: notes.replace(/\s+/g, ' ').trim()
      });
    }
    if (!slides.length) throw new Error('No slides were found in this file.');
    return { W, H, slides };
  }

  global.parsePptx = parsePptx;
})(window);
