import { ReactNode } from "react";

type ProviderProps = { children: ReactNode };

// Pass-through – inga egna providers ännu
export default function Provider({ children }: ProviderProps) {
  return <>{children}</>;
}
