import Reveal from "./Reveal";
import Counter from "./Counter";

const stats = [
  { to: 2010, suffix: "", label: "Ano de fundação", highlight: true },
  { to: 24, suffix: "h", label: "Central de monitoramento" },
  { to: 20, suffix: "+", label: "Grandes clientes atendidos" },
  { to: 100, suffix: "%", label: "Cargas seguradas" },
];

export default function Stats() {
  return (
    <section className="bg-brand-navy-deep py-24 md:py-36 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="border-t border-white/15 pt-6">
                <span
                  className={`block font-display text-5xl md:text-7xl font-bold tracking-tight mb-3 ${
                    s.highlight ? "text-brand-orange" : "text-white"
                  }`}
                >
                  <Counter to={s.to} suffix={s.suffix} />
                </span>
                <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-white/50">
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
