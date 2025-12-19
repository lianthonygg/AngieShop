import { z } from "zod";

export const LoginUserValidatorSchema = z.object({
  email: z.email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

export type LoginUserInputs = z.infer<typeof LoginUserValidatorSchema>;
