import { z } from "zod";

export const atualizarSenhaSchema = z.object({
  senha: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .nonempty("Senha é obrigatória")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número"),
  confirmarSenha: z.string().nonempty("Confirmação de senha é obrigatória"),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
});

export type AtualizarSenhaSchemaType = z.infer<typeof atualizarSenhaSchema>;