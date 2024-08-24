import { useState, useEffect } from "react";
import type { CreateUserDTO, User, UserLoginDTO } from "@/types";
import { register, userLogin, validateToken } from "@/api";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const user: Partial<User> = JSON.parse(localStorage.getItem("user") || "");

  useEffect(() => {
    validateUser();
  }, []);

  const validateUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const validatedUser = await validateToken(token);
      const user = localStorage.getItem("user");
      if (!user || JSON.stringify(validatedUser) !== user) {
        localStorage.setItem("user", JSON.stringify(validatedUser));
      }
      setIsAuthenticated(true);
    } catch (error: any) {
      setIsAuthenticated(false);
      setError(error.response?.data?.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: CreateUserDTO) => {
    try {
      await register(data);
      setIsAuthenticated(true);
    } catch (error: any) {
      setIsAuthenticated(false);
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const login = async (data: UserLoginDTO) => {
    try {
      await userLogin(data);
      setIsAuthenticated(true);
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, user, isLoading, error, login, logout, signUp };
};
