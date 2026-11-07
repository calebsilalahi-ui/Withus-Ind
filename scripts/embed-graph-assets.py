#!/usr/bin/env python3
"""Make graphify's graph.html self-contained and small.

graphify loads vis-network from unpkg (blocked in sandboxed previews) -> blank canvas.
This replaces the CDN tag with a gzip+base64 copy (~280 KB instead of 700 KB), decompressed
in the browser, and runs the remaining inline scripts only after the library is ready.

Usage: python3 scripts/embed-graph-assets.py <graph.html> [out.html]
"""
import base64, re, sys
from pathlib import Path

src = Path(sys.argv[1]); dst = Path(sys.argv[2]) if len(sys.argv) > 2 else src
lib_gz = Path(__file__).with_name("vendor") / "vis-network-9.1.6.min.js.gz"
html = src.read_text(encoding="utf-8")

cdn = re.compile(r'<script[^>]*src="https://unpkg\.com/vis-network@[^"]+"[^>]*></script>')
if not cdn.search(html):
    print("No CDN tag found (already embedded?)."); sys.exit(0)

head, tail = html.split(cdn.search(html).group(0), 1)
# Defer every later inline script so it runs after the library is loaded.
tail = re.sub(r'<script>', '<script type="text/plain" data-defer>', tail)
b64 = base64.b64encode(lib_gz.read_bytes()).decode()
loader = (
    '<script>(async function(){try{'
    'var b=atob("' + b64 + '"),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);'
    'var t=await new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream("gzip"))).text();'
    'var s=document.createElement("script");s.text=t;document.head.appendChild(s);'
    'document.querySelectorAll("script[data-defer]").forEach(function(d){var n=document.createElement("script");'
    'n.text=d.textContent;document.body.appendChild(n);});'
    '}catch(e){document.body.insertAdjacentHTML("afterbegin","<pre style=color:#f88>Graph failed to load: "+e+"</pre>");}})();</script>'
)
out = head + loader + tail
dst.write_text(out, encoding="utf-8")
print(f"{dst}: {len(out)/1024:.0f} KB")
