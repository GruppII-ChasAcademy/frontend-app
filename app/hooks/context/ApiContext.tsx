import { createContext, useContext, type PropsWithChildren } from "react";
import useApiCtx, { ApiCtxType } from "./api/useApiCtx";

export const ApiContext = createContext<ApiCtxType | null>(null);
export function ApiProvider({ children }: PropsWithChildren) {
  const value = useApiCtx();
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApiContext() {
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error("Api context not found");
  return ctx;
}
