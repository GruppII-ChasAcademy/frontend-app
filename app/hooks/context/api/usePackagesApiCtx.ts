import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import * as api from "../../../api/packages";
import {
  setAllPackages,
  addOnePackage,
  updateOnePackage,
  removeOnePackage,
} from "../../../store/packagesSlice";
import type {
  Package,
  SensorValue,
  DeliveryStatus,
} from "../../../types/types";

const KEY = ["packages"] as const;

type CreatePayload = Omit<Package, "id" | "stats"> & { stats?: SensorValue[] };
type UpdateStatusPayload = { id: number; status: DeliveryStatus };
type AddSensorPayload = { pkgId: number; value: Omit<SensorValue, "id"> };

const usePackagesApiCtx = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const packagesQuery = useQuery<Package[], Error>({
    queryKey: KEY,
    queryFn: api.listPackages,
  });

  useEffect(() => {
    if (packagesQuery.isSuccess && packagesQuery.data) {
      dispatch(setAllPackages(packagesQuery.data));
    }
  }, [packagesQuery.isSuccess, packagesQuery.data, dispatch]);

  const createPackageMutation = useMutation<Package, Error, CreatePayload>({
    mutationFn: api.createPackage,
    onSuccess: (pkg) => {
      dispatch(addOnePackage(pkg));
      queryClient.setQueryData<Package[]>(KEY, (prev) =>
        prev ? [pkg, ...prev] : [pkg]
      );
    },
  });

  const updateStatusMutation = useMutation<Package, Error, UpdateStatusPayload>(
    {
      mutationFn: ({ id, status }) => api.updatePackageStatus(id, status),
      onSuccess: (pkg) => {
        dispatch(updateOnePackage({ id: pkg.id, changes: pkg }));
        queryClient.setQueryData<Package[]>(KEY, (prev) =>
          prev ? prev.map((p) => (p.id === pkg.id ? pkg : p)) : [pkg]
        );
      },
    }
  );

  const addSensorValueMutation = useMutation<Package, Error, AddSensorPayload>({
    mutationFn: ({ pkgId, value }) => api.addSensorValue(pkgId, value),
    onSuccess: (pkg) => {
      dispatch(updateOnePackage({ id: pkg.id, changes: pkg }));
      queryClient.setQueryData<Package[]>(KEY, (prev) =>
        prev ? prev.map((p) => (p.id === pkg.id ? pkg : p)) : [pkg]
      );
    },
  });

  const deletePackageMutation = useMutation<void, Error, { id: number }>({
    mutationFn: ({ id }) => api.deletePackage(id),
    onSuccess: (_, { id }) => {
      dispatch(removeOnePackage(id));
      queryClient.setQueryData<Package[]>(
        KEY,
        (prev) => prev?.filter((p) => p.id !== id) ?? prev
      );
    },
  });

  return {
    packagesQuery,
    createPackageMutation,
    updateStatusMutation,
    addSensorValueMutation,
    deletePackageMutation,
  };
};

export default usePackagesApiCtx;
