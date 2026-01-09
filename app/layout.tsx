"use client";

import "./globals.css";
import { ReactQueryProvider } from "@/providers/react-query";
import { ReduxProvider } from "@/providers/redux";

import { useCartPersist } from "@/features/cart/use-cart-persist";
import { Header } from "@/shared/ui/layout/header";

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
      <body className="typography font-[Manrope]">
        <ReduxProvider>
          <CartPersistProvider>
            <ReactQueryProvider>
              <div className="min-h-screen flex flex-col items-center w-full py-5 bg-background">
                <div className="w-full max-w-content md:px-4">
                  <Header />
                  {children}
                </div>
              </div>
            </ReactQueryProvider>
          </CartPersistProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
