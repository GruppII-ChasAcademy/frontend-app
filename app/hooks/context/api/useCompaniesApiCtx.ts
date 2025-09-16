import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import * as api from "../../../api/companies";
import {
  setAll,
  removeOne,
  updateOne,
  addOne,
} from "../../../store/companiesSlice";
import type { Company } from "../../../types/types";

const KEY = ["companies"] as const;

const useCompaniesApiCtx = () => {
  const qc = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const listQuery = useQuery<Company[], Error>({
    queryKey: KEY,
    queryFn: api.listCompanies,
  });

  useEffect(() => {
    if (listQuery.isSuccess && listQuery.data) {
      dispatch(setAll(listQuery.data));
    }
  }, [listQuery.isSuccess, listQuery.data, dispatch]);

  const createCompanyMutation = useMutation<
    Company,
    Error,
    api.CreateCompanyPayload
  >({
    mutationFn: api.createCompany,
    onSuccess: (c) => {
      dispatch(addOne(c)); // create => addOne
      qc.setQueryData<Company[]>(KEY, (curr) => (curr ? [c, ...curr] : [c]));
    },
  });

  // UPDATE
  const updateCompanyMutation = useMutation<
    Company,
    Error,
    api.UpdateCompanyPayload
  >({
    mutationFn: api.updateCompany,
    onSuccess: (c) => {
      dispatch(updateOne({ id: c.id, changes: c })); // update => updateOne/ upsertOne({id,changes})
      qc.setQueryData<Company[]>(KEY, (curr) =>
        curr ? curr.map((x) => (x.id === c.id ? c : x)) : [c]
      );
    },
  });

  const deleteCompanyMutation = useMutation<void, Error, { id: number }>({
    mutationFn: ({ id }) => api.deleteCompany(id),
    onSuccess: (_, { id }) => {
      dispatch(removeOne(id));
      qc.setQueryData<Company[]>(
        KEY,
        (curr) => curr?.filter((x) => x.id !== id) ?? curr
      );
    },
  });

  return {
    listQuery,
    createCompanyMutation,
    updateCompanyMutation,
    deleteCompanyMutation,
  };
};

export default useCompaniesApiCtx;
