// ==========================================
// Order Success Page
// ==========================================

import React from "react";
import { Link } from "react-router-dom";
import "../styles/orderSuccess.css";

const OrderSuccess = () => {

  return (

    <section className="order-success">

      <div className="success-card">

        <div className="success-icon">

          ✅

        </div>

        <h2>

          Order Placed Successfully!

        </h2>

        <p>

          Thank you for shopping with CraftCorner.

        </p>

        <p>

          Your handmade products will be delivered soon.

        </p>

        <div className="success-buttons">

          <Link to="/orders">

            <button className="orders-btn">

              View My Orders

            </button>

          </Link>

          <Link to="/products">

            <button className="shop-btn">

              Continue Shopping

            </button>

          </Link>

        </div>

      </div>

    </section>

  );

};

export default OrderSuccess;