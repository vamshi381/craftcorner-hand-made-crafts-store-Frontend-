import axios from "axios";

const API_URL = "https://craftcorner-hand-made-crafts-store.onrender.com/categories";

// Get All Categories
export const getCategories = async () => {

    const response = await axios.get(API_URL);

    return response.data;

};

// Add Category
export const addCategory = async (category) => {

    const response = await axios.post(API_URL, category);

    return response.data;

};

// Update Category
export const updateCategory = async (id, category) => {

    const response = await axios.put(

        `${API_URL}/${id}`,

        category

    );

    return response.data;

};

// Delete Category
export const deleteCategory = async (id) => {

    await axios.delete(`${API_URL}/${id}`);

};