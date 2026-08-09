import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Drop-in smooth scroll, synced with GSAP's ScrollTrigger — same setup used on
// the Inteli Júnior landing page (Lenis driven by gsap.ticker instead of its
// own rAF loop, so every scroll-linked animation on the site stays in lockstep).
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const handleAnchorClick = (event) => {
      const anchor = event.currentTarget;
      const href = anchor.getAttribute("href");
      if (!href || href === "#" || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (target) {
        event.preventDefault();
        lenis.scrollTo(target, { offset: -90 });
      }
    };

    const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));
    anchors.forEach((anchor) => anchor.addEventListener("click", handleAnchorClick));

    const handleRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", handleRefresh);
    window.addEventListener("resize", handleRefresh);
    ScrollTrigger.refresh();

    return () => {
      anchors.forEach((anchor) => anchor.removeEventListener("click", handleAnchorClick));
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
      window.removeEventListener("resize", handleRefresh);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return null;
}
