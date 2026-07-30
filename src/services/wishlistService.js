// ==========================================
// Wishlist Service
// ==========================================

import axios from "axios";

const API_URL = "https://craftcorner-hand-made-crafts-store.onrender.com/wishlist";

// ==========================================
// Current Logged-in User
// ==========================================

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

// ==========================================
// Get Wishlist
// ==========================================

export const getWishlist = async () => {

  const currentUser = getCurrentUser();

  if (!currentUser) return [];

  const response = await axios.get(
    `${API_URL}?userId=${currentUser.id}`
  );

  return response.data;

};

// ==========================================
// Add To Wishlist
// ==========================================

export const addToWishlist = async (product) => {

  const currentUser = getCurrentUser();

  if (!currentUser) {
    alert("Please login first.");
    return;
  }

  const response = await axios.get(
    `${API_URL}?userId=${currentUser.id}&productId=${product.id}`
  );

  if (response.data.length > 0) {

    alert("Already in Wishlist ❤️");
    return;

  }

  await axios.post(API_URL, {

    userId: currentUser.id,

    productId: product.id,

    name: product.name,

    image: product.image,

    category: product.category,

    price: product.price,

    rating: product.rating

  });

};

// ==========================================
// Remove From Wishlist
// ==========================================

export const removeFromWishlist = async (id) => {

  await axios.delete(`${API_URL}/${id}`);

};

// ==========================================
// Clear Wishlist
// ==========================================

export const clearWishlist = async () => {

  const currentUser = getCurrentUser();

  if (!currentUser) return;

  const response = await axios.get(
    `${API_URL}?userId=${currentUser.id}`
  );

  await Promise.all(

    response.data.map(item =>
      axios.delete(`${API_URL}/${item.id}`)
    )

  );

};