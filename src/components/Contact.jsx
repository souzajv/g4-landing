import { useState } from "react";
import Reveal from "./Reveal";
import { Phone, Mail, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contato" className="bg-brand-navy-deep text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-7 py-20 md:py-28 px-6 lg:px-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight mb-7 leading-none">
              Vamos organizar <br /> sua logística.
            </h2>
            <p className="text-base md:text-lg text-white/60 max-w-xl font-medium leading-relaxed mb-12">
              Envie os detalhes da sua operação e nossa equipe retorna com uma proposta
              personalizada — transparente, ágil e com a qualidade que a G4 Express oferece
              desde 2010.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="space-y-5 mt-auto">
            <div className="flex items-center gap-3 text-white/80">
              <Phone size={18} className="text-brand-orange shrink-0" />
              <span className="text-lg">(11) 3432-4744</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Mail size={18} className="text-brand-orange shrink-0" />
              <span className="text-lg">G4@g4express.com.br</span>
            </div>
            <div className="flex items-start gap-3 text-white/80">
              <MapPin size={18} className="text-brand-orange shrink-0 mt-1" />
              <span className="text-lg leading-snug">
                R. Xavier da Silva Ferrão, 219 — Freguesia do Ó, São Paulo - SP, 02808-000
              </span>
            </div>
          </Reveal>
        </div>

        <div className="col-span-1 lg:col-span-5 py-20 px-6 lg:px-14 bg-[#000c26]">
          <Reveal direction="left">
            {sent ? (
              <div className="h-full min-h-[380px] flex flex-col items-center justify-center text-center gap-4">
                <CheckCircle2 size={48} className="text-brand-orange" />
                <h3 className="text-2xl font-semibold">Cotação recebida!</h3>
                <p className="text-white/60 max-w-sm">
                  Obrigado pelo contato. Nossa equipe vai analisar os detalhes e retornar em
                  breve.
                </p>
              </div>
            ) : (
              <form className="space-y-7" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <Field label="Nome" placeholder="Seu nome" required />
                  <Field label="Empresa" placeholder="Nome da empresa" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <Field label="Origem" placeholder="Cidade / UF" required />
                  <Field label="Destino" placeholder="Cidade / UF" required />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-3">
                    Tipo de Serviço
                  </label>
                  <select className="bg-transparent border-b border-white/20 pb-2 text-white text-lg focus:outline-none focus:border-brand-orange transition-colors appearance-none cursor-pointer">
                    <option className="bg-brand-navy-deep">Rodoviário</option>
                    <option className="bg-brand-navy-deep">Aéreo</option>
                    <option className="bg-brand-navy-deep">Logística Reversa</option>
                    <option className="bg-brand-navy-deep">Distribuição</option>
                    <option className="bg-brand-navy-deep">Emergencial</option>
                  </select>
                </div>

                <Field label="Mensagem" placeholder="Detalhes da carga e prazo desejado" textarea />

                <button
                  type="submit"
                  className="w-full bg-brand-orange text-white py-5 text-sm font-semibold uppercase tracking-widest hover:bg-brand-orange-light transition-colors flex items-center justify-center gap-3 mt-4 rounded-full"
                >
                  Solicitar Cotação
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, placeholder, required, textarea }) {
  const common =
    "bg-transparent border-b border-white/20 pb-2 text-white text-lg focus:outline-none focus:border-brand-orange transition-colors placeholder-white/20 w-full resize-none";
  return (
    <div className="flex flex-col">
      <label className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-3">{label}</label>
      {textarea ? (
        <textarea rows={3} className={common} placeholder={placeholder} />
      ) : (
        <input type="text" required={required} className={common} placeholder={placeholder} />
      )}
    </div>
  );
}
