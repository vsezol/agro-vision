import { RGB } from "./rgb";

export function hexToRgb(hex: string): RGB {
  hex = hex.replace("#", "");

  const number = parseInt(hex, 16);

  const r = (number >> 16) & 255;
  const g = (number >> 8) & 255;
  const b = number & 255;

  return [r, g, b];
}
