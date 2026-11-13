// Small bridge between the "Solicitar" buttons spread around the page
// (Solutions cards, banners) and the quote form in Contact.jsx, so a click
// can pre-select the matching service without threading state through App.
// The service strings must match the <option> values in Contact.jsx exactly.
export const QUOTE_EVENT = "g4:quote-service";
export const QUOTE_SERVICES = ["Rodoviário Convencional", "Aéreo Convencional"];

export function conventionalService(service) {
  if (service === "Rodoviário") return QUOTE_SERVICES[0];
  if (service === "Aéreo") return QUOTE_SERVICES[1];
  return QUOTE_SERVICES.includes(service) ? service : null;
}

export function serviceEmail(service) {
  return `mailto:G4@g4express.com.br?${new URLSearchParams({
    subject: `Solicitação de ${service}`,
    body: `Olá! Gostaria de uma proposta para ${service}.\n\nNome completo:\nEmpresa:\nTelefone:\nOrigem e destino:\nPagador do frete:\nDetalhes da operação:\nDimensões (comprimento × largura × altura):`,
  })}`;
}

export function requestQuote(service) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(QUOTE_EVENT, { detail: service }));
}
