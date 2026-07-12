import Reveal from "./Reveal";
import { ShieldCheck, Radar, Users, Award } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Todas as cargas seguradas" },
  { icon: Radar, label: "Central de monitoramento 24h" },
  { icon: Users, label: "Atendimento personalizado" },
  { icon: Award, label: "16 anos de mercado" },
];

export default function TrustStrip() {
  return (
    <section className="py-12 border-y border-black/5 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-between gap-8 md:gap-12">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.08} direction="none">
            <div className="flex items-center gap-3 text-brand-navy/70">
              <it.icon size={26} className="text-brand-orange" />
              <span className="text-sm font-semibold uppercase tracking-widest">{it.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
