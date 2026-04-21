import { Button, Input, Screen, Text } from "@/src/components/ui";
import { useAuthStore } from "@/src/stores/auth.store";
import { colors, spacing } from "@/src/theme";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const { signIn, loading } = useAuthStore();

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    try {
      await signIn(email.trim(), password);
      console.log("Login successful");
      router.replace("/(tabs)/portfolio");
    } catch (err: any) {
      setErrors({ password: "Incorrect email or password" });
    }
  };

  return (
    <Screen keyboardAware scrollable padded>
      <View style={styles.header}>
        <View style={styles.logoMark}>
          <Text variant="h2" color="accent" style={styles.logoText}>
            FL
          </Text>
        </View>
        <Text variant="display" style={styles.title}>
          Welcome{"\n"}back.
        </Text>
        <Text variant="body" color="secondary">
          Your portfolio awaits.
        </Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="your@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          error={errors.email}
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry={!showPassword}
          autoComplete="password"
          error={errors.password}
          rightIcon={
            <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
              <Text variant="caption" color="secondary">
                {showPassword ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          }
        />

        <TouchableOpacity style={styles.forgotLink} onPress={() => {}}>
          <Text variant="caption" color="accent">
            Forgot your password?
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <Button label="Sign In" onPress={handleLogin} loading={loading} />

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text variant="caption" color="tertiary">
            or
          </Text>
          <View style={styles.dividerLine} />
        </View>

        <Button
          label="Create Account"
          variant="secondary"
          onPress={() => router.push("/(auth)/register")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing[8],
    paddingBottom: spacing[10],
    gap: spacing[3],
  },
  logoMark: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(218,255,61,0.12)",
    borderWidth: 1,
    borderColor: "rgba(218,255,61,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing[4],
  },
  logoText: {
    fontSize: 18,
  },
  title: {
    fontSize: 38,
    lineHeight: 42,
  },
  form: {
    gap: spacing[5],
  },
  forgotLink: {
    alignSelf: "flex-end",
  },
  actions: {
    gap: spacing[4],
    paddingTop: spacing[8],
    paddingBottom: spacing[6],
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[4],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.default,
  },
});
