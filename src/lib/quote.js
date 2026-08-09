// Small bridge between the "Solicitar" buttons spread around the page
// (Solutions cards, banners) and the quote form in Contact.jsx, so a click
// can pre-select the matching service without threading state through App.
// The service strings must match the <option> values in Contact.jsx exactly.
export const QUOTE_EVENT = "g4:quote-service";

export function requestQuote(service) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(QUOTE_EVENT, { detail: service }));
}
