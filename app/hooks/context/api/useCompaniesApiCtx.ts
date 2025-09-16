import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import * as api from "../../../api/companies";
import {
  setAllCompanies,
  addOneCompany,
  updateOneCompany,
  removeOneCompany,
} from "../../../store/companiesSlice";
import type { Company } from "../../../types/types";

const KEY = ["companies"] as const;

const useCompaniesApiCtx = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const companiesQuery = useQuery<Company[], Error>({
    queryKey: KEY,
    queryFn: api.listCompanies,
  });

  useEffect(() => {
    if (companiesQuery.isSuccess && companiesQuery.data) {
      dispatch(setAllCompanies(companiesQuery.data));
    }
  }, [companiesQuery.isSuccess, companiesQuery.data, dispatch]);

  const createCompanyMutation = useMutation<
    Company,
    Error,
    api.CreateCompanyPayload
  >({
    mutationFn: api.createCompany,
    onSuccess: (company) => {
      dispatch(addOneCompany(company));
      queryClient.setQueryData<Company[]>(KEY, (prev) =>
        prev ? [company, ...prev] : [company]
      );
    },
  });

  const updateCompanyMutation = useMutation<
    Company,
    Error,
    api.UpdateCompanyPayload
  >({
    mutationFn: api.updateCompany,
    onSuccess: (company) => {
      dispatch(updateOneCompany({ id: company.id, changes: company }));
      queryClient.setQueryData<Company[]>(KEY, (prev) =>
        prev ? prev.map((c) => (c.id === company.id ? company : c)) : [company]
      );
    },
  });

  const deleteCompanyMutation = useMutation<void, Error, { id: number }>({
    mutationFn: ({ id }) => api.deleteCompany(id),
    onSuccess: (_, { id }) => {
      dispatch(removeOneCompany(id));
      queryClient.setQueryData<Company[]>(
        KEY,
        (prev) => prev?.filter((c) => c.id !== id) ?? prev
      );
    },
  });

  return {
    companiesQuery,
    createCompanyMutation,
    updateCompanyMutation,
    deleteCompanyMutation,
  };
};

export default useCompaniesApiCtx;
