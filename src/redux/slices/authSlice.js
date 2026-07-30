import { createSlice } from "@reduxjs/toolkit";

const getStoredUser = () => {
  try {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      return JSON.parse(currentUser);
    }

    const legacyUser = localStorage.getItem("user");
    if (legacyUser) {
      return JSON.parse(legacyUser);
    }
  } catch (error) {
    console.error("Failed to parse stored user", error);
  }

  return null;
};

const initialState = {
  user: getStoredUser(),
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token")
};

const authSlice = createSlice({

  name: "auth",

  initialState,

  reducers: {

    login: (state, action) => {

      state.user = action.payload.user;

      state.token = action.payload.token;

      state.isLoggedIn = true;

    },

    logout: (state) => {

      state.user = null;

      state.token = null;

      state.isLoggedIn = false;

    }

  }

});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;