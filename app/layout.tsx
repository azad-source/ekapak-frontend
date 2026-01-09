import { ClientProviders } from "@/providers/client-providers";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/react-query";
import { ReduxProvider } from "@/providers/redux";

import { Header } from "@/shared/ui/layout/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="font-[Manrope]">
        <ReduxProvider>
          <ClientProviders>
            <ReactQueryProvider>
              <div className="min-h-screen flex flex-col items-center w-full py-5 bg-background">
                <div className="w-full max-w-content md:px-4">
                  <Header />
                  {children}
                </div>
              </div>
            </ReactQueryProvider>
          </ClientProviders>
        </ReduxProvider>
      </body>
    </html>
  );
}
