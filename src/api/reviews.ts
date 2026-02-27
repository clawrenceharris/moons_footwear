import type { ProductReview } from "../types/product";
import api from "./axios";

export const fetchProductReviews = async (
  id: number,
): Promise<ProductReview[]> => {
  const response = await api.get(`/product/${id}/reviews`);
  return response.data;
};
