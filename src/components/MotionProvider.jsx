import { useLayoutEffect, useState } from "react";
import { MotionContext } from "../lib/motion";

export function MotionProvider({ children }) {
  const [systemReduced, setSystemReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [saveData, setSaveData] = useState(() => Boolean(navigator.connection?.saveData));
  const enabled = !systemReduced && !saveData;

  useLayoutEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator.connection;
    const update = () => {
      setSystemReduced(query.matches);
      setSaveData(Boolean(connection?.saveData));
    };
    query.addEventListener("change", update);
    connection?.addEventListener("change", update);
    return () => {
      query.removeEventListener("change", update);
      connection?.removeEventListener("change", update);
    };
  }, []);

  useLayoutEffect(() => {
    document.documentElement.dataset.motion = enabled ? "full" : "reduced";
  }, [enabled]);

  return <MotionContext.Provider value={{ enabled }}>{children}</MotionContext.Provider>;
}

