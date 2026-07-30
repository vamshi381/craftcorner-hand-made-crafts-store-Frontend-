import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  getWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

import {
  addToCart,
  getCart,
} from "../services/cartService";

import { setWishlist as setWishlistState } from "../redux/slices/wishlistSlice";
import { setCart } from "../redux/slices/cartSlice";

import "../styles/wishlist.css";

const Wishlist = () => {

  const dispatch = useDispatch();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {

    try {

      const data = await getWishlist();

      setWishlist(data);

      dispatch(setWishlistState(data));

    } catch (error) {

      console.log(error);

    }

  };

  // Remove Product

  const handleRemove = async (id) => {

    await removeFromWishlist(id);

    const updatedWishlist = await getWishlist();

    setWishlist(updatedWishlist);

    dispatch(setWishlistState(updatedWishlist));

  };

  // Move To Cart

 const handleMoveToCart = async (product) => {

  try {

    await addToCart(product);

    await removeFromWishlist(product.id);

    const wishlist = await getWishlist();
    setWishlist(wishlist);
    dispatch(setWishlist(wishlist));

    const cart = await getCart();
    dispatch(setCart(cart));

    alert(product.name + " moved to Cart.");

  } catch (error) {

    console.log(error);

  }

};
  return (
    <section className="wishlist-page">

      <div className="container">

        <h2 className="wishlist-title">
          ❤️ My Wishlist
        </h2>

        {
          wishlist.length === 0 ? (

            <div className="empty-wishlist">

              <h3>Your Wishlist is Empty</h3>

              <p>
                Save your favourite handmade products.
              </p>

              <Link to="/products">

                <button className="shop-btn">
                  Shop Now
                </button>

              </Link>

            </div>

          ) : (

            <div className="wishlist-grid">

              {
                wishlist.map((product) => (

                  <div
                    className="wishlist-card"
                    key={product.id}
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <div className="wishlist-info">

                      <span>{product.category}</span>

                      <h3>{product.name}</h3>

                      <p>
                        {"⭐".repeat(Math.floor(product.rating))}
                      </p>

                      <h2>₹{product.price}</h2>

                      <div className="wishlist-buttons">

                        <button
                          className="cart-btn"
                          onClick={() => handleMoveToCart(product)}
                        >
                          Move To Cart
                        </button>

                        <button
                          className="remove-btn"
                          onClick={() => handleRemove(product.id)}
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </div>

                ))
              }

            </div>

          )
        }

      </div>

    </section>
  );
};

export default Wishlist;