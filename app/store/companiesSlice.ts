import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Company } from "../types/types";

export const companiesAdapter = createEntityAdapter<Company>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const slice = createSlice({
  name: "companies",
  initialState: companiesAdapter.getInitialState(),
  reducers: {
    setAllCompanies: companiesAdapter.setAll,
    addOneCompany: companiesAdapter.addOne,
    updateOneCompany: companiesAdapter.updateOne,
    removeOneCompany: companiesAdapter.removeOne,
  },
});

export const {
  setAllCompanies,
  addOneCompany,
  updateOneCompany,
  removeOneCompany,
} = slice.actions;

export default slice.reducer;

export const companiesSelectors = companiesAdapter.getSelectors<RootState>(
  (s) => s.companies
);
