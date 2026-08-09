import { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// winding delivery-route line across the section — same visual language as
// FlightRoute.jsx's dotted path in CoverageStatement (small dot-dash
// pattern, rounded caps), and deliberately irregular the same way: varying
// bump heights and spacing rather than a perfectly even, repeating wave, so
// it reads as a route with turns instead of a mechanical sine curve.
const ROUTE_D =
  "M -40 130 C -8 109 60 12 120 25 C 180 38 208 191 260 195 C 312 199 338 54 380 45 C 422 36 426 156 470 150 C 514 144 542 4 600 15 C 658 26 694 190 760 205 C 826 220 866 125 930 90 C 994 55 1022 13 1080 30 C 1138 47 1168 165 1220 175 C 1272 185 1292 89 1340 80 C 1388 71 1436 120 1460 130";

// Decorative background route for the Stats section. Rather than being
// static like FlightRoute's, this one "draws itself in" left-to-right the
// moment the section scrolls into view — same trigger moment as the
// Counter numbers — via a clip-rect that grows from 0 to full width,
// revealing the dotted path underneath instead of animating dash-offset
// (which would just slide the tiny dots instead of growing the line).
export default function StatsRoute({
  sectionRef,
  className = "",
  color = "#ffffff",
  opacity = 0.2,
}) {
  const rawId = useId();
  const clipId = `stats-route-clip-${rawId.replace(/[:]/g, "")}`;
  const rectRef = useRef(null);

  useEffect(() => {
    // sem um trigger válido o ScrollTrigger nunca dispara e o clip fica em 0,
    // deixando o traçado invisível — cai no próprio svg nesse caso
    const trigger = sectionRef?.current || rectRef.current?.ownerSVGElement;
    if (!trigger) return;

    const ctx = gsap.context(() => {
      gsap.set(rectRef.current, { attr: { width: 0 } });
      gsap.to(rectRef.current, {
        attr: { width: 1480 },
        duration: 3.4,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 ${className}`}
      viewBox="0 0 1400 220"
      preserveAspectRatio="none"
    >
      <defs>
        <clipPath id={clipId}>
          <rect ref={rectRef} x="-20" y="0" width="0" height="220" />
        </clipPath>
      </defs>
      <path
        d={ROUTE_D}
        fill="none"
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="1 16"
        clipPath={`url(#${clipId})`}
      />
    </svg>
  );
}
