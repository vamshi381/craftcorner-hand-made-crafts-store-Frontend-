// ==========================================
// Contact Service
// ==========================================

import axios from "axios";

const API_URL = "https://craftcorner-hand-made-crafts-store.onrender.com/contacts";

// ==========================================
// Get Current User
// ==========================================

const getCurrentUser = () => {

    return JSON.parse(localStorage.getItem("user"));

};

// ==========================================
// Submit Contact Message
// ==========================================

export const submitContact = async (form) => {

    const currentUser = getCurrentUser();

    const contact = {

        userId: currentUser ? currentUser.id : null,

        name: form.name,

        email: form.email,

        subject: form.subject,

        message: form.message,

        date: new Date().toLocaleString(),

        status: "Unread"

    };

    const response = await axios.post(API_URL, contact);

    return response.data;

};

// ==========================================
// Get All Contact Messages
// (Useful for Admin Panel later)
// ==========================================

export const getAllContacts = async () => {

    const response = await axios.get(API_URL);

    return response.data;

};