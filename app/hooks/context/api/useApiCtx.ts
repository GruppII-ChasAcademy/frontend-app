import useCompaniesApiCtx from "./useCompaniesApiCtx";
import usePackagesApiCtx from "./usePackagesApiCtx";
import useUsersApiCtx from "./useUsersApiCtx";
// import useAuthCtx from "./useAuthCtx";

const useApiCtx = () => {
  // const auth = useAuthCtx();
  const packages = usePackagesApiCtx();
  const users = useUsersApiCtx();
  const companies = useCompaniesApiCtx();

  const isLoading =
    // packages
    packages.packagesQuery?.isFetching ||
    packages.createPackageMutation?.isPending ||
    packages.updateStatusMutation?.isPending ||
    packages.addSensorValueMutation?.isPending ||
    packages.deletePackageMutation?.isPending ||
    // users
    users.usersQuery?.isFetching ||
    users.createUserMutation?.isPending ||
    users.updateUserMutation?.isPending ||
    users.deleteUserMutation?.isPending ||
    // companies
    companies.companiesQuery?.isFetching ||
    companies.createCompanyMutation?.isPending ||
    companies.updateCompanyMutation?.isPending ||
    companies.deleteCompanyMutation?.isPending;

  return {
    isLoading,
    packages,
    users,
    companies,
  };
};

export type ApiCtxType = ReturnType<typeof useApiCtx>;
export default useApiCtx;
