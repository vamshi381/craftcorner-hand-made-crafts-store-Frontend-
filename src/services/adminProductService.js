import axios from "axios";

const API_URL = "https://craftcorner-hand-made-crafts-store.onrender.com/products";

// Get All Products
export const getProducts = async () => {

    const response = await axios.get(API_URL);

    return response.data;
};

// Get Product By Id
export const getProductById = async (id) => {

    const response = await axios.get(`${API_URL}/${id}`);

    return response.data;
};

// Add Product
export const addProduct = async (product) => {

    const response = await axios.post(API_URL, product);

    return response.data;
};

// Update Product
export const updateProduct = async (id, product) => {

    const response = await axios.put(

        `${API_URL}/${id}`,

        product

    );

    return response.data;
};

// Delete Product
export const deleteProduct = async (id) => {

    await axios.delete(`${API_URL}/${id}`);
};