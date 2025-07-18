import { z } from "zod"


const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

const RoleSchema = z.object({
	id: z.number().int().positive(),
	nome: z.string(),
	descricao: z.string(),
})

export const usuarioSchema = z
	.object({
		nome: z.string().nonempty("Nome é obrigatório"),
		usuario: z.string().email("Formato de e-mail inválido").nonempty("Usuário é obrigatório"),
		foto: z.string(),
		fotoFile: z
			.custom<File | null>(
				(file) => file instanceof File || file === null,
				{ message: "Arquivo inválido" }
			)
			.nullable()
			.optional()
			.refine((file) => !file || file.size <= MAX_FILE_SIZE, {
				message: "Tamanho máximo do arquivo é 5MB",
			})
			.refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
				message: "Tipo de arquivo não suportado. Formatos aceitos: JPG, PNG e WEBP",
			}),
		senha: z
			.string()
			.min(8, "A senha deve ter no mínimo 8 caracteres")
			.nonempty("Senha é obrigatória")
			.regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
			.regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
			.regex(/\d/, "A senha deve conter pelo menos um número"),
		confirmarSenha: z.string().nonempty("Confirmação de senha é obrigatória"),
		roles: z.array(RoleSchema).min(1, "Selecione pelo menos um papel de usuário"),
	})
	.refine((data) => data.senha === data.confirmarSenha, {
		message: "As senhas não correspondem",
		path: ["confirmarSenha"],
	})

export type UsuarioSchemaType = z.infer<typeof usuarioSchema>
