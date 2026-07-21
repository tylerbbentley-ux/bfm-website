# Bentley Financial Management — website

A static, multi-page site for BFM: a boutique, LPL-affiliated wealth manager with an
in-house equity research engine. No build step, no framework — plain HTML + CSS. It will
run on any host once it's approved for publishing.

**Location:** `~/BFM-project/website/` (inside the BFM repo).

## Pages
| File | Nav label | Page |
|------|-----------|------|
| `index.html` | Home | Positioning + the three research disciplines + honest technology |
| `about.html` | About | The team (Tom, Tyler, Courtney) + who we serve |
| `philosophy.html` | Our Approach | The 4-step research method + technology + risk-tailoring |
| `services.html` | What We Do | Wealth management + the research engine + fees |
| `edge.html` | Our Edge | Deep dive: the universe problem, a decision memo, honest AI |
| `contact.html` | Contact | Details + inquiry form + the named team |
| `styles.css` | — | Shared styles (colors, type, layout) |
| `script.js` | — | Mobile menu + scroll-reveal |
| `favicon.svg` | — | Browser-tab icon |

## Preview it

**On this Mac:**
```bash
python3 -m http.server 5178 --directory ~/BFM-project/website
# then open http://localhost:5178
```

**On your phone (same WiFi as the Mac, Mac awake):**
```bash
python3 -m http.server 8080 --bind 0.0.0.0 --directory ~/BFM-project/website
# then on your phone open http://<your-Mac-LAN-IP>:8080   (e.g. http://192.168.1.192:8080)
```
Private to your network — nothing goes public. If the phone can't load it, allow incoming
connections for Python in System Settings → Network → Firewall.

---

## ⚠️ Fill these in before publishing
Highlighted text on the pages (dashed gold) and `[brackets]` are placeholders left blank
on purpose — real facts not to be invented. Search the files for `ph`, `placeholder`, `[`.

**Regulatory / required (LPL)**
- [ ] Replace the `[LPL DISCLOSURE …]` footer on every page with LPL's exact,
      compliance-approved wording (securities line, advisory line, separate-entities,
      state registration). Submit the whole site through LPL advertising review.
- [ ] Confirm the AI/technology language passes LPL review (written to avoid "AI-washing").

**Facts to supply**
- [ ] Team backgrounds — the `[background]` note on Tom, Tyler, and Courtney (or leave minimal).
- [ ] Fees — confirm 0.80%–1.25% of AUM matches Form ADV; add minimums / any tiering.
- [ ] Contact details — email (`hello@bentleyfm.com`), phone, office address, hours.
- [ ] Any planning specialties to name (estate/trust, business-owner exit, equity comp).

**Wiring**
- [ ] Contact form: replace `action="https://formspree.io/f/your-form-id"` with a real
      endpoint (Formspree free tier, or your CRM), confirmed with LPL.

## Deploy (later, after LPL sign-off)
Because BFM is LPL-affiliated, the public launch goes through LPL (they may require an
approved host / archiving). Do not put this on a public URL until they approve it.

## Design notes
Palette, fonts, and spacing live at the top of `styles.css` under `:root` — change `--navy`
or `--gold` there and it updates site-wide. Headline font is Cormorant Garamond (Google
Fonts) with a Georgia fallback.
