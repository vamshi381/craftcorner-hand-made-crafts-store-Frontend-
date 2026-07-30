import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "../assets/images/login.jpg";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [confirmResetPassword, setConfirmResetPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const url = "https://craftcorner-hand-made-crafts-store.onrender.com/users";

  const generateToken = () => {
    return Math.random().toString(36).substring(2);
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {

      const res = await axios.get(url);

      const user = res.data.find(
        (u) =>
          u.email === email &&
          u.password === password
      );

      if (!user) {
        alert("Invalid Email or Password");
        return;
      }

      const token = generateToken();

      // Save Login Data
      const userData = JSON.stringify(user);
      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", userData);
      localStorage.setItem("user", userData);

      // Redux
      dispatch(
        login({
          user,
          token,
        })
      );

      alert("Login Successful");

      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

    } catch (error) {

      console.error(error);

      alert("Server Error");

    }

  };

  const handleForgotPassword = async (e) => {

    e.preventDefault();

    if (!resetEmail || !resetPassword || !confirmResetPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (resetPassword !== confirmResetPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {

      const res = await axios.get(url);
      const user = res.data.find(
        (u) => u.email.toLowerCase() === resetEmail.toLowerCase()
      );

      if (!user) {
        alert("No account found with this email.");
        return;
      }

      const updatedUser = {
        ...user,
        password: resetPassword,
      };

      await axios.put(`${url}/${user.id}`, updatedUser);

      alert("Password updated successfully. You can now login with your new password.");

      setShowForgotPassword(false);
      setResetEmail("");
      setResetPassword("");
      setConfirmResetPassword("");

    } catch (error) {
      console.error(error);
      alert("Failed to update password.");
    }

  };

  return (

    <div className="login-container">

      {/* Left */}

      <div className="login-left">

        <h1>CraftCorner</h1>

        <h2>Welcome Back!</h2>

        <p>
          Discover unique handmade creations crafted with love.
          Login to continue shopping.
        </p>

        <img
          src={loginImage}
          alt="Login"
          className="img-fluid"
        />

      </div>

      {/* Right */}

      <div className="login-right">

        <div className="login-card">

          <h2>Login</h2>

          <p>Login to your CraftCorner account</p>

          <form onSubmit={handleLogin}>

            <div className="form-group">

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>

            <button
              type="submit"
              className="login-btn"
            >
              Login
            </button>

          </form>

          <button
            type="button"
            className="forgot-password-link"
            onClick={() => setShowForgotPassword(true)}
          >
            Forgot Password?
          </button>

          {showForgotPassword && (
            <form className="forgot-password-form" onSubmit={handleForgotPassword}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmResetPassword}
                  onChange={(e) => setConfirmResetPassword(e.target.value)}
                />
              </div>

              <div className="forgot-password-actions">
                <button type="submit" className="login-btn">
                  Update Password
                </button>
                <button
                  type="button"
                  className="login-btn secondary-btn"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetEmail("");
                    setResetPassword("");
                    setConfirmResetPassword("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="bottom-text">

            Don't have an account?

            <Link to="/register">
              Register
            </Link>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Login;