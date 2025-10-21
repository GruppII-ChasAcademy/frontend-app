import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuthCtx from '../hooks/context/api/useAuthCtx';
import LoginScreen from "../screens/LoginScreen";
import TabNavigator from "./tab/TabNavigator";
import Header from "../components/Header/Header";
import { colors } from "../config/styles";

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isAuthenticated } = useAuthCtx();

  return (
    <View style={styles.container}>
      <Header />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <RootStack.Screen name="Login" component={LoginScreen} />
        ) : (
          <RootStack.Screen name="MainTabs" component={TabNavigator} />
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
