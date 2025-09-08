import 'react-native-gesture-handler';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import ScanScreen from '../../screens/ScanScreen';
import TrackScreen from '../../screens/TrackScreen';
import AppLayout from '../../components/layouts/AppLayouts';

export type TabParamList = {
    Home: undefined;
    Track: undefined;
    Scan: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<keyof TabParamList, keyof typeof MaterialCommunityIcons.glyphMap> = {
    Home: 'home',
    Track: 'chart-line',
    Scan: 'qrcode-scan',
    Profile: 'account',
};

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name={ICONS[route.name]} size={size} color={color} />
                ),
            })}
        >
            <Tab.Screen
                name="Home"
                children={() => (
                    <AppLayout>
                        <HomeScreen />
                    </AppLayout>
                )}
            />
            <Tab.Screen
                name="Track"
                children={() => (
                    <AppLayout>
                        <TrackScreen />
                    </AppLayout>
                )}
            />
            <Tab.Screen
                name="Scan"
                children={() => (
                    <AppLayout>
                        <ScanScreen />
                    </AppLayout>
                )}
            />
            <Tab.Screen
                name="Profile"
                children={() => (
                    <AppLayout>
                        <ProfileScreen />
                    </AppLayout>
                )}
            />
        </Tab.Navigator>
    );
}
