"""Rebuild the spindle frieze as evenly spaced parts: two end caps and a repeating unit.

ChatGPT's drawing has spindles and teeth that drift by a few pixels, so cutting a repeat straight
out of it leaves uneven gaps at every seam. Instead, this copies one clean spindle and one clean run
of four teeth and lays them out on an exact grid: three spindles (75 px apart) over four teeth per
unit. The end caps keep the original wheel brackets and use the same grid past the wheel.

usage: python3 -I frieze2.py ornament-spindle-frieze.png out_dir
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
import potrace

src, out = sys.argv[1], sys.argv[2]
K = 2  # work at 2x for smoother curves
im = Image.open(src).convert("RGB")
im = im.resize((im.width * K, im.height * K), Image.LANCZOS)
lum = np.asarray(im.convert("L").filter(ImageFilter.GaussianBlur(1.6)), dtype=np.float32)
M = lum < 150
mid = M.shape[1] // 2
M = np.concatenate([M[:, :mid], M[:, :mid][:, ::-1][:, : M.shape[1] - mid]], axis=1)

def runs(row, x0=0, x1=None):
    r, ins = [], False
    for x in range(x0, x1 or len(row)):
        if row[x] and not ins:
            s, ins = x, True
        elif not row[x] and ins:
            r.append((s + x - 1) / 2)
            ins = False
    return r

ys, xs = np.nonzero(M)
Y0, Y1 = ys.min() - 4, ys.max() + 5          # full height, legs included
rows = M[:, int(M.shape[1] * 0.3): int(M.shape[1] * 0.7)].sum(1)
# bottom rail: the last run of near-full-width rows above the teeth
full = np.nonzero(rows > 0.95 * int(M.shape[1] * 0.4))[0]
YRB = full.max() + 1                         # first row below the bottom rail
midrows = M[:, int(M.shape[1] * 0.3): int(M.shape[1] * 0.7)].sum(1)   # middle only, so the legs don't count
teeth_h = np.nonzero(midrows[YRB:] == 0)[0][0]
tips_row = YRB + int(0.8 * teeth_h)
teeth_bottom = YRB + teeth_h + 2

spin_row = int((Y0 + YRB) / 2 + 0.1 * (YRB - Y0))
spindles = runs(M[spin_row], int(M.shape[1] * 0.14), int(M.shape[1] * 0.86))
tips = [x for x in runs(M[tips_row]) if 150 * K < x < M.shape[1] - 150 * K]
print("spindles", [round(s / K) for s in spindles])
print("teeth", [round(t / K) for t in tips])

P = 75 * K                                   # spindle pitch
T = P * 3 / 4                                # tooth pitch (4 teeth per 3 spindles)
UNIT = 3 * P

# one clean spindle near the middle of the left half
c = int(round(min(spindles[2:6], key=lambda s: abs(s - M.shape[1] * 0.3))))
spindle = M[Y0:YRB, c - P // 2: c - P // 2 + P]
assert not spindle[:, 0].sum() > (YRB - Y0) * 0.5, "spindle tile edge should be rail only"
rail_col = spindle[:, 0:1]

# four clean teeth, vertex to vertex, resampled to exactly 4 * T
t = [x for x in tips if x > M.shape[1] * 0.25][:5]
v0, v4 = (t[0] - (t[1] - t[0]) / 2), (t[3] + (t[4] - t[3]) / 2)
teeth_img = Image.fromarray((M[YRB:teeth_bottom, int(v0):int(v4)] * 255).astype(np.uint8))
teeth = np.asarray(teeth_img.resize((UNIT, teeth_bottom - YRB), Image.LANCZOS)) > 127

Hh = Y1 - Y0
def band_with_spindles(width, centers):
    b = np.repeat(rail_col, width, axis=1).copy()
    for cx in centers:
        x0 = int(round(cx - P / 2))
        b[:, x0:x0 + P] |= spindle
    return b

# ---- repeating unit: spindles at 0.5P, 1.5P, 2.5P; tooth vertices at the edges
unit = np.zeros((Hh, UNIT), bool)
unit[: YRB - Y0] = band_with_spindles(UNIT, [P / 2, 1.5 * P, 2.5 * P])
unit[YRB - Y0: teeth_bottom - Y0] = teeth

# ---- left cap: original up to the wheel's edge, then the same grid
first_tooth_vertex = tips[0] - (tips[1] - tips[0]) / 2   # where the original teeth begin
wheel_edge = spindles[0] + 7 * K                          # just past the wheel ring
# cap ends on a tooth vertex, so the grid lines up with the unit's left edge
k = 1
while first_tooth_vertex + k * T - P / 2 < wheel_edge + 16 * K:
    k += 1
cap_end = int(round(first_tooth_vertex + k * T))
cap = M[Y0:Y1, :cap_end].copy()
xw = int(wheel_edge)
cap[: YRB - Y0, xw:] = band_with_spindles(cap_end, [cap_end - P / 2])[:, xw:cap_end]
# teeth: keep the original first tooth under the bracket, then tile the unit's teeth
xt = int(round(first_tooth_vertex))
cap[YRB - Y0: teeth_bottom - Y0, xt:] = False
reps = int(np.ceil((cap_end - xt) / UNIT)) + 1
tiled = np.tile(teeth, (1, reps))
cap[YRB - Y0: teeth_bottom - Y0, xt:cap_end] = tiled[:, tiled.shape[1] - (cap_end - xt):]
cap[YRB - Y0: teeth_bottom - Y0, :xt] |= M[YRB:teeth_bottom, :xt]
print("cap width", cap_end / K, "first grid spindle at", (cap_end - P / 2) / K, "wheel edge", wheel_edge / K)

def trace(mask, name):
    bm = potrace.Bitmap(~mask)
    pl = bm.trace(turdsize=40, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY,
                  alphamax=1.0, opticurve=True, opttolerance=0.25)
    f = lambda v: f"{v / K:.1f}".rstrip("0").rstrip(".")
    parts = []
    for curve in pl:
        sp = curve.start_point
        d = [f"M{f(sp.x)} {f(sp.y)}"]
        for seg in curve.segments:
            if seg.is_corner:
                d.append(f"L{f(seg.c.x)} {f(seg.c.y)}L{f(seg.end_point.x)} {f(seg.end_point.y)}")
            else:
                d.append(f"C{f(seg.c1.x)} {f(seg.c1.y)} {f(seg.c2.x)} {f(seg.c2.y)} {f(seg.end_point.x)} {f(seg.end_point.y)}")
        d.append("Z")
        parts.append("".join(d))
    h, w = mask.shape
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{f(w)}" height="{f(h)}" viewBox="0 0 {f(w)} {f(h)}" preserveAspectRatio="none">'
           f'<path fill="#1B2A55" fill-rule="evenodd" d="{"".join(parts)}"/></svg>\n')
    open(f"{out}/{name}", "w").write(svg)
    print(name, f(w), f(h), len(svg) // 1024, "KB")

trace(cap, "orn-frieze-cap-l.svg")
trace(unit, "orn-frieze-unit.svg")
trace(cap[:, ::-1], "orn-frieze-cap-r.svg")
Image.fromarray((np.concatenate([cap, unit, unit, unit, cap[:, ::-1]], axis=1) * 255).astype(np.uint8)).save(f"{out}/../frieze-check.png") if False else None
np.save("/tmp/claude-0/-home-user-GatorGetaway/c24bfb1f-0843-5c17-b792-630b77aa1482/scratchpad/frieze_preview.npy",
        np.concatenate([cap, unit, unit, unit, cap[:, ::-1]], axis=1))
