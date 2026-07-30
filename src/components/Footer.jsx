import React from "react";
import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from "react-icons/fa";

import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Left */}

        <div className="footer-column">

          <h2 className="footer-logo">
            CRAFT<span>CORNER</span>
          </h2>

          <p className="footer-text">
            Connecting passionate artisans with craft lovers worldwide.
            Discover unique handmade pottery, jewelry, crochet,
            resin art and beautiful home décor made with love.
          </p>

          <div className="social-icons">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaPinterestP />
            </a>

            <a href="#">
              <FaYoutube />
            </a>

          </div>

        </div>

        {/* Quick Links */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/products">All Products</Link>

          <Link to="/about">About Us</Link>

          <Link to="/contact">Contact</Link>

          <Link to="/wishlist">Wishlist</Link>

          <Link to="/cart">Shopping Cart</Link>

        </div>

        {/* Categories */}

        <div className="footer-column">

          <h3>Craft Categories</h3>

          <Link to="/products?category=Pottery">
            Pottery & Ceramics
          </Link>

          <Link to="/products?category=Crochet">
            Handmade Crochet
          </Link>

          <Link to="/products?category=Candles">
            Aromatherapy Candles
          </Link>

          <Link to="/products?category=Jewelry">
            Handmade Jewelry
          </Link>

          <Link to="/products?category=Resin Art">
            Resin Artwork
          </Link>

        </div>

        {/* Contact */}

        <div className="footer-column">

          <h3>Need Help?</h3>

          <p>
            <FaMapMarkerAlt />
            Hyderabad, Telangana
          </p>

          <p>
            <FaEnvelope />
            support@craftcorner.com
          </p>

          <p>
            <FaPhoneAlt />
            +91 98765 43210
          </p>

        </div>

      </div>

      <hr />

      <div className="footer-bottom">

        © 2026 CraftCorner. Handmade with ❤️ in India. All Rights Reserved.

      </div>

    </footer>
  );
};

export default Footer;