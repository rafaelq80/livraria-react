import { z } from "zod";

export const recuperarSenhaSchema = z.object({
  usuario: z
    .string()
    .email("Insira um endereço de e-mail válido")
    .min(1, "O e-mail é obrigatório"),
});

export type RecuperarSenhaSchemaType = z.infer<typeof recuperarSenhaSchema>;