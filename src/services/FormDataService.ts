import Produto from '../models/Produto'
import Usuario from '../models/Usuario'

type StringConvertible = string | number | boolean | Date

type FormDataValue = StringConvertible | Blob | File | null | undefined

type FormDataCompatible<T> = Partial<{
	[K in keyof T]: FormDataValue
}>

/**
 * Função genérica para criar FormData a partir de um objeto
 */
export function createFormData<T extends FormDataCompatible<T>>(data: T): FormData {
	const formData = new FormData()

	Object.entries(data).forEach(([key, value]) => {
		if (value !== null && value !== undefined) {
			// Adiciona um valor para a chave como um arquivo ou como uma string
			formData.append(key, value instanceof File || value instanceof Blob ? value : String(value))
		}
	})

	return formData
}

/** 
 * Função Específica para criar FormData do tipo Usuario
 **/ 
export function createUsuarioFormData(user: Usuario, foto: File | null) {
    // Usar a função genérica para simplificar
    const formData = createFormData({
        id: user.id,
        nome: user.nome,
        usuario: user.usuario,
        senha: user.senha,
        roles: JSON.stringify(user.roles)
    })
    
    // Adicionar a foto apenas uma vez, de acordo com sua disponibilidade
    if (foto) {
        formData.append("foto", foto)
    } else if (user.foto) {
        formData.append("foto", user.foto)
    }

    return formData
}

/** 
 * Função Específica para criar FormData do tipo Produto
 **/ 
export function createProdutoFormData(produto: Produto, foto: File | null) {
    // Usar a função genérica para simplificar
    const formData = createFormData({
        id: produto.id,
        titulo: produto.titulo,
        preco: produto.preco,
        isbn10: produto.isbn10,
        isbn13: produto.isbn13,
        categoria: JSON.stringify(produto.categoria),
        editora: JSON.stringify(produto.editora),
        autores: JSON.stringify(produto.autores)
    })
    
    // Adicionar a foto apenas uma vez, de acordo com sua disponibilidade
    if (foto) {
        formData.append("foto", foto)
    } else if (produto.foto) {
        formData.append("foto", produto.foto)
    }

    return formData
}