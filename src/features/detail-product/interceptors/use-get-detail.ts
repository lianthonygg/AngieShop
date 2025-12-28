import { useQuery } from "@tanstack/react-query";
import { getDetailProductApiService } from "../infrastructure/api-service";
import { AnyCnameRecord } from "node:dns";

interface GetDetailParams {
  slug: string;
}

export const useGetDetail = ({ slug }: GetDetailParams) => {
  return useQuery({
    queryKey: ["productBySlug", slug],
    queryFn: async () => {
      const detailProductService = getDetailProductApiService();

      try {
        const result = await detailProductService.getProductBySlug(slug);
        if (result.success) {
          return result.data;
        } else {
          throw new Error(result.error.message);
        }
      } catch (err: any) {
        throw new Error(
          "No se puede establecer conexion" + (err.message || err)
        );
      }
    },
  });
};
