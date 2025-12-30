import { NextRequest, NextResponse } from "next/server";
import { ratelimit } from "./src/features/common/lib/ratelimit";

export async function proxy(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new NextResponse("Too many requests", { status: 429 });
  }

  const ua = req.headers.get("user-agent") ?? "";

  if (/googlebot/i.test(ua)) {
    return NextResponse.next();
  }

  if (/bot|crawler|spider|scrapy/i.test(ua)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (req.nextUrl.searchParams.size > 0) {
    return NextResponse.next({
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/store/:path*"],
};
