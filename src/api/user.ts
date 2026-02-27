import type { User } from "../types/user";
import api from "./axios";

export const fetchUser = async (id: number): Promise<User> => {
  const response = await api.get(`/user/${id}`);
  return response.data;
};
