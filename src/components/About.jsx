// ==========================================
// About CraftCorner
// ==========================================

import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "../styles/about.css";

const About = () => {
  return (
    <section className="about">

      <div className="container about-container">

        {/* Left Side Image */}

        <div className="about-image">

          <img
            src="https://i.pinimg.com/control1/1200x/b3/16/db/b316dbd93456b04098d086b68ba77194.jpg"
            alt="CraftCorner"
          />

        </div>

        {/* Right Side Content */}

        <div className="about-content">

          <span className="about-tag">
            ABOUT CRAFTCORNER
          </span>

          <h2>
            Handmade with Passion,
            Crafted for Every Home
          </h2>

          <p>
            CraftCorner brings together talented artisans and customers
            who love unique handmade products. Every purchase supports
            local craftsmanship and celebrates creativity.
          </p>

          <div className="about-features">

            <div className="feature">
              ✔ Handmade
            </div>

            <div className="feature">
              ✔ Premium Quality
            </div>

            <div className="feature">
              ✔ Eco-Friendly
            </div>

            <div className="feature">
              ✔ Fast Delivery
            </div>

          </div>

          <Link to="/products" className="about-link">
              <button className="about-btn">
                Explore More<FaArrowRight/>
              </button>
          </Link>

        </div>

      </div>

    </section>
  );
};

export default About;