// Quote form delivery.
//
// The landing page is a static build, so the form is sent to a hosted form
// service instead of a server of our own. Web3Forms only needs a public
// access key (no server, no CORS setup) and forwards each submission to the
// G4 inbox configured when the key was created.
//
// Setup: create a key at https://web3forms.com (free), then add it to a
// .env file at the project root:
//
//   VITE_WEB3FORMS_KEY=sua-chave-aqui
//
// Swapping providers later (Formspree, EmailJS, own endpoint) only requires
// changing ENDPOINT and the payload shape below — nothing in Contact.jsx.

import { QUOTE_SERVICES } from "./quote.js";

const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = import.meta.env?.VITE_WEB3FORMS_KEY;

export function validateQuoteData(data) {
  for (const field of ["nome", "email", "telefone", "origem", "destino", "pagador_frete"]) {
    if (!String(data[field] || "").trim()) throw new Error("Preencha todos os campos obrigatórios.");
  }
  if (!QUOTE_SERVICES.includes(data.servico)) throw new Error("Selecione uma modalidade convencional.");
  if (data.botcheck || !String(data["h-captcha-response"] || "").trim()) throw new Error("Conclua a verificação de segurança antes de enviar.");
  for (const field of ["comprimento", "largura", "altura", "peso"]) {
    const value = String(data[field] || "").trim();
    if (value && (!Number.isFinite(Number(value.replace(",", "."))) || Number(value.replace(",", ".")) <= 0)) {
      throw new Error("Informe medidas e peso maiores que zero, usando apenas números.");
    }
  }
}

export const isQuoteFormConfigured = Boolean(ACCESS_KEY);

export async function sendQuote(formEl, captchaToken) {
  const data = Object.fromEntries(new FormData(formEl).entries());
  if (captchaToken) data["h-captcha-response"] = captchaToken;
  validateQuoteData(data);

  // no key yet: don't pretend it was delivered
  if (!ACCESS_KEY) {
    throw new Error(
      "VITE_WEB3FORMS_KEY não configurada — a cotação não foi enviada."
    );
  }

  const payload = {
    access_key: ACCESS_KEY,
    subject: `Nova cotação — ${data.servico || "G4 Express"}`,
    from_name: "Site G4 Express",
    ...data,
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok || json.success === false) {
    throw new Error(json.message || "Não foi possível enviar a cotação.");
  }

  return json;
}
