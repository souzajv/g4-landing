import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import "./ProcessTimeline.css";
import { Award, Truck, Radar } from "lucide-react";



const items = [
  {
    n: "01",
    icon: Award,
    title: "Excelência",
    desc: "Desde 2010, unimos agilidade, segurança e rastreabilidade ao cuidado com cada cliente. Nossa equipe entende as necessidades da sua empresa e acompanha a operação de perto, da cotação à entrega. Com atendimento próximo e preços competitivos, construímos relações de confiança para fazer parte da sua rotina logística.",
    image: "/images/atendimento-equipe.webp",
    imageAlt: "Profissionais com headsets prestando atendimento e consultando documentos",
    imagePosition: "60% center",
  },
  {
    n: "02",
    icon: Truck,
    title: "Frota própria",
    desc: "Nossa frota própria reúne caminhões, veículos leves e blindados para atender diferentes tipos de carga e níveis de urgência. Com veículos rastreados e controle direto da operação, planejamos cada coleta de acordo com a sua necessidade. Sua empresa conta com mais visibilidade do transporte e menos dependência de terceiros ao longo do percurso.",
    image: "/images/frota-posto.jpg",
    imageAlt: "Caminhões da frota G4 Express estacionados em um posto",
    imagePosition: "65% center",
  },
  {
    n: "03",
    icon: Radar,
    title: "Monitoramento 24h",
    desc: "Nossa central acompanha veículos e colaboradores 24 horas por dia, inclusive aos fins de semana e feriados. O rastreamento permite acompanhar o percurso da carga e identificar ocorrências durante o transporte. Assim, a equipe pode agir diante de imprevistos e manter sua empresa informada, da saída ao destino.",
    image: "/images/monitoramento-rotas.webp",
    imageAlt: "Imagem ilustrativa de profissionais acompanhando mapas de rotas e informações de veículos em monitores",
    imagePosition: "60% center",
  },
];

const STICKY_TOP = "top-[14vh]";
// altura MÍNIMA, não fixa: o empilhamento sticky precisa de cards com altura
// parecida, mas se o texto crescer (escala de fonte do sistema, tradução mais
// longa) o card acompanha em vez de cortar o conteúdo no overflow-hidden
const STACK_HEIGHT = "min-h-[64vh] md:min-h-[62vh] lg:min-h-[80vh]";

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
  return (
    <section id="por-que" className="relative bg-white pt-16 lg:pt-0">
      <div className="page-container md:pt-20 mb-16 relative">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-blue-light leading-[0.95]">
            Por que <span className="text-brand-orange">nós?</span>
          </h2>
        </Reveal>
      </div>

      <div className="page-container pt-0 py-32 relative">
        <div className="relative space-y-10">
          <RouteTrack />
          {items.map((item, i) => {
            const card = (
              <div className="group border-t-10 border-brand-blue-tint w-full grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] rounded-md bg-[#f4f4f4] why-us-card overflow-hidden transition-transform duration-300 hover:border-brand-blue-light hover:-translate-y-1">
                <div className="flex flex-col justify-between p-8 md:p-10">
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div
                        className={`w-14 h-14 shrink-0 rounded-md ${ACCENT.chipBg} ${ACCENT.chipHover} flex items-center justify-center transition-colors duration-300`}
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

                <div className="relative hidden lg:block">
                  {/* absoluta para a proporção da foto nunca ditar a altura
                      do card — ela só preenche o espaço que o texto definir */}
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: item.imagePosition }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep/50 via-transparent to-transparent" />
                </div>
              </div>
            );

            return (
              <div
                key={item.n}
                className={`sticky flex ${STICKY_TOP} ${STACK_HEIGHT}`}
                style={{ zIndex: i + 1 }}
              >
                {i === 0 ? (
                  <Reveal className="w-full flex">{card}</Reveal>
                ) : (
                  <div className="w-full flex">{card}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
