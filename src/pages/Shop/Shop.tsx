import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductGridItem, SearchBar } from "../../components";
import { formatCategory } from "../../utils";
import "./Shop.css";

import { useShop } from "../../context/ShopContext";
import { Product } from "../../types/product";
const Shop: React.FC = () => {
  const { category = "All", subcategory } = useParams<{
    category: string;
    subcategory: string;
  }>();
  const { products, categories, subcategories, isLoading } = useShop();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
    // Build query parameters
    const params: Record<string, string> = { category };
    if (subcategory) params.subcategory = subcategory;
    setTitle(
      subcategory
        ? `${formatCategory(category).toUpperCase()} → ${formatCategory(
            subcategory
          )}`
        : `${formatCategory(category).toUpperCase()}`
    );
    setFilteredProducts(
      products
        .filter((item) => {
          return item.category.toLowerCase() === category.toLowerCase();
        })
        .filter((item) =>
          subcategory
            ? item.subcategory.toLowerCase() === subcategory.toLowerCase()
            : true
        )
    );
  }, [categories, category, products, subcategories, subcategory]);
  if (isLoading) {
    return <div className="content-centered-absolute">Loading...</div>;
  }
  return (
    <div className="shop-container">
      <SearchBar />

      <h1>Shop {title}</h1>
      {filteredProducts.length > 0 ? (
        <div className="content-grid">
          {filteredProducts.map((item) => (
            <ProductGridItem key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <div className="content-centered-absolute">
          <p>
            Looks like there are no items in this category. Try checking back
            later.
          </p>
        </div>
      )}
    </div>
  );
};

export default Shop;
