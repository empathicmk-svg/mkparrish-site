/**
 * "Flow lines": a bundle of fine lines that fans out like a road
 * at speed. Plain JavaScript, so the /libi page animates it on a canvas and
 * scripts/libi/build.mjs draws the same art into the printed signs and cards.
 *
 * drawFlowLines(ctx, width, height, time, options)
 *   time     seconds; pass a fixed number for a still frame
 *   options  { count, rgb, alpha, focusY, spread, lineWidth, origin }
 *            origin: "left" fans out to the right, "center" fans out both ways
 */
export function drawFlowLines(ctx, w, h, t = 0, o = {}) {
  const count = o.count ?? 28;
  const rgb = o.rgb ?? "255,255,255";
  const alpha = o.alpha ?? 0.55;
  const focusY = o.focusY ?? 0.6;
  const spread = o.spread ?? 0.95;
  const lw = o.lineWidth ?? 1;
  const center = o.origin === "center";

  ctx.clearRect(0, 0, w, h);
  ctx.lineCap = "round";

  for (let i = 0; i < count; i++) {
    const k = count === 1 ? 0 : i / (count - 1) - 0.5;
    const lead = Math.abs(k) < 0.5 / count;
    ctx.beginPath();
    for (let x = 0; x <= w + 6; x += 6) {
      const u = x / w;
      const d = center ? Math.abs(u - 0.5) * 2 : u;
      const fan = 0.05 + spread * Math.pow(d, 1.55);
      const wave =
        Math.sin(u * 5.2 + t * 0.55 + i * 0.37) * 0.016 +
        Math.sin(u * 11.5 - t * 0.35 + i * 0.83) * 0.007;
      const y = h * (focusY + k * fan + wave * (0.25 + d));
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    const a = Math.max(0.06, alpha * (1 - Math.abs(k) * 1.5)) * (lead ? 1.6 : 1);
    const g = ctx.createLinearGradient(0, 0, w, 0);
    if (center) {
      g.addColorStop(0, `rgba(${rgb},${a * 0.5})`);
      g.addColorStop(0.5, `rgba(${rgb},${Math.min(1, a * 1.2)})`);
      g.addColorStop(1, `rgba(${rgb},${a * 0.5})`);
    } else {
      g.addColorStop(0, `rgba(${rgb},0)`);
      g.addColorStop(0.35, `rgba(${rgb},${a})`);
      g.addColorStop(1, `rgba(${rgb},${a * 0.45})`);
    }
    ctx.strokeStyle = g;
    ctx.lineWidth = lead ? lw * 1.8 : lw;
    ctx.shadowColor = lead ? `rgba(${rgb},0.9)` : "transparent";
    ctx.shadowBlur = lead ? 14 * lw : 0;
    ctx.stroke();
  }
  ctx.shadowBlur = 0;
}
