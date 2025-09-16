import React from "react";
import { View, Text, Button } from "react-native";
import useCompaniesApiCtx from "../../hooks/context/api/useCompaniesApiCtx";

const CompaniesTest = () => {
  const {
    listQuery: companiesQuery,
    createCompanyMutation,
    updateCompanyMutation,
    deleteCompanyMutation,
  } = useCompaniesApiCtx();

  const first = companiesQuery.data?.[0];

  const handleCreate = () => {
    createCompanyMutation.mutate({
      name: "Ny Debug Firma",
      date: new Date().toISOString(),
      // location är optional – lämnas tom för test
    });
  };

  const handleRename = () => {
    if (!first) return;
    updateCompanyMutation.mutate({ id: first.id, name: first.name + " *" });
  };

  const handleDelete = () => {
    if (!first) return;
    deleteCompanyMutation.mutate({ id: first.id });
  };

  return (
    <View
      style={{ padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 12 }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>
        Companies – BuggTest
      </Text>
      <Text>isFetching: {String(companiesQuery.isFetching)}</Text>
      <Text>count: {companiesQuery.data?.length ?? 0}</Text>
      <Text>first: {first?.name ?? "-"}</Text>

      <View style={{ height: 8 }} />
      <Button title="Create company" onPress={handleCreate} />
      <View style={{ height: 8 }} />
      <Button
        title="Rename first company"
        onPress={handleRename}
        disabled={!first}
      />
      <View style={{ height: 8 }} />
      <Button
        title="Delete first company"
        onPress={handleDelete}
        disabled={!first}
      />
    </View>
  );
};

export default CompaniesTest;
