import Reveal from "./Reveal";
import { Award, Truck, Radar } from "lucide-react";

const items = [
  {
    n: "01",
    icon: Award,
    title: "Excelência",
    desc: "Desde 2010 unimos rapidez, segurança e rastreabilidade em cada operação que realizamos. Trabalhamos com preços competitivos e atendimento próximo, para que sua empresa tenha um parceiro logístico de confiança — não apenas mais um prestador de serviço. Cada entrega segue o mesmo padrão de exigência, do primeiro ao último quilômetro.",
  },
  {
    n: "02",
    icon: Truck,
    title: "Frota Própria",
    desc: "Contamos com uma frota própria e diversificada — caminhões, veículos blindados e leves — dimensionada para atender diferentes tipos de carga e nível de urgência. Toda a frota é totalmente rastreada, o que garante visibilidade completa da operação em tempo real e reduz o risco de imprevistos ao longo da rota, dando mais controle pra você e menos dependência de terceiros.",
  },
  {
    n: "03",
    icon: Radar,
    title: "Monitoramento 24h",
    desc: "Nossa central de monitoramento acompanha veículos e colaboradores 24 horas por dia, todos os dias da semana, inclusive feriados. Isso garante resposta imediata a qualquer imprevisto durante o trajeto e dá a você visibilidade constante sobre onde sua mercadoria está, do início ao fim da operação — sem surpresas no meio do caminho.",
  },
];

const STICKY_TOP = "top-[14vh]";
const STACK_HEIGHT = "h-[64vh] md:h-[62vh] lg:h-[80vh]";

export default function WhyUs() {
  return (
    <section id="por-que" className="relative bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 md:pt-32 pb-4">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-brand-orange mb-5 flex items-center gap-4">
            <span className="w-8 h-px bg-brand-orange" /> Diferenciais G4 Express
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-brand-navy leading-[0.95]">
            Por que escolher <br className="hidden md:block" /> a G4 Express
          </h2>
        </Reveal>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14">
          {/* stacking text cards — defines the height of this row */}
          <div className="space-y-8">
            {items.map((item, i) => (
              <div
                key={item.n}
                className={`sticky ${STICKY_TOP} ${STACK_HEIGHT}`}
                style={{ zIndex: i + 1 }}
              >
                <Reveal className="h-full" delay={i * 0.05}>
                  <div className="group h-full flex flex-col justify-between rounded-xl border border-black/10 bg-brand-offwhite p-8 md:p-10 shadow-xl shadow-black/5">
                    <div>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 shrink-0 rounded-xl bg-brand-blue/10 flex items-center justify-center group-hover:bg-brand-blue transition-colors duration-300">
                          <item.icon size={26} className="text-brand-blue group-hover:text-white transition-colors duration-300" />
                        </div>
                        <span className="font-display text-4xl md:text-5xl font-bold leading-none text-brand-orange">
                          {item.n}
                        </span>
                      </div>
                      <h3 className="font-display text-3xl md:text-4xl tracking-tight font-semibold uppercase text-brand-navy mb-5">
                        {item.title}
                      </h3>
                      <p className="text-base md:text-lg text-neutral-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>

          {/* fixed image — outer box stretches to match the stacking column's full height (grid default stretch) */}
          <div className="hidden lg:block relative">
            <div className={`sticky ${STICKY_TOP} ${STACK_HEIGHT} rounded-xl overflow-hidden`}>
              <Reveal direction="left" className="h-full">
                <img
                  src="/images/frota-doca.jpeg"
                  alt="Caminhões da frota própria G4 Express na doca de carregamento"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
