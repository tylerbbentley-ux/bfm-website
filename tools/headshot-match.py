#!/usr/bin/env python3
"""BFM website headshot matcher — one pass, one house style.

Main team tiles (tom/tyler/courtney): kill grain+stubble crunch with an
edge-preserving bilateral filter, restore eye/feature crispness with a light
unsharp, match tone percentiles to the reference (tom.jpg = reference look).
Support photos (golda et al.): flat-field the wall to uniform lighting.

Run from repo root with the website venv:
  .venv/bin/python website/tools/headshot-match.py
Writes in place under website/assets/ — bump the ?v= tags in about.html after.
"""
import cv2
import numpy as np
from PIL import Image, ImageFilter

ASSETS = "/Users/tylerbentley/BFM-project/website/assets"


def smooth_match(path, strength):
    """Edge-preserving de-crunch: bilateral kills grain/stubble noise, keeps edges."""
    im = np.array(Image.open(path).convert("L"))
    d, sc = {"moderate": (7, 35), "strong": (9, 50)}[strength]
    sm = cv2.bilateralFilter(im, d, sc, 9)
    out = Image.fromarray(sm).filter(ImageFilter.UnsharpMask(radius=1.2, percent=45, threshold=3))
    return out


def flatfield_wall(path):
    """Force the wall to uniform lighting; keep weave texture; protect the subject."""
    from rembg import remove, new_session
    im = Image.open(path).convert("RGB")
    g = np.array(im.convert("L")).astype(np.float32)
    alpha = np.array(remove(im, session=new_session("u2net_human_seg"), only_mask=True))
    subj = cv2.dilate((alpha > 40).astype(np.uint8), np.ones((11, 11), np.uint8))
    wall = subj == 0
    target = np.median(g[wall])
    filled = g.copy()
    filled[~wall] = target
    illum = cv2.GaussianBlur(filled, (0, 0), 30)
    texture = g - illum
    flat = target + texture          # fully uniform lighting, texture preserved
    feather = cv2.GaussianBlur(wall.astype(np.float32), (0, 0), 3)
    out = g * (1 - feather) + flat * feather
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))


if __name__ == "__main__":
    for strength in ("moderate", "strong"):
        smooth_match(f"{ASSETS}/tyler.jpg", strength).convert("RGB").save(
            f"/tmp/tyler_{strength}.jpg", quality=92)
        smooth_match(f"{ASSETS}/courtney.jpg", strength).convert("RGB").save(
            f"/tmp/courtney_{strength}.jpg", quality=92)
    flatfield_wall(f"{ASSETS}/golda.jpg").convert("RGB").save("/tmp/golda_flat.jpg", quality=92)
    print("candidates written to /tmp")
