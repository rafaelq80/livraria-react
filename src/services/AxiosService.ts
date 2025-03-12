import axios from "axios"

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL
})

export const login = async (url: string, dados: Object, setDados: Function) => {
	const resposta = await api.post(url, dados)
	setDados(resposta.data)
}

export const recuperarSenha = async (url: string, dados: { usuario: string }, setDados: Function) => {
	const resposta = await api.post(url, dados)
	setDados(resposta.data.message)
}

export const resetarSenha = async (url: string, dados: Object, setDados: Function) => {
	const resposta = await api.patch(url, dados)
	setDados(resposta.data.message)
}

export const cadastrarUsuario = async (url: string, dados: Object) => {
	const resposta = await api.post(url, dados)
	return resposta.data
}

export const listarProdutos = async (url: string, setDados: Function) => {
	const resposta = await api.get(url)
	setDados(resposta.data)
}

export const listar = async (url: string, setDados: Function, header: Object) => {
	const resposta = await api.get(url, header)
	setDados(resposta.data)
}

export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
	const resposta = await api.post(url, dados, header)
	setDados(resposta.data)
}

export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
	const resposta = await api.put(url, dados, header)
	setDados(resposta.data)
}

export const deletar = async (url: string, header: Object) => {
	await api.delete(url, header)
}
