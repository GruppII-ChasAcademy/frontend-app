import { users } from '../config/data' 
import type { User as DataUser } from "../types/types";

export type UserRole = "admin" | "sender" | "carrier" | "receiver";

export type User = {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  token: string;
};


export const mockLoginData = async (email: string, password: string): Promise<User> => {
  const user = users.find((u) => u.epost === email);
  if (!user) throw new Error("User not found");
  if (user.password !== password) throw new Error("Invalid password");

  return {
    id: user.id,
    email: user.epost,
    password: user.password,
    role: user.role.toLowerCase() as UserRole,
    token: `token-${user.id}`, 
  };
};

