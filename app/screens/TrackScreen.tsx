// app/screens/TrackScreen.tsx
import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { colors, fontSizes } from "../config/styles";
import type { Package } from "../types/types";
import Dialog from "../components/Dialog";
import Button from "../components/Button";
import {
  formatDateTime,
  findNearestCityName,
  buildCityHistory,
  packageBelongsToUser,
  getLastByDate,
} from "../utils/utils";
import { useApiContext } from "../hooks/context/ApiContext";

export default function TrackScreen() {
  const {
    currentUser,
    packages: { packagesQuery },
    users: { usersQuery },
  } = useApiContext();

  const loading = packagesQuery.isLoading || usersQuery.isLoading;
  const error =
    (packagesQuery.isError && (packagesQuery.error as Error)) ||
    (usersQuery.isError && (usersQuery.error as Error)) ||
    null;

  const userPackages = useMemo<Package[]>(() => {
    if (!currentUser || !packagesQuery.data) return [];
    return packagesQuery.data.filter((pkg) =>
      packageBelongsToUser(pkg, currentUser)
    );
  }, [currentUser, packagesQuery.data]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Package Status</Text>

      {loading && (
        <View style={styles.infoCard}>
          <ActivityIndicator />
          <Text style={styles.infoSub}>Loading packages…</Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.infoCard}>
          <Text style={styles.errorTitle}>Failed to load</Text>
          <Text style={styles.infoSub}>{error.message}</Text>
        </View>
      )}

      {!loading && !error && !currentUser && (
        <View style={styles.infoCard}>
          <Text style={styles.errorTitle}>Not signed in</Text>
          <Text style={styles.infoSub}>Log in to track your packages.</Text>
        </View>
      )}

      {!loading && !error && currentUser && (
        <FlatList
          data={userPackages}
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ paddingBottom: 16 }}
          renderItem={({ item }) => {
            const lastSensor = getLastByDate(item.stats);
            if (!lastSensor) return null;

            const cityName = findNearestCityName(
              lastSensor.gps.lat,
              lastSensor.gps.lon
            );
            const cityHistory = buildCityHistory(item);

            return (
              <Dialog
                closeOnBackdropPress
                enableCloseGesture
                trigger={({ open }) => (
                  <Button
                    variant="card"
                    onPress={open}
                    style={styles.card}
                    enablePressedStyles
                  >
                    <View style={styles.textColumn}>
                      <Text style={styles.packageId}>
                        Package ID: {item.id}
                      </Text>
                      <Text style={styles.currentLocation}>
                        Current Location: {cityName}
                      </Text>
                      <Text style={styles.metaText}>
                        Temperature: {lastSensor.temperature}°C | Humidity:{" "}
                        {lastSensor.huminity}
                      </Text>
                    </View>
                    <Image
                      source={{
                        uri: `https://picsum.photos/seed/${item.id}/112/84`,
                      }}
                      style={styles.thumbnail}
                    />
                  </Button>
                )}
              >
                {({ close }) => (
                  <View>
                    <Text style={styles.modalTitle}>Package {item.id}</Text>
                    <Text style={styles.modalSub}>
                      Current: {cityName} •{" "}
                      {formatDateTime(lastSensor.date, "en-GB")}
                    </Text>
                    <Text style={styles.modalBody}>
                      Temperature: {lastSensor.temperature}°C • Humidity:{" "}
                      {lastSensor.huminity}
                    </Text>

                    <Text style={styles.historyTitle}>Route history</Text>
                    <View style={styles.historyList}>
                      {cityHistory.map((entry) => (
                        <View
                          key={`${entry.city}-${entry.date}`}
                          style={styles.historyRow}
                        >
                          <View style={styles.historyBullet} />
                          <View style={{ flex: 1 }}>
                            <Text style={styles.historyCity}>{entry.city}</Text>
                            <Text style={styles.historyTime}>
                              {formatDateTime(entry.date, "en-GB")}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>

                    <Button
                      onPress={close}
                      variant="primary"
                      style={styles.modalClose}
                    >
                      Close
                    </Button>
                  </View>
                )}
              </Dialog>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No packages to track.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white, padding: 16 },
  title: {
    fontSize: fontSizes.lg,
    fontFamily: "bold",
    color: colors.black,
    textAlign: "center",
    marginBottom: 12,
  },

  infoCard: {
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
    marginBottom: 16,
    alignItems: "center",
    gap: 6,
  },
  infoSub: { color: colors.gray[600] },
  errorTitle: { color: colors.warning, fontWeight: "600" },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
    padding: 12,
    gap: 12,
  },
  textColumn: { flex: 1 },
  packageId: { color: colors.gray[600], marginBottom: 4 },
  currentLocation: { color: colors.black, fontFamily: "bold" },
  metaText: { color: colors.gray[600], marginTop: 6 },
  thumbnail: {
    width: 112,
    height: 84,
    borderRadius: 10,
    backgroundColor: colors.gray[100],
  },

  emptyState: { paddingTop: 40, alignItems: "center" },
  emptyText: { color: colors.gray[600] },

  modalTitle: {
    fontSize: fontSizes.lg,
    fontFamily: "bold",
    color: colors.black,
    marginBottom: 6,
  },
  modalSub: { color: colors.gray[600], marginBottom: 6 },
  modalBody: { color: colors.black, marginBottom: 12 },

  historyTitle: {
    fontFamily: "bold",
    color: colors.black,
    marginTop: 8,
    marginBottom: 8,
  },
  historyList: { gap: 10 },
  historyRow: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  historyBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray[600],
    marginTop: 6,
  },
  historyCity: { color: colors.black, fontFamily: "bold" },
  historyTime: { color: colors.gray[600], marginTop: 2 },

  modalClose: {
    alignSelf: "flex-end",
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
});
