import axios, { AxiosResponse } from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL
})

type Headers = {
	Authorization?: string
	'Content-Type'?: string;
}

const getHeaders = (token?: string, isFormData = false): Headers => {
	const headers: Headers = {};
  
	if (token) {
	  headers.Authorization = `${token}`;
	}
  
	headers['Content-Type'] = isFormData ? 'multipart/form-data' : 'application/json';
	return headers;
  };

export const listar = async <T>(url: string, token?: string): Promise<T> => {
	const resposta: AxiosResponse<T> = await api.get(url, { headers: getHeaders(token) })
	return resposta.data
}

export const cadastrar = async <T>(
	url: string,
	dados: T,
	token?: string
): Promise<T> => {
	const isFormData = dados instanceof FormData;
	const resposta = await api.post<T>(url, dados, { headers: getHeaders(token, isFormData) })
	return resposta.data
}

export const atualizar = async <T>(
	url: string,
	dados: T,
	token?: string
): Promise<T> => {
	const isFormData = dados instanceof FormData;
	const resposta = await api.put<T>(url, dados, { headers: getHeaders(token, isFormData) })
	return resposta.data
}

export const deletar = async (url: string, header: object) => {
	await api.delete(url, header)
}

export const login = async <T>(
	url: string,
	dados: T,
): Promise<T> => {
	const resposta = await api.post<T>(url, dados)
	return resposta.data
}

export const recuperarSenha = async (
	url: string,
	dados: { usuario: string },
	setDados: (mensagem: string) => void
) => {
	const resposta = await api.post<{ message: string }>(url, dados)
	setDados(resposta.data.message)
}

export const resetarSenha = async <T>(
	url: string,
	dados: object,
	setDados: (updater: (prevState: T) => T) => void
) => {
	const resposta = await api.patch(url, dados)
	setDados(resposta.data.message)
}
