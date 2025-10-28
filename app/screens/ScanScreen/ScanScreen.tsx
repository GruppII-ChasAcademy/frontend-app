import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Button from "../../components/Button";
import QRScanner from "./QRScanner";
import usePackagesApiCtx from '../../hooks/context/api/usePackagesApiCtx';

const ScanScreen = () => {
  const [last, setLast] = useState<string | null>(null);
  const [scannerKey, setScannerKey] = useState(0);
  const { addPackageFromScan } = usePackagesApiCtx();

  const scanAgain = () => {
    setLast(null);
    setScannerKey((k) => k + 1);
  };

  const handleResult = async (data: string) => {
    setLast(data);
    try {
      await addPackageFromScan(data);
      console.log("New package created from scan:", data);
    } catch (error) {
      console.error("Failed to add package:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f2f2f2", gap: 16, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: "600", textAlign: "center" },
  scannerBox: {
    height: 300, 
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
