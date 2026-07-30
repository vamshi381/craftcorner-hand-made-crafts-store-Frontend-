// ==========================================
// Latest Products Component
// Displays Latest Products
// ==========================================

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { addToCart } from "../services/cartService";
import { addToWishlist } from "../services/wishlistService";
import {
    FaShoppingCart,
    FaRegHeart,
    FaEye
} from "react-icons/fa";
import "../styles/latestProducts.css";

const LatestProducts = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://craftcorner-hand-made-crafts-store.onrender.com/products")
      .then((res) => {
        const latestProducts = res.data.filter(
          (product) => product.latest === true
        );

        setProducts(latestProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product);
      alert(`${product.name} added to Cart 🛒`);
    } catch (error) {
      console.error(error);
      alert("Unable to add product to cart.");
    }
  };

  const handleAddToWishlist = async (product) => {
    try {
      await addToWishlist(product);
      alert(`${product.name} added to Wishlist ❤️`);
    } catch (error) {
      console.error(error);
      alert("Unable to add product to wishlist.");
    }
  };

  return (
    <section className="latest">
      <div className="container">
        <div className="latest-header">
          <div>
            <h2 className="section-title">
              Latest Products
            </h2>
            <p className="section-subtitle">
              Discover our newest handmade collections.
            </p>
          </div>

          <Link
            to="/products"
            className="view-all-link"
          >
            <button className="view-all-btn">
              View All →
            </button>
          </Link>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <div
              className="product-card"
              key={product.id}
            >
              <img
                src={product.image}
                alt={product.name}
              />

              <div className="product-info">
                <span className="category">
                  {product.category}
                </span>
                <h4>{product.name}</h4>
                <div className="rating">
                  {"⭐".repeat(Math.floor(product.rating))}
                </div>
                <h3>₹{product.price}</h3>

                <div className="buttons">
                  <button
                    className="cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add To Cart
                  </button>
                  <button
                    className="wishlist-btn"
                    onClick={() => handleAddToWishlist(product)}
                  >
                    <FaRegHeart/>
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="details-link"
                  >
                    <button className="details-btn">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;