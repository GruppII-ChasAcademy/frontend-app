// app/api/users.ts
import type { User } from "../types/types";
import { db } from "../config/data";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

let mem = {
  users: db.users.map((u) => ({ ...u })), // muterbar kopia
};

function nextId(arr: { id?: number }[]) {
  return (arr.length ? Math.max(...arr.map((x) => x.id ?? 0)) : 0) + 1;
}

// List
export async function listUsers(): Promise<User[]> {
  await delay(150);
  return mem.users;
}

// Get by id
export async function getUserById(id: number): Promise<User> {
  await delay(120);
  const u = mem.users.find((x) => x.id === id);
  if (!u) throw new Error("User not found");
  return u;
}

// Create
export type CreateUserPayload = Omit<User, "id">;
export async function createUser(payload: CreateUserPayload): Promise<User> {
  await delay(180);
  const id = nextId(mem.users);
  const user: User = { id, ...payload };
  mem.users = [user, ...mem.users];
  return user;
}

// Update (partial)
export type UpdateUserPayload = Partial<User> & { id: number };
export async function updateUser(patch: UpdateUserPayload): Promise<User> {
  await delay(180);
  const i = mem.users.findIndex((x) => x.id === patch.id);
  if (i === -1) throw new Error("User not found");
  mem.users[i] = { ...mem.users[i], ...patch };
  return mem.users[i];
}

// Delete
export async function deleteUser(id: number): Promise<void> {
  await delay(120);
  const before = mem.users.length;
  mem.users = mem.users.filter((x) => x.id !== id);
  if (mem.users.length === before) throw new Error("User not found");
}
