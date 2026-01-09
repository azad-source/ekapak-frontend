"use client";

import { ReactQueryProvider } from "@/providers/react-query";
import { ReduxProvider } from "@/providers/redux";
import { useCartPersist } from "@/features/cart/use-cart-persist";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  useCartPersist();

  return (
    <ReduxProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ReduxProvider>
  );
}
