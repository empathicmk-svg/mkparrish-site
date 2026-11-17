"""Upscale a photo with Real-ESRGAN (x4plus) on the CPU, through ncnn.

This is how the Sprinter upfit photos (marketing/mercedes-smithtown/media/
sprinter-upfit-*.jpg) and the HD seat-row stills were made.

Setup (once):
    python3 -m venv .venv-upscale && .venv-upscale/bin/pip install ncnn numpy pillow
    curl -LO https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesrgan-ncnn-vulkan-20220424-ubuntu.zip
    unzip realesrgan-ncnn-vulkan-20220424-ubuntu.zip 'models/realesrgan-x4plus.*' -d esrgan

Usage:
    .venv-upscale/bin/python scripts/images/upscale.py esrgan/models IN OUT [--width 1700] [--pre 40]

--pre N  first shrinks the input to N% with a Gaussian filter. A photo of a
         monitor carries the screen's pixel grid as moire stripes, and the
         model sharpens those into hard lines. Shrinking to about 40% removes
         them and the model rebuilds clean detail. Use it for screen photos.
         For a video frame, 50 is a good value: it drops the compression noise.
--width  resizes the result to this width (the model's output is 4x).
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
import ncnn

args = sys.argv[1:]
if len(args) < 3:
    sys.exit(__doc__)
model_dir, src, out = args[:3]
opt = lambda name: int(args[args.index(name) + 1]) if name in args else None
width, pre = opt('--width'), opt('--pre')

net = ncnn.Net()
net.opt.use_vulkan_compute = False
net.opt.num_threads = 4
net.load_param(f'{model_dir}/realesrgan-x4plus.param')
net.load_model(f'{model_dir}/realesrgan-x4plus.bin')

im = Image.open(src).convert('RGB')
if pre:
    k = pre / 100
    im = im.filter(ImageFilter.GaussianBlur(0.75 / k)).resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
img = np.asarray(im)
H, W, _ = img.shape
TILE, PAD, S = 192, 12, 4
result = np.zeros((H * S, W * S, 3), dtype=np.float32)

# Run in overlapping tiles so memory stays small, keeping only each tile's centre.
for y in range(0, H, TILE):
    for x in range(0, W, TILE):
        y0, x0 = max(y - PAD, 0), max(x - PAD, 0)
        y1, x1 = min(y + TILE + PAD, H), min(x + TILE + PAD, W)
        tile = np.ascontiguousarray(img[y0:y1, x0:x1])
        m = ncnn.Mat.from_pixels(tile.tobytes(), ncnn.Mat.PixelType.PIXEL_RGB, x1 - x0, y1 - y0)
        m.substract_mean_normalize([0, 0, 0], [1 / 255.0] * 3)
        ex = net.create_extractor()
        ex.input('data', m)
        _, o = ex.extract('output')
        o = np.array(o).transpose(1, 2, 0)
        ty, tx = (y - y0) * S, (x - x0) * S
        th, tw = (min(y + TILE, H) - y) * S, (min(x + TILE, W) - x) * S
        result[y * S:y * S + th, x * S:x * S + tw] = o[ty:ty + th, tx:tx + tw]

res = Image.fromarray((np.clip(result, 0, 1) * 255 + 0.5).astype(np.uint8))
if width:
    res = res.resize((width, round(res.height * width / res.width)), Image.LANCZOS)
res.save(out, quality=95)
print(f'  {src} -> {out} ({res.width}x{res.height})')
