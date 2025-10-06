import { Text, View, StyleSheet, Pressable } from "react-native";
import { users, packages } from "../config/data";
import { fontSizes, colors } from "../config/styles";
import Dialog from "../components/Dialog";
import Button from "../components/Button";

const CURRENT_USER_ID = 5;

const isToday = (iso?: string) => {
  if (!iso) return false;
  const a = new Date(iso).toLocaleDateString("sv-SE");
  const b = new Date().toLocaleDateString("sv-SE");
  return a === b;
};

const isTempOutOfRange = (alertType: string, temp: number) => {
  if (alertType === "Fridge") return temp > 8;
  if (alertType === "Freezer") return temp > -15;
  if (alertType === "Groceries") return temp > 25;
  return false;
};

export default function HomeScreen() {
  const me = users.find((u) => u.id === CURRENT_USER_ID)!;

  const myPackages = packages.filter((p) => {
    switch (me.role) {
      case "Customer":
        return p.CustomerId?.id === me.id;
      case "Sender":
        return p.senderId?.id === me.id;
      case "Carrier":
        return p.carrierId?.id === me.id;
      case "Admin":
        return true;
      default:
        return false;
    }
  });

  const inTransit = myPackages.filter((p) =>
    ["preparing", "Shipped"].includes(p.status)
  ).length;
  const deliveredToday = myPackages.filter(
    (p) => p.status === "Delivered" && isToday(p.daterecieved)
  ).length;
  const totalShipments = myPackages.length;

  const alertPkg = myPackages.find((p) => {
    const last = p.stats[p.stats.length - 1];
    return last && isTempOutOfRange(last.Alert, last.temperature);
  });

  return (
    <View style={styles.screen}>
      {alertPkg ? (
        <Dialog
          closeOnBackdropPress
          enableCloseGesture
          trigger={({ open }) => (
            <Button
              onPress={open}
              variant="card"
              style={styles.warningCard}
              enablePressedStyles
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.warningLabel}>Warning</Text>
                <Text style={styles.warningTitle}>Temperature Excursion</Text>
                <Text style={styles.warningSub}>Package ID: {alertPkg.id}</Text>
                <View style={styles.warningButton}>
                  <Text style={styles.warningButtonText}>View Details</Text>
                </View>
              </View>
            </Button>
          )}
        >
          {({ close }) => (
            <View>
              <Text style={styles.modalTitle}>Temperature Excursion</Text>
              <Text style={styles.modalSub}>Package ID: {alertPkg.id}</Text>
              <Text style={styles.modalBody}>
                Senaste mätning indikerar temperatur utanför rekommenderat
                intervall.
              </Text>

              <Button
                onPress={close}
                variant="primary"
                style={styles.modalClose}
                enablePressedStyles
              >
                Stäng
              </Button>
            </View>
          )}
        </Dialog>
      ) : (
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Warnings</Text>
          <Text style={styles.infoTitle}>Inga temperaturavvikelser</Text>
          <Text style={styles.infoSub}>
            Alla paket ligger inom rekommenderad temperatur.
          </Text>
        </View>
      )}
      <Text style={styles.sectionHeader}>Dashboard</Text>

      <View style={styles.grid}>
        <View style={[styles.card, styles.cardHalf]}>
          <Text style={styles.cardLabel}>Packages in Transit</Text>
          <Text style={styles.cardValue}>{inTransit}</Text>
        </View>

        <View style={[styles.card, styles.cardHalf]}>
          <Text style={styles.cardLabel}>Delivered Today</Text>
          <Text style={styles.cardValue}>{deliveredToday}</Text>
        </View>

        <View style={[styles.card, styles.cardFull]}>
          <Text style={styles.cardLabel}>Total Shipments</Text>
          <Text style={styles.cardValue}>{totalShipments}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: colors.white,
  },
  warningCard: {
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray[200],
    marginBottom: 16,
  },
  warningLabel: { color: colors.warning, fontWeight: "600", marginBottom: 4 },
  warningTitle: {
    color: colors.black,
    fontSize: fontSizes.lg,
    fontFamily: "bold",
  },
  warningSub: { color: colors.gray[600], marginTop: 2, marginBottom: 10 },
  warningButton: {
    alignSelf: "flex-start",
    backgroundColor: colors.danger,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  warningButtonText: { color: colors.white, fontWeight: "600" },

  infoCard: {
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
    marginBottom: 16,
  },
  infoLabel: { color: colors.success, fontWeight: "600", marginBottom: 4 },
  infoTitle: {
    color: colors.black,
    fontSize: fontSizes.lg,
    fontFamily: "bold",
  },
  infoSub: { color: colors.gray[600], marginTop: 2 },

  sectionHeader: {
    color: colors.black,
    fontSize: fontSizes.lg,
    fontFamily: "bold",
    marginBottom: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
    padding: 14,
  },
  cardHalf: { width: "48%" },
  cardFull: { width: "100%" },
  cardLabel: { color: colors.gray[600], marginBottom: 8 },
  cardValue: { color: colors.black, fontSize: 28, fontWeight: "700" },

  modalTitle: {
    fontSize: fontSizes.lg,
    fontFamily: "bold",
    color: colors.black,
    marginBottom: 6,
  },
  modalSub: { color: colors.gray[600], marginBottom: 12 },
  modalBody: { color: colors.black, marginBottom: 16 },
  modalClose: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  modalCloseText: { color: colors.white, fontWeight: "600" },
});
