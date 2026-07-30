import axios from "axios";

const API_URL = "https://craftcorner-hand-made-crafts-store.onrender.com/orders";

// Get All Orders
export const getAllOrders = async () => {

    const response = await axios.get(API_URL);

    return response.data;

};

// Update Order Status
export const updateOrderStatus = async (id, status) => {

    const response = await axios.patch(

        `${API_URL}/${id}`,

        { status }

    );

    return response.data;

};

// Delete Order
export const deleteOrder = async (id) => {

    await axios.delete(`${API_URL}/${id}`);

};

// Get Order By Id
export const getOrderById = async (id) => {

    const response = await axios.get(`${API_URL}/${id}`);

    return response.data;

};