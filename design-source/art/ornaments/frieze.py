"""Split the traced spindle frieze into a left cap, a seamless repeating unit and a right cap.

usage: python3 -I frieze.py ornament-spindle-frieze.png out_dir
Writes orn-frieze-cap-l.svg, orn-frieze-unit.svg, orn-frieze-cap-r.svg (same path, cropped viewBoxes).
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
import potrace

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
im = im.resize((im.width * 2, im.height * 2), Image.LANCZOS)
lum = np.asarray(im.convert("L").filter(ImageFilter.GaussianBlur(1.6)), dtype=np.float32)
mask = lum < 150
mid = mask.shape[1] // 2
left = mask[:, :mid]
mask = np.concatenate([left, left[:, ::-1][:, : mask.shape[1] - mid]], axis=1)
ys, xs = np.nonzero(mask)
pad = 4
mask = mask[ys.min() - pad: ys.max() + pad + 1, xs.min() - pad: xs.max() + pad + 1]
H, W = mask.shape

# Columns in the band between the top rail and the sawtooth tips decide the seams.
cols = mask.astype(np.int8)

def diff(a, b):
    return int(np.abs(cols[:, a] - cols[:, b]).sum())

# One unit is three spindles, which is also four sawtooth teeth (~449 px at 2x).
best = None
for P in range(440, 460):
    for u in range(W // 2 - 300, W // 2 + 300):
        seam = diff(u, u + P) + diff(u + 1, u + P + 1) + diff(u - 1, u + P - 1)
        if best is None or seam < best[0]:
            best = (seam, P, u)
_, P, u = best
# The left cap ends where its last column matches the unit's first column.
cbest = None
for c in range(int(W * 0.13), int(W * 0.24)):
    s = diff(c, u) + diff(c + 1, u + 1) + diff(c - 1, u - 1)
    if cbest is None or s < cbest[0]:
        cbest = (s, c)
c = cbest[1]
print("unit", P / 2, "start", u / 2, "seam", best[0], "cap end", c / 2, "cap seam", cbest[0])

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
path = "".join(parts)

def write(name, x0, x1):
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{f(x1 - x0)}" height="{f(H)}" viewBox="{f(x0)} 0 {f(x1 - x0)} {f(H)}" preserveAspectRatio="none">'
           f'<path fill="#1B2A55" fill-rule="evenodd" d="{path}"/></svg>\n')
    open(f"{out}/{name}", "w").write(svg)
    print(name, f(x1 - x0), f(H))

write("orn-frieze-cap-l.svg", 0, c)
write("orn-frieze-unit.svg", u, u + P)
write("orn-frieze-cap-r.svg", W - c, W)
