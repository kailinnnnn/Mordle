import axios from "axios";
import { User } from "./types";

const API_URL =
  typeof window === "undefined"
    ? `${process.env.NEXT_PUBLIC_API_URL}/api`
    : "/api";

export function getUsers<T extends keyof User>(query: { [key in T]: User[T] }) {
  return axios.get(`${API_URL}/users`, { params: query });
}

export function createUser(name: string) {
  const user = { name, score: 0 };
  return axios.post(`${API_URL}/users`, user);
}

export function updateUser(user: User) {
  return axios.put(`${API_URL}/users/${user._id}`, user);
}
