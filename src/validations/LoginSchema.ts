import { z } from "zod"

export const loginSchema = z.object({
  usuario: z.string()
    .email("Digite um e-mail válido")
    .min(1, "O e-mail é obrigatório"),
  senha: z.string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
})

export type LoginSchemaType = z.infer<typeof loginSchema>