import { colors, spacing } from "@/theme";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export function AnimatedSplash({
  ready,
  onFinish,
}: {
  ready: boolean;
  onFinish: () => void;
}) {
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.85)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 300,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (!ready) return;

    Animated.timing(opacity, {
      toValue: 0,
      duration: 350,
      delay: 200,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) onFinish();
    });
  }, [ready]);

  return (
    <Animated.View style={[styles.container, { opacity }]} pointerEvents="none">
      <View style={styles.glow} />

      <Animated.View
        style={[
          styles.logoWrap,
          { opacity: logoOpacity, transform: [{ scale }] },
        ]}
      >
        <View style={styles.logoBox}>
          <Animated.Text style={styles.logoText}>FL</Animated.Text>
        </View>

        <View style={styles.dotGrid}>
          {Array.from({ length: 9 }).map((_, i) => (
            <View
              key={i}
              style={[styles.dot, { opacity: 0.15 + (i % 3) * 0.1 }]}
            />
          ))}
        </View>
      </Animated.View>

      <Animated.View style={[styles.taglineWrap, { opacity: taglineOpacity }]}>
        <Animated.Text style={styles.appName}>FinLearn</Animated.Text>
        <Animated.Text style={styles.tagline}>
          Learn to invest with confidence
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.bg.primary,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[8],
    zIndex: 999,
  },
  glow: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: colors.lime[200],
    opacity: 0.04,
    top: "30%",
    alignSelf: "center",
  },
  logoWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoBox: {
    width: 88,
    height: 88,
    borderRadius: 26,
    backgroundColor: "rgba(218,255,61,0.1)",
    borderWidth: 1.5,
    borderColor: "rgba(218,255,61,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontFamily: "Syne_700Bold",
    fontSize: 36,
    color: colors.lime[200],
    letterSpacing: -1,
  },
  dotGrid: {
    position: "absolute",
    width: 60,
    height: 60,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    right: -50,
    top: -10,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.lime[200],
  },
  taglineWrap: {
    alignItems: "center",
    gap: spacing[2],
  },
  appName: {
    fontFamily: "Syne_700Bold",
    fontSize: 28,
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  tagline: {
    fontFamily: "DMSans_400Regular",
    fontSize: 15,
    color: colors.text.tertiary,
    letterSpacing: 0.3,
  },
});
