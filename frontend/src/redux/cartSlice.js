import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existing = state.items.find((i) => i._id === item._id);

      if (existing) {
        existing.quantity += item.quantity || 1;

        // ❗ remove if quantity goes 0 or below
        if (existing.quantity <= 0) {
          state.items = state.items.filter((i) => i._id !== item._id);
        }
      } else {
        state.items.push({
          ...item,
          quantity: item.quantity || 1,
        });
      }

      // 🔄 recalc total
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },

    // 👇 OPTIONAL (better control)
    increaseQty: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) item.quantity += 1;

      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);

      if (item) {
        item.quantity -= 1;

        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i._id !== action.payload);
        }
      }

      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);

      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
} = cartSlice.actions;

export default cartSlice.reducer;
