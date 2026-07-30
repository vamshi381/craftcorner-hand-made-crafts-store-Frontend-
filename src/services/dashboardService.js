import axios from "axios";

const BASE_URL = "https://craftcorner-hand-made-crafts-store.onrender.com";

export const getDashboardData = async () => {

    const [
        products,
        users,
        orders,
        contacts
    ] = await Promise.all([

        axios.get(`${BASE_URL}/products`),

        axios.get(`${BASE_URL}/users`),

        axios.get(`${BASE_URL}/orders`),

        axios.get(`${BASE_URL}/contacts`)

    ]);

    return {

        products: products.data,

        users: users.data,

        orders: orders.data,

        contacts: contacts.data

    };

};