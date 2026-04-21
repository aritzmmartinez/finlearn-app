import { Text } from "@/components/ui";
import { colors, radius, spacing } from "@/theme";
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return <ErrorFallback error={this.state.error} onReset={this.reset} />;
  }
}

function ErrorFallback({
  error,
  onReset,
}: {
  error: Error | null;
  onReset: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>△</Text>
      </View>

      <Text variant="h2" style={styles.title}>
        Oops! something went wrong
      </Text>

      <Text variant="body" color="secondary" style={styles.subtitle}>
        An unexpected error has occurred. You can try to recover or restart the
        app if the problem persists.
      </Text>

      {__DEV__ && error?.message && (
        <View style={styles.devBox}>
          <Text variant="mono" style={styles.devText} numberOfLines={6}>
            {error.message}
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={onReset}
        activeOpacity={0.75}
        style={styles.button}
      >
        <Text variant="bodySemiBold" color="inverse">
          Try Again
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[8],
    gap: spacing[5],
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(239,83,80,0.1)",
    borderWidth: 1,
    borderColor: "rgba(239,83,80,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing[2],
  },
  icon: {
    fontSize: 32,
    color: colors.error,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    lineHeight: 24,
  },
  devBox: {
    width: "100%",
    backgroundColor: colors.bg.card,
    borderRadius: radius.lg,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "rgba(239,83,80,0.2)",
  },
  devText: {
    color: colors.error,
    fontSize: 11,
    lineHeight: 17,
  },
  button: {
    backgroundColor: colors.lime[200],
    borderRadius: radius.full,
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[4],
    marginTop: spacing[2],
  },
});
