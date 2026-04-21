import { Stack, router } from "expo-router";
import { useEffect } from "react";

import { useAuthStore } from "@/src/stores/auth.store";

export default function AuthLayout() {
  const { session, initialized } = useAuthStore();

  useEffect(() => {
    if (initialized && session) {
      router.replace("/(tabs)/portfolio");
    }
  }, [initialized, session]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="onboarding" options={{ animation: "none" }} />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
