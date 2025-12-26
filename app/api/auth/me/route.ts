import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { CookieOptions } from "@supabase/ssr";

export async function GET() {
  const cookieStore = await cookies(); // ← ¡AWAIT aquí! Es async en Next 15

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options?: CookieOptions;
          }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Ignora si falla (puede pasar si hay middleware manejando refresh)
          }
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
