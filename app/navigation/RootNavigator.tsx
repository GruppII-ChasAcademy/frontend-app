import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./tab/TabNavigator";
import Header from '../components/Header/Header';

const RootStack = createNativeStackNavigator();

    function RootNavigator() {
    return (
        <View style={styles.container}>
        <Header />
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="MainTabs" component={TabNavigator} />
        </RootStack.Navigator>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    });

export default RootNavigator;
