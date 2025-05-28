import React, { ChangeEvent, useEffect, useState } from "react";
import { formatCurrency } from "../../utils";
import { useCartStore } from "../../stores";
import { ProductCartItem } from "../../components";

const Checkout: React.FC = () => {
  const [shipping, setShipping] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    zipcode: undefined,
    apartmentNumber: undefined,
    creditCardNumber: undefined,
    expirationDate: undefined,
    state: undefined,
    cvv: undefined,
  });
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [addressIsSame, setAddressIsSame] = useState<boolean>(true);
  const [showShippingOptions, setShowShippingOptions] =
    useState<boolean>(false);
  const [showDiscountOptions, setShowDiscountOptions] =
    useState<boolean>(false);
  const { getSubtotal, cart } = useCartStore();
  const tax = getSubtotal() * 0.06;
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  window.onload = () => {
    alert(
      "Today only — 10% off your purshase — Use promo code MYSTERYDEAL at checkout!"
    );
  };
  useEffect(() => {
    setCompletedSections([]);
    setShipping(0);
  }, []);

  const AddressInfo = (
    <div>
      <div className="flex-content">
        <div>
          <label htmlFor="street-address">Street Address*</label>
          <input
            name="streetAddress"
            required
            value={inputs.streetAddress}
            onChange={handleChange}
            autoComplete="street-address"
            className="input"
            id="street-address"
            type="text"
          />
        </div>
        <div style={{ flex: 0.2 }}>
          <label htmlFor="apartment-number">Apt/Unit No.</label>
          <input
            name="apartmentNumber"
            autoComplete="apartment-number"
            className="input"
            value={inputs.apartmentNumber}
            onChange={handleChange}
            id="apartment-number"
            type="text"
          />
        </div>
      </div>

      <div className="flex-content align-center">
        <div>
          <label htmlFor="city">City*</label>
          <input
            name="city"
            autoComplete="city"
            onChange={handleChange}
            required
            value={inputs.city}
            className="input"
            id="city"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="state">State*</label>
          <input
            type="text"
            onChange={handleChange}
            value={inputs.state}
            className="input"
            name="state"
            required
            id="state"
          />
        </div>
        <div>
          <label htmlFor="zipcode">U.S Zip Code*</label>
          <input
            onChange={handleChange}
            className="input"
            value={inputs.zipcode}
            id="zipcode"
            name="zipcode"
            type="text"
          />
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <h1>Checkout</h1>
      <section>
        <h2>Contact Information</h2>
        <div>
          <label htmlFor="first-name">First Name</label>
          <input
            name="firstName"
            className="input"
            onChange={handleChange}
            value={inputs.firstName}
            id="first-name"
            autoComplete="first-name"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name</label>
          <input
            name="lastName"
            onChange={handleChange}
            value={inputs.lastName}
            autoComplete="last-name"
            className="input"
            id="last-name"
            type="text"
          />
        </div>
      </section>
      <section>
        <h2>Shipping Information</h2>
        {AddressInfo}
      </section>

      <section>
        <h2>Billing Information</h2>

        <label
          style={{
            width: "100%",
            fontWeight: "normal",
            fontFamily: "Fredoka",
          }}
          htmlFor="billing-same-as-shipping"
        >
          <input
            checked={addressIsSame}
            onChange={(e) => setAddressIsSame(e.target.checked)}
            id="billing-same-as-shipping"
            type="checkbox"
          />
          Billing address is same as shipping address
        </label>
        {!addressIsSame && AddressInfo}

        <div className="flex-content">
          <div>
            <label htmlFor="card-number">Card Number*</label>
            <input
              onChange={handleChange}
              className="input"
              name="cardNumber"
              autoComplete="card-number"
              id="card-number"
              type="text"
            />
          </div>
          <div style={{ flex: 0.2 }}>
            <label htmlFor="exp-date">Expiration Date*</label>
            <input
              onChange={handleChange}
              name="expirationDate"
              className="input"
              id="expiration-date"
              autoComplete="expiration-date"
              type="date"
            />
          </div>
        </div>
        <div className="flex-content">
          <div>
            <label htmlFor="card-holder">Card Holder*</label>
            <input
              onChange={handleChange}
              autoComplete="card-holder"
              name="cardHolder"
              className="input"
              id="card-holder"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="cvv">CVV*</label>
            <input
              onChange={handleChange}
              autoComplete="cvv"
              name="cvv"
              className="input"
              id="cvv"
              type="text"
            />
          </div>
        </div>
      </section>

      <div className="order-summary-box">
        <h2>Order Summary</h2>
        <div className="content-grid">
          {cart.map((item) => (
            <ProductCartItem product={item} />
          ))}
        </div>

        <div className="details">
          <div className="details-flex details-border">
            <h4>Subtotal:</h4>

            <p>{formatCurrency(getSubtotal())}</p>
          </div>
          <div className="details-border">
            <div className="details-flex">
              <h4>Shipping:</h4>
              <p>{shipping === 0 ? "Free" : formatCurrency(shipping)}</p>
            </div>

            {!showShippingOptions ? (
              <button
                onClick={() => setShowShippingOptions(true)}
                className="button-underlined"
              >
                Edit Shipping
              </button>
            ) : (
              <div>
                <div className="shipping-options">
                  <label id="standard" className="radio-btn">
                    4-7 Business Days - Standard - Free
                    <input name="shipping" type="radio" />
                    <span className="checkmark" />
                  </label>

                  <label id="expedited" className="radio-btn">
                    3-4 Business Days - Expedited - $9.99
                    <input name="shipping" type="radio" />
                    <span className="checkmark" />
                  </label>
                  <label id="priority" className="radio-btn">
                    2 Business Days - Priority - $17.99
                    <input name="shipping" type="radio" />
                    <span className="checkmark" />
                  </label>

                  <label id="overnight" className="radio-btn">
                    1 Business Day - Overnight - $27.99
                    <input name="shipping" type="radio" />
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="order-actions">
                  <button
                    onClick={() => setShowShippingOptions(false)}
                    className="button-secondary"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      const input = document.querySelector(
                        ".radio-btn input:checked"
                      );
                      if (!input) {
                        return;
                      }
                      // if (input.parentElement.id === "standard") {
                      //   setShipping(0);
                      // } else if (input.parentElement.id === "expedited") {
                      //   setShipping(9.99);
                      // } else if (input.parentElement.id === "priority") {
                      //   setShipping(17.99);
                      // } else if (input.parentElement.id === "overnight") {
                      //   setShipping(27.99);
                      // }
                      setShowShippingOptions(false);
                    }}
                    className="button-primary"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="details-border">
            <div className="details-flex">
              <h4>Discount:</h4>
              <p>{formatCurrency(discount)}</p>
            </div>

            {!showDiscountOptions ? (
              <button
                className="button-underlined"
                onClick={() => setShowDiscountOptions(true)}
              >
                Add Promo Code
              </button>
            ) : (
              <div>
                <input
                  className="input"
                  id="promo-code"
                  placeholder="PROMO CODE"
                  type="text"
                />
                <div className="order-actions">
                  <button
                    className="button-secondary"
                    onClick={() => setShowDiscountOptions(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    onClick={() => {
                      const code = document.getElementById("promo-code");

                      if (code?.nodeValue === "MYSTERYDEAL") {
                        setDiscount(-(subtotal * 0.1));
                        setShowDiscountOptions(false);
                      }
                    }}
                    className="button-primary"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="details-flex details-border">
            <h4>Tax:</h4>
            <p>{formatCurrency(tax)}</p>
          </div>

          <div className="details-flex details-border">
            <h4>Order Total:</h4>
            <p>{formatCurrency(subtotal + tax + shipping + discount)}</p>
          </div>
        </div>

        <button
          style={{ width: "100%" }}
          className={
            completedSections.length >= 3 ? "button-primary" : "button-disabled"
          }
        >
          Place Order
        </button>
        <p style={{ color: "gray", marginTop: "20px" }}>
          This is just a fictional e-commerce website made for educational
          purposes. The data you enter will not actually be collected or seen
          upon submitting this form.
        </p>
      </div>
    </div>
  );
};

export default Checkout;
