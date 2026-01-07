"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartCount } from "@/features/cart/selectors";
import { MiniCart } from "@/features/cart/ui/mini-cart";

export function Header() {
  const [open, setOpen] = useState(false);
  const count = useSelector(selectCartCount);

  return (
    <>
      <header className="h-14 border-b flex items-center justify-between px-4">
        <div className="font-semibold">Ekapak</div>

        <button onClick={() => setOpen(true)} className="relative">
          Корзина
          {count > 0 && <span className="ml-1 text-sm">({count})</span>}
        </button>
      </header>

      <MiniCart open={open} onClose={() => setOpen(false)} />
    </>
  );
}
