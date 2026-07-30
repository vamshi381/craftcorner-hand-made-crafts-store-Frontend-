import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: {
    items: [],
    count: 0,
  },

  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload;
      state.count = action.payload.length;
    },

    clearWishlistState: (state) => {
      state.items = [];
      state.count = 0;
    },
  },
});

export const { setWishlist, clearWishlistState } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;