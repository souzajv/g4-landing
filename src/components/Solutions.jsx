import Reveal from "./Reveal";
import { requestQuote } from "../lib/quote";
import { Truck, Plane, RotateCcw, Boxes, Siren, ArrowUpRight } from "lucide-react";

const solutions = [
  {
    icon: Truck,
    title: "Rodoviário",
    service: "Rodoviário",
    desc: "Convencional, rodo expresso ou rodo exclusivo — porta a porta ou carga consolidada, em todo o território nacional.",
    img: "/images/rodoviario.webp",
    span: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    // no min-height here: this tile spans 2 rows, so any minimum it declares
    // gets pushed onto both rows and inflates the whole grid — it just grows
    // into whatever height the other two rows end up with
    imgClass: "h-56 md:h-64 lg:h-auto lg:flex-1",
    hero: true,
  },
  {
    icon: Plane,
    title: "Aéreo",
    service: "Aéreo",
    desc: "Convencional, 1º voo, expresso e portador — entregas rápidas em todos os aeroportos do Brasil.",
    img: "/images/aereo.webp",
    span: "sm:col-span-2 lg:col-span-2",
    imgClass: "h-48 lg:h-auto lg:flex-1 lg:min-h-[190px]",
  },
  {
    icon: RotateCcw,
    title: "Logística reversa",
    service: "Logística Reversa",
    desc: "Armazenagem, embalagens, controle físico e administrativo, e fluxo reverso de produtos.",
    img: "/images/logistica-reversa.webp",
    span: "sm:col-span-1 lg:col-span-1",
    imgClass: "h-44 lg:h-auto lg:flex-1 lg:min-h-[140px]",
  },
  {
    icon: Boxes,
    title: "Distribuição",
    service: "Distribuição",
    desc: "Manuseio e entrega de materiais em nível nacional, com pontualidade, segurança e eficiência.",
    img: "/images/armazem.webp",
    span: "sm:col-span-1 lg:col-span-1",
    imgClass: "h-44 lg:h-auto lg:flex-1 lg:min-h-[140px]",
  },
  {
    icon: Siren,
    title: "Emergencial",
    service: "Emergencial",
    desc: "Transporte urgente com veículo exclusivo, garantindo prioridade máxima e rapidez na entrega.",
    img: "/images/emergencial.webp",
    span: "sm:col-span-2 lg:col-span-4",
    banner: true,
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
      href="#contato"
      onClick={() => requestQuote(service)}
      aria-label={`Solicitar cotação de transporte ${service}`}
      className={`inline-flex items-center gap-1.5 lg:gap-2 shrink-0 bg-brand-blue-light text-white text-[10px] md:text-xs font-semibold uppercase tracking-widest px-3 py-1.5 lg:px-6 lg:py-3 rounded-md shadow-lg hover:bg-brand-blue transition-all duration-300 ${reveal} ${className}`}
    >
      Solicitar
      <ArrowUpRight size={12} className="lg:hidden" />
      <ArrowUpRight size={14} className="hidden lg:block" />
    </a>
  );
}

export default function Solutions() {
  return (
    <section id="solucoes" className="relative bg-white pb-10">
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

      <div className="max-w-7xl mx-auto px-6 lg:px-10 -mt-24">
        <div className="max-w-7xl mx-auto w-full relative z-20 mb-14 md:mb-20">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-none font-bold tracking-tight text-brand-blue-light">
              Soluções que conectam o <span className="text-brand-orange">Brasil</span>
            </h2>
          </Reveal>
        </div>

        {/* bento grid — rows size themselves to the content (no fixed row
            height), so nothing gets cropped; the Rodoviário tile spans two
            rows and stretches to fill them */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {solutions.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className={s.span}>
              {s.banner ? (
                <div className="group relative overflow-hidden rounded-2xl h-full flex items-center">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/95 via-brand-orange/80 to-brand-navy-deep/70" />
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 w-full p-7 md:p-10">
                    <div className="flex items-start sm:items-center gap-5">
                      <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full bg-white/15 border border-white/30 flex items-center justify-center backdrop-blur-sm">
                        <s.icon size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white mb-1.5">
                          {s.title}
                        </h3>
                        <p className="text-sm md:text-base text-white leading-relaxed max-w-xl">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                    <QuoteButton
                      service={s.service}
                      revealOnHover={false}
                      className="self-start sm:self-center"
                    />
                  </div>
                </div>
              ) : (
                <div className="group relative overflow-hidden shadow-xl rounded-2xl border-b-8 border-brand-blue-light h-full flex flex-col">
                  <div className={`relative overflow-hidden ${s.imgClass}`}>
                    {/* absolute so the image's intrinsic aspect ratio never
                        dictates the grid row height — it only ever fills the
                        box the layout gives it */}
                    <img
                      src={s.img}
                      alt={s.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-brand-navy-deep/40 group-hover:bg-brand-navy-deep/20 transition-colors" />
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-full bg-brand-orange flex items-center justify-center">
                      <s.icon size={20} className="text-white" />
                    </div>
                    {/* no mobile o botão fica na mesma linha do chip do
                        ícone (chip: top-4 + 44px de altura → centro em 38px);
                        no desktop volta para o canto inferior, revelado no
                        hover. O posicionamento fica no wrapper para não
                        brigar com o translate da animação de reveal. */}
                    <div className="absolute right-4 top-[38px] -translate-y-1/2 lg:top-auto lg:bottom-4 lg:translate-y-0 z-10">
                      <QuoteButton service={s.service} />
                    </div>
                  </div>
                  <div className="p-6 bg-brand-offwhite shrink-0">
                    <h3
                      className={`font-display font-semibold tracking-tight text-brand-navy mb-2 ${
                        s.hero ? "text-2xl md:text-3xl" : "text-xl"
                      }`}
                    >
                      {s.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
