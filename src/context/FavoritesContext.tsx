import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { Product } from "../types/product";
import { addFavorites, fetchFavorites } from "../api/favorites";

export type FavoritesContextType = {
  favorites: Product[];
  error: string | null;
  addItem: (item: Product) => void;
  loading: boolean;
};
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUserId } = useAuth();
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addItem = (item: Product) => {
    if (!currentUserId) {
      setError("Could not add item to favorites: User not authenticated");
      return;
    }

    addFavorites(currentUserId, item)
      .then((res) => {
        setFavorites(res);
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  useEffect(() => {
    if (!currentUserId) {
      return;
    }
    setLoading(true);
    fetchFavorites(currentUserId)
      .then((res) => {
        setFavorites(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [currentUserId]);

  return (
    <FavoritesContext.Provider
      value={{
        loading,
        favorites,
        error,
        addItem,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

function useFavorites() {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { FavoritesProvider, useFavorites };
