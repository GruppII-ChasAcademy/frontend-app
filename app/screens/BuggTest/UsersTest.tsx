import React from "react";
import { View, Text, Button } from "react-native";
import useUsersApiCtx from "../../hooks/context/api/useUsersApiCtx";
import useCompaniesApiCtx from "../../hooks/context/api/useCompaniesApiCtx";
import type { Role } from "../../types/types";

const UsersTest = () => {
  const {
    listQuery: usersQuery,
    createUserMutation,
    updateUserMutation,
    deleteUserMutation,
  } = useUsersApiCtx();
  const { listQuery: companiesQuery } = useCompaniesApiCtx();

  const firstUser = usersQuery.data?.[0];
  const firstCompany = companiesQuery.data?.[0];

  const handleCreate = () => {
    if (!firstCompany) return;
    createUserMutation.mutate({
      name: "Debug User",
      password: "secret",
      epost: "debug.user@example.com",
      phone: 46701234567,
      role: "Customer" as Role,
      image: "https://picsum.photos/seed/debuguser/200",
      company: firstCompany,
      date: new Date().toISOString(),
      packages: [],
    });
  };

  const handleRename = () => {
    if (!firstUser?.id) return;
    updateUserMutation.mutate({
      id: firstUser.id,
      name: firstUser.name + " *",
    });
  };

  const handleDelete = () => {
    if (!firstUser?.id) return;
    deleteUserMutation.mutate({ id: firstUser.id });
  };

  return (
    <View
      style={{ padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 12 }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>
        Users – BuggTest
      </Text>
      <Text>isFetching: {String(usersQuery.isFetching)}</Text>
      <Text>count: {usersQuery.data?.length ?? 0}</Text>
      <Text>first: {firstUser?.name ?? "-"}</Text>

      <View style={{ height: 8 }} />
      <Button
        title="Create user"
        onPress={handleCreate}
        disabled={!firstCompany}
      />
      <View style={{ height: 8 }} />
      <Button
        title="Rename first user"
        onPress={handleRename}
        disabled={!firstUser?.id}
      />
      <View style={{ height: 8 }} />
      <Button
        title="Delete first user"
        onPress={handleDelete}
        disabled={!firstUser?.id}
      />
    </View>
  );
};

export default UsersTest;
