import React, { createContext, useContext, useState, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout as logoutAction } from '../../../store/authSlice';
import { mockLoginData } from "../../../services/mockAuth";

type User = {
  id: number;
  email: string;
  role: "sender" | "carrier" | "receiver" | "admin";
  token: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();


const login = async (email: string, password: string) => {
  try {
    const data = await mockLoginData(email, password); 
    setUser(data);
    dispatch(loginSuccess(data));
  } catch (err) {
    throw new Error("Login failed");
  }
};
  const logout = () => {
    setUser(null);
    dispatch(logoutAction());
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default function useAuthCtx() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthCtx must be used within an AuthProvider");
  return ctx;
}
