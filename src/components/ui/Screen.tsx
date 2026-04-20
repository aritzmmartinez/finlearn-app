import { colors, spacing } from "@/src/theme";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenProps {
  children: React.ReactNode;
  scrollable?: boolean;
  padded?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  keyboardAware?: boolean;
}

export function Screen({
  children,
  scrollable = false,
  padded = true,
  style,
  contentStyle,
  keyboardAware = false,
}: ScreenProps) {
  const insets = useSafeAreaInsets();

  const content = (
    <View
      style={[
        styles.base,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingHorizontal: padded ? spacing[5] : 0,
        },
        style,
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.bg.primary} />
      {scrollable ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, contentStyle]}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.fill, contentStyle]}>{children}</View>
      )}
    </View>
  );

  if (keyboardAware) {
    return (
      <KeyboardAvoidingView
        style={styles.fill}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  fill: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
