import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const ORIGIN = { x: 90, y: 400 };
const DESTINATION = { x: 1310, y: 100 };

const ROUTE_D =
  "M 90 400 C 220 360 300 440 260 470 C 210 505 130 460 190 410 C 300 320 430 430 540 350 C 620 290 600 220 690 210 C 800 198 830 290 930 250 C 1040 206 1010 130 1120 115 C 1190 105 1230 150 1310 100";

// large, irregular "state silhouette" style blotches that bleed into the corners
const ORIGIN_BLOB =
  "M 301.7 0 C 306.4 88.3 269.1 34.2 222.1 142.7 C 175.1 251.3 237.2 306.6 154.9 339.2 C 72.6 371.7 87.3 268.9 -35.1 244.4 C -157.6 220 -143.6 313.1 -227.8 262.9 C -311.9 212.6 -296.2 193.7 -298.2 87.6 C -300.2 -18.5 -257.8 41.9 -233.9 -68.7 C -210.1 -179.3 -287.7 -204.3 -223.7 -258.2 C -159.8 -312 -148.9 -224.8 -34.1 -236.9 C 80.8 -249.1 58 -329.3 135.2 -296.1 C 212.5 -263 154 -228 207.3 -133.2 C 260.5 -38.4 296.9 -88.3 301.7 0 Z";

const DESTINATION_BLOB =
  "M 412.5 0 C 455.1 117.1 429.4 107.8 351.3 225.8 C 273.2 343.8 291.3 368.4 168.4 368.8 C 45.5 369.2 92.5 262.8 -32.6 227 C -157.8 191.3 -140 302.3 -222.7 257 C -305.4 211.7 -262.1 197.2 -291.1 85.5 C -320.1 -26.2 -356.3 -6.7 -313.3 -92 C -270.4 -177.3 -245.6 -130.4 -156.9 -181 C -68.1 -231.7 -127.1 -218.7 -36 -250.4 C 55.1 -282.1 46.6 -315.4 127.9 -280.1 C 209.2 -244.8 127.1 -229.8 218.1 -140.2 C 309.2 -50.6 369.8 -117.1 412.5 0 Z";

// airplane silhouette (top view), nose points along +X at rest so autoRotate tracks the path
const PLANE_D =
  "M23 12 L16 10.8 L6 3 L13 10.4 L9 10.8 L3 7 L6.5 10.6 L1 12 L6.5 13.4 L3 17 L9 13.2 L13 13.6 L6 21 L16 13.2 Z";

const PIN_SCALE = 0.55;
const PIN_TIP_OFFSET = 26 * PIN_SCALE;

export default function FlightRoute({ className = "" }) {
  const wrapRef = useRef(null);
  const guidePathRef = useRef(null);
  const planeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(planeRef.current, { xPercent: -50, yPercent: -50 });

      gsap.to(planeRef.current, {
        ease: "none",
        motionPath: {
          path: guidePathRef.current,
          align: guidePathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 80%",
          end: "bottom 45%",
          scrub: 0.6,
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1400 500"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        fill="none"
      >
        {/* origin blotch — orange, like a state silhouette around the departure point */}
        <g transform={`translate(${ORIGIN.x}, ${ORIGIN.y})`}>
          <path d={ORIGIN_BLOB} fill="#FF8219" fillOpacity="0.18" />
        </g>

        {/* destination blotch — blue, like a state silhouette around the arrival point */}
        <g transform={`translate(${DESTINATION.x}, ${DESTINATION.y})`}>
          <path d={DESTINATION_BLOB} fill="#2575fc" fillOpacity="0.16" />
        </g>

        {/* invisible guide path (drives the plane's motion) */}
        <path ref={guidePathRef} d={ROUTE_D} fill="none" stroke="none" />

        {/* dotted route, visible from the start */}
        <path
          d={ROUTE_D}
          fill="none"
          stroke="#2575fc"
          strokeOpacity="0.35"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="1 16"
        />

        {/* origin marker */}
        <g>
          <circle cx={ORIGIN.x} cy={ORIGIN.y} r="16" fill="#2575fc" fillOpacity="0.15" />
          <circle cx={ORIGIN.x} cy={ORIGIN.y} r="8" fill="#2575fc" stroke="white" strokeWidth="3" />
        </g>

        {/* destination pin — scaled down, tip aligned exactly to the route's end point */}
        <g
          transform={`translate(${DESTINATION.x}, ${DESTINATION.y - PIN_TIP_OFFSET}) scale(${PIN_SCALE})`}
        >
          <path
            d="M0 -32C-10.5 -32 -19 -23.5 -19 -13C-19 3 0 26 0 26C0 26 19 3 19 -13C19 -23.5 10.5 -32 0 -32Z"
            fill="#FF8219"
            stroke="white"
            strokeWidth="2.5"
          />
          <circle cx="0" cy="-13" r="6.5" fill="white" />
        </g>
      </svg>

      {/* plane, follows the guide path with correct heading on every curve */}
      <div
        ref={planeRef}
        className="absolute top-0 left-0 w-14 h-14 text-brand-orange drop-shadow-md"
        style={{ willChange: "transform" }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d={PLANE_D} />
        </svg>
      </div>
    </div>
  );
}
