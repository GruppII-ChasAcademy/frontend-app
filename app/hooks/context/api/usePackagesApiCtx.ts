import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../../../api/packages";
import { useDispatch, UseDispatch } from "react-redux";
import { upsertMany, upsertOne } from "../../../store/packagesSlice";
import { packages } from "../../../config/data";
import { Package } from "../../../types/types";

const KEY = ["packages"];

const usePackagesApiCtx = () => {
  const qc = useQueryClient();
  const dispatch = useDispatch();
  const listQuery = useQuery<Package[]>({
    queryKey: KEY,
    queryFn: api.listPackages,
    onSuccess: (packages) => {
      dispatch(upsertMany(packages));
    },
  });
};
