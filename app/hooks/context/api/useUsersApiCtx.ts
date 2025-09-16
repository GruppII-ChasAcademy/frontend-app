import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import * as api from "../../../api/users";
import {
  setAll as setAllUsers,
  upsertOne as upsertOneUser,
  removeOne as removeOneUser,
  type UserEntity,
} from "../../../store/usersSlice";
import type { User } from "../../../types/types";

const KEY = ["users"] as const;
const toEntity = (u: User): UserEntity => {
  if (u.id == null) throw new Error("User saknar id");
  return u as UserEntity;
};

const useUsersApiCtx = () => {
  const qc = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  // QUERY (utan onSuccess i v5)
  const listQuery = useQuery<User[], Error>({
    queryKey: KEY,
    queryFn: api.listUsers,
  });

  useEffect(() => {
    if (listQuery.isSuccess && listQuery.data) {
      dispatch(setAllUsers(listQuery.data.map(toEntity)));
    }
  }, [listQuery.isSuccess, listQuery.data, dispatch]);

  const createUserMutation = useMutation<User, Error, api.CreateUserPayload>({
    mutationFn: api.createUser,
    onSuccess: (u) => {
      dispatch(upsertOneUser(toEntity(u)));
      qc.setQueryData<User[]>(KEY, (curr) => (curr ? [u, ...curr] : [u]));
    },
  });

  const updateUserMutation = useMutation<User, Error, api.UpdateUserPayload>({
    mutationFn: api.updateUser,
    onSuccess: (u) => {
      dispatch(upsertOneUser(toEntity(u)));
      qc.setQueryData<User[]>(KEY, (curr) =>
        curr ? curr.map((x) => (x.id === u.id ? u : x)) : [u]
      );
    },
  });

  const deleteUserMutation = useMutation<void, Error, { id: number }>({
    mutationFn: ({ id }) => api.deleteUser(id),
    onSuccess: (_, { id }) => {
      dispatch(removeOneUser(id));
      qc.setQueryData<User[]>(
        KEY,
        (curr) => curr?.filter((x) => x.id !== id) ?? curr
      );
    },
  });

  return {
    listQuery,
    createUserMutation,
    updateUserMutation,
    deleteUserMutation,
  };
};

export default useUsersApiCtx;
