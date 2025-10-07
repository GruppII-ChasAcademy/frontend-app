import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import LoginScreen from "../screens/LoginScreen";
import TabNavigator from "./tab/TabNavigator";
import Header from "../components/Header/Header";
import { colors } from "../config/styles";

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);

  return (
    <View style={styles.container}>
      <Header />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <RootStack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            {role === 'admin' && (
              <RootStack.Screen name="AdminTabs" component={TabNavigator} />
            )}
            {role === 'sender' && (
              <RootStack.Screen name="SenderTabs" component={TabNavigator} />
            )}
            {role === 'carrier' && (
              <RootStack.Screen name="CarrierTabs" component={TabNavigator} />
            )}
            {role === 'customer' && (
              <RootStack.Screen name="CustomerTabs" component={TabNavigator} />
            )}
          </>
        )}
      </RootStack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
