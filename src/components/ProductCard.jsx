// ==========================================
// Product Card
// ==========================================

import React from "react";
import { Link } from "react-router-dom";


import {
    FaShoppingCart,
    FaRegHeart,
    FaEye
} from "react-icons/fa";

import "../styles/productCard.css";

const ProductCard = ({
    product,
    onAddToCart,
    onAddToWishlist
}) => {

    return (

        <div className="product-card">

            <button
                className="wishlist-btn"
                onClick={() => onAddToWishlist(product)}
            >

                <FaRegHeart />

            </button>

            

                <img
                    src={product.image}
                    alt={product.name}
                />

            

            <div className="product-info">

                <span className="category">

                    {product.category}

                </span>

                <h3>

                    {product.name}

                </h3>

                <div className="rating">

                    ⭐⭐⭐⭐⭐

                    <span>

                        ({product.rating})

                    </span>

                </div>

                <div className="price">

                    ₹{product.price}

                </div>

                <div className="product-actions">

                   <button
                        className="cart-btn"
                        onClick={() => onAddToCart(product)}
                    >

                        <FaShoppingCart />

                        Add To Cart

                    </button>

                    <Link
                        to={`/product/${product.id}`}
                        className="view-btn"
                    >

                        <FaEye />

                        View

                    </Link>

                </div>

            </div>

        </div>

    );

};

export default ProductCard;