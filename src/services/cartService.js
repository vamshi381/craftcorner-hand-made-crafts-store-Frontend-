// ==========================================
// Cart Service
// ==========================================

import axios from "axios";

const API_URL = "https://craftcorner-hand-made-crafts-store.onrender.com/cart";

// ==========================================
// Current Logged-in User
// ==========================================

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

// ==========================================
// Get Cart
// ==========================================

export const getCart = async () => {

  const currentUser = getCurrentUser();

  if (!currentUser) return [];

  const response = await axios.get(
    `${API_URL}?userId=${currentUser.id}`
  );

  return response.data;

};

// ==========================================
// Add To Cart
// ==========================================

export const addToCart = async (product) => {

  const currentUser = getCurrentUser();

  if (!currentUser) {
    alert("Please login first.");
    return;
  }

  const response = await axios.get(
    `${API_URL}?userId=${currentUser.id}&productId=${product.id}`
  );

  if (response.data.length > 0) {

    const existingItem = response.data[0];

    await axios.patch(
      `${API_URL}/${existingItem.id}`,
      {
        quantity: existingItem.quantity + 1,
      }
    );

  } else {

    await axios.post(API_URL, {

      userId: currentUser.id,

      productId: product.id,

      name: product.name,

      image: product.image,

      category: product.category,

      price: product.price,

      rating: product.rating,

      quantity: 1,

    });

  }

};

// ==========================================
// Update Quantity
// ==========================================

export const updateQuantity = async (id, quantity) => {

  await axios.patch(
    `${API_URL}/${id}`,
    {
      quantity,
    }
  );

};

// ==========================================
// Remove Item
// ==========================================

export const removeFromCart = async (id) => {

  await axios.delete(`${API_URL}/${id}`);

};

// ==========================================
// Clear Cart
// ==========================================

export const clearCart = async () => {

  const currentUser = getCurrentUser();

  if (!currentUser) return;

  const response = await axios.get(
    `${API_URL}?userId=${currentUser.id}`
  );

  const items = response.data;

  await Promise.all(

    items.map((item) =>
      axios.delete(`${API_URL}/${item.id}`)
    )

  );

};