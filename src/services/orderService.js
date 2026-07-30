// ==========================================
// Order Service
// ==========================================

import axios from "axios";

const API_URL = "https://craftcorner-hand-made-crafts-store.onrender.com/orders";

// ==========================================
// Current User
// ==========================================

const getCurrentUser = () => {
    const storedUser = localStorage.getItem("currentUser") || localStorage.getItem("currentuser");

    if (!storedUser) return null;

    try {
        return JSON.parse(storedUser);
    } catch (error) {
        console.error("Failed to parse current user from storage", error);
        return null;
    }
};

// ==========================================
// Place Order
// ==========================================

export const placeOrder = async (order) => {

    const currentUser = getCurrentUser();

    if (!currentUser && !order?.userId) {
        alert("Please login first.");
        return;
    }

    const orderData = {
        ...order,
        userId: order?.userId || currentUser?.id,
    };

    const response = await axios.post(API_URL, orderData);

    return response.data;
};

// ==========================================
// Get Logged-in User Orders
// ==========================================

export const getOrders = async () => {

    const currentUser = getCurrentUser();

    if (!currentUser) return [];

    const response = await axios.get(
        `${API_URL}?userId=${currentUser.id}`
    );

    return response.data;
};

// ==========================================
// Get Single Order
// ==========================================

export const getOrderById = async (id) => {

    const response = await axios.get(
        `${API_URL}/${id}`
    );

    return response.data;
};

// ==========================================
// Cancel Order
// ==========================================

export const cancelOrder = async (id) => {

    await axios.patch(
        `${API_URL}/${id}`,
        {
            status: "Cancelled",
        }
    );

};

// ==========================================
// Delete Order
// ==========================================

export const deleteOrder = async (id) => {

    await axios.delete(`${API_URL}/${id}`);

};