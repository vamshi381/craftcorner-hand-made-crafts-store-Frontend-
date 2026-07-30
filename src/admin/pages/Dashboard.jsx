import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { getDashboardData } from "../../services/dashboardService";

import {
    FaBoxOpen,
    FaUsers,
    FaShoppingCart,
    FaEnvelope
} from "react-icons/fa";

import "../styles/dashboard.css";

const Dashboard = () => {

    const [stats, setStats] = useState({

        products: 0,

        users: 0,

        orders: 0,

        contacts: 0,

        revenue: 0,

        pending: 0,

        delivered: 0

    });

    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getDashboardData();

            const revenue = data.orders.reduce(

                (sum, order) => sum + order.total,

                0

            );

            const pending = data.orders.filter(

                order => order.status === "Pending"

            ).length;

            const delivered = data.orders.filter(

                order => order.status === "Delivered"

            ).length;

            setStats({

                products: data.products.length,

                users: data.users.length,

                orders: data.orders.length,

                contacts: data.contacts.length,

                revenue,

                pending,

                delivered

            });

            setRecentOrders(

                [...data.orders].reverse().slice(0,5)

            );

        }

        catch(error){

            console.log(error);

        }

    };

    return (

        <AdminLayout>

            <h2 className="dashboard-title">

                Dashboard

            </h2>

            <div className="dashboard-cards">

                <div className="dashboard-card">

                    <FaBoxOpen />

                    <h3>{stats.products}</h3>

                    <p>Products</p>

                </div>

                <div className="dashboard-card">

                    <FaUsers />

                    <h3>{stats.users}</h3>

                    <p>Users</p>

                </div>

                <div className="dashboard-card">

                    <FaShoppingCart />

                    <h3>{stats.orders}</h3>

                    <p>Orders</p>

                </div>

                <div className="dashboard-card">

                    <FaEnvelope />

                    <h3>{stats.contacts}</h3>

                    <p>Messages</p>

                </div>

                <div className="dashboard-card">

                    <h3>₹{stats.revenue.toFixed(2)}</h3>

                    <p>Total Revenue</p>

                </div>

                <div className="dashboard-card">

                    <h3>{stats.pending}</h3>

                    <p>Pending Orders</p>

                </div>

                <div className="dashboard-card">

                    <h3>{stats.delivered}</h3>

                    <p>Delivered Orders</p>

                </div>

            </div>

            <div className="recent-orders">

                <h3>Recent Orders</h3>

                <table>

                    <thead>

                        <tr>

                            <th>Order ID</th>

                            <th>Customer</th>

                            <th>Status</th>

                            <th>Total</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            recentOrders.map(order=>(

                                <tr key={order.id}>

                                    <td>{order.id}</td>

                                    <td>{order.customer.fullName}</td>

                                    <td>{order.status}</td>

                                    <td>₹{order.total.toFixed(2)}</td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </AdminLayout>

    );

};

export default Dashboard;