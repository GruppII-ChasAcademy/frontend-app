import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleSheet as RNStyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
  type BarcodeScanningResult,
} from "expo-camera";
import Button from "../../components/Button";

type Props = {
  onScanned?: (data: string) => void;
  openUrls?: boolean;
  showOverlay?: boolean;
  showTorch?: boolean;
};

export default function QRScanner({
  onScanned,
  openUrls = true,
  showOverlay = true,
  showTorch = true,
}: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [locked, setLocked] = useState(false); // lock after first hit
  const [torch, setTorch] = useState(false);

  if (!permission) return <View style={styles.fill} />;

  if (!permission.granted) {
    return (
      <View style={[styles.fill, styles.center, styles.pad]}>
        <Text style={styles.title}>Camera permission required</Text>
        <Text style={styles.subtitle}>
          Allow camera access to scan QR codes.
        </Text>
        <Button variant="primary" onPress={requestPermission}>
          Allow camera
        </Button>
        {Platform.OS === "ios" && <View style={{ height: 8 }} />}
      </View>
    );
  }

  const handleScan = (result: BarcodeScanningResult) => {
    if (locked) return;
    setLocked(true);

    const value = (result?.data as any)?.rawValue ?? result?.data ?? "";
    const data = String(value);

    // pass to parent
    onScanned?.(data);

    // optionally open URLs
    if (openUrls && /^https?:\/\//i.test(data)) {
      Linking.openURL(data).catch(() => {});
    }
  };

  return (
    <View style={styles.root}>
      <CameraView
        style={RNStyleSheet.absoluteFillObject}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleScan}
        enableTorch={torch}
      />

      {showOverlay && (
        <View pointerEvents="none" style={styles.overlay}>
          <View style={styles.frame} />
          <Text style={styles.overlayText}>Aim at a QR code</Text>
        </View>
      )}

      {showTorch && (
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => setTorch((t) => !t)}
          style={styles.torch}
        >
          <Text style={styles.torchText}>{torch ? "🔦 On" : "🔦 Off"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  root: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  center: { alignItems: "center", justifyContent: "center", gap: 12 },
  pad: { padding: 16 },
  title: { fontSize: 18, fontWeight: "600" },
  subtitle: { color: "#555", textAlign: "center", marginBottom: 8 },

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
});
