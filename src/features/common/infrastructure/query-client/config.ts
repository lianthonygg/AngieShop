import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { use } from "react";

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
    },
    mutations: {
      retry: 1,
    },
  },
};

export const queryClient = new QueryClient(queryClientConfig);

export function createGlobalState<T>(
  queryKey: unknown,
  initialData: T | null = null
) {
  return function () {
    const queryClient = useQueryClient();

    const { data } = useQuery({
      queryKey: [queryKey],
      queryFn: () => Promise.resolve(initialData),
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    });

    function setData(data: Partial<T>) {
      queryClient.setQueryData([queryKey], data);
      console.log(`Global state updated for ${queryKey}:`, data);
    }
    function resetData() {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      queryClient.refetchQueries({ queryKey: [queryKey] });
    }

    return { data, setData, resetData };
  };
}
