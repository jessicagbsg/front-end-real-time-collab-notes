import axios from "axios";
import type { CreateNoteDTO, CreateUserDTO, UserLoginDTO } from "../types";
import { API_URL } from "@/config/variables";

import { Path } from "@/config/path";

export const httpClient = axios.create({
  baseURL: API_URL,
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

export async function register(data: CreateUserDTO) {
  try {
    const response = await axios.post(Path.signup, { ...data });
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
  } catch (error: any) {
    return error.response?.data?.message || "Registration failed";
  }
}

export async function userLogin(data: UserLoginDTO) {
  try {
    const response = await axios.post(Path.login, { ...data });
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
  } catch (error: any) {
    return error.response?.data?.message || "Login failed";
  }
}

export async function createNote(data: CreateNoteDTO) {
  try {
    const token = localStorage.getItem("token");
    const response = await httpClient.post(
      Path.createNote,
      { note: { ...data } },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data?.message || "Note creation failed";
  }
}

export async function getNotesFromUser(userId: String) {
  try {
    const token = localStorage.getItem("token");
    const response = await httpClient.get(`${Path.note}?owner_id=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    return error.response?.data?.message || "Failed to get notes";
  }
}
