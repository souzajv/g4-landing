import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import OpenBoxIcon from "./OpenBoxIcon";
import TapeIcon from "./TapeIcon";
import TruckSolid from "./TruckSolid";
import { FileSearch, CalendarCheck, Radar, PackageCheck, FileCheck2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { n: "01", icon: FileSearch, title: "Cotação rápida", desc: "Apenas um clique para solicitar sua cotação, com resposta ágil da nossa equipe." },
  { n: "02", icon: CalendarCheck, title: "Coleta agendada", desc: "Programação da coleta com o veículo mais adequado para o seu tipo de carga." },
  { n: "03", icon: Radar, title: "Transporte monitorado", desc: "Rastreamento ativo por GPS e acompanhamento pela nossa central 24h." },
  { n: "04", icon: PackageCheck, title: "Entrega confirmada", desc: "Descarregamento seguro no destino, com conferência e assinatura do recebedor." },
  { n: "05", icon: FileCheck2, title: "Comprovante digital", desc: "Envio imediato do canhoto digital e emissão automática da documentação." },
];

export default function ProcessTimeline() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const lineDesktopRef = useRef(null);
  const lineMobileRef = useRef(null);
  const packageDesktopRef = useRef(null);
  const packageMobileRef = useRef(null);
  const boxRef = useRef(null);
  const tapeRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(lineDesktopRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(lineMobileRef.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(packageDesktopRef.current, { left: "0%", xPercent: -50, yPercent: -50 });
      gsap.set(packageMobileRef.current, { top: "0%", xPercent: -50, yPercent: -50 });

      const trigger = {
        trigger: trackRef.current,
        start: "top 75%",
        end: "center center",
        scrub: 2.375,
      };

      gsap.to([lineDesktopRef.current, lineMobileRef.current], {
        scaleX: 1,
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          ...trigger,
          onUpdate: (self) => {
            const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
            setActiveIndex(idx);
          },
          onLeaveBack: () => setActiveIndex(-1),
        },
      });

      gsap.to(packageDesktopRef.current, { left: "100%", ease: "none", scrollTrigger: trigger });
      gsap.to(packageMobileRef.current, { top: "100%", ease: "none", scrollTrigger: trigger });

      // decorative open-box icon: pops in once on scroll-into-view, then drifts
      // in a slow, never-repeating-looking idle loop (rotation + x/y) so it
      // reads as gently floating rather than a simple back-and-forth slide
      if (boxRef.current) {
        gsap.set(boxRef.current, {
          opacity: 0,
          scale: 0.6,
          rotate: 20,
          x: 180,
          y: 0,
          transformOrigin: "50% 50%",
        });

        gsap.to(boxRef.current, {
          opacity: 0.92,
          scale: 1,
          rotate: -6,
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          onComplete: () => {
            // wandering loop (not a yoyo) so it visits left/right/up/down
            // instead of just oscillating back and forth on one line
            const idle = gsap.timeline({
              repeat: -1,
              defaults: { ease: "sine.inOut" },
            });
            idle
              .to(boxRef.current, { x: 18, y: -22, rotate: -16, duration: 3.0 })
              .to(boxRef.current, { x: 2, y: -30, rotate: 4, duration: 2.6 })
              .to(boxRef.current, { x: -20, y: -8, rotate: -14, duration: 3.2 })
              .to(boxRef.current, { x: -10, y: 16, rotate: 6, duration: 2.8 })
              .to(boxRef.current, { x: 6, y: 10, rotate: -10, duration: 2.4 })
              .to(boxRef.current, { x: 0, y: 0, rotate: -6, duration: 3.0 });
          },
        });
      }

      // tape roll, sitting to the box's left as if about to seal it — slides
      // in from the opposite side and gets its own independent wandering
      // loop so the two never move in lockstep
      if (tapeRef.current) {
        gsap.set(tapeRef.current, {
          opacity: 0,
          scale: 0.6,
          rotate: -25,
          x: -160,
          y: 0,
          transformOrigin: "50% 50%",
        });

        gsap.to(tapeRef.current, {
          opacity: 0.9,
          scale: 1,
          rotate: 8,
          x: 0,
          y: 0,
          duration: 1.2,
          delay: 0.18,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          onComplete: () => {
            const idle = gsap.timeline({
              repeat: -1,
              defaults: { ease: "sine.inOut" },
            });
            idle
              .to(tapeRef.current, { x: -12, y: 16, rotate: 18, duration: 2.7 })
              .to(tapeRef.current, { x: -22, y: -6, rotate: 2, duration: 3.1 })
              .to(tapeRef.current, { x: 4, y: -18, rotate: 16, duration: 2.5 })
              .to(tapeRef.current, { x: 14, y: 6, rotate: 0, duration: 2.9 })
              .to(tapeRef.current, { x: 0, y: 0, rotate: 8, duration: 2.6 });
          },
        });
      }
    }, trackRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" ref={sectionRef} className="relative pb-28 pt-8 md:pb-30 md:pt-20 bg-brand-offwhite">
      <div className="pointer-events-none absolute inset-0">
        <div ref={boxRef} className="hidden lg:block absolute top-28 right-[6%] w-40 xl:w-48 text-brand-orange">
          <OpenBoxIcon className="w-full h-full" />
        </div>
        <div
          ref={tapeRef}
          className="hidden lg:block absolute top-20 right-[19%] w-[48px] xl:w-[54px] text-brand-blue-light"
        >
          {/* static base pose (rotated to lie horizontal, then tilted ~25°)
              lives on this inner wrapper — kept separate from tapeRef itself
              since GSAP's entrance/idle animation writes a full inline
              transform there and would otherwise wipe out a CSS rotation */}
          <div className="w-full h-full rotate-[65deg]">
            <TapeIcon className="w-full h-full" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-blue-light leading-[0.95] mb-10">
            Como funciona a<span className="text-brand-orange"> operação?</span>
          </h2>
          <p className="text-sm md:text-base text-black/60 shadow-md leading-relaxed mb-24 max-w-xl bg-brand-blue-tint p-4 pr-9 rounded-md border-l-8 border-brand-blue-light relative">
            Simplificando a logística por meio da integração entre
            processos, tecnologia e um <strong>atendimento pensado para cada cliente</strong>.
            <TruckSolid size={24} className="text-brand-orange absolute top-3 right-3 drop-shadow-[0_1px_3px_rgba(255,130,25,0.35)]" />
          </p>
        </Reveal>

        <div ref={trackRef} className="relative w-full">
          {/* desktop: horizontal connector + travelling package */}
          <div className="absolute top-[58px] left-0 w-full h-px bg-brand-blue-light/15 hidden md:block" />
          <div ref={lineDesktopRef} className="absolute top-[58px] left-0 w-full h-[2.5px] bg-brand-orange hidden md:block" />
          <div
            ref={packageDesktopRef}
            className="absolute top-[58px] hidden md:flex items-center justify-center z-0"
          >
            <TruckSolid size={30} className="text-brand-orange drop-shadow-[0_1px_3px_rgba(255,130,25,0.35)]" />
          </div>

          {/* mobile: vertical connector + travelling package, aligned with the center of the 56px icon circle (left-7 = 28px) */}
          <div className="absolute top-0 left-7 w-px h-full bg-brand-blue-light/15 md:hidden" />
          <div ref={lineMobileRef} className="absolute top-0 left-7 w-px h-full bg-brand-orange md:hidden" />
          <div
            ref={packageMobileRef}
            className="absolute left-7 md:hidden flex items-center justify-center z-0"
          >
            <TruckSolid size={23} className="text-brand-orange drop-shadow-[0_1px_3px_rgba(255,130,25,0.35)]" />
          </div>

          <div className="flex flex-col md:grid md:grid-cols-5 gap-10 md:gap-10 relative z-10">
            {steps.map((s, i) => {
              const isActive = i <= activeIndex;
              return (
                <Reveal key={s.n} delay={i * 0.1}>
                  <div className="flex flex-row md:flex-col items-start gap-5 md:gap-0">
                    <div
                      className={`w-14 h-14 md:w-[115px] md:h-[115px] flex items-center justify-center shrink-0 relative z-10 mb-0 md:mb-8 rounded-full transition-colors duration-[625ms] ${isActive ? "bg-brand-orange shadow-lg shadow-orange-900/20" : "bg-brand-blue-tint"
                        }`}
                    >
                      <s.icon className={`w-6 h-6 md:w-12 md:h-12 ${isActive ? "text-white" : "text-brand-blue-light"}`} />
                    </div>
                    <div
                      className={`pt-2 md:pt-0 transition-all duration-[875ms] ease-out ${isActive ? "blur-0 opacity-100" : "blur-[6px] opacity-40"
                        }`}
                    >
                      <h4 className="text-lg font-semibold tracking-tight text-brand-navy mb-2">{s.title}</h4>
                      <p className="text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
