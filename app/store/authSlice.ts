    import { createSlice, PayloadAction } from "@reduxjs/toolkit";
    import type { User, Role, AuthState } from "../types/types";

    const initialState: AuthState & { user: User | null; isAuthenticated: boolean } = {
    token: null,
    userId: null,
    role: null,
    user: null,
    isAuthenticated: false,
    };

    const validRoles: Role[] = ["Admin", "Sender", "Carrier", "Customer"];

    const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: User; token: string }>) => {
        const { user, token } = action.payload;

        if (!validRoles.includes(user.role)) {
            throw new Error(`Ogiltig roll: ${user.role}`);
        }

        state.user = user;
        state.userId = user.id ?? null;
        state.role = user.role;
        state.token = token;
        state.isAuthenticated = true;
        },
        logout: (state) => {
        state.user = null;
        state.userId = null;
        state.role = null;
        state.token = null;
        state.isAuthenticated = false;
        },
    },
    });

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

