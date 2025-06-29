
// DTOs Auxiliares
export interface CategoriaIdDto {
	id: number;
}

export interface EditoraIdDto {
	id: number;
}

export interface AutorIdDto {
	id: number;
}

export default interface CriarProdutoDto {
	titulo: string
	sinopse: string
	preco: number
	paginas: number
	anoPublicacao: number
	idioma?: string
	isbn10?: string
	isbn13?: string
	desconto?: number
	edicao?: number
	foto?: string
	autores: AutorIdDto[]
	categoria: CategoriaIdDto
    editora: EditoraIdDto
}

