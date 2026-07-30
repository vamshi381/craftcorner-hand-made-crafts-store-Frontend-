import React, { useEffect, useState } from "react";
import ProductSidebar from "../components/ProductSidebar";
import ProductGrid from "../components/ProductGrid";

import { getAllProducts } from "../services/productService";


import "../styles/products.css";
import { addToCart } from "../services/cartService";
import { addToWishlist } from "../services/wishlistService";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [search,setSearch]=useState("");
    const [category,setCategory]=useState("All");
    const [sort,setSort]=useState("default");
    const [price,setPrice]=useState("all");
    const [rating, setRating] = useState(0);
    const PRODUCTS_PER_PAGE = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {

        try{

            const data = await getAllProducts();

            setProducts(data);

        }

        catch(error){

            console.log(error);

        }

    };

    const filteredProducts = [...products]

.filter(product => {

    const matchesSearch =

        product.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =

        category === "All"

        ||

        product.category === category;


    const matchesPrice = (() => {

        switch(price){

            case "0-500":

                return product.price < 500;

            case "500-1000":

                return product.price >= 500 &&
                       product.price <= 1000;

            case "1000-2000":

                return product.price > 1000 &&
                       product.price <= 2000;

            case "2000+":

                return product.price > 2000;

            default:

                return true;

        }

    })();

    const matchesRating =

    product.rating >= rating;

    return (

        matchesSearch &&

        matchesCategory &&

        matchesPrice&&
        matchesRating

    );

})

.sort((a,b)=>{

    switch(sort){

        case "low":

            return a.price - b.price;

        case "high":

            return b.price - a.price;

        case "rating":

            return b.rating - a.rating;

        case "az":

            return a.name.localeCompare(b.name);

        case "za":

            return b.name.localeCompare(a.name);

        default:

            return 0;

    }

});

const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
);

const startIndex =
    (currentPage - 1) * PRODUCTS_PER_PAGE;

const currentProducts =
    filteredProducts.slice(
        startIndex,
        startIndex + PRODUCTS_PER_PAGE
    );

    useEffect(() => {

    setCurrentPage(1);

}, [

    search,

    category,

    price,

    rating,

    sort

]);

    return (

    <section className="products-page">

        <div className="products-container">

            {/* Sidebar */}

           <ProductSidebar

              showFilters={showFilters}

              setShowFilters={setShowFilters}

              search={search}
              setSearch={setSearch}

              category={category}
              setCategory={setCategory}

              price={price}
              setPrice={setPrice}

              rating={rating}
              setRating={setRating}

              sort={sort}
              setSort={setSort}

          />

            {/* Right Side */}

            <div className="products-content">

                <button
                      className="filter-toggle"
                      onClick={() => setShowFilters(true)}>
                      ☰ Filters</button>

                {/* Product Count */}

                <div className="products-count">

                    Showing

                    <strong>

                        {" "}

                        {currentProducts.length}

                    </strong>

                    of

                    <strong>

                        {" "}

                        {filteredProducts.length}

                    </strong>

                    products

                </div>

                {/* Products */}

                <ProductGrid
                    products={currentProducts}
                    onAddToCart={addToCart}
                    onAddToWishlist={addToWishlist}
                />

                {/* Pagination */}

                {

                    totalPages > 1 && (

                        <div className="pagination">

                            <button

                                disabled={currentPage === 1}

                                onClick={() =>

                                    setCurrentPage(currentPage - 1)

                                }

                            >

                                Previous

                            </button>

                            {

                                [...Array(totalPages)].map((_, index) => (

                                    <button

                                        key={index}

                                        className={

                                            currentPage === index + 1

                                                ? "active"

                                                : ""

                                        }

                                        onClick={() =>

                                            setCurrentPage(index + 1)

                                        }

                                    >

                                        {index + 1}

                                    </button>

                                ))

                            }

                            <button

                                disabled={currentPage === totalPages}

                                onClick={() =>

                                    setCurrentPage(currentPage + 1)

                                }

                            >

                                Next

                            </button>

                        </div>

                    )

                }

            </div>

        </div>

    </section>

);

};

export default Products;