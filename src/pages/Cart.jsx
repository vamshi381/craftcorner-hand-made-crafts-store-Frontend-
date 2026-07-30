// ==========================================
// Cart Page
// ==========================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "../styles/cart.css";

import {
  getCart,
  updateQuantity,
  removeFromCart,
} from "../services/cartService";

import { setCart as setCartState } from "../redux/slices/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cart, setCart] = useState([]);

  // ==========================================
  // Load Cart
  // ==========================================

  const loadCart = async () => {
    try {
      const data = await getCart();

      const updatedCart = Array.isArray(data) ? data : [];

      setCart(updatedCart);

      // Update Redux so navbar count stays in sync
      dispatch(setCartState(updatedCart));
    } catch (error) {
      console.error(error);

      setCart([]);

      dispatch(setCartState([]));
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // ==========================================
  // Increase Quantity
  // ==========================================

  const increaseQty = async (item) => {
    try {
      await updateQuantity(item.id, item.quantity + 1);

      await loadCart();
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================================
  // Decrease Quantity
  // ==========================================

  const decreaseQty = async (item) => {
    try {
      if (item.quantity === 1) {
        await removeFromCart(item.id);
      } else {
        await updateQuantity(
          item.id,
          item.quantity - 1
        );
      }

      await loadCart();
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================================
  // Remove Item
  // ==========================================

  const removeItem = async (id) => {
    try {
      await removeFromCart(id);

      await loadCart();
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================================
  // Totals
  // ==========================================

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.05;

  const delivery = subtotal > 0 ? 0 : 0;

  const total = subtotal + tax + delivery;

  // ==========================================
  // UI
  // ==========================================

  return (
    <section className="cart-page">

      <div className="container">

        <h2 className="cart-title">
          🛒 Shopping Cart
        </h2>

        {cart.length === 0 ? (

          <div className="empty-cart">

            <h3>Your Cart is Empty</h3>

            <p>
              Add products to your cart.
            </p>

          </div>

        ) : (

          <div className="cart-layout">

            {/* Cart Items */}

            <div className="cart-items">

              {cart.map((item) => (

                <div
                  className="cart-card"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-info">

                    <span>
                      {item.category}
                    </span>

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      {"⭐".repeat(
                        Math.floor(item.rating || 0)
                      )}
                    </p>

                    <h2>
                      ₹{item.price}
                    </h2>

                    {/* Quantity */}

                    <div className="qty-box">

                      <button
                        onClick={() =>
                          decreaseQty(item)
                        }
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(item)
                        }
                      >
                        +
                      </button>

                    </div>

                    {/* Remove */}

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeItem(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* Order Summary */}

            <div className="summary">

              <h3>Order Summary</h3>

              <div>
                <span>Subtotal</span>
                <span>
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              <div>
                <span>Delivery</span>
                <span>FREE</span>
              </div>

              <div>
                <span>Tax</span>
                <span>
                  ₹{tax.toFixed(2)}
                </span>
              </div>

              <hr />

              <div className="total">
                <span>Total</span>
                <span>
                  ₹{total.toFixed(2)}
                </span>
              </div>

              <button
                className="checkout-btn"
                onClick={() =>
                  navigate("/checkout")
                }
              >
                Proceed To Checkout
              </button>

            </div>

          </div>

        )}

      </div>

    </section>
  );
};

export default Cart;