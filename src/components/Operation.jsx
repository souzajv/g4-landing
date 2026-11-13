const steps = [
  [
    "Conte sua necessidade",
    "Informe origem, destino e os detalhes da mercadoria. Nossa equipe avalia a sua operação.",
  ],
  [
    "Alinhamos a coleta",
    "Definimos com você as condições do transporte e a programação da coleta.",
  ],
  [
    "Acompanhamos o caminho",
    "Acompanhamento operacional e um canal de contato durante o transporte.",
  ],
  [
    "Concluímos a entrega",
    "Conferência no destino e confirmação da entrega da sua mercadoria.",
  ],
];
export default function Operation() {
  return (
    <>
      <section
        id="operacao"
        className="operation section-space"
        aria-labelledby="operation-title"
      >
        <div className="frame">
          <div className="section-heading">
            <h2 id="operation-title" data-reveal>
              Presença em
              <br />
              cada etapa.
            </h2>
            <p data-reveal>
              Desde 2010, aproximamos empresas e destinos com atenção àquilo que
              importa: a sua entrega.
            </p>
          </div>
          <div className="operation-grid">
            <figure className="operation-image" data-reveal>
              <img
                src="/images/monitoramento-equipe.jpg"
                alt="Imagem ilustrativa de profissionais analisando mapas de rotas em monitores"
                width="1200"
                height="800"
                loading="lazy"
              />
              <figcaption>
                Gestão e acompanhamento da operação · imagem ilustrativa
              </figcaption>
            </figure>
            <div className="operation-copy">
              <h3 data-reveal>
                Sua carga,
                <br />
                acompanhada.
              </h3>
              <p data-reveal>
                Monitoramento para acompanhar o transporte e atendimento próximo
                para manter sua empresa informada ao longo do percurso.
              </p>
              <p data-reveal>
                Da escolha do veículo à chegada no destino, cada etapa faz parte
                do mesmo compromisso.
              </p>
            </div>
          </div>
          <div className="coverage-layout">
            <div data-reveal>
              <h3>
                O Brasil é<br />o destino.
              </h3>
              <p>
                Integramos transporte rodoviário e aéreo para conectar sua
                operação a diferentes regiões do país.
              </p>
            </div>
            <figure data-reveal>
              <img
                src="/images/conexao-brasil.jpg"
                alt="Imagem ilustrativa de veículos fechados menores em uma rodovia brasileira"
                width="1200"
                height="800"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </section>
      <section
        id="sobre"
        className="process section-space"
        aria-labelledby="process-title"
      >
        <div className="frame">
          <div className="section-heading">
            <h2 id="process-title" data-reveal>
              Do contato
              <br />à entrega.
            </h2>
            <p data-reveal>
              Um processo claro.
              <br />
              Uma equipe com você.
            </p>
          </div>
          <div className="process-body">
            <figure data-reveal>
              <img
                src="/images/armazem.webp"
                alt="Conferência e preparação de mercadorias embaladas em um armazém"
                width="700"
                height="442"
                loading="lazy"
              />
            </figure>
            <div className="process-sequence">
              <div className="process-rail" aria-hidden="true">
                <span className="process-rail-fill" />
              </div>
              <ol className="process-list">
                {steps.map(([title, desc]) => (
                  <li key={title} data-reveal>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
