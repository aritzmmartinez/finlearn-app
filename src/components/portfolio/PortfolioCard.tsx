import { Text } from "@/components/ui";
import { colors, radius, shadow, spacing } from "@/theme";
import type { Portfolio } from "@/types/portfolio.types";
import { formatCurrency, formatPercent, formatSign } from "@/utils/format";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface PortfolioCardProps {
  portfolio: Portfolio & {
    total_value?: number;
    total_gain_loss_pct?: number;
    positions_count?: number;
  };
  onPress: () => void;
}

export function PortfolioCard({ portfolio, onPress }: PortfolioCardProps) {
  const gain = portfolio.total_gain_loss_pct ?? 0;
  const isPositive = gain >= 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[styles.card, shadow.sm]}
    >
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>◈</Text>
        </View>
        <View style={styles.badge}>
          <Text variant="label" color="tertiary">
            {portfolio.currency}
          </Text>
        </View>
      </View>

      <Text variant="h3" style={styles.name} numberOfLines={1}>
        {portfolio.name}
      </Text>

      <Text variant="display" style={styles.value}>
        {formatCurrency(portfolio.total_value ?? 0, portfolio.currency)}
      </Text>

      <View style={styles.footer}>
        <View
          style={[
            styles.gainBadge,
            isPositive ? styles.gainPos : styles.gainNeg,
          ]}
        >
          <Text
            variant="caption"
            style={{
              color: isPositive ? colors.success : colors.error,
              fontWeight: "600",
            }}
          >
            {formatSign(gain)}
            {formatPercent(Math.abs(gain))}
          </Text>
        </View>
        <Text variant="caption" color="tertiary">
          {portfolio.positions_count ?? 0} positions
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bg.card,
    borderRadius: radius.xl,
    padding: spacing[5],
    borderWidth: 1,
    borderColor: colors.border.subtle,
    gap: spacing[3],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: "rgba(218,255,61,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 18,
    color: colors.lime[200],
  },
  badge: {
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
    borderRadius: radius.full,
    backgroundColor: colors.bg.elevated,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  name: {
    marginTop: spacing[1],
  },
  value: {
    fontSize: 28,
    lineHeight: 32,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing[1],
  },
  gainBadge: {
    paddingHorizontal: spacing[3],
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  gainPos: {
    backgroundColor: "rgba(76,175,80,0.12)",
  },
  gainNeg: {
    backgroundColor: "rgba(239,83,80,0.12)",
  },
});
