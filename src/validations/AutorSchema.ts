import { z } from "zod"

export const autorSchema = z
	.object({
		nome: z.string().nonempty("Nome é obrigatório"),
		nacionalidade: z.string().nonempty("Nacionalidade é obrigatória"),
	})
	

export type AutorSchemaType = z.infer<typeof autorSchema>
