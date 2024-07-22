import { RGB } from "./rgb";

export function rgbToHex([r, g, b]: RGB): string {
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
}
