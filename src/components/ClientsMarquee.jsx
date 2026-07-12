import Reveal from "./Reveal";

const clients = [
  "QuintoAndar", "BTG Pactual", "Banco PAN", "RiHappy", "Novotel", "Locaweb",
  "Kopenhagen", "Chocolates Brasil Cacau", "l'Oeil", "Blockbit", "Estapar",
  "CTG Brasil", "Sorridents", "Amélio", "UD House", "SG Global Group",
  "TV Group", "BRQ Digital", "Pimenta Print", "Grupo CRM", "by Kamy",
];

export default function ClientsMarquee() {
  const loop = [...clients, ...clients];
  return (
    <section className="py-20 bg-brand-offwhite border-b border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-10">
        <Reveal>
          <h2 className="text-xs font-semibold tracking-[0.3em] uppercase text-brand-navy flex items-center gap-4">
            <span className="w-8 h-px bg-brand-navy" /> Empresas que confiam na G4 Express
          </h2>
        </Reveal>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-offwhite to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-offwhite to-transparent z-10" />
        <div className="flex w-max animate-marquee">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="mx-4 px-6 py-3 bg-white border border-black/5 rounded-full text-sm font-semibold text-brand-navy/70 whitespace-nowrap shadow-sm"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
