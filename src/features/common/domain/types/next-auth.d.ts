import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    supabaseAccessToken?: string;
    user: {
      id: string;
      createdAt?: string;
      cartId?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    created_at: string;
  }
}
