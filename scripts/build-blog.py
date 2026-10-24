"""Build the blog: content/blog/<slug>.md -> blog/<slug>.html, blog/index.html,
functions/_lib/blog-manifest.js and per-post share images (assets/blog/<slug>.png).

Posts are date-gated at the edge by functions/blog/_middleware.js (Perth time), so every
post can be built and committed ahead of its publish date.

Run: python3 scripts/build-blog.py   (needs: markdown, Pillow, Inter font)
"""
import datetime, html, json, math, pathlib, re, sys
import markdown

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "content/blog"
OUT = ROOT / "blog"
IMG = ROOT / "assets/blog"
SITE = "https://powerpoint2vid.com"
VER = "20261022a"
GA = "G-3F8MGRVD2L"

PILLARS = {
    "convert": "Convert & Create",
    "craft": "Better Presentations",
    "why": "Why Explainer Videos",
    "playbook": "Playbooks by Role",
    "share": "Voice, Captions & Sharing",
}

def esc(s): return html.escape(s, quote=True)

def parse(path):
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    if not m: raise ValueError(f"{path.name}: missing front matter")
    meta = {}
    for line in m.group(1).splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            meta[k.strip()] = v.strip().strip('"')
    return meta, m.group(2).strip()

def fmt_date(d):
    d = datetime.date.fromisoformat(d)
    return f"{d.day} {d.strftime('%B %Y')}"

# ---------- shared chrome ----------
def head(title, desc, canonical, og_image, og_type="website", extra=""):
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="author" content="Mal Gordon">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#6d4aff">
<link rel="canonical" href="{canonical}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/icon-512.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="alternate" type="application/rss+xml" title="PowerPoint2Vid blog" href="{SITE}/blog/feed.xml">
<meta property="og:type" content="{og_type}">
<meta property="og:site_name" content="PowerPoint2Vid">
<meta property="og:url" content="{canonical}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:image" content="{og_image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_AU">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(title)}">
<meta name="twitter:description" content="{esc(desc)}">
<meta name="twitter:image" content="{og_image}">
{extra}<link rel="stylesheet" href="/styles.css?v={VER}">
<link rel="stylesheet" href="/blog.css?v={VER}">
<script async src="https://www.googletagmanager.com/gtag/js?id={GA}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());
  gtag('config', '{GA}');
</script>
"""

HEADER = """<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="/" aria-label="PowerPoint2Vid, the PowerPoint to video converter, home">
      <svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="16" fill="#6d4aff"/><rect x="12" y="16" width="40" height="28" rx="5" fill="#fff"/><path d="M28 24l12 6-12 6z" fill="#5b3df0"/><rect x="20" y="49" width="24" height="4" rx="2" fill="#fff" opacity=".85"/></svg>
      <span>PowerPoint<b>2Vid</b></span>
    </a>
    <nav class="nav" aria-label="Primary">
      <a href="/#showcase">Showcase</a>
      <a href="/#how">How Pro works</a>
      <a href="/pricing">Pricing</a>
      <a href="/blog/" aria-current="page">Blog</a>
    </nav>
  </div>
</header>
"""

FOOTER = """<footer class="site-footer">
  <div class="wrap">
    <div>© 2026 PowerPoint2Vid, the online PowerPoint to video converter · <a href="/pricing">Pricing</a> · <a href="/basic">Basic converter</a> · <a href="/blog/">Blog</a> · <a href="https://www.youtube.com/@PowerPoint2Vid" rel="noopener">YouTube</a> · <a href="mailto:contact@powerpoint2vid.com">contact@powerpoint2vid.com</a></div>
    <div>another <a href="https://malgordon.com/" rel="noopener">Mal Gordon</a> creation</div>
  </div>
