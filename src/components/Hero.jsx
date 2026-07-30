import React from "react";
import { Link } from "react-router-dom";
import "../styles/hero.css";
import heroImage from "../assets/images/hero.png";

const Hero = () => {
  return (
    <section className="hero">

      {/* Left Content */}

      <div className="hero-content">

        <h1>
          Handmade Crafts
          <br />
          Made With Love ❤️
        </h1>

        <p>
          Discover beautiful handmade products crafted by talented artisans.
          Shop unique gifts, home décor, jewelry, pottery, candles, and much
          more only at CraftCorner.
        </p>

        <div className="hero-buttons">

          <Link to="/products">
            <button className="shop-btn">
              Shop Now
            </button>
          </Link>

          <Link to="/about">
            <button className="about-btn">
              Learn More
            </button>
          </Link>

        </div>

      </div>

      {/* Right Image */}

      <div className="hero-image">

        <img
          src={heroImage}
          alt="CraftCorner Hero"
        />

      </div>

    </section>
  );
};

export default Hero;