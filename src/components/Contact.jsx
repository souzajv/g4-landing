import { useEffect, useRef, useState } from "react";
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
import { QUOTE_EVENT, QUOTE_SERVICES, conventionalService } from "../lib/quote";
import { sendQuote } from "../lib/quoteForm";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const services = QUOTE_SERVICES;
const stepTitles = ["Contato", "Transporte e pagamento", "Dados da carga"];

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
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [compactCaptcha, setCompactCaptcha] = useState(() => window.innerWidth < 380);
  useEffect(() => {
    const update = () => {
      const small = window.innerWidth < 768;
      setIsMobile(small);
      setCompactCaptcha(window.innerWidth < 380);
      setStep(current => !small && current === 1 ? 0 : current);
      setCaptchaToken("");
    };
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const [step, setStep] = useState(0);
  const formRef = useRef(null);
  const stepRef = useRef(null);
  const captchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [captchaAttempt, setCaptchaAttempt] = useState(0);
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
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
      const selected = conventionalService(e.detail);
      if (!selected) return;
      setSent(false);
      setService(selected);
      setStep(0);
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

  const titles = isMobile ? stepTitles : ["Contato e transporte", "Carga e confirmação"];
  const displayStep = isMobile ? step : step === 2 ? 1 : 0;
  const visibleStep = (index) => isMobile ? step === index : (step === 2 ? index === 2 : index < 2);
  const goToStep = (next) => {
    setStep(next);
    requestAnimationFrame(() => {
      stepRef.current?.focus({ preventScroll: true });
      stepRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
    });
  };
  const validate = (all = false) => {
    const fields = [...formRef.current.querySelectorAll("fieldset input, fieldset select, fieldset textarea")].filter(field => all || visibleStep(Number(field.closest("fieldset").dataset.step)));
    for (const field of fields) {
      if (!field.checkValidity()) {
        const target = Number(field.closest("[data-step]")?.dataset.step || 0);
        if (!visibleStep(target)) {
          setStep(isMobile ? target : target === 2 ? 2 : 0);
          requestAnimationFrame(() => field.reportValidity());
        } else field.reportValidity();
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (sending) return;
    if (step < 2) {
      if (validate()) goToStep(isMobile ? step + 1 : 2);
      return;
    }
    if (!validate(true)) return;
    if (!captchaToken) {
      setCaptchaError("Confirme que você é uma pessoa antes de enviar.");
      return;
    }

    setSending(true);
    setError("");

    try {
      await sendQuote(form, captchaToken);
      form.reset();
      setService(services[0]);
      setSent(true);
      setStep(0);
    } catch (err) {
      setError(
        err?.message ||
          "Não foi possível enviar agora. Tente novamente ou fale com a gente pelo WhatsApp."
      );
    } finally {
      setCaptchaToken("");
      captchaRef.current?.resetCaptcha();
      setSending(false);
    }
  };

  return (
    <section id="contato" className="relative z-10 bg-brand-blue-light text-white">
      <SectionWave position="top" color="var(--color-brand-blue-light)" />
      <SectionWave position="bottom" color="var(--color-brand-blue-light)" />
      <div className="page-container py-20">
        <div className="relative">
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* form card — the wider column, since it carries every field
                  from the G4 quote form and needs the horizontal room */}
              <Reveal className="lg:col-span-7 w-full">
                <div className="rounded-md bg-white/95 backdrop-blur ring-1 ring-white/20 shadow-2xl shadow-black/20 p-4 sm:p-8">
                  {sent ? (
                    <div className="min-h-[420px] flex flex-col items-center justify-center text-center gap-4">
                      <div className="w-16 h-16 rounded-md bg-brand-orange/15 flex items-center justify-center">
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
                        <div className="h-9 w-9 shrink-0 rounded-md bg-brand-orange text-white flex items-center justify-center">
                          <Send size={16} />
                        </div>
                      </div>

                      <form ref={formRef} className="mt-6" noValidate onSubmit={handleSubmit}>
                        <div ref={stepRef} tabIndex={-1} className="mb-6 scroll-mt-24 outline-none" aria-live="polite">
                          <p className="text-sm font-semibold text-brand-blue-light">Etapa {displayStep + 1} de {titles.length}: {titles[displayStep]}</p>
                          <div className="mt-3 flex gap-2" aria-hidden="true">{titles.map((title, i) => <span key={title} className={`h-1 flex-1 rounded-full ${i <= displayStep ? "bg-brand-orange" : "bg-neutral-200"}`} />)}</div>
                        </div>
                        <fieldset data-step="0" className={`border-0 p-0 m-0 min-w-0 grid-cols-2 sm:grid-cols-12 gap-4 ${visibleStep(0) ? "grid" : "hidden"}`}>
                          <legend className="sr-only">Contato</legend>
                          <Field
                            id="ct-nome"
                            name="nome"
                            label="Nome completo"
                            placeholder="Seu nome completo"
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

                        </fieldset>
                        <fieldset data-step="1" className={`border-0 p-0 m-0 min-w-0 md:mt-4 grid-cols-2 sm:grid-cols-12 gap-4 ${visibleStep(1) ? "grid" : "hidden"}`}>
                          <legend className="sr-only">Transporte e pagamento</legend>
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
                                className={`w-full appearance-none rounded-md bg-white pl-3 pr-9 py-2.5 text-sm text-brand-navy ring-1 outline-none cursor-pointer transition-shadow focus:ring-2 focus:ring-brand-blue-light ${
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

                          <Field id="ct-pagador" name="pagador_frete" label="Pagador do frete" placeholder="Nome ou razão social de quem pagará o frete" required span="col-span-2 sm:col-span-12" />
                        </fieldset>
                        <fieldset data-step="2" className={`border-0 p-0 m-0 min-w-0 md:mt-4 grid-cols-2 sm:grid-cols-12 gap-4 ${visibleStep(2) ? "grid" : "hidden"}`}>
                          <legend className="sr-only">Dados da carga</legend>
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
                            id="ct-comprimento"
                            name="comprimento"
                            label="Comprimento"
                            placeholder="cm"
                            inputMode="decimal"
                            span="col-span-1 sm:col-span-3"
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
                        </fieldset>

                        {/* honeypot — hidden from people, filled by bots */}
                        <input
                          type="checkbox"
                          name="botcheck"
                          tabIndex={-1}
                          autoComplete="off"
                          className="hidden"
                          aria-hidden="true"
                        />

                        <div className={`mt-6 py-5 border-t border-neutral-200 flex-col items-center text-center ${step === 2 ? "flex" : "hidden"}`}>
                          <p className="text-sm font-medium text-brand-navy mb-3">Confirme que você é uma pessoa</p>
                          {!captchaLoaded && !captchaError && <p role="status" className="text-sm text-neutral-600 mb-3">Carregando verificação de segurança...</p>}
                          <HCaptcha
                            key={`${captchaAttempt}-${compactCaptcha}`}
                            ref={captchaRef}
                            sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                            reCaptchaCompat={false}
                            languageOverride="pt"
                            size={compactCaptcha ? "compact" : "normal"}
                            onLoad={() => setCaptchaLoaded(true)}
                            onVerify={(token) => { setCaptchaToken(token); setCaptchaError(""); }}
                            onExpire={() => { setCaptchaToken(""); setCaptchaError("A verificação expirou. Confirme novamente para enviar."); }}
                            onError={() => { setCaptchaToken(""); setCaptchaError("Não foi possível carregar a verificação. Tente novamente."); }}
                          />
                          {captchaError && <div className="mt-2 text-sm text-red-700" role="alert">
                            <p>{captchaError}</p>
                            <button type="button" onClick={() => { setCaptchaLoaded(false); setCaptchaError(""); setCaptchaToken(""); setCaptchaAttempt((n) => n + 1); }} className="underline py-2">Tentar verificação novamente</button>
                          </div>}
                        </div>
                        <div className="mt-6 flex gap-3">
                        {step > 0 && <button type="button" disabled={sending} onClick={() => goToStep(isMobile ? step - 1 : 0)} className="px-4 py-3 rounded-md text-brand-blue-light ring-1 ring-brand-blue-light disabled:opacity-50">Voltar</button>}
                        <button
                          type="submit"
                          disabled={sending}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-brand-orange text-white px-4 py-3.5 text-sm font-semibold uppercase tracking-widest hover:bg-brand-orange-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {sending ? "Enviando..." : (step < 2 ? "Continuar" : "Solicitar cotação")}
                          {!sending && <ArrowRight size={16} />}
                        </button>

                        </div>

                        {error && (
                          <p role="alert" className="mt-3 text-xs text-red-600 text-center leading-relaxed">
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
                      <div className="h-9 w-9 shrink-0 rounded-md bg-white/10 backdrop-blur ring-1 ring-white/15 flex items-center justify-center text-white/90">
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
                  <div className="inline-flex flex-wrap items-center gap-3 rounded-md bg-white/95 backdrop-blur ring-1 ring-white/20 shadow-lg p-3">
                    <WhatsAppIcon className="h-12 w-12 rounded-md shrink-0" />
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
                      <div className="h-9 w-9 shrink-0 rounded-md bg-brand-orange/90 flex items-center justify-center text-white">
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
    "mt-1 w-full rounded-md bg-white pl-3 pr-3 py-2.5 text-sm text-brand-navy ring-1 ring-black/10 outline-none transition-shadow focus:ring-2 focus:ring-brand-blue-light placeholder:text-neutral-400";

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
