    import { createSlice, PayloadAction } from '@reduxjs/toolkit';

    interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    }

    const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
    loading: false,
    };

    const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
        state.loading = true;
        },
        loginSuccess(state, action: PayloadAction<string>) {
        state.token = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        },
        loginFailure(state) {
        state.loading = false;
        state.token = null;
        state.isAuthenticated = false;
        },
        logout(state) {
        state.token = null;
        state.isAuthenticated = false;
        },
    },
    });

    export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
    export default authSlice.reducer;
