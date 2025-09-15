
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../types/types'
import { api } from './helper/axiosInstance'
import type { AxiosError } from 'axios'

type UserState = {
    entity: User | null
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error?: string
}

const initialState: UserState = {
    entity: null,
    status: 'idle',
}

export const fetchUser = createAsyncThunk<
    User,
    string,
    { rejectValue: string }
>('user/fetchUser', async (userId, { rejectWithValue, signal }) => {
    try {
        const { data } = await api.get<User>(`/users/${userId}`, { signal })
        return data
    } catch (error) {
        const err = error as AxiosError<{ message?: string; error?: string } | string>
        const serverMsg =
            typeof err.response?.data === 'string'
                ? err.response.data
                : err.response?.data?.message ?? err.response?.data?.error
        return rejectWithValue(serverMsg ?? err.message ?? 'Okänt fel')
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.entity = action.payload
            state.status = 'succeeded'
            state.error = undefined
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading'
                state.error = undefined
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.entity = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload ?? action.error.message ?? 'Något gick fel'
            })
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer


