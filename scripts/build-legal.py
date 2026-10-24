"""Build /privacy and /terms from content/legal/*.md using the blog's page chrome.
Run: python3 scripts/build-legal.py   (needs: markdown)"""
import importlib.util, pathlib, re
import markdown

ROOT = pathlib.Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("bb", ROOT / "scripts/build-blog.py")
bb = importlib.util.module_from_spec(spec); spec.loader.exec_module(bb)

for path in sorted((ROOT / "content/legal").glob("*.md")):
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", path.read_text(encoding="utf-8"), re.S)
    meta = dict(l.split(":", 1) for l in m.group(1).splitlines() if ":" in l)
    meta = {k.strip(): v.strip() for k, v in meta.items()}
    body = markdown.markdown(m.group(2).strip(), extensions=["sane_lists", "smarty"])
    url = f"{bb.SITE}/{meta['slug']}"
    html = bb.head(f"{meta['title']} | PowerPoint2Vid", meta["description"], url, bb.SITE + "/assets/og-image.png") + f"""</head>
<body class="blog">
{bb.HEADER}
<main id="main">
  <article class="post">
    <header class="post-hero">
      <div class="wrap wrap--narrow">
        <h1>{bb.esc(meta['title'])}</h1>
        <p class="post-meta">Last updated {bb.esc(meta['updated'])}</p>
      </div>
    </header>
    <div class="wrap wrap--narrow post-layout">
      <div class="prose">
{body}
      </div>
    </div>
  </article>
</main>
{bb.FOOTER}"""
    (ROOT / f"{meta['slug']}.html").write_text(html, encoding="utf-8")
    print("built", meta["slug"] + ".html")
