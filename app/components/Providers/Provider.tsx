import { ReactNode } from "react";
import ApiProvider from "./ApiProvider";
import { Provider as PaperProvider } from "react-native-paper";

type ProviderProps = {
  children: ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return (
    <PaperProvider>
      <ApiProvider>{children}</ApiProvider>
    </PaperProvider>
  );
};
export default Provider;
