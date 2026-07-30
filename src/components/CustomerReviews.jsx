// ==========================================
// Customer Reviews
// ==========================================

import React from "react";
import "../styles/customerReviews.css";

const reviews = [
  {
    id: 1,
    name: "Sophia Williams",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    review:
      "The handmade ceramic vase is absolutely beautiful. Excellent quality and fast delivery. Highly recommended!",
  },
  {
    id: 2,
    name: "James Anderson",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 5,
    review:
      "Amazing craftsmanship! The scented candles arrived perfectly packed and smell wonderful.",
  },
  {
    id: 3,
    name: "Olivia Brown",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 4,
    review:
      "Loved the resin tray. It looks premium and adds elegance to my living room.",
  },
];

const CustomerReviews = () => {
  return (
    <section className="reviews">

      <div className="container">

        <h2 className="review-title">
          What Our Customers Say
        </h2>

        <p className="review-subtitle">
          Trusted by thousands of happy customers across the country.
        </p>

        <div className="review-grid">

          {reviews.map((item) => (

            <div className="review-card" key={item.id}>

              <img
                src={item.image}
                alt={item.name}
                className="review-image"
              />

              <h3>{item.name}</h3>

              <div className="stars">
                {"⭐".repeat(item.rating)}
              </div>

              <p>"{item.review}"</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default CustomerReviews;