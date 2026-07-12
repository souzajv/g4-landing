import Reveal from "./Reveal";
import { FileSearch, CalendarCheck, Radar, PackageCheck, FileCheck2 } from "lucide-react";

const steps = [
  { n: "01", icon: FileSearch, title: "Cotação Rápida", desc: "Apenas um clique para solicitar sua cotação, com resposta ágil da nossa equipe." },
  { n: "02", icon: CalendarCheck, title: "Coleta Agendada", desc: "Programação da coleta com o veículo mais adequado para o seu tipo de carga." },
  { n: "03", icon: Radar, title: "Transporte Monitorado", desc: "Rastreamento ativo por GPS e acompanhamento pela nossa central 24h.", active: true },
  { n: "04", icon: PackageCheck, title: "Entrega Confirmada", desc: "Descarregamento seguro no destino, com conferência e assinatura do recebedor." },
  { n: "05", icon: FileCheck2, title: "Comprovante Digital", desc: "Envio imediato do canhoto digital e emissão automática da documentação." },
];

export default function ProcessTimeline() {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <h2 className="text-xs font-semibold tracking-[0.3em] uppercase text-brand-navy mb-14 flex items-center gap-4">
            <span className="w-8 h-px bg-brand-navy" /> Como funciona a operação
          </h2>
        </Reveal>

        <div className="relative w-full overflow-hidden">
          <div className="absolute top-6 left-0 w-full h-px bg-black/10 hidden md:block" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 relative z-10">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="flex flex-col">
                  <div
                    className={`w-12 h-12 flex items-center justify-center mb-6 relative rounded-full ${
                      s.active ? "bg-brand-orange shadow-lg shadow-orange-900/20" : "bg-white border border-black/10"
                    }`}
                  >
                    <s.icon size={20} className={s.active ? "text-white" : "text-brand-navy"} />
                  </div>
                  <h4 className="text-lg font-semibold uppercase tracking-tight text-brand-navy mb-2">{s.title}</h4>
                  <p className="text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
