import { useEffect, useState } from "react";
import { Product } from "../types/product";
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
    setIsLoading(true);
    fetchProduct(id)
      .then((res) => {
        setProduct(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setIsLoading(false);
      });
  }, [id]);

  return {
    product,
    error,
    isLoading,
  };
};

export default useProduct;
