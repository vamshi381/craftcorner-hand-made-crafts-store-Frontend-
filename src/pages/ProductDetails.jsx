import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { addToCart } from "../services/cartService";
import { addToWishlist } from "../services/wishlistService";
import "../styles/productDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`https://craftcorner-hand-made-crafts-store.onrender.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);

        axios
          .get("https://craftcorner-hand-made-crafts-store.onrender.com/products")
          .then((response) => {
            const related = response.data.filter(
              (item) =>
                item.category === res.data.category &&
                item.id !== res.data.id
            );
            setRelatedProducts(related.slice(0, 4));
          });
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  const handleAddToCart = async (productToAdd, quantityToAdd = 1) => {
    try {
      await addToCart(productToAdd, quantityToAdd);
      alert(`${productToAdd.name} added to cart`);
    } catch (error) {
      console.error(error);
      alert("Unable to add product to cart.");
    }
  };

  const handleAddToWishlist = async (productToAdd) => {
    try {
      await addToWishlist(productToAdd);
      alert(`${productToAdd.name} added to wishlist`);
    } catch (error) {
      console.error(error);
      alert("Unable to add product to wishlist.");
    }
  };

  return (
    <section className="product-details">
      <div className="details-container">
        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="details-info">
          <span className="badge">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="rating">
            {"⭐".repeat(Math.floor(product.rating))}
            <span>({product.reviews} Reviews)</span>
          </div>
          <h2>₹{product.price}</h2>
          <p>{product.description}</p>
          <div className="extra-info">
            <p>
              <strong>Material:</strong> {product.material}
            </p>
            <p>
              <strong>Seller:</strong> {product.seller}
            </p>
            <p>
              <strong>Delivery:</strong> {product.delivery}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock}
            </p>
          </div>
          <div className="quantity">
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <div className="action-buttons">
            <button
              className="cart-btn"
              onClick={() => handleAddToCart(product, quantity)}
            >
              Add To Cart
            </button>
            <button
              className="wishlist-btn"
              onClick={() => handleAddToWishlist(product)}
            >
              Add To Wishlist
            </button>
          </div>
        </div>
      </div>
      <div className="related-products">
        <h2>Related Products</h2>
        <div className="related-grid">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              product={relatedProduct}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;