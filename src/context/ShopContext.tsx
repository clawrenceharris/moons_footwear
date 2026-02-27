/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import type {
  Product,
  ProductBrand,
  ProductCategory,
  ProductFlag,
} from "../types/product";
import { fetchAllProducts } from "../api/shop";
import {
  fetchAllBrands,
  fetchAllCategories,
  fetchAllFlags,
  fetchAllSubcategories,
} from "../api/tags";

interface ShopContextType {
  products: Product[];
  brands: ProductBrand[];
  flags: ProductFlag[];
  categories: ProductCategory[];
  subcategories: ProductCategory[];
  error: string | null;
  isLoading: boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a Shop Provider");
  }
  return context;
};

const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [subcategories, setSubategories] = useState<ProductCategory[]>([]);
  const [flags, setFlags] = useState<ProductFlag[]>([]);
  const [brands, setBrands] = useState<ProductBrand[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);

        const [products, categoires, subcategories, flags, brands] =
          await Promise.all([
            fetchAllProducts(),
            fetchAllCategories(),
            fetchAllSubcategories(),
            fetchAllFlags(),
            fetchAllBrands(),
          ]);
        setProducts(products);
        setCategories(categoires);
        setSubategories(subcategories);
        setFlags(flags);
        setBrands(brands);
      } catch {
        setError("Failed to load.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);
  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        subcategories,
        flags,
        brands,
        error,
        isLoading,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export { useShop, ShopProvider };
