import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { mockLogin } from "../services/mockAuth";
import Button from "../components/Button";

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async () => {
    try {
        setLoading(true);
        const { token, role } = await mockLogin(username, password);
        dispatch(loginSuccess({ token, role }));
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
