import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { Package } from "../types/types";
import type { RootState } from "./store";

export const packagesAdapter = createEntityAdapter<Package>();

const slice = createSlice({
  name: "packages",
  initialState: packagesAdapter.getInitialState(),
  reducers: {
    setAll: packagesAdapter.setAll,
    upsertMany: packagesAdapter.upsertMany,
    upsertOne: packagesAdapter.upsertOne,
    removeOne: packagesAdapter.removeOne,
    removeAll: packagesAdapter.removeAll,
  },
});

export const { setAll, upsertMany, upsertOne, removeOne, removeAll } =
  slice.actions;
export default slice.reducer;

export const packagesSelectors = packagesAdapter.getSelectors<RootState>(
  (s) => s.packages
);
