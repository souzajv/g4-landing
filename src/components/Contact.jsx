import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ShieldCheck,
  MessageCircle,
  Send,
} from "lucide-react";
import SectionWave from "./SectionWave";
import WhatsAppIcon from "./WhatsAppIcon";
import { QUOTE_EVENT } from "../lib/quote";
import { sendQuote } from "../lib/quoteForm";

const services = ["Rodoviário", "Aéreo", "Logística Reversa", "Distribuição", "Emergencial"];

const highlights = [
  {
    icon: Clock3,
    title: "Resposta rápida",
    desc: "A maioria das cotações é respondida em até 24h úteis.",
  },
  {
    icon: ShieldCheck,
    title: "Sem compromisso",
    desc: "Você recebe a proposta e decide no seu tempo.",
  },
];

const infoItems = [
  { icon: Phone, label: "Telefone", value: "(11) 3432-4744" },
  { icon: Mail, label: "E-mail", value: "G4@g4express.com.br" },
  {
    icon: MapPin,
    label: "Endereço",
    value: "R. Xavier da Silva Ferrão, 219 — Freguesia do Ó, São Paulo - SP",
  },
];

const WHATSAPP_URL = "https://wa.me/551134324744";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [service, setService] = useState(services[0]);
  const [pulse, setPulse] = useState(false);

  // pre-select the service when the user clicks a "Solicitar" button on one
  // of the Solutions cards, and flash the field so the change is noticed
  useEffect(() => {
    const onQuote = (e) => {
      if (!e.detail) return;
      setSent(false);
      setService(e.detail);
      setPulse(true);
    };

    window.addEventListener(QUOTE_EVENT, onQuote);
    return () => window.removeEventListener(QUOTE_EVENT, onQuote);
  }, []);

  useEffect(() => {
    if (!pulse) return;
    const t = setTimeout(() => setPulse(false), 1600);
    return () => clearTimeout(t);
  }, [pulse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    setSending(true);
    setError("");

    try {
      await sendQuote(form);
      form.reset();
      setService(services[0]);
      setSent(true);
    } catch (err) {
      setError(
        err?.message ||
          "Não foi possível enviar agora. Tente novamente ou fale com a gente pelo WhatsApp."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contato" className="relative z-10 bg-brand-blue-light text-white">
      <SectionWave position="top" color="var(--color-brand-blue-light)" />
      <SectionWave position="bottom" color="var(--color-brand-blue-light)" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="relative">
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* form card — the wider column, since it carries every field
                  from the G4 quote form and needs the horizontal room */}
              <Reveal className="lg:col-span-7 w-full">
                <div className="rounded-2xl bg-white/95 backdrop-blur ring-1 ring-white/20 shadow-2xl shadow-black/20 p-6 sm:p-8">
                  {sent ? (
                    <div className="min-h-[420px] flex flex-col items-center justify-center text-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-brand-orange/15 flex items-center justify-center">
                        <CheckCircle2 size={32} className="text-brand-orange" />
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-brand-navy">
                        Cotação recebida!
                      </h3>
                      <p className="text-sm text-neutral-500 max-w-sm leading-relaxed">
                        Obrigado pelo contato. Nossa equipe vai analisar os detalhes e retornar
                        em breve.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[11px] uppercase tracking-widest text-neutral-500 font-semibold">
                            Cotação sem compromisso
                          </p>
                          <h3 className="mt-1 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-brand-navy">
                            Solicite sua cotação
                          </h3>
                        </div>
                        <div className="h-9 w-9 shrink-0 rounded-lg bg-brand-orange text-white flex items-center justify-center">
                          <Send size={16} />
                        </div>
                      </div>

                      <form className="mt-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 sm:grid-cols-12 gap-x-4 gap-y-4">
                          <Field
                            id="ct-nome"
                            name="nome"
                            label="Nome"
                            placeholder="Seu nome"
                            required
                            span="col-span-2 sm:col-span-6"
                            autoComplete="name"
                          />
                          <Field
                            id="ct-email"
                            name="email"
                            label="E-mail"
                            type="email"
                            placeholder="voce@empresa.com.br"
                            required
                            span="col-span-2 sm:col-span-6"
                            autoComplete="email"
                          />

                          <Field
                            id="ct-telefone"
                            name="telefone"
                            label="Telefone"
                            type="tel"
                            placeholder="(11) 90000-0000"
                            required
                            maxLength={20}
                            span="col-span-2 sm:col-span-4"
                            autoComplete="tel"
                          />
                          <Field
                            id="ct-documento"
                            name="documento"
                            label="CPF / CNPJ"
                            placeholder="Somente números"
                            inputMode="numeric"
                            maxLength={18}
                            span="col-span-2 sm:col-span-4"
                          />
                          <Field
                            id="ct-empresa"
                            name="empresa"
                            label="Empresa"
                            placeholder="Nome da empresa"
                            span="col-span-2 sm:col-span-4"
                            autoComplete="organization"
                          />

                          <Field
                            id="ct-origem"
                            name="origem"
                            label="Origem"
                            placeholder="Cidade / UF"
                            required
                            span="col-span-2 sm:col-span-4"
                          />
                          <Field
                            id="ct-destino"
                            name="destino"
                            label="Destino"
                            placeholder="Cidade / UF"
                            required
                            span="col-span-2 sm:col-span-4"
                          />

                          <div className="col-span-2 sm:col-span-4">
                            <label
                              htmlFor="ct-servico"
                              className="block text-xs font-medium text-neutral-600"
                            >
                              Tipo de serviço
                            </label>
                            <div className="relative mt-1">
                              <select
                                id="ct-servico"
                                name="servico"
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                                className={`w-full appearance-none rounded-xl bg-white pl-3 pr-9 py-2.5 text-sm text-brand-navy ring-1 outline-none cursor-pointer transition-shadow focus:ring-2 focus:ring-brand-blue-light ${
                                  pulse ? "ring-2 ring-brand-orange" : "ring-black/10"
                                }`}
                              >
                                {services.map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown
                                size={16}
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                              />
                            </div>
                          </div>

                          <Field
                            id="ct-produto"
                            name="produto"
                            label="Tipo de produto"
                            placeholder="O que será transportado"
                            span="col-span-2 sm:col-span-7"
                          />
                          <Field
                            id="ct-quantidade"
                            name="quantidade"
                            label="Quantidade / volume"
                            placeholder="Ex.: 12 caixas"
                            maxLength={20}
                            span="col-span-2 sm:col-span-5"
                          />

                          <Field
                            id="ct-largura"
                            name="largura"
                            label="Largura"
                            placeholder="cm"
                            inputMode="decimal"
                            span="col-span-1 sm:col-span-3"
                          />
                          <Field
                            id="ct-comprimento"
                            name="comprimento"
                            label="Comprimento"
                            placeholder="cm"
                            inputMode="decimal"
                            span="col-span-1 sm:col-span-3"
                          />
                          <Field
                            id="ct-altura"
                            name="altura"
                            label="Altura"
                            placeholder="cm"
                            inputMode="decimal"
                            span="col-span-1 sm:col-span-3"
                          />
                          <Field
                            id="ct-peso"
                            name="peso"
                            label="Peso"
                            placeholder="kg"
                            inputMode="decimal"
                            maxLength={15}
                            span="col-span-1 sm:col-span-3"
                          />

                          <Field
                            id="ct-nf"
                            name="valor_nf"
                            label="Valor da NF"
                            placeholder="R$ 0,00"
                            inputMode="decimal"
                            span="col-span-2 sm:col-span-4"
                          />
                          <Field
                            id="ct-msg"
                            name="mensagem"
                            label="Mensagem"
                            placeholder="Prazo desejado e observações da carga"
                            textarea
                            rows={2}
                            span="col-span-2 sm:col-span-8"
                          />
                        </div>

                        {/* honeypot — hidden from people, filled by bots */}
                        <input
                          type="checkbox"
                          name="botcheck"
                          tabIndex={-1}
                          autoComplete="off"
                          className="hidden"
                          aria-hidden="true"
                        />

                        <button
                          type="submit"
                          disabled={sending}
                          className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-md bg-brand-orange text-white px-4 py-3.5 text-sm font-semibold uppercase tracking-widest hover:bg-brand-orange-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {sending ? "Enviando..." : "Solicitar cotação"}
                          {!sending && <ArrowRight size={16} />}
                        </button>

                        {error && (
                          <p className="mt-3 text-xs text-red-600 text-center leading-relaxed">
                            {error}
                          </p>
                        )}

                        <p className="mt-3 text-[11px] text-neutral-500 text-center">
                          Ao enviar, você concorda em ser contatado pela equipe da G4 Express.
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </Reveal>

              {/* copy + highlights + direct contact */}
              <Reveal delay={0.12} className="lg:col-span-5 w-full">
                <h2 className="font-display text-4xl sm:text-5xl leading-[1.05] font-bold tracking-tight text-white">
                  Vamos organizar sua <span className="text-brand-orange">logística</span>
                </h2>
                <p className="text-base max-w-2xl text-white/70 mt-4 leading-relaxed">
                  Envie os detalhes da sua operação e nossa equipe retorna com uma proposta
                  personalizada: transparente, ágil e com a qualidade que a G4 Express oferece
                  desde 2010.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  {highlights.map((h) => (
                    <div key={h.title} className="flex items-start gap-3">
                      <div className="h-9 w-9 shrink-0 rounded-lg bg-white/10 backdrop-blur ring-1 ring-white/15 flex items-center justify-center text-white/90">
                        <h.icon size={16} />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{h.title}</p>
                        <p className="text-white/60 text-xs leading-relaxed">{h.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* direct contact — WhatsApp */}
                <div className="mt-8">
                  <div className="inline-flex flex-wrap items-center gap-3 rounded-2xl bg-white/95 backdrop-blur ring-1 ring-white/20 shadow-lg p-3">
                    <WhatsAppIcon className="h-12 w-12 rounded-xl shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-widest text-neutral-500 leading-none font-semibold">
                        Atendimento direto
                      </p>
                      <p className="text-brand-navy font-semibold tracking-tight truncate mt-1">
                        WhatsApp
                      </p>
                    </div>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 inline-flex items-center gap-2 rounded-md bg-brand-orange text-white px-3 py-2 text-xs font-semibold uppercase tracking-widest hover:bg-brand-orange-dark transition-colors"
                    >
                      Falar agora
                      <MessageCircle size={14} />
                    </a>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  {infoItems.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="h-9 w-9 shrink-0 rounded-lg bg-brand-orange/90 flex items-center justify-center text-white">
                        <item.icon size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-widest text-white/45 font-semibold">
                          {item.label}
                        </p>
                        <p className="text-sm text-white/85 leading-snug">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  required,
  textarea,
  rows = 3,
  type = "text",
  inputMode,
  maxLength,
  autoComplete,
  span = "",
}) {
  const common =
    "mt-1 w-full rounded-xl bg-white pl-3 pr-3 py-2.5 text-sm text-brand-navy ring-1 ring-black/10 outline-none transition-shadow focus:ring-2 focus:ring-brand-blue-light placeholder:text-neutral-400";

  return (
    <div className={span}>
      <label htmlFor={id} className="block text-xs font-medium text-neutral-600 truncate">
        {label}
        {required && <span className="text-brand-orange"> *</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name || id}
          rows={rows}
          className={`${common} resize-y`}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          name={name || id}
          type={type}
          inputMode={inputMode}
          maxLength={maxLength}
          autoComplete={autoComplete}
          required={required}
          className={common}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
