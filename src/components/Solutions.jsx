import Reveal from "./Reveal";
import "./ProcessTimeline.css";
import { requestQuote, conventionalService, serviceEmail } from "../lib/quote";
import { Truck, Plane, RotateCcw, Boxes, Siren, ArrowUpRight } from "lucide-react";

const solutions = [
  {
    icon: Truck,
    title: "Rodoviário",
    service: "Rodoviário",
    desc: "Transporte convencional, rodo expresso ou rodo exclusivo em todo o Brasil, com entregas porta a porta ou carga consolidada.",
    img: "/images/rodoviario.webp",
  },
  {
    icon: Plane,
    title: "Aéreo",
    service: "Aéreo",
    desc: "Transporte aéreo nas modalidades convencional, primeiro voo, expresso e portador, com atendimento em todos os aeroportos do Brasil.",
    img: "/images/aereo.webp",
  },
  {
    icon: RotateCcw,
    title: "Logística reversa",
    service: "Logística Reversa",
    desc: "Gestão do retorno de produtos, com armazenagem, embalagens e controle físico e administrativo em cada etapa do fluxo reverso.",
    img: "/images/logistica-reversa.webp",
  },
  {
    icon: Boxes,
    title: "Manuseio, Movimentação e Distribuição",
    service: "Manuseio, Movimentação e Distribuição",
    desc: "Manuseio e entrega de materiais em todo o território nacional, com foco em pontualidade, segurança e eficiência na distribuição.",
    img: "/images/armazem.webp",
  },
  {
    icon: Siren,
    title: "Emergencial",
    service: "Emergencial",
    desc: "Transporte urgente com veículo exclusivo para demandas que exigem prioridade, com foco em agilidade da coleta até a entrega.",
    img: "/images/emergencial.webp",
  },
];

// "Solicitar" CTA — always visible on touch screens (no hover there), and on
// desktop it fades up out of the card only while the card is hovered.
function QuoteButton({ service, revealOnHover = true, className = "" }) {
  const reveal = revealOnHover
    ? "lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0"
    : "";

  return (
    <a
      href={conventionalService(service) ? "#contato" : serviceEmail(service)}
      onClick={() => requestQuote(service)}
      aria-label={`Solicitar cotação de transporte ${service}`}
      className={`inline-flex items-center gap-1.5 lg:gap-2 shrink-0 bg-brand-blue-light text-white text-[10px] md:text-xs font-semibold uppercase tracking-widest px-3 py-1.5 lg:px-6 lg:py-3 rounded-md shadow-lg hover:bg-brand-orange transition-all duration-300 ${reveal} ${className}`}
    >
      Solicitar
      <ArrowUpRight size={12} className="lg:hidden" />
      <ArrowUpRight size={14} className="hidden lg:block" />
    </a>
  );
}

export default function Solutions() {
  return (
    <section id="solucoes" className="relative bg-white pb-24 md:pb-32">
      <Reveal direction="none" className="w-full h-[38vh] md:h-[50vh] relative mb-14 md:mb-20">
        <img
          src="/images/rodovia.webp"
          alt="Rodovia nacional utilizada pelas rotas da G4 Express"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-brand-navy/30" />
        <div className="absolute inset-x-0 top-0 h-20 md:h-28 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 md:h-28 bg-gradient-to-t from-white to-transparent" />
      </Reveal>

      <div className="page-container -mt-24">
        <div className="w-full relative z-20 mb-14 md:mb-20">
          <Reveal className="process-heading-row">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] font-bold tracking-tight text-brand-blue-light">
              Soluções que<br />conectam o <span className="text-brand-orange">Brasil</span>
            </h2>
            <p className="process-heading-description lg:self-end">
              Cada carga tem uma necessidade. Nossas soluções combinam <strong className="text-brand-blue-light">transporte</strong> rodoviário e aéreo, distribuição, logística reversa e atendimento emergencial. Escolha o serviço adequado ao seu prazo e à sua operação, com foco em <strong className="text-brand-orange">agilidade</strong> da coleta à entrega.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 auto-rows-auto md:auto-rows-fr gap-4 md:gap-6 lg:gap-4 xl:gap-6">
          {solutions.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="h-full min-w-0">
              <article className="solution-card group overflow-hidden rounded-md border-b-8 border-brand-blue-light h-full flex flex-col bg-[#f4f4f4]">
                <div className="relative overflow-hidden h-36 md:h-auto md:aspect-[16/10] shrink-0">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-brand-navy-deep/40 group-hover:bg-brand-navy-deep/20 transition-colors" />
                  <div className="absolute top-3 left-3 w-9 h-9 md:top-4 md:left-4 md:w-11 md:h-11 rounded-md bg-brand-orange flex items-center justify-center">
                    <s.icon size={20} className="text-white" aria-hidden="true" />
                  </div>
                </div>
                <div className="p-4 md:p-6 lg:p-4 xl:p-6 flex flex-col flex-1 items-start">
                  <h3 className="font-display text-xl md:text-2xl lg:text-xl font-semibold tracking-tight text-brand-navy mb-2 md:mb-3">{s.title}</h3>
                  <p className="text-sm md:text-base lg:text-sm text-neutral-600 leading-relaxed mb-4 md:mb-6">{s.desc}</p>
                  <QuoteButton service={s.service} revealOnHover={false} className="mt-auto self-end md:self-start min-h-11 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-light" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
