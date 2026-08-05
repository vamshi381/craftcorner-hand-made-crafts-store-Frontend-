import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../redux/slices/authSlice";
import "../styles/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const menuItems = [
    { key: "profile", label: "My Profile", icon: "👤" },
    { key: "orders", label: "My Orders", icon: "📦" },
    { key: "cart", label: "My Cart", icon: "🛒" },
    { key: "wishlist", label: "Wishlist", icon: "❤️" },
  ];

  const handleNavigate = (key) => {
    setActiveTab(key);

    if (key === "orders") navigate("/orders");
    if (key === "cart") navigate("/cart");
    if (key === "wishlist") navigate("/wishlist");
  };

  const handleProfileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };

    try {
      await axios.put(`https://craftcorner-hand-made-crafts-store.onrender.com/users/${user.id}`, updatedUser);

      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));
      dispatch(login({ user: updatedUser, token: localStorage.getItem("token") }));
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile");
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert("Please fill all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (passwordData.currentPassword !== user?.password) {
      alert("Current password is incorrect");
      return;
    }

    const updatedUser = {
      ...user,
      password: passwordData.newPassword,
    };

    try {
      await axios.put(`https://craftcorner-hand-made-crafts-store.onrender.com/users/${user.id}`, updatedUser);

      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));
      dispatch(login({ user: updatedUser, token: localStorage.getItem("token") }));
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setIsChangingPassword(false);
      alert("Password changed successfully");
    } catch (error) {
      console.error("Failed to update password", error);
      alert("Failed to update password");
    }
  };

  return (
    <section className="profile-page">
      <div className="profile-shell">
        <aside className="profile-sidebar">
          <div className="profile-user">
            <img
              src={user?.profileImage || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt="profile"
              className="profile-avatar"
            />
            <h4>{user?.name || "Craft Corner User"}</h4>
            <p>{user?.email || "your@email.com"}</p>
          </div>

          <div className="profile-nav">
            {menuItems.map((item) => (
              <button
                key={item.key}
                className={activeTab === item.key ? "active" : ""}
                onClick={() => handleNavigate(item.key)}
              >
                <span className="me-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="profile-content">
          <div className="profile-section">
            <h3>My Profile</h3>

            {!isEditing && !isChangingPassword ? (
              <>
                <div className="profile-grid">
                  <div className="profile-card">
                    <h5>Full Name</h5>
                    <p>{user?.name || "Not provided"}</p>
                  </div>

                  <div className="profile-card">
                    <h5>Email Address</h5>
                    <p>{user?.email || "Not provided"}</p>
                  </div>

                  <div className="profile-card">
                    <h5>Phone Number</h5>
                    <p>{user?.phone || "Not provided"}</p>
                  </div>

                  <div className="profile-card">
                    <h5>Account Type</h5>
                    <p>{user?.role || "User"}</p>
                  </div>
                </div>

                <div className="profile-actions">
                  <button className="primary" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </button>
                  <button className="secondary" onClick={() => setIsChangingPassword(true)}>
                    Change Password
                  </button>
                </div>
              </>
            ) : null}

            {isEditing ? (
              <form className="profile-form" onSubmit={handleSaveProfile}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="profile-actions">
                  <button type="submit" className="primary">
                    Save Changes
                  </button>
                  <button type="button" className="secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : null}

            {isChangingPassword ? (
              <form className="profile-form" onSubmit={handleSavePassword}>
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="profile-actions">
                  <button type="submit" className="primary">
                    Update Password
                  </button>
                  <button type="button" className="secondary" onClick={() => setIsChangingPassword(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
