"""Writes the ATS resume as a Word document.

Called by scripts/build-master-resume.mjs, which pipes the resume data in as JSON on stdin:

    python3 scripts/lib/master-resume-docx.py <out.docx>  < data.json

Single column, real headings and real list paragraphs, no tables, text boxes, headers or
footers: the layout applicant tracking systems parse most reliably. Fonts are ones every
machine has (Arial, Georgia); the accent is the site's lipstick pink.
"""

import json
import sys

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor

LIPSTICK = RGBColor(0xB4, 0x32, 0x59)
INK = RGBColor(0x1A, 0x1A, 0x1A)
GREY = RGBColor(0x44, 0x44, 0x44)

data = json.load(sys.stdin)
out = sys.argv[1]

doc = Document()
for s in doc.sections:
    s.top_margin = s.bottom_margin = Inches(0.6)
    s.left_margin = s.right_margin = Inches(0.75)

normal = doc.styles["Normal"]
normal.font.name = "Arial"
normal.font.size = Pt(10)
normal.font.color.rgb = INK
normal.paragraph_format.space_after = Pt(0)
normal.paragraph_format.line_spacing = 1.12

doc.core_properties.author = "Mary Kate Parrish"
doc.core_properties.title = f"Mary Kate Parrish - {data['title']}"
# Word caps core properties at 255 characters.
doc.core_properties.keywords = ", ".join(data["expertise"][:8])


def para(text="", size=10, bold=False, italic=False, color=INK, font=None, align=None, before=0, after=0):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(before)
    p.paragraph_format.space_after = Pt(after)
    if align:
        p.alignment = align
    if text:
        r = p.add_run(text)
        r.font.size = Pt(size)
        r.bold = bold
        r.italic = italic
        r.font.color.rgb = color
        if font:
            r.font.name = font
    return p


def heading(text):
    p = doc.add_paragraph(style="Heading 2")
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(3)
    r = p.add_run(text.upper())
    r.font.name = "Arial"
    r.font.size = Pt(11)
    r.bold = True
    r.font.color.rgb = INK
    # Thin pink rule under the heading.
    border = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    for k, v in (("val", "single"), ("sz", "6"), ("space", "1"), ("color", "D94F7C")):
        bottom.set(qn(f"w:{k}"), v)
    border.append(bottom)
    p._p.get_or_add_pPr().append(border)


def bullet(text):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.space_after = Pt(1)
    r = p.add_run(text)
    r.font.size = Pt(10)
    r.font.color.rgb = INK


c = data["contact"]
plain = lambda s: s.replace(" · ", " | ")

para("MARY KATE PARRISH", size=22, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER)
para(f"{data['title']} | {plain(data['subtitle'])}", size=11, italic=True, color=LIPSTICK, font="Georgia", align=WD_ALIGN_PARAGRAPH.CENTER, before=2)
para(
    " | ".join([f"{c['location']} ({c['open'].lower()})", c["phone"], c["email"], c["linkedin"], c["site"]]),
    size=9.5,
    color=GREY,
    align=WD_ALIGN_PARAGRAPH.CENTER,
    before=3,
)

heading("Professional Summary")
para(data["summary"])

heading("Core Competencies")
para(", ".join(data["expertise"]))
p = para(before=2)
r = p.add_run("Tools: ")
r.bold = True
p.add_run(data["tools"].replace(" · ", ", "))

heading("Professional Experience")
for role in data["roles"]:
    p = para(role["title"], size=10.5, bold=True, before=7)
    p.paragraph_format.keep_with_next = True
    p = para(before=0, after=2)
    p.paragraph_format.keep_with_next = True
    r = p.add_run(role["org"])
    r.bold = True
    r.font.color.rgb = LIPSTICK
    r2 = p.add_run(f" | {role['place']} | {role['dates']}")
    r2.font.color.rgb = GREY
    for b in role["bullets"]:
        bullet(b)

heading("Selected Results")
para(data["selectedResults"].replace(" · ", "; "))

heading("Publications and Projects")
for w in data["writing"]:
    bullet(w)

heading("Education")
for e in data["education"]:
    para(e["school"], bold=True)
    para(e["detail"].replace(" · ", ", "))

doc.save(out)
