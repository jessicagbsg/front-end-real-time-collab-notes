import { createContext, ReactNode, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { CreateUserDTO, User, UserLoginDTO } from "@/types";

type AuthContextType = {
  isAuthenticated: boolean;
  user: Partial<User> | null;
  isLoading: boolean;
  error: null;
  login: (data: UserLoginDTO) => Promise<void>;
  logout: () => void;
  signUp: (data: CreateUserDTO) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  error: null,
  login: async () => {},
  logout: () => {},
  signUp: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
