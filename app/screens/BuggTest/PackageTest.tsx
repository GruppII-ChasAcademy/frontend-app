import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { useApiContext } from "../../hooks/context/ApiContext";
import type { DeliveryStatus, SensorValue } from "../../types/types";

const nextStatus = (s: DeliveryStatus): DeliveryStatus =>
  s === "preparing" ? "Shipped" : s === "Shipped" ? "Delivered" : "Delivered";

const PackagesTest = () => {
  const {
    packages: {
      packagesQuery,
      createPackageMutation,
      updateStatusMutation,
      addSensorValueMutation,
      deletePackageMutation,
    },
    users: { usersQuery },
  } = useApiContext();

  const users = usersQuery.data ?? [];
  const customer = users[0];
  const sender = users[1];
  const carrier = users[2];
  const canCreate = !!(customer && sender && carrier);

  const first = packagesQuery.data?.[0];

  const handleCreate = () => {
    if (!canCreate) {
      Alert.alert(
        "Saknar användare",
        "Behöver minst 3 users (Customer/Sender/Carrier)."
      );
      return;
    }
    createPackageMutation.mutate({
      title: "Debug Package",
      CustomerId: customer!,
      senderId: sender!,
      carrierId: carrier!,
      status: "preparing",
      dateorder: new Date().toISOString(),
      datesend: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      daterecieved: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      notes: "Skapad från BuggTest",
    });
  };

  const handleAdvanceStatus = () => {
    if (!first) return;
    updateStatusMutation.mutate({
      id: first.id,
      status: nextStatus(first.status),
    });
  };

  const handleAddSensor = () => {
    if (!first) return;
    const value: Omit<SensorValue, "id"> = {
      temperature: 6.1,
      gps: { lat: 59.334, lon: 18.066 },
      huminity: "70%",
      Alert: "Fridge",
      date: new Date().toISOString(),
    };
    addSensorValueMutation.mutate({ pkgId: first.id, value });
  };

  const handleDelete = () => {
    if (!first) return;
    deletePackageMutation.mutate({ id: first.id });
  };

  const SensorRow = ({ s }: { s: SensorValue }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 4,
      }}
    >
      <Text>{new Date(s.date).toLocaleString()}</Text>
      <Text>{s.temperature.toFixed(1)}°C</Text>
      <Text>{s.huminity}</Text>
      <Text>
        {s.gps.lat.toFixed(3)}, {s.gps.lon.toFixed(3)}
      </Text>
      <Text>{s.Alert}</Text>
    </View>
  );

  return (
    <View
      style={{ padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 12 }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>
        Packages – BuggTest
      </Text>

      <View style={{ gap: 12, marginBottom: 12 }}>
        {packagesQuery.data?.map((pkg) => (
          <View
            key={pkg.id}
            style={{ borderWidth: 1, borderRadius: 8, padding: 12 }}
          >
            <Text style={{ fontWeight: "bold" }}>
              #{pkg.id} {pkg.title ?? "(untitled)"} – {pkg.status}
            </Text>
            <Text style={{ opacity: 0.7 }}>
              {pkg.dateorder} → {pkg.daterecieved}
            </Text>

            <Text style={{ marginTop: 8, fontWeight: "600" }}>
              Sensorer ({pkg.stats.length})
            </Text>

            {pkg.stats.length ? (
              pkg.stats.map((s) => (
                <SensorRow key={`${pkg.id}-${s.id}`} s={s} />
              ))
            ) : (
              <Text style={{ opacity: 0.6 }}>Inga sensordata än</Text>
            )}
          </View>
        ))}
      </View>

      <Text>isFetching: {String(packagesQuery.isFetching)}</Text>
      <Text>count: {packagesQuery.data?.length ?? 0}</Text>
      <Text>
        first:{" "}
        {first ? `${first.title ?? "(untitled)"} – ${first.status}` : "-"}
      </Text>

      <View style={{ height: 8 }} />
      <Button
        title="Create package"
        onPress={handleCreate}
        disabled={!canCreate}
      />
      <View style={{ height: 8 }} />
      <Button
        title="Advance status on first"
        onPress={handleAdvanceStatus}
        disabled={!first}
      />
      <View style={{ height: 8 }} />
      <Button
        title="Add sensor to first"
        onPress={handleAddSensor}
        disabled={!first}
      />
      <View style={{ height: 8 }} />
      <Button
        title="Delete first package"
        onPress={handleDelete}
        disabled={!first}
      />
    </View>
  );
};

export default PackagesTest;
