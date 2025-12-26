import { shopApi } from "@/src/data/api/axios-client";
import { ProfileResponse, ProfileError } from "../domain/types/profile";
import {
  createError,
  createSuccess,
  Result,
} from "../../common/domain/types/result";

interface GetProfileApiService {
  getProfile: () => Promise<Result<ProfileResponse, ProfileError>>;
}

export const getProfileApiService = (): GetProfileApiService => {
  async function getProfile(): Promise<Result<ProfileResponse, ProfileError>> {
    try {
      const { data } = await shopApi.get<ProfileResponse>(`/auth/me`);
      return createSuccess(data);
    } catch (error: any) {
      if (error.response) {
        return createError({
          error: error.response.data,
          message: "Error al obtener los datos del perfil",
        });
      } else if (error.request) {
        return createError({
          error: "Sin respuesta del servidor",
          message: "Error de conexion al servidor",
        });
      } else {
        return createError({
          error: error.message,
          message: "Error desconocido al obtener los datos del perfil",
        });
      }
    }
  }

  return {
    getProfile,
  };
};
