import { View, Text, Image, StyleSheet } from "react-native";
import type { User } from "../../types/types";
import { colors, fontSizes, spacing } from "../../config/styles";

type Props = {
  user: User;
  title?: string;
};

export default function UserCard({ user, title = "Profile" }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={{ uri: user.image || "https://picsum.photos/seed/user/200" }}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.name}>{user.name}</Text>
          {user.role && <Text style={styles.role}>{String(user.role)}</Text>}
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.epost ?? "-"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>
          {user.phone ? String(user.phone) : "-"}
        </Text>
      </View>

      {user.company && (
        <View style={styles.row}>
          <Text style={styles.label}>Company</Text>
          <Text style={styles.value}>
            {"name" in user.company ? user.company.name : String(user.company)}
          </Text>
        </View>
      )}

      {user.date && (
        <View style={styles.row}>
          <Text style={styles.label}>Member since</Text>
          <Text style={styles.value}>
            {new Date(user.date).toLocaleDateString()}
          </Text>
        </View>
      )}

      <View style={[styles.row, { borderBottomWidth: 0 }]}>
        <Text style={styles.label}>Packages</Text>
        <Text style={styles.value}>{user.packages?.length ?? 0}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: spacing.lg,
    backgroundColor: colors.gray[800],
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray[700],
    gap: spacing.md,
  },
  header: { flexDirection: "row", gap: spacing.md, alignItems: "center" },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 999,
    backgroundColor: colors.gray[700],
  },
  title: { color: colors.gray[300], fontSize: fontSizes.sm, marginBottom: 2 },
  name: {
    fontSize: fontSizes["2xl"],
    fontWeight: "700",
    color: colors.white,
  },
  role: { color: colors.gray[300], marginTop: 2 },

  row: {
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.gray[700],
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: { color: colors.gray[400], fontSize: fontSizes.sm },
  value: {
    fontWeight: "600",
    color: colors.gray[25],
    maxWidth: "60%",
    textAlign: "right",
    fontSize: fontSizes.md,
  },
});
