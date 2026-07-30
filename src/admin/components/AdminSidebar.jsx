import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../../redux/slices/authSlice";
import { clearCartState } from "../../redux/slices/cartSlice";
import { clearWishlistState } from "../../redux/slices/wishlistSlice";
import "../styles/admin.css";

const AdminSidebar = ({
    sidebarOpen,
    setSidebarOpen
}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {

        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) return;

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("currentUser");

        dispatch(logout());
        dispatch(clearCartState());
        dispatch(clearWishlistState());

        navigate("/login", { replace: true });

    };

    return (

        <>

            <div
                className={`sidebar-overlay ${
                    sidebarOpen ? "show" : ""
                }`}
                onClick={() => setSidebarOpen(false)}
            />

            <aside
                className={`admin-sidebar ${
                    sidebarOpen ? "show" : ""
                }`}
            >

                <h2>CraftCorner</h2>

                <NavLink
                    to="/admin/dashboard"
                    onClick={() => setSidebarOpen(false)}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/products"
                    onClick={() => setSidebarOpen(false)}
                >
                    Products
                </NavLink>

                <NavLink
                    to="/admin/categories"
                    onClick={() => setSidebarOpen(false)}
                >
                    Categories
                </NavLink>

                <NavLink
                    to="/admin/orders"
                    onClick={() => setSidebarOpen(false)}
                >
                    Orders
                </NavLink>

                <NavLink
                    to="/admin/users"
                    onClick={() => setSidebarOpen(false)}
                >
                    Users
                </NavLink>

                <NavLink
                    to="/admin/contacts"
                    onClick={() => setSidebarOpen(false)}
                >
                    Contacts
                </NavLink>

                {/* Logout Button */}

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <FiLogOut />
                    <span style={{ marginLeft: "8px" }}>
                        Logout
                    </span>
                </button>

            </aside>

        </>

    );

};

export default AdminSidebar;