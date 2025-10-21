import React from "react";
import { ScrollView, View, Text, Button } from "react-native";
import { UsersTest, CompaniesTest, PackagesTest } from "./BuggTest";
import useAuthCtx from "../hooks/context/api/useAuthCtx";

const ProfileScreen = () => {
  const { logout, user } = useAuthCtx();

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>
        Profile
      </Text>


      {user && (
        <View style={{ marginBottom: 16 }}>
          <Text>Email: {user.email}</Text>
          <Text>Role: {user.role}</Text>
        </View>
      )}

      <View style={{ gap: 12, marginBottom: 20 }}>
        <UsersTest />
        <CompaniesTest />
        <PackagesTest />
      </View>
      <Button title="Log out" onPress={logout} color="#d9534f" />
    </ScrollView>
  );
};

export default ProfileScreen;
