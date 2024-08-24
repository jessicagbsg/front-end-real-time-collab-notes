import { useState, useEffect } from "react";
import axios from "axios";
import { CreateUserDTO, User, UserLoginDTO } from "@/types";
import { API_URL } from "@/config/variables";
import { Path } from "@/config/path";
import { validateToken } from "@/api";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const user: Partial<User> = JSON.parse(localStorage.getItem("user") || "");

  useEffect(() => {
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

    validateUser();
  }, []);

  const signUp = async (data: CreateUserDTO) => {
    try {
      const response = await axios.post(`${API_URL}${Path.signup}`, { ...data });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.id,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        })
      );

      setIsAuthenticated(true);
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const login = async (data: UserLoginDTO) => {
    try {
      const { email, password } = data;
      const response = await axios.post(`${API_URL}${Path.login}`, { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.id,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        })
      );
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
