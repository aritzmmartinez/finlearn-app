import { Platform } from "react-native";

export const fonts = {
  display: "Syne_700Bold",
  displayMedium: "Syne_600SemiBold",
  body: "DMSans_400Regular",
  bodyMedium: "DMSans_500Medium",
  bodySemiBold: "DMSans_600SemiBold",
  mono: Platform.select({
    ios: "Menlo",
    android: "monospace",
    default: "monospace",
  }),
} as const;

export const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  "2xl": 30,
  "3xl": 38,
  "4xl": 48,
  "5xl": 60,
} as const;

export const lineHeight = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.65,
} as const;

export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
} as const;
