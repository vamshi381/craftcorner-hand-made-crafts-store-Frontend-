import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import "../styles/admin.css";

const AdminLayout = ({ children }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="admin-layout">

            <AdminSidebar

                sidebarOpen={sidebarOpen}

                setSidebarOpen={setSidebarOpen}

            />

            <div className="admin-main">

                <AdminNavbar

                    sidebarOpen={sidebarOpen}

                    setSidebarOpen={setSidebarOpen}

                />

                <div className="admin-content">

                    {children}

                </div>

            </div>

        </div>

    );

};

export default AdminLayout;