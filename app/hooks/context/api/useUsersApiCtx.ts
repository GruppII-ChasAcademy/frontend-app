import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import * as api from "../../../api/users";
import {
  setAllUsers,
  addOneUser,
  updateOneUser,
  removeOneUser,
  type UserEntity,
} from "../../../store/usersSlice";
import type { User } from "../../../types/types";

const KEY = ["users"] as const;

const toEntity = (user: User): UserEntity => {
  if (user.id == null) throw new Error("User saknar id");
  return user as UserEntity;
};

const useUsersApiCtx = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const usersQuery = useQuery<User[], Error>({
    queryKey: KEY,
    queryFn: api.listUsers,
  });

  useEffect(() => {
    if (usersQuery.isSuccess && usersQuery.data) {
      dispatch(setAllUsers(usersQuery.data.map(toEntity)));
    }
  }, [usersQuery.isSuccess, usersQuery.data, dispatch]);

  const createUserMutation = useMutation<User, Error, api.CreateUserPayload>({
    mutationFn: api.createUser,
    onSuccess: (user) => {
      dispatch(addOneUser(toEntity(user)));
      queryClient.setQueryData<User[]>(KEY, (prev) =>
        prev ? [user, ...prev] : [user]
      );
    },
  });

  const updateUserMutation = useMutation<User, Error, api.UpdateUserPayload>({
    mutationFn: api.updateUser,
    onSuccess: (user) => {
      dispatch(updateOneUser({ id: user.id!, changes: user }));
      queryClient.setQueryData<User[]>(KEY, (prev) =>
        prev ? prev.map((u) => (u.id === user.id ? user : u)) : [user]
      );
    },
  });

  const deleteUserMutation = useMutation<void, Error, { id: number }>({
    mutationFn: ({ id }) => api.deleteUser(id),
    onSuccess: (_, { id }) => {
      dispatch(removeOneUser(id));
      queryClient.setQueryData<User[]>(
        KEY,
        (prev) => prev?.filter((u) => u.id !== id) ?? prev
      );
    },
  });

  return {
    usersQuery,
    createUserMutation,
    updateUserMutation,
    deleteUserMutation,
  };
};

export default useUsersApiCtx;
