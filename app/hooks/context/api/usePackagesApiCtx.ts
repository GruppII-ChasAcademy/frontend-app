import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
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
import { db, addPackageFromScan as addPackageToDb } from '../../../config/data';

const KEY = ["packages"] as const;

type CreatePayload = Omit<Package, "id" | "stats"> & { stats?: SensorValue[] };
type UpdateStatusPayload = { id: number; status: DeliveryStatus };
type AddSensorPayload = { pkgId: number; value: Omit<SensorValue, "id"> };

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const mockApi = {
  async listPackages() {
    await delay(200);
    return [...db.packages];
  },

  async createPackage(payload: CreatePayload) {
    await delay(300);
    const newPkg: Package = {
      ...payload,
      id: db.packages.length + 1,
      stats: payload.stats || [],
    };
    db.packages.unshift(newPkg);
    return newPkg;
  },

  async updatePackageStatus(id: number, status: DeliveryStatus) {
    await delay(200);
    const pkg = db.packages.find((p) => p.id === id);
    if (!pkg) throw new Error("Package not found");
    pkg.status = status;
    return pkg;
  },

  async addSensorValue(pkgId: number, value: Omit<SensorValue, "id">) {
    await delay(150);
    const pkg = db.packages.find((p) => p.id === pkgId);
    if (!pkg) throw new Error("Package not found");
    const newSensor: SensorValue = {
      ...value,
      id: pkg.stats.length + 1,
    };
    pkg.stats.push(newSensor);
    return pkg;
  },

  async deletePackage(id: number) {
    await delay(150);
    const index = db.packages.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Package not found");
    db.packages.splice(index, 1);
  },
};

const usePackagesApiCtx = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();


  const packagesQuery = useQuery<Package[], Error>({
    queryKey: KEY,
    queryFn: mockApi.listPackages,
  });

  useEffect(() => {
    if (packagesQuery.isSuccess && packagesQuery.data) {
      dispatch(setAllPackages(packagesQuery.data));
    }
  }, [packagesQuery.isSuccess, packagesQuery.data, dispatch]);


  const createPackageMutation = useMutation<Package, Error, CreatePayload>({
    mutationFn: mockApi.createPackage,
    onSuccess: (pkg) => {
      dispatch(addOnePackage(pkg));
      queryClient.setQueryData<Package[]>(KEY, (prev) =>
        prev ? [pkg, ...prev] : [pkg]
      );
    },
  });

  const updateStatusMutation = useMutation<Package, Error, UpdateStatusPayload>({
    mutationFn: ({ id, status }) => mockApi.updatePackageStatus(id, status),
    onSuccess: (pkg) => {
      dispatch(updateOnePackage({ id: pkg.id, changes: pkg }));
      queryClient.setQueryData<Package[]>(KEY, (prev) =>
        prev ? prev.map((p) => (p.id === pkg.id ? pkg : p)) : [pkg]
      );
    },
  });

  const addSensorValueMutation = useMutation<Package, Error, AddSensorPayload>({
    mutationFn: ({ pkgId, value }) => mockApi.addSensorValue(pkgId, value),
    onSuccess: (pkg) => {
      dispatch(updateOnePackage({ id: pkg.id, changes: pkg }));
      queryClient.setQueryData<Package[]>(KEY, (prev) =>
        prev ? prev.map((p) => (p.id === pkg.id ? pkg : p)) : [pkg]
      );
    },
  });

  const deletePackageMutation = useMutation<void, Error, { id: number }>({
    mutationFn: ({ id }) => mockApi.deletePackage(id),
    onSuccess: (_, { id }) => {
      dispatch(removeOnePackage(id));
      queryClient.setQueryData<Package[]>(KEY, (prev) =>
        prev?.filter((p) => p.id !== id) ?? prev
      );
    },
  });

  const addPackageFromScan = (data: string) => {
    addPackageToDb(data); 
    queryClient.invalidateQueries({ queryKey: KEY });
  };

  return {
    packagesQuery,
    createPackageMutation,
    updateStatusMutation,
    addSensorValueMutation,
    deletePackageMutation,
    addPackageFromScan,
  };
};

export default usePackagesApiCtx;
