import React from "react";
import { useFavorites } from "../../context/FavoritesContext";
import { Product } from "../../types/product";
export interface ProductItemProps {
  onFavoriteClick: (item: Product) => void;
}
const ProductWrapper = ({
  children,
}: {
  children: React.ReactElement<ProductItemProps>;
}) => {
  const { addItem } = useFavorites();
  const handleFavoriteClick = (item: Product) => {
    addItem(item);
  };
  return (
    <>
      {" "}
      {React.cloneElement(children, {
        onFavoriteClick: handleFavoriteClick,
      })}
    </>
  );
};

export default ProductWrapper;
