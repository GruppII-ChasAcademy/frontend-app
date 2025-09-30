import { Feather } from "@expo/vector-icons";
import { colors } from "../config/styles";

export const exitIcon = (size = 24, color = colors.primary) => (
  <Feather name="x" size={size} color={color} />
);
