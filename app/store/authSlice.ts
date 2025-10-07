import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Role = 'admin' | 'sender' | 'carrier' | 'customer';

interface AuthState {
    token: string | null;
    role: Role | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: null,
    role: null,
    isAuthenticated: false,
    };

    const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ token: string; role: Role }>) => {
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.isAuthenticated = true;
        },
        logout: (state) => {
        state.token = null;
        state.role = null;
        state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