</footer>
<script>
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[data-cta]');
  if (a && window.gtag) gtag('event', 'cta_click', { location: a.dataset.cta });
});
</script>
</body>
</html>
"""

def reading_time(md): return max(1, math.ceil(len(re.findall(r"\w+", md)) / 230))

def card(p, featured=False):
    cls = "post-card post-card--featured" if featured else "post-card"
    return f"""<article class="{cls}" data-publish="{p['date']}" data-pillar="{p['pillar']}">
  <span class="post-card__pillar pillar--{p['pillar']}">{esc(PILLARS[p['pillar']])}</span>
  <h2 class="post-card__title"><a href="/blog/{p['slug']}">{esc(p['title'])}</a></h2>
  <p class="post-card__desc">{esc(p['description'])}</p>
  <p class="post-card__meta"><time datetime="{p['date']}">{fmt_date(p['date'])}</time> · {p['minutes']} min read</p>
</article>"""

# ---------- post page ----------
def post_page(p, body_html, toc, related):
    url = f"{SITE}/blog/{p['slug']}"
    img = f"{SITE}/assets/blog/{p['slug']}.png"
    ld = {
        "@context": "https://schema.org",
        "@graph": [
            {"@type": "BlogPosting", "headline": p["title"], "description": p["description"],
             "datePublished": p["date"] + "T00:00:00+08:00", "dateModified": p["date"] + "T00:00:00+08:00",
             "mainEntityOfPage": url, "image": img, "keywords": p["keyword"],
             "articleSection": PILLARS[p["pillar"]], "wordCount": p["words"],
             "author": {"@type": "Person", "name": "Mal Gordon", "url": "https://malgordon.com/"},
             "publisher": {"@type": "Organization", "name": "PowerPoint2Vid", "url": SITE + "/",
                           "logo": {"@type": "ImageObject", "url": SITE + "/assets/icon-512.png"}}},
            {"@type": "BreadcrumbList", "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
                {"@type": "ListItem", "position": 2, "name": "Blog", "item": SITE + "/blog/"},
                {"@type": "ListItem", "position": 3, "name": p["title"], "item": url}]},
        ],
    }
    extra = (f'<meta property="article:published_time" content="{p["date"]}T00:00:00+08:00">\n'
             f'<meta property="article:section" content="{esc(PILLARS[p["pillar"]])}">\n'
             f'<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>\n')
    rel = ""
    if related:
        rel = ('<section class="related" aria-labelledby="related-h"><div class="wrap">'
               '<h2 id="related-h">Keep reading</h2><div class="post-grid">'
               + "\n".join(card(r) for r in related) + "</div></div></section>")
    toc_html = f'<nav class="toc" aria-label="On this page"><p class="toc__label">On this page</p>{toc}</nav>' if toc.count("<li>") >= 3 else ""
    return head(f"{p['title']} | PowerPoint2Vid Blog", p["description"], url, img, "article", extra) + f"""</head>
<body class="blog">
{HEADER}
<main id="main">
  <article class="post">
    <header class="post-hero">
      <div class="wrap wrap--narrow">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="/blog/">Blog</a> <span aria-hidden="true">/</span> <a href="/blog/#{p['pillar']}">{esc(PILLARS[p['pillar']])}</a></nav>
        <h1>{esc(p['title'])}</h1>
        <p class="post-meta">By <a href="https://malgordon.com/" rel="author noopener">Mal Gordon</a> · <time datetime="{p['date']}">{fmt_date(p['date'])}</time> · {p['minutes']} min read</p>
      </div>
    </header>
    <div class="wrap wrap--narrow post-layout">
      {toc_html}
      <div class="prose">
{body_html}
      </div>
      <aside class="post-cta" aria-label="Try PowerPoint2Vid">
        <p class="post-cta__eyebrow">PowerPoint to video converter</p>
        <h2>Turn your next deck into an extraordinary video</h2>
        <p>On Pro, a.i. directs your deck: a tighter story, every slide redesigned as an animated scene, timed to your narration.</p>
        <div class="post-cta__actions">
          <a class="btn btn--accent" href="/#showcase" data-cta="blog_post_showcase">See what Pro makes</a>
          <a class="btn btn--ghost" href="/pricing" data-cta="blog_post_pricing">See pricing</a>
        </div>
      </aside>
    </div>
  </article>
  {rel}
