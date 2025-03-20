import Usuario from '../models/Usuario'

type StringConvertible = string | number | boolean | Date

type FormDataValue = StringConvertible | Blob | File | null | undefined

type FormDataCompatible<T> = Partial<{
	[K in keyof T]: FormDataValue
}>

// Função genérica para criar FormData
export function createFormData<T extends FormDataCompatible<T>>(
	data: T, // Objeto que contém os dados extraídos do input
	fileKey?: string, // Nome da chave que aramazenará o arquivo
	file?: File | null // Arquivo
): FormData {
	const formData = new FormData()

	Object.entries(data).forEach(([key, value]) => {
		if (value) {
			// Adiciona um valor para a chave como um arquivo ou como uma string
			formData.append(key, value instanceof File || value instanceof Blob ? value : String(value))
		}
	})

	// Adiciona arquivo separado, se ele foi enviado
	if (fileKey && file) {
		formData.append(fileKey, file)
	}

	return formData
}

/** 
 * Função Específica para criar FormData do tipo Usuario
 * 
 * Se precisar, você pode criar funções semelhantes a esta
 * para outros Recursos que trabalharão com envio de imagens 
 **/ 
export function createUsuarioFormData(user: Usuario, foto: File | null) {
    const formData = new FormData()
    formData.append("id", user.id.toString())
    formData.append("nome", user.nome)
    formData.append("usuario", user.usuario)
    formData.append("senha", user.senha)
    formData.append("foto", user.foto || "")

    const rolesString = JSON.stringify(user.roles)
    formData.set("roles", rolesString)

    if (foto) {
        formData.append("foto", foto)
    }

    return formData
}