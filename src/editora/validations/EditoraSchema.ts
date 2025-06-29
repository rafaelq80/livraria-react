import { z } from "zod"

export const editoraSchema = z
	.object({
		nome: z.string().nonempty("Editora é obrigatória"),
	})
	

export type EditoraSchemaType = z.infer<typeof editoraSchema>
