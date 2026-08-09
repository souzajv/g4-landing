// Open shipping-box silhouette, traced from the reference open-box glyph
// (flaps folded open, diamond opening on top, handle cutouts on both front
// faces). Single evenodd path so the diamond and handle holes render as true
// negative space (transparent), letting whatever sits behind it show through.
const BOX_D =
  "M 0.00,18.83 L 13.76,23.42 L 1.74,39.40 L 36.55,48.92 L 50.03,33.63 L 64.49,47.05 L 100.00,36.97 L 85.13,22.10 L 77.55,9.38 L 42.88,0.00 L 41.70,1.32 L 47.74,12.65 L 35.30,8.76 Z " +
  "M 51.91,38.29 L 51.84,79.15 L 85.27,69.84 L 85.48,43.71 L 64.00,49.13 Z " +
  "M 49.55,37.60 L 37.53,51.01 L 15.98,45.59 L 16.12,69.77 L 49.62,79.15 Z " +
  "M 19.87,22.86 L 49.90,15.43 L 80.13,22.86 L 50.10,31.06 Z " +
  "M 19.94,59.76 L 20.50,59.35 L 21.20,59.35 L 30.92,62.33 L 31.48,63.10 L 31.34,69.56 L 30.72,70.05 L 30.02,70.05 L 20.22,66.99 L 19.74,66.09 L 19.74,60.46 Z " +
  "M 81.51,59.76 L 81.65,66.44 L 81.24,66.99 L 71.44,70.05 L 70.74,70.05 L 70.12,69.56 L 69.98,63.17 L 70.54,62.33 L 80.26,59.35 L 80.96,59.35 Z " +
  "M 79.57,61.85 L 72.13,64.07 L 72.13,67.55 L 79.50,65.32 Z " +
  "M 21.89,61.85 L 21.96,65.32 L 29.33,67.55 L 29.33,64.07 Z";

export default function OpenBoxIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 100 79.2" className={className} aria-hidden="true">
      <path d={BOX_D} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
