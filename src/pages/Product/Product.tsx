import React from "react";
import { ProductItem } from "../../components";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import { useProduct, useReviews } from "../../hooks";

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const {
    isLoading: loadingProduct,
    product,
    error: productError,
  } = useProduct(productId);
  const {
    isLoading: loadingReviews,
    reviews,
    error: reviewsError,
  } = useReviews(productId);

  if (loadingProduct || loadingReviews) {
    return <div className="content-centered-absolute">Loading...</div>;
  }
  if (!product) {
    return <NotFound message="Product not found" />;
  }
  if (productError || reviewsError) {
    return (
      <div className="content-centered-absolute">
        <h1>Something went wrong.</h1>
        <p>{productError || reviewsError}</p>
      </div>
    );
  }

  return (
    <div>
      <section className="product-container">
        {product && <ProductItem product={product} />}
      </section>
      <section id="reviews">
        <h2>Reviews</h2>
        <dl style={{ marginTop: "20px" }}>
          {reviews.length > 0 ? (
            reviews.map((item, index: number) => (
              <div key={index} style={{ marginBottom: "40px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <dt>{item.user.name} </dt>

                  <div className="stars">
                    {Array(item.stars)
                      .fill("")
                      .map((_, index) => (
                        <span key={index}>&#9733;</span>
                      ))}
                  </div>
                </div>

                <dd style={{ textIndent: "3em" }}>{item.comment}</dd>
              </div>
            ))
          ) : (
            <p>
              No reviews yet. Be the first to say something about this product!
            </p>
          )}
        </dl>
      </section>
      <section>
        <h2>Similar Items</h2>
        <div style={{ display: "flex", overflowX: "auto" }}>
          {/* {products
            .filter(
              (item) =>
                item.id !== product.id &&
                item.category === product.category &&
                item.type === product.type
            )
            .map((item, index) => (
              <ProductGridItem key={index} item={item} />
            ))} */}
        </div>
      </section>
    </div>
  );
};

export default Product;
