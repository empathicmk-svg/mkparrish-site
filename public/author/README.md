# Author photo

The About page hero (`app/about/page.tsx`) loads the author portrait from:

    public/author/mk-parrish.jpg

Right now this is a branded **placeholder** (an "MK" monogram). To use the real
photo, simply replace that file with the actual image — keep the same filename
and no code changes are needed.

**Recommended specs**
- Portrait orientation, roughly 4:5 (e.g. 800×1000 or larger)
- JPG, under ~500 KB
- It is rendered in grayscale to match the site's monochrome aesthetic, so any
  color photo will work — it will be desaturated automatically.
