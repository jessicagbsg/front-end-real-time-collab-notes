import axios from "axios";
import type {} from "../types";
import { Path } from "@/config/path";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function validateToken(token: string) {
  try {
    const response = await httpClient.get(Path.auth, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    return error.response?.data?.message || "Authentication failed";
  }
}