</main>
{FOOTER}"""

# ---------- index ----------
def index_page(posts):
    chips = '<button class="chip" type="button" data-filter="all" aria-pressed="true">All posts</button>' + "".join(
        f'<button class="chip" type="button" data-filter="{k}" aria-pressed="false">{esc(v)}</button>' for k, v in PILLARS.items())
    newest = sorted(posts, key=lambda p: p["date"], reverse=True)
    cards = "\n".join(card(p) for p in newest)
    desc = ("Tips for better presentations, the case for explainer videos, and how to use a PowerPoint to video "
            "converter to turn slide decks into narrated videos. A new post every day.")
    ld = {"@context": "https://schema.org", "@type": "Blog", "name": "PowerPoint2Vid Blog",
          "url": SITE + "/blog/", "description": desc,
          "publisher": {"@type": "Organization", "name": "PowerPoint2Vid", "url": SITE + "/"}}
    extra = f'<script type="application/ld+json">{json.dumps(ld)}</script>\n'
    return head("Presentation & PowerPoint to Video Converter Blog | PowerPoint2Vid", desc, SITE + "/blog/",
                SITE + "/assets/og-image.png", "website", extra) + f"""</head>
<body class="blog">
{HEADER}
<main id="main">
  <section class="blog-hero">
    <div class="wrap">
      <span class="eyebrow">The PowerPoint2Vid blog</span>
      <h1>Better slides. <span class="grad">Better videos.</span></h1>
      <p class="lede">Practical tips for clearer presentations, why explainer videos work, and how to get the most from a PowerPoint to video converter. A new post every day.</p>
      <div class="chips" role="group" aria-label="Filter posts by topic">{chips}</div>
    </div>
  </section>
  <section class="wrap blog-list" aria-label="Posts">
    <div class="post-grid post-grid--index" id="posts">
{cards}
    </div>
    <p class="empty" id="empty" hidden>No posts in this topic yet. New posts go live every day.</p>
  </section>
  <section class="wrap blog-band">
    <div class="panel blog-band__inner">
      <div>
        <h2>Got a deck? Make it a video.</h2>
        <p>The online PowerPoint to video converter that narrates your speaker notes, upgrades your slides into animated scenes and adds captions. Directed by a.i..</p>
      </div>
      <a class="btn btn--accent" href="/#showcase" data-cta="blog_index_showcase">Watch the Pro showcase</a>
    </div>
  </section>
