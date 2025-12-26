import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { CookieOptions } from "@supabase/ssr";

export async function GET() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll();
        },
        async setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options?: CookieOptions;
          }[]
        ) {
          try {
            cookiesToSet.forEach(async ({ name, value, options }) => {
              (await cookieStore).set(name, value, options);
            });
          } catch {}
        },
      },
    }
  );

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session || !session.user) {
    return NextResponse.json(
      { error: error?.message || "No autenticado" },
      { status: 401 }
    );
  }

  return NextResponse.json({ data: session.user });
}
