const links = {
  Soluções: ["Rodoviário", "Aéreo", "Logística Reversa", "Distribuição", "Emergencial"],
  Empresa: ["Sobre Nós", "Por Que a G4", "Nossos Clientes", "Contato"],
};

export default function Footer() {
  return (
    <footer className="bg-brand-navy-deep border-t border-white/10 pt-16 pb-8 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="font-display text-2xl font-bold tracking-tight mb-4">
            <span className="text-brand-blue">G</span>
            <span className="text-brand-orange">4</span>
            <span className="text-white"> Express</span>
          </div>
          <p className="text-sm text-white/40 max-w-sm leading-relaxed mb-4">
            Fundada em 2010, na Zona Norte de São Paulo. Soluções logísticas integradas com
            foco em agilidade, segurança e confiabilidade em todo o Brasil.
          </p>
          <p className="text-xs text-white/30 uppercase tracking-widest">Rápido de Verdade</p>
        </div>

        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-6">{title}</h4>
            <ul className="space-y-3 text-sm font-medium text-white/80">
              {items.map((item) => (
                <li key={item}>
                  <span className="hover:text-brand-orange transition-colors cursor-default">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-white/40 uppercase tracking-widest">
          © {new Date().getFullYear()} G4 Express. Todos os direitos reservados.
        </p>
        <p className="text-xs text-white/40 uppercase tracking-widest">www.g4express.com.br</p>
      </div>
    </footer>
  );
}
