import Reveal from "./Reveal";
import { Truck, Plane, RotateCcw, Boxes, Siren } from "lucide-react";

const solutions = [
  {
    icon: Truck,
    title: "Rodoviário",
    desc: "Convencional, rodo expresso ou rodo exclusivo — porta a porta ou carga consolidada.",
    img: "/images/rodoviario.jpeg",
  },
  {
    icon: Plane,
    title: "Aéreo",
    desc: "Convencional, 1º voo, expresso e portador — entregas rápidas em todos os aeroportos do Brasil.",
    img: "/images/aereo.jpeg",
  },
  {
    icon: RotateCcw,
    title: "Logística Reversa",
    desc: "Armazenagem, embalagens, controle físico e administrativo, e fluxo reverso de produtos.",
    img: "/images/logistica-reversa.jpeg",
  },
  {
    icon: Boxes,
    title: "Distribuição",
    desc: "Manuseio e entrega de materiais em nível nacional, com pontualidade, segurança e eficiência.",
    img: "/images/armazem.jpeg",
  },
  {
    icon: Siren,
    title: "Emergencial",
    desc: "Transporte urgente com veículo exclusivo, garantindo prioridade máxima e rapidez na entrega.",
    img: "/images/emergencial.jpeg",
  },
];

export default function Solutions() {
  return (
    <section id="solucoes" className="relative bg-white pt-24 pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full relative z-20 mb-14 md:mb-20">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-none font-bold uppercase tracking-tight text-brand-navy">
            Soluções que <br /> conectam o Brasil
          </h2>
        </Reveal>
      </div>

      <Reveal direction="none" className="w-full h-[38vh] md:h-[50vh] relative mb-14 md:mb-20">
        <img
          src="/images/rodovia.jpeg"
          alt="Rodovia nacional utilizada pelas rotas da G4 Express"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-brand-navy/30" />
      </Reveal>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl border border-black/5 h-full">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brand-navy-deep/40 group-hover:bg-brand-navy-deep/20 transition-colors" />
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-full bg-brand-orange flex items-center justify-center">
                    <s.icon size={20} className="text-white" />
                  </div>
                </div>
                <div className="p-6 bg-brand-offwhite">
                  <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-brand-navy mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
