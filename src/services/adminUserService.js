import axios from "axios";

const API_URL = "https://craftcorner-hand-made-crafts-store.onrender.com/users";

// Get All Users
export const getAllUsers = async () => {

    const response = await axios.get(API_URL);

    return response.data;

};

// Delete User
export const deleteUser = async (id) => {

    await axios.delete(`${API_URL}/${id}`);

};

// Get User By Id
export const getUserById = async (id) => {

    const response = await axios.get(`${API_URL}/${id}`);

    return response.data;

};