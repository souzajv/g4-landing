import test from "node:test";
import assert from "node:assert/strict";
import { validateQuoteData } from "../src/lib/quoteForm.js";
import { QUOTE_SERVICES, serviceEmail } from "../src/lib/quote.js";
const valid = {
  nome: "Pessoa de Teste",
  email: "teste@example.com",
  telefone: "11999999999",
  origem: "São Paulo/SP",
  destino: "Recife/PE",
  pagador_frete: "Empresa pagadora",
  servico: QUOTE_SERVICES[0],
  "h-captcha-response": "token-de-teste",
  comprimento: "20",
  largura: "30",
  altura: "40",
};
test("aceita somente os dois serviços convencionais", () => {
  for (const servico of QUOTE_SERVICES)
    assert.doesNotThrow(() => validateQuoteData({ ...valid, servico }));
  for (const servico of [
    "Emergencial",
    "Distribuição",
    "Logística Reversa",
    "",
  ])
    assert.throws(() => validateQuoteData({ ...valid, servico }));
});
test("exige pagador e dados obrigatórios", () => {
  for (const key of [
    "nome",
    "email",
    "telefone",
    "origem",
    "destino",
    "pagador_frete",
  ])
    assert.throws(() => validateQuoteData({ ...valid, [key]: "  " }));
});
test("bloqueia ausência de CAPTCHA e honeypot preenchido", () => {
  assert.throws(() =>
    validateQuoteData({ ...valid, "h-captcha-response": "" }),
  );
  assert.throws(() => validateQuoteData({ ...valid, botcheck: "on" }));
});
test("rejeita medidas negativas ou não numéricas", () => {
  for (const value of ["-10", "0", "Infinity", "abc"])
    assert.throws(() => validateQuoteData({ ...valid, comprimento: value }));
  assert.doesNotThrow(() => validateQuoteData({ ...valid, peso: "0.5" }));
});
test("e-mail consultivo preserva serviço e roteiro das dimensões", () => {
  const url = new URL(serviceEmail("Manuseio, Movimentação e Distribuição"));
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "G4@g4express.com.br");
  assert.match(url.searchParams.get("subject"), /Manuseio/);
  assert.match(url.searchParams.get("body"), /comprimento × largura × altura/);
});
