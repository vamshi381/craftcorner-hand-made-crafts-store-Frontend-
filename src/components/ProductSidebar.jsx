import React from "react";
import "../styles/productSidebar.css";

const ProductSidebar = ({

    showFilters,
    setShowFilters,

    search,
    setSearch,

    category,
    setCategory,

    price,
    setPrice,

    rating,
    setRating,

    sort,
    setSort

}) => {

    return (

        <>

            {/* Overlay */}

            {

                showFilters && (

                    <div

                        className="sidebar-overlay"

                        onClick={() => setShowFilters(false)}

                    ></div>

                )

            }

            <aside

                className={`product-sidebar ${showFilters ? "show" : ""}`}

            >

                {/* Close Button */}

                <button

                    className="close-sidebar"

                    onClick={() => setShowFilters(false)}

                >

                    ✕

                </button>

                <h3>Filters</h3>

                {/* Search */}

                <div className="sidebar-section">

                    <h4>Search</h4>

                    <input

                        type="text"

                        placeholder="Search products..."

                        value={search}

                        onChange={(e) =>

                            setSearch(e.target.value)

                        }

                    />

                </div>

                {/* Categories */}

                <div className="sidebar-section">

                    <h4>Categories</h4>

                    {

                        [

                            "All",

                            "Pottery",

                            "Jewelry",

                            "Candles",

                            "Crochet",

                            "Resin Art",

                            "Home Decor"

                        ].map(item => (

                            <label key={item}>

                                <input

                                    type="radio"

                                    name="category"

                                    checked={category === item}

                                    onChange={() =>

                                        setCategory(item)

                                    }

                                />

                                {item}

                            </label>

                        ))

                    }

                </div>

                {/* Price */}

                <div className="sidebar-section">

                    <h4>Price</h4>

                    <label>

                        <input

                            type="radio"

                            name="price"

                            checked={price === "all"}

                            onChange={() => setPrice("all")}

                        />

                        All Prices

                    </label>

                    <label>

                        <input

                            type="radio"

                            name="price"

                            checked={price === "0-500"}

                            onChange={() => setPrice("0-500")}

                        />

                        Under ₹500

                    </label>

                    <label>

                        <input

                            type="radio"

                            name="price"

                            checked={price === "500-1000"}

                            onChange={() => setPrice("500-1000")}

                        />

                        ₹500 - ₹1000

                    </label>

                    <label>

                        <input

                            type="radio"

                            name="price"

                            checked={price === "1000-2000"}

                            onChange={() => setPrice("1000-2000")}

                        />

                        ₹1000 - ₹2000

                    </label>

                    <label>

                        <input

                            type="radio"

                            name="price"

                            checked={price === "2000+"}

                            onChange={() => setPrice("2000+")}

                        />

                        Above ₹2000

                    </label>

                </div>

                {/* Rating */}

                <div className="sidebar-section">

                    <h4>Customer Rating</h4>

                    <label>

                        <input

                            type="radio"

                            name="rating"

                            checked={rating === 0}

                            onChange={() => setRating(0)}

                        />

                        All Ratings

                    </label>

                    <label>

                        <input

                            type="radio"

                            name="rating"

                            checked={rating === 4}

                            onChange={() => setRating(4)}

                        />

                        ⭐⭐⭐⭐ & Above

                    </label>

                    <label>

                        <input

                            type="radio"

                            name="rating"

                            checked={rating === 3}

                            onChange={() => setRating(3)}

                        />

                        ⭐⭐⭐ & Above

                    </label>

                    <label>

                        <input

                            type="radio"

                            name="rating"

                            checked={rating === 2}

                            onChange={() => setRating(2)}

                        />

                        ⭐⭐ & Above

                    </label>

                </div>

                {/* Sort */}

                <div className="sidebar-section">

                    <h4>Sort By</h4>

                    <select

                        value={sort}

                        onChange={(e) =>

                            setSort(e.target.value)

                        }

                    >

                        <option value="default">Default</option>

                        <option value="low">Price Low → High</option>

                        <option value="high">Price High → Low</option>

                        <option value="rating">Highest Rating</option>

                        <option value="az">A-Z</option>

                        <option value="za">Z-A</option>

                    </select>

                </div>

                {/* Reset */}

                <button

                    className="reset-btn"

                    onClick={() => {

                        setSearch("");

                        setCategory("All");

                        setPrice("all");

                        setRating(0);

                        setSort("default");

                    }}

                >

                    🔄 Reset Filters

                </button>

            </aside>

        </>

    );

};

export default ProductSidebar;