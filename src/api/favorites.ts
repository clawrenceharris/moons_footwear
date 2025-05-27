import { Product } from "../types/product";
import api from "./axios";

export const addFavorites = async (id: number, item: Product) => {
  const response = await api.post(`/user/${id}/favorites`);
  return response.data;
};

export const fetchFavorites = async (id: number): Promise<Product[]> => {
  const response = await api.get(`/user/${id}/favorites`);
  return response.data;
};
