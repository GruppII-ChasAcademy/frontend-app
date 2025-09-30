import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>POSTEXPERTEN</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: "#1e3a5f",
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 5, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Header;