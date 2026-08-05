import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/categories.css";

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        axios
            .get("https://craftcorner-hand-made-crafts-store.onrender.com/categories")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (

        <section className="categories">

            <div className="container">

                <h2 className="section-title">
                    Shop By Categories
                </h2>

                <p className="section-subtitle">
                    Explore beautiful handmade collections.
                </p>

                <div className="category-grid">

                    {categories.map((item) => (

                        <Link
                            key={item.id}
                            to={`/products?category=${item.name}`}
                            className="category-link"
                        >

                            <div className="category-card">

                                <img
                                    src={item.image}
                                    alt={item.name}
                                />

                                <h4>{item.name}</h4>

                            </div>

                        </Link>

                    ))}

                </div>

            </div>

        </section>

    );

};

export default Categories;