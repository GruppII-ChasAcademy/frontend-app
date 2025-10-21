import React from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useApiContext } from "../../hooks/context/ApiContext";
import UserCard from "./userCard";
import { colors, fontSizes, spacing } from "../../config/styles";

const ProfileScreen = () => {
  const {
    isLoading,
    currentUser,
    users: { usersQuery },
  } = useApiContext();

  const loading = isLoading || usersQuery.isLoading;
  const error = usersQuery.isError ? (usersQuery.error as Error) : null;
  const fallbackUser = usersQuery.data?.[0] ?? null;
  const user = currentUser ?? fallbackUser ?? null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Profile</Text>

      {loading && (
        <View style={styles.centerBox}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.muted}>Loading user…</Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.centerBox}>
          <Text style={styles.error}>
            Failed to load users: {error.message}
          </Text>
        </View>
      )}

      {!loading && !error && user && (
        <UserCard
          user={user}
          title={currentUser ? "Signed in" : "Sample user"}
        />
      )}

      {!loading && !error && !user && (
        <View style={styles.centerBox}>
          <Text style={styles.muted}>
            No users found. Create one in your test component.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  screenTitle: {
    fontSize: fontSizes["2xl"],
    fontWeight: "700",
    color: colors.white,
  },
  centerBox: {
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray[700],
    backgroundColor: colors.gray[800],
    borderRadius: spacing.lg,
    alignItems: "center",
    gap: spacing.sm,
  },
  muted: { color: colors.gray[400], fontSize: fontSizes.sm },
  error: { color: colors.danger, fontSize: fontSizes.md, fontWeight: "600" },
});

export default ProfileScreen;
