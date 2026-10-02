"""Regenerate assets/js/certs.js from the LinkedIn data export.

LinkedIn has no public API and blocks scraping, so the supported route is the
official export: Settings > Data privacy > Get a copy of your data > pick
"Certifications" (or the full archive). Unzip it and run:

    python tools/build-certs.py path/to/Certifications.csv

Issuer logos live in assets/img/issuers/<issuer>.png (lowercase letters and
digits only, e.g. microsoft.png); add one and re-run to show it on the cards.

Columns used: Name, Url, Authority, Started On, Finished On, License Number.
"""
import csv
import json
import sys
from pathlib import Path

LOGOS = Path(__file__).resolve().parent.parent / "assets" / "img" / "issuers"

MONTHS = {m: i for i, m in enumerate(
    "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(), 1)}


def iso(v):
    """'Mar 2025' / '2025' / '' -> '2025-03' / '2025-01' / None."""
    parts = (v or "").split()
    try:
        if len(parts) == 2:
            return "%04d-%02d" % (int(parts[1]), MONTHS[parts[0][:3].title()])
        if len(parts) == 1:
            return "%04d-01" % int(parts[0])
    except (ValueError, KeyError):
        pass
    return None


def logo(issuer):
    """assets/img/issuers/<issuer, lowercased, letters only>.png, if present."""
    slug = "".join(ch for ch in issuer.lower() if ch.isalnum())
    return "assets/img/issuers/%s.png" % slug if (LOGOS / (slug + ".png")).exists() else None


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    with open(sys.argv[1], newline="", encoding="utf-8-sig") as f:
        rows = list(csv.DictReader(f))

    certs = []
    for r in rows:
        c = {
            "name": (r.get("Name") or "").strip(),
            "issuer": (r.get("Authority") or "").strip(),
            "logo": None,
            "issued": iso(r.get("Started On")),
            "expires": iso(r.get("Finished On")),
            "id": (r.get("License Number") or "").strip() or None,
            "url": (r.get("Url") or "").strip() or None,
        }
        c["logo"] = logo(c["issuer"])
        if c["name"]:
            certs.append({k: v for k, v in c.items() if v})

    out = Path(__file__).resolve().parent.parent / "assets" / "js" / "certs.js"
    out.write_text(
        "/* Certifications shown on the page. Generated from the LinkedIn data export\n"
        "   by tools/build-certs.py — do not edit by hand. Order does not matter:\n"
        "   the page sorts by issue date and shows the newest. */\n"
        "window.CERTS = " + json.dumps(certs, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8")
    print("wrote %d certifications to %s" % (len(certs), out))


if __name__ == "__main__":
    main()
