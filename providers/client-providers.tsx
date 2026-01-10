"use client";

import { ReactQueryProvider } from "@/providers/react-query";
import { ReduxProvider } from "@/providers/redux";
import { RefsLoader } from "./refs-loader";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ReactQueryProvider>
        <RefsLoader>{children}</RefsLoader>
      </ReactQueryProvider>
    </ReduxProvider>
  );
}
