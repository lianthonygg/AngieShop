import { CreateCartItemSchema } from "@/src/features/common/domain/validations/create-cartitem.validation";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type tParams = Promise<{ cartId: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: tParams }
) {
  const { cartId } = await params;

  const { data: items, error } = await supabase
    .from("cart_item")
    .select(
      `
        id,
        quantity,
        is_active,
        created_at,
        product:products (
          id,
          slug,
          name,
          description,
          price,
          currency,
          image_url
        )
      `
    )
    .eq("cart_id", cartId)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    items: items,
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: tParams }
) {
  const { cartId } = await params;
  const body = await request.json();
  const result = CreateCartItemSchema.safeParse(body);

  if (result.error) {
    return NextResponse.json(result.error, { status: 400 });
  }

  const { product_id, quantity } = result.data;

  const { data, error } = await supabase.from("cart_item").insert({
    cart_id: cartId,
    product_id: product_id,
    quantity: quantity,
    is_active: true,
  });
  // .select()
  // .single();

  if (error) {
    console.error("Error al agregar item al carrito:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    data: data,
  });
}
