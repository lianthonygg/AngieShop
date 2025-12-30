import { z } from "zod";

export const CreateCartItemSchema = z.object({
  product_id: z.uuid({
    message: "product_id debe ser un UUID válido",
  }),
  quantity: z
    .number()
    .int({ message: "quantity debe ser un número entero" })
    .positive({ message: "quantity debe ser mayor que 0" })
    .default(1),
});

export type CreateCartItemRequest = z.infer<typeof CreateCartItemSchema>;
