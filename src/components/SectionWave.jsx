// Smooth wave divider used where the page switches background color between
// sections. The whole site uses rounded corners and pill/circle shapes — no
// sharp points anywhere — so the transition follows the same language: one
// soft, flowing curve instead of a jagged/torn cut.
//
// `soft` swaps in a much shallower curve (and a shorter default height) for
// places where the wave should only take the edge off a hard color change,
// not read as a decorative element of its own.
const PATHS = {
  top: "M0,58 C 340,4 1100,100 1440,50 L1440,100 L0,100 Z",
  bottom: "M0,42 C 340,96 1100,0 1440,50 L1440,0 L0,0 Z",
  softTop: "M0,66 C 380,44 1060,88 1440,62 L1440,100 L0,100 Z",
  softBottom: "M0,34 C 380,56 1060,12 1440,38 L1440,0 L0,0 Z",
};

const HEIGHTS = {
  xs: "h-3 md:h-5",
  sm: "h-5 md:h-8",
  md: "h-10 md:h-16",
};

export default function SectionWave({ position = "top", color, size, soft = false }) {
  const key = soft
    ? position === "top"
      ? "softTop"
      : "softBottom"
    : position;

  const heightClass = HEIGHTS[size || (soft ? "xs" : "md")] || HEIGHTS.md;

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 w-full ${heightClass} ${
        position === "top" ? "top-0 -translate-y-full" : "bottom-0 translate-y-full"
      }`}
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
    >
      <path d={PATHS[key]} fill={color} />
    </svg>
  );
}
