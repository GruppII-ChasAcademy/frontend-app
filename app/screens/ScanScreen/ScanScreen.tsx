import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../../components/Button";
import QRScanner from "./QRScanner";

const ScanScreen = () => {
  const [last, setLast] = useState<string | null>(null);
  const [scannerKey, setScannerKey] = useState(0);

  const handleResult = (data: string) => {
    setLast(data);
  };

  const scanAgain = () => {
    setLast(null);
    setScannerKey((k) => k + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Screen</Text>

      <View style={styles.scannerBox}>
        <QRScanner
          key={scannerKey}
          onScanned={handleResult}
          openUrls={true}
          showOverlay
          showTorch
        />
      </View>

      {last && (
        <View style={styles.result}>
          <Text style={styles.resultLabel}>Last scanned:</Text>
          <Text selectable style={styles.resultText}>
            {last}
          </Text>
        </View>
      )}

      {last ? (
        <Button variant="primary" onPress={scanAgain}>
          Scan again
        </Button>
      ) : (
        <Button variant="outline" onPress={() => setLast(null)}>
          Clear result
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f2f2f2", gap: 16 },
  title: { fontSize: 24, fontWeight: "600", textAlign: "center" },
  scannerBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
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
