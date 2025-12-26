import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

type tParams = Promise<{ cartId: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: tParams }
) {
  const { cartId } = await params;

  const { data, error } = await supabase
    .from("cart_item")
    .select("*")
    .eq("cart_id", cartId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    data: data,
  });
}
