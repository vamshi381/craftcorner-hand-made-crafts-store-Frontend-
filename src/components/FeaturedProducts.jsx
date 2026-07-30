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
import "../styles/featuredProducts.css";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://craftcorner-hand-made-crafts-store.onrender.com/products")
      .then((res) => {
        const featured = res.data.filter(
          (product) => product.featured === true
        );

        setProducts(featured);
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
    <section className="featured">
      <div className="container">

        <h2 className="section-title">
          Featured Products
        </h2>

        <p className="section-subtitle">
          Our most loved handmade crafts.
        </p>

        <div className="product-grid">

          {products.map((product) => (

            <div className="product-card" key={product.id}>

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
                  <FaRegHeart />
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

export default FeaturedProducts;