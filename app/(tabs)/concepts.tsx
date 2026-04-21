import { Text } from "@/components/ui";
import { colors, spacing } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function ConceptsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="h3" color="secondary">
        Concepts
      </Text>
      <Text variant="caption" color="tertiary">
        Coming soon...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
  },
});
