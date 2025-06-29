import CriarAutorDto from "./criarautor.dto";

/**
 * DTO para atualização de um autor existente
 */
export default interface AtualizarAutorDto extends CriarAutorDto {
	/** ID único do autor a ser atualizado */
	id: number
}
