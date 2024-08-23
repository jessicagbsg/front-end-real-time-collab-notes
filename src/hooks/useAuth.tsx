import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "@/types";
import { API_URL } from "@/config/variables";
import { Path } from "@/config/path";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/${Path.auth}`, {
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
        setLoading(false);
      }
    };

    validateUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(undefined);
  };

  return { isAuthenticated, user, loading, error, login, logout };
};
