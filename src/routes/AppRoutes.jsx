import React from "react";
import { Routes, Route } from "react-router-dom";

// ==========================
// Public Pages
// ==========================

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import CategoriesPage from "../pages/CategoriesPage";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

// ==========================
// User Pages
// ==========================

import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";
import OrderSuccess from "../pages/OrderSuccess";
import Profile from "../pages/Profile";

// ==========================
// Admin Pages
// ==========================

import AdminRoute from "./AdminRoute";
import Dashboard from "../admin/pages/Dashboard";
import AdminProducts from "../admin/pages/Products";
import Categories from "../admin/pages/Categories";
import AdminOrders from "../admin/pages/Orders";
import Users from "../admin/pages/Users";
import Contacts from "../admin/pages/Contacts";
// ==========================
// Protected Route
// ==========================

import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {

  return (

    <Routes>

      {/* ==========================
          Public Routes
      ========================== */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/products"
        element={<Products />}
      />

      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />

      <Route
        path="/categories"
        element={<CategoriesPage />}
      />

      <Route
        path="/about"
        element={<AboutUs />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* ==========================
          User Protected Routes
      ========================== */}

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route path="/orders/:id" element={<OrderDetails />} />
      
      <Route
        path="/order-success"
        element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ==========================
    Admin Routes
========================== */}

<Route
  path="/admin/dashboard"
  element={
    <AdminRoute>
      <Dashboard />
    </AdminRoute>
  }
/>

<Route
  path="/admin/products"
  element={
    <AdminRoute>
      <AdminProducts />
    </AdminRoute>
  }
/>

<Route
  path="/admin/categories"
  element={
    <AdminRoute>
      <Categories />
    </AdminRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <AdminRoute>
      <AdminOrders />
    </AdminRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AdminRoute>
      <Users />
    </AdminRoute>
  }
/>

<Route
  path="/admin/contacts"
  element={
    <AdminRoute>
      <Contacts />
    </AdminRoute>
  }
/>

      {/* ==========================
          404 Page
      ========================== */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>

  );

};

export default AppRoutes;