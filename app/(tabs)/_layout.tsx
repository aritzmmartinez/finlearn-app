import { Tabs, router } from "expo-router";
import React, { useEffect } from "react";

import { Text } from "@/components/ui";
import { useAuthStore } from "@/stores/auth.store";
import { colors, shadow, spacing } from "@/theme";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_ICONS: Record<
  string,
  { active: string; inactive: string; label: string }
> = {
  portfolio: { active: ".", inactive: ".", label: "Portfolio" },
  analysis: { active: ".", inactive: ".", label: "Analysis" },
  import: { active: ".", inactive: ".", label: "Import" },
  concepts: { active: ".", inactive: ".", label: "Learn" },
  profile: { active: ".", inactive: ".", label: "Profile" },
};

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBar,
        { paddingBottom: insets.bottom + spacing[2] },
        shadow.md,
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const icon = TAB_ICONS[route.name];
        const isImport = route.name === "import";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (isImport) {
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.8}
              style={styles.fabButton}
            >
              <View style={[styles.fab, isFocused && styles.fabActive]}>
                <Text style={styles.fabIcon}>+</Text>
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            style={styles.tabItem}
          >
            <Text
              style={[
                styles.tabIcon,
                { color: isFocused ? colors.lime[200] : colors.gray[500] },
              ]}
            >
              {isFocused ? icon.active : icon.inactive}
            </Text>
            <Text
              variant="label"
              style={[
                styles.tabLabel,
                { color: isFocused ? colors.lime[200] : colors.gray[500] },
              ]}
            >
              {icon.label}
            </Text>
            {isFocused && <View style={styles.activeDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  const { session, initialized } = useAuthStore();

  useEffect(() => {
    if (initialized && !session) {
      router.replace("/(auth)/login");
    }
  }, [initialized, session]);

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="portfolio" />
      <Tabs.Screen name="analysis" />
      <Tabs.Screen name="import" />
      <Tabs.Screen name="concepts" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: colors.bg.card,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
    paddingTop: spacing[3],
    paddingHorizontal: spacing[2],
    alignItems: "flex-end",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    gap: 3,
    paddingBottom: spacing[1],
    position: "relative",
  },
  tabIcon: {
    fontSize: 18,
    lineHeight: 22,
  },
  tabLabel: {
    fontSize: 9,
    letterSpacing: 0.5,
  },
  activeDot: {
    position: "absolute",
    bottom: -spacing[2],
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.lime[200],
  },
  fabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: spacing[1],
  },
  fab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.bg.elevated,
    borderWidth: 1,
    borderColor: colors.border.default,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  fabActive: {
    backgroundColor: colors.lime[200],
    borderColor: colors.lime[200],
    ...shadow.lime,
  },
  fabIcon: {
    fontSize: 26,
    lineHeight: 30,
    color: colors.text.primary,
    fontWeight: "300",
  },
});
