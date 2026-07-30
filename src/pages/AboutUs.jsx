import React from "react";
import { Link } from "react-router-dom";
import "../styles/aboutUs.css";

const AboutUs = () => {

  return (

    <section className="about-page">

      <div className="about-hero">

        <h1>About CraftCorner</h1>

        <p>
          Connecting passionate artisans with craft lovers across the world.
        </p>

      </div>

      {/* Story */}

      <div className="about-story container">

        <div className="story-image">

          <img
            src="https://i.pinimg.com/control1/1200x/29/1f/ed/291fed27d9eb0b8f520b778dad94da76.jpg"
            alt="Craft Artisans"
          />

        </div>

        <div className="story-content">

          <h2>Our Story</h2>

          <p>

            CraftCorner began with a simple dream — to help talented
            local artisans showcase their handmade creations to people
            around the world.

          </p>

          <p>

            Every product is carefully handcrafted with love,
            creativity, and attention to detail.

          </p>

        </div>

      </div>

      {/* Why Choose */}

      <div className="why-us">

        <div className="container">

          <h2>Why Choose CraftCorner?</h2>

          <div className="features">

            <div>🏺 Handmade Products</div>

            <div>👨‍🎨 Skilled Artisans</div>

            <div>🌿 Eco-Friendly</div>

            <div>🔒 Secure Shopping</div>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="stats container">

        <div className="stat">

          <h2>500+</h2>

          <p>Products</p>

        </div>

        <div className="stat">

          <h2>150+</h2>

          <p>Artisans</p>

        </div>

        <div className="stat">

          <h2>2000+</h2>

          <p>Happy Customers</p>

        </div>

        <div className="stat">

          <h2>25+</h2>

          <p>Categories</p>

        </div>

      </div>

      {/* CTA */}

      <div className="about-cta">

        <h2>Discover Handmade Excellence</h2>

        <p>

          Browse unique handcrafted collections made with passion.

        </p>

        <Link to="/products">

          <button>

            Shop Now

          </button>

        </Link>

      </div>

    </section>

  );

};

export default AboutUs;