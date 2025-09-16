import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { User } from "../types/types";

export type UserEntity = Omit<User, "id"> & { id: number };

const usersAdapter = createEntityAdapter<UserEntity>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {
    setAll: usersAdapter.setAll,
    upsertMany: usersAdapter.upsertMany,
    upsertOne: usersAdapter.upsertOne,
    removeOne: usersAdapter.removeOne,
    removeAll: usersAdapter.removeAll,
  },
});

export const { setAll, upsertMany, upsertOne, removeOne, removeAll } =
  usersSlice.actions;

export default usersSlice.reducer;

export const usersSelectors = usersAdapter.getSelectors<RootState>(
  (s) => s.users
);
