import { ClientProviders } from "@/providers/client-providers";
import "./globals.css";

import { Header } from "@/components/layout/header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="font-[Manrope]">
        <ClientProviders>
          <div className="min-h-screen flex flex-col items-center w-full py-5 bg-background">
            <div className="w-full max-w-content 2xl:px-0 md:px-4">
              <Header />
              {children}
            </div>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
