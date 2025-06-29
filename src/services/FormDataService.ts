import Produto from "../produto/models/Produto"
import Usuario from "../usuario/models/Usuario"
import CreateUsuario from "../usuario/dtos/CriarUsuarioDto"
import UpdateUsuario from "../usuario/dtos/AtualizarUsuarioDto"
import CriarProdutoDto from "../produto/dtos/CriarProdutoDto"

type StringConvertible = string | number | boolean | Date

type FormDataValue = StringConvertible | Blob | File | null | undefined

type FormDataCompatible<T> = Partial<{
	[K in keyof T]: FormDataValue
}>

function getFormDataValue(value: FormDataValue): string | Blob | File {
	if (value instanceof File || value instanceof Blob) {
		return value
	}
	if (typeof value === 'object' && value !== null) {
		return JSON.stringify(value)
	}
	return String(value)
}

/**
 * Função genérica para criar FormData a partir de um objeto
 */
export function createFormData<T extends FormDataCompatible<T>>(data: T): FormData {
	const formData = new FormData()

	Object.entries(data).forEach(([key, value]) => {
		if (value !== null && value !== undefined) {
			formData.append(key, getFormDataValue(value as FormDataValue))
		}
	})

	return formData
}

/** 
 * Função Específica para criar FormData do tipo Usuario
 * Aceita Usuario, CreateUsuario ou UpdateUsuario
 **/ 
export function criarUsuarioFormData(
	usuario: Usuario | CreateUsuario | UpdateUsuario, 
	fotoFile: File | null
) {
	 // Usar a função genérica para simplificar
	 const formData = createFormData({
        ...(('id' in usuario) && { id: usuario.id }),
        nome: usuario.nome,
        usuario: usuario.usuario,
        senha: usuario.senha,
    })
	
	// Adicionar os roles como entradas individuais
	usuario.roles.forEach((role, index) => {
		formData.append(`roles[${index}][id]`, role.id.toString())
	})
	
	// Adicionar a foto apenas uma vez, de acordo com sua disponibilidade
	if (fotoFile) {
		formData.append("fotoFile", fotoFile)
	} else if (usuario.foto) {
		formData.append("foto", usuario.foto)
	}

	return formData
}

/** 
 * Função Específica para criar FormData do tipo Produto
 * Aceita Produto, CriarProdutoDto ou AtualizarProdutoDto
 **/ 
export function criarProdutoFormData(
    produto: Produto | CriarProdutoDto | (CriarProdutoDto & { id: number }), 
    fotoFile: File | null
) {
    // Usar a função genérica para simplificar
    const formData = createFormData({
        ...(('id' in produto) && { id: produto.id }),
        titulo: produto.titulo,
        sinopse: produto.sinopse,
        preco: produto.preco.toFixed(2), // Garante que o preço seja enviado como string com 2 casas decimais
        desconto: produto.desconto,
        isbn10: produto.isbn10,
        isbn13: produto.isbn13,
        paginas: produto.paginas,
        edicao: produto.edicao,
        idioma: produto.idioma,
        anoPublicacao: produto.anoPublicacao,
        categoria: JSON.stringify({ id: produto.categoria.id }),
        editora: JSON.stringify({ id: produto.editora.id }),
        autores: JSON.stringify(produto.autores.map(autor => ({ id: autor.id })))
    })
    
    // Adicionar a foto apenas uma vez, de acordo com sua disponibilidade
    if (fotoFile) {
        formData.append("fotoFile", fotoFile)
    } else if (produto.foto) {
        formData.append("foto", produto.foto)
    }

    return formData
}