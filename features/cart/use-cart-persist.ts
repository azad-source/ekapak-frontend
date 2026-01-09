"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const STORAGE_KEY = "cart";

export function useCartPersist() {
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);
}
