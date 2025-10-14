import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button"; // Din globala Button

const ScanScreen = () => {
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    setScanned(true);
    alert("QR-kod skannad! (mock)");
  };

  const handleReset = () => {
    setScanned(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Screen</Text>

      <View style={styles.scannerBox}>
        <Text style={styles.scannerText}>
          {scanned ? "QR-code scanned" : "Camera"}
        </Text>
      </View>

      {!scanned ? (
        <Button variant="primary" onPress={handleScan}>
          Scan
        </Button>
      ) : (
        <Button variant="primary" onPress={handleReset}>
          Scan again
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  scannerBox: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#eee",
  },
  scannerText: {
    textAlign: "center",
    color: "#555",
  },
});

export default ScanScreen;
