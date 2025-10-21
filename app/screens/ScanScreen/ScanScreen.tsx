import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleSheet as RNStyleSheet,
  Linking,
  TouchableOpacity,
  Platform,
} from "react-native";
import Button from "../../components/Button";
import {
  CameraView,
  useCameraPermissions,
  type BarcodeScanningResult,
} from "expo-camera";

const ScanScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [locked, setLocked] = useState(false);
  const [last, setLast] = useState<string | null>(null);
  const [torch, setTorch] = useState(false);

  if (!permission) return <View style={styles.container} />;

  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.title}>Kamera-behörighet krävs</Text>
        <Text style={styles.subtitle}>
          Ge appen tillgång till kameran för att skanna QR-koder.
        </Text>
        <Button variant="primary" onPress={requestPermission}>
          Ge behörighet
        </Button>
      </View>
    );
  }

  const onBarcodeScanned = (result: BarcodeScanningResult) => {
    if (locked) return;
    setLocked(true);

    // SDK 50+: .data är sträng, vissa versioner har .rawValue
    const value = (result?.data as any)?.rawValue ?? result?.data ?? "";
    const data = String(value);
    setLast(data);

    if (/^https?:\/\//i.test(data)) {
      Linking.openURL(data).catch(() => {});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Screen</Text>

      <View style={styles.scannerBox}>
        <CameraView
          style={RNStyleSheet.absoluteFillObject}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={onBarcodeScanned}
          enableTorch={torch}
        />

        {/* Overlay / sikte */}
        <View pointerEvents="none" style={styles.overlay}>
          <View style={styles.frame} />
          <Text style={styles.overlayText}>Target QR code</Text>
        </View>

        {/* Torch-knapp */}
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => setTorch((t) => !t)}
          style={styles.torch}
        >
          <Text style={styles.torchText}>{torch ? "🔦 On" : "🔦 Off"}</Text>
        </TouchableOpacity>
      </View>

      {/* Resultat */}
      {last && (
        <View style={styles.result}>
          <Text style={styles.resultLabel}>Senast skannad:</Text>
          <Text selectable style={styles.resultText}>
            {last}
          </Text>
        </View>
      )}

      {/* Skanna igen / starta om */}
      {locked ? (
        <Button variant="primary" onPress={() => setLocked(false)}>
          Skanna igen
        </Button>
      ) : (
        <Button variant="outline" onPress={() => setLast(null)}>
          Rensa resultat
        </Button>
      )}

      {/* i Expo Go behövs inga permission-strängar i app.json */}
      {Platform.OS === "ios" && <View style={{ height: 8 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
    gap: 16,
  },
  center: { alignItems: "center", justifyContent: "center", gap: 12 },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: { color: "#555", textAlign: "center", marginBottom: 8 },
  scannerBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
    position: "relative",
  },

  // Overlay
  overlay: {
    ...RNStyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  frame: {
    width: 230,
    height: 230,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.95)",
  },
  overlayText: {
    marginTop: 10,
    color: "#fff",
    fontWeight: "600",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowRadius: 6,
  },

  // Torch
  torch: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 999,
  },
  torchText: { color: "#fff", fontWeight: "600" },

  // Resultat
  result: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  resultLabel: { fontWeight: "600", marginBottom: 6 },
  resultText: { color: "#111" },
});

export default ScanScreen;
