import { ReactNode } from "react";
import ApiProvider from "./ApiProvider";

type ProviderProps = {
  children: ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return <ApiProvider>{children}</ApiProvider>;
};
export default Provider;
