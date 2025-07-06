import CriarCategoriaDto from "./CriarCategoriaDto";

/**
 * DTO para atualização de uma categoria existente
 */
export default interface AtualizarCategoriaDto extends CriarCategoriaDto {
	/** ID único da categoria a ser atualizada */
	id: number;
} 