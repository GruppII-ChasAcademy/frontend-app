import { createSlice, PayloadAction, createAsyncThunk, } from "@reduxjs/toolkit";
import { User } from "../types/types";
import { api } from "./helper/axiosInstance"
import { AxiosError } from "axios";

type UserState = {
    entity: User | null
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error?: string
};

const initialState = {
    entity: null,
    status: 'idle'
};

export const fetchUser = createAsyncThunk<User, string, { rejectValue: string }>(
    "user/fetchUser",
    async (userId, { rejectWithValue, signal }) => {
        try {
            const response = await api.get<User>(`/users/${userId}`, { signal })
            const data = await response.json()
            return data
        } catch (error) {
            const err = error as AxiosError<{ message?: string; error: string } | string>
        }
    }
)
