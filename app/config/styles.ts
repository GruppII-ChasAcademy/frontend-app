// config/styles.ts

export const colors = {
  primary: "#3B82F6",
  gray: {
    25: "#FCFCFD",
    50: "#F9FAFB",
    100: "#F2F4F7",
    200: "#E4E7EC",
    300: "#D0D5DD",
    400: "#98A2B3",
    500: "#667085",
    600: "#475467",
    700: "#344054",
    800: "#1D2939",
    900: "#101828",
  },
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
} as const;

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
} as const;

export const spacing = {
  xxs: 1,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,

  "0": 0,
  "1": 4,
  "2": 8,
  "3": 12,
  "4": 16,
  "5": 20,
  "6": 24,
  "8": 32,
  "10": 40,
  "12": 48,
  "14": 56,
  "16": 64,
  "20": 80,
  "24": 96,
} as const;

export type Colors = typeof colors;
export type FontSizes = typeof fontSizes;
export type Spacing = typeof spacing;
