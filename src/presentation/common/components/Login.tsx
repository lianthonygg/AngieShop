import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";
import {
  LoginUserInputs,
  LoginUserValidatorSchema,
} from "../validations/LoginUserValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

type Error = {
  properyName: string;
  errorMessage: string;
  description: string;
};

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://enviosya-backend-production.up.railway.app";

function LoginComponent() {
  const [requestErrors, setRequestErrors] = useState<Error[]>([]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<LoginUserInputs>({
    resolver: zodResolver(LoginUserValidatorSchema),
  });

  const onSubmit: SubmitHandler<LoginUserInputs> = async (data) => {
    try {
      const { data: dataResult } = await axios.post(
        "/auth/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(dataResult);

      if (dataResult.logged) navigateTo("/store");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status;
        const data = err.response.data;

        if (status === 400 && data) {
          setRequestErrors(data);
        }
      } else {
        console.error("Error de red o inesperado", err);
      }
    }
  };

  const navigateTo = (url: string) => {
    router.push(url);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 bg-gradient-to-br from-white to-slate-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl flex flex-col justify-center items-center font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#333333] to-white">
          Bienvenido a{" "}
          <Image src={"/logo.png"} alt="Logo" width={100} height={100} />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-b from-[#FDB813] to-[#D4145A]">
            EnvíosYa
          </span>
        </h1>
        <p className="text-sm text-gray-500">
          Inicia sesión o regístrate para continuar
        </p>
      </div>

      {requestErrors.length > 0 && (
        <div className="flex flex-col items-center gap-2">
          {requestErrors.map((error, index) => (
            <p key={index} className="text-red-500 text-sm">
              {error.errorMessage ? error.errorMessage : error.description}
            </p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input
            type="email"
            className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.email ? "border-red-500" : "border-gray-600"
            }`}
            placeholder="Correo electrónico"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-red-400 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.password ? "border-red-500" : "border-gray-600"
            }`}
            placeholder="Contraseña"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-red-400 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#00C9FF] flex justify-center items-center gap-1 text-white font-semibold py-2 rounded-xl shadow hover:brightness-110 transition"
        >
          <FaPaperPlane className="text-lg" />
          {isSubmitting ? "Iniciando Sesión..." : "Iniciar Sesión"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        ¿No tienes cuenta?{" "}
        <button
          onClick={() => navigateTo("/register")}
          className="text-primary font-medium"
        >
          Regístrate
        </button>
      </p>
    </div>
  );
}

export default LoginComponent;
