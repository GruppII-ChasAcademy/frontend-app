import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import * as api from "../../../api/packages";
import { setAll, upsertOne, removeOne } from "../../../store/packagesSlice";
import type {
  Package,
  DeliveryStatus,
  SensorValue,
} from "../../../types/types";

const KEY = ["packages"] as const;
type CreatePayload = Omit<Package, "id" | "stats"> & { stats?: SensorValue[] };
type SensorValueInput = Omit<SensorValue, "id"> & { id?: number };

const usePackagesApiCtx = () => {
  const qc = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const listQuery = useQuery<Package[], Error>({
    queryKey: KEY,
    queryFn: api.listPackages,
  });

  useEffect(() => {
    if (listQuery.isSuccess && listQuery.data) {
      dispatch(setAll(listQuery.data));
    }
  }, [listQuery.isSuccess, listQuery.data, dispatch]);

  const createPackageMutation = useMutation<Package, Error, CreatePayload>({
    mutationFn: api.createPackage,
    onSuccess: (pkg) => {
      dispatch(upsertOne(pkg));
      qc.setQueryData<Package[]>(KEY, (curr) =>
        curr ? [pkg, ...curr] : [pkg]
      );
    },
  });

  const updateStatusMutation = useMutation<
    Package,
    Error,
    { id: number; status: DeliveryStatus }
  >({
    mutationFn: ({ id, status }) => api.updatePackageStatus(id, status),
    onSuccess: (pkg) => {
      dispatch(upsertOne(pkg));
      qc.setQueryData<Package[]>(KEY, (curr) =>
        curr ? curr.map((p) => (p.id === pkg.id ? pkg : p)) : [pkg]
      );
    },
  });

  const addSensorValueMutation = useMutation<
    Package,
    Error,
    { pkgId: number; value: SensorValueInput }
  >({
    mutationFn: ({ pkgId, value }) => api.addSensorValue(pkgId, value),
    onSuccess: (pkg) => {
      dispatch(upsertOne(pkg));
      qc.setQueryData<Package[]>(KEY, (curr) =>
        curr ? curr.map((p) => (p.id === pkg.id ? pkg : p)) : [pkg]
      );
    },
  });

  const deletePackageMutation = useMutation<void, Error, { id: number }>({
    mutationFn: ({ id }) => api.deletePackage(id),
    onSuccess: (_, { id }) => {
      dispatch(removeOne(id));
      qc.setQueryData<Package[]>(
        KEY,
        (curr) => curr?.filter((p) => p.id !== id) ?? curr
      );
    },
  });

  return {
    listQuery,
    createPackageMutation,
    updateStatusMutation,
    addSensorValueMutation,
    deletePackageMutation,
  };
};

export default usePackagesApiCtx;
