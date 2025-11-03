// AppNavigator.tsx
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { colors } from "../config/styles";
import RootNavigator from "./RootNavigator";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.background,
    border: "transparent",
    text: colors.white,
    primary: colors.primary,
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
