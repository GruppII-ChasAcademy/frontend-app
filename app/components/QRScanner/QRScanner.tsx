    import React, { useState, useEffect } from 'react';
    import { Text, View, StyleSheet, Button, Alert } from 'react-native';
    import { BarCodeScanner } from 'expo-barcode-scanner';

    const QrScanner: React.FC = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const [qrData, setQrData] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);


    const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
        setScanned(true);
        setQrData(data);
        Alert.alert('QR-kod scannad', data);
    };

    if (hasPermission === null) {
        return <Text>Begär kamerabehörighet...</Text>;
    }

    if (hasPermission === false) {
        return <Text>Ingen kamerabehörighet tillgänglig</Text>;
    }

    return (
        <View style={styles.container}>
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
            <View style={styles.bottomOverlay}>
            <Button title="Scanna igen" onPress={() => setScanned(false)} />
            {qrData && <Text style={styles.dataText}>Data: {qrData}</Text>}
            </View>
        )}
        </View>
    );
    };

    export default QrScanner;

    const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomOverlay: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 20,
        borderRadius: 10,
    },
    dataText: {
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
    },
    });
