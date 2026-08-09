import { useRef } from "react";
import Reveal from "./Reveal";
import Counter from "./Counter";
import SectionWave from "./SectionWave";

const stats = [
  { to: 2010, suffix: "", label: "Ano de fundação" },
  { to: 24, suffix: "h", label: "Central de monitoramento" },
  { to: 20, suffix: "+", label: "Grandes clientes atendidos" },
  { to: 100, suffix: "%", label: "Cargas seguradas", highlight: true },
];

export default function Stats() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="bg-brand-blue-light py-20 text-white relative z-10">
      {/* ondas rasas: só quebram o corte seco do branco para o azul, sem
          virar um elemento decorativo por si só */}
      <SectionWave soft position="top" color="var(--color-brand-blue-light)" />
      <SectionWave soft position="bottom" color="var(--color-brand-blue-light)" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div>
                <div>
                  <span
                    className={`block font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-3 lg:mb-4 ${s.highlight ? "text-brand-orange" : "text-white"
                      }`}
                  >
                    <Counter to={s.to} suffix={s.suffix} />
                  </span>
                  <span className="text-xs md:text-sm block max-w-48 tracking-widest uppercase text-white/65 font-bold">
                    {s.label}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
