// app/screens/TrackScreen.tsx
import React, { useMemo } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import useApiCtx from "../hooks/context/api/useApiCtx";
import { colors, fontSizes } from "../config/styles";
import type { Package, User } from "../types/types";
import Dialog from "../components/Dialog";
import Button from "../components/Button";

import {
  formatDateTime,
  findNearestCityName,
  buildCityHistory,
  packageBelongsToUser,
  getLastByDate,
} from "../utils/utils";

const CURRENT_USER_ID = 5;

export default function TrackScreen() {
  const { packages: packagesContext, users: usersContext } = useApiCtx();

  const packagesData =
    (packagesContext.packagesQuery?.data as Package[] | undefined) ?? [];
  const usersData = (usersContext.usersQuery?.data as User[] | undefined) ?? [];

  const currentUser = usersData.find((u) => u.id === CURRENT_USER_ID) as
    | (User & { id: number })
    | undefined;

  const userPackages = useMemo(() => {
    if (!currentUser) return [];
    return packagesData.filter((pkg) => packageBelongsToUser(pkg, currentUser));
  }, [packagesData, currentUser]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Package Status</Text>

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
                    <Text style={styles.packageId}>Package ID: {item.id}</Text>
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
