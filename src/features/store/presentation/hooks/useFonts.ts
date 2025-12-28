import { Raleway, Nunito_Sans, Poppins } from "next/font/google";

export const raleway = Raleway({
  variable: "--font-gest-raleway",
  display: "swap",
  weight: "800",
  subsets: ["latin"],
});

export const nunito = Nunito_Sans({
  variable: "--font-gest-sans",
  display: "swap",
  weight: "300",
  subsets: ["latin"],
});

export const poppins = Poppins({
  variable: "--font-gest-poppins",
  display: "swap",
  subsets: ["latin"],
  weight: "200",
});
