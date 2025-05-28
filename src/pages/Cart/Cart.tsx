import React from "react";
import { useCartStore } from "../../stores";
import { ProductCartItem } from "../../components";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cart, clearCart } = useCartStore();
  const navigate = useNavigate();
  return (
    <div className="cart-container">
      <div className="flex-content">
        <button
          type="button"
          onClick={() => navigate("/checkout")}
          disabled={cart.length === 0}
          className={`button-primary ${
            cart.length === 0 ? "button-disabled " : ""
          }`}
        >
          Checkout
        </button>
        <button onClick={clearCart} className="button-secondary">
          Clear
        </button>
      </div>

      {cart.length > 0 ? (
        <div className="content-grid">
          {cart.map((item) => (
            <ProductCartItem product={item} />
          ))}
        </div>
      ) : (
        <div className="content-centered-absolute">
          <h2>Nothing is in your cart yet.</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
