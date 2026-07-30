import React from "react";
import "../styles/admin.css";

const AdminNavbar = ({
    sidebarOpen,
    setSidebarOpen
}) => {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <header className="admin-navbar">

            <div className="admin-left">

                <button

                    className="menu-btn"

                    onClick={() =>

                        setSidebarOpen(!sidebarOpen)

                    }

                >

                    ☰

                </button>

                <h3>

                    Admin Dashboard

                </h3>

            </div>

            <div className="admin-user">

                <img

                    src={user?.profileImage}

                    alt="Admin"

                />

                <div>

                    <h5>{user?.name}</h5>

                    <span>Administrator</span>

                </div>

            </div>

        </header>

    );

};

export default AdminNavbar;