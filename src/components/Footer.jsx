import { requestQuote, conventionalService, serviceEmail } from "../lib/quote";
import { TRACKING_URL } from "../lib/links";

// as soluções levam ao formulário de cotação já com a categoria escolhida,
// mesmo comportamento dos botões "Solicitar" dos cards da seção Soluções
const solutions = ["Rodoviário", "Aéreo", "Logística Reversa", "Manuseio, Movimentação e Distribuição", "Emergencial"];

const company = [
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Por Que a G4", href: "#por-que" },
  { label: "Nossos Clientes", href: "#clientes" },
  { label: "Contato", href: "#contato" },
  { label: "Rastrear Encomenda", href: TRACKING_URL, external: true },
];

const linkClass =
  "text-white/80 hover:text-brand-orange transition-colors cursor-pointer";

export default function Footer() {
  return (
    <footer className="bg-brand-navy-deep border-t border-white/10 pt-16 pb-8 text-white">
      <div className="page-container grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <a href="#inicio" aria-label="Voltar ao início">
            <img src="/logo-g4-nova.webp" alt="G4 Express" className="h-16 w-auto mb-5" />
          </a>
          <p className="text-sm text-white/40 max-w-sm leading-relaxed mb-4">
            Fundada em 2010, na Zona Norte de São Paulo. Soluções logísticas integradas com
            foco em agilidade, segurança e confiabilidade em todo o Brasil.
          </p>
          <p className="text-xs text-white/30 uppercase tracking-widest">Rápido de Verdade</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-6">
            Soluções
          </h4>
          <ul className="space-y-3 text-sm font-medium">
            {solutions.map((item) => (
              <li key={item}>
                <a href={conventionalService(item) ? "#contato" : serviceEmail(item)} onClick={() => requestQuote(item)} className={linkClass}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-6">
            Empresa
          </h4>
          <ul className="space-y-3 text-sm font-medium">
            {company.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={linkClass}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="page-container pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-white/40 uppercase tracking-widest">
          © {new Date().getFullYear()} G4 Express. Todos os direitos reservados.
        </p>
        <a
          href="https://www.g4express.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/40 hover:text-brand-orange transition-colors uppercase tracking-widest"
        >
          www.g4express.com.br
        </a>
      </div>
    </footer>
  );
}
