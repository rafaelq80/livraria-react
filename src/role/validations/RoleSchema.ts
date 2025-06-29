import { z } from "zod"

export const roleSchema = z
	.object({
		nome: z.string().toLowerCase().nonempty("A permissão é obrigatória"),
		descricao: z.string().nonempty("A descrição é obrigatória"),
	})
	

export type RoleSchemaType = z.infer<typeof roleSchema>
