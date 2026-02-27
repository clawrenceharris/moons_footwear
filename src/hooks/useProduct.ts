/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { fetchProduct } from "../api/admin/products";

const useProduct = (id?: number) => {
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const getProduct = async () => {
      try {
        const product = await fetchProduct(id);
        setProduct(product);
      } catch (err: any) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, [id]);

  return {
    product,
    error,
    isLoading,
  };
};

export default useProduct;
