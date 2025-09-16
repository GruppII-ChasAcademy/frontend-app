import useCompaniesApiCtx from "./useCompaniesApiCtx";
import usePackagesApiCtx from "./usePackagesApiCtx";
import useUsersApiCtx from "./useUsersApiCtx";
import useAuthCtx from "./useAuthCtx";

const useApiCtx = () => {
  const auth = useAuthCtx();
  const packages = usePackagesApiCtx();
  const users = useUsersApiCtx();
  const companies = useCompaniesApiCtx();
  const {
    signInMutation,
    signUpMutation,
    signOutMutation,
    verifyAccountMutation,
  } = auth;
  const {
    listQuery: packagesQuery,
    createPackageMutation,
    updateStatusMutation,
    addSensorValueMutation,
    deletePackageMutation,
  } = packages;
  const {
    listQuery: usersQuery,
    createUserMutation,
    updateUserMutation,
    deleteUserMutation,
  } = users;
  const {
    listQuery: companiesQuery,
    createCompanyMutation,
    updateCompanyMutation,
    deleteCompanyMutation,
  } = companies;
  const isLoading =
    // auth
    signInMutation?.isPending ||
    signUpMutation?.isPending ||
    signOutMutation?.isPending ||
    verifyAccountMutation?.isPending ||
    // packages
    packagesQuery?.isFetching ||
    createPackageMutation?.isPending ||
    updateStatusMutation?.isPending ||
    addSensorValueMutation?.isPending ||
    deletePackageMutation?.isPending ||
    // users
    usersQuery?.isFetching ||
    createUserMutation?.isPending ||
    updateUserMutation?.isPending ||
    deleteUserMutation?.isPending ||
    // companies
    companiesQuery?.isFetching ||
    createCompanyMutation?.isPending ||
    updateCompanyMutation?.isPending ||
    deleteCompanyMutation?.isPending;

  return {
    isLoading,
    ...auth,
    ...packages,
    ...users,
    ...companies,
  };
};
export type ApiCtxType = ReturnType<typeof useApiCtx>;
export default useApiCtx;
