import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { ProductGridItem, SearchBar } from "../../components";
import { formatCategory } from "../../utils";
import "./Shop.css";

import { useShop } from "../../context/ShopContext";
const Shop: React.FC = () => {
  const { category = "All", subcategory } = useParams<{
    category: string;
    subcategory: string;
  }>();
  const { products, isLoading } = useShop();
  const title = useMemo(() => {
    return subcategory
      ? `${formatCategory(category).toUpperCase()} → ${formatCategory(
          subcategory,
        )}`
      : `${formatCategory(category).toUpperCase()}`;
  }, [category, subcategory]);
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        return item.category.toLowerCase() === category.toLowerCase();
      })
      .filter((item) =>
        subcategory
          ? item.subcategory.toLowerCase() === subcategory.toLowerCase()
          : true,
      );
  }, [category, products, subcategory]);

  if (isLoading) {
    return <div className="content-centered-absolute">Loading...</div>;
  }
  return (
    <section className="shop-container">
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
    </section>
  );
};

export default Shop;
