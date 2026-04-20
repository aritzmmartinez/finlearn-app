export const colors = {
  black: "#0A0A0A",
  white: "#FFFFFF",

  bg: {
    primary: "#0F0F0F",
    secondary: "#161616",
    card: "#1C1C1C",
    elevated: "#222222",
    overlay: "rgba(0,0,0,0.7)",
  },

  lime: {
    50: "#F5FFD6",
    100: "#EAFF99",
    200: "#DAFF3D",
    300: "#C8F000",
    400: "#A8CC00",
    500: "#87A300",
  },

  gray: {
    50: "#F5F5F5",
    100: "#E0E0E0",
    200: "#BDBDBD",
    300: "#9E9E9E",
    400: "#757575",
    500: "#616161",
    600: "#424242",
    700: "#303030",
    800: "#1E1E1E",
    900: "#141414",
  },

  success: "#4CAF50",
  error: "#EF5350",
  warning: "#FF9800",

  text: {
    primary: "#F5F5F5",
    secondary: "#9E9E9E",
    tertiary: "#616161",
    inverse: "#0A0A0A",
    accent: "#DAFF3D",
  },

  border: {
    default: "#2A2A2A",
    subtle: "#1E1E1E",
    accent: "#DAFF3D",
  },
} as const;

export type Colors = typeof colors;
