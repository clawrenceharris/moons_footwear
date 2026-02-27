/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { addFavorites, fetchFavorites } from "../api/favorites";
import type { Product } from "../types/product";

export type FavoritesContextType = {
  favorites: Product[];
  error: string | null;
  addItem: (item: Product) => void;
  loading: boolean;
};
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addItem = (item: Product) => {
    if (!user?.id) {
      setError("Could not add item to favorites: User not authenticated");
      return;
    }

    addFavorites(user.id, item)
      .then((res) => {
        setFavorites(res);
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  useEffect(() => {
    const getFavoirtes = () => {
      if (!user?.id) {
        return;
      }
      try {
        setLoading(true);
        fetchFavorites(user.id)
          .then((res) => {
            setFavorites(res);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      } catch {
        alert("Error getting favoirtes");
      }
    };
    getFavoirtes();
  }, [user?.id]);

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
