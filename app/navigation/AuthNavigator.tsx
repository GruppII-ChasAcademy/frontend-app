
    
    //! Denna ska importeras i RootNavigator och användas för att visa AuthNavigator om användaren inte är inloggad. Väntar tills backend är på plats.

    
    
    import { createNativeStackNavigator } from "@react-navigation/native-stack";
    import LoginScreen from "../screens/LoginScreen";

    export type AuthStackParamList = {
    Login: undefined;
    };

    const AuthStack = createNativeStackNavigator<AuthStackParamList>();

    export default function AuthNavigator() {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        </AuthStack.Navigator>
    );
    }

