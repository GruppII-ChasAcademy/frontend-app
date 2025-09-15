import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./tab/TabNavigator";

const RootStack = createNativeStackNavigator();

function RootNavigator() {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="MainTabs" component={TabNavigator} />
        </RootStack.Navigator>
    );
}

export default RootNavigator;