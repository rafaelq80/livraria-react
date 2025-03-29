import { z } from "zod"

export const categoriaSchema = z
	.object({
		tipo: z.string().nonempty("Nome é obrigatório"),
	})
	

export type CategoriaSchemaType = z.infer<typeof categoriaSchema>
