import { z } from "zod"
import messages from '../../shared/constants/messages';

/**
 * Schema de validação para entidade Categoria
 * 
 * Define as regras de validação para criação e atualização de categorias.
 * Utiliza Zod para validação em tempo de execução com mensagens de erro em português.
 * 
 * Campos:
 * - tipo: String obrigatória (nome/tipo da categoria)
 * 
 * @example
 * ```typescript
 * const categoriaData = {
 *   tipo: "Ficção"
 * }
 * const validatedData = categoriaSchema.parse(categoriaData)
 * ```
 */
export const categoriaSchema = z
	.object({
		/**
		 * Nome/tipo da categoria
		 * Campo obrigatório que deve conter pelo menos dois caracteres
		 */
		tipo: z.string()
			.min(1, messages.categoria.required.tipo)
			.min(2, messages.categoria.minLength),
	})
	

/**
 * Tipo TypeScript inferido do schema de validação
 * 
 * Representa a estrutura de dados válida para uma categoria após validação.
 * Este tipo é usado em formulários e operações CRUD para garantir type safety.
 * 
 * @example
 * ```typescript
 * function criarCategoria(data: CategoriaSchemaType) {
 *   // data.tipo é garantidamente uma string não vazia
 * }
 * ```
 */
export type CategoriaSchemaType = z.infer<typeof categoriaSchema>
