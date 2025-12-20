import axios from "axios";

export const shopApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
});
