import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import MagnifierIcon from "./MagnifierIcon";
import TruckSolid from "./TruckSolid";
import { Award, Truck, Radar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    n: "01",
    icon: Award,
    title: "Excelência",
    desc: "Desde 2010 unimos rapidez, segurança e rastreabilidade em cada operação que realizamos. Trabalhamos com preços competitivos e atendimento próximo, para que sua empresa tenha um parceiro logístico de confiança — não apenas mais um prestador de serviço. Cada entrega segue o mesmo padrão de exigência, do primeiro ao último quilômetro.",
    image: "/images/excelencia.webp",
    imageAlt: "Equipe G4 Express representando excelência no atendimento",
  },
  {
    n: "02",
    icon: Truck,
    title: "Frota própria",
    desc: "Contamos com uma frota própria e diversificada — caminhões, veículos blindados e leves — dimensionada para atender diferentes tipos de carga e nível de urgência. Toda a frota é totalmente rastreada, o que garante visibilidade completa da operação em tempo real e reduz o risco de imprevistos ao longo da rota, dando mais controle pra você e menos dependência de terceiros.",
    image: "/images/frota-doca.webp",
    imageAlt: "Caminhões da frota própria G4 Express na doca de carregamento",
  },
  {
    n: "03",
    icon: Radar,
    title: "Monitoramento 24h",
    desc: "Nossa central de monitoramento acompanha veículos e colaboradores 24 horas por dia, todos os dias da semana, inclusive feriados. Isso garante resposta imediata a qualquer imprevisto durante o trajeto e dá a você visibilidade constante sobre onde sua mercadoria está, do início ao fim da operação — sem surpresas no meio do caminho.",
    image: "/images/monitoramento.webp",
    imageAlt: "Central de monitoramento 24 horas da G4 Express",
  },
];

const STICKY_TOP = "top-[14vh]";
const STACK_HEIGHT = "h-[64vh] md:h-[62vh] lg:h-[80vh]";

// fixed brand accent — same order as the logo: blue first, orange second, on every card
const ACCENT = { chipBg: "bg-brand-blue-light/10", chipHover: "group-hover:bg-brand-blue-light", icon: "text-brand-blue-light", n: "text-brand-orange" };

// solid box silhouette — same shape as the "Rastrear encomenda" button icon, minus the magnifying glass
function ParcelSolid({ size = 20, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path
        d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"
        fill="currentColor"
      />
      <g stroke="white" strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M12 22V12" />
        <polyline points="3.29 7 12 12 20.71 7" />
        <path d="m7.5 4.27 9 5.15" />
      </g>
    </svg>
  );
}

function RouteTrack() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  });
  const top = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={trackRef} className="absolute -left-6 top-0 bottom-0 hidden lg:block w-px">
      <div
        className="absolute inset-0 w-px"
        style={{
          backgroundImage: "repeating-linear-gradient(to bottom, var(--color-brand-blue-light) 0 6px, transparent 6px 14px)",
          opacity: 0.35,
        }}
      />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-orange drop-shadow-[0_2px_4px_rgba(255,130,25,0.35)]"
        style={{ top }}
      >
        <ParcelSolid size={28} />
      </motion.div>
    </div>
  );
}

