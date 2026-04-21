import { Button, Text } from "@/src/components/ui";
import { ONBOARDING_SLIDES, OnboardingSlide } from "@/src/constants/onboarding";
import { colors, spacing } from "@/src/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ONBOARDING_SEEN_KEY = "@finlearn/onboarding_seen";

function Slide({ item }: { item: OnboardingSlide }) {
  const renderTitle = () => {
    const parts = item.title.split(item.accent);
    return (
      <Text variant="display" style={styles.slideTitle}>
        {parts[0]}
        <Text variant="display" color="accent">
          {item.accent}
        </Text>
        {parts[1]}
      </Text>
    );
  };

  return (
    <View style={styles.slide}>
      <View style={styles.emojiContainer}>
        <View style={styles.emojiGlow} />
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>

      <View style={styles.slideText}>
        {renderTitle()}
        <Text variant="body" color="secondary" style={styles.slideSubtitle}>
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
}

function Dots({ count, activeIndex }: { count: number; activeIndex: number }) {
  return (
    <View style={styles.dots}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={[styles.dot, i === activeIndex && styles.dotActive]}
        />
      ))}
    </View>
  );
}

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLast = activeIndex === ONBOARDING_SLIDES.length - 1;

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index ?? 0);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const goNext = async () => {
    if (isLast) {
      await AsyncStorage.setItem(ONBOARDING_SEEN_KEY, "true");
      router.replace("/(auth)/login");
    } else {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };

  const skip = async () => {
    await AsyncStorage.setItem(ONBOARDING_SEEN_KEY, "true");
    router.replace("/(auth)/login");
  };

  return (
    <View
      style={[styles.container, { paddingBottom: insets.bottom + spacing[5] }]}
    >
      <View style={[styles.header, { paddingTop: insets.top + spacing[4] }]}>
        <TouchableOpacity onPress={skip} hitSlop={12}>
          <Text variant="bodyMedium" color="tertiary">
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={ONBOARDING_SLIDES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Slide item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        style={styles.flatList}
      />

      <View style={styles.footer}>
        <Dots count={ONBOARDING_SLIDES.length} activeIndex={activeIndex} />

        <Button
          label={isLast ? "Get Started" : "Next"}
          onPress={goNext}
          variant="primary"
          size="lg"
        />

        {!isLast && (
          <Button
            label="Already have an account? Sign In"
            onPress={() => router.replace("/(auth)/login")}
            variant="ghost"
            size="sm"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  header: {
    paddingHorizontal: spacing[5],
    alignItems: "flex-end",
  },
  flatList: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    paddingHorizontal: spacing[6],
    justifyContent: "center",
    gap: spacing[8],
  },
  emojiContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  emojiGlow: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.lime[200],
    opacity: 0.08,
  },
  emoji: {
    fontSize: 100,
    lineHeight: 120,
  },
  slideText: {
    gap: spacing[4],
  },
  slideTitle: {
    fontSize: 38,
    lineHeight: 42,
  },
  slideSubtitle: {
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: spacing[5],
    gap: spacing[4],
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.gray[700],
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.lime[200],
    borderRadius: 3,
  },
});
