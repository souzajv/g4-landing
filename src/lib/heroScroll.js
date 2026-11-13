export const HERO_CHAPTERS = [
  {
    title: ["Rápido de", "verdade."],
    label: "Agilidade",
    description:
      "Transporte rodoviário e aéreo para conectar sua empresa a todo o Brasil.",
  },
  {
    title: ["Cuidado em", "cada etapa."],
    label: "Cuidado",
    description:
      "Da preparação da carga ao acompanhamento da entrega. Cada detalhe importa.",
  },
  {
    title: ["Seu próximo", "destino."],
    label: "Conexão",
    description:
      "Uma nova entrega começa com uma conversa. Conte com a G4 Express.",
  },
];

export const clampProgress = (value) =>
  Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
export const chapterAt = (progress) =>
  Math.min(2, Math.floor(clampProgress(progress) * 3));
export const videoTimeAt = (progress, duration) =>
  Number.isFinite(duration) && duration > 0
    ? clampProgress(progress) * Math.max(0, duration - 0.06)
    : 0;
