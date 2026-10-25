"""Trace a navy-on-white ornament PNG into a single-path SVG.

usage: python3 -I trace.py in.png out.svg [--mirror-left] [--pad N]
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
import potrace

src, dst = sys.argv[1], sys.argv[2]
args = sys.argv[3:]
pad = int(args[args.index("--pad") + 1]) if "--pad" in args else 4

im = Image.open(src).convert("RGB")
w, h = im.size
im = im.resize((w * 2, h * 2), Image.LANCZOS)
lum = np.asarray(im.convert("L").filter(ImageFilter.GaussianBlur(1.6)), dtype=np.float32)
mask = lum < 150

if "--mirror-left" in args:
    # make it exactly symmetrical: keep the left half, mirror it onto the right
    mid = mask.shape[1] // 2
    left = mask[:, :mid]
    mask = np.concatenate([left, left[:, ::-1][:, : mask.shape[1] - mid]], axis=1)

ys, xs = np.nonzero(mask)
y0, y1, x0, x1 = ys.min() - pad, ys.max() + pad + 1, xs.min() - pad, xs.max() + pad + 1
mask = mask[max(y0, 0):y1, max(x0, 0):x1]
H, W = mask.shape

bm = potrace.Bitmap(~mask)
plist = bm.trace(turdsize=40, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY,
                 alphamax=1.0, opticurve=True, opttolerance=0.25)

def f(v):
    return f"{v / 2:.1f}".rstrip("0").rstrip(".")

parts = []
for curve in plist:
    sp = curve.start_point
    d = [f"M{f(sp.x)} {f(sp.y)}"]
    for seg in curve.segments:
        if seg.is_corner:
            d.append(f"L{f(seg.c.x)} {f(seg.c.y)}L{f(seg.end_point.x)} {f(seg.end_point.y)}")
        else:
            d.append(f"C{f(seg.c1.x)} {f(seg.c1.y)} {f(seg.c2.x)} {f(seg.c2.y)} {f(seg.end_point.x)} {f(seg.end_point.y)}")
    d.append("Z")
    parts.append("".join(d))

svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(W)} {f(H)}">'
       f'<path fill="#1B2A55" fill-rule="evenodd" d="{"".join(parts)}"/></svg>\n')
open(dst, "w").write(svg)
print(dst, f(W), f(H), len(svg) // 1024, "KB")
