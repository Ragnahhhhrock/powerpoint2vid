#!/usr/bin/env python3
"""Print the slug of the blog post that goes live next at 00:00 Perth time (AWST, UTC+8).
Usage: python3 scripts/next-blog-post.py [--date YYYY-MM-DD]
With no --date it picks the post dated tomorrow in Perth. Prints nothing if there is none."""
import datetime, json, sys
from pathlib import Path
cal = json.loads((Path(__file__).resolve().parent.parent / "content/blog/calendar.json").read_text())
if "--date" in sys.argv:
    d = sys.argv[sys.argv.index("--date") + 1]
else:
    perth = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=8)
    d = (perth.date() + datetime.timedelta(days=1)).isoformat()
print(next((c["slug"] for c in cal if c["date"] == d), ""))
