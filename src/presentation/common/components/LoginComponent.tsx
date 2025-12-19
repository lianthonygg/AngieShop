import { zodResolver } from "@hookform/resolvers/zod";
import { Nunito_Sans, Poppins, Raleway } from "next/font/google";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  LoginUserInputs,
  LoginUserValidatorSchema,
} from "../validations/LoginUserValidator";
import axios from "axios";
import { useState } from "react";
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginUserInputs>({
    resolver: zodResolver(LoginUserValidatorSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div
      className="w-full h-screen p-3 flex flex-col justify-around items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Bubbles.png')" }}
    >
      <PageTransition />

      <div></div>
      <div className={`w-full bottom-0 flex flex-col justify-center`}>
        <h2
          className={`${raleway.className} text-start text-3xl text-[#202020]`}
        >
          Login
        </h2>
        <h4 className={`${nunito.className} py-2 text-[16px] text-[#202020]`}>
          Good to see you back!
        </h4>

        {requestErrors.length > 0 && (
          <div className="flex flex-col items-center gap-2">
            {requestErrors.map((error, index) => (
              <p key={index} className="text-red-500 text-sm">
                {error.errorMessage ? error.errorMessage : error.description}
              </p>
            ))}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-3"
        >
          <div>
            <input
              type="email"
              className={`${poppins.className} w-full px-4 py-2 text-black placeholder:text-black border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary`}
              placeholder="Email"
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
              className={`${poppins.className} w-full px-4 py-2 pb-2 text-black placeholder:text-black border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary`}
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-red-400 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="w-full bottom-0 flex flex-col justify-center items-center pt-7">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#004CFF] ${
                nunito.className
              } text-[#F3F3F3] flex justify-center items-center py-3.5 rounded-[16px] text-[18px] ${
                isSubmitting ? "opacity-50" : ""
              }`}
            >
              {isSubmitting ? "Sign In..." : "Sign In"}
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

export default LoginComponent;
