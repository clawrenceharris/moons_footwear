import { useEffect, useState } from "react";
import { fetchProductReviews } from "../api/reviews";
import { ProductReview } from "../types/product";

const useReviews = (productId: number) => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);

        const reviews = await fetchProductReviews(productId);
        setReviews(reviews);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  return { isLoading, reviews, error };
};

export default useReviews;
