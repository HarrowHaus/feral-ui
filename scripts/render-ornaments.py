import os
import re
from pathlib import Path

try:
    import cairosvg
    from PIL import Image, ImageDraw, ImageFont
except ImportError as exc:
    raise SystemExit("Missing deps. Install with: python -m pip install cairosvg pillow") from exc

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src/components/ui/ornaments.tsx"
OUT = ROOT / "orn-audit"
OUT.mkdir(exist_ok=True)

source = SRC.read_text()
pattern = re.compile(r"export function (Feral\w+)\(props: FeralOrnamentProps\) \{ return <(Svg|StrokeSvg) \{\.\.\.props\}>(.*?)</\2>; \}")

cells = []
for name, kind, body in pattern.findall(source):
    if name in {"FeralReceiptTag", "FeralPointerHand", "FeralSkullBubble", "FeralNoiseBadge"}:
        continue
    body = body.replace("strokeWidth", "stroke-width").replace("strokeLinecap", "stroke-linecap")
    if kind == "Svg":
        view_box = "0 0 100 100"
        style = "fill:#bfff00;stroke:#0a0a0a;stroke-width:4;stroke-linejoin:round;color:#0a0a0a"
    else:
        view_box = "0 0 120 80"
        style = "fill:none;stroke:#3d2bff;stroke-width:7;stroke-linecap:round;stroke-linejoin:round;color:#3d2bff"
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view_box}" width="160" height="160" style="{style}">{body}</svg>'
    png = OUT / f"{name}.png"
    cairosvg.svg2png(bytestring=svg.encode(), write_to=str(png), background_color="white")
    cells.append((name, png))

cols = 5
cell = 190
label_h = 34
rows = (len(cells) + cols - 1) // cols
sheet = Image.new("RGB", (cols * cell, rows * (cell + label_h)), "white")
draw = ImageDraw.Draw(sheet)
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 14)
except Exception:
    font = ImageFont.load_default()

for i, (name, png) in enumerate(cells):
    x = (i % cols) * cell + 15
    y = (i // cols) * (cell + label_h) + 5
    sheet.paste(Image.open(png).resize((160, 160)), (x, y))
    draw.text((x, y + 164), name.replace("Feral", ""), fill="black", font=font)

sheet.save(OUT / "contact-sheet.png")
print(f"sheet: {len(cells)} ornaments -> {OUT / 'contact-sheet.png'}")
