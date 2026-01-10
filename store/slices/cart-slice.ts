import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../entities/cart/types";

const STORAGE_KEY = "cart";

const loadInitialState = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

const initialState: CartItem[] = loadInitialState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const item = state.find((i) => i.offerId === action.payload.offerId);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      return state.filter((i) => i.offerId !== action.payload);
    },
    changeQuantity(
      state,
      action: PayloadAction<{ offerId: string; quantity: number }>
    ) {
      const item = state.find((i) => i.offerId === action.payload.offerId);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart() {
      return [];
    },
  },
});

export const { addItem, removeItem, changeQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
