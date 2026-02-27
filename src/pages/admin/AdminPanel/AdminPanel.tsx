import { useEffect, useState } from "react";
import { ProductGridItem, SearchBar } from "../../../components";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
} from "../../../api/admin/products";
import { type Product } from "../../../types/product";

const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch {
        setError("Failed to load products.");
      }
    };
    getProducts();
  }, []);
  const handleDelete = (id: number) => {
    deleteProduct(id)
      .then(() => {
        setProducts((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  const handleAddClick = () => {
    addProduct().catch((err) => {
      setError(err.message);
    });
  };
  function handleEditClick(id: number): void {
    navigate(`/admin/product/${id}`);
  }
  if (error) {
    <div className="content-centered-absolute">
      <p>{error}</p>
    </div>;
  }
  return (
    <div className="admin-container">
      <SearchBar />
      <h1>All Products</h1>
      <button onClick={handleAddClick} className="button-primary">
        Add Product
      </button>
      <div className="content-body content-grid">
        {products.map((item) => (
          <div>
            <ProductGridItem product={item} />
            <div className="flex-content">
              <button
                className="button-secondary"
                onClick={() => handleEditClick(item.id)}
              >
                Edit Product
              </button>
              <button
                className="button-danger"
                onClick={() => handleDelete(item.id)}
              >
                Delete Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