</main>
<script>
(function () {{
  var chips = document.querySelectorAll('.chip'), cards = document.querySelectorAll('#posts .post-card'), empty = document.getElementById('empty');
  if (cards[0]) cards[0].classList.add('post-card--featured');
  function apply(f) {{
    var shown = 0;
    chips.forEach(function (c) {{ c.setAttribute('aria-pressed', c.dataset.filter === f ? 'true' : 'false'); }});
    cards.forEach(function (c) {{ var on = f === 'all' || c.dataset.pillar === f; c.hidden = !on; if (on) shown++; }});
    empty.hidden = shown > 0;
  }}
  chips.forEach(function (c) {{ c.addEventListener('click', function () {{
    apply(c.dataset.filter);
    try {{ history.replaceState(null, '', c.dataset.filter === 'all' ? '/blog/' : '#' + c.dataset.filter); }} catch (e) {{}}
  }}); }});
  var h = location.hash.slice(1); if (h && document.querySelector('.chip[data-filter="' + h + '"]')) apply(h);
}})();
</script>
{FOOTER}"""

# ---------- share images ----------
def share_image(p):
    try:
        from PIL import Image, ImageDraw, ImageFont, ImageFilter
    except ImportError:
        return
    F = "/usr/share/fonts/opentype/inter/"
    f = lambda w, s: ImageFont.truetype(F + f"Inter-{w}.otf", s)
    W, H = 1200, 630
    INK, VIOLET, CORAL, MUTED = (14, 19, 48), (109, 74, 255), (255, 107, 74), (170, 176, 212)
    img = Image.new("RGB", (W, H), INK).convert("RGBA")
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0)); g = ImageDraw.Draw(glow)
    g.ellipse((W * .6, -H * .4, W * 1.25, H * .6), fill=(109, 74, 255, 110))
    g.ellipse((W * .75, H * .55, W * 1.3, H * 1.4), fill=(255, 107, 74, 80))
    img.alpha_composite(glow.filter(ImageFilter.GaussianBlur(100)))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((64, 56, 112, 104), 12, fill=VIOLET); d.polygon([(80, 68), (80, 92), (100, 80)], fill=(255, 255, 255))
    d.text((128, 60), "PowerPoint", font=f("ExtraBold", 34), fill=(255, 255, 255))
    bw = d.textlength("PowerPoint", font=f("ExtraBold", 34)); d.text((128 + bw, 60), "2Vid", font=f("ExtraBold", 34), fill=(143, 117, 255))
    label = PILLARS[p["pillar"]].upper()
    lf = f("Bold", 22); lw = d.textlength(label, font=lf)
    d.rounded_rectangle((64, 170, 64 + lw + 36, 212), 21, outline=CORAL, width=2)
    d.text((82, 178), label, font=lf, fill=CORAL)
    size = 64
    while True:
        tf = f("ExtraBold", size); words = p["title"].split(); lines, cur = [], ""
        for w in words:
            t = (cur + " " + w).strip()
            if d.textlength(t, font=tf) > W - 140: lines.append(cur); cur = w
            else: cur = t
        lines.append(cur)
        if len(lines) <= 4 or size <= 44: break
        size -= 4
    y = 240
    for ln in lines:
        d.text((64, y), ln, font=tf, fill=(255, 255, 255)); y += int(size * 1.15)
    d.text((64, H - 70), "powerpoint2vid.com/blog", font=f("Medium", 26), fill=MUTED)
    img.convert("RGB").save(IMG / f"{p['slug']}.png", optimize=True)

def main():
    cal = json.loads((SRC / "calendar.json").read_text())
    OUT.mkdir(exist_ok=True); IMG.mkdir(parents=True, exist_ok=True)
    posts, missing = [], []
    for c in cal:
        path = SRC / f"{c['slug']}.md"
        if not path.exists(): missing.append(c["slug"]); continue
        meta, body = parse(path)
        assert meta.get("slug") == c["slug"] and meta.get("date") == c["date"], f"{path.name}: front matter does not match calendar"
        posts.append({**c, "description": meta["description"], "body": body,
                      "minutes": reading_time(body), "words": len(re.findall(r"\w+", body))})
    by_slug = {p["slug"]: p for p in posts}
    for p in posts:
        md = markdown.Markdown(extensions=["tables", "toc", "sane_lists", "smarty"],
                               extension_configs={"toc": {"toc_depth": "2"}})
        body_html = md.convert(p["body"])
        # links to blog posts must point at earlier (already published) posts
        for s in re.findall(r'href="/blog/([a-z0-9-]+)"', body_html):
            q = by_slug.get(s)
            if not q or q["date"] >= p["date"]:
                print(f"WARN {p['slug']}: link to /blog/{s} removed (missing or not yet published)")
                body_html = re.sub(rf'<a href="/blog/{s}">(.*?)</a>', r"\1", body_html)
        body_html = re.sub(r'<a href="(https?://(?!powerpoint2vid\.com)[^"]+)"', r'<a href="\1" rel="noopener" target="_blank"', body_html)
        earlier = [q for q in posts if q["date"] < p["date"]]
        same = [q for q in reversed(earlier) if q["pillar"] == p["pillar"]]
        other = [q for q in reversed(earlier) if q["pillar"] != p["pillar"]]
        related = (same[:2] + other)[:3]
        (OUT / f"{p['slug']}.html").write_text(post_page(p, body_html, md.toc, related), encoding="utf-8")
        if "--no-images" not in sys.argv: share_image(p)
    (OUT / "index.html").write_text(index_page(posts), encoding="utf-8")
    manifest = [{k: p[k] for k in ("slug", "date", "title", "description", "pillar")} for p in posts]
    (ROOT / "functions/_lib/blog-manifest.js").write_text(
        "// Generated by scripts/build-blog.py. Do not edit.\nexport const PILLARS = " + json.dumps(PILLARS) +
        ";\nexport const POSTS = " + json.dumps(manifest, indent=0, ensure_ascii=False) + ";\n", encoding="utf-8")
    print(f"built {len(posts)} posts" + (f", {len(missing)} missing: {missing[:5]}..." if missing else ""))

if __name__ == "__main__":
    main()
