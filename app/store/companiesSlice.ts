import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Company } from "../types/types";
export const companiesAdapter = createEntityAdapter<Company>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const slice = createSlice({
  name: "companies",
  initialState: companiesAdapter.getInitialState(),
  reducers: {
    setAll: companiesAdapter.setAll,
    addOne: companiesAdapter.addOne,
    updateOne: companiesAdapter.updateOne,
    upsertOne: companiesAdapter.upsertOne,
    removeOne: companiesAdapter.removeOne,
    removeAll: companiesAdapter.removeAll,
  },
});

export const { setAll, addOne, updateOne, upsertOne, removeOne, removeAll } =
  slice.actions;

export default slice.reducer;

export const companiesSelectors = companiesAdapter.getSelectors<RootState>(
  (s) => s.companies
);
