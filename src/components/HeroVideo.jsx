import { useEffect, useRef } from "react";

// O vídeo fica no DOM desde o primeiro render: montado depois, o navegador
// ignora o atributo autoPlay e a hero congela no poster. O que dá para
// economizar sem quebrar isso é o preload — começa em "metadata" (poucos KB,
// não disputa banda com o LCP) e vira "auto" assim que a página termina de
// carregar, quando o play é pedido explicitamente.
//
// O poster do próprio <video> cobre o intervalo até o primeiro frame, então
// não existe imagem separada que possa ficar travada por cima.
export default function HeroVideo({ poster, src, className = "" }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const conn = navigator.connection;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // em conexão fraca ou economia de dados o poster já conta a história
    if (reduced || conn?.saveData || /2g/.test(conn?.effectiveType || "")) return;

    const startPlayback = () => {
      video.preload = "auto";
      video.load();
      video.play().catch(() => {});
    };

    if (document.readyState === "complete") startPlayback();
    else window.addEventListener("load", startPlayback, { once: true });

    // rede de segurança: se o loop nativo não reiniciar (troca de aba,
    // throttling, decode interrompido), volta ao início na mão
    const onEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };
    video.addEventListener("ended", onEnded);

    return () => {
      window.removeEventListener("load", startPlayback);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
