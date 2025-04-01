import { z } from "zod"

export const categoriaSchema = z
	.object({
		tipo: z.string().nonempty("Categoria é obrigatória"),
	})
	

export type CategoriaSchemaType = z.infer<typeof categoriaSchema>
