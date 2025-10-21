import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Linking,
  Platform,
  TouchableOpacity,
} from "react-native";
import Button from "../../components/Button";
import {
  CameraView,
  useCameraPermissions,
  type BarcodeScanningResult,
} from "expo-camera";

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [locked, setLocked] = useState(false);
  const [last, setLast] = useState<string | null>(null);
  const [torch, setTorch] = useState(false);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.title}>Kamerabehörighet behövs</Text>
        <Text style={styles.paragraph}>
          Du behöver ge appen tillgång till kameran för att skanna QR-koder.
        </Text>
        <Button variant="outline" onPress={requestPermission}>
          Ge behörighet
        </Button>
      </View>
    );
  }

  const onBarcodeScanned = (result: BarcodeScanningResult) => {
    if (locked) return;
    setLocked(true);

    // SDK 50+: .data är sträng. Vissa versioner har .rawValue.
    const value = (result?.data as any)?.rawValue ?? result?.data ?? "";
    const data = String(value);
    setLast(data);

    if (/^https?:\/\//i.test(data)) {
      Linking.openURL(data).catch(() => {});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.scannerBox}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={onBarcodeScanned}
          enableTorch={torch}
        />
        {/* Enkel overlay/sikte */}
        <View pointerEvents="none" style={styles.overlay}>
          <View style={styles.frame} />
          <Text style={styles.overlayText}>Rikta mot en QR-kod</Text>
        </View>

        {/* Torch-knapp uppe till höger */}
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => setTorch((t) => !t)}
          style={styles.torch}
        >
          <Text style={styles.torchText}>{torch ? "🔦 På" : "🔦 Av"}</Text>
        </TouchableOpacity>
      </View>

      {last && (
        <View style={styles.result}>
          <Text style={styles.label}>Senast skannad:</Text>
          <Text selectable>{last}</Text>
        </View>
      )}

      {locked && (
        <Button variant="primary" onPress={() => setLocked(false)}>
          Skanna igen
        </Button>
      )}

      {/* Extra: i Expo Go behövs inga permission-strängar i app.json */}
      {Platform.OS === "ios" && <View style={{ height: 8 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16, backgroundColor: "#fff" },
  center: { alignItems: "center", justifyContent: "center", gap: 12 },
  title: { fontSize: 18, fontWeight: "600" },
  paragraph: { color: "#4b5563", textAlign: "center", marginBottom: 8 },

  scannerBox: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 16,
    position: "relative",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  frame: {
    width: 240,
    height: 240,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.9)",
  },
  overlayText: {
    marginTop: 12,
    color: "#fff",
    fontWeight: "600",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowRadius: 6,
  },

  torch: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 999,
  },
  torchText: { color: "#fff", fontWeight: "600" },

  result: { padding: 12, borderRadius: 12, backgroundColor: "#f3f4f6" },
  label: { fontWeight: "600", marginBottom: 4 },
});
