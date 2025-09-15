// app/components/layout/AppLayout.tsx
import * as React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
    children: React.ReactNode;
    // Har du en tab bar räcker oftast top/left/right
    edges?: ('top' | 'bottom' | 'left' | 'right')[];
    barStyle?: 'light-content' | 'dark-content';
    backgroundColor?: string; // Android statusbar-bakgrund
};

export default function AppLayout({
    children,
    edges = ['top', 'left', 'right'],
    barStyle = 'dark-content',
    backgroundColor = '#fff',
}: Props) {
    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, backgroundColor }} edges={edges}>
            <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
            {children}
        </SafeAreaView>
    );
}
