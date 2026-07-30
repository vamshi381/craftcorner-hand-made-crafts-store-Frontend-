// ==========================================
// Offer Banner Component
// ==========================================

import React from "react";
import { Link } from "react-router-dom";
import "../styles/offerBanner.css";

const OfferBanner = () => {
  return (
    <section className="offer-banner">

      <div className="offer-overlay">

        <div className="offer-content">

          <span className="offer-tag">
            Limited Time Offer
          </span>

          <h2>
            Handmade Happiness
          </h2>

          <h1>
            Up to 40% OFF
          </h1>

          <p>
            Discover beautiful handcrafted products made with love.
            Shop now and save on exclusive collections.
          </p>

          <Link to="/products">
            <button className="offer-btn">
              Shop Now
            </button>
          </Link>

        </div>

      </div>

    </section>
  );
};

export default OfferBanner;