import type { Package, DeliveryStatus, SensorValue } from "../types/types";
import { db } from "../config/data";
// ersätt i samma fil när vi inte ska mocka:
// const { data } = await http.get<Package[]>("/packages");
// return data;
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

let mem = {
  packages: db.packages.map((p) => ({ ...p, stats: [...(p.stats ?? [])] })),
};

// Hämta alla paket
export async function listPackages(): Promise<Package[]> {
  await delay(1000);
  return mem.packages;
}

// Hämta ett paket
export async function getPackageById(id: number): Promise<Package> {
  await delay(1000);
  const pkg = mem.packages.find((p) => p.id === id);
  if (!pkg) throw new Error("Package not found");
  return pkg;
}

// Skapa nytt paket
export async function createPackage(
  payload: Omit<Package, "id" | "stats"> & { stats?: SensorValue[] }
): Promise<Package> {
  await delay(1000);
  const nextId =
    (mem.packages.length ? Math.max(...mem.packages.map((p) => p.id)) : 0) + 1;
  const pkg: Package = { id: nextId, stats: payload.stats ?? [], ...payload };
  mem.packages = [pkg, ...mem.packages];
  return pkg;
}

// Uppdatera status
export async function updatePackageStatus(
  id: number,
  status: DeliveryStatus
): Promise<Package> {
  await delay(1000);
  const i = mem.packages.findIndex((p) => p.id === id);
  if (i === -1) throw new Error("Package not found");
  mem.packages[i] = { ...mem.packages[i], status };
  return mem.packages[i];
}

// Lägg till sensormätning
type SensorValueInput = Omit<SensorValue, "id"> & { id?: number };
export async function addSensorValue(
  pkgId: number,
  value: SensorValueInput
): Promise<Package> {
  await delay(1000);
  const i = mem.packages.findIndex((p) => p.id === pkgId);
  if (i === -1) throw new Error("Package not found");

  const nextSensorId =
    (mem.packages[i].stats?.length
      ? Math.max(...mem.packages[i].stats.map((s) => s.id))
      : 0) + 1;

  // UNDVIKER DUPLIKAT NYCKEL
  const { id: incomingId, ...rest } = value;
  const sensor: SensorValue = { ...rest, id: incomingId ?? nextSensorId };

  mem.packages[i] = {
    ...mem.packages[i],
    stats: [...mem.packages[i].stats, sensor],
  };
  return mem.packages[i];
}

// (valfritt) Ta bort paket
export async function deletePackage(id: number): Promise<void> {
  await delay(1000);
  const before = mem.packages.length;
  mem.packages = mem.packages.filter((p) => p.id !== id);
  if (mem.packages.length === before) throw new Error("Package not found");
}
