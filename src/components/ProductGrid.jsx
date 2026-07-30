import React from "react";
import ProductCard from "./ProductCard";
import { addToCart } from "../services/cartService";
import { addToWishlist } from "../services/wishlistService";

const ProductGrid = ({ products }) => {

    return(

        <div className="products-content">

            <div className="products-header">

                <h2>All Products</h2>

                <p>
                    {products.length} Products Found
                </p>

            </div>

            <div className="products-grid">

                {

                    products.map(product=>(

                       <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                        onAddToWishlist={addToWishlist}
                        />

                    ))

                }

            </div>

        </div>

    );

};

export default ProductGrid;