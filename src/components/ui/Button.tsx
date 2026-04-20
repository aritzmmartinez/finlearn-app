import { colors, fonts, fontSize, radius, spacing } from "@/src/theme";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Text } from "./Text";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  variant?: Variant;
  size?: Size;
  label: string;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantConfig: Record<
  Variant,
  { bg: string; text: string; border?: string }
> = {
  primary: {
    bg: colors.lime[200],
    text: colors.text.inverse,
  },
  secondary: {
    bg: colors.bg.elevated,
    text: colors.text.primary,
    border: colors.border.default,
  },
  ghost: {
    bg: "transparent",
    text: colors.text.primary,
  },
  danger: {
    bg: "rgba(239,83,80,0.15)",
    text: colors.error,
    border: "rgba(239,83,80,0.3)",
  },
};

const sizeConfig: Record<
  Size,
  { height: number; paddingH: number; fontSize: number }
> = {
  sm: { height: 40, paddingH: spacing[4], fontSize: fontSize.sm },
  md: { height: 52, paddingH: spacing[5], fontSize: fontSize.base },
  lg: { height: 60, paddingH: spacing[6], fontSize: fontSize.md },
};

export function Button({
  variant = "primary",
  size = "lg",
  label,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = true,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const vConfig = variantConfig[variant];
  const sConfig = sizeConfig[size];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={isDisabled}
      style={[
        styles.base,
        {
          backgroundColor: vConfig.bg,
          height: sConfig.height,
          paddingHorizontal: sConfig.paddingH,
          borderWidth: vConfig.border ? 1 : 0,
          borderColor: vConfig.border,
          opacity: isDisabled ? 0.5 : 1,
          alignSelf: fullWidth ? "stretch" : "flex-start",
        },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? colors.black : colors.lime[200]}
        />
      ) : (
        <View style={styles.content}>
          {leftIcon}
          <Text
            style={[
              styles.label,
              {
                fontFamily: fonts.bodySemiBold,
                fontSize: sConfig.fontSize,
                color: vConfig.text,
                marginLeft: leftIcon ? spacing[2] : 0,
                marginRight: rightIcon ? spacing[2] : 0,
              },
            ]}
          >
            {label}
          </Text>
          {rightIcon}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    textAlign: "center",
  },
});
