import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RegisterUserInputs,
  RegisterUserValidatorSchema,
} from "../validations/RegisterUserValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import ProfilePictureUploader, {
  MAX_FILE_SIZE,
} from "./ProfilePictureUploader";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Error {
  properyName: string;
  errorMessage: string;
}

function RegisterComponent() {
  const [requestErrors, setRequestErrors] = useState<Error[]>([]);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<RegisterUserInputs>({
    resolver: zodResolver(RegisterUserValidatorSchema),
    defaultValues: {
      profilePicture: undefined,
      fullName: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterUserInputs> = async (data) => {
    try {
      const form = new FormData();
      form.append("file", data.profilePicture as File);

      const { data: profilePicture } = await axios.post(
        "https://enviosya-backend-production.up.railway.app/users/upload-profile-picture",
        form
      );
      await axios.post(
        "https://enviosya-backend-production.up.railway.app/users/register",
        {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          role: "Cliente",
          phone: data.phone,
          profilePicture: profilePicture.publicUrl,
        }
      );

      if (isSubmitSuccessful) navigateToLogin();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status;
        const data = err.response.data;

        console.log(data);

        if (status === 400 && data) {
          setRequestErrors(data);
        }
      } else {
        console.error("Error de red o inesperado", err);
      }
    }
  };

  const navigateToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 bg-gradient-to-br from-white to-slate-100">
      <div className="text-center mb-8">
        <h1 className="top-0 text-3xl flex flex-col justify-center items-center font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#333333] to-white">
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={100}
            height={100}
            priority
          />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-b from-[#FDB813] to-[#D4145A]">
            EnvíosYa
          </span>
        </h1>
        <p className="text-sm text-gray-500">Regístrate para continuar</p>
      </div>

      {requestErrors.length > 0 && (
        <div className="flex flex-col items-center gap-2">
          {requestErrors.map((error, index) => (
            <p key={index} className="text-red-500 text-sm">
              {error.errorMessage}
            </p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="w-full flex justify-center items-center mb-8">
          <ProfilePictureUploader<RegisterUserInputs>
            name="profilePicture"
            control={control}
            rules={{
              required: "La imagen de perfil es requerida",
              validate: {
                fileSize: (value: File | string | undefined) =>
                  !value ||
                  typeof value === "string" ||
                  value.size <= MAX_FILE_SIZE ||
                  `El archivo es demasiado grande (máx. ${
                    MAX_FILE_SIZE / 1024 / 1024
                  }MB)`,
              },
            }}
          />
        </div>

        <div>
          <input
            type="text"
            className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.fullName ? "border-red-500" : "border-gray-600"
            }`}
            placeholder="Nombre y Apellidos"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="mt-1 text-red-400 text-sm">
              {errors.fullName.message}
            </p>
          )}
        </div>

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

        <div>
          <input
            type="text"
            className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.phone ? "border-red-500" : "border-gray-600"
            }`}
            placeholder="Telefono"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-red-400 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#00C9FF] flex justify-center items-center gap-1 text-white font-semibold py-2 rounded-xl shadow hover:brightness-110 transition"
        >
          <FaPaperPlane className="text-lg" />
          {isSubmitting ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        Ya tienes cuenta?{" "}
        <button onClick={navigateToLogin} className="text-primary font-medium">
          Inicia Sesión
        </button>
      </p>
    </div>
  );
}

export default RegisterComponent;
