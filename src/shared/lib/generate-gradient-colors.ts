import { RGB } from "./rgb";

export function generateGradientColors(
  startRgb: RGB,
  endRgb: RGB,
  size: number
): RGB[] {
  return Array.from({ length: size }).map((_, i) => {
    const ratio = i / (size - 1);
    const r = Math.round(startRgb[0] * (1 - ratio) + endRgb[0] * ratio);
    const g = Math.round(startRgb[1] * (1 - ratio) + endRgb[1] * ratio);
    const b = Math.round(startRgb[2] * (1 - ratio) + endRgb[2] * ratio);

    return [r, g, b];
  });
}
