import axios from "axios";

const API_URL = "https://craftcorner-hand-made-crafts-store.onrender.com/contacts";

// Get All Messages
export const getAllContacts = async () => {

    const response = await axios.get(API_URL);

    return response.data;

};

// Delete Message
export const deleteContact = async (id) => {

    await axios.delete(`${API_URL}/${id}`);

};

// Get Single Message
export const getContactById = async (id) => {

    const response = await axios.get(`${API_URL}/${id}`);

    return response.data;

};