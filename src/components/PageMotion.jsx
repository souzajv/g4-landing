import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageMotion } from "../lib/motion";
gsap.registerPlugin(ScrollTrigger);
export default function PageMotion() {
  const { enabled } = usePageMotion();
  useLayoutEffect(() => {
    if (!enabled) return;
    const context = gsap.context(() => {
      document.querySelectorAll("[data-reveal]").forEach((element) => {
        // The process sequence has its own stagger; do not animate it twice.
        if (element.closest(".process-list")) return;
        const isHeading = /^H[1-6]$/.test(element.tagName);
        const isPhoto = element.tagName === "FIGURE";
        gsap.fromTo(
          element,
          isPhoto
            ? { y: 56, opacity: 0.2 }
            : isHeading
              ? { y: 44, opacity: 0 }
              : { y: 24, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            duration: isPhoto ? 0.9 : isHeading ? 0.7 : 0.5,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
            clearProps: "transform,opacity",
          },
        );
      });
      // The image moves within a fixed crop; the reading surface stays still.
      document.querySelectorAll(".operation figure img, .process-body > figure img").forEach((image) => {
        gsap.fromTo(image, { scale: 1.12, yPercent: 3 }, {
          scale: 1.06, yPercent: -2, ease: "none",
          scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      });
      const items = gsap.utils.toArray(".service-picker button");
      gsap.from(items, {
        x: -32,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".service-picker",
          start: "top 86%",
          once: true,
        },
        clearProps: "transform,opacity",
      });
      gsap.from(".process-list li", {
        y: 36,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-list",
          start: "top 85%",
          once: true,
        },
        clearProps: "transform,opacity",
      });
      gsap.fromTo(".process-rail-fill", { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: ".process-sequence", start: "top 65%", end: "bottom 65%", scrub: 0.3 },
      });
      gsap.from(".quote-panel", {
        y: 40, opacity: 0, duration: 0.65, ease: "power3.out",
        scrollTrigger: { trigger: ".quote-panel", start: "top 86%", once: true },
        clearProps: "transform,opacity",
      });
      gsap.from(".footer-email", {
        y: 36, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".footer-email", start: "top 92%", once: true },
        clearProps: "transform,opacity",
      });
    });
    let active = true;
    const refresh = () => {
      if (active) ScrollTrigger.refresh();
    };
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });
    return () => {
      active = false;
      context.revert();
      window.removeEventListener("load", refresh);
    };
  }, [enabled]);
  return null;
}
