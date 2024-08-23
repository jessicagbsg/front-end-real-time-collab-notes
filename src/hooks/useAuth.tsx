import { useState, useEffect } from "react";
import axios from "axios";
import { CreateUserDTO, User, UserLoginDTO } from "@/types";
import { API_URL } from "@/config/variables";
import { Path } from "@/config/path";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      console.log(token);
      try {
        const response = await axios.get(`${API_URL}${Path.auth}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
          setUser(response.data.user);
        } else {
          setIsAuthenticated(false);
          setUser(undefined);
        }
      } catch (error: any) {
        setIsAuthenticated(false);
        setUser(undefined);
        setError(error.response?.data?.message || "Authentication failed");
      } finally {
        setIsLoading(false);
      }
    };

    validateUser();
  }, []);

  const signUp = async (data: CreateUserDTO) => {
    try {
      const response = await axios.post(`${API_URL}${Path.signup}`, { data });
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const login = async (data: UserLoginDTO) => {
    try {
      const { email, password } = data;
      const response = await axios.post(`${API_URL}${Path.login}`, { email, password });
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(undefined);
  };

  return { isAuthenticated, user, isLoading, error, login, logout, signUp };
};
