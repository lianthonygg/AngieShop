import { useQuery } from "@tanstack/react-query";
import { getDetailProductApiService } from "../infrastructure/api-service";
import { AnyCnameRecord } from "node:dns";

interface GetDetailParams {
  id: string;
}

export const useGetDetail = ({ id }: GetDetailParams) => {
  return useQuery({
    queryKey: ["productById", id],
    queryFn: async () => {
      const detailProductService = getDetailProductApiService();

      try {
        const result = await detailProductService.getProductById(id);
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
