import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  Badge,
  NavDropdown,
} from "react-bootstrap";

import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaTimes,
} from "react-icons/fa";

import { logout } from "../redux/slices/authSlice";
import { setCart, clearCartState } from "../redux/slices/cartSlice";
import {
  setWishlist,
  clearWishlistState,
} from "../redux/slices/wishlistSlice";

import { getCart } from "../services/cartService";
import { getWishlist } from "../services/wishlistService";

import "../styles/navbar.css";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ============================
  // Redux State
  // ============================

  const { user, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = useSelector(
    (state) => state.cart.count
  );

  const wishlistCount = useSelector(
    (state) => state.wishlist.count
  );

  // ============================
  // Load Cart & Wishlist Count
  // ============================

  const loadCounts = async () => {
    try {
      const cart = await getCart();
      const wishlist = await getWishlist();

      dispatch(setCart(cart));
      dispatch(setWishlist(wishlist));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadCounts();
    }
  }, [isLoggedIn]);

  // ============================
  // Logout
  // ============================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");

    dispatch(logout());
    dispatch(clearCartState());
    dispatch(clearWishlistState());
    setIsMobileMenuOpen(false);

    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <Navbar
      expand="lg"
      className="custom-navbar"
      sticky="top"
    >
      <Container>

        {/* Logo */}

        <Navbar.Brand
          as={NavLink}
          to="/"
          className="logo"
        >
          CraftCorner
        </Navbar.Brand>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isMobileMenuOpen}
          className="custom-toggler"
          onClick={toggleMobileMenu}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={`mobile-menu-overlay ${isMobileMenuOpen ? "show" : ""}`}
          onClick={closeMobileMenu}
        />

        <div
          className={`mobile-menu-panel ${isMobileMenuOpen ? "show" : ""}`}
          role="dialog"
          aria-label="Mobile navigation"
        >
          <div className="mobile-menu-header">
            <h5>Menu</h5>
            <button
              type="button"
              className="mobile-menu-close"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>

          <div className="mobile-menu-body">
            <Nav className="mobile-nav-links">
              <Nav.Link as={NavLink} to="/" onClick={closeMobileMenu}>
                Home
              </Nav.Link>

              <Nav.Link as={NavLink} to="/products" onClick={closeMobileMenu}>
                Products
              </Nav.Link>

              <Nav.Link as={NavLink} to="/categories" onClick={closeMobileMenu}>
                Categories
              </Nav.Link>

              <Nav.Link as={NavLink} to="/about" onClick={closeMobileMenu}>
                About
              </Nav.Link>

              <Nav.Link as={NavLink} to="/contact" onClick={closeMobileMenu}>
                Contact
              </Nav.Link>
            </Nav>

            <Form className="search-form mobile-search-form">
              <Form.Control
                type="search"
                placeholder="Search Products..."
              />

              <Button variant="warning">
                <FaSearch />
              </Button>
            </Form>

            <div className="mobile-actions">
              <NavLink to="/wishlist" className="icon-btn" onClick={closeMobileMenu}>
                <FaHeart />
                <span>Wishlist</span>
                <Badge bg="danger">{wishlistCount}</Badge>
              </NavLink>

              <NavLink to="/cart" className="icon-btn" onClick={closeMobileMenu}>
                <FaShoppingCart />
                <span>Cart</span>
                <Badge bg="danger">{cartCount}</Badge>
              </NavLink>
            </div>

            {!isLoggedIn ? (
              <div className="auth-buttons">
                <NavLink to="/login" className="login-btn" onClick={closeMobileMenu}>
                  <FaUser className="me-2" />
                  Login
                </NavLink>

                <NavLink to="/register" className="register-btn" onClick={closeMobileMenu}>
                  Register
                </NavLink>
              </div>
            ) : (
              <div className="mobile-profile-links">
                <NavDropdown
                  title={
                    <>
                      <FaUser className="me-2" />
                      {user?.name}
                    </>
                  }
                  align="end"
                  id="mobile-profile-dropdown"
                >
                  <NavDropdown.Item as={NavLink} to="/profile" onClick={closeMobileMenu}>
                    👤 My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item as={NavLink} to="/orders" onClick={closeMobileMenu}>
                    📦 My Orders
                  </NavDropdown.Item>

                  <NavDropdown.Item as={NavLink} to="/wishlist" onClick={closeMobileMenu}>
                    ❤️ Wishlist
                  </NavDropdown.Item>

                  <NavDropdown.Item as={NavLink} to="/cart" onClick={closeMobileMenu}>
                    🛒 Cart
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={handleLogout}>🚪 Logout</NavDropdown.Item>
                </NavDropdown>
              </div>
            )}
          </div>
        </div>

        <Navbar.Collapse id="navbar-nav" className="custom-collapse">

          {/* Navigation */}

          <Nav className="mx-auto">

            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/products">
              Products
            </Nav.Link>

            <Nav.Link as={NavLink} to="/categories">
              Categories
            </Nav.Link>

            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>

            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>

          </Nav>

          {/* Search */}

          <Form className="search-form">

            <Form.Control
              type="search"
              placeholder="Search Products..."
            />

            <Button variant="warning">
              <FaSearch />
            </Button>

          </Form>

          {/* Wishlist */}

          <NavLink
            to="/wishlist"
            className="icon-btn"
          >
            <FaHeart />

            <span>Wishlist</span>

            <Badge bg="danger">
              {wishlistCount}
            </Badge>

          </NavLink>

          {/* Cart */}

          <NavLink
            to="/cart"
            className="icon-btn"
          >
            <FaShoppingCart />

            <span>Cart</span>

            <Badge bg="danger">
              {cartCount}
            </Badge>

          </NavLink>

          {/* Login / Profile */}

          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login"
                className="login-btn"
              >
                <FaUser className="me-2" />
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="register-btn"
              >
                Register
              </NavLink>
            </>
          ) : (
            <NavDropdown
              title={
                <>
                  <FaUser className="me-2" />
                  {user?.name}
                </>
              }
              align="end"
              id="profile-dropdown"
            >

              <NavDropdown.Item
                as={NavLink}
                to="/profile"
              >
                👤 My Profile
              </NavDropdown.Item>

              <NavDropdown.Item
                as={NavLink}
                to="/orders"
              >
                📦 My Orders
              </NavDropdown.Item>

              <NavDropdown.Item
                as={NavLink}
                to="/wishlist"
              >
                ❤️ Wishlist
              </NavDropdown.Item>

              <NavDropdown.Item
                as={NavLink}
                to="/cart"
              >
                🛒 Cart
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item
                onClick={handleLogout}
              >
                🚪 Logout
              </NavDropdown.Item>

            </NavDropdown>
          )}

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default NavbarComponent;