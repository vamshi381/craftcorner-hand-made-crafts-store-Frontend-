import React, { useState } from "react";
import "../styles/register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import registerImage from "../assets/images/register.jpg";

const Register = () => {

  // ==========================
  // JSON Server URL
  // ==========================
  const url = "https://craftcorner-hand-made-crafts-store.onrender.com/users";

  // ==========================
  // Navigation
  // ==========================
  const navigate = useNavigate();

  // ==========================
  // State Variables
  // ==========================
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ==========================
  // Register Function
  // ==========================
  const handleRegister = async (e) => {

    e.preventDefault();

    // Check Empty Fields
    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    // Password Match Validation
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {

      // Get Existing Users
      const response = await axios.get(url);

      // Check Duplicate Email
      const existingUser = response.data.find(
        (user) => user.email === email
      );

      if (existingUser) {
        alert("Email already exists.");
        return;
      }

      // Create New User Object
      const newUser = {

        name,
        email,
        phone,
        password,

        // Every new user will be a normal user
        role: "user",

        // Default Profile Image
        profileImage:
          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

      };

      // Save User into JSON Server
      await axios.post(url, newUser);

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }

  };

  return (

    <div className="register-container">

      {/* Left Side */}

      <div className="register-left">

        <h1>CraftCorner</h1>

        <h2>Create Your Account</h2>

        <p>

          Join CraftCorner and discover beautiful handmade crafts
          created with love.

        </p>

        <img
          src={registerImage}
          alt="Register"
          className="img-fluid"
        />

      </div>

      {/* Right Side */}

      <div className="register-right">

        <div className="register-card">

          <h2>Create Account</h2>

          <p>Register to start shopping.</p>

          <form onSubmit={handleRegister}>

            {/* Full Name */}

            <div className="form-group">

              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

            </div>

            {/* Email */}

            <div className="form-group">

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            {/* Phone Number */}

            <div className="form-group">

              <label>Phone Number</label>

              <input
                type="text"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

            </div>

            {/* Password */}

            <div className="form-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

            {/* Confirm Password */}

            <div className="form-group">

              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

            </div>

            {/* Register Button */}

            <button
              type="submit"
              className="register-btn"
            >
              Register
            </button>

          </form>

          {/* Login Link */}

          <div className="bottom-text">

            Already have an account?

            <Link to="/login">

              Login

            </Link>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Register;