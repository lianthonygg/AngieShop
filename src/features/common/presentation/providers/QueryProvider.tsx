"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { queryClient } from "../../infrastructure/query-client/config";
import { SessionProvider } from "next-auth/react";

function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
}

export default QueryProvider;
