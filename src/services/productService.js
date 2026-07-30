// ==========================================
// Product Service
// Handles all Product API Calls
// ==========================================

import axios from "axios";

// Base URL for Products API
const PRODUCT_URL = "https://craftcorner-hand-made-crafts-store.onrender.com/products";

// ==========================================
// Get All Products
// ==========================================

export const getAllProducts = async () => {
  const response = await axios.get(PRODUCT_URL);
  return response.data;
};

// ==========================================
// Get Product By ID
// ==========================================

export const getProductById = async (id) => {
  const response = await axios.get(`${PRODUCT_URL}/${id}`);
  return response.data;
};

// ==========================================
// Get Products By Category
// ==========================================

export const getProductsByCategory = async (category) => {
  const response = await axios.get(
    `${PRODUCT_URL}?category=${encodeURIComponent(category)}`
  );
  return response.data;
};

// ==========================================
// Search Products
// ==========================================

export const searchProducts = async (keyword) => {
  const response = await axios.get(PRODUCT_URL);

  return response.data.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );
};