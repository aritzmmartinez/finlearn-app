import { Button, Input, Screen, Text } from "@/src/components/ui";
import { useAuthStore } from "@/src/stores/auth.store";
import { spacing } from "@/src/theme";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const { signUp, loading } = useAuthStore();

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Minimum 8 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    try {
      await signUp(email.trim().toLowerCase(), password, name.trim());
      // router.replace("/(tabs)/portfolio");
    } catch (err: any) {
      const msg = err?.message ?? "";
      if (msg.includes("already")) {
        setErrors({ email: "This email is already registered" });
      } else {
        setErrors({
          password: "Error creating account. Please try again.",
        });
      }
    }
  };

  return (
    <Screen keyboardAware scrollable padded>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text variant="body" color="secondary">
            ← Back
          </Text>
        </TouchableOpacity>

        <Text variant="display" style={styles.title}>
          Create your{"\n"}
          <Text variant="display" color="accent">
            account.
          </Text>
        </Text>
        <Text variant="body" color="secondary">
          Free forever. No credit card required.
        </Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          autoCapitalize="words"
          autoComplete="name"
          error={errors.name}
        />

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
          placeholder="Minimum 8 characters"
          secureTextEntry={!showPassword}
          error={errors.password}
          hint={!errors.password ? "Minimum 8 characters" : undefined}
          rightIcon={
            <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
              <Text variant="caption" color="secondary">
                {showPassword ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          }
        />
      </View>

      <View style={styles.legal}>
        <Text variant="caption" color="tertiary" style={styles.legalText}>
          By signing up, you agree to our{" "}
          <Text variant="caption" color="accent">
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text variant="caption" color="accent">
            Privacy Policy
          </Text>
          .
        </Text>
      </View>

      <View style={styles.actions}>
        <Button
          label="Create Account"
          onPress={handleRegister}
          loading={loading}
        />

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.back()}
        >
          <Text variant="caption" color="secondary">
            Already have an account?{" "}
            <Text variant="caption" color="accent">
              Sign In
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing[6],
    paddingBottom: spacing[8],
    gap: spacing[3],
  },
  backButton: {
    marginBottom: spacing[4],
  },
  title: {
    fontSize: 38,
    lineHeight: 42,
  },
  form: {
    gap: spacing[5],
  },
  legal: {
    paddingTop: spacing[5],
  },
  legalText: {
    lineHeight: 20,
  },
  actions: {
    gap: spacing[4],
    paddingTop: spacing[6],
    paddingBottom: spacing[6],
  },
  loginLink: {
    alignItems: "center",
  },
});
