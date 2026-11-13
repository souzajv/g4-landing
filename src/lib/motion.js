import { createContext, useContext } from "react";

export const MotionContext = createContext(null);

export function usePageMotion() {
  return useContext(MotionContext);
}
