import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  limit: 500,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;

      const exists = state.items.find((i) => i._id === product._id);

      if (exists) {
        state.items = state.items.filter((i) => i._id !== product._id);
      } else {
        if (state.items.length >= state.limit) return;
        state.items.push(product);
      }
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
