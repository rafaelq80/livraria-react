import { z } from "zod"

export const usuarioSchema = z
	.object({
		nome: z.string().nonempty("Nome é obrigatório"),
		usuario: z.string().email("Formato de e-mail inválido").nonempty("Usuário é obrigatório"),
		foto: z.string().url("URL inválida").nonempty("Foto é obrigatória"),
		senha: z
			.string()
			.min(8, "A senha deve ter no mínimo 8 caracteres")
			.nonempty("Senha é obrigatória"),
		confirmarSenha: z.string().nonempty("Confirmação de senha é obrigatória"),
	})
	.refine((data) => data.senha === data.confirmarSenha, {
		message: "As senhas não correspondem",
		path: ["confirmarSenha"],
	})

export type UsuarioSchemaType = z.infer<typeof usuarioSchema>
