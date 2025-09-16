import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { User } from "../types/types";

// Gör id obligatorisk i entitetslagret
export type UserEntity = Omit<User, "id"> & { id: number };

const usersAdapter = createEntityAdapter<UserEntity>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const slice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {
    setAllUsers: usersAdapter.setAll,
    addOneUser: usersAdapter.addOne,
    updateOneUser: usersAdapter.updateOne,
    removeOneUser: usersAdapter.removeOne,
  },
});

export const { setAllUsers, addOneUser, updateOneUser, removeOneUser } =
  slice.actions;

export default slice.reducer;

export const usersSelectors = usersAdapter.getSelectors<RootState>(
  (s) => s.users
);
