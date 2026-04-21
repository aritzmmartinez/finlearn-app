import { useAuthStore } from "@/src/stores/auth.store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";

const ONBOARDING_SEEN_KEY = "@finlearn/onboarding_seen";

export default function Index() {
  const { session, initialized } = useAuthStore();

  useEffect(() => {
    if (!initialized) return;

    const redirect = async () => {
      if (session) {
        router.replace("/(tabs)/portfolio");
        return;
      }

      const seen = await AsyncStorage.getItem(ONBOARDING_SEEN_KEY);
      if (seen) {
        router.replace("/(auth)/login");
      } else {
        router.replace("/(auth)/onboarding");
      }
    };

    redirect();
  }, [initialized, session]);

  return null;
}
