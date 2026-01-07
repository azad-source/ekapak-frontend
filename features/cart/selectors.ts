import { RootState } from "./store";

export const selectCartItems = (state: RootState) => state.cart;

export const selectCartTotal = (state: RootState) =>
  state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const selectCartCount = (state: RootState) =>
  state.cart.reduce((sum, item) => sum + item.quantity, 0);
