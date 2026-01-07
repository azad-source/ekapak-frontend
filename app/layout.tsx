"use client";

import "./globals.css";
import { ReactQueryProvider } from "@/providers/react-query";
import { ReduxProvider } from "@/providers/redux";

import { useCartPersist } from "@/features/cart/use-cart-persist";
import { Header } from "@/shared/ui/header";

export function CartPersistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useCartPersist();
  return children;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <ReduxProvider>
          <CartPersistProvider>
            <ReactQueryProvider>
              <Header />
              {children}
            </ReactQueryProvider>
          </CartPersistProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
