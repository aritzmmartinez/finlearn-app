import { Button, Input, Screen, Text } from "@/components/ui";
import { useCreatePortfolio, usePortfolios } from "@/hooks/usePortfolio";
import { PortfolioCard } from "@/src/components/portfolio/PortfolioCard";
import { useAuthStore } from "@/stores/auth.store";
import { colors, radius, shadow, spacing } from "@/theme";
import type { Portfolio } from "@/types/portfolio.types";
import { formatCurrency } from "@/utils/format";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyEmoji}>◈</Text>
      <Text variant="h2" style={styles.emptyTitle}>
        Without portfolios, there is no learning.
      </Text>
      <Text variant="body" color="secondary" style={styles.emptyText}>
        Create your first portfolio and import your positions to start learning.
      </Text>
      <Button
        label="Create Portfolio"
        onPress={onAdd}
        size="md"
        fullWidth={false}
        style={styles.emptyButton}
      />
    </View>
  );
}

function CreatePortfolioModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { mutateAsync: create, isPending } = useCreatePortfolio();

  const handleCreate = async () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    try {
      await create({ name: name.trim(), currency: "EUR" });
      setName("");
      setError("");
      onClose();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleClose = () => {
    setName("");
    setError("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, shadow.lg]}>
          <Text variant="h2" style={styles.modalTitle}>
            New Portfolio
          </Text>
          <Text variant="body" color="secondary" style={styles.modalSubtitle}>
            Default in EUR. You can change the currency later.
          </Text>
          <Input
            label="Portfolio Name"
            value={name}
            onChangeText={setName}
            placeholder="Eg: My Main Portfolio"
            autoFocus
            error={error}
            onSubmitEditing={handleCreate}
            returnKeyType="done"
          />
          <View style={styles.modalActions}>
            <Button
              label="Cancel"
              variant="ghost"
              onPress={handleClose}
              fullWidth={false}
              style={styles.modalBtn}
            />
            <Button
              label="Create"
              onPress={handleCreate}
              loading={isPending}
              fullWidth={false}
              style={styles.modalBtn}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

function PortfolioSummary({
  portfolios,
  userName,
}: {
  portfolios: Portfolio[];
  userName: string;
}) {
  const totalValue = portfolios.reduce(
    (acc, p: any) => acc + (p.total_value ?? 0),
    0,
  );
  return (
    <View style={styles.summary}>
      <Text variant="label" color="tertiary">
        Good morning
      </Text>
      <Text variant="h1" style={styles.summaryName}>
        {userName.split(" ")[0]} 👋
      </Text>
      {portfolios.length > 0 && (
        <View style={styles.summaryValue}>
          <Text variant="label" color="secondary">
            Total Assets
          </Text>
          <Text variant="display" style={styles.summaryAmount}>
            {formatCurrency(totalValue)}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function PortfolioScreen() {
  const [showCreate, setShowCreate] = useState(false);
  const {
    data: portfolios = [],
    isLoading,
    refetch,
    isRefetching,
  } = usePortfolios();
  const { user } = useAuthStore();
  const userName = user?.user_metadata?.full_name ?? "Inversor";

  if (isLoading) {
    return (
      <Screen>
        <View style={styles.loader}>
          <ActivityIndicator color={colors.lime[200]} size="large" />
        </View>
      </Screen>
    );
  }

  return (
    <>
      <Screen padded={false}>
        <FlatList
          data={portfolios}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={colors.lime[200]}
            />
          }
          ListHeaderComponent={
            <View style={styles.header}>
              <PortfolioSummary portfolios={portfolios} userName={userName} />
              <View style={styles.sectionRow}>
                <Text variant="h3">My Portfolios</Text>
                <TouchableOpacity
                  onPress={() => setShowCreate(true)}
                  style={styles.addButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.addIcon}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          ListEmptyComponent={<EmptyState onAdd={() => setShowCreate(true)} />}
          renderItem={({ item }) => (
            <View style={styles.cardWrap}>
              <PortfolioCard
                portfolio={item as any}
                onPress={() => router.push(`/portfolio/${item.id}` as any)}
              />
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: spacing[3] }} />}
        />
      </Screen>
      <CreatePortfolioModal
        visible={showCreate}
        onClose={() => setShowCreate(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, alignItems: "center", justifyContent: "center" },
  list: { flexGrow: 1, paddingBottom: spacing[10] },
  header: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[4],
    paddingBottom: spacing[6],
    gap: spacing[6],
  },
  summary: { gap: spacing[2], paddingTop: spacing[4] },
  summaryName: { fontSize: 26 },
  summaryValue: {
    gap: spacing[1],
    marginTop: spacing[4],
    paddingTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
  },
  summaryAmount: { fontSize: 38, lineHeight: 44 },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.bg.elevated,
    borderWidth: 1,
    borderColor: colors.border.default,
    alignItems: "center",
    justifyContent: "center",
  },
  addIcon: { fontSize: 22, color: colors.lime[200], lineHeight: 26 },
  cardWrap: { paddingHorizontal: spacing[5] },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[8],
    paddingTop: spacing[16],
    gap: spacing[4],
  },
  emptyEmoji: {
    fontSize: 56,
    color: colors.lime[200],
    opacity: 0.4,
    marginBottom: spacing[2],
  },
  emptyTitle: { textAlign: "center" },
  emptyText: { textAlign: "center", lineHeight: 22 },
  emptyButton: { marginTop: spacing[4], paddingHorizontal: spacing[8] },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.bg.overlay,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.bg.card,
    borderTopLeftRadius: radius["2xl"],
    borderTopRightRadius: radius["2xl"],
    padding: spacing[6],
    gap: spacing[5],
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  modalTitle: { marginBottom: spacing[1] },
  modalSubtitle: { marginTop: -spacing[3] },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing[3],
    marginTop: spacing[2],
  },
  modalBtn: { paddingHorizontal: spacing[6] },
});
