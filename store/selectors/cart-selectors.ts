import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectCartItems = (state: RootState) => state.cart;

export const selectCart = createSelector([selectCartItems], (items) => {
  return items.reduce(
    (acc, item) => {
      acc.total += item.price * item.quantity;
      acc.count += item.quantity;
      return acc;
    },
    { items, total: 0, count: 0 }
  );
});
