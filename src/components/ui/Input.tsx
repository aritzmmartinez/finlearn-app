import { colors, fonts, fontSize, radius, spacing } from "@/src/theme";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { Text } from "./Text";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  hint?: string;
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  hint,
  style,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? colors.error
    : focused
      ? colors.lime[200]
      : colors.border.default;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <Text variant="label" color="secondary" style={styles.label}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.container,
          {
            borderColor,
            backgroundColor: focused ? colors.bg.elevated : colors.bg.card,
          },
        ]}
      >
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

        <TextInput
          style={[
            styles.input,
            {
              paddingLeft: leftIcon ? 0 : spacing[4],
              paddingRight: rightIcon ? 0 : spacing[4],
              color: colors.text.primary,
              fontFamily: fonts.body,
              fontSize: fontSize.base,
            },
            style,
          ]}
          placeholderTextColor={colors.text.tertiary}
          selectionColor={colors.lime[200]}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />

        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>

      {error ? (
        <Text variant="caption" color="error" style={styles.hint}>
          {error}
        </Text>
      ) : hint ? (
        <Text variant="caption" color="tertiary" style={styles.hint}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing[2],
  },
  label: {
    marginBottom: 2,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: radius.lg,
    height: 56,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    height: "100%",
  },
  iconLeft: {
    paddingLeft: spacing[4],
    paddingRight: spacing[3],
  },
  iconRight: {
    paddingRight: spacing[4],
    paddingLeft: spacing[3],
  },
  hint: {
    marginTop: 2,
  },
});
