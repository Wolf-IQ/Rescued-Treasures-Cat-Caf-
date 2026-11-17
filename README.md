# Rescued Treasures Cat Café by PALNV: homepage redesign concept

A static redesign concept for [PALNV](https://www.palnv.org/) and the Rescued Treasures Cat Café in Las Vegas.
It's built in plain HTML, CSS and JavaScript, with no build step and no dependencies.

**Live preview:** https://wolf-iq.github.io/Rescued-Treasures-Cat-Caf-/

## Pages

| File | What it is |
|---|---|
| `index.html` | Homepage: cat-led hero, rescue gallery, café experience, impact, ways to help, visit info |
| `book.html` | Booking **prototype**. It only hands off to PALNV's real Acuity booking page and never confirms a booking itself |
| `adopt.html` | Adoption page with an honest empty state, an age filter over clearly labelled concept examples, and the adoption process |

## Run locally

```bash
git clone https://github.com/Wolf-IQ/Rescued-Treasures-Cat-Caf-.git
cd Rescued-Treasures-Cat-Caf-
python3 -m http.server 8000
# open http://localhost:8000
```

## Notes

- Motion uses CSS plus IntersectionObserver. All of it is turned off under `prefers-reduced-motion`, and pointer parallax is desktop only.
- Content stays visible if the JavaScript fails.
- There are no prices, fees or invented statistics. Impact figures come from palnv.org's "Our Impact" table (checked 17 Nov 2026).
- See `CREDITS.md` for image sources and the open client questions.
