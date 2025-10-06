import "react-native-reanimated";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppProvider from "./app/components/Providers/Provider";
import AppNavigator from "./app/navigation/AppNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./app/store/store";
import { Provider } from "react-redux";
import { colors } from "./app/config/styles";
const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
            <QueryClientProvider client={queryClient}>
              <AppProvider>
                <AppNavigator />
              </AppProvider>
            </QueryClientProvider>
          </SafeAreaView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
