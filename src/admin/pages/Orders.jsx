import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import OrderTable from "../components/OrderTable";

import {
    getAllOrders,
    updateOrderStatus,
    deleteOrder
} from "../../services/adminOrderService";

import "../styles/admin.css";

const Orders = () => {

    const [orders, setOrders] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {

        loadOrders();

    }, []);

    const loadOrders = async () => {

        try {

            const data = await getAllOrders();

            setOrders(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    // Change Status

    const handleStatusChange = async (id, status) => {

        try {

            await updateOrderStatus(id, status);

            loadOrders();

        }

        catch (error) {

            console.log(error);

        }

    };

    // Delete Order

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this order?"
        );

        if (!confirmDelete) return;

        try {

            await deleteOrder(id);

            loadOrders();

        }

        catch (error) {

            console.log(error);

        }

    };

    // Search + Filter

    const filteredOrders = orders.filter(order => {

        const matchesSearch =

            order.customer.fullName
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            order.id
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =

            statusFilter === "All"

                ? true

                : order.status === statusFilter;

        return matchesSearch && matchesStatus;

    });

    return (

        <AdminLayout>

            <div className="page-header">

                <h2>

                    Order Management

                </h2>

            </div>

            <div className="order-controls">

                <input

                    className="search-box"

                    placeholder="Search Orders..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                />

                <select

                    className="admin-select"

                    value={statusFilter}

                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }

                >

                    <option>All</option>

                    <option>Pending</option>

                    <option>Processing</option>

                    <option>Shipped</option>

                    <option>Delivered</option>

                    <option>Cancelled</option>

                </select>

            </div>

            <div className="order-table-wrapper">

                <OrderTable

                    orders={filteredOrders}

                    onStatusChange={handleStatusChange}

                    onDelete={handleDelete}

                />

            </div>

        </AdminLayout>

    );

};

export default Orders;