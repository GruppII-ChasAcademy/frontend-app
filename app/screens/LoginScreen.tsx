    import React from "react";
    import { View, Text, Button } from "react-native";
    import { useDispatch } from "react-redux";
    import { loginSuccess } from "../store/authSlice";

    export default function LoginScreen() {
    const dispatch = useDispatch();

    const handleLogin = () => {
        const token = "fake-token"; //! DEV
        dispatch(loginSuccess(token));
    };

    return (
        <View>
        <Text>Login</Text>
        <Button title="Logga in" onPress={handleLogin} />
        </View>
    );
    }
