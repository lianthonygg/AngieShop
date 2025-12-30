import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { NextAuthOptions } from "next-auth";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_KEY!,
  }),
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      }
      if (session.user && user) {
        session.user.id = user.id;
        session.user.createdAt = user.created_at;
      }
      if (user?.id) {
        const { data: cart, error } = await supabase
          .from("carts")
          .select("id")
          .eq("user_id", user.id)
          .single();

        if (cart && !error) {
          session.user.cartId = cart.id;
        } else {
          const { data: newCart } = await supabase
            .from("carts")
            .insert({ user_id: user.id })
            .select("id")
            .single();

          if (newCart) {
            session.user.cartId = newCart.id;
          }
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
