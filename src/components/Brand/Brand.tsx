import React from "react";
import "./Brand.css";
import type { ProductBrand } from "../../types/product";

interface BrandProps {
  brand: ProductBrand;
}
const Brand: React.FC<BrandProps> = ({ brand }) => {
  return <div>{brand.name}</div>;
};

export default Brand;
