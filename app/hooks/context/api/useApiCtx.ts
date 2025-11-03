// useApiCtx.ts
import { useMemo } from "react";
import useCompaniesApiCtx from "./useCompaniesApiCtx";
import usePackagesApiCtx from "./usePackagesApiCtx";
import useUsersApiCtx from "./useUsersApiCtx";
import useAuthCtx from "./useAuthCtx";

const useApiCtx = () => {
  const auth = useAuthCtx();
  const packages = usePackagesApiCtx();
  const users = useUsersApiCtx();
  const companies = useCompaniesApiCtx();

  const currentUser = useMemo(() => {
    const id = auth.user?.id;
    const list = users.usersQuery?.data;
    if (id == null || !list) return null;
    return list.find((u) => u.id === id) ?? null;
  }, [auth.user?.id, users.usersQuery?.data]);

  const isLoading =
    packages.packagesQuery?.isFetching ||
    packages.createPackageMutation?.isPending ||
    packages.updateStatusMutation?.isPending ||
    packages.addSensorValueMutation?.isPending ||
    packages.deletePackageMutation?.isPending ||
    users.usersQuery?.isFetching ||
    users.createUserMutation?.isPending ||
    users.updateUserMutation?.isPending ||
    users.deleteUserMutation?.isPending ||
    companies.companiesQuery?.isFetching ||
    companies.createCompanyMutation?.isPending ||
    companies.updateCompanyMutation?.isPending ||
    companies.deleteCompanyMutation?.isPending;

  const error =
    users.usersQuery?.error ??
    packages.packagesQuery?.error ??
    companies.companiesQuery?.error ??
    null;

  return {
    isLoading,
    error,
    auth,
    currentUser,
    packages,
    users,
    companies,
  };
};

export type ApiCtxType = ReturnType<typeof useApiCtx>;
export default useApiCtx;
