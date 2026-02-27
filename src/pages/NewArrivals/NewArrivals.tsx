import React from "react";
import { Link } from "react-router-dom";
import "./NewArrivals.css";
import bannerImage from "../../assets/images/new-arrivals-banner.jpg";
import { products } from "../../data/products";
import type { Product } from "../../types/product";
import { ProductGridItem } from "../../components";
const NewArrivals: React.FC = () => {
  return (
    <div className="new-arrivals-container">
      <div className="new-arrivals-banner">
        <div className="banner">
          <img id="banner-image" src={bannerImage} alt="moon walker shoes" />
          <div className="overlay">
            <div className="banner-content">
              <div>
                <h1>New for You!</h1>
                <p style={{ marginTop: "20px" }}>
                  Check out these new arrivals we know you'll love.
                </p>
              </div>
              <span>
                <a href="#new-arrivals">SHOP NOW</a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <section id="new-arrivals-grid">
        {products
          .filter((item) => item.isNew)
          ?.map((item, index) => {
            const product: Product = {
              ...item,
              description: "",
              category_id: 0,
              subcategory_id: 0,
              brand_id: 0,
              stockQuantity: 0,
              createdAt: "",
              discount: null,
              subcategory: "",
              brand: undefined,
              published: false,
              isArchived: false,
              images: [],
              flags: [],
              variants: { colors: item.colors, sizes: item.sizes },
            };
            return <ProductGridItem key={index} product={product} />;
          })}
        <div>
          <Link to={`/shop/category/new`} className="shop-all-container">
            <p className="button-primary">SHOP ALL</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

/**
 * 
 * <div>
      <div className="new-arrivals-banner">
        <div className="banner">
          <img
            style={{ width: "100%", height: "auto" }}
            id="banner-image"
            src={bannerImage}
            alt="moon walker shoes"
          />
          <div className="overlay">
            <div style={{}} className="text-container">
              <h1
                style={{
                  width: "200px",
                  color: "white",
                  borderBottom: "5px solid #E70007",
                }}
              >
                New for You!
              </h1>
              <p style={{ marginTop: "20px" }}>
                Check out these new arrivals we know you'll love.
              </p>
            </div>
            <span>
              <a href="#new-arrivals">SHOP NOW</a>
            </span>
          </div>
        </div>
      </div>
      <section id="new-arrivals-grid">
        {products
          .filter((item) => item.isNew)
          ?.map((item, index) => {
            const product: Product = {
              ...item,
              description: "",
              category_id: 0,
              subcategory_id: 0,
              brand_id: 0,
              stockQuantity: 0,
              createdAt: "",
              discount: null,
              subcategory: "",
              brand: undefined,
              published: false,
              isArchived: false,
              images: [],
              flags: [],
              variants: { colors: item.colors, sizes: item.sizes },
            };
            return <ProductGridItem key={index} product={product} />;
          })}
      </section>
    </div>
 */
export default NewArrivals;
