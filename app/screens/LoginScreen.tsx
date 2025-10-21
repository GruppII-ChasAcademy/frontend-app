import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { mockLoginData } from "../services/mockAuth";
import Button from "../components/Button";
import useAuthCtx from "../hooks/context/api/useAuthCtx";


    export default function LoginScreen() {
    const [username, setUsername] = useState('sven@volvo.example');
    const [password, setPassword] = useState('secret');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const auth = useAuthCtx(); 

    const handleLogin = async () => {
        try {
        setLoading(true);
        await auth.login(username, password); 
        } catch (err) {
        setError('Login failed');
        } finally {
        setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
        />
        <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button
            variant="primary"
            onPress={handleLogin}
            disabled={loading}
        >
            {loading ? "Logging in..." : "Login"}
        </Button>
        </View>
    );
    }

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { backgroundColor: '#fff', marginBottom: 12, padding: 8, borderRadius: 6 },
    title: { fontSize: 22, textAlign: 'center', marginBottom: 20, fontWeight: 'bold', color: '#fff' },
    error: { color: 'red', textAlign: 'center', marginBottom: 10 },
});
