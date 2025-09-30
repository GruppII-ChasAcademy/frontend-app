import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

export const KEYBOARDHEIGHT = 420;

const useKeyboard = () => {
  const [isVisable, setIsVisable] = useState<boolean>(false);

  useEffect(() => {
    const showListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow",
      () => {
        setIsVisable(true);
      }
    );
    const hideListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide",
      () => {
        setIsVisable(false);
      }
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);
  return {
    keyBoardIsVisable: isVisable,
  };
};
export default useKeyboard;
