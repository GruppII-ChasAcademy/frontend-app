import { createContext, RefObject, useContext, useEffect } from "react";
import { TextInput, View } from "react-native";

export type ViewRef = RefObject<View | TextInput | null>;
export type TapCallback = (isInside: boolean) => void;

export type GlobalTapContextType = {
  registerRef: (ref: ViewRef) => void;
  subscribe: (ref: ViewRef, callback: TapCallback) => void;
  unsubscribe: (ref: ViewRef) => void;
};

const GlobalTapContext = createContext<GlobalTapContextType | undefined>(
  undefined
);

export const useGlobalTap = (ref?: ViewRef, onTap?: TapCallback) => {
  const context = useContext(GlobalTapContext);

  useEffect(() => {
    if (!ref || !onTap || !ref.current) return;

    context?.registerRef(ref);
    context?.subscribe(ref, onTap);

    return () => {
      context?.unsubscribe(ref);
    };
  }, [ref, onTap]);

  return context;
};

export default GlobalTapContext;
