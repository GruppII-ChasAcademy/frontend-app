import { ReactNode } from "react";
import { ApiContext } from "../../hooks/context/ApiContext";
import useApiCtx from "../../hooks/context/api/useApiCtx";

type ApiProviderProps = {
  children: ReactNode;
};

const ApiProvider = ({ children }: ApiProviderProps) => {
  const apiContext = useApiCtx();

  return (
    <ApiContext.Provider value={apiContext}>{children}</ApiContext.Provider>
  );
};

export default ApiProvider;
