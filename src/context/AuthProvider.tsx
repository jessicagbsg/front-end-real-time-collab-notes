import { createContext, ReactNode, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { User } from "@/types";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | undefined;
  loading: boolean;
  error: null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: undefined,
  loading: true,
  error: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
