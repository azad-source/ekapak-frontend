"use client";

import { useEffect } from "react";
import { RootState } from "../store/store";
import { useAppSelector } from "@/store/hooks";

const STORAGE_KEY = "cart";

export function useCartPersist() {
  const cart = useAppSelector((state: RootState) => state.cart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);
}
