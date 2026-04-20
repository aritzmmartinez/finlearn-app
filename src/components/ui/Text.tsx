import {
  colors,
  fonts,
  fontSize,
  letterSpacing,
  lineHeight,
} from "@/src/theme";
import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

type Variant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "bodyMedium"
  | "bodySemiBold"
  | "caption"
  | "label"
  | "mono";

type Color =
  | "primary"
  | "secondary"
  | "tertiary"
  | "accent"
  | "inverse"
  | "error"
  | "success";

interface TextProps extends RNTextProps {
  variant?: Variant;
  color?: Color;
}

const variantStyles: Record<Variant, object> = {
  display: {
    fontFamily: fonts.display,
    fontSize: fontSize["3xl"],
    lineHeight: fontSize["3xl"] * lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h1: {
    fontFamily: fonts.display,
    fontSize: fontSize["2xl"],
    lineHeight: fontSize["2xl"] * lineHeight.snug,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontFamily: fonts.display,
    fontSize: fontSize.xl,
    lineHeight: fontSize.xl * lineHeight.snug,
  },
  h3: {
    fontFamily: fonts.displayMedium,
    fontSize: fontSize.lg,
    lineHeight: fontSize.lg * lineHeight.snug,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: fontSize.base,
    lineHeight: fontSize.base * lineHeight.normal,
  },
  bodyMedium: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.base,
    lineHeight: fontSize.base * lineHeight.normal,
  },
  bodySemiBold: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSize.base,
    lineHeight: fontSize.base * lineHeight.normal,
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * lineHeight.normal,
  },
  label: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.xs,
    lineHeight: fontSize.xs * lineHeight.normal,
    letterSpacing: letterSpacing.wider,
    textTransform: "uppercase",
  },
  mono: {
    fontFamily: fonts.mono,
    fontSize: fontSize.sm,
  },
};

const colorStyles: Record<Color, string> = {
  primary: colors.text.primary,
  secondary: colors.text.secondary,
  tertiary: colors.text.tertiary,
  accent: colors.text.accent,
  inverse: colors.text.inverse,
  error: colors.error,
  success: colors.success,
};

export function Text({
  variant = "body",
  color = "primary",
  style,
  ...props
}: TextProps) {
  return (
    <RNText
      style={[variantStyles[variant], { color: colorStyles[color] }, style]}
      {...props}
    />
  );
}
