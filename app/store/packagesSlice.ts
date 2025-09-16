import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Package } from "../types/types";

export const packagesAdapter = createEntityAdapter<Package>({
  sortComparer: (a, b) => (a.title ?? "").localeCompare(b.title ?? ""),
});

const slice = createSlice({
  name: "packages",
  initialState: packagesAdapter.getInitialState(),
  reducers: {
    setAllPackages: packagesAdapter.setAll,
    addOnePackage: packagesAdapter.addOne,
    updateOnePackage: packagesAdapter.updateOne,
    removeOnePackage: packagesAdapter.removeOne,
    removeAllPackages: packagesAdapter.removeAll,
  },
});

export const {
  setAllPackages,
  addOnePackage,
  updateOnePackage,
  removeOnePackage,
  removeAllPackages,
} = slice.actions;

export default slice.reducer;

export const packagesSelectors = packagesAdapter.getSelectors<RootState>(
  (s) => s.packages
);
