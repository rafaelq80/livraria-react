/**
 * DTO para criação de um novo autor
 */
export default interface CriarAutorDto {
	/** Nome completo do autor (obrigatório) */
	nome: string
	/** Nacionalidade do autor (opcional) */
	nacionalidade?: string
}
