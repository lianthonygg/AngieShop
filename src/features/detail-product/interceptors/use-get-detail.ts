import { useQuery } from "@tanstack/react-query";
import { detailQueryFn } from "../infrastructure/detail-fetcher";

interface GetDetailParams {
  slug: string;
}

export const useGetDetail = ({ slug }: GetDetailParams) => {
  return useQuery({
    queryKey: ["productBySlug", slug],
    queryFn: async () => await detailQueryFn(slug),
  });
};
