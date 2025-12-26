"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { queryClient } from "../../infrastructure/query-client/config";
import SupabaseProvider from "@/src/providers/supabase-provider";

function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseProvider>{children}</SupabaseProvider>
    </QueryClientProvider>
  );
}

export default QueryProvider;