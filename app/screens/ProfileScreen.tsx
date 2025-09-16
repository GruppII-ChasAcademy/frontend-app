// app/screens/ProfileScreen.tsx
import React from "react";
import { ScrollView, View, Text } from "react-native";
import { UsersTest, CompaniesTest, PackagesTest } from "./BuggTest";

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>
        Profile
      </Text>
      <View style={{ gap: 12 }}>
        <UsersTest />
        <CompaniesTest />
        <PackagesTest />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