export default function WhyUs() {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const magnifierRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // never-repeating-looking idle loop — same "wandering, not yoyo"
      // convention used for the box/tape pair in ProcessTimeline
      if (mapRef.current) {
        gsap.set(mapRef.current, {
          opacity: 0,
          scale: 0.6,
          rotate: 10,
          x: 160,
          y: 0,
          transformOrigin: "50% 50%",
        });

        gsap.to(mapRef.current, {
          opacity: 0.95,
          scale: 1,
          rotate: 0,
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
          onComplete: () => {
            const idle = gsap.timeline({ repeat: -1, defaults: { ease: "sine.inOut" } });
            idle
              .to(mapRef.current, { x: -14, y: -12, rotate: -4, duration: 3.0 })
              .to(mapRef.current, { x: -4, y: 14, rotate: 3, duration: 2.7 })
              .to(mapRef.current, { x: 14, y: 4, rotate: -3, duration: 2.9 })
              .to(mapRef.current, { x: 0, y: 0, rotate: 0, duration: 2.5 });
          },
        });
      }

      // magnifying glass, sitting beside the map as if inspecting our
      // coverage — slides in from the opposite side with its own
      // independent wandering loop so the two never move in lockstep
      if (magnifierRef.current) {
        gsap.set(magnifierRef.current, {
          opacity: 0,
          scale: 0.6,
          rotate: -25,
          x: -140,
          y: 0,
          transformOrigin: "50% 50%",
        });

        gsap.to(magnifierRef.current, {
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
            start: "top 70%",
            toggleActions: "play none none none",
          },
          onComplete: () => {
            const idle = gsap.timeline({ repeat: -1, defaults: { ease: "sine.inOut" } });
            idle
              .to(magnifierRef.current, { x: -12, y: 16, rotate: 18, duration: 2.7 })
              .to(magnifierRef.current, { x: -22, y: -6, rotate: 2, duration: 3.1 })
              .to(magnifierRef.current, { x: 4, y: -18, rotate: 16, duration: 2.5 })
              .to(magnifierRef.current, { x: 14, y: 6, rotate: 0, duration: 2.9 })
              .to(magnifierRef.current, { x: 0, y: 0, rotate: 8, duration: 2.6 });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="por-que" ref={sectionRef} className="relative bg-white pt-16 lg:pt-0">
      <div className="pointer-events-none absolute inset-0">
        <div
          ref={mapRef}
          className="hidden lg:block absolute top-24 right-[6%] w-44 xl:w-52 text-brand-orange"
        >
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 md:pt-20 mb-16 relative">
        <Reveal className="flex flex-col md:flex-row w-full justify-between md:items-center relative">
          <div
            ref={magnifierRef}
            className="hidden lg:block absolute -top-8 right-[50%] w-14 xl:w-16 text-brand-blue-light"
          >
            <MagnifierIcon className="w-full h-full" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-blue-light leading-[0.95] mb-10 md:mb-0">
            Por que <span className="text-brand-orange">nós?</span>
          </h2>
          <p className="text-sm md:text-base shadow-md text-black/60 leading-relaxed pr-8 max-w-xl bg-brand-blue-tint p-4 rounded-md border-l-8 border-brand-blue-light relative">
            Construímos uma reputação com base em resultado, menos imprevistos,
            mais controle e um atendimento que trata cada cliente como
            <strong> parceiro de longo prazo</strong>, não apenas mais uma entrega na rota.
            <TruckSolid size={24} className="text-brand-orange absolute top-3 right-3 drop-shadow-[0_1px_3px_rgba(255,130,25,0.35)]" />
          </p>
        </Reveal>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-0 py-32 relative">
        <div className="relative space-y-10">
          <RouteTrack />
          {items.map((item, i) => {
            const card = (
              <div className="group border-t-10 border-brand-blue-tint h-full grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] rounded-xl bg-brand-offwhite shadow-xl shadow-black/5 overflow-hidden transition-transform duration-300 hover:border-brand-blue-light hover:-translate-y-1">
                <div className="flex flex-col justify-between p-8 md:p-10">
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div
                        className={`w-14 h-14 shrink-0 rounded-xl ${ACCENT.chipBg} ${ACCENT.chipHover} flex items-center justify-center transition-colors duration-300`}
                      >
                        <item.icon size={26} className={`${ACCENT.icon} group-hover:text-white transition-colors duration-300`} />
                      </div>
                      <span className={`font-display text-4xl md:text-5xl font-bold leading-none ${ACCENT.n}`}>
                        {item.n}
                      </span>
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl tracking-tight font-semibold text-brand-navy mb-5">
                      {item.title}
                    </h3>
                    <p className="text-[16px] md:text-lg text-neutral-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                <div className="relative hidden lg:block h-full">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep/50 via-transparent to-transparent" />
                </div>
              </div>
            );

            return (
              <div
                key={item.n}
                className={`sticky  ${STICKY_TOP} ${STACK_HEIGHT}`}
                style={{ zIndex: i + 1 }}
              >
                {i === 0 ? (
                  <Reveal className="h-full">{card}</Reveal>
                ) : (
                  <div className="h-full">{card}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
