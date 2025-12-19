import { Nunito_Sans, Poppins, Raleway } from "next/font/google";
import { useRouter } from "next/navigation";
import {
  RegisterUserInputs,
  RegisterUserValidatorSchema,
} from "../validations/RegisterUserValidator";
import ProfilePictureUploader, {
  MAX_FILE_SIZE,
} from "./ProfilePictureUploader";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { PageTransition } from "./PageTransition";

const raleway = Raleway({
  variable: "--font-gest-raleway",
  weight: "800",
  subsets: ["latin"],
});

const nunito = Nunito_Sans({
  variable: "--font-gest-sans",
  weight: "200",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-gest-poppins",
  subsets: ["latin"],
  weight: "200",
});
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
    formState: { errors, isSubmitting },
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

  const navigateTo = (url: string) => {
    router.push(url);
  };

  const onSubmit: SubmitHandler<RegisterUserInputs> = async (data) => {
    try {
      let profilePictureUrl = "";

      if (data.profilePicture) {
        const form = new FormData();
        form.append("file", data.profilePicture as File);
        const { data: profilePicture } = await axios.post(
          "https://enviosya-backend-production.up.railway.app/users/upload-profile-picture",
          form
        );
        profilePictureUrl = profilePicture.publicUrl;
      } else {
        profilePictureUrl = "https://noproporcionada";
      }

      const { data: dataResult } = await axios.post(
        "https://enviosya-backend-production.up.railway.app/users/register",
        {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          role: "Cliente",
          phone: data.phone,
          profilePicture: profilePictureUrl,
        }
      );

      if (dataResult.email) navigateTo("/login");
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

  return (
    <div
      className="w-full h-screen p-3 flex flex-col justify-around items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/BubblesRegister.png')" }}
    >
      <PageTransition />

      <div></div>
      <div className={`w-full bottom-0 flex flex-col justify-center`}>
        <h2
          className={`w-40 ${raleway.className} pt-17 text-start text-3xl text-[#202020] text-pretty`}
        >
          Create Account
        </h2>

        <form
          className="flex flex-col items-center justify-center gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full flex justify-center items-center mb-8">
            <ProfilePictureUploader<RegisterUserInputs>
              name="profilePicture"
              control={control}
              rules={{
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
              placeholder="Nombre y Apellidos"
              className={`${poppins.className} w-full px-4 py-2 text-black placeholder:text-black border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary`}
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
              placeholder="Email"
              className={`${poppins.className} w-full px-4 py-2 text-black placeholder:text-black border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary`}
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-red-400 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className={`${poppins.className} w-full px-4 py-2 text-black placeholder:text-black border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary`}
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-red-400 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="w-full bottom-0  flex flex-col justify-center items-center py-7">
            <button
              disabled={isSubmitting}
              type="submit"
              className={`w-full bg-[#004CFF] ${
                nunito.className
              } text-[#F3F3F3] flex justify-center items-center py-3.5 rounded-[16px] text-[18px] ${
                isSubmitting ? "opacity-50" : ""
              }`}
            >
              {isSubmitting ? "Done..." : "Done"}
            </button>
            <button
              onClick={() => navigateTo("/started")}
              className={`${nunito.className} text-[#202020] pt-3`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterComponent;
