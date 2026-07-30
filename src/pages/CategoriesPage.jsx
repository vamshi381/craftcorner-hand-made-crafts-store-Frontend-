// ==========================================
// Categories Page
// ==========================================

import React from "react";
import { Link } from "react-router-dom";
import "../styles/categoriesPage.css";

const categories = [
  {
    id: 1,
    name: "Pottery",
    image: "https://i.pinimg.com/1200x/54/0b/f9/540bf94b82476aefab324d79e5bb80b2.jpg",
    description: "Beautiful handmade ceramic and clay creations."
  },
  {
    id: 2,
    name: "Jewelry",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638",
    description: "Elegant handcrafted jewelry for every occasion."
  },
  {
    id: 3,
    name: "Candles",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59",
    description: "Natural scented candles crafted with love."
  },
  {
    id: 4,
    name: "Crochet",
    image: "https://i.pinimg.com/736x/1d/f9/27/1df927cbf3a816af493406a9d7dc7165.jpg",
    description: "Handmade crochet products made by skilled artisans."
  },
  {
    id: 5,
    name: "Resin Art",
    image: "https://i.pinimg.com/control1/1200x/63/b8/7b/63b87b3ef1357990c463bfe2ca494937.jpg",
    description: "Unique resin artwork and decorative pieces."
  },
  {
    id: 6,
    name: "Home Decor",
    image: "https://i.pinimg.com/736x/9e/58/c6/9e58c69b04aa9a40ec1de45c5172cb9f.jpg",
    description: "Decorate your home with handcrafted elegance."
  }
];

const Categories = () => {

  return (

    <section className="categories-page">

      <div className="container">

        <h1 className="categories-title">
          Explore Categories
        </h1>

        <p className="categories-subtitle">
          Discover handcrafted collections made by talented artisans.
        </p>

        <div className="categories-grid">

          {categories.map(category => (

            <div
              className="category-card"
              key={category.id}
            >

              <img
                src={category.image}
                alt={category.name}
              />

              <div className="category-content">

                <h3>{category.name}</h3>

                <p>{category.description}</p>

                <Link
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                >
                  <button>
                    Explore →
                  </button>
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

};

export default Categories;