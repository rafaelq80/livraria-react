import { z } from "zod"
import messages from '../../shared/constants/messages';

/**
 * Schema de validação para entidade Autor
 * 
 * Define as regras de validação para criação e atualização de autores.
 * Utiliza Zod para validação em tempo de execução com mensagens de erro em português.
 * 
 * Campos:
 * - nome: String obrigatória (nome completo do autor)
 * - nacionalidade: String opcional (nacionalidade do autor)
 * 
 * @example
 * ```typescript
 * const autorData = {
 *   nome: "Machado de Assis",
 *   nacionalidade: "Brasileira"
 * }
 * const validatedData = autorSchema.parse(autorData)
 * ```
 */
export const autorSchema = z
	.object({
		/**
		 * Nome completo do autor
		 * Campo obrigatório que deve conter pelo menos dois caracteres
		 */
		nome: z.string()
			.min(1, messages.autor.required.nome)
			.min(2, messages.autor.minLength),
		
		/**
		 * Nacionalidade do autor
		 * Campo opcional que pode ser omitido ou enviado como string vazia
		 */
		nacionalidade: z.string().optional(),
	})
	

/**
 * Tipo TypeScript inferido do schema de validação
 * 
 * Representa a estrutura de dados válida para um autor após validação.
 * Este tipo é usado em formulários e operações CRUD para garantir type safety.
 * 
 * @example
 * ```typescript
 * function criarAutor(data: AutorSchemaType) {
 *   // data.nome é garantidamente uma string não vazia
 *   // data.nacionalidade pode ser string | undefined
 * }
 * ```
 */
export type AutorSchemaType = z.infer<typeof autorSchema>
