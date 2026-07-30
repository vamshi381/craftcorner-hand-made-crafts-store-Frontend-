import React, { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";
import UserTable from "../components/UserTable";

import {
    getAllUsers,
    deleteUser
} from "../../services/adminUserService";

import "../styles/admin.css";

const Users = () => {

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        const data = await getAllUsers();

        setUsers(data);

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this user?"
        );

        if (!confirmDelete) return;

        await deleteUser(id);

        loadUsers();

    };

    const filteredUsers = users.filter(user =>

        user.name
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        user.email
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <AdminLayout>

            <div className="page-header">

                <h2>

                    User Management

                </h2>

            </div>

            <input

                className="search-box table-search-box"

                placeholder="Search User..."

                value={search}

                onChange={(e) =>

                    setSearch(e.target.value)

                }

            />

            <div className="table-wrapper">

                <UserTable

                    users={filteredUsers}

                    onDelete={handleDelete}

                />

            </div>

        </AdminLayout>

    );

};

export default Users;