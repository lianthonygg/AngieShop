import z from "zod";
import { MAX_FILE_SIZE } from "../components/ProfilePictureUploader";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

export const RegisterUserValidatorSchema = z.object({
  fullName: z.string().min(2, { message: "El Nombre es Requerido" }),
  email: z.email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
  profilePicture: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type))
    .optional(),
  phone: z.string().optional(),
});

export type RegisterUserInputs = z.infer<typeof RegisterUserValidatorSchema>;
/*
.union([
      z.url(),
      z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE)
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
    ])
    .optional() */
